#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Tests with Coverage =====${NC}"

# Run Jest with coverage
npx jest --coverage 

# Check if the tests passed
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed with coverage${NC}"
else
  echo -e "${RED}❌ Some tests failed${NC}"
fi