#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running DataAPI Test =====${NC}"

# Run the test file
node src/utils/__tests__/dataAPITest.js

# Capture the exit code
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}===== DataAPI Test Passed! is working correctly =====${NC}"
else
  echo -e "${RED}===== DataAPI Test Failed! DataAPI is NOT working correctly =====${NC}"
fi

exit $TEST_RESULT