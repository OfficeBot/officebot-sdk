const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const ApiEndpointConfig = require('../classes/api-endpoint-config.class.js');

let instance;

beforeEach(() => {
  instance = new ApiEndpointConfig();
});

describe('ApiEndpointConfig', () => {
  it ('Should be a function', () => {
    assert('function' === typeof ApiEndpointConfig);
  });

  it ('Should have a .methods method', () => {
    assert('function' === typeof instance.methods);
  });

  it ('Should have a .config method', () => {
    assert('function' === typeof instance.config);
  });

  it ('Should have a .model method', () => {
    assert('function' === typeof instance.model);
  });

  it ('Should have a .route method', () => {
    assert('function' === typeof instance.route);
  });

  describe('.methods', () => {
    it ('Should return "this" when called with a function', () => {
      let fn = function noop() {};
      let obj = instance.methods(fn);
      assert(obj && obj === instance);
    });

    it ('Should return a function when called without parameters', () => {
      let fn = instance.methods();
      assert('function' === typeof fn);
    });
  });

  describe('.model', () => {
    it ('Should return "this" when called with a function', () => {
      let test = function() {};
      let obj = instance.model(test);
      assert(obj && obj === instance);
    });

    it ('Should return a function when called without parameters', () => {
      let fn = instance.model();
      assert('function' === typeof fn);
    });
  });

  describe('.route', () => {
    it ('Should return an object when called without parameters', () => {
      let route = instance.route();
      assert('object' === typeof route);
    });

    it ('Should return "this" when called with with an object', () => {
      let obj = instance.route({});
      assert(obj && obj === instance);
    });
  });
});
