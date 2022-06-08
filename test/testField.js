const { Field } = require("../src/field.js");
const assert = require('assert');

describe('Field', () => {
  describe('getPrompt', () => {
    it('should get the prompt', () => {
      const nameField = new Field('name', 'Name');
      assert.strictEqual(nameField.getPrompt(), 'Name');
    });
  });
  describe('isFilled', () => {
    it('should return true when response is filled', () => {
      const nameField = new Field('name', 'Name');
      nameField.fill('john');
      assert.strictEqual(nameField.isFilled(), true);
    });
    it('should return false when response is not filled', () => {
      const nameField = new Field('name', 'Name');
      assert.strictEqual(nameField.isFilled(), false);
    });
  });
  describe('fill', () => {
    it('should fill the given response', () => {
      const nameField = new Field('name', 'Name');
      nameField.fill('john');
      assert.strictEqual(nameField.isFilled(), true);
    });
  });
  describe('isValid', () => {
    it('should validate the given response', () => {
      const notEmpty = (response) => response.length > 0;
      const nameField = new Field('name', 'Name', notEmpty);
      assert.strictEqual(nameField.isValid('john'), true);
    });
  });
  describe('getEntry', () => {
    it('should return the entry', () => {
      const nameField = new Field('name', 'Name');
      assert.deepStrictEqual(nameField.getEntry(),
        { name: 'name', response: null });
    });
    it('should return the entry after filling response', () => {
      const nameField = new Field('name', 'Name');
      nameField.fill('john');
      assert.deepStrictEqual(nameField.getEntry(),
        { name: 'name', response: 'john' });
    });
  });
});
