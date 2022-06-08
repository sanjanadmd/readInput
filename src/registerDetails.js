const registerDetails = (response, form, endCb, logger) => {

  form.fillField(response);

  if (!form.isFilled()) {
    logger(form.getPrompt());
    return;
  }

  logger('Thank you');
  endCb(form.getResponses());
};

module.exports = { registerDetails }