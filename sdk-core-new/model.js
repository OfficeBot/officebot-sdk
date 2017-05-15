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

		//Todo - build in instantiation here for our _classDef

		var tmp = JSON.parse( angular.toJson(model) );
		var method = 'put';
		var href = tmp['@href'];

	  transport
		  .request(href, method, tmp, {}, {})
	    .then(function(response) {
	      if (response && response.data) {
					var newModel = instantiateModelInstance({});
					extend(true, newModel, this);
					return callback(null, newModel);
	      } else {
		      return callback(null, response);
				}
	    }, function(err) {
	      return callback(err);
	    });
	};

	/**
		* @desc Does a simple dirty check by calculating a new hash and comparing it to
		* the original
		*/
	Model.prototype.isDirty = function() {
		return true;
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
	var newModel = new Model(data);
	return instantiateModelInstance(newModel);


	function instantiateModelInstance(baseModel = {}) {
		if ('function' === typeof endpointConfig._classDef) {
			var modelInstance = new endpointConfig._classDef(newModel);
	    for (var i in newModel) {
	    	if ('function' === typeof newModel[i]) {
	    		modelInstance[i] = newModel[i];
	    	}
	    }
	    return modelInstance;
    } else {
			return baseModel;
		}
	}

};
