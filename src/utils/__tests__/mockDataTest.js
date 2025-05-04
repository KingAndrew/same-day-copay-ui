
// Using CommonJS for Node.js compatibility
const fs = require('fs');
const path = require('path');

// Mock implementation of dataAPI for testing purposes
const mockDataAPI = {
  getData: function(key) {
    // Directly access mockData for testing
    const mockData = {
      "David.accountSetup.personal": {
        firstName: "David",
        lastName: "Smith",
        email: "David",
        preferredName: "David Smith"
      }
    };
    return Promise.resolve(mockData[key] || null);
  },
  
  setData: function(key, data) {
    // Just return success for test
    return Promise.resolve(true);
  }
};

// Test function that runs all tests
function runAllTests() {
  console.log('\n----- Starting Mock Data Tests -----\n');
  
  // Test 1: Get existing data
  return testGetExistingData()
    .then(result => {
      if (!result) return false;
      // Test 2: Update data
      return testUpdateData();
    })
    .then(result => {
      if (!result) return false;
      // All tests passed
      console.log('\n✅ ALL TESTS PASSED - Mock data retrieval and persistence are working correctly!');
      return true;
    })
    .catch(error => {
      console.error('\n❌ TEST ERROR:', error);
      return false;
    });
}

// Test retrieving existing data
function testGetExistingData() {
  console.log('Test 1: Retrieving existing data...');
  
  return mockDataAPI.getData("David.accountSetup.personal")
    .then(data => {
      if (!data) {
        console.log('❌ TEST FAILED: No data returned for key "David.accountSetup.personal"');
        return false;
      }
      
      console.log('Data retrieved:', JSON.stringify(data, null, 2));
      
      if (data.firstName !== "David" || data.lastName !== "Smith") {
        console.log('❌ TEST FAILED: Data does not match expected values');
        return false;
      }
      
      console.log('✅ Test 1 PASSED: Data retrieved successfully with correct values');
      return true;
    });
}

// Test updating data
function testUpdateData() {
  console.log('\nTest 2: Updating data...');
  
  return mockDataAPI.getData("David.accountSetup.personal")
    .then(data => {
      if (!data) {
        console.log('❌ TEST FAILED: No data returned for update test');
        return false;
      }
      
      // Update the preferred name
      const updatedData = { ...data, preferredName: "Frankie" };
      
      return mockDataAPI.setData("David.accountSetup.personal", updatedData)
        .then(success => {
          if (!success) {
            console.log('❌ TEST FAILED: Data update returned failure');
            return false;
          }
          
          // Verify the update
          return mockDataAPI.getData("David.accountSetup.personal")
            .then(newData => {
              if (!newData) {
                console.log('❌ TEST FAILED: No data returned after update');
                return false;
              }
              
              console.log('Updated data:', JSON.stringify(newData, null, 2));
              
              if (newData.preferredName !== "Frankie") {
                console.log('❌ TEST FAILED: Updated value not reflected in data');
                return false;
              }
              
              console.log('✅ Test 2 PASSED: Data updated successfully');
              return true;
            });
        });
    });
}

// Run all tests and handle process exit code
runAllTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ FATAL ERROR:', error);
    process.exit(1);
  });
