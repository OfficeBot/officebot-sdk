const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const API = require('../classes/api.class.js');
const EndpointConstructor = require('../classes/api-endpoint.class.js');
const ApiEndpointConfig = require('../classes/api-endpoint-config.class.js');
const Model = require('../classes/model.class.js');

let ApiEndpointClass;
let endpoint;
let instance;

describe('EndpointConstructor', () => {
  it ('Should be a function', () => {
    assert('function' === typeof EndpointConstructor);
  });

  it ('Should throw an error when called without a config object', () => {
    try {
      let newEndpoint = EndpointConstructor();
    } catch(e) {
      assert(e instanceof Error);
    }
  });

  it ('Should return a function when called with a valid config object', () => {
    let config = new ApiEndpointConfig().model(Model).route('/unit-test');
    let endpointConstructor = EndpointConstructor(config);
    assert('function' === typeof endpointConstructor);
  });

  describe('ApiEndpoint', () => {
    beforeEach(() => {
      endpointConfig = new ApiEndpointConfig().model(Model).route('/unit-test');
      ApiEndpointClass = new EndpointConstructor(endpointConfig);
      instance = new ApiEndpointClass();
    });

    it ('Should be a function', () => {
      assert('function' === typeof ApiEndpointClass);
    });

    it ('Should have a .save method', () => {
      assert('function' === typeof instance.save);
    });

    it ('Should have a .relativeUrl static method', () => {
      assert('function' === typeof ApiEndpointClass.relativeUrl);
    });

    it ('Should have a .find static method', () => {
      assert('function' === typeof ApiEndpointClass.find);
    });

    it ('Should have a .findById static method', () => {
      assert('function' === typeof ApiEndpointClass.findById);
    });

    it ('Should have a .findByIdAndUpdate static method', () => {
      assert('function' === typeof ApiEndpointClass.findByIdAndUpdate);
    });

    it ('Should have a .findByIdAndRemove static method', () => {
      assert('function' === typeof ApiEndpointClass.findByIdAndRemove);
    });

    describe('.save', () => {
      it ('Should return a promise', () => {
        let save = instance.save().catch(e => {});
        expect(save).to.be.a('promise');
      });

      it ('Should resolve with a model', (done) => {
        let save = instance.save().then(response => {
          assert(response instanceof Model);
          done();
        });
      });

      it ('Should invoke callback', () => {
        let cb = chai.spy();

        let save = instance.save(cb).then(() => {
          expect(cb).to.have.been.called.once;  //jshint ignore:line
        });
      });
    });

    describe('.relativeUrl', () => {
      it ('Should return a string', () => {
        let url = ApiEndpointClass.relativeUrl();
        assert('string' === typeof url);
      });
      it ('Should compose a url using an input array', () => {
        let url = ApiEndpointClass.relativeUrl(['api','v1']);
        assert(url.indexOf('/api') > -1 && url.indexOf('/v1') > -1);
      });
    });

    describe('.find', () => {
      it ('Should return a promise', () => {
        let find = ApiEndpointClass.find().exec().catch(e => {});
        expect(find).to.be.a('promise');
      });

      it ('Should resolve with a model', (done) => {
        let find = ApiEndpointClass.find().exec().then(model => {
          assert(model instanceof Model);
          done();
        });
      });
    });

    describe('.findById', () => {
      it ('Should return a promise', () => {
        let findById = ApiEndpointClass.findById('1234').exec().catch(e => {});
        expect(findById).to.be.a('promise');
      });

      it ('Should return an instance of model when given an id', (done) => {
        ApiEndpointClass.findById('1234').exec().then(model => {
          assert(model instanceof Model);
          done();
        });
      });

      it ('Should reject with an error when no id given', (done) => {
        ApiEndpointClass.findById().exec().catch(e => {
          assert(e instanceof Error);
          done();
        });
      });
    });

    describe('.findByIdAndUpdate', () => {
      it ('Should return a promise', () => {
        let findByIdAndUpdate = ApiEndpointClass
          .findByIdAndUpdate('1234', {})
          .exec()
          .catch(e => {});
        expect(findByIdAndUpdate).to.be.a('promise');
      });

      it ('Should return an instance of model when given an id and change object', (done) => {
        ApiEndpointClass.findByIdAndUpdate('1234', {}).exec().then(model => {
          assert(model instanceof Model);
          done();
        });
      });

      it ('Should reject with an error when no id given', (done) => {
        ApiEndpointClass.findByIdAndUpdate(undefined, {}).exec().catch(e => {
          assert(e instanceof Error);
          done();
        });
      });

      it ('Should reject with an error when no change object given', (done) => {
        ApiEndpointClass.findByIdAndUpdate('12345').exec().catch(e => {
          assert(e instanceof Error);
          done();
        });
      });
    });

    describe('.findByIdAndRemove', () => {
      it ('Should return a promise', () => {
        let promise = ApiEndpointClass.findByIdAndRemove('1234').exec().catch(e => {});
        expect(promise).to.be.a('promise');
      });

      it ('Should resolve with an id', (done) => {
        ApiEndpointClass.findByIdAndRemove('1234').exec().then(() => {
          assert(true);
          done();
        });
      });

      it ('Should reject without an id', (done) => {
        ApiEndpointClass.findByIdAndRemove().exec().catch(e => {
          assert(e instanceof Error);
          done();
        });
      });
    });

  });
});
