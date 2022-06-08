const fillField = (input, isValid, answer) => {
  if (isValid(input)) {
    answer(input);
    return true;
  }
  return false;
}

const registerDetails = (input, queries, index, endCb, logger) => {
  const { validate, answer } = queries[index];
  if (fillField(input, validate, answer)) {
    index++;
  }
  if (queries.length !== index) {
    logger(queries[index].query);
    return index;
  }

  logger('Thank you');
  endCb();
}

module.exports = { fillField, registerDetails };