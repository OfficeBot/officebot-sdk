const chai = require('chai');
const assert = chai.assert;

const Utils = require('../classes/utils.class.js');

describe('Utils', () => {
  it ('Should be a function', () => {
    assert('function' === typeof Utils);
  });
  
  it ('Should have a static method "clone"', () => {
    assert('function' === typeof Utils.clone);
  });

  describe('.clone', () => {
    it ('Should return an empty object when called with no parameters', () => {
      let obj = Utils.clone();
      assert(obj && 'object' === typeof obj && Object.keys(obj).length === 0 );
    });

    it ('Should returned an exact copy', () => {
      let objA = {
        'key' : 'value',
        'arr' : ['array','of','strings']
      };
      let objB = Utils.clone(objA);
      assert( objB.key && Array.isArray(objB.arr) && objB.arr.length === 3);
    });

    it ('Should correctly copy dates', () => {
      let sampleTime = new Date(2017, 03, 01); //April 1st
      let objA = {
        timestamp : sampleTime
      };
      let objB = Utils.clone(objA);
      assert(objB.timestamp.getMonth() === 3 &&
        objB.timestamp.getDate() === 1 &&
        objB.timestamp.getFullYear() === 2017);
    });

    it ('Should not create a reference to the original object', () => {
      let objA = {
        arr : [1,2,3]
      };
      let objB = Utils.clone(objA);
      objA.arr[0] = 10;

      assert(objA !== objB && objA.arr[0] === 10 && objB.arr[0] === 1);
    });
  });
});
