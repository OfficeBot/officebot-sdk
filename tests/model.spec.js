const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Model = require('../classes/model.class.js');
const Request = require('../classes/request.class.js');
let instance;

beforeEach(() => {
  instance = new Model();
});

describe('Model', () => {
  it ('Should be a function', () => {
    assert('function' === typeof Model);
  });

  it ('Should have method setOriginal', () => {
    assert('function' === typeof instance.setOriginal);
  });

  it ('Should have method config', () => {
    assert('function' === typeof instance.config);
  });

  it ('Should have method url', () => {
    assert('function' === typeof instance.url);
  });

  it ('Should have method changes', () => {
    assert('function' === typeof instance.changes);
  });

  it ('Should have method mergeChanges', () => {
    assert('function' === typeof instance.mergeChanges);
  });

  it ('Should have method save', () => {
    assert('function' === typeof instance.save);
  });

  it ('Should have method remove', () => {
    assert('function' === typeof instance.remove);
  });

  describe('.setOriginal', () => {
    it ('Should return "this"', () => {
      let obj = instance.setOriginal();
      assert(obj && obj === instance);
    });

    it ('Should create a copy of 1st argument', () => {
      let data = { 'key' : 'value' };
      instance.setOriginal(data);
      data.key = 'new value';
      let original = instance.config().original;
      assert(original !== data && original.key === 'value' && data.key === 'new value');
    });
  });

  describe('.config', () => {
    it ('Should return an object', () => {
      let obj = instance.config();
      assert('object' === typeof obj);
    });
  });

  describe('url', () => {
    it ('Should return undefined if not set', () => {
      let url = instance.url();
      assert('undefined' === typeof url);
    });

    it ('Should return string if set', () => {
      instance.url('/unit-test');
      let url = instance.url();
      assert('/unit-test' === url);
    });

    it ('Should return "this" when called with a string', () => {
      let obj = instance.url('');
      assert(obj && obj === instance);
    });
  });

  describe('.changes', () => {
    it ('Should return undefined when no changes happen', () => {
      let deltas = instance.changes();
      assert('undefined' === typeof deltas);
    });

    it ('Should be defined if changes have occured', () => {
      instance.changedValue = "Some new value";
      let deltas = instance.changes();
      assert('undefined' !== typeof deltas.changedValue);
    });
  });

  describe('.mergeChanges', () => {
    it ('Should return "this"', () => {
      let obj = instance.mergeChanges();
      assert(obj && obj === instance);
    });

    it ('Should modify this instance', () => {
      let other = new Model();
      other.someProp = 'some value';
      let deltas = other.changes();
      instance.mergeChanges(deltas);
      assert(instance.someProp === 'some value');
    });

    it ('Should updated the cached original', () => {
      let other = new Model();
      other.someProp = 'some value';
      let deltas = other.changes();
      instance.mergeChanges(deltas);
      let original = instance.config().original;
      assert(original.someProp === 'some value');
    });
  });

  describe('.save', () => {
    it ('Should return a promise', () => {
      //Since we aren't passing a valid request object, ignore errors
      let save = instance.save().catch(e => {});
      expect(save).to.be.a('promise');
    });
    it ('Should reject with error when missing config', (done) => {
      instance.save().catch(e => {
        assert(e instanceof Error);
        done();
      });
    });

    it ('Should invoke callback with error when missing config', (done) => {
      let cb = chai.spy();
      instance.save(cb).catch(e => {
        expect(cb).to.have.been.called.once; //jshint ignore:line
        done();
      });
    });

    it ('Should resolve when called with a valid config', (done) => {
      let request = new Request();
      instance.config().originalRequest = request;
      instance.save().then(updatedInstance => {
        assert('undefined' !== typeof updatedInstance);
        done();
      });
    });

    it ('Should invoke callback when called with a valid config', (done) => {
      let request = new Request();
      let cb = chai.spy();
      instance.config().originalRequest = request;
      instance.save(cb).then(updatedInstance => {
        expect(cb).to.have.been.called.once;  //jshint ignore:line
        done();
      });
    });
  });

  describe('.remove', () => {
    it ('Should return a promise', () => {
      //Since we aren't passing a valid request object, ignore errors
      let save = instance.remove().catch(e => {});
      expect(save).to.be.a('promise');
    });
    it ('Should reject with error when missing config', (done) => {
      instance.remove().catch(e => {
        assert(e instanceof Error);
        done();
      });
    });

    it ('Should invoke callback with error when missing config', (done) => {
      let cb = chai.spy();
      instance.remove(cb).catch(e => {
        expect(cb).to.have.been.called.once;  //jshint ignore:line
        done();
      });
    });

    it ('Should resolve when called with a valid config', (done) => {
      let request = new Request();
      instance.config().originalRequest = request;
      instance.remove().then(updatedInstance => {
        assert('undefined' !== typeof updatedInstance);
        done();
      });
    });

    it ('Should invoke callback when called with a valid config', (done) => {
      let request = new Request();
      let cb = chai.spy();
      instance.config().originalRequest = request;
      instance.remove(cb).then(updatedInstance => {
        expect(cb).to.have.been.called.once;  //jshint ignore:line
        done();
      });
    });
  });

  describe('.isDirty', () => {
    it ('Should return a boolean', () => {
      let dirty = instance.isDirty();
      assert('boolean' === typeof dirty);
    });

    it ('Should default to clean', () => {
      let dirty = instance.isDirty();
      assert(dirty === false);
    });

    it ('Should become dirty on change', () => {
      instance.someProp = 'new value';
      let dirty = instance.isDirty();
      assert(dirty === true);
    });
  });

});
