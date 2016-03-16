(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/scott/Desktop/officebot-sdk/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'officebot-sdk';

angular
	.module(moduleName, [
		require('./sdk-core')
	])

module.exports = moduleName;
},{"./sdk-core":"/Users/scott/Desktop/officebot-sdk/sdk-core/index.js","angular":"angular"}],"/Users/scott/Desktop/officebot-sdk/node_modules/extend/index.js":[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var undefined;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	'use strict';
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	'use strict';
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
				if (target === copy) {
					continue;
				}

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
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],"/Users/scott/Desktop/officebot-sdk/sdk-core/api-endpoint-config.js":[function(require,module,exports){
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
},{}],"/Users/scott/Desktop/officebot-sdk/sdk-core/api-endpoint.js":[function(require,module,exports){
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
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport) {
  'use strict';
  'ngInject';

  /*
    This might seem confusing, but what we actually doing is providing an interface
    for when we call `new` on this. That is, if we do something like:
    var someObj = new ThisEndpoint()

    We then have the ability to pass in default data
  */
  var self = function(data) {
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
      method = 'PUT';
      targetUrl = _this.href;
    }

    transport
      .request(targetUrl, method, _this, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        extend(true, _this, data);

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

    if ('function' === typeof cb) {
      return self.exec(cb);
    }

    return self;
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
              return instantiateModel(item, transport, baseRoute, endpointConfig);
            });
          } else {
            model = instantiateModel(data, transport, baseRoute, endpointConfig);
          }
          data = model;
        }
        return cb(null, data, response, headers);
      }, function(err) {
        err = err || {};
        return cb(err);
      });
  }
};
},{"./model.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/model.js","./utils.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/utils.js","angular":"angular","extend":"/Users/scott/Desktop/officebot-sdk/node_modules/extend/index.js"}],"/Users/scott/Desktop/officebot-sdk/sdk-core/api-provider.js":[function(require,module,exports){
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
},{"./api.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/api.js"}],"/Users/scott/Desktop/officebot-sdk/sdk-core/api.js":[function(require,module,exports){
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
  Api.prototype.$get = ['$injector','transport', get];

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
    * @returns {object} api
    */
  function get($injector, transport) {
    var api = {};

    var self = this;
    angular.forEach(this.endpoints, function(endpointConfig, name) {
      api[name] = $injector.instantiate(ApiEndpointConstructor, {
        baseRoute: self.baseRoute,
        endpointConfig: endpointConfig,
        transport : transport
      });
    });

    return api;
  }
};
},{"./api-endpoint-config.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/api-endpoint-config.js","./api-endpoint.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/api-endpoint.js","angular":"angular"}],"/Users/scott/Desktop/officebot-sdk/sdk-core/index.js":[function(require,module,exports){
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
	.config(require('./api-provider.js'));

	module.exports = moduleName;
},{"./api-provider.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/api-provider.js","./transport.js":"/Users/scott/Desktop/officebot-sdk/sdk-core/transport.js","angular":"angular"}],"/Users/scott/Desktop/officebot-sdk/sdk-core/model.js":[function(require,module,exports){
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
module.exports = function InstantiateModel(data, transport, baseRoute, endpointConfig) {
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

	  transport
	  	.put( model.href, tmp )
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
},{"angular":"angular","extend":"/Users/scott/Desktop/officebot-sdk/node_modules/extend/index.js"}],"/Users/scott/Desktop/officebot-sdk/sdk-core/transport.js":[function(require,module,exports){
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
},{}],"/Users/scott/Desktop/officebot-sdk/sdk-core/utils.js":[function(require,module,exports){
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
},{}]},{},["/Users/scott/Desktop/officebot-sdk/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQtY29uZmlnLmpzIiwic2RrLWNvcmUvYXBpLWVuZHBvaW50LmpzIiwic2RrLWNvcmUvYXBpLXByb3ZpZGVyLmpzIiwic2RrLWNvcmUvYXBpLmpzIiwic2RrLWNvcmUvaW5kZXguanMiLCJzZGstY29yZS9tb2RlbC5qcyIsInNkay1jb3JlL3RyYW5zcG9ydC5qcyIsInNkay1jb3JlL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnb2ZmaWNlYm90LXNkayc7XG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXG5cdFx0cmVxdWlyZSgnLi9zZGstY29yZScpXG5cdF0pXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCJ2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgdW5kZWZpbmVkO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzX293bl9jb25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNfaXNfcHJvcGVydHlfb2ZfbWV0aG9kID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNfb3duX2NvbnN0cnVjdG9yICYmICFoYXNfaXNfcHJvcGVydHlfb2ZfbWV0aG9kKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHt9XG5cblx0cmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ID09PSBjb3B5KSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdH0gZWxzZSBpZiAoY29weSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4iLCIvKipcblx0KiBAbmFtZSBJbnN0YW50aWF0ZUFwaUVuZHBvaW50Q29uZmlnXG5cdCogQGRlc2MgQ3JlYXRlcyBhIG5ldyBBcGkgRW5kcG9pbnQgQ29uZmlnIG9iamVjdFxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50Q29uZmlnXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RvclxuXHQqIEByZXR1cm5zIHtvYmplY3R9IEFwaUVuZHBvaW50Q29uZmlnXG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluc3RhbnRpYXRlQXBpRW5kcG9pbnRDb25maWcoJGluamVjdG9yKSB7XG5cdC8qKlxuXHQgICogQGNvbnN0cnVjdG9yXG5cdCAgKi9cblx0ZnVuY3Rpb24gQXBpRW5kcG9pbnRDb25maWcoKSB7fVxuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUucm91dGUgPSByb3V0ZTtcblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLm1vZGVsID0gbW9kZWw7XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5tZXRob2RzID0gbWV0aG9kcztcblxuXHRyZXR1cm4gQXBpRW5kcG9pbnRDb25maWc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBPdmVycmlkZXMgdGhlIG1ldGhvZHMgZm9yIHRoaXMgZW5kcG9pbnRcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gbWV0aG9kcyhtZXRob2RzKSB7XG5cdCAgdGhpcy5tZXRob2RzID0gJGluamVjdG9yLmluc3RhbnRpYXRlKG1ldGhvZHMpOyBcblx0ICByZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0XHQqIEBkZXNjIE92ZXJyaWRlcyB0aGUgbW9kZWwgY29uc3RydWN0b3IgZm9yIHRoaXMgZW5kcG9pbnRcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gbW9kZWwobW9kZWwpIHtcblx0ICB0aGlzLm1vZGVsID0gJGluamVjdG9yLmluc3RhbnRpYXRlKG1vZGVsKTtcblx0ICByZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgUG9pbnRzIHRoaXMgZW5kcG9pbnQgdG8gYSBnaXZlbiByb3V0ZSBvbiB0aGUgc2VydmVyXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50Q29uZmlnXG5cdFx0KiBAcGFyYW0ge29iamVjdH0gbWV0aG9kc1xuXHRcdCogQHJldHVybnMge29iamVjdH0gdGhpc1xuXHRcdCovXG5cdGZ1bmN0aW9uIHJvdXRlKHJvdXRlKSB7XG5cdCAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG52YXIgaW5zdGFudGlhdGVNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwuanMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxuLyoqXG4gICogQG5hbWUgQXBpRW5kcG9pbnRcbiAgKiBAZGVzYyBDb25zdHJ1Y3RvciBmb3IgYXBpIGVuZHBvaW50c1xuICAqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlUm91dGVcbiAgKiBAcGFyYW0ge29iamVjdH0gZW5kcG9pbnRDb25maWdcbiAgKiBAcGFyYW0ge29iamVjdH0gdHJhbnNwb3J0XG4gICogQHJldHVybnMge29iamVjdH0gZW5kcG9pbnRcbiAgKiBAcmVxdWlyZXMgYW5ndWxhclxuICAqIEByZXF1aXJlcyBleHRlbmRcbiAgKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXBpRW5kcG9pbnQoYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgdHJhbnNwb3J0KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJ25nSW5qZWN0JztcblxuICAvKlxuICAgIFRoaXMgbWlnaHQgc2VlbSBjb25mdXNpbmcsIGJ1dCB3aGF0IHdlIGFjdHVhbGx5IGRvaW5nIGlzIHByb3ZpZGluZyBhbiBpbnRlcmZhY2VcbiAgICBmb3Igd2hlbiB3ZSBjYWxsIGBuZXdgIG9uIHRoaXMuIFRoYXQgaXMsIGlmIHdlIGRvIHNvbWV0aGluZyBsaWtlOlxuICAgIHZhciBzb21lT2JqID0gbmV3IFRoaXNFbmRwb2ludCgpXG5cbiAgICBXZSB0aGVuIGhhdmUgdGhlIGFiaWxpdHkgdG8gcGFzcyBpbiBkZWZhdWx0IGRhdGFcbiAgKi9cbiAgdmFyIHNlbGYgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICBcdGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcbiAgICB9XG4gICAgXG4gICAgLypcbiAgICAgIElmIHdlJ3ZlIHBhc3NlZCBpbiBhIGN1c3RvbSBtb2RlbCBvYmplY3QsIGxldCdzIGV4dGVuZCBvdXIgZGVmYXVsdCBtb2RlbFxuICAgICAgd2l0aCB0aGlzIGN1c3RvbSBtb2RlbC4gVGhpcyBnaXZlcyB1cyBuZXcgbWV0aG9kcyB0aGF0IG5ld2x5IGNyZWF0ZWQgbW9kZWxzIGZvclxuICAgICAgdGhpcyBlbmRwb2ludCB3aWxsIGhhdmVcbiAgICAqL1xuICAgIGlmIChlbmRwb2ludENvbmZpZy5tb2RlbCkge1xuICAgICAgYW5ndWxhci5leHRlbmQodGhpcywgZW5kcG9pbnRDb25maWcubW9kZWwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLyogXG4gICAgRGVmYXVsdHMgZm9yIG91ciByZXF1ZXN0LCBpbiBjYXNlIGNvbmZpZyBvYmplY3RzIGFyZW4ndCBwYXNzZWQgaW4gXG4gICovXG4gIHNlbGYucmVxID0ge1xuICAgIG1ldGhvZCA6ICdnZXQnLFxuICAgIHVybCA6ICcnLFxuICAgIHF1ZXJ5IDoge30sXG4gICAgY29uZmlnIDoge30sXG4gICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgLyogXG4gICAgQnJpbmcgaW4gdGhlIGNvbmZpZ3VyYXRpb25zIHRoYXQgd2VyZSBwYXNzZWQgaW4gb24gYmFzZVJvdXRlIGFuZCBlbmRwb2ludENvbmZpZyBcbiAgKi9cbiAgc2VsZi5jb25maWcgPSBlbmRwb2ludENvbmZpZztcbiAgc2VsZi5iYXNlVXJsID0gYmFzZVJvdXRlICsgc2VsZi5jb25maWcucm91dGU7XG5cbiAgLyogXG4gICAgSW5zdGVhZCBvZiBpbmxpbmluZyBvdXIgZnVuY3Rpb25zLCB1c2UgaG9pc3RpbmcgdG8gbWFrZSB0aGluZ3MgbmljZSBhbmQgY2xlYW4gXG4gICovXG4gIHNlbGYuZXhlYyA9IGV4ZWM7XG4gIHNlbGYuZmluZCA9IGZpbmQ7XG4gIHNlbGYucG9wdWxhdGUgPSBwb3B1bGF0ZTtcbiAgc2VsZi5za2lwID0gc2tpcDtcbiAgc2VsZi5saW1pdCA9IGxpbWl0O1xuICBzZWxmLmZpbmRCeUlkID0gZmluZEJ5SWQ7XG4gIHNlbGYuZmluZEJ5SWRBbmRSZW1vdmUgPSBmaW5kQnlJZEFuZFJlbW92ZTtcbiAgc2VsZi5maW5kQnlJZEFuZFVwZGF0ZSA9IGZpbmRCeUlkQW5kUmVtb3ZlO1xuXG4gIC8qIFxuICAgIFNhdmUgaXMgYm91bmQgdG8gdGhlIHByb3RvdHlwZSBzbyB3ZSBjYW4gdXNlIGl0IHdoZW4gY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2UgXG4gICovXG4gIHNlbGYucHJvdG90eXBlLnNhdmUgPSBzYXZlO1xuXG4gIC8qIFxuICAgIElmIHRoZSBlbmRwb2ludENvbmZpZyBoYXMgYSBjdXN0b20gbWV0aG9kcyBvYmplY3QsIGV4dGVuZCBvdXIgY3VycmVudCBtZXRob2RzIGxpc3RcbiAgICB3aXRoIHRoZSBtZXRob2RzIHRoYXQgd2UndmUgcGFzc2VkIGluLiBUaGlzIGhhc24ndCBiZWVuIHRlc3RlZCB2ZXJ5IGV4dGVuc2l2ZWx5IFxuICAqL1xuICBpZiAoZW5kcG9pbnRDb25maWcubWV0aG9kcykge1xuICAgIGVuZHBvaW50Q29uZmlnLm1ldGhvZHMuX3BhcmVudCA9IHNlbGY7XG4gICAgYW5ndWxhci5leHRlbmQoc2VsZiwgZW5kcG9pbnRDb25maWcubWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcblxuICAvKipcbiAgICAqIEBkZXNjIEluZGljYXRlcyB0aGUgYW1vdW50IG9mIHJlY29yZHMgdG8gcmV0dXJuIHdoZW4gcXVlcnlpbmdcbiAgICAqIEBtZW1iZXJPZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICAqL1xuICBmdW5jdGlvbiBsaW1pdChhbW91bnQpIHtcbiAgICBzZWxmLnJlcS5xdWVyeS5fbGltaXQgPSBhbW91bnQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEluZGljYXRlcyB0aGUgYW1vdW50IG9mIHJlY29yZHMgdG8gc2tpcCBvdmVyIHdoZW4gcXVlcnlpbmdcbiAgICAqIEBtZW1iZXJPZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICAqL1xuICBmdW5jdGlvbiBza2lwKGFtb3VudCkge1xuICAgIHNlbGYucmVxLnF1ZXJ5Ll9za2lwID0gYW1vdW50O1xuICAgIHJldHVybiBzZWxmO1xuICB9XG5cblxuICBmdW5jdGlvbiBzYXZlKGNhbGxiYWNrKSB7XG4gICAgdmFyIGNiID0gY2FsbGJhY2sgfHwgYW5ndWxhci5ub29wO1xuICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vVXNlIC5yZXF1ZXN0IGluc3RlYWQgb2YgLnBvc3QgaW4gdGhlIHN1cGVyIHJhcmUgY2FzZSB3ZSB3YW50IHRvIHBhc3MgaW4gc29tZVxuICAgIC8vY29uZmlnIG9iamVjdCBwcmlvciB0byBzYXZpbmcuIEkgY2FuJ3QgdGhpbmsgb2YgYW55IG5lZWQgZm9yIHRoaXMsIGJ1dCBJJ21cbiAgICAvL2luY2x1ZGluZyB0aGF0IGZ1bmN0aW9uYWxpdHkganVzdCBpbiBjYXNlLlxuICAgIC8qKlxuICAgICAgKiBIQUNLIC0gdGhpcyBvbmx5IHdvcmtzICpqdXN0IGJlY2F1c2UqIGFuZCBzaG91bGQgYmUgZml4ZWQgdG8gdXNlIGEgbW9kZWwgaW5zdGFuY2VcbiAgICAgICovXG4gICAgdmFyIG1ldGhvZCA9ICdQT1NUJzsgLy9pZiBuZXdcbiAgICB2YXIgdGFyZ2V0VXJsID0gc2VsZi5iYXNlVXJsO1xuICAgIGlmIChfdGhpcy5oYXNPd25Qcm9wZXJ0eSgnaHJlZicpKSB7XG4gICAgICBtZXRob2QgPSAnUFVUJztcbiAgICAgIHRhcmdldFVybCA9IF90aGlzLmhyZWY7XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0XG4gICAgICAucmVxdWVzdCh0YXJnZXRVcmwsIG1ldGhvZCwgX3RoaXMsIHt9LCBzZWxmLnJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlIHx8IHt9O1xuICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgZXh0ZW5kKHRydWUsIF90aGlzLCBkYXRhKTtcblxuICAgICAgICAvL1NpZ25hdHVyZSBpczogZXJyb3IsICp0aGlzKiBpbnN0YW5jZSwgZnVsbCByZXNwb25zZSBib2R5IChtb3N0bHkgZm9yIGRlYnVnZ2luZy9zYW5pdHkgY2hlY2spXG4gICAgICAgIHJldHVybiBjYihudWxsLCBfdGhpcywgcmVzcG9uc2UpO1xuICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGNiKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgQXBwZW5kcyBhIHNwZWNpYWwgcGFyYW1ldGVyIHRvIHRoZSBxdWVyeSB0byB0ZWxsIHRoZSBzZXJ2ZXIgdG8gcG9wdWxhdGUgYW55IHJlZmVyZW5jZXNcbiAgICAqIGluIHRoZSBtb2RlbC5cbiAgICAqIEBkZXByZWNhdGVkXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge29iamVjdH0gZmllbGRzXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICovXG4gIGZ1bmN0aW9uIHBvcHVsYXRlKGZpZWxkcykge1xuICAgIHNlbGYucmVxLnF1ZXJ5Ll9wb3B1bGF0ZSA9IGZpZWxkcztcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgU2VuZHMgYSBxdWVyeSB0byB0aGUgYXBpLiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgbGFzdFxuICAgICogcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGUgdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAqIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtvYmplY3R9IHF1ZXJ5XG4gICAgKiBAcGFyYW0ge29iamVjdD19IGNvbmZpZ1xuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZChxdWVyeSwgY29uZmlnLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2dldCc7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybDtcbiAgICByZXEucXVlcnkgPSBxdWVyeTtcbiAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSB7fTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGNiO1xuICAgIFxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICBjYiA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICBjYiA9IGNhbGxiYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2IpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgQXNrcyB0aGUgYXBpIHRvIHJldHVybiBvbmUgZWxlbWVudC4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlXG4gICAgKiBsYXN0IHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgKiB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSBpZFxuICAgICogQHBhcmFtIHtvYmplY3Q9fSBjb25maWdcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkKGlkLCBjb25maWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZ2V0JztcbiAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgcmVxLnVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkO1xuICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG4gICAgXG4gICAgdmFyIGNiO1xuICAgIFxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICBjYiA9IGNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICBjYiA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2IpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBGaW5kcyBhbiBlbGVtZW50IG9uIHRoZSBBUEkgYW5kIHJlbW92ZXMgaXQgdXNpbmcgYSB1bmlxdWUgSUQuIElmIGEgXG4gICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGVcbiAgICAqIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSBpZFxuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWRBbmRSZW1vdmUoaWQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZGVsZXRlJztcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEZpbmRzIGEgc2luZ2xlIGVsZW1lbnQgb24gdGhlIEFQSSB1c2luZyBhIHVuaXF1ZSBpZCBhbmQgUkVQTEFDRVMgaXRcbiAgICAqIHdpdGggdGhlIGRhdGEgeW91IHByb3ZpZGUuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcHJvdmlkZSBhdG9taWMgdXBkYXRlcy5cbiAgICAqIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBjYWxsYmFjaywgdGhlIHF1ZXJ5IHdpbGwgZXhlY3V0ZSBhbmQgdGhlXG4gICAgKiBlcnJvciBvciByZXN1bHQgZnJvbSB0aGUgY2FsbCB3aWxsIGJlIHBhc3NlZCBiYWNrIHVzaW5nIHRoZSBjYWxsYmFjay4gSWZcbiAgICAqIG5vIGZ1bmN0aW9uIGlzIHByb3ZpZGVkLCBgdGhpc2Agd2lsbCBiZSByZXR1cm5lZCBmb3IgY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkQW5kVXBkYXRlKGlkLCBkYXRhLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ3B1dCc7XG4gICAgcmVxLmRhdGEgPSBkYXRhO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmwgKyAnLycgKyBpZDtcbiAgICBcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcblxuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBUaGlzIG1ldGhvZCB3aWxsIGNvbXBvc2UgdGhlIGZpbmFsIHJlcXVlc3QsIHNlbmQgaXQgb3ZlciBvdXIgdHJhbnNwb3J0LFxuICAgICogYW5kIHJldHVybiB0aGUgZXJyb3Igb3IgcmVzdWx0cyB1c2luZyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBBZGRpdGlvbmFsbHksIHRoZSByZXNwb25zZSBpcyB3cmFwcGVkIGluIG91ciBjdXN0b20gTW9kZWwgb2JqZWN0cyB0byBtYWtlXG4gICAgKiB3b3JraW5nIHdpdGggdGhlbSBhIGxvdCBlYXNpZXJcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBleGVjKGNiKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJldHVybiB0cmFuc3BvcnRcbiAgICAgIC5yZXF1ZXN0KHJlcS51cmwsIHJlcS5tZXRob2QsIHJlcS5kYXRhLCByZXEucXVlcnksIHJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2NvbnZlcnQgcmVzcG9uc2UgdG8gbW9kZWxzXG4gICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZSB8fCB7fTtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpKSB7XG4gICAgICAgICAgICBtb2RlbCA9IGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbnRpYXRlTW9kZWwoaXRlbSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RlbCA9IGluc3RhbnRpYXRlTW9kZWwoZGF0YSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYihudWxsLCBkYXRhLCByZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgZXJyID0gZXJyIHx8IHt9O1xuICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG59OyIsIi8qKlxuXHQqIEBuYW1lIEFwaVByb3ZpZGVyXG5cdCogQGRlc2MgV2lyZXMgdXAgdGhlIGFwaSBmdW5jdGlvbnMgYW5kIHByb3ZpZGVzIGEgY29uZmlnIGZ1bmN0aW9uXG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpUHJvdmlkZXJcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJHByb3ZpZGVcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3Jcblx0KiBAcmV0dXJucyBudWxsXG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaVByb3ZpZGVyKCRwcm92aWRlLCAkaW5qZWN0b3IpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBBcGkgPSByZXF1aXJlKCcuL2FwaS5qcycpKCRwcm92aWRlLCAkaW5qZWN0b3IpO1xuXHQkcHJvdmlkZS5wcm92aWRlcignYXBpJywgQXBpKTtcbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG4vKipcbiAgKiBAbmFtZSBJbnN0YW50aWF0ZUFwaVxuICAqIEBkZXNjIFJldHVybnMgQXBpIGNvbnN0cnVjdG9yXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpXG4gICogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRwcm92aWRlXG4gICogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdFxuICAqIEByZXR1cm5zIHtvYmplY3R9IGFwaVxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluc3RhbnRpYXRlQXBpKCRwcm92aWRlLCAkaW5qZWN0KSB7XG4gICduZ0luamVjdCc7XG5cbiAgdmFyIEFwaUVuZHBvaW50Q29uZmlnID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQtY29uZmlnLmpzJykoJGluamVjdCk7XG4gIHZhciBBcGlFbmRwb2ludENvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9hcGktZW5kcG9pbnQuanMnKTtcbiAgLyoqXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKi9cbiAgZnVuY3Rpb24gQXBpKCkge1xuICAgIHRoaXMuZW5kcG9pbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBBcGkucHJvdG90eXBlLnNldEJhc2VSb3V0ZSA9IHNldEJhc2VSb3V0ZTtcbiAgQXBpLnByb3RvdHlwZS5lbmRwb2ludCA9IGVuZHBvaW50O1xuICBBcGkucHJvdG90eXBlLiRnZXQgPSBbJyRpbmplY3RvcicsJ3RyYW5zcG9ydCcsIGdldF07XG5cbiAgcmV0dXJuIEFwaTtcbiAgLyoqXG4gICAgKiBAZGVzYyBTZXRzIHRoZSByb290IHVybCBmb3IgdGhpcyBhcGlcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVybFxuICAgICogQHJldHVybnMge29iamVjdH0gdGhpc1xuICAgICovXG4gIGZ1bmN0aW9uIHNldEJhc2VSb3V0ZShiYXNlVXJsKSB7XG4gICAgdGhpcy5iYXNlUm91dGUgPSBiYXNlVXJsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBDcmVhdGVzIGEgbmV3IGVuZHBvaW50IGNvbmZpZ3VyYXRpb25zIGFuZCBhdHRhY2hlcyBpdCB0byB0aGlzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVuZHBvaW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBuZXdFbmRwb2ludFxuICAgICovXG4gIGZ1bmN0aW9uIGVuZHBvaW50KG5hbWUpIHtcbiAgICB2YXIgYmFzZVJvdXRlID0gdGhpcy5iYXNlUm91dGU7XG4gICAgdmFyIG5ld0VuZHBvaW50ID0gbmV3IEFwaUVuZHBvaW50Q29uZmlnKCk7XG4gICAgdGhpcy5lbmRwb2ludHNbbmFtZV0gPSBuZXdFbmRwb2ludDtcbiAgICByZXR1cm4gbmV3RW5kcG9pbnQ7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEluamVjdG9yIGZ1bmN0aW9uIHRoYXQgYW5ndWxhciB3aWxsIHVzZVxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RvclxuICAgICogQHBhcmFtIHtvYmplY3R9IHRyYW5zcG9ydFxuICAgICogQHJldHVybnMge29iamVjdH0gYXBpXG4gICAgKi9cbiAgZnVuY3Rpb24gZ2V0KCRpbmplY3RvciwgdHJhbnNwb3J0KSB7XG4gICAgdmFyIGFwaSA9IHt9O1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmVuZHBvaW50cywgZnVuY3Rpb24oZW5kcG9pbnRDb25maWcsIG5hbWUpIHtcbiAgICAgIGFwaVtuYW1lXSA9ICRpbmplY3Rvci5pbnN0YW50aWF0ZShBcGlFbmRwb2ludENvbnN0cnVjdG9yLCB7XG4gICAgICAgIGJhc2VSb3V0ZTogc2VsZi5iYXNlUm91dGUsXG4gICAgICAgIGVuZHBvaW50Q29uZmlnOiBlbmRwb2ludENvbmZpZyxcbiAgICAgICAgdHJhbnNwb3J0IDogdHJhbnNwb3J0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhcGk7XG4gIH1cbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbW9kdWxlTmFtZSA9ICdzZGstY29yZSc7XG4vKipcblx0KiBAbmFtZSBzZGstY29yZVxuXHQqIEBkZXNjIE9mZmljZUJvdFNESyBsaWJyYXJ5XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREtcblx0KiBAcmV0dXJucyB7c3RyaW5nfSBtb2R1bGVOYW1lXG5cdCogQHJlcXVpcmVzIGFuZ3VsYXJcblx0Ki9cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcblx0LnNlcnZpY2UoJ3RyYW5zcG9ydCcsIHJlcXVpcmUoJy4vdHJhbnNwb3J0LmpzJykpXG5cdC5jb25maWcocmVxdWlyZSgnLi9hcGktcHJvdmlkZXIuanMnKSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVOYW1lOyIsInZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVNb2RlbFxuXHQqIEBkZXNjIFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBNb2RlbCBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE1vZGVsXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIE1vZGFsIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgd2l0aFxuXHQqIEByZXR1cm5zIHtvYmplY3R9IG1vZGVsXG5cdCogQHJlcXVpcmVzIGV4dGVuZFxuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovIFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZU1vZGVsKGRhdGEsIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZykge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIGlzIG91ciBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBmaWxlLlxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtvYmplY3R9IGRhdGFcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdFx0Ki9cblx0dmFyIE1vZGVsID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKipcblx0XHQqIEBkZXNjIFNhdmVzIHRoZSBjdXJyZW50IG1vZGVsJ3MgcmVwcmVzZW50YXRpb24gdG8gdGhlIEFQSS4gVGhlIG1vZGVsIE1VU1Rcblx0XHQqIGhhdmUgYSB2YWxpZCBIUkVGIHRhZyBvciB0aGlzIGNhbGwgd2lsbCBmYWlsXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLk1vZGVsXG5cdFx0KiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCogQHJldHVybnMge251bGx9XG5cdFx0Ki9cblx0TW9kZWwucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbihjYikge1xuXHQgIHZhciBjYWxsYmFjayA9IGNiIHx8IGFuZ3VsYXIubm9vcDtcblx0ICB2YXIgbW9kZWwgPSB0aGlzO1xuXG5cdFx0dmFyIHRtcCA9IEpTT04ucGFyc2UoIGFuZ3VsYXIudG9Kc29uKG1vZGVsKSApO1xuXG5cdCAgdHJhbnNwb3J0XG5cdCAgXHQucHV0KCBtb2RlbC5ocmVmLCB0bXAgKVxuXHQgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcblx0ICAgICAgXHRleHRlbmQodHJ1ZSwgbW9kZWwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgUmVtb3ZlcyB0aGlzIG1vZGVsIGZyb20gdGhlIEFQSS4gVGhlIG1vZGVsIE1VU1Rcblx0XHQqIGhhdmUgYSB2YWxpZCBIUkVGIHRhZyBvciB0aGlzIGNhbGwgd2lsbCBmYWlsXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLk1vZGVsXG5cdFx0KiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCogQHJldHVybnMge251bGx9XG5cdFx0Ki9cblx0TW9kZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGNiKSB7XG5cdCAgdmFyIGNhbGxiYWNrID0gY2IgfHwgYW5ndWxhci5ub29wO1xuXHQgIHZhciBtb2RlbCA9IHRoaXM7XG5cblx0ICByZXR1cm4gdHJhbnNwb3J0XG5cdCAgXHQuZGVsZXRlKCBtb2RlbC5ocmVmIClcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXHRcblx0Ly9GaW5hbGx5LCBzZW5kIHRoZSBuZXcgbW9kZWwgYmFja1xuXHRyZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xufTsiLCIvKipcblx0KiBAbmFtZSBodHRwVHJhbnNwb3J0XG5cdCogQGRlc2MgQWJzdHJhY3Rpb24gbGF5ZXIgZm9yIG91ciBjb25uZWN0aW9ucyBpbnNpZGUgb2YgdGhlIGFwaSBwcm92aWRlci5cblx0KiBUaGlzIHdpbGwgYWxsb3cgdXMgdG8gZWFzaWx5IHJlcGxhY2UgdGhpcyBkb3duIHRoZSBsaW5lIHdpdGggc29tZXRoaW5nXG5cdCogZWxzZSAobGlrZSBzb2NrZXRzKSBpZiB3ZSBkZWNpZGUgdG9cblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQG5hbWVzcGFjZSBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaHR0cFxuXHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGh0dHBUcmFuc3BvcnQoJGh0dHApIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVxdWVzdCA9IHJlcXVlc3Q7XG5cdHNlbGYuZ2V0ID0gZ2V0O1xuXHRzZWxmLnBvc3QgPSBwb3N0O1xuXHRzZWxmLnB1dCA9IHB1dDtcblx0c2VsZi5kZWxldGUgPSByZW1vdmU7XG5cdHNlbGYucGF0Y2ggPSBwYXRjaDtcblx0c2VsZi5oZWFkID0gaGVhZDtcblx0c2VsZi5vcHRpb25zID0gb3B0aW9ucztcblx0XG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgVGhpcyBtZXRob2QgYnVuZGxlcyBldmVyeXRoaW5nIHVwIGludG8gYW4gJGh0dHAgcmVxdWVzdFxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdHVybCA6IHVybCxcblx0XHRcdG1ldGhvZCA6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0ZGF0YSA6IGRhdGEsXG5cdFx0XHRwYXJhbXMgOiBxdWVyeSxcblx0XHRcdGhlYWRlcnMgOiBoZWFkZXJzXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0dFVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdHRVQnLCB7fSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdHRVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUE9TVCcsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUFVUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHB1dCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUFVUJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdERUxFVEUnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlbW92ZSh1cmwsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnREVMRVRFJywge30sIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnSEVBRCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gaGVhZCh1cmwsIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdIRUFEJywge30sIHt9LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUEFUQ0gnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcGF0Y2godXJsLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ1BBVENIJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdPUFRJT05TJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBvcHRpb25zKHVybCwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ09QVElPTlMnLCB7fSwge30sIGhlYWRlcnMpO1xuXHR9XG59OyIsIi8qKlxuXHQqIEBuYW1lIHV0aWxzXG5cdCogQGRlc2MgVXRpbHMgbGlicmFyeVxuXHQqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5VdGlsc1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdXRpbHMoKSB7XG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVtb3ZlID0gcmVtb3ZlO1xuXG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHQgICogQHByaXZhdGVcblx0ICAqIEBkZXNjIEhlbHBlciBmdW5jdGlvbiB0byBudWxsaWZ5IG9iamVjdHMgYWZ0ZXIgLnJlbW92ZSBpcyBjYWxsZWRcblx0ICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIFRoaW5nIHRvIGJlIHJlbW92ZWRcblx0ICAqIEByZXR1cm5zIHtib29sZWFufSBzdGF0dXNcblx0ICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuVXRpbHNcblx0ICAqL1xuXHRmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuXHQgIGZvciAodmFyIGkgaW4gaXRlbSkge1xuXHQgICAgaXRlbVtpXSA9IHVuZGVmaW5lZDtcblx0ICAgIGRlbGV0ZSBpdGVtW2ldO1xuXHQgIH1cblx0ICBpdGVtID0gdW5kZWZpbmVkO1xuXHQgIGRlbGV0ZSBpdGVtO1xuXHQgIHJldHVybiB0cnVlO1xuXHR9XG59OyJdfQ==
