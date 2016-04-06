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
		if (endpointConfig.model) {
			extend(true, this, endpointConfig.model);
		}
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
	      	model._temporary = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQtY29uZmlnLmpzIiwic2RrLWNvcmUvYXBpLWVuZHBvaW50LmpzIiwic2RrLWNvcmUvYXBpLXByb3ZpZGVyLmpzIiwic2RrLWNvcmUvYXBpLmpzIiwic2RrLWNvcmUvY2FjaGUuanMiLCJzZGstY29yZS9pbmRleC5qcyIsInNkay1jb3JlL21vZGVsLmpzIiwic2RrLWNvcmUvdHJhbnNwb3J0LmpzIiwic2RrLWNvcmUvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbW9kdWxlTmFtZSA9ICdvZmZpY2Vib3Qtc2RrJztcblxuYW5ndWxhclxuXHQubW9kdWxlKG1vZHVsZU5hbWUsIFtcblx0XHRyZXF1aXJlKCcuL3Nkay1jb3JlJylcblx0XSlcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVOYW1lOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsvKiovfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH0gZWxzZSBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHx8IHRhcmdldCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuIiwiLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVBcGlFbmRwb2ludENvbmZpZ1xuXHQqIEBkZXNjIENyZWF0ZXMgYSBuZXcgQXBpIEVuZHBvaW50IENvbmZpZyBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3Jcblx0KiBAcmV0dXJucyB7b2JqZWN0fSBBcGlFbmRwb2ludENvbmZpZ1xuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZUFwaUVuZHBvaW50Q29uZmlnKCRpbmplY3Rvcikge1xuXHQvKipcblx0ICAqIEBjb25zdHJ1Y3RvclxuXHQgICovXG5cdGZ1bmN0aW9uIEFwaUVuZHBvaW50Q29uZmlnKCkge31cblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLnJvdXRlID0gcm91dGU7XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5tb2RlbCA9IG1vZGVsO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUubWV0aG9kcyA9IG1ldGhvZHM7XG5cblx0cmV0dXJuIEFwaUVuZHBvaW50Q29uZmlnO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgT3ZlcnJpZGVzIHRoZSBtZXRob2RzIGZvciB0aGlzIGVuZHBvaW50XG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50Q29uZmlnXG5cdFx0KiBAcGFyYW0ge29iamVjdH0gbWV0aG9kc1xuXHRcdCogQHJldHVybnMge29iamVjdH0gdGhpc1xuXHRcdCovXG5cdGZ1bmN0aW9uIG1ldGhvZHMobWV0aG9kcykge1xuXHQgIHRoaXMubWV0aG9kcyA9ICRpbmplY3Rvci5pbnN0YW50aWF0ZShtZXRob2RzKTsgXG5cdCAgcmV0dXJuIHRoaXM7XG5cdH1cblx0LyoqXG5cdFx0KiBAZGVzYyBPdmVycmlkZXMgdGhlIG1vZGVsIGNvbnN0cnVjdG9yIGZvciB0aGlzIGVuZHBvaW50XG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50Q29uZmlnXG5cdFx0KiBAcGFyYW0ge29iamVjdH0gbWV0aG9kc1xuXHRcdCogQHJldHVybnMge29iamVjdH0gdGhpc1xuXHRcdCovXG5cdGZ1bmN0aW9uIG1vZGVsKG1vZGVsKSB7XG5cdCAgdGhpcy5tb2RlbCA9ICRpbmplY3Rvci5pbnN0YW50aWF0ZShtb2RlbCk7XG5cdCAgcmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFBvaW50cyB0aGlzIGVuZHBvaW50IHRvIGEgZ2l2ZW4gcm91dGUgb24gdGhlIHNlcnZlclxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiByb3V0ZShyb3V0ZSkge1xuXHQgIHRoaXMucm91dGUgPSByb3V0ZTtcblx0ICByZXR1cm4gdGhpcztcblx0fVxuXG59OyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xudmFyIGluc3RhbnRpYXRlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbi8qKlxuICAqIEBuYW1lIEFwaUVuZHBvaW50XG4gICogQGRlc2MgQ29uc3RydWN0b3IgZm9yIGFwaSBlbmRwb2ludHNcbiAgKiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcbiAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVJvdXRlXG4gICogQHBhcmFtIHtvYmplY3R9IGVuZHBvaW50Q29uZmlnXG4gICogQHBhcmFtIHtvYmplY3R9IHRyYW5zcG9ydFxuICAqIEByZXR1cm5zIHtvYmplY3R9IGVuZHBvaW50XG4gICogQHJlcXVpcmVzIGFuZ3VsYXJcbiAgKiBAcmVxdWlyZXMgZXh0ZW5kXG4gICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaUVuZHBvaW50KGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcsIHRyYW5zcG9ydCwgY2FjaGUsICR0aW1lb3V0KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJ25nSW5qZWN0JztcblxuICAvKlxuICAgIFRoaXMgbWlnaHQgc2VlbSBjb25mdXNpbmcsIGJ1dCB3aGF0IHdlIGFjdHVhbGx5IGRvaW5nIGlzIHByb3ZpZGluZyBhbiBpbnRlcmZhY2VcbiAgICBmb3Igd2hlbiB3ZSBjYWxsIGBuZXdgIG9uIHRoaXMuIFRoYXQgaXMsIGlmIHdlIGRvIHNvbWV0aGluZyBsaWtlOlxuICAgIHZhciBzb21lT2JqID0gbmV3IFRoaXNFbmRwb2ludCgpXG5cbiAgICBXZSB0aGVuIGhhdmUgdGhlIGFiaWxpdHkgdG8gcGFzcyBpbiBkZWZhdWx0IGRhdGFcbiAgKi9cbiAgdmFyIHNlbGYgPSBmdW5jdGlvbihkYXRhLCBvblJlYWR5KSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcbiAgICB9XG4gICAgXG4gICAgLypcbiAgICAgIElmIHdlJ3ZlIHBhc3NlZCBpbiBhIGN1c3RvbSBtb2RlbCBvYmplY3QsIGxldCdzIGV4dGVuZCBvdXIgZGVmYXVsdCBtb2RlbFxuICAgICAgd2l0aCB0aGlzIGN1c3RvbSBtb2RlbC4gVGhpcyBnaXZlcyB1cyBuZXcgbWV0aG9kcyB0aGF0IG5ld2x5IGNyZWF0ZWQgbW9kZWxzIGZvclxuICAgICAgdGhpcyBlbmRwb2ludCB3aWxsIGhhdmVcbiAgICAqL1xuICAgIGlmIChlbmRwb2ludENvbmZpZy5tb2RlbCkge1xuICAgICAgYW5ndWxhci5leHRlbmQodGhpcywgZW5kcG9pbnRDb25maWcubW9kZWwpO1xuICAgIH1cblxuICAgIHZhciByb290VXJsID0gYmFzZVJvdXRlICsgZW5kcG9pbnRDb25maWcucm91dGU7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0cmFuc3BvcnQucHV0KHJvb3RVcmwsIGRhdGEpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgIC8vIHZhciBjYWNoZWRNb2RlbCA9IF9pbnN0YW50aWF0ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgcmVzcG9uc2UuZGF0YS5fdGVtcG9yYXJ5ID0gdHJ1ZTtcbiAgICAgICAgLy9PdXIgQVBJIG9ubHkgY3JlYXRlcyBhbiBIUkVGIGFmdGVyIHRoZSBmaXJzdCBzYXZlLCBzbyB3ZSBuZWVkIHRvIGZha2Ugb25lXG4gICAgICAgIHJlc3BvbnNlLmRhdGEuaHJlZiA9IHJvb3RVcmw7XG5cbiAgICAgICAgZXh0ZW5kKHRydWUsIF90aGlzLCByZXNwb25zZS5kYXRhKTtcblxuICAgICAgICBjYWNoZS5wdXQocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBvblJlYWR5KSB7XG4gICAgICAgICAgcmV0dXJuIG9uUmVhZHkobnVsbCwgX3RoaXMpO1xuICAgICAgICB9XG4gICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBvblJlYWR5KSB7XG4gICAgICAgICAgcmV0dXJuIG9uUmVhZHkoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8qIFxuICAgIERlZmF1bHRzIGZvciBvdXIgcmVxdWVzdCwgaW4gY2FzZSBjb25maWcgb2JqZWN0cyBhcmVuJ3QgcGFzc2VkIGluIFxuICAqL1xuICBzZWxmLnJlcSA9IHtcbiAgICBtZXRob2QgOiAnZ2V0JyxcbiAgICB1cmwgOiAnJyxcbiAgICBxdWVyeSA6IHt9LFxuICAgIGNvbmZpZyA6IHt9LFxuICAgIGRhdGEgOiB7fVxuICB9O1xuXG4gIC8qIFxuICAgIEJyaW5nIGluIHRoZSBjb25maWd1cmF0aW9ucyB0aGF0IHdlcmUgcGFzc2VkIGluIG9uIGJhc2VSb3V0ZSBhbmQgZW5kcG9pbnRDb25maWcgXG4gICovXG4gIHNlbGYuY29uZmlnID0gZW5kcG9pbnRDb25maWc7XG4gIHNlbGYuYmFzZVVybCA9IGJhc2VSb3V0ZSArIHNlbGYuY29uZmlnLnJvdXRlO1xuXG4gIC8qIFxuICAgIEluc3RlYWQgb2YgaW5saW5pbmcgb3VyIGZ1bmN0aW9ucywgdXNlIGhvaXN0aW5nIHRvIG1ha2UgdGhpbmdzIG5pY2UgYW5kIGNsZWFuIFxuICAqL1xuICBzZWxmLmV4ZWMgPSBleGVjO1xuICBzZWxmLmZpbmQgPSBmaW5kO1xuICBzZWxmLnBvcHVsYXRlID0gcG9wdWxhdGU7XG4gIHNlbGYuc2tpcCA9IHNraXA7XG4gIHNlbGYubGltaXQgPSBsaW1pdDtcbiAgc2VsZi5maW5kQnlJZCA9IGZpbmRCeUlkO1xuICBzZWxmLmZpbmRCeUlkQW5kUmVtb3ZlID0gZmluZEJ5SWRBbmRSZW1vdmU7XG4gIHNlbGYuZmluZEJ5SWRBbmRVcGRhdGUgPSBmaW5kQnlJZEFuZFJlbW92ZTtcblxuICAvKiBcbiAgICBTYXZlIGlzIGJvdW5kIHRvIHRoZSBwcm90b3R5cGUgc28gd2UgY2FuIHVzZSBpdCB3aGVuIGNyZWF0aW5nIGEgbmV3IGluc3RhbmNlIFxuICAqL1xuICBzZWxmLnByb3RvdHlwZS5zYXZlID0gc2F2ZTtcblxuICAvKiBcbiAgICBJZiB0aGUgZW5kcG9pbnRDb25maWcgaGFzIGEgY3VzdG9tIG1ldGhvZHMgb2JqZWN0LCBleHRlbmQgb3VyIGN1cnJlbnQgbWV0aG9kcyBsaXN0XG4gICAgd2l0aCB0aGUgbWV0aG9kcyB0aGF0IHdlJ3ZlIHBhc3NlZCBpbi4gVGhpcyBoYXNuJ3QgYmVlbiB0ZXN0ZWQgdmVyeSBleHRlbnNpdmVseSBcbiAgKi9cbiAgaWYgKGVuZHBvaW50Q29uZmlnLm1ldGhvZHMpIHtcbiAgICBlbmRwb2ludENvbmZpZy5tZXRob2RzLl9wYXJlbnQgPSBzZWxmO1xuICAgIGFuZ3VsYXIuZXh0ZW5kKHNlbGYsIGVuZHBvaW50Q29uZmlnLm1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBJbmRpY2F0ZXMgdGhlIGFtb3VudCBvZiByZWNvcmRzIHRvIHJldHVybiB3aGVuIHF1ZXJ5aW5nXG4gICAgKiBAbWVtYmVyT2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBzZWxmXG4gICAgKi9cbiAgZnVuY3Rpb24gbGltaXQoYW1vdW50KSB7XG4gICAgc2VsZi5yZXEucXVlcnkuX2xpbWl0ID0gYW1vdW50O1xuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBJbmRpY2F0ZXMgdGhlIGFtb3VudCBvZiByZWNvcmRzIHRvIHNraXAgb3ZlciB3aGVuIHF1ZXJ5aW5nXG4gICAgKiBAbWVtYmVyT2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBzZWxmXG4gICAgKi9cbiAgZnVuY3Rpb24gc2tpcChhbW91bnQpIHtcbiAgICBzZWxmLnJlcS5xdWVyeS5fc2tpcCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc2F2ZShjYWxsYmFjaykge1xuICAgIHZhciBjYiA9IGNhbGxiYWNrIHx8IGFuZ3VsYXIubm9vcDtcbiAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvL1VzZSAucmVxdWVzdCBpbnN0ZWFkIG9mIC5wb3N0IGluIHRoZSBzdXBlciByYXJlIGNhc2Ugd2Ugd2FudCB0byBwYXNzIGluIHNvbWVcbiAgICAvL2NvbmZpZyBvYmplY3QgcHJpb3IgdG8gc2F2aW5nLiBJIGNhbid0IHRoaW5rIG9mIGFueSBuZWVkIGZvciB0aGlzLCBidXQgSSdtXG4gICAgLy9pbmNsdWRpbmcgdGhhdCBmdW5jdGlvbmFsaXR5IGp1c3QgaW4gY2FzZS5cbiAgICAvKipcbiAgICAgICogSEFDSyAtIHRoaXMgb25seSB3b3JrcyAqanVzdCBiZWNhdXNlKiBhbmQgc2hvdWxkIGJlIGZpeGVkIHRvIHVzZSBhIG1vZGVsIGluc3RhbmNlXG4gICAgICAqL1xuICAgIHZhciBtZXRob2QgPSAnUE9TVCc7IC8vaWYgbmV3XG4gICAgdmFyIHRhcmdldFVybCA9IHNlbGYuYmFzZVVybDtcbiAgICBpZiAoX3RoaXMuaGFzT3duUHJvcGVydHkoJ2hyZWYnKSkge1xuICAgICAgaWYgKF90aGlzLl90ZW1wb3JhcnkgIT09IHRydWUpIHtcbiAgICAgICAgbWV0aG9kID0gJ1BVVCc7XG4gICAgICB9XG4gICAgICB0YXJnZXRVcmwgPSBfdGhpcy5ocmVmO1xuICAgIH1cblxuICAgIHRyYW5zcG9ydFxuICAgICAgLnJlcXVlc3QodGFyZ2V0VXJsLCBtZXRob2QsIF90aGlzLCB7fSwgc2VsZi5yZXEuY29uZmlnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZSB8fCB7fTtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgIGV4dGVuZCh0cnVlLCBfdGhpcywgZGF0YSk7XG5cbiAgICAgICAgY2FjaGUuaW52YWxpZGF0ZShkYXRhLl9pZCk7XG5cbiAgICAgICAgLy9TaWduYXR1cmUgaXM6IGVycm9yLCAqdGhpcyogaW5zdGFuY2UsIGZ1bGwgcmVzcG9uc2UgYm9keSAobW9zdGx5IGZvciBkZWJ1Z2dpbmcvc2FuaXR5IGNoZWNrKVxuICAgICAgICByZXR1cm4gY2IobnVsbCwgX3RoaXMsIHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEFwcGVuZHMgYSBzcGVjaWFsIHBhcmFtZXRlciB0byB0aGUgcXVlcnkgdG8gdGVsbCB0aGUgc2VydmVyIHRvIHBvcHVsYXRlIGFueSByZWZlcmVuY2VzXG4gICAgKiBpbiB0aGUgbW9kZWwuXG4gICAgKiBAZGVwcmVjYXRlZFxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtvYmplY3R9IGZpZWxkc1xuICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAqL1xuICBmdW5jdGlvbiBwb3B1bGF0ZShmaWVsZHMpIHtcbiAgICBzZWxmLnJlcS5xdWVyeS5fcG9wdWxhdGUgPSBmaWVsZHM7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIFNlbmRzIGEgcXVlcnkgdG8gdGhlIGFwaS4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGxhc3RcbiAgICAqIHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgKiB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBxdWVyeVxuICAgICogQHBhcmFtIHtvYmplY3Q9fSBjb25maWdcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmQocXVlcnksIGNvbmZpZywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdnZXQnO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmw7XG4gICAgcmVxLnF1ZXJ5ID0gcXVlcnk7XG4gICAgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0ge307XG4gICAgfVxuICAgIFxuICAgIHZhciBjYjtcbiAgICBcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgY2IgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgY2IgPSBjYWxsYmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNiKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEFza3MgdGhlIGFwaSB0byByZXR1cm4gb25lIGVsZW1lbnQuIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZVxuICAgICogbGFzdCBwYXJhbWV0ZXIsIHRoaXMgbWV0aG9kIHdpbGwgZXhlY3V0ZSB0aGUgcXVlcnkgYW5kIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICogdXNpbmcgdGhhdCBjYWxsYmFjayBmdW5jdGlvbi4gT3RoZXJ3aXNlLCBgdGhpc2AgZ2V0cyByZXR1cm5lZCBmb3JcbiAgICAqIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0PX0gY29uZmlnXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kQnlJZChpZCwgY29uZmlnLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2dldCc7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIHJlcS51cmwgPSB0aGlzLmJhc2VVcmwgKyAnLycgKyBpZDtcbiAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuICAgIFxuICAgIHZhciBjYjtcbiAgICBcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgY2IgPSBjb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgY2IgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICAvLyBIZXJlLCB3ZSBuZWVkIHRvIHNlZSBpZiB0aGlzIG9iamVjdCBpcyBhbHJlYWR5IGluIHRoZSBjYWNoZS4gSWYgc28sXG4gICAgLy8gZmV0Y2ggaXQgYW5kIG92ZXJyaWRlIG91ciBjYWxsYmFjayBzdGFja1xuXG4gICAgdmFyIGNhY2hlZE1vZGVsID0gY2FjaGUuZ2V0KGlkLCBfaW5zdGFudGlhdGUpO1xuICAgIGlmIChjYWNoZWRNb2RlbCkge1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgICByZXR1cm4gY2IobnVsbCwgY2FjaGVkTW9kZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGV4ZWMgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgY2FjaGVkTW9kZWwpO1xuICAgICAgICAgICAgfSwxMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBGaW5kcyBhbiBlbGVtZW50IG9uIHRoZSBBUEkgYW5kIHJlbW92ZXMgaXQgdXNpbmcgYSB1bmlxdWUgSUQuIElmIGEgXG4gICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGVcbiAgICAqIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSBpZFxuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWRBbmRSZW1vdmUoaWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZGVsZXRlJztcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEZpbmRzIGEgc2luZ2xlIGVsZW1lbnQgb24gdGhlIEFQSSB1c2luZyBhIHVuaXF1ZSBpZCBhbmQgUkVQTEFDRVMgaXRcbiAgICAqIHdpdGggdGhlIGRhdGEgeW91IHByb3ZpZGUuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcHJvdmlkZSBhdG9taWMgdXBkYXRlcy5cbiAgICAqIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBjYWxsYmFjaywgdGhlIHF1ZXJ5IHdpbGwgZXhlY3V0ZSBhbmQgdGhlXG4gICAgKiBlcnJvciBvciByZXN1bHQgZnJvbSB0aGUgY2FsbCB3aWxsIGJlIHBhc3NlZCBiYWNrIHVzaW5nIHRoZSBjYWxsYmFjay4gSWZcbiAgICAqIG5vIGZ1bmN0aW9uIGlzIHByb3ZpZGVkLCBgdGhpc2Agd2lsbCBiZSByZXR1cm5lZCBmb3IgY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkQW5kVXBkYXRlKGlkLCBkYXRhLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ3B1dCc7XG4gICAgcmVxLmRhdGEgPSBkYXRhO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmwgKyAnLycgKyBpZDtcbiAgICBcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcblxuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBUaGlzIG1ldGhvZCB3aWxsIGNvbXBvc2UgdGhlIGZpbmFsIHJlcXVlc3QsIHNlbmQgaXQgb3ZlciBvdXIgdHJhbnNwb3J0LFxuICAgICogYW5kIHJldHVybiB0aGUgZXJyb3Igb3IgcmVzdWx0cyB1c2luZyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBBZGRpdGlvbmFsbHksIHRoZSByZXNwb25zZSBpcyB3cmFwcGVkIGluIG91ciBjdXN0b20gTW9kZWwgb2JqZWN0cyB0byBtYWtlXG4gICAgKiB3b3JraW5nIHdpdGggdGhlbSBhIGxvdCBlYXNpZXJcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBleGVjKGNiKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJldHVybiB0cmFuc3BvcnRcbiAgICAgIC5yZXF1ZXN0KHJlcS51cmwsIHJlcS5tZXRob2QsIHJlcS5kYXRhLCByZXEucXVlcnksIHJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2NvbnZlcnQgcmVzcG9uc2UgdG8gbW9kZWxzXG4gICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZSB8fCB7fTtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpKSB7XG4gICAgICAgICAgICBtb2RlbCA9IGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgLy8gcmV0dXJuIGluc3RhbnRpYXRlTW9kZWwoaXRlbSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW50aWF0ZShpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RlbCA9IF9pbnN0YW50aWF0ZShkYXRhKTtcbiAgICAgICAgICAgIC8vIG1vZGVsID0gaW5zdGFudGlhdGVNb2RlbChkYXRhLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGRhdGEsIHJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBlcnIgPSBlcnIgfHwge307XG4gICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfaW5zdGFudGlhdGUoaXRlbSkge1xuICAgIHJldHVybiBpbnN0YW50aWF0ZU1vZGVsKGl0ZW0sIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgY2FjaGUpO1xuICB9XG59OyIsIi8qKlxuXHQqIEBuYW1lIEFwaVByb3ZpZGVyXG5cdCogQGRlc2MgV2lyZXMgdXAgdGhlIGFwaSBmdW5jdGlvbnMgYW5kIHByb3ZpZGVzIGEgY29uZmlnIGZ1bmN0aW9uXG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpUHJvdmlkZXJcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJHByb3ZpZGVcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3Jcblx0KiBAcmV0dXJucyBudWxsXG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaVByb3ZpZGVyKCRwcm92aWRlLCAkaW5qZWN0b3IpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBBcGkgPSByZXF1aXJlKCcuL2FwaS5qcycpKCRwcm92aWRlLCAkaW5qZWN0b3IpO1xuXHQkcHJvdmlkZS5wcm92aWRlcignYXBpJywgQXBpKTtcbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG4vKipcbiAgKiBAbmFtZSBJbnN0YW50aWF0ZUFwaVxuICAqIEBkZXNjIFJldHVybnMgQXBpIGNvbnN0cnVjdG9yXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpXG4gICogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRwcm92aWRlXG4gICogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdFxuICAqIEByZXR1cm5zIHtvYmplY3R9IGFwaVxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluc3RhbnRpYXRlQXBpKCRwcm92aWRlLCAkaW5qZWN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIEFwaUVuZHBvaW50Q29uZmlnID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQtY29uZmlnLmpzJykoJGluamVjdCk7XG4gIHZhciBBcGlFbmRwb2ludENvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQuanMnKTtcbiAgLyoqXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKi9cbiAgZnVuY3Rpb24gQXBpKCkge1xuICAgIHRoaXMuZW5kcG9pbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBBcGkucHJvdG90eXBlLnNldEJhc2VSb3V0ZSA9IHNldEJhc2VSb3V0ZTtcbiAgQXBpLnByb3RvdHlwZS5lbmRwb2ludCA9IGVuZHBvaW50O1xuICBBcGkucHJvdG90eXBlLiRnZXQgPSBbJyRpbmplY3RvcicsJ3RyYW5zcG9ydCcsJ21vZGVsQ2FjaGUnLCckdGltZW91dCcsIGdldF07XG5cbiAgcmV0dXJuIEFwaTtcbiAgLyoqXG4gICAgKiBAZGVzYyBTZXRzIHRoZSByb290IHVybCBmb3IgdGhpcyBhcGlcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVybFxuICAgICogQHJldHVybnMge29iamVjdH0gdGhpc1xuICAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VSb3V0ZShiYXNlVXJsKSB7XG4gICAgdGhpcy5iYXNlUm91dGUgPSBiYXNlVXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBDcmVhdGVzIGEgbmV3IGVuZHBvaW50IGNvbmZpZ3VyYXRpb25zIGFuZCBhdHRhY2hlcyBpdCB0byB0aGlzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVuZHBvaW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBuZXdFbmRwb2ludFxuICAgICovXG4gIGZ1bmN0aW9uIGVuZHBvaW50KG5hbWUpIHtcbiAgICB2YXIgYmFzZVJvdXRlID0gdGhpcy5iYXNlUm91dGU7XG4gICAgdmFyIG5ld0VuZHBvaW50ID0gbmV3IEFwaUVuZHBvaW50Q29uZmlnKCk7XG4gICAgdGhpcy5lbmRwb2ludHNbbmFtZV0gPSBuZXdFbmRwb2ludDtcbiAgICByZXR1cm4gbmV3RW5kcG9pbnQ7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEluamVjdG9yIGZ1bmN0aW9uIHRoYXQgYW5ndWxhciB3aWxsIHVzZVxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RvclxuICAgICogQHBhcmFtIHtvYmplY3R9IHRyYW5zcG9ydFxuICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsQ2FjaGVcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IGFwaVxuICAgICovXG4gIGZ1bmN0aW9uIGdldCgkaW5qZWN0b3IsIHRyYW5zcG9ydCwgbW9kZWxDYWNoZSkge1xuICAgIHZhciBhcGkgPSB7fTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBhbmd1bGFyLmZvckVhY2godGhpcy5lbmRwb2ludHMsIGZ1bmN0aW9uKGVuZHBvaW50Q29uZmlnLCBuYW1lKSB7XG4gICAgICBhcGlbbmFtZV0gPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUoQXBpRW5kcG9pbnRDb25zdHJ1Y3Rvciwge1xuICAgICAgICBiYXNlUm91dGU6IHNlbGYuYmFzZVJvdXRlLFxuICAgICAgICBlbmRwb2ludENvbmZpZzogZW5kcG9pbnRDb25maWcsXG4gICAgICAgIHRyYW5zcG9ydCA6IHRyYW5zcG9ydCxcbiAgICAgICAgY2FjaGUgOiBtb2RlbENhY2hlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcGk7XG4gIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtb2RlbENhY2hlU2VydmljZSgpIHtcblx0dmFyIGwgPSBsb2NhbFN0b3JhZ2U7XG5cblx0dGhpcy5wdXQgPSBwdXQ7XG5cdHRoaXMuZ2V0ID0gZ2V0O1xuXHR0aGlzLmludmFsaWRhdGUgPSBpbnZhbGlkYXRlO1xuXG5cdGZ1bmN0aW9uIHB1dChvYmplY3QsIGtleSkge1xuXHRcdHZhciBvYmplY3RJZCA9IGtleSB8fCBvYmplY3QuX2lkO1xuXHRcdGwuc2V0SXRlbShvYmplY3RJZCwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG5cdFx0cmV0dXJuIG9iamVjdElkO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0KG9iamVjdElkLCBjb25zdHJ1Y3Rvcikge1xuXHRcdGlmICghb2JqZWN0SWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIGNhY2hlZEl0ZW07XG5cdFx0aWYgKCdzdHJpbmcnID09PSB0eXBlb2YgbC5nZXRJdGVtKG9iamVjdElkKSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y2FjaGVkSXRlbSA9IEpTT04ucGFyc2UoIGwuZ2V0SXRlbShvYmplY3RJZCkgKTtcblx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRpbnZhbGlkYXRlKG9iamVjdElkKTtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uc3RydWN0b3IpIHtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3RvcihjYWNoZWRJdGVtKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGNhY2hlZEl0ZW07XG5cdFx0fVxuXHRcdFxuXHR9XG5cblx0ZnVuY3Rpb24gaW52YWxpZGF0ZShvYmplY3RJZCkge1xuXHRcdGlmICghb2JqZWN0SWQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGwucmVtb3ZlSXRlbShvYmplY3RJZCk7XG5cdH1cbn0iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBtb2R1bGVOYW1lID0gJ3Nkay1jb3JlJztcbi8qKlxuXHQqIEBuYW1lIHNkay1jb3JlXG5cdCogQGRlc2MgT2ZmaWNlQm90U0RLIGxpYnJhcnlcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNES1xuXHQqIEByZXR1cm5zIHtzdHJpbmd9IG1vZHVsZU5hbWVcblx0KiBAcmVxdWlyZXMgYW5ndWxhclxuXHQqL1xuYW5ndWxhclxuXHQubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxuXHQuc2VydmljZSgndHJhbnNwb3J0JywgcmVxdWlyZSgnLi90cmFuc3BvcnQuanMnKSlcblx0LnNlcnZpY2UoJ21vZGVsQ2FjaGUnLCByZXF1aXJlKCcuL2NhY2hlLmpzJykpXG5cdC5jb25maWcocmVxdWlyZSgnLi9hcGktcHJvdmlkZXIuanMnKSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVOYW1lOyIsInZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVNb2RlbFxuXHQqIEBkZXNjIFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBNb2RlbCBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE1vZGVsXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIE1vZGFsIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgd2l0aFxuXHQqIEByZXR1cm5zIHtvYmplY3R9IG1vZGVsXG5cdCogQHJlcXVpcmVzIGV4dGVuZFxuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovIFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZU1vZGVsKGRhdGEsIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgbW9kZWxDYWNoZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIGlzIG91ciBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBmaWxlLlxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtvYmplY3R9IGRhdGFcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdFx0Ki9cblx0dmFyIE1vZGVsID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcblx0XHRpZiAoZW5kcG9pbnRDb25maWcubW9kZWwpIHtcblx0XHRcdGV4dGVuZCh0cnVlLCB0aGlzLCBlbmRwb2ludENvbmZpZy5tb2RlbCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2F2ZXMgdGhlIGN1cnJlbnQgbW9kZWwncyByZXByZXNlbnRhdGlvbiB0byB0aGUgQVBJLiBUaGUgbW9kZWwgTVVTVFxuXHRcdCogaGF2ZSBhIHZhbGlkIEhSRUYgdGFnIG9yIHRoaXMgY2FsbCB3aWxsIGZhaWxcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG5cdFx0KiBAcmV0dXJucyB7bnVsbH1cblx0XHQqL1xuXHRNb2RlbC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKGNiKSB7XG5cdCAgdmFyIGNhbGxiYWNrID0gY2IgfHwgYW5ndWxhci5ub29wO1xuXHQgIHZhciBtb2RlbCA9IHRoaXM7XG5cblx0XHR2YXIgdG1wID0gSlNPTi5wYXJzZSggYW5ndWxhci50b0pzb24obW9kZWwpICk7XG5cdFx0dmFyIG1ldGhvZCA9ICdwdXQnO1xuXHRcdHZhciBocmVmID0gdG1wLmhyZWY7XG5cblx0XHRpZiAodG1wLl90ZW1wb3JhcnkgPT09IHRydWUpIHtcblx0XHRcdG1ldGhvZCA9ICdQT1NUJztcblx0XHRcdGRlbGV0ZSB0bXAuaHJlZjtcblx0XHR9XG5cblxuXG5cdCAgdHJhbnNwb3J0XG5cdFx0ICAucmVxdWVzdChocmVmLCBtZXRob2QsIHRtcCwge30sIHt9KVxuXHQgIFx0Ly8gLnB1dCggbW9kZWwuaHJlZiwgdG1wIClcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhKSB7XG5cdCAgICAgIFx0ZXh0ZW5kKHRydWUsIG1vZGVsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgICAgXHRtb2RlbC5fdGVtcG9yYXJ5ID0gZmFsc2U7XG5cdCAgICAgIFx0bW9kZWxDYWNoZS5pbnZhbGlkYXRlKCB0bXAuX2lkICk7XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXHQgICAgfSk7XG5cdH07XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBSZW1vdmVzIHRoaXMgbW9kZWwgZnJvbSB0aGUgQVBJLiBUaGUgbW9kZWwgTVVTVFxuXHRcdCogaGF2ZSBhIHZhbGlkIEhSRUYgdGFnIG9yIHRoaXMgY2FsbCB3aWxsIGZhaWxcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG5cdFx0KiBAcmV0dXJucyB7bnVsbH1cblx0XHQqL1xuXHRNb2RlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oY2IpIHtcblx0ICB2YXIgY2FsbGJhY2sgPSBjYiB8fCBhbmd1bGFyLm5vb3A7XG5cdCAgdmFyIG1vZGVsID0gdGhpcztcblxuXHQgIHJldHVybiB0cmFuc3BvcnRcblx0ICBcdC5kZWxldGUoIG1vZGVsLmhyZWYgKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXHQgICAgfSk7XG5cdH07XG5cdFxuXHQvL0ZpbmFsbHksIHNlbmQgdGhlIG5ldyBtb2RlbCBiYWNrXG5cdHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG59OyIsIi8qKlxuXHQqIEBuYW1lIGh0dHBUcmFuc3BvcnRcblx0KiBAZGVzYyBBYnN0cmFjdGlvbiBsYXllciBmb3Igb3VyIGNvbm5lY3Rpb25zIGluc2lkZSBvZiB0aGUgYXBpIHByb3ZpZGVyLlxuXHQqIFRoaXMgd2lsbCBhbGxvdyB1cyB0byBlYXNpbHkgcmVwbGFjZSB0aGlzIGRvd24gdGhlIGxpbmUgd2l0aCBzb21ldGhpbmdcblx0KiBlbHNlIChsaWtlIHNvY2tldHMpIGlmIHdlIGRlY2lkZSB0b1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAbmFtZXNwYWNlIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRodHRwXG5cdCogQHJldHVybnMge29iamVjdH1cblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaHR0cFRyYW5zcG9ydCgkaHR0cCkge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0dmFyIHNlbGYgPSB7fTtcblx0c2VsZi5yZXF1ZXN0ID0gcmVxdWVzdDtcblx0c2VsZi5nZXQgPSBnZXQ7XG5cdHNlbGYucG9zdCA9IHBvc3Q7XG5cdHNlbGYucHV0ID0gcHV0O1xuXHRzZWxmLmRlbGV0ZSA9IHJlbW92ZTtcblx0c2VsZi5wYXRjaCA9IHBhdGNoO1xuXHRzZWxmLmhlYWQgPSBoZWFkO1xuXHRzZWxmLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcblx0cmV0dXJuIHNlbGY7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIG1ldGhvZCBidW5kbGVzIGV2ZXJ5dGhpbmcgdXAgaW50byBhbiAkaHR0cCByZXF1ZXN0XG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG1ldGhvZCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0dXJsIDogdXJsLFxuXHRcdFx0bWV0aG9kIDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRkYXRhIDogZGF0YSxcblx0XHRcdHBhcmFtcyA6IHF1ZXJ5LFxuXHRcdFx0aGVhZGVycyA6IGhlYWRlcnNcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnR0VUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBnZXQodXJsLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ0dFVCcsIHt9LCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0dFVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBwb3N0KHVybCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdQT1NUJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdQVVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcHV0KHVybCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdQVVQnLCBkYXRhLCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0RFTEVURScsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcmVtb3ZlKHVybCwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdERUxFVEUnLCB7fSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdIRUFEJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBoZWFkKHVybCwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ0hFQUQnLCB7fSwge30sIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdQQVRDSCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBwYXRjaCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUEFUQ0gnLCBkYXRhLCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ09QVElPTlMnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIG9wdGlvbnModXJsLCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnT1BUSU9OUycsIHt9LCB7fSwgaGVhZGVycyk7XG5cdH1cbn07IiwiLyoqXG5cdCogQG5hbWUgdXRpbHNcblx0KiBAZGVzYyBVdGlscyBsaWJyYXJ5XG5cdCogQHJldHVybnMge29iamVjdH0gc2VsZlxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLlV0aWxzXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1dGlscygpIHtcblx0dmFyIHNlbGYgPSB7fTtcblx0c2VsZi5yZW1vdmUgPSByZW1vdmU7XG5cblx0cmV0dXJuIHNlbGY7XG5cblx0LyoqXG5cdCAgKiBAcHJpdmF0ZVxuXHQgICogQGRlc2MgSGVscGVyIGZ1bmN0aW9uIHRvIG51bGxpZnkgb2JqZWN0cyBhZnRlciAucmVtb3ZlIGlzIGNhbGxlZFxuXHQgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gVGhpbmcgdG8gYmUgcmVtb3ZlZFxuXHQgICogQHJldHVybnMge2Jvb2xlYW59IHN0YXR1c1xuXHQgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5VdGlsc1xuXHQgICovXG5cdGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG5cdCAgZm9yICh2YXIgaSBpbiBpdGVtKSB7XG5cdCAgICBpdGVtW2ldID0gdW5kZWZpbmVkO1xuXHQgICAgZGVsZXRlIGl0ZW1baV07XG5cdCAgfVxuXHQgIGl0ZW0gPSB1bmRlZmluZWQ7XG5cdCAgZGVsZXRlIGl0ZW07XG5cdCAgcmV0dXJuIHRydWU7XG5cdH1cbn07Il19
