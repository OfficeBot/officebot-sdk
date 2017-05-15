var util = require('util');

// console.log(util.inspect(process.memoryUsage()));

function clone(obj) {
	return JSON.parse(JSON.stringify(obj), jsondiffpatch.dateReviver)
}


const jsondiffpatch = require('jsondiffpatch');

let privateData = new WeakMap();

class Model {
	constructor(data = {}, config = {}) {

		let localData = clone(data);

		config.lastAccessed = new Date();
		Object.assign(this, localData);
		privateData.set(this, config);
		this.setOriginal(localData);
	}

	setOriginal(data) {
		this.config().original = clone(data);
	}

	config() {
		return privateData.get(this);
	}

	lastAccessed() {
		return config().lastAccessed;
	}

	url() {
		return this.config().url;
	}

	changes() {
    var delta = jsondiffpatch.diff(this.config().original, this);
    return delta;
	}

	mergeChanges(delta) {
		jsondiffpatch.patch(this, delta);
		this.setOriginal(this);
	}

	save(cb) {
		return new Promise((resolve, reject) => {
			let request = this.config().originalRequest;
			if (!request) {
				return reject(new Error('No appropriate configuration or link-back.'));
			}
			request.put().exec().then(resp => {
				Object.assign(this, resp);
				if ('function' === typeof cb) {
					cb(null, this);
				}
				return resolve(this);
			}).catch(err => {
				if ('function' === typeof cb) {
					cb(err);
				}
				return reject(err); //bubble	
			});
		});
	}

	remove(cb) {
		return new Promise((resolve, reject) => {
			let request = this.config().originalRequest;
			if (!request) {
				return reject(new Error('No appropriate configuration or link-back.'));
			}
			request.delete().exec().then(resp => {
				Object.assign(this, resp);
				if ('function' === typeof cb) {
					cb(null, this);
				}
				return resolve(this);
			}).catch(err => {
				if ('function' === typeof cb) {
					cb(err);
				}
				return reject(err); //bubble	
			});
		});
	}

	isDirty() {
		return this.changes() !== undefined;
	}
}

class Test extends Model {
	constructor(data, config) {
		super(data, config);
	}
	test() {
		return 1 == 1;
	}
}

const ApiEndpointConfig = require('./api-endpoint-config.class.js');
const ApiEndpoint = require('./api-endpoint.class.js');

let config = new ApiEndpointConfig().model(Test).route('/test');
let api = {
	Project : new ApiEndpoint(config)
};

var dataA = {
	"started" : new Date(),
	'some' : 'value',
	'basic' : ['array','of','values'],
	'content' : 'This is a very simple string that should be diffed according to the merge algorithm'
};
console.time("test_1");

let collection = [];

for (let k = 0; k < 10000; ++k) {
	let newModelA = new api.Project(dataA);
	// newModelA.save();
	collection.push(newModelA);
}

// console.log(collection.length);
console.timeEnd("test_1");

// let newModelB = new api.Project(dataA);

// newModelA.basic.push('last val');

// console.log(newModelA.config().original);
// console.log(newModelB);
// console.log(newModel);
// newModel.save().then(() => {
// 	newModelB.save().then(() => {
// 		console.log(newModelB.config());
// 		console.log(newModel.config());
// 		console.log(newModel.config() == newModelB.config());
// 	});
// })
// api.Project.findById('1234').exec().then(model => {
// 	model.data.push('another value');
// 	console.log(model.isDirty());
// }).catch(err => {
// 	console.log(err);
// });


