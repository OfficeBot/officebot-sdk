const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Request = require('../classes/request.class.js');
let instance;

beforeEach(() => {
  instance = new Request();
});

describe('Request', () => {
  it ('Should return a function', () => {
    assert('function' === typeof Request);
  });

  it ('Should have method "get"', () => {
    assert('function' === typeof instance.get);
  });

  it ('Should have method "post"', () => {
    assert('function' === typeof instance.post);
  });

  it ('Should have method "put"', () => {
    assert('function' === typeof instance.put);
  });

  it ('Should have method "delete"', () => {
    assert('function' === typeof instance.delete);
  });

  it ('Should have method "method"', () => {
    assert('function' === typeof instance.method);
  });

  it ('Should have method "query"', () => {
    assert('function' === typeof instance.query);
  });

  it ('Should have method "body"', () => {
    assert('function' === typeof instance.body);
  });

  it ('Should have method "headers"', () => {
    assert('function' === typeof instance.headers);
  });

  it ('Should have method "url"', () => {
    assert('function' === typeof instance.url);
  });

  it ('Should have method "requestUrl"', () => {
    assert('function' === typeof instance.requestUrl);
  });

  it ('Should have method "transformResponse"', () => {
    assert('function' === typeof instance.transformResponse);
  });

  it ('Should have method "exec"', () => {
    assert('function' === typeof instance.exec);
  });

  describe('.get', () => {
    it ('Should return "this"', () => {
      let obj = instance.get();
      assert(obj && obj === instance);
    });

    it ('Should set method', () => {
      instance.get();
      let method = instance.method();
      assert(method === 'get');
    });
  });

  describe('.post', () => {
    it ('Should return "this"', () => {
      let obj = instance.post();
      assert(obj && obj === instance);
    });

    it ('Should set method', () => {
      instance.post();
      let method = instance.method();
      assert(method === 'post');
    });
  });

  describe('.put', () => {
    it ('Should return "this"', () => {
      let obj = instance.put();
      assert(obj && obj === instance);
    });

    it ('Should set method', () => {
      instance.put();
      let method = instance.method();
      assert(method === 'put');
    });
  });

  describe('.delete', () => {
    it ('Should return "this"', () => {
      let obj = instance.delete();
      assert(obj && obj === instance);
    });

    it ('Should set method', () => {
      instance.delete();
      let method = instance.method();
      assert(method === 'delete');
    });
  });

  describe('.method', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.method('put');
      assert(obj && obj === instance);
    });

    it ('Should set method', () => {
      instance.method('put');
      let method = instance.method();
      assert(method === 'put');
    });

    it ('Should return a string (current method) when called without parameters', () => {
      instance.method('put');
      let method = instance.method();
      assert('string' === typeof method);
    });
  });

  describe('.query', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.query('');
      assert(obj && obj === instance);
    });

    it ('Should return "this" when called with an object', () => {
      let obj = instance.query({});
      assert(obj && obj === instance);
    });

    it ('Should return a query string when called without parameters', () => {
      let query = instance.query();
      assert('string' === typeof query);
    });
  });

  describe('.body', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.body('');
      assert(obj && obj === instance);
    });

    it ('Should return "this" when called with a object', () => {
      let obj = instance.body({});
      assert(obj && obj === instance);
    });

    it ('Should return current body when called without parameters', () => {
      instance.body({sample : 'body'});
      let body = instance.body();
      assert(body && body.sample === 'body');
    });
  });

  describe('.headers', () => {
    it ('Should return "this" when called with an object', () => {
      let obj = instance.headers({});
      assert(obj && obj === instance);
    });

    it ('Should return an object when called without parameters', () => {
      let headers = instance.headers();
      assert(headers && 'object' === typeof headers && headers !== instance);
    });
  });

  describe('.url', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.url('');
      assert(obj && obj === instance);
    });
    it ('Should return a string when called without parameters', () => {
      let url = instance.url();
      assert('string' === typeof url);
    });

    it ('Should set url', () => {
      instance.url('/unit-test');
      let url = instance.url();
      assert(url === '/unit-test');
    });
  });

  describe('.requestUrl', () => {
    it ('Should return a string', () => {
      let url = instance.requestUrl();
      assert('string' === typeof url);
    });

    it ('Should equal .url when no query is set', () => {
      instance.url('/unit-test');
      let url = instance.requestUrl();
      assert(url === '/unit-test');
    });

    it ('Should contain "?" when query is set', () => {
      instance.query({some : "thing"});
      let url = instance.requestUrl();
      assert('string' === typeof url && url.indexOf('?') > -1);
    });
  });

  describe('.transformResponse', () => {
    it ('Should return a function when called without parameters', () => {
      let fn = instance.transformResponse();
      assert('function' === typeof fn);
    });

    it ('Should return "this" when called with a function', () => {
      let obj = instance.transformResponse(function noop() {});
      assert(obj && obj === instance);
    });

    it ('Should set transform function', () => {
      let testFn = function() { return 1 == 1; };
      instance.transformResponse(testFn);
      let fn = instance.transformResponse();
      assert(testFn == fn);
    });
  });

  describe('.exec', () => {
    it ('Should return a promise', () => {
      let execPromise = instance.exec().catch(e => {});
      expect(execPromise).to.be.a('promise');
    });

    it ('Should resolve with mock data', (done) => {
      instance.exec().then(data => {
        assert('object' === typeof data, 'Response is object');
        done();
      });
    });

    it ('Should correctly transform response', (done) => {
      let transformFn = chai.spy(function(data) { return data; });
      instance.transformResponse(transformFn);
      instance.exec().then(data => {
        expect(transformFn).to.have.been.called();
        done();
      });
    });
  });
});
