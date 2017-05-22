let ApiEndpointConfig = require('./api-endpoint-config.class.js');
let EndpointConstructor = require('./api-endpoint.class.js');

class Api {
	constructor(config = {}) {
		let defaults = {
			endpoints : {}
		};
		this.config = {};
		Object.assign(this.config, defaults, config);
	}

	setBaseRoute(baseUrl) {
		if ('string' === typeof baseUrl) {
			this.config.baseRoute = baseUrl;
			return this;
		} else {
			return this.config.baseRoute;
		}
	}

	endpoint(endpointName) {
		if ('string' === typeof endpointName) {
			let newEndpoint = new ApiEndpointConfig();
			this.config.endpoints[endpointName] = newEndpoint;
			return newEndpoint;
		} else {
			return this.config.endpoints;
		}
	}

	init() {
		let endpoints = this.config.endpoints;
		let apiStruct = {};
		for (let i in endpoints) {
			let endpointConfig = endpoints[i];
			apiStruct[i] = EndpointConstructor( endpointConfig );
		}
		return apiStruct;
	}

	/**
		* @todo - this doesn't make any sense. We are instantiating endpoints but
		* never using them?
		*/
	$get($injector) {
		if (!$injector || 'function' !== typeof $injector.instantiate) {
			throw new Error('Unable to load Angular $injector.');
		}
		let apiObject = {};

		for (let name in this.endpoints) {
      if (this.endpoints.hasOwnProperty(name)) {
        apiObject[name] = $injector.instantiate(ApiEndpointConstructor, {
          endpointConfig: endpointConfig,
        });
      }
    }

   	return apiObject;
	}
}

module.exports = Api;
