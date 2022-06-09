const fs = require('fs');

const { createForm } = require('./src/createForm.js');
const { registerDetails } = require('./src/registerDetails.js');

process.stdin.setEncoding('utf8');

const writeToFile = (responses) => {
  fs.writeFileSync('./form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
}

const readInput = (form, endCb) => {
  console.log(form.getPrompt());
  process.stdin.on('data', (response) => {
    const lines = response.trim().split('\n');
    lines.forEach(line => {
      registerDetails(line, form, endCb, console.log);
    });
  });
  process.stdin.on('end', () => console.log('Thank you'));
};

const getDetails = () => {
  const form = createForm();
  readInput(form, writeToFile);
}

getDetails();
