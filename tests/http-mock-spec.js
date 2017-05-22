const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const HTTPMock = require('../classes/http-mock.class.js');

let instance;

beforeEach(() => {
  instance = new HTTPMock();
});

describe('HTTPMock', () => {
  it ('Should return a function', () => {
    assert('function' === typeof HTTPMock);
  });

  it ('Should have .open method', () => {
    assert('function' === typeof instance.open);
  });
  it ('Should have .send method', () => {
    assert('function' === typeof instance.send);
  });
  it ('Should have .getAllResponseHeaders method', () => {
    assert('function' === typeof instance.getAllResponseHeaders);
  });
  it ('Should have .addEventListener method', () => {
    assert('function' === typeof instance.addEventListener);
  });

  describe('.send', () => {
    it ('Should invoke a "load" event', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      expect(listenerFn).to.have.been.called();
    });

    it ('Should set instance response object', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      assert(instance.response && 'object' === typeof instance.response);
    });

    it ('Should set instance responseText string', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      assert(instance.responseText && 'string' === typeof instance.responseText);
    });

    it ('Should set instance status number', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      assert(instance.status && 'number' === typeof instance.status);
    });

    it ('Should set instance statusText string', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      assert(instance.statusText && 'string' === typeof instance.statusText);
    });

    it ('Should set instance responseURL string', () => {
      let listenerFn = chai.spy();
      instance.addEventListener('load', listenerFn);
      instance.send();
      assert(instance.responseURL && 'string' === typeof instance.responseURL);
    });
  });

  describe('.getAllResponseHeaders', () => {
    it ('Should return a string', () => {
      let headers = instance.getAllResponseHeaders();
      assert('string' === typeof headers);
    });
  });

  describe('.addEventListener', () => {
    it ('Should store the listener function', () => {
      let listenerFn = function() {};
      instance.addEventListener('test', listenerFn);
      assert( 'function' === typeof instance.listeners.test );
    });
  });
});
