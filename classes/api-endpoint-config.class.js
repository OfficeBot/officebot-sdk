const Model = require('./model.class.js');

let privateData = new WeakMap();

class ApiEndpointConfig {
	constructor(config = {}) {
		let defaults = {
			model : Model,
			methods : function noop() {},
			route : {}
		};
		Object.assign(defaults, config);
		privateData.set(this, defaults);
	}
	/**
		* @desc Overrides the methods for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		* @todo This doesn't actually do anything yet
		*/
	methods(methodConfig) {
		if ('function' === typeof methodConfig) {
		  this.config().methods = new methodConfig();
		  return this;
		} else {
			return this.config().methods;
		}
	}

	config() {
		return privateData.get(this);
	}

	/**
		* @desc Overrides the model constructor for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	model(modelConstructor) {
		if ('function' === typeof modelConstructor) {
		  this.config().model = modelConstructor;
		  return this;
		} else {
			return this.config().model;
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
		  this.config().route = routeConfig;
		  return this;
		} else {
			return this.config().route;
		}
	}
}

module.exports = ApiEndpointConfig;
