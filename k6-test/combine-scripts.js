const fs = require('fs');
const path = require('path');

// Define paths
const templatePath = path.join(__dirname, 'k6-script-template.js');
const combinedScriptPath = path.join(__dirname, 'combined-k6-script.js');
const testDir = path.join(__dirname, 'k6-test');  // This should be correct

// Debugging: Print paths to verify correctness
console.log('Template Path:', templatePath);
console.log('Combined Script Path:', combinedScriptPath);
console.log('Test Directory Path:', testDir);

// Read the template content
if (!fs.existsSync(templatePath)) {
  console.error(`Template file ${templatePath} does not exist.`);
  process.exit(1);
}

const templateContent = fs.readFileSync(templatePath, 'utf8');

// Ensure the test directory exists
if (!fs.existsSync(testDir)) {
  console.error(`Directory ${testDir} does not exist.`);
  process.exit(1);
}

// List files in the test directory for debugging
const files = fs.readdirSync(testDir);
console.log('Files in Test Directory:', files);

const jsFiles = files.filter(file => file.endsWith('-script.js'));

// Combine all scripts with the template
let combinedContent = templateContent;
jsFiles.forEach(file => {
  const scriptPath = path.join(testDir, file);
  console.log(`Combining script file: ${scriptPath}`);
  if (!fs.existsSync(scriptPath)) {
    console.error(`Script file ${scriptPath} does not exist.`);
    return;
  }
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  combinedContent += `\n\n// --- ${file} ---\n\n${scriptContent}`;
});

// Write the combined content to the output file
fs.writeFileSync(combinedScriptPath, combinedContent);
console.log(`Combined script written to ${combinedScriptPath}`);
