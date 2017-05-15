var qs = require('qs');

class Query {
	constructor(searchFor) {
		this.queryString = '';

		if ('object' === typeof searchFor) {
			this.queryString = qs.stringify({'search' : searchFor});
		} else if ('string' === typeof searchFor) {
			this.queryString = searchFor;
		}

	}

	toString() {
		return this.queryString;
	}
}

module.exports = Query;