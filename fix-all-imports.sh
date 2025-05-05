
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
  # Fix all import paths in the file
  
  # Fix relative imports without extensions
  perl -i -pe 's/from [\'"](\.\.\/)([^\.][^\'"]*)[\'"](?!\.js)/from \'\1\2\.js\'/g' "$file"
  perl -i -pe 's/from [\'"](\.\/)([^\.][^\'"]*)[\'"](?!\.js)/from \'\1\2\.js\'/g' "$file"
  
  # Fix directory imports
  perl -i -pe 's/from [\'"](\.\.\/)components[\'"](?!\/)/from \'\1components\/index\.js\'/g' "$file"
  perl -i -pe 's/from [\'"](\.\.\/)constants[\'"](?!\/)/from \'\1constants\/index\.js\'/g' "$file"
  perl -i -pe 's/from [\'"](\.\.\/)screens[\'"](?!\/)/from \'\1screens\/index\.js\'/g' "$file"
  perl -i -pe 's/from [\'"](\.\.\/)utils[\'"](?!\/)/from \'\1utils\/index\.js\'/g' "$file"
  
  # Now fix all exports to properly use ES Module syntax
  perl -i -pe 's/module\.exports\s*=\s*/export default /g' "$file"
  perl -i -pe 's/exports\.(\w+)\s*=\s*/export const \1 = /g' "$file"
  
  echo -e "${GREEN}Fixed imports in $file${NC}"
  FILES_FIXED=$((FILES_FIXED + 1))
done

# Now handle index.js files specifically to add extensions
for dir in src/components src/constants src/screens src/utils; do
  if [ -f "$dir/index.js" ]; then
    # Fix imports in index files
    perl -i -pe 's/from [\'"]\.\/([^\.][^\'"]*)[\'"](?!\.js)/from \'.\/\1\.js\'/g' "$dir/index.js"
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

echo -e "\n${YELLOW}===== ES Module Import Fix Summary =====${NC}"
echo -e "Files fixed: $FILES_FIXED"

if [[ $FILES_FIXED -gt 0 ]]; then
  echo -e "${GREEN}✅ Fixed imports in $FILES_FIXED files${NC}"
else
  echo -e "${GREEN}✅ No files needed fixing${NC}"
fi

echo -e "${YELLOW}Now run: npm run web${NC}"
