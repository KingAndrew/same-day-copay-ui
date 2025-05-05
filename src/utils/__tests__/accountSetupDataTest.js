
/**
 * AccountSetupScreen Data Persistence Test
 * 
 * This test verifies that the data persistence functionality for account setup works correctly.
 */

import { dataAPI  } from '../dataAPI.js';

/**
 * Test the account setup data persistence
 */
async function testAccountSetupPersistence() {
  console.log('\n----- Starting AccountSetupScreen Persistence Tests -----\n');
  
  let allTestsPassed = true;
  
  // Test data for personal info
  const testPersonal = {
    firstName: "John",
    lastName: "Doe",
    preferredName: "Johnny",
    email: "john.doe@example.com",
    phoneNumber: "555-987-6543"
  };
  
  // Test data for insurance info
  const testInsurance = {
    provider: "UnitedHealthcare",
    memberId: "UHC987654321",
    groupNumber: "UHC-GRP-123",
    planType: "HMO",
    deductible: 2000,
    copay: 25
  };
  
  // Test data for payment info
  const testPayment = {
    cardType: "Mastercard",
    lastFourDigits: "9876",
    expiryDate: "12/25",
    billingZip: "10001"
  };
  
  // Test 1: Save personal info
  console.log('Test 1: Saving personal info...');
  try {
    const saveResult = await dataAPI.saveData("TestUser.accountSetup.personal", testPersonal);
    if (!saveResult) {
      console.log('❌ TEST FAILED: Could not save personal info');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully saved personal info');
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 2: Get personal info
  console.log('\nTest 2: Getting personal info...');
  try {
    const retrievedData = await dataAPI.getData("TestUser.accountSetup.personal");
    
    if (!retrievedData) {
      console.log('❌ TEST FAILED: Could not retrieve personal info');
      allTestsPassed = false;
    } else if (retrievedData.firstName !== testPersonal.firstName || 
               retrievedData.lastName !== testPersonal.lastName) {
      console.log('❌ TEST FAILED: Retrieved personal info does not match saved data');
      console.log('Expected:', testPersonal);
      console.log('Retrieved:', retrievedData);
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully retrieved personal info:', retrievedData);
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 3: Save insurance info
  console.log('\nTest 3: Saving insurance info...');
  try {
    const saveResult = await dataAPI.saveData("TestUser.accountSetup.insurance", testInsurance);
    if (!saveResult) {
      console.log('❌ TEST FAILED: Could not save insurance info');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully saved insurance info');
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 4: Get insurance info
  console.log('\nTest 4: Getting insurance info...');
  try {
    const retrievedData = await dataAPI.getData("TestUser.accountSetup.insurance");
    
    if (!retrievedData) {
      console.log('❌ TEST FAILED: Could not retrieve insurance info');
      allTestsPassed = false;
    } else if (retrievedData.provider !== testInsurance.provider || 
               retrievedData.memberId !== testInsurance.memberId) {
      console.log('❌ TEST FAILED: Retrieved insurance info does not match saved data');
      console.log('Expected:', testInsurance);
      console.log('Retrieved:', retrievedData);
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully retrieved insurance info:', retrievedData);
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 5: Save payment info
  console.log('\nTest 5: Saving payment info...');
  try {
    const saveResult = await dataAPI.saveData("TestUser.accountSetup.payment", testPayment);
    if (!saveResult) {
      console.log('❌ TEST FAILED: Could not save payment info');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully saved payment info');
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 6: Get payment info
  console.log('\nTest 6: Getting payment info...');
  try {
    const retrievedData = await dataAPI.getData("TestUser.accountSetup.payment");
    
    if (!retrievedData) {
      console.log('❌ TEST FAILED: Could not retrieve payment info');
      allTestsPassed = false;
    } else if (retrievedData.cardType !== testPayment.cardType || 
               retrievedData.lastFourDigits !== testPayment.lastFourDigits) {
      console.log('❌ TEST FAILED: Retrieved payment info does not match saved data');
      console.log('Expected:', testPayment);
      console.log('Retrieved:', retrievedData);
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully retrieved payment info:', retrievedData);
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Final test report
  if (allTestsPassed) {
    console.log('\n✅ ALL TESTS PASSED - AccountSetupScreen persistence is working correctly!');
    return true;
  } else {
    console.log('\n❌ SOME TESTS FAILED - AccountSetupScreen persistence needs fixes!');
    return false;
  }
}

// Run the test and output final result
testAccountSetupPersistence()
  .then(success => {
    if (success) {
      console.log('\n✅ ALL TESTS PASSED - AccountSetupScreen persistence is working correctly!');
      process.exit(0);
    } else {
      console.log('\n❌ TESTS FAILED - AccountSetupScreen persistence is not working correctly!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Test execution error:', err);
    process.exit(1);
  });
