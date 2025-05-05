
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
  # Skip index files for direct processing (we'll handle them manually)
  if [[ "$(basename "$file")" == "index.js" ]]; then
    continue
  fi
  
  # Fix relative imports without extensions
  perl -i -pe 's/from \'(\.\.\/)([^\.][^\']*)\'/from \'\1\2\.js\'/g' "$file"
  perl -i -pe 's/from \'(\.\/)([^\.][^\']*)\'/from \'\1\2\.js\'/g' "$file"
  
  # Fix directory imports
  perl -i -pe 's/from \'(\.\.\/)components\'/from \'\1components\/index\.js\'/g' "$file"
  perl -i -pe 's/from \'(\.\.\/)constants\'/from \'\1constants\/index\.js\'/g' "$file"
  perl -i -pe 's/from \'(\.\.\/)screens\'/from \'\1screens\/index\.js\'/g' "$file"
  perl -i -pe 's/from \'(\.\.\/)utils\'/from \'\1utils\/index\.js\'/g' "$file"
  
  echo -e "${GREEN}Fixed imports in $file${NC}"
  FILES_FIXED=$((FILES_FIXED + 1))
done

echo -e "\n${YELLOW}===== ES Module Import Fix Summary =====${NC}"
echo -e "Files fixed: $FILES_FIXED"

if [[ $FILES_FIXED -gt 0 ]]; then
  echo -e "${GREEN}✅ Fixed imports in $FILES_FIXED files${NC}"
else
  echo -e "${GREEN}✅ No files needed fixing${NC}"
fi

echo -e "${YELLOW}Now run: npm run web${NC}"
