const fs = require('fs');
const path = require('path');

// Adjust the paths as needed to match where the scripts are generated
const templatePath = path.resolve(__dirname, 'k6-script-template.js');
const postmanScriptDir = path.resolve(__dirname, 'k6-test'); // Directory where scripts are saved
const outputPath = path.resolve(__dirname, 'combined-k6-script.js');

// Check if the directory exists and if the expected file(s) are there
const files = fs.readdirSync(postmanScriptDir).filter(file => file.endsWith('-script.js'));

if (files.length === 0) {
  throw new Error('No k6 scripts found to combine.');
}

let combinedScript = '';

files.forEach(file => {
  const filePath = path.resolve(postmanScriptDir, file);
  const postmanScript = fs.readFileSync(filePath, 'utf8');
  combinedScript += `${postmanScript}\n\n`;
});

const template = fs.readFileSync(templatePath, 'utf8');
combinedScript += template;

fs.writeFileSync(outputPath, combinedScript, 'utf8');

console.log(`Combined script written to ${outputPath}`);
