const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);


const Response = require('../classes/response.class.js');
let instance;

beforeEach(() => {
  instance = new Response();
});

describe('Response', () => {
  it ('Should return a function', () => {
    assert('function' === typeof Response);
  });

  it('Should have method "requestedWith"',() => {
    assert('function' === typeof instance.requestedWith);
  });

  it('Should have method "body"', () => {
    assert('function' === typeof instance.body);
  });

  it('Should have method "headers"', () => {
    assert('function' === typeof instance.headers);
  });

  it('Should have method "status"', () => {
    assert('function' === typeof instance.status);
  });

  it('Should have method "statusText"', () => {
    assert('function' === typeof instance.statusText);
  });

  it('Should have method "url"', () => {
    assert('function' === typeof instance.url);
  });

  it('Should have method "parseResponse"', () => {
    assert('function' === typeof instance.parseResponse);
  });

  describe('.requestedWith', () => {
    it('Should return an object when called without parameters', () => {
      let obj = instance.requestedWith();
      assert(obj && 'object' === typeof obj);
    });

    it('Should return "this" when called with an object', () => {
      let obj = instance.requestedWith({});
      assert(obj === instance);
    });
  });

  describe('.body', () => {
    it('Should not throw an error when passed an invalid json string', () => {
      let data = "{poorlyFormatted : json]}";
      let obj = instance.body(data);
      assert(obj instanceof Error === false);
    });
    it('Should return "this" when called with an object', () => {
      let obj = instance.body({});
      assert(obj === instance);
    });
    it('Should return "this" when called with a string', () => {
      let obj = instance.body("");
      assert(obj === instance);
    });
    it('Should return an object when called with no parameters', () => {
      let obj = instance.body();
      assert(obj && 'object' === typeof obj && obj !== instance);
    });
  });

  describe('.headers', () => {
    it('Should return "this" when called with a string', () => {
      let obj = instance.headers('');
      assert(obj === instance);
    });

    it('Should return "this" when called with an object', () => {
      let obj = instance.headers({});
      assert(obj === instance);
    });

    it('Should set headers to empty object when called with invalid string', () => {
      instance.headers('{invalid : json]}');
      let headers = instance.headers();
      assert(headers && 'object' === typeof headers && Object.keys(headers).length === 0);
    });

    it('Should return an object when called without any parameters', () => {
      let obj = instance.headers();
      assert(obj && 'object' === typeof obj && obj !== instance);
    });
  });

  describe('.url', () => {
    it('Should return "this" when called with a string', () => {
      let obj = instance.url('test');
      assert(obj && obj === instance);
    });

    it ('Should properly set an internal url when called with a string', () => {
      let testUrl = '/unit-test';
      instance.url(testUrl);
      let response = instance.url();
      assert(testUrl === response);
    });

    it ('Should return a string when called with a number', () => {
      let obj = instance.url(0);
      assert('string' === typeof obj);
    });

    it ('Should return a string when called with an object', () => {
      let obj = instance.url({});
      assert('string' === typeof obj);
    });

    it ('Should return a string when called with a boolean', () => {
      let obj = instance.url(true);
      assert('string' === typeof obj);
    });
  });

  describe('.status', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.status('100');
      assert(obj && obj === instance);
    });
    it ('Should return "this" when called with a number', () => {
      let obj = instance.status(100);
      assert(obj && obj === instance);
    });
    it ('Should set an internal status config when called with a number', () => {
      instance.status(200);
      let status = instance.status();
      assert(status === 200);
    });

    it ('Should set an internal status config when called with a parsable string', () => {
      instance.status('200');
      let status = instance.status();
      assert(status === 200);
    });

    it ('Should set status to 400 (bad request) when passed an invalid string', () => {
      instance.status('okay');
      let status = instance.status();
      assert(status === 400);
    });

    it ('Should return a number when called without any parameters', () => {
      let status = instance.status();
      assert('number' === typeof status);
    });
  });

  describe('.statusText', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.statusText('200 okay');
      assert(obj && obj === instance);
    });

    it ('Should return a string (current status text) when called with a number', () => {
      instance.statusText('200 okay');
      let statusText = instance.statusText(200);
      assert(statusText === '200 okay');
    });

    it ('Should return a string (current status text) when called with an object', () => {
      instance.statusText('200 okay');
      let statusText = instance.statusText({});
      assert(statusText === '200 okay');
    });

    it ('Should return a string (current status text) when called with a boolean', () => {
      instance.statusText('200 okay');
      let statusText = instance.statusText(false);
      assert(statusText === '200 okay');
    });

    it ('Should return a string (current status text) when called without a parameter', () => {
      instance.statusText('200 okay');
      let statusText = instance.statusText();
      assert(statusText === '200 okay');
    });
  });

  describe('.url', () => {
    it ('Should return "this" when called with a string', () => {
      let obj = instance.url('/unit-test');
      assert(obj && obj === instance);
    });

    it ('Should set persist values passed to it', () => {
      instance.url('/unit-test');
      let url = instance.url();
      assert(url === '/unit-test');
    });

    it ('Should return a string (current url) when passed a number', () => {
      instance.url('/unit-test');
      let url = instance.url(0);
      assert(url === '/unit-test');
    });

    it ('Should return a string (current url) when passed an object', () => {
      instance.url('/unit-test');
      let url = instance.url({});
      assert(url === '/unit-test');
    });

    it ('Should return a string (current url) when passed a boolean', () => {
      instance.url('/unit-test');
      let url = instance.url(false);
      assert(url === '/unit-test');
    });

    it ('Should return a string (current url) when called without a parameter', () => {
      instance.url('/unit-test');
      let url = instance.url();
      assert(url === '/unit-test');
    });
  });

  describe('.parseResponse', () => {
    it ('Should throw an error if called without an object', () => {
      let errored = false;
      try {
        instance.parseResponse();
      } catch(e) {
        errored = true;
      }
      assert(errored === true);
    });

    it ('Should set body', () => {
      let mockResponse = { response : {sample : 'data'} };
      instance.parseResponse(mockResponse);
      let body = instance.body();
      assert(body && body.sample === 'data');
    });

    it ('Should set url', () => {
      let mockResponse = { responseURL : '/set-url' };
      instance.parseResponse(mockResponse);
      let url = instance.url();
      assert(url === '/set-url');
    });

    it ('Should set headers', () => {
      let mockResponse = {
        getAllResponseHeaders : function() {
          return "Mock-Header: isMock";
        }
      };
      instance.parseResponse(mockResponse);
      let headers = instance.headers();
      assert(headers && headers['Mock-Header'] === 'isMock');
    });

    it ('Should not throw error on empty headers', () => {
      let mockResponse = {
        getAllResponseHeaders : function() {
          return "";
        }
      };
      let errored = false;
      try {
        instance.parseResponse(mockResponse);
      } catch(e) {
        errored = true;
      }
      let headers = instance.headers();
      assert(errored === false);
    });

    it ('Should set status', () => {
      let mockResponse = {status : 204};
      instance.parseResponse(mockResponse);
      let status = instance.status();
      assert(status === 204);
    });

    it ('Should set statusText', () => {
      let mockResponse = {statusText : 'sample request'};
      instance.parseResponse(mockResponse);
      let statusText = instance.statusText();
      assert(statusText === 'sample request');
    });

    it ('Should return "this"', () => {
      let mockResponse = {};
      let obj = instance.parseResponse(mockResponse);
      assert(obj && obj === instance);
    });
  });
});
