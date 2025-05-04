
#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Mock Data Retrieval Test =====${NC}"

# Make the script executable
chmod +x run-mock-data-test.sh

# Run the test file
node src/utils/__tests__/mockDataTest.js

# Capture the exit code
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}===== Test Completed! =====${NC}"
else
  echo -e "${RED}===== Test Failed! =====${NC}"
fi

exit $TEST_RESULT
