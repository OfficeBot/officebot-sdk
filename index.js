var angular = require('angular');
var moduleName = 'officebot-sdk';

angular
	.module(moduleName, [
		require('./sdk-core')
	])

module.exports = moduleName;