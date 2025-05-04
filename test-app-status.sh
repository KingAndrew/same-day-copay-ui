
#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Testing Application Status =====${NC}"

# Check if the web app is running
if curl -s http://localhost:3000 > /dev/null; then
  echo -e "${GREEN}✅ Web application is running on port 3000${NC}"
else
  echo -e "${RED}❌ Web application is not responding on port 3000${NC}"
fi

# Check package.json exists and has valid content
if [ -f "package.json" ]; then
  echo -e "${GREEN}✅ package.json exists${NC}"
  if grep -q "\"name\": \"same-day-copay-ui\"" package.json; then
    echo -e "${GREEN}✅ package.json contains expected content${NC}"
  else
    echo -e "${RED}❌ package.json may be corrupted${NC}"
  fi
else
  echo -e "${RED}❌ package.json is missing${NC}"
fi

# Check src directory structure
if [ -d "src" ]; then
  echo -e "${GREEN}✅ src directory exists${NC}"
  if [ -f "src/App.jsx" ]; then
    echo -e "${GREEN}✅ Main App component exists${NC}"
  else
    echo -e "${RED}❌ Main App component is missing${NC}"
  fi
else
  echo -e "${RED}❌ src directory is missing${NC}"
fi

# Try to check if dataAPI.js has proper exports
if [ -f "src/utils/dataAPI.js" ]; then
  echo -e "${GREEN}✅ dataAPI.js exists${NC}"
  if grep -q "export { dataAPI }" src/utils/dataAPI.js; then
    echo -e "${GREEN}✅ dataAPI.js has proper exports${NC}"
  else
    echo -e "${YELLOW}⚠️ dataAPI.js may not have proper exports${NC}"
  fi
else
  echo -e "${RED}❌ dataAPI.js is missing${NC}"
fi

echo -e "\n${YELLOW}===== Test Completed =====${NC}"
echo -e "${GREEN}To run the web app, click the 'Run' button above.${NC}"
