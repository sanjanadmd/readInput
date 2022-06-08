const { registerDetails } = require('../src/registerDetails.js');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

const assert = require('assert');

describe('registerDetails', () => {
  it('should add new response to the first field', () => {
    const identity = x => x;

    const nameField = new Field('name', 'Name');
    const form = new Form(nameField);

    registerDetails('a', form, identity, identity);
    assert.strictEqual(form.isFilled(), true);
  });

  it('should display the next prompt when response is added', () => {
    let displayedPrompts = [];

    const identity = x => x;
    const display = (response) => displayedPrompts.push(response);

    const nameField = new Field('name', 'Name');
    const dobField = new Field('dob', 'DOB');
    const form = new Form(nameField, dobField);

    registerDetails('a', form, identity, display);
    assert.deepStrictEqual(displayedPrompts, ['DOB']);
  });

  it('should call the callback provided when responses are ready', () => {
    let called;
    let displayedPrompts = [];
    const isCalled = () => called = true;
    const display = (response) => displayedPrompts.push(response);

    const nameField = new Field('name', 'Name');
    const dobField = new Field('dob', 'DOB');
    const form = new Form(nameField, dobField);

    form.fillField('john')
    registerDetails('10', form, isCalled, display);
    assert.deepStrictEqual(displayedPrompts, ['Thank you']);
    assert.strictEqual(called, true);
  });
});