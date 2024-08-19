const fs = require('fs');
const path = require('path');

// Paths to your files
const templatePath = path.resolve(__dirname, 'k6-script-template.js');
const outputPath = path.resolve(__dirname, 'combined-k6-script.js');

// Get the list of generated k6 script files
const k6ScriptFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('-script.js')); // Adjust the pattern if needed

if (k6ScriptFiles.length === 0) {
  console.error('Error: No k6 script files found');
  process.exit(1);
}

// Assuming you want to combine all the script files
let combinedScript = '';

k6ScriptFiles.forEach(file => {
  const postmanScriptPath = path.resolve(__dirname, file);
  const postmanScript = fs.readFileSync(postmanScriptPath, 'utf8');
  combinedScript += `${postmanScript}\n\n`;
});

// Read the template
const template = fs.readFileSync(templatePath, 'utf8');

// Combine the scripts with the template
combinedScript += template;

// Write the combined script to a new file
fs.writeFileSync(outputPath, combinedScript, 'utf8');

console.log(`Combined script written to ${outputPath}`);
