
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Fixing All ES Module Import Paths =====${NC}"

# Make script executable
chmod +x fix-all-imports.sh

# Files to exclude from fixing
EXCLUDE_DIRS=(
  "node_modules"
  ".git"
  "dist"
  "__mocks__"
  ".config"
)

# Specific directories to fix
INCLUDE_DIRS=(
  "./src"
)

# Build find command with includes
FIND_CMD="find ${INCLUDE_DIRS[@]} -type f -name '*.js' -o -name '*.jsx'"

# Add exclusions for directories
for dir in "${EXCLUDE_DIRS[@]}"; do
  FIND_CMD="$FIND_CMD | grep -v '$dir'"
done

# Execute the find command
JS_FILES=$(eval "$FIND_CMD")

FILES_FIXED=0

for file in $JS_FILES; do
  # Fix imports in the file
  
  # Fix relative imports without extensions (handles both single and double quotes)
  perl -i -pe "s/from ['\"](\.\.\/)([^\.][^'\"]*)['\"](?!\.js)/from '\1\2.js'/g" "$file"
  perl -i -pe "s/from ['\"](\.\/)([^\.][^'\"]*)['\"](?!\.js)/from '\1\2.js'/g" "$file"
  
  # Fix directory imports to point to index.js files
  perl -i -pe "s/from ['\"](\.\.\/)components['\"](?!\/)/from '\1components\/index.js'/g" "$file"
  perl -i -pe "s/from ['\"](\.\.\/)constants['\"](?!\/)/from '\1constants\/index.js'/g" "$file"
  perl -i -pe "s/from ['\"](\.\.\/)screens['\"](?!\/)/from '\1screens\/index.js'/g" "$file"
  perl -i -pe "s/from ['\"](\.\.\/)utils['\"](?!\/)/from '\1utils\/index.js'/g" "$file"
  
  # Fix component imports to add .js extension
  perl -i -pe "s/from ['\"](\.\.\/)components\/([^'\"\.]+)['\"](?!\.js)/from '\1components\/\2.js'/g" "$file"
  
  # Convert CommonJS to ES modules
  perl -i -pe 's/module\.exports\s*=\s*/export default /g' "$file"
  perl -i -pe 's/exports\.(\w+)\s*=\s*/export const \1 = /g' "$file"
  
  echo -e "${GREEN}Fixed imports in $file${NC}"
  FILES_FIXED=$((FILES_FIXED + 1))
done

# Now handle index.js files specifically to add extensions
for dir in src/components src/constants src/screens src/utils; do
  if [ -f "$dir/index.js" ]; then
    # Fix imports in index files
    perl -i -pe "s/from ['\"]\.\/([^\.][^'\"]*)['\"](?!\.js)/from '.\/\1.js'/g" "$dir/index.js"
    # Fix exports in index.js
    perl -i -pe 's/export\s*{\s*/export {\n  /g' "$dir/index.js"
    perl -i -pe 's/,\s*/,\n  /g' "$dir/index.js"
    echo -e "${GREEN}Fixed imports in $dir/index.js${NC}"
    FILES_FIXED=$((FILES_FIXED + 1))
  fi
done

# Fix mockDataSource export/import issues
if [ -f "src/utils/mockDataSource.js" ]; then
  perl -i -pe 's/module\.exports\s*=\s*{\s*mockDataSource/export const mockData/g' "src/utils/mockDataSource.js"
  echo -e "${GREEN}Fixed mockDataSource export in src/utils/mockDataSource.js${NC}"
fi

if [ -f "src/utils/dataAPI.js" ]; then
  perl -i -pe 's/import\s*{\s*mockDataSource\s*}\s*from/import { mockData as mockDataSource } from/g' "src/utils/dataAPI.js"
  echo -e "${GREEN}Fixed mockDataSource import in src/utils/dataAPI.js${NC}"
fi

# Fix App.jsx to import screens correctly
if [ -f "src/App.jsx" ]; then
  perl -i -pe "s/from ['\"](\.\/screens)\/([^'\"\.]+)['\"](?!\.js)/from '\1\/\2.js'/g" "src/App.jsx"
  echo -e "${GREEN}Fixed screen imports in src/App.jsx${NC}"
fi

