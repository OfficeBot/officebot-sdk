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
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport, cache, changeSocket, $timeout, $q) {
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


  function save(callback) {
    var cb = callback || angular.noop;
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

    transport
      .request(targetUrl, method, requestPayload, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        // extend(true, _this, data);
        Object.assign(_this, data);
        // cache.invalidate(data._id);

        //Signature is: error, *this* instance, full response body (mostly for debugging/sanity check)
        return cb(null, _this, response);
      }, function(err) {
        cb(err);
      });
  }

  /**
    * @desc Sends a query to the api. If a function is passed as the last
    * parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {object} query
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function find(query, config, callback) {
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

    var cb;

    if ('function' === typeof config) {
      cb = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    } else {
      req.config = config;
    }

    if ('function' === typeof cb) {
      return self.exec(cb);
    }
    return self;
  }

  function search(keyword, config, callback) {
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

    var cb;

    if ('function' === typeof config) {
      cb = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    } else {
      req.config = config;
    }

    if ('function' === typeof cb) {
      return self.exec(cb);
    }
    return self;
  }

  /**
    * @desc Asks the api to return one element. If a function is passed as the
    * last parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findById(id, config, callback) {
    var req = self.req;
    req.method = 'get';
    /* jshint validthis: true */
    req.url = this.baseUrl + '/' + id;
    if ('object' === typeof config) {
      req.query = config;
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    } else {
      req.query = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    }

    // Here, we need to see if this object is already in the cache. If so,
    // fetch it and override our callback stack

    // var cachedModel = cache.get(id, _instantiate);
    // if (cachedModel) {
    //   if ('function' === typeof cb) {
    //     return cb(null, cachedModel)
    //   } else {
    //     return {
    //       exec : function(callback) {
    //         return $timeout(function() {
    //           return callback(null, cachedModel);
    //         },10);
    //       }
    //     }
    //   }

    if ('function' === typeof cb) {
      return self.exec(cb);
    } else {
      return self;
    }

  }

  /**
    * @desc Finds an element on the API and removes it using a unique ID. If a
    * function is passed as the last parameter, this method will execute
    * the query and return the results using that callback function.
    * Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndRemove(id, callback) {
    var req = self.req;
    req.method = 'delete';
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;
  }

  /**
    * @desc Finds a single element on the API using a unique id and REPLACES it
    * with the data you provide. This function does not provide atomic updates.
    * If a function is passed as the callback, the query will execute and the
    * error or result from the call will be passed back using the callback. If
    * no function is provided, `this` will be returned for chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} id
    * @param {object} data
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndUpdate(id, data, callback) {
    var req = self.req;
    req.method = 'put';
    req.data = data;
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;

  }

  /**
    * @desc This method will compose the final request, send it over our transport,
    * and return the error or results using the provided callback function.
    * Additionally, the response is wrapped in our custom Model objects to make
    * working with them a lot easier
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {function} callback
    * @returns {promise}
    */
  function exec(cb) {
    var req = self.req;
    let fullUrl = req.url + '?' + qs.stringify(req.query);

    return new $q((resolve, reject) => {
      checkIfModified(req, fullUrl).then(cachedDocument => {
        // console.log('done fetching from cache');
        // console.log(cachedDocument);
        // $timeout(() => {
          // cb(null, cachedDocument, {}, {});
          return resolve(cachedDocument);
        // },0);
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
                  // return instantiateModel(item, transport, baseRoute, endpointConfig);
                  if (self.config.insantiateArray === true) {
                    return _instantiate(item);
                  } else {
                    return item;
                  }
                });
              } else {
                model = _instantiate(data);
                // model = instantiateModel(data, transport, baseRoute, endpointConfig);
              }
              data = model;
              if (req.method.toLocaleLowerCase() === 'get') {
                putInCache(etag, fullUrl, model);
              }
            }
            resolve(data);
            // return cb(null, data, response, headers);
          }, function(err) {
            err = err || {};
            reject(err);
            // return cb(err);
          });
      });

    });

  }

  function putInCache(etag, url, obj) {
    // console.log(`Putting into cache [${url}] at etag: ${etag}`);
    let currentEtag = urls[ url ];
    if (currentEtag) {
      // console.log('Clearing stale data out of cache');
      delete cache[ currentEtag ];
    }

    // console.log(`${etag} : ${url}`);

    cache[ etag ] = obj;
    urls[ url ] = etag;
    // localStorage.setItem(`cache_${etag}`, JSON.stringify(obj));
  }

  function checkIfModified(req, fullUrl) {
    
    return new Promise((resolve, reject) => {
      // console.log('making call to HEAD');
      if (req.method.toLocaleLowerCase() !== 'get') {
        return reject(); //we only cache GET requests
      }
      // let fullUrl = req.url + '?' + qs.stringify(req.query);
      transport.request(req.url, 'HEAD', {}, req.query, req.config).then(function(response) {
        //if there is no etag then skip
        // console.log('HEAD fetched');
        if (!response.headers || !response.headers('etag')) {
          // console.log(`Not in cache [${req.url}]`);
          return reject();
        }
        let etag = response.headers('etag');
        //check to see if the url in our cache 1) exists 2) contains the same etag
        let etagInCache = urls[ fullUrl ];
        if (!etagInCache || etag !== etagInCache) {
          // console.dir(urls);
          // console.log(response.config.url);
          // console.log(response.headers('etag'));
          // console.log(headers);
          // console.log(`Not in cache [${fullUrl}] -- mismatched etags: ${etagInCache} -- ${etag}`);
          return reject();
        }

        let itemInCache = cache[ etag ];
        if (!itemInCache) {
          // console.log(`Not in cache [${fullUrl}]`);
          return reject();
        }
        try {
          itemInCache = cache[ etag ];
        } catch(e) {
          // console.log(`Not in cache [${fullUrl}] -- Could not parse.`);
          return reject();
        }
        // console.log(`Found in cache [${fullUrl}]!`);
        // console.log(itemInCache);
        return resolve(itemInCache);
      })
    });
  }

  function _instantiate(item) {
    return instantiateModel(item, transport, baseRoute, endpointConfig, cache, changeSocket);
  }
};
