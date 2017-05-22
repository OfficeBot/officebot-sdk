const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Transport = require('../classes/transport.class.js');

describe('Transport', () => {
  it ('Should be a function', () => {
    assert('function' === typeof Transport);
  });
  it ('Should have a "setRequest" method', () => {
    let transport = new Transport({});
    assert('function' === typeof transport.setRequest);
  });

  it ('Should have an "exec" method', () => {
    let transport = new Transport({});
    assert('function' === typeof transport.exec);
  });

  describe('.setRequest', () => {
    it ('Should set private variable "request"', () => {
      let transport = new Transport({});
      let mockRequest = {
        isMock : true
      };
      transport.setRequest(mockRequest);
      assert( transport.request.isMock === true );
    });
    it ('Should return "this"', () => {
      let transport = new Transport({});
      let returned = transport.setRequest({});
      assert(returned === transport);
    });
  });

  describe('.exec', () => {
    it ('Should return a promise', () => {
      let transport = new Transport({});
      //Since we aren't passing a valid request object, ignore errors
      let execPromise = transport.exec().catch(e => {});
      expect(execPromise).to.be.a('promise');
    });

    it ('Should reject when missing valid config data', (done) => {
      let transport = new Transport({});
      //Since we aren't passing a valid request object, ignore errors
      let execPromise = transport.exec().catch(e => {
        assert(e instanceof Error);
        done();
      });
    });

    /**
      * @todo We need more tests here to ensure that exec is working correctly. To
        do that, we need to figure out how to correctly mock up the xmlhttprequest
        object without it possibly affecting the results of these tests
      */
  });
});
