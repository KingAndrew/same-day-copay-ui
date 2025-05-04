
/**
 * Pre-fix verification test utility
 * Runs before applying changes to verify the current state and ensure the fix is appropriate
 */
const fs = require('fs');
const path = require('path');

/**
 * Static code analysis to check basic patterns and common issues
 * @param {string} filePath - Path to the file to analyze
 * @returns {Object} - Analysis results with potential issues
 */
function analyzeCode(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const analysis = {
      issues: [],
      warnings: [],
      info: []
    };

    // Check for console.log statements
    const consoleLogMatches = content.match(/console\.log\(/g);
    if (consoleLogMatches && consoleLogMatches.length > 0) {
      analysis.warnings.push(`Found ${consoleLogMatches.length} console.log statements`);
    }

    // Check for TODO comments
    const todoMatches = content.match(/\/\/\s*TODO/g);
    if (todoMatches && todoMatches.length > 0) {
      analysis.info.push(`Found ${todoMatches.length} TODO comments`);
    }

    // Check for potential memory leaks in useEffect
    const useEffectWithoutCleanup = content.includes('useEffect') && 
      !content.includes('return () =>') && 
      (content.includes('addEventListener') || 
       content.includes('setInterval') || 
       content.includes('setTimeout'));
    
    if (useEffectWithoutCleanup) {
      analysis.warnings.push('Possible missing cleanup in useEffect');
    }

    // Check imports
    const importStatements = content.match(/import\s+.*\s+from\s+['"].*['"]/g) || [];
    const unusedImportPattern = /import\s+{([^}]*)}\s+from/;
    
    importStatements.forEach(importStmt => {
      const match = importStmt.match(unusedImportPattern);
      if (match && match[1]) {
        const imports = match[1].split(',').map(i => i.trim());
        imports.forEach(importName => {
          if (!content.includes(importName)) {
            analysis.warnings.push(`Potentially unused import: ${importName}`);
          }
        });
      }
    });

    return analysis;
  } catch (error) {
    return { issues: [`Error analyzing file: ${error.message}`], warnings: [], info: [] };
  }
}

/**
 * Verify a specific file exists and has expected properties
 */
function verifyDataAPI() {
  try {
    // Check if the file exists
    const dataAPIPath = path.resolve(__dirname, '../dataAPI.js');
    const exists = fs.existsSync(dataAPIPath);
    
    if (!exists) {
      console.log('❌ dataAPI.js does not exist');
      return false;
    }

    // Check file content to verify exports
    const content = fs.readFileSync(dataAPIPath, 'utf8');
    const hasNamedExport = content.includes('export const dataAPI');
    
    if (!hasNamedExport) {
      console.log('❌ dataAPI.js does not export dataAPI correctly');
      return false;
    }

    console.log('✓ dataAPI.js exists and exports dataAPI correctly');
    return true;
  } catch (error) {
    console.log(`❌ Error verifying dataAPI.js: ${error.message}`);
    return false;
  }
}

/**
 * Verify the AccountSetupScreen.js has the correct import 
 */
function verifyAccountSetupScreenImport() {
  try {
    const accountSetupPath = path.resolve(__dirname, '../../screens/AccountSetupScreen.js');
    const content = fs.readFileSync(accountSetupPath, 'utf8');
    
    // Check if the current import statement is correct
    const hasCorrectImport = content.includes("import { dataAPI } from '../utils/dataAPI'");
    const hasIncorrectImport = content.includes("import dataAPI from '../dataAPI'");
    
    console.log(`Current import statement is incorrect: \x1b[33m${hasIncorrectImport}\x1b[0m`);
    console.log(`The correct import should be: import { dataAPI } from '../utils/dataAPI'`);
    
    return !hasIncorrectImport;
  } catch (error) {
    console.log(`❌ Error verifying AccountSetupScreen.js: ${error.message}`);
    return false;
  }
}

/**
 * Run all pre-fix verification tests
 */
function runPreFixVerification() {
  console.log('Running pre-fix verification test...');
  
  // Verify the dataAPI file
  const dataAPIValid = verifyDataAPI();
  
  // Verify the import in AccountSetupScreen
  const accountSetupImportValid = verifyAccountSetupScreenImport();
  
  // Run static code analysis on the file we're about to modify
  const accountSetupPath = path.resolve(__dirname, '../../screens/AccountSetupScreen.js');
  const analysis = analyzeCode(accountSetupPath);
  
  if (analysis.issues.length > 0) {
    console.log('⚠️ Code analysis found issues:');
    analysis.issues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  if (analysis.warnings.length > 0) {
    console.log('⚠️ Code analysis warnings:');
    analysis.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  if (analysis.info.length > 0) {
    console.log('ℹ️ Code analysis info:');
    analysis.info.forEach(info => console.log(`  - ${info}`));
  }
  
  console.log('✓ Pre-fix verification completed');
  
  return dataAPIValid && accountSetupImportValid && analysis.issues.length === 0;
}

// Export the verification function
module.exports = {
  runPreFixVerification
};
