class Transport {
	constructor(request) {
		if ('undefined' !== typeof window && window.XMLHttpRequest) {
			this.HTTPRequest = window.XMLHttpRequest;
		} else {
			this.HTTPRequest = require('./http-mock.class.js'); //used for Node based tests
		}
		this.setRequest(request);
	}

	setRequest(request) {
		this.request = request;
		return this;
	}

	exec() {
		return new Promise((resolve, reject) => {
			let httpInstance = new this.HTTPRequest();

			httpInstance.addEventListener("load", transferComplete);
			httpInstance.addEventListener("error", transferFailed);
			httpInstance.addEventListener("abort", transferAborted);
			httpInstance.open( this.request.method().toUpperCase(), this.request.requestUrl() );

			let headers = this.request.headers();
			for ( let headerName in headers ) {
				httpInstance.setRequestHeader(headerName, headers[headerName]);
			}

			httpInstance.send( this.request.body() );

			/**
				* Handler:Aborted
				*/
			function transferAborted() {
				let failed = new Error('Transfer cancelled.');
				reject(failed);
			}
			/**
				* Handler:Failed
				*/
			function transferFailed() {
				reject(httpInstance);
			}
			/**
				* Handler:Finished
				*/
			function transferComplete() {
				if (httpInstance.status < 400) {
					resolve(httpInstance);
				} else {
					reject(httpInstance);
				}
			}
		});
	}
}

module.exports = Transport;
