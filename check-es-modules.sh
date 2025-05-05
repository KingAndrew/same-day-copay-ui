
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Checking for ES Module Syntax Issues =====${NC}"

# Define patterns to check
COMMON_ISSUES=(
  "module.exports"
  "require("
  "exports."
)

CORRECT_PATTERNS=(
  "export "
  "export default"
  "import "
)

# Make this script executable
chmod +x check-es-modules.sh

# Files to exclude from checking
EXCLUDE_DIRS=(
  "node_modules"
  ".git"
  "dist"
  "__mocks__"
)

# Build exclude pattern for find
EXCLUDE_PATTERN=""
for dir in "${EXCLUDE_DIRS[@]}"; do
  EXCLUDE_PATTERN="$EXCLUDE_PATTERN -not -path './$dir/*'"
done

# Find all JS files for checking
JS_FILES=$(eval "find . -type f -name '*.js' -not -path './node_modules/*' -not -path './.git/*' -not -path './dist/*' -not -path './__mocks__/*'")

# Check for common issues
ISSUES_FOUND=0
FILES_CHECKED=0

for file in $JS_FILES; do
  FILES_CHECKED=$((FILES_CHECKED + 1))
  FILE_HAS_ISSUES=0
  
  # Skip package.json and other config files
  if [[ "$file" == *"package.json"* || "$file" == *".eslintrc.js"* || "$file" == *"babel.config.js"* ]]; then
    continue
  fi
  
  for pattern in "${COMMON_ISSUES[@]}"; do
    if grep -q "$pattern" "$file"; then
      if [[ $FILE_HAS_ISSUES -eq 0 ]]; then
        echo -e "\n${RED}Issues found in: $file${NC}"
        FILE_HAS_ISSUES=1
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
      fi
      MATCHES=$(grep -n "$pattern" "$file")
      echo -e "${YELLOW}  - Found CommonJS pattern '$pattern' at:${NC}"
      echo "$MATCHES" | while read -r match; do
        LINE_NUM=$(echo "$match" | cut -d':' -f1)
        LINE_CONTENT=$(echo "$match" | cut -d':' -f2-)
        echo -e "    Line $LINE_NUM: $LINE_CONTENT"
      done
    fi
  done
  
  # Check if file has ES module patterns
  HAS_ES_PATTERN=0
  for pattern in "${CORRECT_PATTERNS[@]}"; do
    if grep -q "$pattern" "$file"; then
      HAS_ES_PATTERN=1
      break
    fi
  done
  
  # If the file has neither CommonJS nor ES module syntax, it might be a problem
  if [[ $HAS_ES_PATTERN -eq 0 && $FILE_HAS_ISSUES -eq 0 && "$file" != "./check-es-modules.sh" && "$file" != *"test"* ]]; then
    echo -e "\n${YELLOW}Warning: $file doesn't contain ES module import/export patterns${NC}"
  fi
done

echo -e "\n${YELLOW}===== ES Module Syntax Check Summary =====${NC}"
echo -e "Files checked: $FILES_CHECKED"
echo -e "Files with issues: $ISSUES_FOUND"

if [[ $ISSUES_FOUND -gt 0 ]]; then
  echo -e "${RED}❌ ES Module Syntax Check Failed${NC}"
  echo -e "${YELLOW}Please fix the CommonJS syntax in the files mentioned above.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ ES Module Syntax Check Passed${NC}"
  exit 0
fi
