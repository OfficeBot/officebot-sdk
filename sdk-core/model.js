var extend = require('extend');
var angular = require('angular');
var hash = require('object-hash');

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
		this['@hash'] = hash(angular.toJson(this));
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

	  delete model['@hash'];
		var tmp = JSON.parse( angular.toJson(model) );
		var method = 'put';
		var href = tmp['@href'];

	  transport
		  .request(href, method, tmp, {}, {})
	    .then(function(response) {
	      if (response && response.data) {
	      	extend(true, model, response.data);
	      	model['@hash'] = hash(angular.toJson(model));
	      }
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};

	/**
		* @desc Does a simple dirty check by calculating a new hash and comparing it to
		* the original
		*/
	Model.prototype.isDirty = function() {
		var currentHash = this['@hash'];
		var currentModel = JSON.parse( JSON.stringify(this) );
		delete currentModel['@hash'];
		var newHash = hash(angular.toJson(currentModel));
		return newHash !== currentHash;
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