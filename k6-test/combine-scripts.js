const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'k6-script-template.js');
const scriptPath = path.join(__dirname, 'UsersAPI-script.js');
const combinedScriptPath = path.join(__dirname, 'combined-k6-script.js');

const templateContent = fs.readFileSync(templatePath, 'utf8');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

fs.writeFileSync(combinedScriptPath, `${templateContent}\n${scriptContent}`);
