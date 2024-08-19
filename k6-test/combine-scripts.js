const fs = require('fs');
const path = require('path');

// Paths to your files
const templatePath = path.resolve(__dirname, 'k6-script-template.js');
const postmanScriptPath = path.resolve(__dirname, 'k6-script.js'); 
const outputPath = path.resolve(__dirname, 'combined-k6-script.js');


// Read the contents of the template and the generated script
const template = fs.readFileSync(templatePath, 'utf8');
const postmanScript = fs.readFileSync(postmanScriptPath, 'utf8');

// Combine the scripts
const combinedScript = `${postmanScript}\n\n${template}`;

// Write the combined script to a new file
fs.writeFileSync(outputPath, combinedScript, 'utf8');

console.log(`Combined script written to ${outputPath}`);
