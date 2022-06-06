const fs = require('fs');

const { User } = require("./user.js");

process.stdin.setEncoding('utf8');

const readInput = (queries) => {
  let input = '';
  let index = 0;
  console.log(queries[index].query);
  process.stdin.on('data', (chunk) => {
    input += chunk;
    const lines = input.split('\n');
    lines.slice(0, -1).forEach((line) => {
      if (queries[index].answer(line)) {
        index++;
      }
      console.log(queries[index].query);
    });
    input = lines.slice(-1)[0];
  });

  process.stdin.on('end', () => {
    console.log('Thank you');
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
      query: 'Thank you', answer: () => {
        const details = user.registerDetails();
        fs.writeFileSync('user.json', details, 'utf8');
        process.exit();
      }
    }
  ];
  readInput(queries);
}

getDetails();
