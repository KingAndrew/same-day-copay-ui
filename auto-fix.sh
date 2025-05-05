
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running Auto-Fix Script =====${NC}"

# Make all scripts executable
chmod +x fix-all-imports.sh
chmod +x fix-pointer-events.sh
chmod +x check-es-modules.sh

# Track if any fixes were applied
FIXES_APPLIED=0

# Function to fix import paths with idempotence check
fix_import_paths() {
    echo -e "${YELLOW}\n===== Fixing Import Paths =====${NC}"
    
    # Store current state of all files to temporary location
    mkdir -p ./tmp
    find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec md5sum {} \; > ./tmp/files_before_fix.md5
    
    # Run the fix script
    FIXED_COUNT=0
    ./fix-all-imports.sh > ./tmp/import_fix.log
    FIXED_COUNT=$(grep -c "Fixed imports in" ./tmp/import_fix.log)
    
    # Check if any files actually changed by comparing checksums
    find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec md5sum {} \; > ./tmp/files_after_fix.md5
    
    # Compare files before and after
    DIFF_COUNT=$(diff ./tmp/files_before_fix.md5 ./tmp/files_after_fix.md5 | wc -l)
    
    if [ $DIFF_COUNT -gt 0 ]; then
        echo -e "${GREEN}✅ Fixed imports in $FIXED_COUNT files${NC}"
        FIXES_APPLIED=1
    else
        echo -e "${GREEN}✅ No import issues found, skipping fix${NC}"
    fi
}

# Function to fix deprecated pointerEvents props
fix_pointer_events() {
    echo -e "${YELLOW}\n===== Fixing Deprecated pointerEvents =====${NC}"
    
    # Check for files with pointerEvents issues before fixing
    POINTER_EVENTS_COUNT=$(find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec grep -l "pointerEvents=" {} \; | wc -l)
    
    if [ $POINTER_EVENTS_COUNT -gt 0 ]; then
        # Only run the fix script if there are issues
        ./fix-pointer-events.sh
        FIXES_APPLIED=1
    else
        echo -e "${GREEN}✅ No pointerEvents issues found, skipping fix${NC}"
    fi
}

# Function to fix CommonJS to ESM syntax issues
fix_commonjs_to_esm() {
    echo -e "${YELLOW}\n===== Converting CommonJS to ES Module Syntax =====${NC}"
    
    # Check for CommonJS patterns before fixing
    COMMONJS_COUNT=$(find ./src -type f \( -name "*.js" -o -name "*.jsx" \) \
        \( -exec grep -l "module\.exports" {} \; -o -exec grep -l "require(" {} \; -o -exec grep -l "exports\." {} \; \) | wc -l)
    
    if [ $COMMONJS_COUNT -gt 0 ]; then
        # Only convert if issues are found
        find ./src -type f -name "*.js" -o -name "*.jsx" | grep -v "node_modules" | while read -r file; do
            # Ignore __tests__ directories for CommonJS patterns in string literals
            if [[ "$file" == *"__tests__"* ]] && grep -q "console.log.*exports\." "$file"; then
                echo -e "${YELLOW}Skipping test file with console.log statements containing 'exports.': $file${NC}"
                continue
            fi
            
            # Analyze if the file has actual CommonJS syntax (not in strings/comments)
            if grep -q -E "^[^/\"']*module\.exports|^[^/\"']*require\(|^[^/\"']*exports\." "$file"; then
                echo -e "${YELLOW}Found CommonJS syntax in $file - converting to ES modules${NC}"
                
                # Convert module.exports = to export default
                perl -i -pe 's/^([^\/\"\']*)module\.exports\s*=\s*/\1export default /g' "$file"
                
                # Convert exports.name = to export const name =
                perl -i -pe 's/^([^\/\"\']*)exports\.(\w+)\s*=\s*/\1export const \2 = /g' "$file"
                
                # Convert require() to import
                perl -i -pe 's/^([^\/\"\']*)const\s+(\w+)\s*=\s*require\(['"'"'"]([^'"'"'"]+)['"'"'"]\)/\1import \2 from "\3"/g' "$file"
                
                # Convert destructured require
                perl -i -pe 's/^([^\/\"\']*)const\s+\{\s*([^}]+)\s*\}\s*=\s*require\(['"'"'"]([^'"'"'"]+)['"'"'"]\)/\1import { \2 } from "\3"/g' "$file"
                
                FIXES_APPLIED=1
            fi
        done
        
        echo -e "${GREEN}✅ Finished converting CommonJS syntax to ES modules${NC}"
    else
        echo -e "${GREEN}✅ No CommonJS syntax issues found, skipping fix${NC}"
    fi
}

