const fs = require('fs');

const { User } = require("./user.js");

process.stdin.setEncoding('utf8');
const validateName = (name) => {
  if (name.length > 4) {
    return !isFinite(name);
  }
  return false;
}

const validateNumber = (number, digits) => {
  return number?.length === digits && isFinite(number);
}

const validateDOB = (dob) => {
  const [year, month, date] = dob.split('-');
  return validateNumber(year, 4) && validateNumber(month, 2) && validateNumber(date, 2);
}

const validateHobbies = (hobbies) => {
  return hobbies.length > 0 && hobbies[0] !== '';
}

const validatePhoneNumber = (number) => {
  return number.length === 10 && isFinite(number);
}

const validateAddress = (address) => {
  return address !== '';
}
const readInput = (queries, cb) => {
  let index = 0;
  console.log(queries[index].query);
  process.stdin.on('data', (chunk) => {
    const input = chunk.split('\n')[0];
    if (queries[index].validate(input)) {
      queries[index].answer(input);
      index++;
    }
    if (queries.length === index) {
      fs.writeFileSync('form.json', cb(), 'utf8');
      console.log('Thank you');
      process.exit();
    }
    console.log(queries[index].query);
  });
  process.stdin.on('end', () => console.log('Thank you'));
};

const getDetails = () => {
  const user = new User();
  const queries = [
    {
      query: 'Please enter your name:',
      answer: (name) => user.addName(name),
      validate: validateName
    },
    {
      query: 'Please enter your DOB(yyyy-mm-dd)',
      answer: (dob) => user.addDOB(dob),
      validate: validateDOB
    },
    {
      query: 'Please enter your hobbies',
      answer: (hobbies) => user.addHobbies(hobbies),
      validate: validateHobbies
    },
    {
      query: 'Enter phone number',
      answer: (number) => user.addPhoneNumber(number),
      validate: validatePhoneNumber
    },
    {
      query: 'Enter address line 1',
      answer: (address) => user.addAddress(address),
      validate: validateAddress
    },
    {
      query: 'Enter address line 2',
      answer: (address) => user.addAddress(address),
      validate: validateAddress
    },
  ];
  readInput(queries, () => user.registerDetails());
}

getDetails();
