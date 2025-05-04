
#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running AccountSetupScreen Persistence Test =====${NC}"

# Run the test file
node src/utils/__tests__/accountSetupDataTest.js

# Capture the exit code
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}===== Test Passed! The AccountSetupScreen persistence functionality is working correctly =====${NC}"
else
  echo -e "${RED}===== Test Failed! The AccountSetupScreen persistence functionality is NOT working correctly =====${NC}"
fi

exit $TEST_RESULT