# Function to fix outline CSS property issues in React Native StyleSheet
fix_outline_properties() {
    echo -e "${YELLOW}\n===== Fixing Invalid outline Style Properties =====${NC}"
    
    # Check for outline properties before fixing
    OUTLINE_COUNT=$(find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec grep -l "outline:" {} \; | wc -l)
    
    if [ $OUTLINE_COUNT -gt 0 ]; then
        find ./src -type f -name "*.js" -o -name "*.jsx" | grep -v "node_modules" | xargs grep -l "outline:" | while read -r file; do
            echo -e "${YELLOW}Fixing outline property in $file${NC}"
            
            # Replace outline: 'none' with outlineStyle: 'none' in StyleSheet objects
            perl -i -pe 's/(\s*)(outline:\s*["'"'"']none["'"'"'],?)/\1outlineStyle: "none",/g' "$file"
            perl -i -pe 's/(\s*)(outline:\s*["'"'"']solid["'"'"'],?)/\1outlineStyle: "solid",/g' "$file"
            
            # Handle outline with size and color (more complex cases)
            perl -i -pe 's/(\s*)(outline:\s*["'"'"']([0-9]+)(px|rem|em)\s+([a-zA-Z]+)\s+([a-zA-Z#0-9]+)["'"'"'],?)/\1outlineWidth: "\3\4", outlineStyle: "\5", outlineColor: "\6",/g' "$file"
            
            echo -e "${GREEN}Fixed outline property in $file${NC}"
            FIXES_APPLIED=1
        done
        
        echo -e "${GREEN}✅ Finished fixing outline style properties${NC}"
    else
        echo -e "${GREEN}✅ No outline style issues found, skipping fix${NC}"
    fi
}

# Function to fix duplicate extensions in import paths
fix_duplicate_extensions() {
    echo -e "${YELLOW}\n===== Fixing Duplicate Extensions in Import Paths =====${NC}"
    
    # Check for duplicate extensions before fixing
    DUPLICATE_EXT_COUNT=$(find ./src -type f \( -name "*.js" -o -name "*.jsx" \) \
        \( -exec grep -l "\.js\.js" {} \; -o -exec grep -l "\.jsx\.js" {} \; \) | wc -l)
    
    if [ $DUPLICATE_EXT_COUNT -gt 0 ]; then
        find ./src -type f \( -name "*.js" -o -name "*.jsx" \) | while read -r file; do
            if grep -q -E "\.js\.js|\.jsx\.js" "$file"; then
                echo -e "${YELLOW}Fixing duplicate extensions in $file${NC}"
                
                # Fix .js.js -> .js
                perl -i -pe 's/(\.js)(\.js)+/\1/g' "$file"
                
                # Fix .jsx.js -> .jsx
                perl -i -pe 's/(\.jsx)(\.js)+/\1/g' "$file"
                
                # Fix import paths in specific files that have been problematic
                if [[ "$file" == "src/index.web.js" ]]; then
                    perl -i -pe 's/import App from .+;/import App from '\''\.\/App\.jsx'\'';/g' "$file"
                fi
                
                FIXES_APPLIED=1
            fi
        done
        
        echo -e "${GREEN}✅ Finished fixing duplicate extensions${NC}"
    else
        echo -e "${GREEN}✅ No duplicate extensions found, skipping fix${NC}"
    fi
}

# First run the ES module syntax check
echo -e "${YELLOW}\n===== Checking ES Module Syntax =====${NC}"
./check-es-modules.sh
CHECK_RESULT=$?

# Run all fixes
fix_import_paths
fix_pointer_events
fix_commonjs_to_esm
fix_outline_properties
fix_duplicate_extensions

echo -e "\n${GREEN}===== Auto-Fix Complete =====${NC}"
if [ $FIXES_APPLIED -eq 1 ]; then
    echo -e "${YELLOW}The following fixes were applied:${NC}"
    echo -e "  - Fixed import paths (extensions and duplicate extensions)"
    echo -e "  - Fixed deprecated pointerEvents props"
    echo -e "  - Converted CommonJS syntax to ES modules (if needed)"
    echo -e "  - Fixed invalid outline style properties"
else
    echo -e "${GREEN}✅ No issues found - all files are already fixed!${NC}"
fi

echo -e "\n${YELLOW}You may now run your application or tests.${NC}"
