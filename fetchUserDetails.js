const fs = require('fs');

const { createForm } = require('./src/queries.js');
const { registerDetails } = require('./src/form.js');

process.stdin.setEncoding('utf8');

const writeToFile = (responses) => {
  fs.writeFileSync('form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
}

const readInput = (form, endCb) => {
  console.log(form.getPrompt());
  process.stdin.on('data', (response) => {
    registerDetails(response.trim(), form, endCb, console.log);
  });
  process.stdin.on('end', () => console.log('Thank you'));
};

const getDetails = () => {
  const form = createForm();
  readInput(form, writeToFile);
}

getDetails();
