const Query = require('./query.class.js');

let a = new Query();
console.log(a.toString());

let b = new Query({name : 'Scott Peterson'});
console.log(b.toString());