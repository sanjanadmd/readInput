const { Field } = require("./field.js");
const { MultiLineField } = require("./multiLineField.js");
const { Form } = require("./form.js");

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
  return hobbies !== '';
}

const validatePhoneNumber = (number) => {
  return number.match(/\d{10}/);
}

const validateAddress = (address) => {
  return address !== '';
}

const splitByComma = (response) => response.split(',');

const joinWithNewLine = (responses) => responses.join('\n');

const createForm = () => {
  const nameField = new Field('name', 'Please enter your name:', validateName);

  const dobField = new Field(
    'dob', 'Please enter your DOB(yyyy-mm-dd)', validateDOB);

  const hobbiesField = new Field(
    'hobbies', 'Please enter your hobbies', validateHobbies, splitByComma);

  const phoneNumberField = new Field(
    'ph_no', 'Enter phone number', validatePhoneNumber);

  const addressField = new MultiLineField('address', ['Enter address line 1', 'Enter address line 2'], validateAddress, joinWithNewLine);


  return new Form(nameField, dobField, hobbiesField, phoneNumberField, addressField);
}

module.exports = { createForm }