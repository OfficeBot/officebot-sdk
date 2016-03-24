(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/scott/Dev/officebot-sdk/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'officebot-sdk';

angular
	.module(moduleName, [
		require('./sdk-core')
	])

module.exports = moduleName;
},{"./sdk-core":"/Users/scott/Dev/officebot-sdk/sdk-core/index.js","angular":"angular"}],"/Users/scott/Dev/officebot-sdk/node_modules/extend/index.js":[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],"/Users/scott/Dev/officebot-sdk/sdk-core/api-endpoint-config.js":[function(require,module,exports){
/**
	* @name InstantiateApiEndpointConfig
	* @desc Creates a new Api Endpoint Config object
	* @namespace OfficeBotSDK.ApiEndpointConfig
	* @memberof OfficeBotSDK
	* @param {provider} $injector
	* @returns {object} ApiEndpointConfig
	*/
module.exports = function InstantiateApiEndpointConfig($injector) {
	/**
	  * @constructor
	  */
	function ApiEndpointConfig() {}
	ApiEndpointConfig.prototype.route = route;
	ApiEndpointConfig.prototype.model = model;
	ApiEndpointConfig.prototype.methods = methods;

	return ApiEndpointConfig;

	/**
		* @desc Overrides the methods for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function methods(methods) {
	  this.methods = $injector.instantiate(methods); 
	  return this;
	}
	/**
		* @desc Overrides the model constructor for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function model(model) {
	  this.model = $injector.instantiate(model);
	  return this;
	}

	/**
		* @desc Points this endpoint to a given route on the server
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function route(route) {
	  this.route = route;
	  return this;
	}

};
},{}],"/Users/scott/Dev/officebot-sdk/sdk-core/api-endpoint.js":[function(require,module,exports){
var angular = require('angular');
var extend = require('extend');
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
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport, cache, $timeout) {
  'use strict';
  'ngInject';

  /*
    This might seem confusing, but what we actually doing is providing an interface
    for when we call `new` on this. That is, if we do something like:
    var someObj = new ThisEndpoint()

    We then have the ability to pass in default data
  */
  var self = function(data, onReady) {
    if (data) {
      extend(true, this, data);
    }
    
    /*
      If we've passed in a custom model object, let's extend our default model
      with this custom model. This gives us new methods that newly created models for
      this endpoint will have
    */
    if (endpointConfig.model) {
      angular.extend(this, endpointConfig.model);
    }

    var rootUrl = baseRoute + endpointConfig.route;
    var _this = this;
    transport.put(rootUrl, data)
      .then(function(response) {

        // var cachedModel = _instantiate(response.data);
        response.data._temporary = true;
        //Our API only creates an HREF after the first save, so we need to fake one
        response.data.href = rootUrl;

        extend(true, _this, response.data);

        cache.put(response.data);

        if ('function' === typeof onReady) {
          return onReady(null, _this);
        }
      }, function(err) {
        if ('function' === typeof onReady) {
          return onReady(err);
        }
      });

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
  self.populate = populate;
  self.skip = skip;
  self.limit = limit;
  self.findById = findById;
  self.findByIdAndRemove = findByIdAndRemove;
  self.findByIdAndUpdate = findByIdAndRemove;

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
    self.req.query._limit = amount;
    return self;
  }

  /**
    * @desc Indicates the amount of records to skip over when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function skip(amount) {
    self.req.query._skip = amount;
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
    if (_this.hasOwnProperty('href')) {
      if (_this._temporary !== true) {
        method = 'PUT';
      }
      targetUrl = _this.href;
    }

    transport
      .request(targetUrl, method, _this, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        extend(true, _this, data);

        cache.invalidate(data._id);

        //Signature is: error, *this* instance, full response body (mostly for debugging/sanity check)
        return cb(null, _this, response);
      }, function(err) {
        cb(err);
      });
  }

  /**
    * @desc Appends a special parameter to the query to tell the server to populate any references
    * in the model.
    * @deprecated
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {object} fields
    * @returns {object}
    */
  function populate(fields) {
    self.req.query._populate = fields;
    return self;
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
    req.query = query;
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
      req.config = config;
    }
    
    var cb;
    
    if ('function' === typeof config) {
      cb = config;
    } else {
      req.config = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    }

    // Here, we need to see if this object is already in the cache. If so,
    // fetch it and override our callback stack

    var cachedModel = cache.get(id, _instantiate);
    if (cachedModel) {
      if ('function' === typeof cb) {
        return cb(null, cachedModel)
      } else {
        return {
          exec : function(callback) {
            return $timeout(function() {
              return callback(null, cachedModel);
            },10);
          }
        }
      }

    } else if ('function' === typeof cb) {
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
    return transport
      .request(req.url, req.method, req.data, req.query, req.config)
      .then(function(response) {
        //convert response to models
        var model;
        response = response || {};
        var data = response.data;
        var headers = response.headers;
        if (data) {
          if (data.hasOwnProperty('length')) {
            model = data.map(function(item) {
              // return instantiateModel(item, transport, baseRoute, endpointConfig);
              return _instantiate(item);
            });
          } else {
            model = _instantiate(data);
            // model = instantiateModel(data, transport, baseRoute, endpointConfig);
          }
          data = model;
        }
        return cb(null, data, response, headers);
      }, function(err) {
        err = err || {};
        return cb(err);
      });
  }

  function _instantiate(item) {
    return instantiateModel(item, transport, baseRoute, endpointConfig, cache);
  }
};
},{"./model.js":"/Users/scott/Dev/officebot-sdk/sdk-core/model.js","./utils.js":"/Users/scott/Dev/officebot-sdk/sdk-core/utils.js","angular":"angular","extend":"/Users/scott/Dev/officebot-sdk/node_modules/extend/index.js"}],"/Users/scott/Dev/officebot-sdk/sdk-core/api-provider.js":[function(require,module,exports){
/**
	* @name ApiProvider
	* @desc Wires up the api functions and provides a config function
	* @namespace OfficeBotSDK.ApiProvider
	* @memberof OfficeBotSDK
	* @param {provider} $provide
	* @param {provider} $injector
	* @returns null
	*/
module.exports = function ApiProvider($provide, $injector) {
	'use strict';
	'ngInject';

	var Api = require('./api.js')($provide, $injector);
	$provide.provider('api', Api);
};
},{"./api.js":"/Users/scott/Dev/officebot-sdk/sdk-core/api.js"}],"/Users/scott/Dev/officebot-sdk/sdk-core/api.js":[function(require,module,exports){
var angular = require('angular');
/**
  * @name InstantiateApi
  * @desc Returns Api constructor
  * @namespace OfficeBotSDK.Api
  * @memberof OfficeBotSDK
  * @param {provider} $provide
  * @param {provider} $inject
  * @returns {object} api
  * @requires angular
  */
module.exports = function InstantiateApi($provide, $inject) {
  'ngInject';

  var ApiEndpointConfig = require('./api-endpoint-config.js')($inject);
  var ApiEndpointConstructor = require('./api-endpoint.js');
  /**
    * @constructor
    * @memberof OfficeBotSDK.Api
    */
  function Api() {
    this.endpoints = {};
    return this;
  }

  Api.prototype.setBaseRoute = setBaseRoute;
  Api.prototype.endpoint = endpoint;
  Api.prototype.$get = ['$injector','transport','modelCache','$timeout', get];

  return Api;
  /**
    * @desc Sets the root url for this api
    * @memberof OfficeBotSDK.Api
    * @param {string} baseUrl
    * @returns {object} this
    */
  function setBaseRoute(baseUrl) {
    this.baseRoute = baseUrl;
    return this;
  }

  /**
    * @desc Creates a new endpoint configurations and attaches it to this
    * @memberof OfficeBotSDK.Api
    * @param {string} name The name of the endpoint
    * @returns {object} newEndpoint
    */
  function endpoint(name) {
    var baseRoute = this.baseRoute;
    var newEndpoint = new ApiEndpointConfig();
    this.endpoints[name] = newEndpoint;
    return newEndpoint;
  }

  /**
    * @desc Injector function that angular will use
    * @memberof OfficeBotSDK.Api
    * @param {provider} $injector
    * @param {object} transport
    * @param {object} modelCache
    * @returns {object} api
    */
  function get($injector, transport, modelCache) {
    var api = {};

    var self = this;
    angular.forEach(this.endpoints, function(endpointConfig, name) {
      api[name] = $injector.instantiate(ApiEndpointConstructor, {
        baseRoute: self.baseRoute,
        endpointConfig: endpointConfig,
        transport : transport,
        cache : modelCache
      });
    });

    return api;
  }
};
},{"./api-endpoint-config.js":"/Users/scott/Dev/officebot-sdk/sdk-core/api-endpoint-config.js","./api-endpoint.js":"/Users/scott/Dev/officebot-sdk/sdk-core/api-endpoint.js","angular":"angular"}],"/Users/scott/Dev/officebot-sdk/sdk-core/cache.js":[function(require,module,exports){
module.exports = function modelCacheService() {
	var l = localStorage;

	this.put = put;
	this.get = get;
	this.invalidate = invalidate;

	function put(object, key) {
		var objectId = key || object._id;
		l.setItem(objectId, JSON.stringify(object));
		return objectId;
	}

	function get(objectId, constructor) {
		if (!objectId) {
			return;
		}
		var cachedItem;
		if ('string' === typeof l.getItem(objectId)) {
			try {
				cachedItem = JSON.parse( l.getItem(objectId) );
			} catch(e) {
				invalidate(objectId);
				return null;
			}
		} else {
			return null;
		}

		if ('function' === typeof constructor) {
			return constructor(cachedItem);
		} else {
			return cachedItem;
		}
		
	}

	function invalidate(objectId) {
		if (!objectId) {
			return false;
		}
		return l.removeItem(objectId);
	}
}
},{}],"/Users/scott/Dev/officebot-sdk/sdk-core/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'sdk-core';
/**
	* @name sdk-core
	* @desc OfficeBotSDK library
	* @namespace OfficeBotSDK
	* @returns {string} moduleName
	* @requires angular
	*/
