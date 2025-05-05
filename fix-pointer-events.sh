
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Fixing Deprecated pointerEvents Props =====${NC}"

# Make script executable
chmod +x fix-pointer-events.sh

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
  # Check if the file contains the deprecated pointerEvents prop
  if grep -q "pointerEvents=" "$file"; then
    echo -e "${YELLOW}Checking file: $file${NC}"
    
    # Replace pointerEvents prop with style.pointerEvents
    if grep -q "pointerEvents=\"" "$file" || grep -q "pointerEvents='" "$file" || grep -q "pointerEvents={" "$file"; then
      # Only fix if not already fixed (check if it's not already in style.pointerEvents)
      if ! grep -q "style={{ *pointerEvents:" "$file" && ! grep -q "style={{.*pointerEvents:.*}}" "$file"; then
        # Replace direct prop with style prop
        perl -i -pe 's/pointerEvents="([^"]+)"/style={{ pointerEvents: "\1" }}/g' "$file"
        perl -i -pe "s/pointerEvents='([^']+)'/style={{ pointerEvents: '\1' }}/g" "$file"
        perl -i -pe 's/pointerEvents={([^}]+)}/style={{ pointerEvents: $1 }}/g' "$file"
        
        # Handle case where style already exists
        perl -i -pe 's/style={{ ([^}]+) }} pointerEvents="([^"]+)"/style={{ $1, pointerEvents: "\2" }}/g' "$file"
        perl -i -pe "s/style={{ ([^}]+) }} pointerEvents='([^']+)'/style={{ $1, pointerEvents: '\2' }}/g" "$file"
        perl -i -pe 's/style={{ ([^}]+) }} pointerEvents={([^}]+)}/style={{ $1, pointerEvents: $2 }}/g' "$file"
        
        echo -e "${GREEN}Fixed deprecated pointerEvents in $file${NC}"
        FILES_FIXED=$((FILES_FIXED + 1))
      else
        echo -e "${GREEN}File already uses style.pointerEvents - skipping ${file}${NC}"
      fi
    fi
  fi
done

echo -e "\n${YELLOW}===== pointerEvents Fix Summary =====${NC}"
echo -e "Files fixed: $FILES_FIXED"

if [[ $FILES_FIXED -gt 0 ]]; then
  echo -e "${GREEN}✅ Fixed pointerEvents in $FILES_FIXED files${NC}"
else
  echo -e "${GREEN}✅ No files needed fixing${NC}"
fi
