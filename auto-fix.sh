
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

# First run the ES module syntax check
echo -e "${YELLOW}\n===== Checking ES Module Syntax =====${NC}"
./check-es-modules.sh
CHECK_RESULT=$?

# Fix import paths
echo -e "${YELLOW}\n===== Fixing Import Paths =====${NC}"
./fix-all-imports.sh

# Fix deprecated pointerEvents props
echo -e "${YELLOW}\n===== Fixing Deprecated pointerEvents =====${NC}"
./fix-pointer-events.sh

# Function to fix CommonJS to ESM syntax issues
fix_commonjs_to_esm() {
    echo -e "${YELLOW}\n===== Converting CommonJS to ES Module Syntax =====${NC}"
    
    find ./src -type f -name "*.js" -o -name "*.jsx" | grep -v "node_modules" | while read -r file; do
        # Convert module.exports = to export default
        perl -i -pe 's/module\.exports\s*=\s*/export default /g' "$file"
        
        # Convert exports.name = to export const name =
        perl -i -pe 's/exports\.(\w+)\s*=\s*/export const \1 = /g' "$file"
        
        # Convert require() to import
        grep -q "require(" "$file" && echo -e "${YELLOW}Found require() in $file - converting to import${NC}"
        perl -i -pe 's/const\s+(\w+)\s*=\s*require\(['"'"'"]([^'"'"'"]+)['"'"'"]\)/import \1 from "\2"/g' "$file"
        
        # Convert destructured require
        perl -i -pe 's/const\s+\{\s*([^}]+)\s*\}\s*=\s*require\(['"'"'"]([^'"'"'"]+)['"'"'"]\)/import { \1 } from "\2"/g' "$file"
    done
    
    echo -e "${GREEN}✅ Finished converting CommonJS syntax to ES modules${NC}"
}

# Function to fix outline CSS property issues in React Native StyleSheet
fix_outline_properties() {
    echo -e "${YELLOW}\n===== Fixing Invalid outline Style Properties =====${NC}"
    
    find ./src -type f -name "*.js" -o -name "*.jsx" | grep -v "node_modules" | xargs grep -l "outline:" | while read -r file; do
        echo -e "${YELLOW}Fixing outline property in $file${NC}"
        
        # Replace outline: 'none' with outlineStyle: 'none' in StyleSheet objects
        perl -i -pe 's/(\s*)(outline:\s*["'"'"']none["'"'"'],?)/\1outlineStyle: "none",/g' "$file"
        perl -i -pe 's/(\s*)(outline:\s*["'"'"']solid["'"'"'],?)/\1outlineStyle: "solid",/g' "$file"
        
        # Handle outline with size and color (more complex cases)
        perl -i -pe 's/(\s*)(outline:\s*["'"'"']([0-9]+)(px|rem|em)\s+([a-zA-Z]+)\s+([a-zA-Z#0-9]+)["'"'"'],?)/\1outlineWidth: "\3\4", outlineStyle: "\5", outlineColor: "\6",/g' "$file"
        
        echo -e "${GREEN}Fixed outline property in $file${NC}"
    done
    
    echo -e "${GREEN}✅ Finished fixing outline style properties${NC}"
}

# Run CommonJS to ESM fix if the check failed
if [[ $CHECK_RESULT -ne 0 ]]; then
    fix_commonjs_to_esm
fi

# Fix outline properties
fix_outline_properties

echo -e "\n${GREEN}===== Auto-Fix Complete =====${NC}"
echo -e "${YELLOW}The following fixes were applied:${NC}"
echo -e "  - Fixed import paths (extensions and duplicate extensions)"
echo -e "  - Fixed deprecated pointerEvents props"
echo -e "  - Converted CommonJS syntax to ES modules (if needed)"
echo -e "  - Fixed invalid outline style properties"
echo -e "\n${YELLOW}You may now run your application or tests.${NC}"
