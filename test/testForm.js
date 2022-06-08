const { fillField, registerDetails } = require('../src/form.js');
const assert = require('assert');

describe('fillField', () => {
  it('should add the response if it is valid', () => {
    const alwaysTrue = () => true;
    let fieldResponse;
    const recordResponse = response => fieldResponse = response;
    fillField('a', alwaysTrue, recordResponse);
    assert.strictEqual(fieldResponse, 'a');
  });
  it('should add the response if it is not valid', () => {
    const alwaysFalse = () => false;
    let fieldResponse;
    const recordResponse = response => fieldResponse = response;
    fillField('a', alwaysFalse, recordResponse);
    assert.strictEqual(fieldResponse, undefined);
  });
});

describe('registerDetails', () => {
  it('should add new response to the first field', () => {
    let fieldResponse;

    const alwaysTrue = () => true;
    const identity = x => x;
    const recordResponse = response => fieldResponse = response;

    const queries = [{
      query: 'Name',
      answer: recordResponse,
      validate: alwaysTrue
    },]

    registerDetails('a', queries, 0, identity, identity);
    assert.strictEqual(fieldResponse, 'a');
  });
  it('should display the next prompt when response is added', () => {
    let fieldResponse;
    let displayedPrompts = [];
    const alwaysTrue = () => true;
    const identity = x => x;
    const recordResponse = response => fieldResponse = response;
    const display = (response) => displayedPrompts.push(response);
    const queries = [{
      query: 'Name',
      answer: recordResponse,
      validate: alwaysTrue
    }, {
      query: 'DOB',
      answer: identity,
      validate: alwaysTrue
    }]

    registerDetails('a', queries, 0, identity, display);
    assert.deepStrictEqual(displayedPrompts, ['DOB']);
  });

  it('should call the callback provided when responses are ready', () => {
    let called;
    let displayedPrompts = [];
    const isCalled = () => called = true;
    const alwaysTrue = () => true;
    const identity = x => x;
    const display = (response) => displayedPrompts.push(response);
    const queries = [{
      query: 'Name',
      answer: identity,
      validate: alwaysTrue
    }, {
      query: 'DOB',
      answer: identity,
      validate: alwaysTrue
    }]

    registerDetails('2000-10-10', queries, 1, isCalled, display);
    assert.deepStrictEqual(displayedPrompts, ['Thank you']);
    assert.strictEqual(called, true);
  });
});
