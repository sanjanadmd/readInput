class Field {
  #name
  #prompt
  #response
  #validator
  #parser
  constructor(name, prompt, validator = () => true, parser = x => x) {
    this.#name = name;
    this.#prompt = prompt;
    this.#response = null;
    this.#validator = validator;
    this.#parser = parser;
  }
  getEntry() {
    return { name: this.#name, response: this.#parser(this.#response) };
  }
  fill(response) {
    this.#response = response;
  }
  getPrompt() {
    return this.#prompt;
  }
  isValid(response) {
    return this.#validator(response);
  }
  isFilled() {
    return this.#response !== null;
  }
}

module.exports = { Field };