const jsondiffpatch = require('jsondiffpatch');

class Utils {
	constructor() {}

	static clone(obj = {}) {
		return JSON.parse(JSON.stringify(obj), jsondiffpatch.dateReviver);
	}
}

module.exports = Utils;
