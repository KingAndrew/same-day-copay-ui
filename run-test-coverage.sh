
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Test Coverage =====${NC}"

# Install jest-environment-jsdom if not already installed
if ! npm list jest-environment-jsdom > /dev/null 2>&1; then
  echo -e "${YELLOW}Installing jest-environment-jsdom...${NC}"
  npm install --save-dev jest-environment-jsdom
fi

# Run Jest with coverage
npx jest --coverage --coverageThreshold='{"global":{"branches":75,"functions":75,"lines":75,"statements":75}}'

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}===== Test Coverage Passed! =====${NC}"
else
  echo -e "${RED}===== Test Coverage Failed! =====${NC}"
fi

exit $EXIT_CODE
