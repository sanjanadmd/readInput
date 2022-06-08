const getUserResponses = (queries) => {
  const formattedResponses = {};
  queries.forEach(query => {
    const { name, response } = query.getEntry();
    formattedResponses[name] = response;
  });
  return formattedResponses;
}

const registerDetails = (response, queries, index, endCb, logger) => {
  const field = queries[index];
  if (field.isValid(response)) {
    field.fill(response);
    index++;
  }
  if (queries.length !== index) {
    logger(queries[index].getPrompt());
    return index;
  }

  logger('Thank you');
  endCb(getUserResponses(queries));
}

module.exports = { getUserResponses, registerDetails };