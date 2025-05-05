
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Testing auto-fix.sh Idempotence =====${NC}"
echo -e "This test checks if running auto-fix.sh multiple times produces different results"

# Make script executable
chmod +x auto-fix.sh
chmod +x test-autofix-idempotence.sh

# Function to count occurrences of various fix indicators in the log output
count_fixes() {
    local log_file=$1
    
    # Count patterns indicating fixes
    IMPORT_FIXES=$(grep -c "Fixed imports in" "$log_file")
    POINTER_FIXES=$(grep -c "Fixed deprecated pointerEvents in" "$log_file")
    OUTLINE_FIXES=$(grep -c "Fixed outline property in" "$log_file")
    MODULE_FIXES=$(grep -c "Found CommonJS syntax in" "$log_file")
    DUPLICATE_FIXES=$(grep -c "Fixing duplicate extensions in" "$log_file")
    
    # Calculate total fixes
    TOTAL_FIXES=$((IMPORT_FIXES + POINTER_FIXES + OUTLINE_FIXES + MODULE_FIXES + DUPLICATE_FIXES))
    
    echo "$TOTAL_FIXES"
}

# Create a temporary directory for logs
mkdir -p ./tmp
FIRST_RUN_LOG="./tmp/autofix_run1.log"
SECOND_RUN_LOG="./tmp/autofix_run2.log"

echo -e "\n${YELLOW}Running auto-fix.sh for the first time...${NC}"
./auto-fix.sh > "$FIRST_RUN_LOG" 2>&1

# Count fixes from first run
FIRST_RUN_FIXES=$(count_fixes "$FIRST_RUN_LOG")
echo -e "First run fixed ${GREEN}$FIRST_RUN_FIXES${NC} issues"

echo -e "\n${YELLOW}Running auto-fix.sh for the second time...${NC}"
./auto-fix.sh > "$SECOND_RUN_LOG" 2>&1

# Count fixes from second run
SECOND_RUN_FIXES=$(count_fixes "$SECOND_RUN_LOG")
echo -e "Second run fixed ${GREEN}$SECOND_RUN_FIXES${NC} issues"

# Compare the two runs
if [ "$SECOND_RUN_FIXES" -eq 0 ]; then
    echo -e "\n${GREEN}✅ TEST PASSED: auto-fix.sh is idempotent!${NC}"
    echo "Running auto-fix.sh a second time didn't find any additional issues to fix."
else
    echo -e "\n${RED}❌ TEST FAILED: auto-fix.sh is NOT idempotent!${NC}"
    echo "Running auto-fix.sh a second time found and fixed $SECOND_RUN_FIXES additional issues."
    
    # Extract information about what was fixed in the second run
    IMPORT_FIXES=$(grep -c "Fixed imports in" "$SECOND_RUN_LOG")
    POINTER_FIXES=$(grep -c "Fixed deprecated pointerEvents in" "$SECOND_RUN_LOG")
    OUTLINE_FIXES=$(grep -c "Fixed outline property in" "$SECOND_RUN_LOG")
    MODULE_FIXES=$(grep -c "Found CommonJS syntax in" "$SECOND_RUN_LOG")
    DUPLICATE_FIXES=$(grep -c "Fixing duplicate extensions in" "$SECOND_RUN_LOG")
    
    # Show counts for different types of fixes
    if [ "$IMPORT_FIXES" -gt 0 ]; then
        echo -e "- Found ${RED}$IMPORT_FIXES${NC} additional import fixes in second run"
    fi
    if [ "$POINTER_FIXES" -gt 0 ]; then
        echo -e "- Found ${RED}$POINTER_FIXES${NC} additional pointerEvents fixes in second run"
    fi
    if [ "$OUTLINE_FIXES" -gt 0 ]; then
        echo -e "- Found ${RED}$OUTLINE_FIXES${NC} additional outline property fixes in second run"
    fi
    if [ "$MODULE_FIXES" -gt 0 ]; then
        echo -e "- Found ${RED}$MODULE_FIXES${NC} additional module export/require fixes in second run"
    fi
    if [ "$DUPLICATE_FIXES" -gt 0 ]; then
        echo -e "- Found ${RED}$DUPLICATE_FIXES${NC} additional duplicate extension fixes in second run"
    fi
    
    # Show detailed diff of what was fixed in the second run
    echo -e "\n${YELLOW}Details of issues fixed in second run:${NC}"
    grep -E "Fixed|Fixing" "$SECOND_RUN_LOG" | grep -v "Finished fixing" | grep -v "No issues found"
fi

# Compare file changes between runs to see what might be causing non-idempotence
echo -e "\n${YELLOW}Analyzing potential root causes...${NC}"

# Find duplicate extensions that might cause issues
echo -e "\n${YELLOW}Checking for remaining duplicate extensions...${NC}"
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs grep -l "\.js\.js" 2>/dev/null
find ./src -type f -name "*.js" -o -name "*.jsx" | xargs grep -l "\.jsx\.js" 2>/dev/null

# Clean up
echo -e "\n${YELLOW}Logs saved to ./tmp/autofix_run1.log and ./tmp/autofix_run2.log${NC}"
