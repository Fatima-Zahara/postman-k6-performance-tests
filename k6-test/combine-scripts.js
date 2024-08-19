const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'k6-script-template.js');
const combinedScriptPath = path.join(__dirname, 'combined-k6-script.js');
const testDir = path.join(__dirname, 'k6-test');

// Read the template content
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Get all .js files in the k6-test directory
const files = fs.readdirSync(testDir).filter(file => file.endsWith('-script.js'));

// Combine all scripts with the template
let combinedContent = templateContent;
files.forEach(file => {
  const scriptPath = path.join(testDir, file);
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  combinedContent += `\n\n// --- ${file} ---\n\n${scriptContent}`;
});

// Write the combined content to the output file
fs.writeFileSync(combinedScriptPath, combinedContent);