angular
	.module(moduleName, [])
	.service('transport', require('./transport.js'))
	.service('modelCache', require('./cache.js'))
	.config(require('./api-provider.js'));

	module.exports = moduleName;
},{"./api-provider.js":"/Users/scott/Dev/officebot-sdk/sdk-core/api-provider.js","./cache.js":"/Users/scott/Dev/officebot-sdk/sdk-core/cache.js","./transport.js":"/Users/scott/Dev/officebot-sdk/sdk-core/transport.js","angular":"angular"}],"/Users/scott/Dev/officebot-sdk/sdk-core/model.js":[function(require,module,exports){
var extend = require('extend');
var angular = require('angular');
/**
	* @name InstantiateModel
	* @desc Returns a new instance of a Model object
	* @namespace Model
	* @memberof OfficeBotSDK
	* @param {object} data Modal properties to instantiate with
	* @returns {object} model
	* @requires extend
	* @requires angular
	*/ 
module.exports = function InstantiateModel(data, transport, baseRoute, endpointConfig, modelCache) {
	'use strict';
	'ngInject';

	/**
		* @desc This is our constructor function that gets called at the end of this file.
		* @memberof OfficeBotSDK.Model
		* @param {object} data
		* @returns {object}
		*/
	var Model = function(data) {
		extend(true, this, data);
		return this;
	};

	/**
		* @desc Saves the current model's representation to the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.save = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

		var tmp = JSON.parse( angular.toJson(model) );
		var method = 'put';
		var href = tmp.href;

		if (tmp._temporary === true) {
			method = 'POST';
			delete tmp.href;
		}



	  transport
		  .request(href, method, tmp, {}, {})
	  	// .put( model.href, tmp )
	    .then(function(response) {
	      if (response && response.data) {
	      	extend(true, model, response.data);
	      	modelCache.invalidate( tmp._id );
	      }
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};

	/**
		* @desc Removes this model from the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.remove = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

	  return transport
	  	.delete( model.href )
	    .then(function(response) {
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};
	
	//Finally, send the new model back
	return new Model(data);
};
},{"angular":"angular","extend":"/Users/scott/Dev/officebot-sdk/node_modules/extend/index.js"}],"/Users/scott/Dev/officebot-sdk/sdk-core/transport.js":[function(require,module,exports){
/**
	* @name httpTransport
	* @desc Abstraction layer for our connections inside of the api provider.
	* This will allow us to easily replace this down the line with something
	* else (like sockets) if we decide to
	* @memberof OfficeBotSDK
	* @namespace OffieBotSDK.Transport
	* @param {provider} $http
	* @returns {object}
	*/
module.exports = function httpTransport($http) {
	'use strict';
	'ngInject';

	var self = {};
	self.request = request;
	self.get = get;
	self.post = post;
	self.put = put;
	self.delete = remove;
	self.patch = patch;
	self.head = head;
	self.options = options;
	
	return self;

	/**
		* @desc This method bundles everything up into an $http request
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {string} method
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function request(url, method, data, query, headers) {
		return $http({
			url : url,
			method : method.toUpperCase(),
			data : data,
			params : query,
			headers : headers
		});
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function get(url, query, headers) {
		return request(url, 'GET', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function post(url, data, query, headers) {
		return request(url, 'POST', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PUT', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function put(url, data, query, headers) {
		return request(url, 'PUT', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'DELETE', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function remove(url, query, headers) {
		return request(url, 'DELETE', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'HEAD', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function head(url, headers) {
		return request(url, 'HEAD', {}, {}, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PATCH', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function patch(url, data, query, headers) {
		return request(url, 'PATCH', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'OPTIONS', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function options(url, headers) {
		return request(url, 'OPTIONS', {}, {}, headers);
	}
};
},{}],"/Users/scott/Dev/officebot-sdk/sdk-core/utils.js":[function(require,module,exports){
/**
	* @name utils
	* @desc Utils library
	* @returns {object} self
	* @namespace OfficeBotSDK.Utils
	* @memberof OfficeBotSDK
	*/
module.exports = function utils() {
	var self = {};
	self.remove = remove;

	return self;

	/**
	  * @private
	  * @desc Helper function to nullify objects after .remove is called
	  * @param {object} item Thing to be removed
	  * @returns {boolean} status
	  * @memberof OfficeBotSDK.Utils
	  */
	function remove(item) {
	  for (var i in item) {
	    item[i] = undefined;
	    delete item[i];
	  }
	  item = undefined;
	  delete item;
	  return true;
	}
};
},{}]},{},["/Users/scott/Dev/officebot-sdk/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQtY29uZmlnLmpzIiwic2RrLWNvcmUvYXBpLWVuZHBvaW50LmpzIiwic2RrLWNvcmUvYXBpLXByb3ZpZGVyLmpzIiwic2RrLWNvcmUvYXBpLmpzIiwic2RrLWNvcmUvY2FjaGUuanMiLCJzZGstY29yZS9pbmRleC5qcyIsInNkay1jb3JlL21vZGVsLmpzIiwic2RrLWNvcmUvdHJhbnNwb3J0LmpzIiwic2RrLWNvcmUvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnb2ZmaWNlYm90LXNkayc7XG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXG5cdFx0cmVxdWlyZSgnLi9zZGstY29yZScpXG5cdF0pXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiIsIi8qKlxuXHQqIEBuYW1lIEluc3RhbnRpYXRlQXBpRW5kcG9pbnRDb25maWdcblx0KiBAZGVzYyBDcmVhdGVzIGEgbmV3IEFwaSBFbmRwb2ludCBDb25maWcgb2JqZWN0XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG5cdCogQHJldHVybnMge29iamVjdH0gQXBpRW5kcG9pbnRDb25maWdcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVBcGlFbmRwb2ludENvbmZpZygkaW5qZWN0b3IpIHtcblx0LyoqXG5cdCAgKiBAY29uc3RydWN0b3Jcblx0ICAqL1xuXHRmdW5jdGlvbiBBcGlFbmRwb2ludENvbmZpZygpIHt9XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5yb3V0ZSA9IHJvdXRlO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUubW9kZWwgPSBtb2RlbDtcblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLm1ldGhvZHMgPSBtZXRob2RzO1xuXG5cdHJldHVybiBBcGlFbmRwb2ludENvbmZpZztcblxuXHQvKipcblx0XHQqIEBkZXNjIE92ZXJyaWRlcyB0aGUgbWV0aG9kcyBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtZXRob2RzKG1ldGhvZHMpIHtcblx0ICB0aGlzLm1ldGhvZHMgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobWV0aG9kcyk7IFxuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHRcdCogQGRlc2MgT3ZlcnJpZGVzIHRoZSBtb2RlbCBjb25zdHJ1Y3RvciBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtb2RlbChtb2RlbCkge1xuXHQgIHRoaXMubW9kZWwgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobW9kZWwpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBQb2ludHMgdGhpcyBlbmRwb2ludCB0byBhIGdpdmVuIHJvdXRlIG9uIHRoZSBzZXJ2ZXJcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gcm91dGUocm91dGUpIHtcblx0ICB0aGlzLnJvdXRlID0gcm91dGU7XG5cdCAgcmV0dXJuIHRoaXM7XG5cdH1cblxufTsiLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBpbnN0YW50aWF0ZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG4vKipcbiAgKiBAbmFtZSBBcGlFbmRwb2ludFxuICAqIEBkZXNjIENvbnN0cnVjdG9yIGZvciBhcGkgZW5kcG9pbnRzXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG4gICogQHBhcmFtIHtzdHJpbmd9IGJhc2VSb3V0ZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbmRwb2ludENvbmZpZ1xuICAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc3BvcnRcbiAgKiBAcmV0dXJucyB7b2JqZWN0fSBlbmRwb2ludFxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICogQHJlcXVpcmVzIGV4dGVuZFxuICAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcGlFbmRwb2ludChiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnLCB0cmFuc3BvcnQsIGNhY2hlLCAkdGltZW91dCkge1xuICAndXNlIHN0cmljdCc7XG4gICduZ0luamVjdCc7XG5cbiAgLypcbiAgICBUaGlzIG1pZ2h0IHNlZW0gY29uZnVzaW5nLCBidXQgd2hhdCB3ZSBhY3R1YWxseSBkb2luZyBpcyBwcm92aWRpbmcgYW4gaW50ZXJmYWNlXG4gICAgZm9yIHdoZW4gd2UgY2FsbCBgbmV3YCBvbiB0aGlzLiBUaGF0IGlzLCBpZiB3ZSBkbyBzb21ldGhpbmcgbGlrZTpcbiAgICB2YXIgc29tZU9iaiA9IG5ldyBUaGlzRW5kcG9pbnQoKVxuXG4gICAgV2UgdGhlbiBoYXZlIHRoZSBhYmlsaXR5IHRvIHBhc3MgaW4gZGVmYXVsdCBkYXRhXG4gICovXG4gIHZhciBzZWxmID0gZnVuY3Rpb24oZGF0YSwgb25SZWFkeSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBleHRlbmQodHJ1ZSwgdGhpcywgZGF0YSk7XG4gICAgfVxuICAgIFxuICAgIC8qXG4gICAgICBJZiB3ZSd2ZSBwYXNzZWQgaW4gYSBjdXN0b20gbW9kZWwgb2JqZWN0LCBsZXQncyBleHRlbmQgb3VyIGRlZmF1bHQgbW9kZWxcbiAgICAgIHdpdGggdGhpcyBjdXN0b20gbW9kZWwuIFRoaXMgZ2l2ZXMgdXMgbmV3IG1ldGhvZHMgdGhhdCBuZXdseSBjcmVhdGVkIG1vZGVscyBmb3JcbiAgICAgIHRoaXMgZW5kcG9pbnQgd2lsbCBoYXZlXG4gICAgKi9cbiAgICBpZiAoZW5kcG9pbnRDb25maWcubW9kZWwpIHtcbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIGVuZHBvaW50Q29uZmlnLm1vZGVsKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vdFVybCA9IGJhc2VSb3V0ZSArIGVuZHBvaW50Q29uZmlnLnJvdXRlO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdHJhbnNwb3J0LnB1dChyb290VXJsLCBkYXRhKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAvLyB2YXIgY2FjaGVkTW9kZWwgPSBfaW5zdGFudGlhdGUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIHJlc3BvbnNlLmRhdGEuX3RlbXBvcmFyeSA9IHRydWU7XG4gICAgICAgIC8vT3VyIEFQSSBvbmx5IGNyZWF0ZXMgYW4gSFJFRiBhZnRlciB0aGUgZmlyc3Qgc2F2ZSwgc28gd2UgbmVlZCB0byBmYWtlIG9uZVxuICAgICAgICByZXNwb25zZS5kYXRhLmhyZWYgPSByb290VXJsO1xuXG4gICAgICAgIGV4dGVuZCh0cnVlLCBfdGhpcywgcmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgICAgY2FjaGUucHV0KHJlc3BvbnNlLmRhdGEpO1xuXG4gICAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb25SZWFkeSkge1xuICAgICAgICAgIHJldHVybiBvblJlYWR5KG51bGwsIF90aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb25SZWFkeSkge1xuICAgICAgICAgIHJldHVybiBvblJlYWR5KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvKiBcbiAgICBEZWZhdWx0cyBmb3Igb3VyIHJlcXVlc3QsIGluIGNhc2UgY29uZmlnIG9iamVjdHMgYXJlbid0IHBhc3NlZCBpbiBcbiAgKi9cbiAgc2VsZi5yZXEgPSB7XG4gICAgbWV0aG9kIDogJ2dldCcsXG4gICAgdXJsIDogJycsXG4gICAgcXVlcnkgOiB7fSxcbiAgICBjb25maWcgOiB7fSxcbiAgICBkYXRhIDoge31cbiAgfTtcblxuICAvKiBcbiAgICBCcmluZyBpbiB0aGUgY29uZmlndXJhdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiBvbiBiYXNlUm91dGUgYW5kIGVuZHBvaW50Q29uZmlnIFxuICAqL1xuICBzZWxmLmNvbmZpZyA9IGVuZHBvaW50Q29uZmlnO1xuICBzZWxmLmJhc2VVcmwgPSBiYXNlUm91dGUgKyBzZWxmLmNvbmZpZy5yb3V0ZTtcblxuICAvKiBcbiAgICBJbnN0ZWFkIG9mIGlubGluaW5nIG91ciBmdW5jdGlvbnMsIHVzZSBob2lzdGluZyB0byBtYWtlIHRoaW5ncyBuaWNlIGFuZCBjbGVhbiBcbiAgKi9cbiAgc2VsZi5leGVjID0gZXhlYztcbiAgc2VsZi5maW5kID0gZmluZDtcbiAgc2VsZi5wb3B1bGF0ZSA9IHBvcHVsYXRlO1xuICBzZWxmLnNraXAgPSBza2lwO1xuICBzZWxmLmxpbWl0ID0gbGltaXQ7XG4gIHNlbGYuZmluZEJ5SWQgPSBmaW5kQnlJZDtcbiAgc2VsZi5maW5kQnlJZEFuZFJlbW92ZSA9IGZpbmRCeUlkQW5kUmVtb3ZlO1xuICBzZWxmLmZpbmRCeUlkQW5kVXBkYXRlID0gZmluZEJ5SWRBbmRSZW1vdmU7XG5cbiAgLyogXG4gICAgU2F2ZSBpcyBib3VuZCB0byB0aGUgcHJvdG90eXBlIHNvIHdlIGNhbiB1c2UgaXQgd2hlbiBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBcbiAgKi9cbiAgc2VsZi5wcm90b3R5cGUuc2F2ZSA9IHNhdmU7XG5cbiAgLyogXG4gICAgSWYgdGhlIGVuZHBvaW50Q29uZmlnIGhhcyBhIGN1c3RvbSBtZXRob2RzIG9iamVjdCwgZXh0ZW5kIG91ciBjdXJyZW50IG1ldGhvZHMgbGlzdFxuICAgIHdpdGggdGhlIG1ldGhvZHMgdGhhdCB3ZSd2ZSBwYXNzZWQgaW4uIFRoaXMgaGFzbid0IGJlZW4gdGVzdGVkIHZlcnkgZXh0ZW5zaXZlbHkgXG4gICovXG4gIGlmIChlbmRwb2ludENvbmZpZy5tZXRob2RzKSB7XG4gICAgZW5kcG9pbnRDb25maWcubWV0aG9kcy5fcGFyZW50ID0gc2VsZjtcbiAgICBhbmd1bGFyLmV4dGVuZChzZWxmLCBlbmRwb2ludENvbmZpZy5tZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xuXG4gIC8qKlxuICAgICogQGRlc2MgSW5kaWNhdGVzIHRoZSBhbW91bnQgb2YgcmVjb3JkcyB0byByZXR1cm4gd2hlbiBxdWVyeWluZ1xuICAgICogQG1lbWJlck9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgICogQHJldHVybnMge29iamVjdH0gc2VsZlxuICAgICovXG4gIGZ1bmN0aW9uIGxpbWl0KGFtb3VudCkge1xuICAgIHNlbGYucmVxLnF1ZXJ5Ll9saW1pdCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgSW5kaWNhdGVzIHRoZSBhbW91bnQgb2YgcmVjb3JkcyB0byBza2lwIG92ZXIgd2hlbiBxdWVyeWluZ1xuICAgICogQG1lbWJlck9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgICogQHJldHVybnMge29iamVjdH0gc2VsZlxuICAgICovXG4gIGZ1bmN0aW9uIHNraXAoYW1vdW50KSB7XG4gICAgc2VsZi5yZXEucXVlcnkuX3NraXAgPSBhbW91bnQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNhdmUoY2FsbGJhY2spIHtcbiAgICB2YXIgY2IgPSBjYWxsYmFjayB8fCBhbmd1bGFyLm5vb3A7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy9Vc2UgLnJlcXVlc3QgaW5zdGVhZCBvZiAucG9zdCBpbiB0aGUgc3VwZXIgcmFyZSBjYXNlIHdlIHdhbnQgdG8gcGFzcyBpbiBzb21lXG4gICAgLy9jb25maWcgb2JqZWN0IHByaW9yIHRvIHNhdmluZy4gSSBjYW4ndCB0aGluayBvZiBhbnkgbmVlZCBmb3IgdGhpcywgYnV0IEknbVxuICAgIC8vaW5jbHVkaW5nIHRoYXQgZnVuY3Rpb25hbGl0eSBqdXN0IGluIGNhc2UuXG4gICAgLyoqXG4gICAgICAqIEhBQ0sgLSB0aGlzIG9ubHkgd29ya3MgKmp1c3QgYmVjYXVzZSogYW5kIHNob3VsZCBiZSBmaXhlZCB0byB1c2UgYSBtb2RlbCBpbnN0YW5jZVxuICAgICAgKi9cbiAgICB2YXIgbWV0aG9kID0gJ1BPU1QnOyAvL2lmIG5ld1xuICAgIHZhciB0YXJnZXRVcmwgPSBzZWxmLmJhc2VVcmw7XG4gICAgaWYgKF90aGlzLmhhc093blByb3BlcnR5KCdocmVmJykpIHtcbiAgICAgIGlmIChfdGhpcy5fdGVtcG9yYXJ5ICE9PSB0cnVlKSB7XG4gICAgICAgIG1ldGhvZCA9ICdQVVQnO1xuICAgICAgfVxuICAgICAgdGFyZ2V0VXJsID0gX3RoaXMuaHJlZjtcbiAgICB9XG5cbiAgICB0cmFuc3BvcnRcbiAgICAgIC5yZXF1ZXN0KHRhcmdldFVybCwgbWV0aG9kLCBfdGhpcywge30sIHNlbGYucmVxLmNvbmZpZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2UgfHwge307XG4gICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICBleHRlbmQodHJ1ZSwgX3RoaXMsIGRhdGEpO1xuXG4gICAgICAgIGNhY2hlLmludmFsaWRhdGUoZGF0YS5faWQpO1xuXG4gICAgICAgIC8vU2lnbmF0dXJlIGlzOiBlcnJvciwgKnRoaXMqIGluc3RhbmNlLCBmdWxsIHJlc3BvbnNlIGJvZHkgKG1vc3RseSBmb3IgZGVidWdnaW5nL3Nhbml0eSBjaGVjaylcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIF90aGlzLCByZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY2IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBBcHBlbmRzIGEgc3BlY2lhbCBwYXJhbWV0ZXIgdG8gdGhlIHF1ZXJ5IHRvIHRlbGwgdGhlIHNlcnZlciB0byBwb3B1bGF0ZSBhbnkgcmVmZXJlbmNlc1xuICAgICogaW4gdGhlIG1vZGVsLlxuICAgICogQGRlcHJlY2F0ZWRcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZHNcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgKi9cbiAgZnVuY3Rpb24gcG9wdWxhdGUoZmllbGRzKSB7XG4gICAgc2VsZi5yZXEucXVlcnkuX3BvcHVsYXRlID0gZmllbGRzO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBTZW5kcyBhIHF1ZXJ5IHRvIHRoZSBhcGkuIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBsYXN0XG4gICAgKiBwYXJhbWV0ZXIsIHRoaXMgbWV0aG9kIHdpbGwgZXhlY3V0ZSB0aGUgcXVlcnkgYW5kIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICogdXNpbmcgdGhhdCBjYWxsYmFjayBmdW5jdGlvbi4gT3RoZXJ3aXNlLCBgdGhpc2AgZ2V0cyByZXR1cm5lZCBmb3JcbiAgICAqIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge29iamVjdH0gcXVlcnlcbiAgICAqIEBwYXJhbSB7b2JqZWN0PX0gY29uZmlnXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kKHF1ZXJ5LCBjb25maWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZ2V0JztcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsO1xuICAgIHJlcS5xdWVyeSA9IHF1ZXJ5O1xuICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICB2YXIgY2I7XG4gICAgXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIGNiID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIGNiID0gY2FsbGJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBBc2tzIHRoZSBhcGkgdG8gcmV0dXJuIG9uZSBlbGVtZW50LiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGVcbiAgICAqIGxhc3QgcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGUgdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAqIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlIGlkXG4gICAgKiBAcGFyYW0ge29iamVjdD19IGNvbmZpZ1xuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWQoaWQsIGNvbmZpZywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdnZXQnO1xuICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICByZXEudXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cbiAgICBcbiAgICB2YXIgY2I7XG4gICAgXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIGNiID0gY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIGNiID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgLy8gSGVyZSwgd2UgbmVlZCB0byBzZWUgaWYgdGhpcyBvYmplY3QgaXMgYWxyZWFkeSBpbiB0aGUgY2FjaGUuIElmIHNvLFxuICAgIC8vIGZldGNoIGl0IGFuZCBvdmVycmlkZSBvdXIgY2FsbGJhY2sgc3RhY2tcblxuICAgIHZhciBjYWNoZWRNb2RlbCA9IGNhY2hlLmdldChpZCwgX2luc3RhbnRpYXRlKTtcbiAgICBpZiAoY2FjaGVkTW9kZWwpIHtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGNhY2hlZE1vZGVsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBleGVjIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGNhY2hlZE1vZGVsKTtcbiAgICAgICAgICAgIH0sMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgRmluZHMgYW4gZWxlbWVudCBvbiB0aGUgQVBJIGFuZCByZW1vdmVzIGl0IHVzaW5nIGEgdW5pcXVlIElELiBJZiBhIFxuICAgICogZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBsYXN0IHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlXG4gICAgKiB0aGUgcXVlcnkgYW5kIHJldHVybiB0aGUgcmVzdWx0cyB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICogT3RoZXJ3aXNlLCBgdGhpc2AgZ2V0cyByZXR1cm5lZCBmb3JcbiAgICAqIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgaWRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkQW5kUmVtb3ZlKGlkLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2RlbGV0ZSc7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybCArICcvJyArIGlkO1xuICAgIFxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBGaW5kcyBhIHNpbmdsZSBlbGVtZW50IG9uIHRoZSBBUEkgdXNpbmcgYSB1bmlxdWUgaWQgYW5kIFJFUExBQ0VTIGl0XG4gICAgKiB3aXRoIHRoZSBkYXRhIHlvdSBwcm92aWRlLiBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IHByb3ZpZGUgYXRvbWljIHVwZGF0ZXMuXG4gICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgY2FsbGJhY2ssIHRoZSBxdWVyeSB3aWxsIGV4ZWN1dGUgYW5kIHRoZVxuICAgICogZXJyb3Igb3IgcmVzdWx0IGZyb20gdGhlIGNhbGwgd2lsbCBiZSBwYXNzZWQgYmFjayB1c2luZyB0aGUgY2FsbGJhY2suIElmXG4gICAgKiBubyBmdW5jdGlvbiBpcyBwcm92aWRlZCwgYHRoaXNgIHdpbGwgYmUgcmV0dXJuZWQgZm9yIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kQnlJZEFuZFVwZGF0ZShpZCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdwdXQnO1xuICAgIHJlcS5kYXRhID0gZGF0YTtcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG5cbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgVGhpcyBtZXRob2Qgd2lsbCBjb21wb3NlIHRoZSBmaW5hbCByZXF1ZXN0LCBzZW5kIGl0IG92ZXIgb3VyIHRyYW5zcG9ydCxcbiAgICAqIGFuZCByZXR1cm4gdGhlIGVycm9yIG9yIHJlc3VsdHMgdXNpbmcgdGhlIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICogQWRkaXRpb25hbGx5LCB0aGUgcmVzcG9uc2UgaXMgd3JhcHBlZCBpbiBvdXIgY3VzdG9tIE1vZGVsIG9iamVjdHMgdG8gbWFrZVxuICAgICogd29ya2luZyB3aXRoIHRoZW0gYSBsb3QgZWFzaWVyXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICogQHJldHVybnMge3Byb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZXhlYyhjYikge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXR1cm4gdHJhbnNwb3J0XG4gICAgICAucmVxdWVzdChyZXEudXJsLCByZXEubWV0aG9kLCByZXEuZGF0YSwgcmVxLnF1ZXJ5LCByZXEuY29uZmlnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy9jb252ZXJ0IHJlc3BvbnNlIHRvIG1vZGVsc1xuICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2UgfHwge307XG4gICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSkge1xuICAgICAgICAgICAgbW9kZWwgPSBkYXRhLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBpbnN0YW50aWF0ZU1vZGVsKGl0ZW0sIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZyk7XG4gICAgICAgICAgICAgIHJldHVybiBfaW5zdGFudGlhdGUoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kZWwgPSBfaW5zdGFudGlhdGUoZGF0YSk7XG4gICAgICAgICAgICAvLyBtb2RlbCA9IGluc3RhbnRpYXRlTW9kZWwoZGF0YSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCBkYXRhLCByZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgZXJyID0gZXJyIHx8IHt9O1xuICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX2luc3RhbnRpYXRlKGl0ZW0pIHtcbiAgICByZXR1cm4gaW5zdGFudGlhdGVNb2RlbChpdGVtLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcsIGNhY2hlKTtcbiAgfVxufTsiLCIvKipcblx0KiBAbmFtZSBBcGlQcm92aWRlclxuXHQqIEBkZXNjIFdpcmVzIHVwIHRoZSBhcGkgZnVuY3Rpb25zIGFuZCBwcm92aWRlcyBhIGNvbmZpZyBmdW5jdGlvblxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaVByb3ZpZGVyXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRwcm92aWRlXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG5cdCogQHJldHVybnMgbnVsbFxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcGlQcm92aWRlcigkcHJvdmlkZSwgJGluamVjdG9yKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0J25nSW5qZWN0JztcblxuXHR2YXIgQXBpID0gcmVxdWlyZSgnLi9hcGkuanMnKSgkcHJvdmlkZSwgJGluamVjdG9yKTtcblx0JHByb3ZpZGUucHJvdmlkZXIoJ2FwaScsIEFwaSk7XG59OyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuLyoqXG4gICogQG5hbWUgSW5zdGFudGlhdGVBcGlcbiAgKiBAZGVzYyBSZXR1cm5zIEFwaSBjb25zdHJ1Y3RvclxuICAqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaVxuICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcbiAgKiBAcGFyYW0ge3Byb3ZpZGVyfSAkcHJvdmlkZVxuICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RcbiAgKiBAcmV0dXJucyB7b2JqZWN0fSBhcGlcbiAgKiBAcmVxdWlyZXMgYW5ndWxhclxuICAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZUFwaSgkcHJvdmlkZSwgJGluamVjdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBBcGlFbmRwb2ludENvbmZpZyA9IHJlcXVpcmUoJy4vYXBpLWVuZHBvaW50LWNvbmZpZy5qcycpKCRpbmplY3QpO1xuICB2YXIgQXBpRW5kcG9pbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vYXBpLWVuZHBvaW50LmpzJyk7XG4gIC8qKlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICovXG4gIGZ1bmN0aW9uIEFwaSgpIHtcbiAgICB0aGlzLmVuZHBvaW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgQXBpLnByb3RvdHlwZS5zZXRCYXNlUm91dGUgPSBzZXRCYXNlUm91dGU7XG4gIEFwaS5wcm90b3R5cGUuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgQXBpLnByb3RvdHlwZS4kZ2V0ID0gWyckaW5qZWN0b3InLCd0cmFuc3BvcnQnLCdtb2RlbENhY2hlJywnJHRpbWVvdXQnLCBnZXRdO1xuXG4gIHJldHVybiBBcGk7XG4gIC8qKlxuICAgICogQGRlc2MgU2V0cyB0aGUgcm9vdCB1cmwgZm9yIHRoaXMgYXBpXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVcmxcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcbiAgICAqL1xuICBmdW5jdGlvbiBzZXRCYXNlUm91dGUoYmFzZVVybCkge1xuICAgIHRoaXMuYmFzZVJvdXRlID0gYmFzZVVybDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgQ3JlYXRlcyBhIG5ldyBlbmRwb2ludCBjb25maWd1cmF0aW9ucyBhbmQgYXR0YWNoZXMgaXQgdG8gdGhpc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlbmRwb2ludFxuICAgICogQHJldHVybnMge29iamVjdH0gbmV3RW5kcG9pbnRcbiAgICAqL1xuICBmdW5jdGlvbiBlbmRwb2ludChuYW1lKSB7XG4gICAgdmFyIGJhc2VSb3V0ZSA9IHRoaXMuYmFzZVJvdXRlO1xuICAgIHZhciBuZXdFbmRwb2ludCA9IG5ldyBBcGlFbmRwb2ludENvbmZpZygpO1xuICAgIHRoaXMuZW5kcG9pbnRzW25hbWVdID0gbmV3RW5kcG9pbnQ7XG4gICAgcmV0dXJuIG5ld0VuZHBvaW50O1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBJbmplY3RvciBmdW5jdGlvbiB0aGF0IGFuZ3VsYXIgd2lsbCB1c2VcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3JcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc3BvcnRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbENhY2hlXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBhcGlcbiAgICAqL1xuICBmdW5jdGlvbiBnZXQoJGluamVjdG9yLCB0cmFuc3BvcnQsIG1vZGVsQ2FjaGUpIHtcbiAgICB2YXIgYXBpID0ge307XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuZW5kcG9pbnRzLCBmdW5jdGlvbihlbmRwb2ludENvbmZpZywgbmFtZSkge1xuICAgICAgYXBpW25hbWVdID0gJGluamVjdG9yLmluc3RhbnRpYXRlKEFwaUVuZHBvaW50Q29uc3RydWN0b3IsIHtcbiAgICAgICAgYmFzZVJvdXRlOiBzZWxmLmJhc2VSb3V0ZSxcbiAgICAgICAgZW5kcG9pbnRDb25maWc6IGVuZHBvaW50Q29uZmlnLFxuICAgICAgICB0cmFuc3BvcnQgOiB0cmFuc3BvcnQsXG4gICAgICAgIGNhY2hlIDogbW9kZWxDYWNoZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXBpO1xuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbW9kZWxDYWNoZVNlcnZpY2UoKSB7XG5cdHZhciBsID0gbG9jYWxTdG9yYWdlO1xuXG5cdHRoaXMucHV0ID0gcHV0O1xuXHR0aGlzLmdldCA9IGdldDtcblx0dGhpcy5pbnZhbGlkYXRlID0gaW52YWxpZGF0ZTtcblxuXHRmdW5jdGlvbiBwdXQob2JqZWN0LCBrZXkpIHtcblx0XHR2YXIgb2JqZWN0SWQgPSBrZXkgfHwgb2JqZWN0Ll9pZDtcblx0XHRsLnNldEl0ZW0ob2JqZWN0SWQsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHRcdHJldHVybiBvYmplY3RJZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldChvYmplY3RJZCwgY29uc3RydWN0b3IpIHtcblx0XHRpZiAoIW9iamVjdElkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBjYWNoZWRJdGVtO1xuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGwuZ2V0SXRlbShvYmplY3RJZCkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNhY2hlZEl0ZW0gPSBKU09OLnBhcnNlKCBsLmdldEl0ZW0ob2JqZWN0SWQpICk7XG5cdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0aW52YWxpZGF0ZShvYmplY3RJZCk7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbnN0cnVjdG9yKSB7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3IoY2FjaGVkSXRlbSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBjYWNoZWRJdGVtO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGludmFsaWRhdGUob2JqZWN0SWQpIHtcblx0XHRpZiAoIW9iamVjdElkKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBsLnJlbW92ZUl0ZW0ob2JqZWN0SWQpO1xuXHR9XG59IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbW9kdWxlTmFtZSA9ICdzZGstY29yZSc7XG4vKipcblx0KiBAbmFtZSBzZGstY29yZVxuXHQqIEBkZXNjIE9mZmljZUJvdFNESyBsaWJyYXJ5XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREtcblx0KiBAcmV0dXJucyB7c3RyaW5nfSBtb2R1bGVOYW1lXG5cdCogQHJlcXVpcmVzIGFuZ3VsYXJcblx0Ki9cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcblx0LnNlcnZpY2UoJ3RyYW5zcG9ydCcsIHJlcXVpcmUoJy4vdHJhbnNwb3J0LmpzJykpXG5cdC5zZXJ2aWNlKCdtb2RlbENhY2hlJywgcmVxdWlyZSgnLi9jYWNoZS5qcycpKVxuXHQuY29uZmlnKHJlcXVpcmUoJy4vYXBpLXByb3ZpZGVyLmpzJykpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCJ2YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbi8qKlxuXHQqIEBuYW1lIEluc3RhbnRpYXRlTW9kZWxcblx0KiBAZGVzYyBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIGEgTW9kZWwgb2JqZWN0XG5cdCogQG5hbWVzcGFjZSBNb2RlbFxuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAcGFyYW0ge29iamVjdH0gZGF0YSBNb2RhbCBwcm9wZXJ0aWVzIHRvIGluc3RhbnRpYXRlIHdpdGhcblx0KiBAcmV0dXJucyB7b2JqZWN0fSBtb2RlbFxuXHQqIEByZXF1aXJlcyBleHRlbmRcblx0KiBAcmVxdWlyZXMgYW5ndWxhclxuXHQqLyBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVNb2RlbChkYXRhLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcsIG1vZGVsQ2FjaGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgVGhpcyBpcyBvdXIgY29uc3RydWN0b3IgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZmlsZS5cblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fVxuXHRcdCovXG5cdHZhciBNb2RlbCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRleHRlbmQodHJ1ZSwgdGhpcywgZGF0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTYXZlcyB0aGUgY3VycmVudCBtb2RlbCdzIHJlcHJlc2VudGF0aW9uIHRvIHRoZSBBUEkuIFRoZSBtb2RlbCBNVVNUXG5cdFx0KiBoYXZlIGEgdmFsaWQgSFJFRiB0YWcgb3IgdGhpcyBjYWxsIHdpbGwgZmFpbFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcblx0XHQqIEByZXR1cm5zIHtudWxsfVxuXHRcdCovXG5cdE1vZGVsLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oY2IpIHtcblx0ICB2YXIgY2FsbGJhY2sgPSBjYiB8fCBhbmd1bGFyLm5vb3A7XG5cdCAgdmFyIG1vZGVsID0gdGhpcztcblxuXHRcdHZhciB0bXAgPSBKU09OLnBhcnNlKCBhbmd1bGFyLnRvSnNvbihtb2RlbCkgKTtcblx0XHR2YXIgbWV0aG9kID0gJ3B1dCc7XG5cdFx0dmFyIGhyZWYgPSB0bXAuaHJlZjtcblxuXHRcdGlmICh0bXAuX3RlbXBvcmFyeSA9PT0gdHJ1ZSkge1xuXHRcdFx0bWV0aG9kID0gJ1BPU1QnO1xuXHRcdFx0ZGVsZXRlIHRtcC5ocmVmO1xuXHRcdH1cblxuXG5cblx0ICB0cmFuc3BvcnRcblx0XHQgIC5yZXF1ZXN0KGhyZWYsIG1ldGhvZCwgdG1wLCB7fSwge30pXG5cdCAgXHQvLyAucHV0KCBtb2RlbC5ocmVmLCB0bXAgKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcblx0ICAgICAgXHRleHRlbmQodHJ1ZSwgbW9kZWwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgICBcdG1vZGVsQ2FjaGUuaW52YWxpZGF0ZSggdG1wLl9pZCApO1xuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgUmVtb3ZlcyB0aGlzIG1vZGVsIGZyb20gdGhlIEFQSS4gVGhlIG1vZGVsIE1VU1Rcblx0XHQqIGhhdmUgYSB2YWxpZCBIUkVGIHRhZyBvciB0aGlzIGNhbGwgd2lsbCBmYWlsXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLk1vZGVsXG5cdFx0KiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCogQHJldHVybnMge251bGx9XG5cdFx0Ki9cblx0TW9kZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGNiKSB7XG5cdCAgdmFyIGNhbGxiYWNrID0gY2IgfHwgYW5ndWxhci5ub29wO1xuXHQgIHZhciBtb2RlbCA9IHRoaXM7XG5cblx0ICByZXR1cm4gdHJhbnNwb3J0XG5cdCAgXHQuZGVsZXRlKCBtb2RlbC5ocmVmIClcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXHRcblx0Ly9GaW5hbGx5LCBzZW5kIHRoZSBuZXcgbW9kZWwgYmFja1xuXHRyZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xufTsiLCIvKipcblx0KiBAbmFtZSBodHRwVHJhbnNwb3J0XG5cdCogQGRlc2MgQWJzdHJhY3Rpb24gbGF5ZXIgZm9yIG91ciBjb25uZWN0aW9ucyBpbnNpZGUgb2YgdGhlIGFwaSBwcm92aWRlci5cblx0KiBUaGlzIHdpbGwgYWxsb3cgdXMgdG8gZWFzaWx5IHJlcGxhY2UgdGhpcyBkb3duIHRoZSBsaW5lIHdpdGggc29tZXRoaW5nXG5cdCogZWxzZSAobGlrZSBzb2NrZXRzKSBpZiB3ZSBkZWNpZGUgdG9cblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQG5hbWVzcGFjZSBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaHR0cFxuXHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGh0dHBUcmFuc3BvcnQoJGh0dHApIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVxdWVzdCA9IHJlcXVlc3Q7XG5cdHNlbGYuZ2V0ID0gZ2V0O1xuXHRzZWxmLnBvc3QgPSBwb3N0O1xuXHRzZWxmLnB1dCA9IHB1dDtcblx0c2VsZi5kZWxldGUgPSByZW1vdmU7XG5cdHNlbGYucGF0Y2ggPSBwYXRjaDtcblx0c2VsZi5oZWFkID0gaGVhZDtcblx0c2VsZi5vcHRpb25zID0gb3B0aW9ucztcblx0XG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgVGhpcyBtZXRob2QgYnVuZGxlcyBldmVyeXRoaW5nIHVwIGludG8gYW4gJGh0dHAgcmVxdWVzdFxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdHVybCA6IHVybCxcblx0XHRcdG1ldGhvZCA6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0ZGF0YSA6IGRhdGEsXG5cdFx0XHRwYXJhbXMgOiBxdWVyeSxcblx0XHRcdGhlYWRlcnMgOiBoZWFkZXJzXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0dFVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdHRVQnLCB7fSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdHRVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUE9TVCcsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUFVUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHB1dCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUFVUJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdERUxFVEUnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlbW92ZSh1cmwsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnREVMRVRFJywge30sIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnSEVBRCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gaGVhZCh1cmwsIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdIRUFEJywge30sIHt9LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUEFUQ0gnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcGF0Y2godXJsLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ1BBVENIJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdPUFRJT05TJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBvcHRpb25zKHVybCwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ09QVElPTlMnLCB7fSwge30sIGhlYWRlcnMpO1xuXHR9XG59OyIsIi8qKlxuXHQqIEBuYW1lIHV0aWxzXG5cdCogQGRlc2MgVXRpbHMgbGlicmFyeVxuXHQqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5VdGlsc1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdXRpbHMoKSB7XG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVtb3ZlID0gcmVtb3ZlO1xuXG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHQgICogQHByaXZhdGVcblx0ICAqIEBkZXNjIEhlbHBlciBmdW5jdGlvbiB0byBudWxsaWZ5IG9iamVjdHMgYWZ0ZXIgLnJlbW92ZSBpcyBjYWxsZWRcblx0ICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIFRoaW5nIHRvIGJlIHJlbW92ZWRcblx0ICAqIEByZXR1cm5zIHtib29sZWFufSBzdGF0dXNcblx0ICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuVXRpbHNcblx0ICAqL1xuXHRmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuXHQgIGZvciAodmFyIGkgaW4gaXRlbSkge1xuXHQgICAgaXRlbVtpXSA9IHVuZGVmaW5lZDtcblx0ICAgIGRlbGV0ZSBpdGVtW2ldO1xuXHQgIH1cblx0ICBpdGVtID0gdW5kZWZpbmVkO1xuXHQgIGRlbGV0ZSBpdGVtO1xuXHQgIHJldHVybiB0cnVlO1xuXHR9XG59OyJdfQ==
