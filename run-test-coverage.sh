
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Test Coverage =====${NC}"

# Make this script executable
chmod +x run-test-coverage.sh

# Run Jest with coverage
npx jest --coverage --coverageThreshold='{"global":{"branches":85,"functions":85,"lines":85,"statements":85}}'

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}===== Test Coverage Passed! =====${NC}"
else
  echo -e "${RED}===== Test Coverage Failed! =====${NC}"
fi

exit $EXIT_CODE
