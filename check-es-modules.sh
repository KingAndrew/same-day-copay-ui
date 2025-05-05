
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Checking ES Module Syntax Consistency =====${NC}"

# Function to check a JavaScript file for ES module issues
check_file() {
  local file=$1
  local issues_found=0
  
  # Check for CommonJS require() usage
  if grep -q "require(" "$file"; then
    echo -e "${RED}❌ ${file}: Uses CommonJS require() - should use import${NC}"
    issues_found=1
  fi
  
  # Check for module.exports usage
  if grep -q "module.exports" "$file"; then
    echo -e "${RED}❌ ${file}: Uses CommonJS module.exports - should use export${NC}"
    issues_found=1
  fi
  
  # Check for export default vs named exports consistency
  if grep -q "export default" "$file" && grep -q "export {" "$file"; then
    echo -e "${YELLOW}⚠️ ${file}: Mixes default and named exports${NC}"
  fi
  
  # Check for relative imports without .js extension
  if grep -q "from '\.\./" "$file" || grep -q "from '\./" "$file"; then
    if ! grep -q "from '.*\.js'" "$file" && ! grep -q "from '.*\.jsx'" "$file"; then
      echo -e "${YELLOW}⚠️ ${file}: Missing file extensions in imports${NC}"
    fi
  fi
  
  if [ $issues_found -eq 0 ]; then
    echo -e "${GREEN}✓ ${file}: No ES module issues detected${NC}"
    return 0
  else
    return 1
  fi
}

# Find all JavaScript files in src directory
echo -e "${YELLOW}Scanning src directory for JavaScript files...${NC}"
JS_FILES=$(find src -name "*.js" -o -name "*.jsx")

ISSUES_COUNT=0
CHECKED_COUNT=0

for file in $JS_FILES; do
  check_file "$file"
  if [ $? -ne 0 ]; then
    ISSUES_COUNT=$((ISSUES_COUNT + 1))
  fi
  CHECKED_COUNT=$((CHECKED_COUNT + 1))
done

echo -e "\n${YELLOW}===== Check Summary =====${NC}"
echo -e "Checked $CHECKED_COUNT files"
if [ $ISSUES_COUNT -eq 0 ]; then
  echo -e "${GREEN}✅ No ES module issues found!${NC}"
  exit 0
else
  echo -e "${RED}❌ Found $ISSUES_COUNT files with ES module issues${NC}"
  echo -e "${YELLOW}Recommendations:${NC}"
  echo "1. Use import/export instead of require/module.exports"
  echo "2. Add .js extension to relative imports"
  echo "3. Be consistent with export style (named vs default)"
  exit 1
fi
