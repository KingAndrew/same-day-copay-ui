
// Test if the fix will work by trying to import the dataAPI from the correct path
const fs = require('fs');
const path = require('path');

function runTest() {
  console.log('Running pre-fix verification test...');
  
  // Check if dataAPI.js exists in the utils directory
  const dataAPIPath = path.resolve(__dirname, '..', 'dataAPI.js');
  if (!fs.existsSync(dataAPIPath)) {
    console.error('ERROR: dataAPI.js does not exist in the utils directory!');
    process.exit(1);
  }
  
  // Try to read the file content to make sure it's valid
  try {
    const content = fs.readFileSync(dataAPIPath, 'utf8');
    if (!content.includes('export const dataAPI')) {
      console.error('ERROR: dataAPI.js does not export "dataAPI"!');
      process.exit(1);
    }
    console.log('✓ dataAPI.js exists and exports dataAPI correctly');
  } catch (error) {
    console.error('ERROR: Failed to read dataAPI.js:', error);
    process.exit(1);
  }
  
  // Check AccountSetupScreen.js import statement
  const accountSetupPath = path.resolve(__dirname, '../../screens/AccountSetupScreen.js');
  if (!fs.existsSync(accountSetupPath)) {
    console.error('ERROR: AccountSetupScreen.js does not exist!');
    process.exit(1);
  }
  
  try {
    const content = fs.readFileSync(accountSetupPath, 'utf8');
    const wrongImport = content.includes("import dataAPI from '../dataAPI'");
    const correctImportShouldBe = "import { dataAPI } from '../utils/dataAPI'";
    
    console.log('Current import statement is incorrect:', wrongImport);
    console.log('The correct import should be:', correctImportShouldBe);
    
    console.log('✓ Pre-fix verification completed');
  } catch (error) {
    console.error('ERROR: Failed to read AccountSetupScreen.js:', error);
    process.exit(1);
  }
}

runTest();
