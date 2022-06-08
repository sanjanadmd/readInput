const { User } = require("./user.js");

const validateName = (name) => {
  if (name.length > 4) {
    return !isFinite(name);
  }
  return false;
}

const validateDOB = (dob) => {
  return dob.match(/^\d{4}-\d{2}-\d{2}$/);
}

const validateHobbies = (hobbies) => {
  return hobbies.length > 0 && hobbies[0] !== '';
}

const validatePhoneNumber = (number) => {
  return number.match(/\d{10}/);
}

const validateAddress = (address) => {
  return address !== '';
}

const getQueries = () => {
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
  return { queries, onResponseReady: () => user.registerDetails() };
}

module.exports = { getQueries }