const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Query = require('../classes/query.class.js');
let instance;

beforeEach(() => {
  instance = new Query();
});

describe('Query', () => {
  it ('Should be a function', () => {
    assert('function' === typeof Query);
  });

  it ('Should have method .toString', () => {
    assert('function' === typeof instance.toString);
  });

  describe('.toString', () => {
    it ('Should return a string', () => {
      let query = instance.toString();
      assert('string' === typeof query);
    });
  });
});
