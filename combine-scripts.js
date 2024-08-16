const fs = require('fs');
const path = require('path');

// Paths to your files
const templatePath = path.resolve(__dirname, 'k6-script-template.js');
const postmanScriptPath = path.resolve(__dirname, 'k6-test/k6-script.js'); // Adjusted path
const outputPath = path.resolve(__dirname, 'k6-test/combined-k6-script.js'); // Adjusted path

// Check if files exist
if (!fs.existsSync(templatePath)) {
  console.error(`Template file not found: ${templatePath}`);
  process.exit(1);
}

if (!fs.existsSync(postmanScriptPath)) {
  console.error(`Postman script file not found: ${postmanScriptPath}`);
  process.exit(1);
}

// Read the contents of the template and the generated script
const template = fs.readFileSync(templatePath, 'utf8');
const postmanScript = fs.readFileSync(postmanScriptPath, 'utf8');

// Combine the scripts
const combinedScript = `${postmanScript}\n\n${template}`;

// Write the combined script to a new file
fs.writeFileSync(outputPath, combinedScript, 'utf8');

console.log(`Combined script written to ${outputPath}`);
