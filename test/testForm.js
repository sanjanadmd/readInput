const { getUserResponses, registerDetails } = require('../src/form.js');
const { Field } = require('../src/field.js');
const assert = require('assert');

describe('registerDetails', () => {
  it('should add new response to the first field', () => {
    const identity = x => x;

    const nameField = new Field('name', 'Name');
    const queries = [nameField];

    registerDetails('a', queries, 0, identity, identity);
    assert.strictEqual(nameField.isFilled(), true);
  });

  it('should display the next prompt when response is added', () => {
    let displayedPrompts = [];

    const identity = x => x;
    const display = (response) => displayedPrompts.push(response);

    const nameField = new Field('name', 'Name');
    const dobField = new Field('dob', 'DOB');
    const queries = [nameField, dobField];

    registerDetails('a', queries, 0, identity, display);
    assert.deepStrictEqual(displayedPrompts, ['DOB']);
  });

  it('should call the callback provided when responses are ready', () => {
    let called;
    let displayedPrompts = [];
    const isCalled = () => called = true;
    const display = (response) => displayedPrompts.push(response);

    const nameField = new Field('name', 'Name');
    const dobField = new Field('dob', 'DOB');
    const queries = [nameField, dobField];

    registerDetails('10', queries, 1, isCalled, display);
    assert.deepStrictEqual(displayedPrompts, ['Thank you']);
    assert.strictEqual(called, true);
  });
});

describe('getUserResponses', () => {
  it('should return the field responses with name as key and response as value', () => {
    const nameField = new Field('name', 'Name');
    const queries = [nameField];
    assert.deepStrictEqual(getUserResponses(queries), { name: null });
    nameField.fill('john');
    assert.deepStrictEqual(getUserResponses(queries), { name: 'john' });
  });
});
