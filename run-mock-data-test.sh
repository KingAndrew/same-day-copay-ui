
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Mock Data Retrieval Test ===== ${NC}"

# Run the test
node src/utils/__tests__/mockDataTest.js

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}===== Mock Data Retrieval Test Passed! =====${NC}"
else
  echo -e "${RED}===== Mock Data Retrieval Test Failed! =====${NC}"
fi

exit $EXIT_CODE
