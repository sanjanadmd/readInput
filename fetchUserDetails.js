const fs = require('fs');

const { User } = require("./user.js");

process.stdin.setEncoding('utf8');

const readInput = (queries, cb) => {
  let index = 0;
  console.log(queries[index].query);
  process.stdin.on('data', (chunk) => {
    const [input] = chunk.split('\n');
    if (queries[index].answer(input)) {
      index++;
    }
    if (queries.length === index) {
      console.log('Thank you');
      fs.writeFileSync('user.json', cb(), 'utf8');
      process.exit();
    }
    console.log(queries[index].query);
  });
};

const getDetails = () => {
  const user = new User();
  const queries = [
    {
      query: 'Please enter your name:', answer: (name) => user.addName(name)
    },
    {
      query: 'Please enter your DOB(yyyy-mm-dd)', answer: (dob) => user.addDOB(dob)
    },
    {
      query: 'Please enter your hobbies', answer: (hobbies) => user.addHobbies(hobbies)
    },
    {
      query: 'Enter phone number', answer: (number) => user.addPhoneNumber(number)
    },
    {
      query: 'Enter address line 1', answer: (address) => user.addAddress(address)
    },
    {
      query: 'Enter address line 2', answer: (address) => user.addAddress(address)
    },
  ];
  readInput(queries, () => user.registerDetails());
}

getDetails();
