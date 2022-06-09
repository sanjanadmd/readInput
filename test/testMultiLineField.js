const { MultiLineField } = require("../src/multiLinefield.js");
const assert = require('assert');

describe('MultiLineField', () => {
  describe('getPrompt', () => {
    it('should get the prompt', () => {
      const nameField = new MultiLineField('name', ['First Name', 'Last Name']);
      assert.strictEqual(nameField.getPrompt(), 'First Name');
    });
  });
  describe('isFilled', () => {
    it('should return true when all the responses is filled', () => {
      const nameField = new MultiLineField('name', ['First Name', 'Last Name']);
      nameField.fill('john');
      assert.strictEqual(nameField.isFilled(), false);
      nameField.fill('micheal');
      assert.strictEqual(nameField.isFilled(), true);
    });
    it('should return false when response is not filled', () => {
      const nameField = new MultiLineField('name', ['First Name', 'Last Name']);
      assert.strictEqual(nameField.isFilled(), false);
    });
  });
  describe('fill', () => {
    it('should fill the given response', () => {
      const nameField = new MultiLineField('name', ['Name']);
      nameField.fill('john');
      assert.strictEqual(nameField.isFilled(), true);
    });
  });
  describe('isValid', () => {
    it('should validate the given response', () => {
      const notEmpty = (response) => response.length > 0;
      const nameField = new MultiLineField('name', ['Name'], notEmpty);
      assert.strictEqual(nameField.isValid('john'), true);
    });
  });
  describe('getEntry', () => {
    it('should return the entry', () => {
      const nameField = new MultiLineField('name', ['Name']);
      assert.deepStrictEqual(nameField.getEntry(),
        { name: 'name', response: [] });
    });
    it('should return the entry after filling response', () => {
      const nameField = new MultiLineField('name', ['Name']);
      nameField.fill('john');
      assert.deepStrictEqual(nameField.getEntry(),
        { name: 'name', response: ['john'] });
    });
    it('should return the entry after filling response with the parser', () => {

      const alwaysTrue = () => true;
      const joinNewLine = (responses) => responses.join('\n');
      const nameField = new MultiLineField('name', ['Name'], alwaysTrue, joinNewLine);
      nameField.fill('john');
      assert.deepStrictEqual(nameField.getEntry(),
        { name: 'name', response: ['john'] });
    });
  });
});
