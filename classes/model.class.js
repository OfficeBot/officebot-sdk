const jsondiffpatch = require('jsondiffpatch');
let clone = require('./utils.class.js').clone;

let privateData = new WeakMap();

class Model {
	constructor(data = {}, config = {}) {

		let localData = clone(data);

		Object.assign(this, localData);
		privateData.set(this, config);
		this.setOriginal(localData);
	}

	setOriginal(data = {}) {
		this.config().original = clone(data);
		return this;
	}

	config() {
		return privateData.get(this);
	}

	url(newUrl) {
		if ('string' === typeof newUrl) {
			this.config().url = newUrl;
			return this;
		} else {
			return this.config().url;
		}
	}

	changes() {
    var delta = jsondiffpatch.diff(this.config().original, this);
    return delta;
	}

	mergeChanges(delta) {
		jsondiffpatch.patch(this, delta);
		this.setOriginal(this);
		return this;
	}

	save(cb) {
		let callback = cb || function noop() {};
		return new Promise((resolve, reject) => {
			let request = this.config().originalRequest;
			if (!request) {
				let e = new Error('No appropriate configuration or link-back.');
				callback(e);
				return reject(e);
			}
			request.put().exec().then(resp => {
				Object.assign(this, resp);
				callback(null, this);
				return resolve(this);
			}).catch(err => {
				callback(err);
				return reject(err); //bubble
			});
		});
	}

	remove(cb) {
		let callback = cb || function noop() {};
		return new Promise((resolve, reject) => {
			let request = this.config().originalRequest;
			if (!request) {
				let e = new Error('No appropriate configuration or link-back.');
				callback(e);
				return reject(e);
			}
			request.delete().exec().then(resp => {
				Object.assign(this, resp);
				callback(null, this);
				return resolve(this);
			}).catch(err => {
				callback(err);
				return reject(err); //bubble
			});
		});
	}

	isDirty() {
		return this.changes() !== undefined;
	}
}

module.exports = Model;
