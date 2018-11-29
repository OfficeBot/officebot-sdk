var angular = require('angular');
var extend = require('extend');
const qs = require('querystring');
var instantiateModel = require('./model.js');
var utils = require('./utils.js');

/**
  * @name ApiEndpoint
  * @desc Constructor for api endpoints
  * @namespace OfficeBotSDK.ApiEndpoint
  * @memberof OfficeBotSDK
  * @param {string} baseRoute
  * @param {object} endpointConfig
  * @param {object} transport
  * @returns {object} endpoint
  * @requires angular
  * @requires extend
  */
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport, changeSocket, $timeout, $q) {
  'use strict';
  'ngInject';

  var cache = {}; //{ url : data }
  var urls = {}; // {url : etag} - used to determine if a record is stale

  /*
    This might seem confusing, but what we actually doing is providing an interface
    for when we call `new` on this. That is, if we do something like:
    var someObj = new ThisEndpoint()

    We then have the ability to pass in default data
  */
  var self = function(data, onReady) {
    if (data) {
      // extend(true, this, data);
      Object.assign(this, data);
    }

    /*
      If we've passed in a custom model object, let's extend our default model
      with this custom model. This gives us new methods that newly created models for
      this endpoint will have
    */
    var rootUrl = baseRoute + endpointConfig.route;

    if ('function' === typeof endpointConfig._classDef) {
      var instance = this;
      var modelInstance = new endpointConfig._classDef(instance);
      for (var i in instance) {
        if ('function' === typeof instance[i]) {
          modelInstance[i] = instance[i];
        }
      }
      return modelInstance;
    }

    return this;
  };

  /*
    Defaults for our request, in case config objects aren't passed in
  */
  self.req = {
    method : 'get',
    url : '',
    query : {},
    config : {},
    data : {}
  };

  /*
    Bring in the configurations that were passed in on baseRoute and endpointConfig
  */
  self.config = endpointConfig;
  self.baseUrl = baseRoute + self.config.route;

  /*
    Instead of inlining our functions, use hoisting to make things nice and clean
  */
  self.exec = exec;
  self.find = find;
  self.skip = skip;
  self.fields = fields;
  self.limit = limit;
  self.search = search;
  self.findById = findById;
  self.findByIdAndRemove = findByIdAndRemove;
  self.findByIdAndUpdate = findByIdAndUpdate;

  /*
    Save is bound to the prototype so we can use it when creating a new instance
  */
  self.prototype.save = save;

  /*
    If the endpointConfig has a custom methods object, extend our current methods list
    with the methods that we've passed in. This hasn't been tested very extensively
  */
  if (endpointConfig.methods) {
    endpointConfig.methods._parent = self;
    angular.extend(self, endpointConfig.methods);
  }

  return self;

  /**
    * @desc Indicates the amount of records to return when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function limit(amount) {
    self.req.query.limit = amount;
    return self;
  }

  /**
   * @desc This function will allow us to select specific fields that we want back from the db
   * @memberof OfficeBotSDK.ApiEndpoint
   * @param {string|array} fieldNames
   * @returns {object} self
   */
  function fields(fieldNames) {
    if (Array.isArray(fieldNames)) {
      fieldNames = fieldNames.join(',');
    }
    if ('string' !== typeof fieldNames) {
      fieldNames = '';
    }
    self.req.query.fields = fieldNames;
    return self;
  }
  /**
    * @desc Indicates the amount of records to skip over when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function skip(amount) {
    self.req.query.skip = amount;
    return self;
  }


  function save() {
    /* jshint validthis: true */
    var _this = this;
    //Use .request instead of .post in the super rare case we want to pass in some
    //config object prior to saving. I can't think of any need for this, but I'm
    //including that functionality just in case.
    /**
      * HACK - this only works *just because* and should be fixed to use a model instance
      */
    var method = 'POST'; //if new
    var targetUrl = self.baseUrl;
    if (_this.hasOwnProperty('@href')) {
      // if (_this._temporary !== true) {
      //   method = 'PUT';
      // }
      targetUrl = _this['@href'];
    }
    let requestPayload = JSON.parse( JSON.stringify(this) );

    return new $q((resolve, reject) => {
      transport
        .request(targetUrl, method, requestPayload, {}, self.req.config)
        .then(function(response) {
          response = response || {};
          var data = response.data;

          // extend(true, _this, data);
          Object.assign(_this, data);
          // cache.invalidate(data._id);

          //Signature is: error, *this* instance, full response body (mostly for debugging/sanity check)
          // return cb(null, _this, response);
          return resolve(_this);
        }, function(err) {
          return reject(err);
        });
    });
  }

  /**
    * @desc Sends a query to the api. `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {object} query
    * @param {object=} config
    * @returns {object|promise}
    */
  function find(query, config) {
    var req = self.req;
    req.method = 'get';
    req.url = self.baseUrl;
    req.query = {
      search : query
    }
    if ('object' === typeof config) {
      req.config = config;
    } else {
      req.config = {};
    }
    req.config = config;
    return self;
  }

  function search(keyword, config) {
    var req = self.req;
    req.method = 'search';
    req.url = self.baseUrl;
    req.query = {
      'search' : {keyword : keyword}
    }
    if ('object' === typeof config) {
      req.config = config;
    } else {
      req.config = {};
    }
    req.config = config;

    return self;
  }

  /**
    * @desc Asks the api to return one element. `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {object=} config
=    * @returns {object|promise}
    */
  function findById(id, config) {
    var req = self.req;
    req.method = 'get';
    /* jshint validthis: true */
    req.url = this.baseUrl + '/' + id;
    if ('object' === typeof config) {
      req.query = config;
    }
    req.query = config;
    return self;
  }

  /**
    * @desc Finds an element on the API and removes it using a unique ID. `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
=    * @returns {object|promise}
    */
  function findByIdAndRemove(id) {
    var req = self.req;
    req.method = 'delete';
    req.url = self.baseUrl + '/' + id;

    return self;
  }

  /**
    * @desc Finds a single element on the API using a unique id and REPLACES it
    * with the data you provide. This function does not provide atomic updates.
    * `this` will be returned for chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} id
    * @param {object} data
    * @returns {object|promise}
    */
  function findByIdAndUpdate(id, data) {
    var req = self.req;
    req.method = 'put';
    req.data = data;
    req.url = self.baseUrl + '/' + id;

    return self;

  }

  /**
    * @desc This method will compose the final request, send it over our transport,
    * and return the error or results using promises.
    * Additionally, the response is wrapped in our custom Model objects to make
    * working with them a lot easier
    * @memberof OfficeBotSDK.ApiEndpoint
    * @returns {promise}
    */
  function exec(cb) {
    var req = self.req;
    let fullUrl = req.url + '?' + qs.stringify(req.query);

    return new $q((resolve, reject) => {
      checkIfModified(req, fullUrl).then(cachedDocument => {
        return resolve(cachedDocument);
      })
      .catch(() => {
        
        return transport
        .request(req.url, req.method, req.data, req.query, req.config)
        .then(function(response) {
            //convert response to models
            var model;
            response = response || {};
            var data = response.data;
            var headers = response.headers;
            let etag;
            if (headers('etag')) {
              etag = headers('etag');
            }
            if (data) {
              if (Array.isArray(data)) {
                model = data.map(function(item) {
                  if (self.config.insantiateArray === true) {
                    return _instantiate(item);
                  } else {
                    return item;
                  }
                });
              } else {
                model = _instantiate(data);
              }
              data = model;
              if (req.method.toLocaleLowerCase() === 'get') {
                putInCache(etag, fullUrl, model);
              }
            }
            resolve(data);
          }, function(err) {
            err = err || {};
            reject(err);
          });
      });

    });

  }

  function putInCache(etag, url, obj) {
    let currentEtag = urls[ url ];
    if (currentEtag) {
      delete cache[ currentEtag ];
    }
    cache[ etag ] = obj;
    urls[ url ] = etag;
  }

  function checkIfModified(req, fullUrl) {
    
    return new Promise((resolve, reject) => {
      if (req.method.toLocaleLowerCase() !== 'get') {
        return reject(); //we only cache GET requests
      }
      transport.request(req.url, 'HEAD', {}, req.query, req.config).then(function(response) {
        //if there is no etag then skip
        if (!response.headers || !response.headers('etag')) {
          return reject();
        }
        let etag = response.headers('etag');
        //check to see if the url in our cache 1) exists 2) contains the same etag
        let etagInCache = urls[ fullUrl ];
        if (!etagInCache || etag !== etagInCache) {
          return reject();
        }

        let itemInCache = cache[ etag ];
        if (!itemInCache) {
          return reject();
        }
        try {
          itemInCache = cache[ etag ];
        } catch(e) {
          return reject();
        }
        return resolve(itemInCache);
      })
    });
  }

  function _instantiate(item) {
    return instantiateModel(item, transport, baseRoute, endpointConfig, cache, changeSocket);
  }
};
