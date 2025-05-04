
const { dataAPI } = require('../dataAPI');
const mockData = require('../mockDataSource').default;

async function testMockDataRetrieval() {
  console.log('===== Testing Mock Data Retrieval =====');
  
  try {
    // 1. Test direct access to mockData
    console.log('1. Direct access to mockData:');
    console.log(mockData["David.accountSetup.personal"]);
    
    // 2. Test retrieval through dataAPI
    console.log('\n2. Retrieval through dataAPI:');
    const userData = await dataAPI.getUserData("David", "accountSetup.personal");
    console.log(userData);
    
    // 3. Test if data matches
    const directData = mockData["David.accountSetup.personal"];
    const matches = userData && 
      userData.firstName === directData.firstName &&
      userData.lastName === directData.lastName &&
      userData.preferredName === directData.preferredName;
    
    console.log(`\n3. Data match test: ${matches ? 'PASS' : 'FAIL'}`);
    
    // 4. Test data modification
    console.log('\n4. Testing data modification:');
    const updatedData = { ...directData, preferredName: "Frankie" };
    const saveResult = await dataAPI.saveUserData("David", "accountSetup.personal", updatedData);
    console.log(`Data saved successfully: ${saveResult}`);
    
    // 5. Test retrieval of modified data
    console.log('\n5. Retrieving modified data:');
    const updatedUserData = await dataAPI.getUserData("David", "accountSetup.personal");
    console.log(updatedUserData);
    
    const updateMatches = updatedUserData && updatedUserData.preferredName === "Frankie";
    console.log(`\n6. Update verification: ${updateMatches ? 'PASS' : 'FAIL'}`);
    
    return matches && updateMatches;
  } catch (error) {
    console.error('ERROR during mock data test:', error);
    return false;
  }
}

// Run the test
testMockDataRetrieval()
  .then(success => {
    if (success) {
      console.log('\n✅ ALL TESTS PASSED - Mock data retrieval is working correctly!');
    } else {
      console.log('\n❌ TESTS FAILED - Mock data retrieval is not working correctly!');
    }
  });
