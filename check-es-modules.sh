#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Checking ES Module Syntax =====${NC}"

# Files to check
SOURCE_FILES=$(find ./src -type f -name "*.js" | grep -v "node_modules")
FILES_WITH_ISSUES=0

echo -e "Checked $(echo "$SOURCE_FILES" | wc -l) files"

# Check for common ES module issues
for file in $SOURCE_FILES; do
  ISSUES=0

  # Check for require/module.exports (CommonJS) syntax
  if grep -q "require(" "$file" || grep -q "module.exports" "$file" || grep -q "exports\." "$file"; then
    echo -e "${RED}✘ $file uses CommonJS syntax (require/module.exports)${NC}"
    ISSUES=1
  fi

  # Check for proper import paths with .js extension for local imports
  if grep -E -q "import .+ from '\.\.?\/[^']+" "$file" && ! grep -E -q "import .+ from '\.\.?\/[^']+\.js'" "$file"; then
    if ! grep -q "import React from 'react'" "$file" && ! grep -q "from '@react-navigation" "$file"; then
      echo -e "${YELLOW}⚠ $file may need .js extension in import paths${NC}"
      ISSUES=1
    fi
  fi

  if [ $ISSUES -eq 1 ]; then
    FILES_WITH_ISSUES=$((FILES_WITH_ISSUES + 1))
  fi
done

echo -e "${YELLOW}===== Check Summary =====${NC}"
if [ $FILES_WITH_ISSUES -eq 0 ]; then
  echo -e "${GREEN}✓ All files use proper ES module syntax${NC}"
  exit 0
else
  echo -e "${RED}✘ Found $FILES_WITH_ISSUES files with ES module issues${NC}"
  echo -e "${YELLOW}Recommendations:${NC}"
  echo -e "1. Use import/export instead of require/module.exports"
  echo -e "2. Add .js extension to relative imports"
  echo -e "3. Be consistent with export style (named vs default)"
  echo -e "${RED}✘ ES Module Syntax Test Failed${NC}"
  exit 1
fi