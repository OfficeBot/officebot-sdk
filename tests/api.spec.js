const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const API = require('../classes/api.class.js');
const ApiEndpointConfig = require('../classes/api-endpoint-config.class.js');
let instance;

beforeEach(() => {
  instance = new API();
});

describe('API', () => {
  it ('Should return a function', () => {
    assert('function' === typeof API);
  });

  it ('Should have .setBaseRoute method', () => {
    assert('function' === typeof instance.setBaseRoute);
  });

  it ('Should have .endpoint method', () => {
    assert('function' === typeof instance.endpoint);
  });

  it ('Should have .init method', () => {
    assert('function' === typeof instance.init);
  });

  describe('.setBaseRoute', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.setBaseRoute('/');
      assert(obj && obj === instance);
    });
    it ('Should persist a value', () => {
      instance.setBaseRoute('/unit-test');
      let url = instance.setBaseRoute();
      assert(url === '/unit-test');
    });
  });

  describe('.endpoint', () => {
    it ('Should return an object when called without parameters', () => {
      let obj = instance.endpoint();
      assert(obj && 'object' === typeof obj && obj !== instance);
    });

    it ('Should return an instance of ApiEndpointConfig when called with a string', () => {
      let obj = instance.endpoint('Test');
      assert(obj instanceof ApiEndpointConfig);
    });
  });

  describe('.init', () => {
    it ('Should return an object', () => {
      let obj = instance.init();
      assert(obj && 'object' === typeof obj);
    });

    it ('Should have key/value pairs for each endpoint created', () => {
      instance.endpoint('TestA');
      instance.endpoint('TestB');

      let obj = instance.init();
      assert(obj.TestA && obj.TestB);
    });
  });

  /**
    * @todo figure out how to test the angular injection function $get
    */
});
