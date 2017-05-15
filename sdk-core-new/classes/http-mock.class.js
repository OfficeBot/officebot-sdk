class HTTPMock {
	constructor(verbose = false) {
		this.listeners = {};
		this.verbose = verbose;
	}

	open(method, url) {
		this.log(`Opening ${url} using ${method}`);
	}

	send(body) {
		this.log(`Sending with ${body}`);
		if ('function' === typeof this.listeners['load']) {
			let mockResponse = {
				response : {'mock_response' : true, 'data' : ['obj1']},
				responseText : "{'mock_response' : true}",
				status : 200,
				statusText : '200',
				responseURL : '/mock-call'
			};
			Object.assign(this, mockResponse);
			this.listeners['load']();
		}
	}

	getAllResponseHeaders() {
		return "Mock-Headers: true";
	}

	addEventListener(name, callback) {
		this.log(`${name} listener registered`);
		this.listeners[name] = callback;
	}

	log(message) {
		if (this.verbose === true) {
			console.log(message);
		}
	}
}

module.exports = HTTPMock;