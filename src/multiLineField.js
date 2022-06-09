
class MultiLineField {
  #name
  #prompts
  #responses
  #validator
  #parser
  #index
  constructor(name, prompts, validator = () => true, parser = x => x) {
    this.#name = name;
    this.#prompts = prompts;
    this.#responses = [];
    this.#validator = validator;
    this.#parser = parser;
    this.#index = 0;
  }
  getEntry() {
    return { name: this.#name, response: this.#parser(this.#responses) };
  }
  fill(response) {
    this.#responses.push(response);
    this.#index++;
  }
  getPrompt() {
    return this.#prompts[this.#index];
  }
  isValid(response) {
    return this.#validator(response);
  }
  isFilled() {
    return this.#responses.length === this.#prompts.length;
  }
}

module.exports = { MultiLineField };