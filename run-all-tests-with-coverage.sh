
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running All Tests with Coverage =====${NC}"

# Make this script executable
chmod +x run-all-tests-with-coverage.sh

# Run the tests with coverage
npx jest --coverage

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed${NC}"
else
  echo -e "${RED}❌ Some tests failed${NC}"
fi

echo -e "\n${YELLOW}===== Tests Completed =====${NC}"
