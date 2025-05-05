
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running All Tests with Coverage (No Threshold) =====${NC}"

# Install jest-environment-jsdom if not already installed
if ! npm list jest-environment-jsdom > /dev/null 2>&1; then
  echo -e "${YELLOW}Installing jest-environment-jsdom...${NC}"
  npm install --save-dev jest-environment-jsdom
fi

# Run Jest with coverage but without thresholds
npx jest --coverage

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}===== All Tests Passed! =====${NC}"
  echo -e "${YELLOW}Note: Coverage results are shown above, but no thresholds were enforced.${NC}"
else
  echo -e "${RED}===== Some Tests Failed! =====${NC}"
  echo -e "${YELLOW}Fix the failing tests before continuing.${NC}"
fi

exit $EXIT_CODE
