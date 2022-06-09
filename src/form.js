class Form {
  #fields
  #currentField
  constructor(...fields) {
    this.#fields = fields
    this.#currentField = 0;
  }

  #getCurrentField() {
    return this.#fields[this.#currentField];
  }

  fillField(response) {
    const currentField = this.#getCurrentField();
    if (currentField.isValid(response)) {
      currentField.fill(response);
    }
    if (currentField.isFilled()) {
      this.#currentField++;
    }
  }

  getPrompt() {
    return this.#getCurrentField().getPrompt();
  }

  getResponses = () => {
    const formattedResponses = {};
    this.#fields.forEach(field => {
      const { name, response } = field.getEntry();
      formattedResponses[name] = response;
    });
    return formattedResponses;
  }

  isFilled() {
    return this.#fields.every((field) => field.isFilled());
  }
}

module.exports = { Form };