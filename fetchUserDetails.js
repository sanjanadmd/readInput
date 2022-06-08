const fs = require('fs');

const { getQueries } = require('./src/queries.js');
const { registerDetails } = require('./src/form.js');

process.stdin.setEncoding('utf8');

const readInput = (queries, endCb) => {
  let index = 0;
  console.log(queries[index].query);
  process.stdin.on('data', (chunk) => {
    const input = chunk.trim();
    index = registerDetails(input, queries, index, endCb, console.log);
  });
  process.stdin.on('end', () => console.log('Thank you'));
};

const getDetails = () => {
  const { queries, onResponseReady } = getQueries();
  readInput(queries, () => {
    fs.writeFileSync('form.json', onResponseReady(), 'utf8');
    process.stdin.destroy();
  });
}

getDetails();
