let privateData = new WeakMap();

class Model {
	constructor(publicData = {}, config = {}) {
		privateData.set(this,config);
		Object.assign( this, publicData );
	}
}

let modelA = new Model({ some : 'publicData'}, {'configuration' : ['sample','data']});
console.log(modelA);