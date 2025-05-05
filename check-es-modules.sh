
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
  ".config"
)

# Specific directories to check (focus on your code)
INCLUDE_DIRS=(
  "./src"
)

# Files to exclude specifically
EXCLUDE_FILES=(
  "**/package.json"
  "**/package-lock.json"
  "**/.eslintrc.js"
  "**/babel.config.js"
  "**/metro.config.js"
  "**/webpack.config.js"
  "**/jest.config.js"
  "**/*.test.js"
)

echo -e "${YELLOW}Checking source code in these directories: ${INCLUDE_DIRS[@]}${NC}"

# Build find command with includes
FIND_CMD="find ${INCLUDE_DIRS[@]} -type f -name '*.js' -o -name '*.jsx'"

# Add exclusions for directories
for dir in "${EXCLUDE_DIRS[@]}"; do
  FIND_CMD="$FIND_CMD | grep -v '$dir'"
done

# Add exclusions for specific files
for file in "${EXCLUDE_FILES[@]}"; do
  FIND_CMD="$FIND_CMD | grep -v '$file'"
done

# Execute the find command
JS_FILES=$(eval "$FIND_CMD")

# Check for common issues
ISSUES_FOUND=0
FILES_CHECKED=0

for file in $JS_FILES; do
  FILES_CHECKED=$((FILES_CHECKED + 1))
  FILE_HAS_ISSUES=0
  
  for pattern in "${COMMON_ISSUES[@]}"; do
    # Check if the pattern exists but ignore instances within string literals and comments
    if grep -q "$pattern" "$file"; then
      # For test files, check if the pattern only appears in console.log statements or string literals
      if [[ "$file" == *"__tests__"* ]] && [[ "$pattern" == "exports." ]]; then
        # Check if all occurrences are within console.log or string literals
        NON_STRING_MATCHES=$(grep -n "$pattern" "$file" | grep -v "console.log" | grep -v "\"$pattern" | grep -v "'$pattern")
        if [[ -z "$NON_STRING_MATCHES" ]]; then
          continue  # Skip reporting this issue if it's only in string literals
        fi
      fi
      
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
        
        # Add note if it appears to be in a string literal or console.log
        if [[ "$LINE_CONTENT" == *"console.log"* ]] || [[ "$LINE_CONTENT" == *\"*\"* ]] || [[ "$LINE_CONTENT" == *\'*\'* ]]; then
          echo -e "    Line $LINE_NUM: $LINE_CONTENT ${YELLOW}(Note: Inside string or console.log - may be a false positive)${NC}"
        else
          echo -e "    Line $LINE_NUM: $LINE_CONTENT"
        fi
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
  if [[ $HAS_ES_PATTERN -eq 0 && $FILE_HAS_ISSUES -eq 0 && "$file" != "./check-es-modules.sh" ]]; then
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
