const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const assert = require('assert');

describe('Form', () => {
  describe('getPrompt', () => {
    it('should return the current field prompt ', () => {
      const nameField = new Field('name', 'Name');
      const dobField = new Field('dob', 'DOB');
      const form = new Form(nameField, dobField);

      assert.deepStrictEqual(form.getPrompt(), 'Name');

      form.fillField('john');

      assert.deepStrictEqual(form.getPrompt(), 'DOB');
    });
  });

  describe('fillField', () => {
    it('should fill the field if the response is valid ', () => {
      const alwaysTrue = () => true;
      const nameField = new Field('name', 'Name', alwaysTrue);
      const form = new Form(nameField);

      form.fillField('john');

      assert.deepStrictEqual(nameField.isFilled(), true);
    });
    it('should not fill the field if the response is invalid ', () => {
      const alwaysFalse = () => false;
      const nameField = new Field('name', 'Name', alwaysFalse);
      const form = new Form(nameField);

      form.fillField('john');

      assert.deepStrictEqual(nameField.isFilled(), false);
    });
  });

  describe('isFilled', () => {
    it('should return true if every field is filled', () => {
      const nameField = new Field('name', 'Name');
      const dobField = new Field('dob', 'DOB');
      const form = new Form(nameField, dobField);

      form.fillField('john');
      form.fillField('1000-10-10');

      assert.deepStrictEqual(form.isFilled(), true);
    });

    it('should return false if form is partially filled', () => {
      const nameField = new Field('name', 'Name');
      const dobField = new Field('dob', 'DOB');
      const form = new Form(nameField, dobField);

      form.fillField('john');

      assert.deepStrictEqual(form.isFilled(), false);
    });

    it('should return false if form is not filled', () => {
      const nameField = new Field('name', 'Name');
      const dobField = new Field('dob', 'DOB');
      const form = new Form(nameField, dobField);

      assert.deepStrictEqual(form.isFilled(), false);
    });
  });

  describe('getUserResponses', () => {
    it('should return the field responses with name as key and response as value', () => {
      const nameField = new Field('name', 'Name');
      const form = new Form(nameField);
      assert.deepStrictEqual(form.getResponses(), { name: null });
      form.fillField('john');
      assert.deepStrictEqual(form.getResponses(), { name: 'john' });
    });
  });
});
