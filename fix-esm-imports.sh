
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Fixing ES Module Import Paths =====${NC}"

# Make this script executable
chmod +x fix-esm-imports.sh

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
  # Skip index files to avoid circular dependencies
  if [[ "$(basename "$file")" == "index.js" ]]; then
    continue
  fi
  
  # Get the directory of the current file
  DIR=$(dirname "$file")
  
  # Fix relative imports without extensions
  IMPORTS=$(grep -n "import .* from '\.\/.*'" "$file" | grep -v "\.js'" | grep -v "\.jsx'")
  if [[ ! -z "$IMPORTS" ]]; then
    echo -e "${YELLOW}Fixing relative imports in ${file}${NC}"
    # Add .js extension to local imports
    sed -i "s/from '\.\//from '\.\//" "$file"
    sed -i "s/from '\.\.\//from '\.\.\//g" "$file"
    sed -i "s/import \(.*\) from '\(\.\/[^']*\)'/import \1 from '\2.js'/g" "$file"
    sed -i "s/import \(.*\) from '\(\.\.\/[^']*\)'/import \1 from '\2.js'/g" "$file"
    FILES_FIXED=$((FILES_FIXED + 1))
  fi
  
  # Fix imports for component and constant directories
  COMPONENT_IMPORTS=$(grep -n "from '../components'" "$file")
  if [[ ! -z "$COMPONENT_IMPORTS" ]]; then
    echo -e "${YELLOW}Fixing component imports in ${file}${NC}"
    sed -i "s/from '\.\.\/components'/from '\.\.\/components\/index.js'/g" "$file"
    FILES_FIXED=$((FILES_FIXED + 1))
  fi
  
  CONSTANTS_IMPORTS=$(grep -n "from '../constants'" "$file")
  if [[ ! -z "$CONSTANTS_IMPORTS" ]]; then
    echo -e "${YELLOW}Fixing constants imports in ${file}${NC}"
    sed -i "s/from '\.\.\/constants'/from '\.\.\/constants\/index.js'/g" "$file"
    FILES_FIXED=$((FILES_FIXED + 1))
  fi
done

echo -e "\n${YELLOW}===== ES Module Import Fix Summary =====${NC}"
echo -e "Files fixed: $FILES_FIXED"

if [[ $FILES_FIXED -gt 0 ]]; then
  echo -e "${GREEN}✅ Fixed imports in $FILES_FIXED files${NC}"
else
  echo -e "${GREEN}✅ No files needed fixing${NC}"
fi

echo -e "${YELLOW}Now run: npm run web${NC}"
