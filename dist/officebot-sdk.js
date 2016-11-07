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

    transport
      .request(targetUrl, method, _this, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        extend(true, _this, data);

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
		var href = tmp['@href'];

	  transport
		  .request(href, method, tmp, {}, {})
	    .then(function(response) {
	      if (response && response.data) {
	      	extend(true, model, response.data);
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
	  	.delete( model['@href'] )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQtY29uZmlnLmpzIiwic2RrLWNvcmUvYXBpLWVuZHBvaW50LmpzIiwic2RrLWNvcmUvYXBpLXByb3ZpZGVyLmpzIiwic2RrLWNvcmUvYXBpLmpzIiwic2RrLWNvcmUvY2FjaGUuanMiLCJzZGstY29yZS9pbmRleC5qcyIsInNkay1jb3JlL21vZGVsLmpzIiwic2RrLWNvcmUvdHJhbnNwb3J0LmpzIiwic2RrLWNvcmUvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnb2ZmaWNlYm90LXNkayc7XG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXG5cdFx0cmVxdWlyZSgnLi9zZGstY29yZScpXG5cdF0pXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiIsIi8qKlxuXHQqIEBuYW1lIEluc3RhbnRpYXRlQXBpRW5kcG9pbnRDb25maWdcblx0KiBAZGVzYyBDcmVhdGVzIGEgbmV3IEFwaSBFbmRwb2ludCBDb25maWcgb2JqZWN0XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG5cdCogQHJldHVybnMge29iamVjdH0gQXBpRW5kcG9pbnRDb25maWdcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVBcGlFbmRwb2ludENvbmZpZygkaW5qZWN0b3IpIHtcblx0LyoqXG5cdCAgKiBAY29uc3RydWN0b3Jcblx0ICAqL1xuXHRmdW5jdGlvbiBBcGlFbmRwb2ludENvbmZpZygpIHt9XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5yb3V0ZSA9IHJvdXRlO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUubW9kZWwgPSBtb2RlbDtcblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLm1ldGhvZHMgPSBtZXRob2RzO1xuXG5cdHJldHVybiBBcGlFbmRwb2ludENvbmZpZztcblxuXHQvKipcblx0XHQqIEBkZXNjIE92ZXJyaWRlcyB0aGUgbWV0aG9kcyBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtZXRob2RzKG1ldGhvZHMpIHtcblx0ICB0aGlzLm1ldGhvZHMgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobWV0aG9kcyk7IFxuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHRcdCogQGRlc2MgT3ZlcnJpZGVzIHRoZSBtb2RlbCBjb25zdHJ1Y3RvciBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtb2RlbChtb2RlbCkge1xuXHQgIHRoaXMubW9kZWwgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobW9kZWwpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBQb2ludHMgdGhpcyBlbmRwb2ludCB0byBhIGdpdmVuIHJvdXRlIG9uIHRoZSBzZXJ2ZXJcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gcm91dGUocm91dGUpIHtcblx0ICB0aGlzLnJvdXRlID0gcm91dGU7XG5cdCAgcmV0dXJuIHRoaXM7XG5cdH1cblxufTsiLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBpbnN0YW50aWF0ZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG4vKipcbiAgKiBAbmFtZSBBcGlFbmRwb2ludFxuICAqIEBkZXNjIENvbnN0cnVjdG9yIGZvciBhcGkgZW5kcG9pbnRzXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG4gICogQHBhcmFtIHtzdHJpbmd9IGJhc2VSb3V0ZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbmRwb2ludENvbmZpZ1xuICAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc3BvcnRcbiAgKiBAcmV0dXJucyB7b2JqZWN0fSBlbmRwb2ludFxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICogQHJlcXVpcmVzIGV4dGVuZFxuICAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcGlFbmRwb2ludChiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnLCB0cmFuc3BvcnQsIGNhY2hlLCAkdGltZW91dCkge1xuICAndXNlIHN0cmljdCc7XG4gICduZ0luamVjdCc7XG5cbiAgLypcbiAgICBUaGlzIG1pZ2h0IHNlZW0gY29uZnVzaW5nLCBidXQgd2hhdCB3ZSBhY3R1YWxseSBkb2luZyBpcyBwcm92aWRpbmcgYW4gaW50ZXJmYWNlXG4gICAgZm9yIHdoZW4gd2UgY2FsbCBgbmV3YCBvbiB0aGlzLiBUaGF0IGlzLCBpZiB3ZSBkbyBzb21ldGhpbmcgbGlrZTpcbiAgICB2YXIgc29tZU9iaiA9IG5ldyBUaGlzRW5kcG9pbnQoKVxuXG4gICAgV2UgdGhlbiBoYXZlIHRoZSBhYmlsaXR5IHRvIHBhc3MgaW4gZGVmYXVsdCBkYXRhXG4gICovXG4gIHZhciBzZWxmID0gZnVuY3Rpb24oZGF0YSwgb25SZWFkeSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBleHRlbmQodHJ1ZSwgdGhpcywgZGF0YSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgIElmIHdlJ3ZlIHBhc3NlZCBpbiBhIGN1c3RvbSBtb2RlbCBvYmplY3QsIGxldCdzIGV4dGVuZCBvdXIgZGVmYXVsdCBtb2RlbFxuICAgICAgd2l0aCB0aGlzIGN1c3RvbSBtb2RlbC4gVGhpcyBnaXZlcyB1cyBuZXcgbWV0aG9kcyB0aGF0IG5ld2x5IGNyZWF0ZWQgbW9kZWxzIGZvclxuICAgICAgdGhpcyBlbmRwb2ludCB3aWxsIGhhdmVcbiAgICAqL1xuICAgIGlmIChlbmRwb2ludENvbmZpZy5tb2RlbCkge1xuICAgICAgYW5ndWxhci5leHRlbmQodGhpcywgZW5kcG9pbnRDb25maWcubW9kZWwpO1xuICAgIH1cblxuICAgIHZhciByb290VXJsID0gYmFzZVJvdXRlICsgZW5kcG9pbnRDb25maWcucm91dGU7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKlxuICAgIERlZmF1bHRzIGZvciBvdXIgcmVxdWVzdCwgaW4gY2FzZSBjb25maWcgb2JqZWN0cyBhcmVuJ3QgcGFzc2VkIGluXG4gICovXG4gIHNlbGYucmVxID0ge1xuICAgIG1ldGhvZCA6ICdnZXQnLFxuICAgIHVybCA6ICcnLFxuICAgIHF1ZXJ5IDoge30sXG4gICAgY29uZmlnIDoge30sXG4gICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgLypcbiAgICBCcmluZyBpbiB0aGUgY29uZmlndXJhdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiBvbiBiYXNlUm91dGUgYW5kIGVuZHBvaW50Q29uZmlnXG4gICovXG4gIHNlbGYuY29uZmlnID0gZW5kcG9pbnRDb25maWc7XG4gIHNlbGYuYmFzZVVybCA9IGJhc2VSb3V0ZSArIHNlbGYuY29uZmlnLnJvdXRlO1xuXG4gIC8qXG4gICAgSW5zdGVhZCBvZiBpbmxpbmluZyBvdXIgZnVuY3Rpb25zLCB1c2UgaG9pc3RpbmcgdG8gbWFrZSB0aGluZ3MgbmljZSBhbmQgY2xlYW5cbiAgKi9cbiAgc2VsZi5leGVjID0gZXhlYztcbiAgc2VsZi5maW5kID0gZmluZDtcbiAgc2VsZi5za2lwID0gc2tpcDtcbiAgc2VsZi5maWVsZHMgPSBmaWVsZHM7XG4gIHNlbGYubGltaXQgPSBsaW1pdDtcbiAgc2VsZi5maW5kQnlJZCA9IGZpbmRCeUlkO1xuICBzZWxmLmZpbmRCeUlkQW5kUmVtb3ZlID0gZmluZEJ5SWRBbmRSZW1vdmU7XG4gIHNlbGYuZmluZEJ5SWRBbmRVcGRhdGUgPSBmaW5kQnlJZEFuZFVwZGF0ZTtcblxuICAvKlxuICAgIFNhdmUgaXMgYm91bmQgdG8gdGhlIHByb3RvdHlwZSBzbyB3ZSBjYW4gdXNlIGl0IHdoZW4gY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2VcbiAgKi9cbiAgc2VsZi5wcm90b3R5cGUuc2F2ZSA9IHNhdmU7XG5cbiAgLypcbiAgICBJZiB0aGUgZW5kcG9pbnRDb25maWcgaGFzIGEgY3VzdG9tIG1ldGhvZHMgb2JqZWN0LCBleHRlbmQgb3VyIGN1cnJlbnQgbWV0aG9kcyBsaXN0XG4gICAgd2l0aCB0aGUgbWV0aG9kcyB0aGF0IHdlJ3ZlIHBhc3NlZCBpbi4gVGhpcyBoYXNuJ3QgYmVlbiB0ZXN0ZWQgdmVyeSBleHRlbnNpdmVseVxuICAqL1xuICBpZiAoZW5kcG9pbnRDb25maWcubWV0aG9kcykge1xuICAgIGVuZHBvaW50Q29uZmlnLm1ldGhvZHMuX3BhcmVudCA9IHNlbGY7XG4gICAgYW5ndWxhci5leHRlbmQoc2VsZiwgZW5kcG9pbnRDb25maWcubWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcblxuICAvKipcbiAgICAqIEBkZXNjIEluZGljYXRlcyB0aGUgYW1vdW50IG9mIHJlY29yZHMgdG8gcmV0dXJuIHdoZW4gcXVlcnlpbmdcbiAgICAqIEBtZW1iZXJPZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICAqL1xuICBmdW5jdGlvbiBsaW1pdChhbW91bnQpIHtcbiAgICBzZWxmLnJlcS5xdWVyeS5saW1pdCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxsb3cgdXMgdG8gc2VsZWN0IHNwZWNpZmljIGZpZWxkcyB0aGF0IHdlIHdhbnQgYmFjayBmcm9tIHRoZSBkYlxuICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfGFycmF5fSBmaWVsZE5hbWVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICovXG4gIGZ1bmN0aW9uIGZpZWxkcyhmaWVsZE5hbWVzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGROYW1lcykpIHtcbiAgICAgIGZpZWxkTmFtZXMgPSBmaWVsZE5hbWVzLmpvaW4oJywnKTtcbiAgICB9XG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgZmllbGROYW1lcykge1xuICAgICAgZmllbGROYW1lcyA9ICcnO1xuICAgIH1cbiAgICBzZWxmLnJlcS5xdWVyeS5maWVsZHMgPSBmaWVsZE5hbWVzO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIC8qKlxuICAgICogQGRlc2MgSW5kaWNhdGVzIHRoZSBhbW91bnQgb2YgcmVjb3JkcyB0byBza2lwIG92ZXIgd2hlbiBxdWVyeWluZ1xuICAgICogQG1lbWJlck9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgICogQHJldHVybnMge29iamVjdH0gc2VsZlxuICAgICovXG4gIGZ1bmN0aW9uIHNraXAoYW1vdW50KSB7XG4gICAgc2VsZi5yZXEucXVlcnkuc2tpcCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc2F2ZShjYWxsYmFjaykge1xuICAgIHZhciBjYiA9IGNhbGxiYWNrIHx8IGFuZ3VsYXIubm9vcDtcbiAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvL1VzZSAucmVxdWVzdCBpbnN0ZWFkIG9mIC5wb3N0IGluIHRoZSBzdXBlciByYXJlIGNhc2Ugd2Ugd2FudCB0byBwYXNzIGluIHNvbWVcbiAgICAvL2NvbmZpZyBvYmplY3QgcHJpb3IgdG8gc2F2aW5nLiBJIGNhbid0IHRoaW5rIG9mIGFueSBuZWVkIGZvciB0aGlzLCBidXQgSSdtXG4gICAgLy9pbmNsdWRpbmcgdGhhdCBmdW5jdGlvbmFsaXR5IGp1c3QgaW4gY2FzZS5cbiAgICAvKipcbiAgICAgICogSEFDSyAtIHRoaXMgb25seSB3b3JrcyAqanVzdCBiZWNhdXNlKiBhbmQgc2hvdWxkIGJlIGZpeGVkIHRvIHVzZSBhIG1vZGVsIGluc3RhbmNlXG4gICAgICAqL1xuICAgIHZhciBtZXRob2QgPSAnUE9TVCc7IC8vaWYgbmV3XG4gICAgdmFyIHRhcmdldFVybCA9IHNlbGYuYmFzZVVybDtcbiAgICBpZiAoX3RoaXMuaGFzT3duUHJvcGVydHkoJ0BocmVmJykpIHtcbiAgICAgIC8vIGlmIChfdGhpcy5fdGVtcG9yYXJ5ICE9PSB0cnVlKSB7XG4gICAgICAvLyAgIG1ldGhvZCA9ICdQVVQnO1xuICAgICAgLy8gfVxuICAgICAgdGFyZ2V0VXJsID0gX3RoaXNbJ0BocmVmJ107XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0XG4gICAgICAucmVxdWVzdCh0YXJnZXRVcmwsIG1ldGhvZCwgX3RoaXMsIHt9LCBzZWxmLnJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlIHx8IHt9O1xuICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgZXh0ZW5kKHRydWUsIF90aGlzLCBkYXRhKTtcblxuICAgICAgICAvLyBjYWNoZS5pbnZhbGlkYXRlKGRhdGEuX2lkKTtcblxuICAgICAgICAvL1NpZ25hdHVyZSBpczogZXJyb3IsICp0aGlzKiBpbnN0YW5jZSwgZnVsbCByZXNwb25zZSBib2R5IChtb3N0bHkgZm9yIGRlYnVnZ2luZy9zYW5pdHkgY2hlY2spXG4gICAgICAgIHJldHVybiBjYihudWxsLCBfdGhpcywgcmVzcG9uc2UpO1xuICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGNiKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgU2VuZHMgYSBxdWVyeSB0byB0aGUgYXBpLiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgbGFzdFxuICAgICogcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGUgdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAqIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtvYmplY3R9IHF1ZXJ5XG4gICAgKiBAcGFyYW0ge29iamVjdD19IGNvbmZpZ1xuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZChxdWVyeSwgY29uZmlnLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2dldCc7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybDtcbiAgICByZXEucXVlcnkgPSB7XG4gICAgICBzZWFyY2ggOiBxdWVyeVxuICAgIH1cbiAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgY2I7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgY2IgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgY2IgPSBjYWxsYmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNiKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEFza3MgdGhlIGFwaSB0byByZXR1cm4gb25lIGVsZW1lbnQuIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZVxuICAgICogbGFzdCBwYXJhbWV0ZXIsIHRoaXMgbWV0aG9kIHdpbGwgZXhlY3V0ZSB0aGUgcXVlcnkgYW5kIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICogdXNpbmcgdGhhdCBjYWxsYmFjayBmdW5jdGlvbi4gT3RoZXJ3aXNlLCBgdGhpc2AgZ2V0cyByZXR1cm5lZCBmb3JcbiAgICAqIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0PX0gY29uZmlnXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kQnlJZChpZCwgY29uZmlnLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2dldCc7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIHJlcS51cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZDtcbiAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgdmFyIGNiO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIGNiID0gY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIGNiID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgLy8gSGVyZSwgd2UgbmVlZCB0byBzZWUgaWYgdGhpcyBvYmplY3QgaXMgYWxyZWFkeSBpbiB0aGUgY2FjaGUuIElmIHNvLFxuICAgIC8vIGZldGNoIGl0IGFuZCBvdmVycmlkZSBvdXIgY2FsbGJhY2sgc3RhY2tcblxuICAgIHZhciBjYWNoZWRNb2RlbCA9IGNhY2hlLmdldChpZCwgX2luc3RhbnRpYXRlKTtcbiAgICBpZiAoY2FjaGVkTW9kZWwpIHtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGNhY2hlZE1vZGVsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBleGVjIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGNhY2hlZE1vZGVsKTtcbiAgICAgICAgICAgIH0sMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgRmluZHMgYW4gZWxlbWVudCBvbiB0aGUgQVBJIGFuZCByZW1vdmVzIGl0IHVzaW5nIGEgdW5pcXVlIElELiBJZiBhXG4gICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGVcbiAgICAqIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSBpZFxuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWRBbmRSZW1vdmUoaWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZGVsZXRlJztcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsICsgJy8nICsgaWQ7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgRmluZHMgYSBzaW5nbGUgZWxlbWVudCBvbiB0aGUgQVBJIHVzaW5nIGEgdW5pcXVlIGlkIGFuZCBSRVBMQUNFUyBpdFxuICAgICogd2l0aCB0aGUgZGF0YSB5b3UgcHJvdmlkZS4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBwcm92aWRlIGF0b21pYyB1cGRhdGVzLlxuICAgICogSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGNhbGxiYWNrLCB0aGUgcXVlcnkgd2lsbCBleGVjdXRlIGFuZCB0aGVcbiAgICAqIGVycm9yIG9yIHJlc3VsdCBmcm9tIHRoZSBjYWxsIHdpbGwgYmUgcGFzc2VkIGJhY2sgdXNpbmcgdGhlIGNhbGxiYWNrLiBJZlxuICAgICogbm8gZnVuY3Rpb24gaXMgcHJvdmlkZWQsIGB0aGlzYCB3aWxsIGJlIHJldHVybmVkIGZvciBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWRBbmRVcGRhdGUoaWQsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAncHV0JztcbiAgICByZXEuZGF0YSA9IGRhdGE7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybCArICcvJyArIGlkO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG5cbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgVGhpcyBtZXRob2Qgd2lsbCBjb21wb3NlIHRoZSBmaW5hbCByZXF1ZXN0LCBzZW5kIGl0IG92ZXIgb3VyIHRyYW5zcG9ydCxcbiAgICAqIGFuZCByZXR1cm4gdGhlIGVycm9yIG9yIHJlc3VsdHMgdXNpbmcgdGhlIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICogQWRkaXRpb25hbGx5LCB0aGUgcmVzcG9uc2UgaXMgd3JhcHBlZCBpbiBvdXIgY3VzdG9tIE1vZGVsIG9iamVjdHMgdG8gbWFrZVxuICAgICogd29ya2luZyB3aXRoIHRoZW0gYSBsb3QgZWFzaWVyXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICogQHJldHVybnMge3Byb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZXhlYyhjYikge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXR1cm4gdHJhbnNwb3J0XG4gICAgICAucmVxdWVzdChyZXEudXJsLCByZXEubWV0aG9kLCByZXEuZGF0YSwgcmVxLnF1ZXJ5LCByZXEuY29uZmlnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy9jb252ZXJ0IHJlc3BvbnNlIHRvIG1vZGVsc1xuICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2UgfHwge307XG4gICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSkge1xuICAgICAgICAgICAgbW9kZWwgPSBkYXRhLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBpbnN0YW50aWF0ZU1vZGVsKGl0ZW0sIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZyk7XG4gICAgICAgICAgICAgIHJldHVybiBfaW5zdGFudGlhdGUoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kZWwgPSBfaW5zdGFudGlhdGUoZGF0YSk7XG4gICAgICAgICAgICAvLyBtb2RlbCA9IGluc3RhbnRpYXRlTW9kZWwoZGF0YSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCBkYXRhLCByZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgZXJyID0gZXJyIHx8IHt9O1xuICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX2luc3RhbnRpYXRlKGl0ZW0pIHtcbiAgICByZXR1cm4gaW5zdGFudGlhdGVNb2RlbChpdGVtLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcsIGNhY2hlKTtcbiAgfVxufTtcbiIsIi8qKlxuXHQqIEBuYW1lIEFwaVByb3ZpZGVyXG5cdCogQGRlc2MgV2lyZXMgdXAgdGhlIGFwaSBmdW5jdGlvbnMgYW5kIHByb3ZpZGVzIGEgY29uZmlnIGZ1bmN0aW9uXG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpUHJvdmlkZXJcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJHByb3ZpZGVcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3Jcblx0KiBAcmV0dXJucyBudWxsXG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaVByb3ZpZGVyKCRwcm92aWRlLCAkaW5qZWN0b3IpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBBcGkgPSByZXF1aXJlKCcuL2FwaS5qcycpKCRwcm92aWRlLCAkaW5qZWN0b3IpO1xuXHQkcHJvdmlkZS5wcm92aWRlcignYXBpJywgQXBpKTtcbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG4vKipcbiAgKiBAbmFtZSBJbnN0YW50aWF0ZUFwaVxuICAqIEBkZXNjIFJldHVybnMgQXBpIGNvbnN0cnVjdG9yXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpXG4gICogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRwcm92aWRlXG4gICogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdFxuICAqIEByZXR1cm5zIHtvYmplY3R9IGFwaVxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluc3RhbnRpYXRlQXBpKCRwcm92aWRlLCAkaW5qZWN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIEFwaUVuZHBvaW50Q29uZmlnID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQtY29uZmlnLmpzJykoJGluamVjdCk7XG4gIHZhciBBcGlFbmRwb2ludENvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQuanMnKTtcbiAgLyoqXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKi9cbiAgZnVuY3Rpb24gQXBpKCkge1xuICAgIHRoaXMuZW5kcG9pbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBBcGkucHJvdG90eXBlLnNldEJhc2VSb3V0ZSA9IHNldEJhc2VSb3V0ZTtcbiAgQXBpLnByb3RvdHlwZS5lbmRwb2ludCA9IGVuZHBvaW50O1xuICBBcGkucHJvdG90eXBlLiRnZXQgPSBbJyRpbmplY3RvcicsJ3RyYW5zcG9ydCcsJ21vZGVsQ2FjaGUnLCckdGltZW91dCcsIGdldF07XG5cbiAgcmV0dXJuIEFwaTtcbiAgLyoqXG4gICAgKiBAZGVzYyBTZXRzIHRoZSByb290IHVybCBmb3IgdGhpcyBhcGlcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVybFxuICAgICogQHJldHVybnMge29iamVjdH0gdGhpc1xuICAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VSb3V0ZShiYXNlVXJsKSB7XG4gICAgdGhpcy5iYXNlUm91dGUgPSBiYXNlVXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBDcmVhdGVzIGEgbmV3IGVuZHBvaW50IGNvbmZpZ3VyYXRpb25zIGFuZCBhdHRhY2hlcyBpdCB0byB0aGlzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVuZHBvaW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBuZXdFbmRwb2ludFxuICAgICovXG4gIGZ1bmN0aW9uIGVuZHBvaW50KG5hbWUpIHtcbiAgICB2YXIgYmFzZVJvdXRlID0gdGhpcy5iYXNlUm91dGU7XG4gICAgdmFyIG5ld0VuZHBvaW50ID0gbmV3IEFwaUVuZHBvaW50Q29uZmlnKCk7XG4gICAgdGhpcy5lbmRwb2ludHNbbmFtZV0gPSBuZXdFbmRwb2ludDtcbiAgICByZXR1cm4gbmV3RW5kcG9pbnQ7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEluamVjdG9yIGZ1bmN0aW9uIHRoYXQgYW5ndWxhciB3aWxsIHVzZVxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RvclxuICAgICogQHBhcmFtIHtvYmplY3R9IHRyYW5zcG9ydFxuICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsQ2FjaGVcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IGFwaVxuICAgICovXG4gIGZ1bmN0aW9uIGdldCgkaW5qZWN0b3IsIHRyYW5zcG9ydCwgbW9kZWxDYWNoZSkge1xuICAgIHZhciBhcGkgPSB7fTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5lbmRwb2ludHMsIGZ1bmN0aW9uKGVuZHBvaW50Q29uZmlnLCBuYW1lKSB7XG4gICAgICBhcGlbbmFtZV0gPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUoQXBpRW5kcG9pbnRDb25zdHJ1Y3Rvciwge1xuICAgICAgICBiYXNlUm91dGU6IHNlbGYuYmFzZVJvdXRlLFxuICAgICAgICBlbmRwb2ludENvbmZpZzogZW5kcG9pbnRDb25maWcsXG4gICAgICAgIHRyYW5zcG9ydCA6IHRyYW5zcG9ydCxcbiAgICAgICAgY2FjaGUgOiBtb2RlbENhY2hlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcGk7XG4gIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtb2RlbENhY2hlU2VydmljZSgpIHtcblx0dmFyIGwgPSBsb2NhbFN0b3JhZ2U7XG5cblx0dGhpcy5wdXQgPSBwdXQ7XG5cdHRoaXMuZ2V0ID0gZ2V0O1xuXHR0aGlzLmludmFsaWRhdGUgPSBpbnZhbGlkYXRlO1xuXG5cdGZ1bmN0aW9uIHB1dChvYmplY3QsIGtleSkge1xuXHRcdHZhciBvYmplY3RJZCA9IGtleSB8fCBvYmplY3QuX2lkO1xuXHRcdGwuc2V0SXRlbShvYmplY3RJZCwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG5cdFx0cmV0dXJuIG9iamVjdElkO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0KG9iamVjdElkLCBjb25zdHJ1Y3Rvcikge1xuXHRcdGlmICghb2JqZWN0SWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIGNhY2hlZEl0ZW07XG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgbC5nZXRJdGVtKG9iamVjdElkKSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y2FjaGVkSXRlbSA9IEpTT04ucGFyc2UoIGwuZ2V0SXRlbShvYmplY3RJZCkgKTtcblx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRpbnZhbGlkYXRlKG9iamVjdElkKTtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uc3RydWN0b3IpIHtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3RvcihjYWNoZWRJdGVtKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGNhY2hlZEl0ZW07XG5cdFx0fVxuXHRcdFxuXHR9XG5cblx0ZnVuY3Rpb24gaW52YWxpZGF0ZShvYmplY3RJZCkge1xuXHRcdGlmICghb2JqZWN0SWQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGwucmVtb3ZlSXRlbShvYmplY3RJZCk7XG5cdH1cbn0iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBtb2R1bGVOYW1lID0gJ3Nkay1jb3JlJztcbi8qKlxuXHQqIEBuYW1lIHNkay1jb3JlXG5cdCogQGRlc2MgT2ZmaWNlQm90U0RLIGxpYnJhcnlcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNES1xuXHQqIEByZXR1cm5zIHtzdHJpbmd9IG1vZHVsZU5hbWVcblx0KiBAcmVxdWlyZXMgYW5ndWxhclxuXHQqL1xuYW5ndWxhclxuXHQubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxuXHQuc2VydmljZSgndHJhbnNwb3J0JywgcmVxdWlyZSgnLi90cmFuc3BvcnQuanMnKSlcblx0LnNlcnZpY2UoJ21vZGVsQ2FjaGUnLCByZXF1aXJlKCcuL2NhY2hlLmpzJykpXG5cdC5jb25maWcocmVxdWlyZSgnLi9hcGktcHJvdmlkZXIuanMnKSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVOYW1lOyIsInZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVNb2RlbFxuXHQqIEBkZXNjIFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBNb2RlbCBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE1vZGVsXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIE1vZGFsIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgd2l0aFxuXHQqIEByZXR1cm5zIHtvYmplY3R9IG1vZGVsXG5cdCogQHJlcXVpcmVzIGV4dGVuZFxuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovIFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZU1vZGVsKGRhdGEsIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgbW9kZWxDYWNoZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIGlzIG91ciBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBmaWxlLlxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtvYmplY3R9IGRhdGFcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdFx0Ki9cblx0dmFyIE1vZGVsID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0XHQqIEBkZXNjIFNhdmVzIHRoZSBjdXJyZW50IG1vZGVsJ3MgcmVwcmVzZW50YXRpb24gdG8gdGhlIEFQSS4gVGhlIG1vZGVsIE1VU1Rcblx0XHQqIGhhdmUgYSB2YWxpZCBIUkVGIHRhZyBvciB0aGlzIGNhbGwgd2lsbCBmYWlsXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLk1vZGVsXG5cdFx0KiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCogQHJldHVybnMge251bGx9XG5cdFx0Ki9cblx0TW9kZWwucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbihjYikge1xuXHQgIHZhciBjYWxsYmFjayA9IGNiIHx8IGFuZ3VsYXIubm9vcDtcblx0ICB2YXIgbW9kZWwgPSB0aGlzO1xuXG5cdFx0dmFyIHRtcCA9IEpTT04ucGFyc2UoIGFuZ3VsYXIudG9Kc29uKG1vZGVsKSApO1xuXHRcdHZhciBtZXRob2QgPSAncHV0Jztcblx0XHR2YXIgaHJlZiA9IHRtcFsnQGhyZWYnXTtcblxuXHQgIHRyYW5zcG9ydFxuXHRcdCAgLnJlcXVlc3QoaHJlZiwgbWV0aG9kLCB0bXAsIHt9LCB7fSlcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhKSB7XG5cdCAgICAgIFx0ZXh0ZW5kKHRydWUsIG1vZGVsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG5cdCAgICB9LCBmdW5jdGlvbihlcnIpIHtcblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cdCAgICB9KTtcblx0fTtcblxuXHQvKipcblx0XHQqIEBkZXNjIFJlbW92ZXMgdGhpcyBtb2RlbCBmcm9tIHRoZSBBUEkuIFRoZSBtb2RlbCBNVVNUXG5cdFx0KiBoYXZlIGEgdmFsaWQgSFJFRiB0YWcgb3IgdGhpcyBjYWxsIHdpbGwgZmFpbFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcblx0XHQqIEByZXR1cm5zIHtudWxsfVxuXHRcdCovXG5cdE1vZGVsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihjYikge1xuXHQgIHZhciBjYWxsYmFjayA9IGNiIHx8IGFuZ3VsYXIubm9vcDtcblx0ICB2YXIgbW9kZWwgPSB0aGlzO1xuXG5cdCAgcmV0dXJuIHRyYW5zcG9ydFxuXHQgIFx0LmRlbGV0ZSggbW9kZWxbJ0BocmVmJ10gKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXHQgICAgfSk7XG5cdH07XG5cdFxuXHQvL0ZpbmFsbHksIHNlbmQgdGhlIG5ldyBtb2RlbCBiYWNrXG5cdHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG59OyIsIi8qKlxuXHQqIEBuYW1lIGh0dHBUcmFuc3BvcnRcblx0KiBAZGVzYyBBYnN0cmFjdGlvbiBsYXllciBmb3Igb3VyIGNvbm5lY3Rpb25zIGluc2lkZSBvZiB0aGUgYXBpIHByb3ZpZGVyLlxuXHQqIFRoaXMgd2lsbCBhbGxvdyB1cyB0byBlYXNpbHkgcmVwbGFjZSB0aGlzIGRvd24gdGhlIGxpbmUgd2l0aCBzb21ldGhpbmdcblx0KiBlbHNlIChsaWtlIHNvY2tldHMpIGlmIHdlIGRlY2lkZSB0b1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAbmFtZXNwYWNlIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRodHRwXG5cdCogQHJldHVybnMge29iamVjdH1cblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaHR0cFRyYW5zcG9ydCgkaHR0cCkge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0dmFyIHNlbGYgPSB7fTtcblx0c2VsZi5yZXF1ZXN0ID0gcmVxdWVzdDtcblx0c2VsZi5nZXQgPSBnZXQ7XG5cdHNlbGYucG9zdCA9IHBvc3Q7XG5cdHNlbGYucHV0ID0gcHV0O1xuXHRzZWxmLmRlbGV0ZSA9IHJlbW92ZTtcblx0c2VsZi5wYXRjaCA9IHBhdGNoO1xuXHRzZWxmLmhlYWQgPSBoZWFkO1xuXHRzZWxmLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcblx0cmV0dXJuIHNlbGY7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIG1ldGhvZCBidW5kbGVzIGV2ZXJ5dGhpbmcgdXAgaW50byBhbiAkaHR0cCByZXF1ZXN0XG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG1ldGhvZCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0dXJsIDogdXJsLFxuXHRcdFx0bWV0aG9kIDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRkYXRhIDogZGF0YSxcblx0XHRcdHBhcmFtcyA6IHF1ZXJ5LFxuXHRcdFx0aGVhZGVycyA6IGhlYWRlcnNcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnR0VUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBnZXQodXJsLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ0dFVCcsIHt9LCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0dFVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBwb3N0KHVybCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdQT1NUJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdQVVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcHV0KHVybCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdQVVQnLCBkYXRhLCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0RFTEVURScsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcmVtb3ZlKHVybCwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdERUxFVEUnLCB7fSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdIRUFEJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBoZWFkKHVybCwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ0hFQUQnLCB7fSwge30sIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdQQVRDSCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBwYXRjaCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUEFUQ0gnLCBkYXRhLCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ09QVElPTlMnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIG9wdGlvbnModXJsLCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnT1BUSU9OUycsIHt9LCB7fSwgaGVhZGVycyk7XG5cdH1cbn07IiwiLyoqXG5cdCogQG5hbWUgdXRpbHNcblx0KiBAZGVzYyBVdGlscyBsaWJyYXJ5XG5cdCogQHJldHVybnMge29iamVjdH0gc2VsZlxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLlV0aWxzXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1dGlscygpIHtcblx0dmFyIHNlbGYgPSB7fTtcblx0c2VsZi5yZW1vdmUgPSByZW1vdmU7XG5cblx0cmV0dXJuIHNlbGY7XG5cblx0LyoqXG5cdCAgKiBAcHJpdmF0ZVxuXHQgICogQGRlc2MgSGVscGVyIGZ1bmN0aW9uIHRvIG51bGxpZnkgb2JqZWN0cyBhZnRlciAucmVtb3ZlIGlzIGNhbGxlZFxuXHQgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gVGhpbmcgdG8gYmUgcmVtb3ZlZFxuXHQgICogQHJldHVybnMge2Jvb2xlYW59IHN0YXR1c1xuXHQgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5VdGlsc1xuXHQgICovXG5cdGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG5cdCAgZm9yICh2YXIgaSBpbiBpdGVtKSB7XG5cdCAgICBpdGVtW2ldID0gdW5kZWZpbmVkO1xuXHQgICAgZGVsZXRlIGl0ZW1baV07XG5cdCAgfVxuXHQgIGl0ZW0gPSB1bmRlZmluZWQ7XG5cdCAgZGVsZXRlIGl0ZW07XG5cdCAgcmV0dXJuIHRydWU7XG5cdH1cbn07Il19
