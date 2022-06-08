const fs = require('fs');

const { getQueries } = require('./src/queries.js');
const { registerDetails } = require('./src/form.js');

process.stdin.setEncoding('utf8');

const writeToFile = (responses) => {
  fs.writeFileSync('form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
}

const readInput = (queries, endCb) => {
  let index = 0;
  console.log(queries[index].getPrompt());
  process.stdin.on('data', (response) => {
    index = registerDetails(
      response.trim(), queries, index, endCb, console.log);
  });
  process.stdin.on('end', () => console.log('Thank you'));
};

const getDetails = () => {
  const queries = getQueries();
  readInput(queries, writeToFile);
}

getDetails();
