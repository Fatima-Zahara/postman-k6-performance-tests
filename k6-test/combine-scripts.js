const fs = require('fs');
const path = require('path');

// Define paths
const k6TestDir = path.join(__dirname, 'k6-test');
const combinedScriptPath = path.join(__dirname, 'combined-k6-script.js');
const templatePath = path.join(__dirname, 'k6-script-template.js');

// Read the template content
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Search for Postman converted script
const postmanConvertedScriptPattern = /-script\.js$/; // Pattern to match converted script files
const k6ScriptFiles = fs.readdirSync(k6TestDir).filter(file => postmanConvertedScriptPattern.test(file));

if (k6ScriptFiles.length === 0) {
  throw new Error('No Postman converted k6 script files found.');
}

// Assuming only one script file is to be combined, or take the first match
const scriptPath = path.join(k6TestDir, k6ScriptFiles[0]);
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Combine the template and the selected script
fs.writeFileSync(combinedScriptPath, `${templateContent}\n${scriptContent}`);
