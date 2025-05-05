
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running All Tests =====${NC}"

# Make this script executable
#chmod +x run-all-tests.sh

# Make all test scripts executable
# chmod +x run-dataapi-test.sh
# chmod +x run-account-setup-test.sh
# chmod +x run-mock-data-test.sh
# echo -e "${YELLOW}===== Made Executable =====${NC}"

# Function to run a test script
run_test() {
  local script=$1
  local name=$2
  
  echo -e "\n${YELLOW}===== Running $name Test =====${NC}"
  
  if [ -f "$script" ]; then
    bash $script
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✅ $name Test Passed${NC}"
    else
      echo -e "${RED}❌ $name Test Failed${NC}"
    fi
  else
    echo -e "${RED}❌ ERROR: $script not found${NC}"
  fi
}

# Run each test one by one
run_test "./run-dataapi-test.sh" "DataAPI"
run_test "./run-mock-data-test.sh" "Mock Data"
run_test "./run-account-setup-test.sh" "Account Setup"
run_test "./run-test-coverage.sh" "Test Coverage"

echo -e "\n${YELLOW}===== All Tests Completed =====${NC}"
