
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

# Initial threshold settings (lower for first run)
THRESHOLD_BRANCHES=30
THRESHOLD_FUNCTIONS=30
THRESHOLD_LINES=30
THRESHOLD_STATEMENTS=30

# Check if we should try with higher thresholds
if [ "$1" == "--strict" ]; then
  THRESHOLD_BRANCHES=75
  THRESHOLD_FUNCTIONS=75
  THRESHOLD_LINES=75
  THRESHOLD_STATEMENTS=75
  echo -e "${YELLOW}Using strict coverage thresholds (75%)${NC}"
else
  echo -e "${YELLOW}Using relaxed coverage thresholds (30%)${NC}"
  echo -e "${YELLOW}Use --strict flag for 75% thresholds${NC}"
fi

# Run Jest with coverage
npx jest --coverage --coverageThreshold="{\"global\":{\"branches\":$THRESHOLD_BRANCHES,\"functions\":$THRESHOLD_FUNCTIONS,\"lines\":$THRESHOLD_LINES,\"statements\":$THRESHOLD_STATEMENTS}}"

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}===== Test Coverage Passed! =====${NC}"
else
  echo -e "${RED}===== Test Coverage Failed! =====${NC}"
  echo -e "${YELLOW}Try running with lower thresholds if needed${NC}"
fi

exit $EXIT_CODE