# Fix files with duplicate extensions - comprehensive approach
fix_duplicate_extensions() {
    local file=$1
    if [ -f "$file" ]; then
      # More aggressive approach to fix multiple extensions
      # First fix the App.jsx with multiple extensions (most common issue)
      perl -i -pe "s/from ['\"](\.\/)App\.jsx(\.js)+['\"](?!\.)/from '\1App.jsx'/g" "$file"
      # Fix imports with .jsx.js.js.js patterns
      perl -i -pe "s/from ['\"]([^'\"]+)(\.jsx)(\.js)+['\"](?!\.)/from '\1\2'/g" "$file"
      # Fix imports with .js.js.js patterns
      perl -i -pe "s/from ['\"]([^'\"]+)(\.js)(\.js)+['\"](?!\.)/from '\1\2'/g" "$file"
      # Fix imports with .jsx.jsx patterns
      perl -i -pe "s/from ['\"]([^'\"]+)(\.jsx)(\.jsx)+['\"](?!\.)/from '\1\2'/g" "$file"
      # Fix app.json with multiple extensions
      perl -i -pe "s/from ['\"]([^'\"]+)(\.json)(\.json|\\.js)+['\"](?!\.)/from '\1\2'/g" "$file"
      
      # Special fixes for index.web.js which has been problematic
      if [[ "$file" == "src/index.web.js" ]]; then
        # Force App import to be correct in index.web.js
        perl -i -pe 's/import App from .+;/import App from '\''\.\/App\.jsx'\'';/g' "$file"
        # Force app.json import to be correct
        perl -i -pe 's/import appInfo from .+;/import appInfo from '\''\.\.\/app\.json'\'';/g' "$file"
      fi
      
      echo -e "${GREEN}Fixed duplicate extensions in $file${NC}"
    fi
}

# Fix index.web.js first and properly - special handling
if [ -f "src/index.web.js" ]; then
  # Completely rewrite the import lines to ensure correctness
  perl -i -pe 's/import App from .+;/import App from '\''\.\/App\.jsx'\'';/g' "src/index.web.js"
  perl -i -pe 's/import appInfo from .+;/import appInfo from '\''\.\.\/app\.json'\'';/g' "src/index.web.js"
  echo -e "${GREEN}Fixed App import in src/index.web.js${NC}"
fi

# Fix App.jsx thoroughly - this file is critical and needs special handling
if [ -f "src/App.jsx" ]; then
  # Direct approach to fix ALL imports in App.jsx without regex
  # First make a backup
  cp "src/App.jsx" "src/App.jsx.bak"
  
  # Fix HomeScreen import - forcing exact format
  perl -i -pe 's/import HomeScreen from .+;/import HomeScreen from '\''\.\/screens\/HomeScreen\.js'\'';/g' "src/App.jsx"
  
  # Fix screens import with proper destructuring - forcing exact format
  perl -i -pe 's/import\s*{\s*[^}]*}\s*from\s*['"'"']\.\/screens\/index[^'"'"']*['"'"'];/import { 
  LoginScreen, 
  MainMenuScreen,
  AccountSetupScreen, 
  AccountHistoryScreen,
  AboutScreen,
  NewPurchaseScreen,
  SnapReceiptScreen
} from '\''\.\/screens\/index\.js'\'';/g' "src/App.jsx"
  
  # Remove any duplicate extensions in remaining lines
  perl -i -pe 's/(\.js|\.jsx)(\.js|\.jsx)+/\1/g' "src/App.jsx"

  echo -e "${GREEN}Fixed imports in src/App.jsx${NC}"
fi

# Special fix for screens/index.js which commonly has import issues
if [ -f "src/screens/index.js" ]; then
  echo -e "${YELLOW}Fixing imports in src/screens/index.js...${NC}"
  cp "src/screens/index.js" "src/screens/index.js.bak"
  
  # Fix all import lines to use the correct single extension
  perl -i -pe 's/import (\w+) from ['"'"']\.\/(\w+)(\.js)+['"'"'];/import \1 from '\''\.\/$2\.js'\'';/g' "src/screens/index.js"
  
  echo -e "${GREEN}Fixed imports in src/screens/index.js${NC}"
fi

# Check and fix ALL js and jsx files for duplicate extensions
echo -e "${YELLOW}Scanning all JS/JSX files for duplicate extensions...${NC}"
find "${INCLUDE_DIRS[@]}" -type f \( -name "*.js" -o -name "*.jsx" \) | while read -r file; do
  # Always run the fix on every file to be thorough
  fix_duplicate_extensions "$file"
  
  # Additional aggressive cleanup for any remaining duplicated extensions
  perl -i -pe 's/(\.js|\.jsx)(\.js|\.jsx)+/\1/g' "$file"
done

echo -e "\n${YELLOW}===== ES Module Import Fix Summary =====${NC}"
echo -e "Files fixed: $FILES_FIXED"

if [[ $FILES_FIXED -gt 0 ]]; then
  echo -e "${GREEN}✅ Fixed imports in $FILES_FIXED files${NC}"
else
  echo -e "${GREEN}✅ No files needed fixing${NC}"
fi

echo -e "${YELLOW}Now run: npm run web${NC}"
