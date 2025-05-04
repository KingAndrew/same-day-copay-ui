
#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Running dataAPI Persistence Test =====${NC}"

# Create the test file if it doesn't exist
if [ ! -f "src/utils/__tests__/dataAPIPersistenceTest.js" ]; then
  echo -e "${YELLOW}Creating test file...${NC}"
  mkdir -p src/utils/__tests__
  cat > src/utils/__tests__/dataAPIPersistenceTest.js << 'EOF'
const { dataAPI } = require('../dataAPI');

/**
 * Test dataAPI's ability to save and retrieve user data
 */
async function testDataAPIPersistence() {
  console.log('===== Testing dataAPI Persistence Functionality =====');
  
  // Test data
  const testEmail = 'test.user@example.com';
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: testEmail,
    preferredName: 'Tester'
  };
  
  try {
    console.log('1. Saving test user data...');
    const saveResult = await dataAPI.saveUserData(testEmail, 'accountSetup.personal', testData);
    console.log(`   Data saved successfully: ${saveResult}`);
    
    console.log('2. Retrieving saved user data...');
    const retrievedData = await dataAPI.getUserData(testEmail, 'accountSetup.personal');
    console.log('   Retrieved data:', retrievedData);
    
    // Verify retrieved data matches original data
    const dataMatches = 
      retrievedData && 
      retrievedData.firstName === testData.firstName &&
      retrievedData.lastName === testData.lastName &&
      retrievedData.email === testData.email &&
      retrievedData.preferredName === testData.preferredName;
    
    console.log(`3. Data verification result: ${dataMatches ? 'PASS' : 'FAIL'}`);
    
    if (dataMatches) {
      console.log('4. Modifying user data...');
      const updatedData = { ...testData, preferredName: 'Updated Name' };
      const updateResult = await dataAPI.saveUserData(testEmail, 'accountSetup.personal', updatedData);
      console.log(`   Data updated successfully: ${updateResult}`);
      
      console.log('5. Retrieving updated user data...');
      const retrievedUpdatedData = await dataAPI.getUserData(testEmail, 'accountSetup.personal');
      console.log('   Retrieved updated data:', retrievedUpdatedData);
      
      const updateMatches = 
        retrievedUpdatedData && 
        retrievedUpdatedData.preferredName === 'Updated Name';
      
      console.log(`6. Update verification result: ${updateMatches ? 'PASS' : 'FAIL'}`);
      
      return dataMatches && updateMatches;
    }
    
    return dataMatches;
  } catch (error) {
    console.error('ERROR during dataAPI persistence test:', error);
    return false;
  }
}

// Run the test and output final result
testDataAPIPersistence()
  .then(success => {
    if (success) {
      console.log('\n✅ ALL TESTS PASSED - Data persistence is working correctly!');
      process.exit(0);
    } else {
      console.log('\n❌ TESTS FAILED - Data persistence is not working correctly!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Test execution error:', err);
    process.exit(1);
  });
EOF
fi

# Run the test file
node src/utils/__tests__/dataAPIPersistenceTest.js

# Capture the exit code
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo -e "${GREEN}===== Test Passed! The dataAPI persistence functionality is working correctly =====${NC}"
else
  echo -e "${RED}===== Test Failed! The dataAPI persistence functionality is NOT working correctly =====${NC}"
fi

exit $TEST_RESULT
