class ApiEndpointConfig {
	constructor(config = {}) {
		this.config = config;
	}
	/**
		* @desc Overrides the methods for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	methods(methodConfig) {
		if ('function' === typeof methodConfig) {
		  this.config.methods = new methodConfig(); 
		  return this;
		} else {
			return this.config.methods;
		}
	}
	/**
		* @desc Overrides the model constructor for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	model(modelConstructor) {
		if ('function' === typeof modelConstructor) {
		  this.config.model = modelConstructor;
		  return this;
		} else {
			return this.config.model;
		}
	}

	classDef(classDefObject) {
		if (classDefObject) {
			this.config.classDef = classDefObject;
			return this;
		} else {
			return this.config.classDef;
		}
	}
	/**
		* @desc Points this endpoint to a given route on the server
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	route(routeConfig) {
		if (routeConfig) {
		  this.config.route = routeConfig;
		  return this;
		} else {
			return this.config.route;
		}
	}
}

module.exports = ApiEndpointConfig;