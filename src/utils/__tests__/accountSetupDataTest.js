
const { dataAPI } = require('../dataAPI');

/**
 * Test AccountSetupScreen data persistence functionality
 */
async function testAccountSetupPersistence() {
  console.log('===== Testing AccountSetupScreen Persistence Functionality =====');
  
  // Test data that mimics the structure used in AccountSetupScreen
  const testEmail = 'test.account@example.com';
  
  const personalData = {
    firstName: 'John',
    lastName: 'Doe',
    email: testEmail,
    preferredName: 'Johnny'
  };
  
  const bankData = {
    bankName: 'Test Bank',
    routingNumber: '123456789',
    accountNumber: '987654321'
  };
  
  const insuranceData = {
    provider: 'Test Insurance Co',
    policyNumber: 'POL123456',
    groupNumber: 'GRP789012'
  };
  
  const sameDayData = {
    paymentMethod: 'Direct Deposit',
    preferredBank: 'Test Bank'
  };
  
  try {
    // Step 1: Test saving and retrieving personal data
    console.log('1. Testing personal data persistence...');
    await dataAPI.saveUserData(testEmail, 'accountSetup.personal', personalData);
    const retrievedPersonal = await dataAPI.getUserData(testEmail, 'accountSetup.personal');
    
    const personalMatch = 
      retrievedPersonal &&
      retrievedPersonal.firstName === personalData.firstName &&
      retrievedPersonal.lastName === personalData.lastName;
    
    console.log(`   Personal data test: ${personalMatch ? 'PASS' : 'FAIL'}`);
    
    // Step 2: Test saving and retrieving bank data
    console.log('2. Testing bank data persistence...');
    await dataAPI.saveUserData(testEmail, 'accountSetup.bank', bankData);
    const retrievedBank = await dataAPI.getUserData(testEmail, 'accountSetup.bank');
    
    const bankMatch = 
      retrievedBank &&
      retrievedBank.bankName === bankData.bankName &&
      retrievedBank.routingNumber === bankData.routingNumber;
    
    console.log(`   Bank data test: ${bankMatch ? 'PASS' : 'FAIL'}`);
    
    // Step 3: Test saving and retrieving insurance data
    console.log('3. Testing insurance data persistence...');
    await dataAPI.saveUserData(testEmail, 'accountSetup.insurance', insuranceData);
    const retrievedInsurance = await dataAPI.getUserData(testEmail, 'accountSetup.insurance');
    
    const insuranceMatch = 
      retrievedInsurance &&
      retrievedInsurance.provider === insuranceData.provider &&
      retrievedInsurance.policyNumber === insuranceData.policyNumber;
    
    console.log(`   Insurance data test: ${insuranceMatch ? 'PASS' : 'FAIL'}`);
    
    // Step 4: Test saving and retrieving same day data
    console.log('4. Testing same day data persistence...');
    await dataAPI.saveUserData(testEmail, 'accountSetup.sameDay', sameDayData);
    const retrievedSameDay = await dataAPI.getUserData(testEmail, 'accountSetup.sameDay');
    
    const sameDayMatch = 
      retrievedSameDay &&
      retrievedSameDay.paymentMethod === sameDayData.paymentMethod &&
      retrievedSameDay.preferredBank === sameDayData.preferredBank;
    
    console.log(`   Same day data test: ${sameDayMatch ? 'PASS' : 'FAIL'}`);
    
    // Overall result
    const allPassed = personalMatch && bankMatch && insuranceMatch && sameDayMatch;
    return allPassed;
    
  } catch (error) {
    console.error('ERROR during AccountSetupScreen persistence test:', error);
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
