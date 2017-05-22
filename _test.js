let Model = require('./model.class.js');
let ApiClass = require('./api.class.js');


class Test extends Model {
	constructor(data, config) {
		super(data, config);
	}
	test() {
		return 1 == 1;
	}
}

let apiDefs = new ApiClass();

	apiDefs.endpoint('Test')
		.model(Test)
		.route('/test');

	apiDefs.endpoint('Standard')
		.model(Model)
		.route('/standard');


let api = apiDefs.init();


let newModelA = new api.Test( {
	"started" : new Date(),
	'some' : 'value',
	'basic' : ['array','of','values'],
	'content' : 'This is a very simple string that should be diffed according to the merge algorithm'
});

let newModelB = new api.Standard( {
	"started" : new Date(),
	'some' : 'value',
	'basic' : ['array','of','values'],
	'content' : 'This is a very simple string that should be diffed according to the merge algorithm'
});

console.log(typeof newModelA.test);
console.log(typeof newModelB.test);

console.log(api.Test.find);
console.log(api.Standard.find);
