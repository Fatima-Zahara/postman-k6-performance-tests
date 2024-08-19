const fs = require('fs');
const path = require('path');

const templateFile = path.join(__dirname, 'k6-script-template.js');
const outputFile = path.join(__dirname, 'combined-k6-script.js');

let combinedScript = '';

// Combine all generated k6 scripts
fs.readdirSync(__dirname).forEach(file => {
  if (file.endsWith('-script.js') && file !== 'combined-k6-script.js') {
    const scriptContent = fs.readFileSync(path.join(__dirname, file), 'utf8');
    combinedScript += scriptContent + '\n';
  }
});

// Append the template content with handleSummary function
const templateContent = fs.readFileSync(templateFile, 'utf8');
combinedScript += templateContent;

// Write the combined script to the output file
fs.writeFileSync(outputFile, combinedScript);
