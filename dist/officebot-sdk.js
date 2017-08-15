(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/scott/Dev/officebot-sdk/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'officebot-sdk';

angular
	.module(moduleName, [
		require('./sdk-core')
	])

module.exports = moduleName;
},{"./sdk-core":"/home/scott/Dev/officebot-sdk/sdk-core/index.js","angular":"angular"}],"/home/scott/Dev/officebot-sdk/node_modules/extend/index.js":[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],"/home/scott/Dev/officebot-sdk/node_modules/object-hash/dist/object_hash.js":[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.objectHash=e()}}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return f(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),g(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.replacer=t.replacer||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function g(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=y(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function y(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t).sort();e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=y(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e)},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),y(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_8c3adc78.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;G(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);G(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function g(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?K.fromByteArray(e):K.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||(G("boolean"==typeof n,"missing or invalid endian"),G(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||(G("boolean"==typeof n,"missing or invalid endian"),G(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+1<e.length,"trying to write beyond buffer length"),z(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function C(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"trying to write beyond buffer length"),z(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function j(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+1<e.length,"Trying to write beyond buffer length"),X(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"Trying to write beyond buffer length"),X(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?C(e,t,n,r,o):C(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"Trying to write beyond buffer length"),$(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+7<e.length,"Trying to write beyond buffer length"),$(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return K.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function z(e,t){G("number"==typeof e,"cannot write a non-number as a number"),G(e>=0,"specified a negative value for writing an unsigned value"),G(e<=t,"value is larger than maximum value for type"),G(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){G("number"==typeof e,"cannot write a non-number as a number"),G(e<=t,"value larger than maximum allowed value"),G(e>=n,"value smaller than minimum allowed value"),G(Math.floor(e)===e,"value has a fractional component")}function $(e,t,n){G("number"==typeof e,"cannot write a non-number as a number"),G(e<=t,"value larger than maximum allowed value"),G(e>=n,"value smaller than minimum allowed value")}function G(e,t){if(!e)throw new Error(t||"Failed assertion")}var K=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(G(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=g(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){G(r>=n,"sourceEnd < sourceStart"),G(t>=0&&t<e.length,"targetStart out of bounds"),G(n>=0&&n<i.length,"sourceStart out of bounds"),G(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||(G(void 0!==e&&null!==e,"missing offset"),G(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(G(void 0!==e&&null!==e,"missing offset"),G(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(G(void 0!==e&&null!==e,"missing value"),G(void 0!==t&&null!==t,"missing offset"),G(t<this.length,"trying to write beyond buffer length"),z(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(G(void 0!==e&&null!==e,"missing value"),G(void 0!==t&&null!==t,"missing offset"),G(t<this.length,"Trying to write beyond buffer length"),X(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),G("number"==typeof e&&!isNaN(e),"value is not a number"),G(n>=t,"end < start"),n!==t&&0!==this.length){G(t>=0&&t<this.length,"start out of bounds"),G(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,g],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*y);return d(i,n,r)}var o=e("buffer").Buffer,p=4,g=new o(p);g.fill(0);var y=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,g=e("./sha"),y=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:g,sha256:y,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=g(n,r,o,i,e[u+5],4,-378558),i=g(i,n,r,o,e[u+8],11,-2022574463),o=g(o,i,n,r,e[u+11],16,1839030562),r=g(r,o,i,n,e[u+14],23,-35309556),n=g(n,r,o,i,e[u+1],4,-1530992060),i=g(i,n,r,o,e[u+4],11,1272893353),o=g(o,i,n,r,e[u+7],16,-155497632),r=g(r,o,i,n,e[u+10],23,-1094730640),n=g(n,r,o,i,e[u+13],4,681279174),i=g(i,n,r,o,e[u+0],11,-358537222),o=g(o,i,n,r,e[u+3],16,-722521979),r=g(r,o,i,n,e[u+6],23,76029189),n=g(n,r,o,i,e[u+9],4,-640364487),i=g(i,n,r,o,e[u+12],11,-421815835),o=g(o,i,n,r,e[u+15],16,530742520),r=g(r,o,i,n,e[u+2],23,-995338651),n=y(n,r,o,i,e[u+0],6,-198630844),i=y(i,n,r,o,e[u+7],10,1126891415),o=y(o,i,n,r,e[u+14],15,-1416354905),r=y(r,o,i,n,e[u+5],21,-57434055),n=y(n,r,o,i,e[u+12],6,1700485571),i=y(i,n,r,o,e[u+3],10,-1894986606),o=y(o,i,n,r,e[u+10],15,-1051523),r=y(r,o,i,n,e[u+1],21,-2054922799),n=y(n,r,o,i,e[u+8],6,1873313359),i=y(i,n,r,o,e[u+15],10,-30611744),o=y(o,i,n,r,e[u+6],15,-1560198380),r=y(r,o,i,n,e[u+13],21,1309151649),n=y(n,r,o,i,e[u+4],6,-145523070),i=y(i,n,r,o,e[u+11],10,-1120210379),o=y(o,i,n,r,e[u+2],15,718787259),r=y(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,y=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=g(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(g(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=g(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,y),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function g(e,t){return e<<t|e>>>32-t}var y=e("./helpers");t.exports=function(e){return y.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},g=function(e,t,n){return e&t^~e&n},y=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22)},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);
e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),g(u,a,f)),_[l]),I[l]),p=d(w(n),y(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/home/scott/Dev/officebot-sdk/sdk-core/api-endpoint-config.js":[function(require,module,exports){
/**
	* @name InstantiateApiEndpointConfig
	* @desc Creates a new Api Endpoint Config object
	* @namespace OfficeBotSDK.ApiEndpointConfig
	* @memberof OfficeBotSDK
	* @param {provider} $injector
	* @returns {object} ApiEndpointConfig
	*/
module.exports = function InstantiateApiEndpointConfig($injector) {
	/**
	  * @constructor
	  */
	function ApiEndpointConfig() {}
	ApiEndpointConfig.prototype.route = route;
	ApiEndpointConfig.prototype.model = model;
	ApiEndpointConfig.prototype.methods = methods;
	ApiEndpointConfig.prototype.classDef = classDef;

	return ApiEndpointConfig;

	/**
		* @desc Overrides the methods for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function methods(methods) {
	  this.methods = $injector.instantiate(methods); 
	  return this;
	}
	/**
		* @desc Overrides the model constructor for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function model(model) {
	  this.model = $injector.instantiate(model);
	  return this;
	}

	function classDef(classDefObject) {
		this._classDef = classDefObject;
		return this;
	}

	/**
		* @desc Points this endpoint to a given route on the server
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function route(route) {
	  this.route = route;
	  return this;
	}

};
},{}],"/home/scott/Dev/officebot-sdk/sdk-core/api-endpoint.js":[function(require,module,exports){
var angular = require('angular');
var extend = require('extend');
var instantiateModel = require('./model.js');
var utils = require('./utils.js');

/**
  * @name ApiEndpoint
  * @desc Constructor for api endpoints
  * @namespace OfficeBotSDK.ApiEndpoint
  * @memberof OfficeBotSDK
  * @param {string} baseRoute
  * @param {object} endpointConfig
  * @param {object} transport
  * @returns {object} endpoint
  * @requires angular
  * @requires extend
  */
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport, cache, $timeout) {
  'use strict';
  'ngInject';

  /*
    This might seem confusing, but what we actually doing is providing an interface
    for when we call `new` on this. That is, if we do something like:
    var someObj = new ThisEndpoint()

    We then have the ability to pass in default data
  */
  var self = function(data, onReady) {
    if (data) {
      extend(true, this, data);
    }

    /*
      If we've passed in a custom model object, let's extend our default model
      with this custom model. This gives us new methods that newly created models for
      this endpoint will have
    */
    // if (endpointConfig.model) {
    //   var instance = this;
    //   var modelInstance = new endpointConfig.model(instance);
    //   angular.extend(this, modelInstance);
    // }
    var rootUrl = baseRoute + endpointConfig.route;

    if ('function' === typeof endpointConfig._classDef) {
      var instance = this;
      var modelInstance = new endpointConfig._classDef(instance);
      for (var i in instance) {
        if ('function' === typeof instance[i]) {
          modelInstance[i] = instance[i];
        }
      }
      return modelInstance;
    }

    return this;
  };

  /*
    Defaults for our request, in case config objects aren't passed in
  */
  self.req = {
    method : 'get',
    url : '',
    query : {},
    config : {},
    data : {}
  };

  /*
    Bring in the configurations that were passed in on baseRoute and endpointConfig
  */
  self.config = endpointConfig;
  self.baseUrl = baseRoute + self.config.route;

  /*
    Instead of inlining our functions, use hoisting to make things nice and clean
  */
  self.exec = exec;
  self.find = find;
  self.search = search;
  self.skip = skip;
  self.fields = fields;
  self.limit = limit;
  self.findById = findById;
  self.findByIdAndRemove = findByIdAndRemove;
  self.findByIdAndUpdate = findByIdAndUpdate;


  /*
    Save is bound to the prototype so we can use it when creating a new instance
  */
  self.prototype.save = save;

  /*
    If the endpointConfig has a custom methods object, extend our current methods list
    with the methods that we've passed in. This hasn't been tested very extensively
  */
  if (endpointConfig.methods) {
    endpointConfig.methods._parent = self;
    angular.extend(self, endpointConfig.methods);
  }

  return self;

  /**
    * @desc Indicates the amount of records to return when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function limit(amount) {
    self.req.query.limit = amount;
    return self;
  }

  /**
   * @desc This function will allow us to select specific fields that we want back from the db
   * @memberof OfficeBotSDK.ApiEndpoint
   * @param {string|array} fieldNames
   * @returns {object} self
   */
  function fields(fieldNames) {
    if (Array.isArray(fieldNames)) {
      fieldNames = fieldNames.join(',');
    }
    if ('string' !== typeof fieldNames) {
      fieldNames = '';
    }
    self.req.query.fields = fieldNames;
    return self;
  }
  /**
    * @desc Indicates the amount of records to skip over when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function skip(amount) {
    self.req.query.skip = amount;
    return self;
  }


  function save(callback) {
    var cb = callback || angular.noop;
    /* jshint validthis: true */
    var _this = this;
    //Use .request instead of .post in the super rare case we want to pass in some
    //config object prior to saving. I can't think of any need for this, but I'm
    //including that functionality just in case.
    /**
      * HACK - this only works *just because* and should be fixed to use a model instance
      */
    var method = 'POST'; //if new
    var targetUrl = self.baseUrl;
    if (_this.hasOwnProperty('@href')) {
      // if (_this._temporary !== true) {
      //   method = 'PUT';
      // }
      targetUrl = _this['@href'];
    }

    transport
      .request(targetUrl, method, _this, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        extend(true, _this, data);

        // cache.invalidate(data._id);

        //Signature is: error, *this* instance, full response body (mostly for debugging/sanity check)
        return cb(null, _this, response);
      }, function(err) {
        cb(err);
      });
  }

  /**
    * @desc Sends a query to the api. If a function is passed as the last
    * parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {object} query
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function find(query, config, callback) {
    var req = self.req;
    req.method = 'get';
    req.url = self.baseUrl;
    req.query = {
      search : query
    }
    if ('object' === typeof config) {
      req.config = config;
    } else {
      req.config = {};
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    } else {
      req.config = config;
    }

    if ('function' === typeof cb) {
      return self.exec(cb);
    }
    return self;
  }

  function search(keyword, config, cb) {

    var req = self.req;
    req.method = 'search';
    req.query = { search : {
      'keyword' : keyword
    }};
    req.url = self.baseUrl;
    if ('object' === typeof config) {
      req.config = config;
    } else {
      req.config = {};
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    } else {
      req.config = config;
    }

    if ('function' === typeof cb) {
      return self.exec(cb);
    }
    return self;
  }

  /**
    * @desc Asks the api to return one element. If a function is passed as the
    * last parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findById(id, config, callback) {
    var req = self.req;
    req.method = 'get';
    /* jshint validthis: true */
    req.url = this.baseUrl + '/' + id;
    if ('object' === typeof config) {
      req.config = config;
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    } else {
      req.config = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    }

    // Here, we need to see if this object is already in the cache. If so,
    // fetch it and override our callback stack

    var cachedModel = cache.get(id, _instantiate);
    if (cachedModel) {
      if ('function' === typeof cb) {
        return cb(null, cachedModel)
      } else {
        return {
          exec : function(callback) {
            return $timeout(function() {
              return callback(null, cachedModel);
            },10);
          }
        }
      }

    } else if ('function' === typeof cb) {
      return self.exec(cb);
    } else {
      return self;
    }

  }

  /**
    * @desc Finds an element on the API and removes it using a unique ID. If a
    * function is passed as the last parameter, this method will execute
    * the query and return the results using that callback function.
    * Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndRemove(id, callback) {
    var req = self.req;
    req.method = 'delete';
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;
  }

  /**
    * @desc Finds a single element on the API using a unique id and REPLACES it
    * with the data you provide. This function does not provide atomic updates.
    * If a function is passed as the callback, the query will execute and the
    * error or result from the call will be passed back using the callback. If
    * no function is provided, `this` will be returned for chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} id
    * @param {object} data
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndUpdate(id, data, callback) {
    var req = self.req;
    req.method = 'put';
    req.data = data;
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;

  }

  /**
    * @desc This method will compose the final request, send it over our transport,
    * and return the error or results using the provided callback function.
    * Additionally, the response is wrapped in our custom Model objects to make
    * working with them a lot easier
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {function} callback
    * @returns {promise}
    */
  function exec(cb) {
    var req = self.req;
    return transport
      .request(req.url, req.method, req.data, req.query, req.config)
      .then(function(response) {
        //convert response to models
        var model;
        response = response || {};
        var data = response.data;
        var headers = response.headers;
        if (data) {
          if (Array.isArray(data) ) {
            model = data.map(function(item) {
              // return instantiateModel(item, transport, baseRoute, endpointConfig);
              return _instantiate(item);
            });
          } else {
            model = _instantiate(data);
            // model = instantiateModel(data, transport, baseRoute, endpointConfig);
          }
          data = model;
        }
        return cb(null, data, response, headers);
      }, function(err) {
        err = err || {};
        return cb(err);
      });
  }

  function _instantiate(item) {
    return instantiateModel(item, transport, baseRoute, endpointConfig, cache);
  }
};

},{"./model.js":"/home/scott/Dev/officebot-sdk/sdk-core/model.js","./utils.js":"/home/scott/Dev/officebot-sdk/sdk-core/utils.js","angular":"angular","extend":"/home/scott/Dev/officebot-sdk/node_modules/extend/index.js"}],"/home/scott/Dev/officebot-sdk/sdk-core/api-provider.js":[function(require,module,exports){
/**
	* @name ApiProvider
	* @desc Wires up the api functions and provides a config function
	* @namespace OfficeBotSDK.ApiProvider
	* @memberof OfficeBotSDK
	* @param {provider} $provide
	* @param {provider} $injector
	* @returns null
	*/
module.exports = function ApiProvider($provide, $injector) {
	'use strict';
	'ngInject';

	var Api = require('./api.js')($provide, $injector);
	$provide.provider('api', Api);
};
},{"./api.js":"/home/scott/Dev/officebot-sdk/sdk-core/api.js"}],"/home/scott/Dev/officebot-sdk/sdk-core/api.js":[function(require,module,exports){
var angular = require('angular');
/**
  * @name InstantiateApi
  * @desc Returns Api constructor
  * @namespace OfficeBotSDK.Api
  * @memberof OfficeBotSDK
  * @param {provider} $provide
  * @param {provider} $inject
  * @returns {object} api
  * @requires angular
  */
module.exports = function InstantiateApi($provide, $inject) {
  'ngInject';

  var ApiEndpointConfig = require('./api-endpoint-config.js')($inject);
  var ApiEndpointConstructor = require('./api-endpoint.js');
  /**
    * @constructor
    * @memberof OfficeBotSDK.Api
    */
  function Api() {
    this.endpoints = {};
    return this;
  }

  Api.prototype.setBaseRoute = setBaseRoute;
  Api.prototype.endpoint = endpoint;
  Api.prototype.$get = ['$injector','transport','modelCache','$timeout', get];

  return Api;
  /**
    * @desc Sets the root url for this api
    * @memberof OfficeBotSDK.Api
    * @param {string} baseUrl
    * @returns {object} this
    */
  function setBaseRoute(baseUrl) {
    this.baseRoute = baseUrl;
    return this;
  }

  /**
    * @desc Creates a new endpoint configurations and attaches it to this
    * @memberof OfficeBotSDK.Api
    * @param {string} name The name of the endpoint
    * @returns {object} newEndpoint
    */
  function endpoint(name) {
    var baseRoute = this.baseRoute;
    var newEndpoint = new ApiEndpointConfig();
    this.endpoints[name] = newEndpoint;
    return newEndpoint;
  }

  /**
    * @desc Injector function that angular will use
    * @memberof OfficeBotSDK.Api
    * @param {provider} $injector
    * @param {object} transport
    * @param {object} modelCache
    * @returns {object} api
    */
  function get($injector, transport, modelCache) {
    var api = {};

    var self = this;
    angular.forEach(this.endpoints, function(endpointConfig, name) {
      api[name] = $injector.instantiate(ApiEndpointConstructor, {
        baseRoute: self.baseRoute,
        endpointConfig: endpointConfig,
        transport : transport,
        cache : modelCache
      });
    });

    return api;
  }
};
},{"./api-endpoint-config.js":"/home/scott/Dev/officebot-sdk/sdk-core/api-endpoint-config.js","./api-endpoint.js":"/home/scott/Dev/officebot-sdk/sdk-core/api-endpoint.js","angular":"angular"}],"/home/scott/Dev/officebot-sdk/sdk-core/cache.js":[function(require,module,exports){
module.exports = function modelCacheService() {
	var l = localStorage;

	this.put = put;
	this.get = get;
	this.invalidate = invalidate;

	function put(object, key) {
		var objectId = key || object._id;
		l.setItem(objectId, JSON.stringify(object));
		return objectId;
	}

	function get(objectId, constructor) {
		if (!objectId) {
			return;
		}
		var cachedItem;
		if ('string' === typeof l.getItem(objectId)) {
			try {
				cachedItem = JSON.parse( l.getItem(objectId) );
			} catch(e) {
				invalidate(objectId);
				return null;
			}
		} else {
			return null;
		}

		if ('function' === typeof constructor) {
			return constructor(cachedItem);
		} else {
			return cachedItem;
		}
		
	}

	function invalidate(objectId) {
		if (!objectId) {
			return false;
		}
		return l.removeItem(objectId);
	}
}
},{}],"/home/scott/Dev/officebot-sdk/sdk-core/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'sdk-core';
/**
	* @name sdk-core
	* @desc OfficeBotSDK library
	* @namespace OfficeBotSDK
	* @returns {string} moduleName
	* @requires angular
	*/
angular
	.module(moduleName, [])
	.service('transport', require('./transport.js'))
	.service('modelCache', require('./cache.js'))
	.config(require('./api-provider.js'));

	module.exports = moduleName;
},{"./api-provider.js":"/home/scott/Dev/officebot-sdk/sdk-core/api-provider.js","./cache.js":"/home/scott/Dev/officebot-sdk/sdk-core/cache.js","./transport.js":"/home/scott/Dev/officebot-sdk/sdk-core/transport.js","angular":"angular"}],"/home/scott/Dev/officebot-sdk/sdk-core/model.js":[function(require,module,exports){
var extend = require('extend');
var angular = require('angular');
var hash = require('object-hash');

/**
	* @name InstantiateModel
	* @desc Returns a new instance of a Model object
	* @namespace Model
	* @memberof OfficeBotSDK
	* @param {object} data Modal properties to instantiate with
	* @returns {object} model
	* @requires extend
	* @requires angular
	*/ 
module.exports = function InstantiateModel(data, transport, baseRoute, endpointConfig, modelCache) {
	'use strict';
	'ngInject';

	/**
		* @desc This is our constructor function that gets called at the end of this file.
		* @memberof OfficeBotSDK.Model
		* @param {object} data
		* @returns {object}
		*/
	var Model = function(data) {
		extend(true, this, data);
		this['@hash'] = hash(angular.toJson(this));
		return this;
	};

	/**
		* @desc Saves the current model's representation to the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.save = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

	  delete model['@hash'];
		var tmp = JSON.parse( angular.toJson(model) );
		var method = 'put';
		var href = tmp['@href'];

	  transport
		  .request(href, method, tmp, {}, {})
	    .then(function(response) {
	      if (response && response.data) {
	      	extend(true, model, response.data);
	      	model['@hash'] = hash(angular.toJson(model));
	      }
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};

	/**
		* @desc Does a simple dirty check by calculating a new hash and comparing it to
		* the original
		*/
	Model.prototype.isDirty = function() {
		var currentHash = this['@hash'];
		var currentModel = JSON.parse( JSON.stringify(this) );
		delete currentModel['@hash'];
		var newHash = hash(angular.toJson(currentModel));
		return newHash !== currentHash;
	};

	/**
		* @desc Removes this model from the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.remove = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

	  return transport
	  	.delete( model['@href'] )
	    .then(function(response) {
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};
	
	//Finally, send the new model back
	var newModel = new Model(data);
	if ('function' === typeof endpointConfig._classDef) {
    var modelInstance = new endpointConfig._classDef(newModel);
    for (var i in newModel) {
    	if ('function' === typeof newModel[i]) {
    		modelInstance[i] = newModel[i];
    	}
    }
    return modelInstance;
	}
	return newModel;
};
},{"angular":"angular","extend":"/home/scott/Dev/officebot-sdk/node_modules/extend/index.js","object-hash":"/home/scott/Dev/officebot-sdk/node_modules/object-hash/dist/object_hash.js"}],"/home/scott/Dev/officebot-sdk/sdk-core/transport.js":[function(require,module,exports){
/**
	* @name httpTransport
	* @desc Abstraction layer for our connections inside of the api provider.
	* This will allow us to easily replace this down the line with something
	* else (like sockets) if we decide to
	* @memberof OfficeBotSDK
	* @namespace OffieBotSDK.Transport
	* @param {provider} $http
	* @returns {object}
	*/
module.exports = function httpTransport($http) {
	'use strict';
	'ngInject';

	var self = {};
	self.request = request;
	self.get = get;
	self.post = post;
	self.put = put;
	self.delete = remove;
	self.patch = patch;
	self.head = head;
	self.options = options;
	
	return self;

	/**
		* @desc This method bundles everything up into an $http request
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {string} method
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function request(url, method, data, query, headers) {
		return $http({
			url : url,
			method : method.toUpperCase(),
			data : data,
			params : query,
			headers : headers
		});
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function get(url, query, headers) {
		return request(url, 'GET', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function post(url, data, query, headers) {
		return request(url, 'POST', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PUT', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function put(url, data, query, headers) {
		return request(url, 'PUT', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'DELETE', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function remove(url, query, headers) {
		return request(url, 'DELETE', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'HEAD', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function head(url, headers) {
		return request(url, 'HEAD', {}, {}, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PATCH', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function patch(url, data, query, headers) {
		return request(url, 'PATCH', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'OPTIONS', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function options(url, headers) {
		return request(url, 'OPTIONS', {}, {}, headers);
	}
};
},{}],"/home/scott/Dev/officebot-sdk/sdk-core/utils.js":[function(require,module,exports){
/**
	* @name utils
	* @desc Utils library
	* @returns {object} self
	* @namespace OfficeBotSDK.Utils
	* @memberof OfficeBotSDK
	*/
module.exports = function utils() {
	var self = {};
	self.remove = remove;

	return self;

	/**
	  * @private
	  * @desc Helper function to nullify objects after .remove is called
	  * @param {object} item Thing to be removed
	  * @returns {boolean} status
	  * @memberof OfficeBotSDK.Utils
	  */
	function remove(item) {
	  for (var i in item) {
	    item[i] = undefined;
	    delete item[i];
	  }
	  item = undefined;
	  delete item;
	  return true;
	}
};
},{}]},{},["/home/scott/Dev/officebot-sdk/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsInNkay1jb3JlL2FwaS1lbmRwb2ludC1jb25maWcuanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQuanMiLCJzZGstY29yZS9hcGktcHJvdmlkZXIuanMiLCJzZGstY29yZS9hcGkuanMiLCJzZGstY29yZS9jYWNoZS5qcyIsInNkay1jb3JlL2luZGV4LmpzIiwic2RrLWNvcmUvbW9kZWwuanMiLCJzZGstY29yZS90cmFuc3BvcnQuanMiLCJzZGstY29yZS91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RGQTtBQUNBOzs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnb2ZmaWNlYm90LXNkayc7XG5cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXG5cdFx0cmVxdWlyZSgnLi9zZGstY29yZScpXG5cdF0pXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7IC8qKi8gfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lO1xuXHR2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXHR2YXIgaSA9IDE7XG5cdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR2YXIgZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fVxuXHRpZiAodGFyZ2V0ID09IG51bGwgfHwgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcbiIsIiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKGUpO2Vsc2V7dmFyIHQ7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz90PXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP3Q9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYodD1zZWxmKSx0Lm9iamVjdEhhc2g9ZSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gbyh1LGEpe2lmKCFuW3VdKXtpZighdFt1XSl7dmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighYSYmZilyZXR1cm4gZih1LCEwKTtpZihpKXJldHVybiBpKHUsITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdStcIidcIil9dmFyIHM9blt1XT17ZXhwb3J0czp7fX07dFt1XVswXS5jYWxsKHMuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W3VdWzFdW2VdO3JldHVybiBvKG4/bjplKX0scyxzLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bdV0uZXhwb3J0c31mb3IodmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSx1PTA7dTxyLmxlbmd0aDt1KyspbyhyW3VdKTtyZXR1cm4gb30oezE6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24ocixvLGksdSxhLGYscyxjLGwpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoZSx0KXtyZXR1cm4gdD1oKGUsdCksZyhlLHQpfWZ1bmN0aW9uIGgoZSx0KXtpZih0PXR8fHt9LHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtfHxcInNoYTFcIix0LmVuY29kaW5nPXQuZW5jb2Rpbmd8fFwiaGV4XCIsdC5leGNsdWRlVmFsdWVzPSEhdC5leGNsdWRlVmFsdWVzLHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCksdC5lbmNvZGluZz10LmVuY29kaW5nLnRvTG93ZXJDYXNlKCksdC5pZ25vcmVVbmtub3duPXQuaWdub3JlVW5rbm93bj09PSEwLHQucmVzcGVjdFR5cGU9dC5yZXNwZWN0VHlwZSE9PSExLHQucmVzcGVjdEZ1bmN0aW9uTmFtZXM9dC5yZXNwZWN0RnVuY3Rpb25OYW1lcyE9PSExLHQucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcz10LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMhPT0hMSx0LnVub3JkZXJlZEFycmF5cz10LnVub3JkZXJlZEFycmF5cz09PSEwLHQudW5vcmRlcmVkU2V0cz10LnVub3JkZXJlZFNldHMhPT0hMSx0LnJlcGxhY2VyPXQucmVwbGFjZXJ8fHZvaWQgMCxcInVuZGVmaW5lZFwiPT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYXJndW1lbnQgcmVxdWlyZWQuXCIpO2Zvcih2YXIgbj0wO248di5sZW5ndGg7KytuKXZbbl0udG9Mb3dlckNhc2UoKT09PXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCkmJih0LmFsZ29yaXRobT12W25dKTtpZih2LmluZGV4T2YodC5hbGdvcml0aG0pPT09LTEpdGhyb3cgbmV3IEVycm9yKCdBbGdvcml0aG0gXCInK3QuYWxnb3JpdGhtKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyt2LmpvaW4oXCIsIFwiKSk7aWYobS5pbmRleE9mKHQuZW5jb2RpbmcpPT09LTEmJlwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtKXRocm93IG5ldyBFcnJvcignRW5jb2RpbmcgXCInK3QuZW5jb2RpbmcrJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK20uam9pbihcIiwgXCIpKTtyZXR1cm4gdH1mdW5jdGlvbiBwKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpcmV0dXJuITE7dmFyIHQ9L15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pO3JldHVybiBudWxsIT10LmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpfWZ1bmN0aW9uIGcoZSx0KXt2YXIgbjtuPVwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtP2IuY3JlYXRlSGFzaCh0LmFsZ29yaXRobSk6bmV3IHcsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4ud3JpdGUmJihuLndyaXRlPW4udXBkYXRlLG4uZW5kPW4udXBkYXRlKTt2YXIgcj15KHQsbik7aWYoci5kaXNwYXRjaChlKSxuLnVwZGF0ZXx8bi5lbmQoXCJcIiksbi5kaWdlc3QpcmV0dXJuIG4uZGlnZXN0KFwiYnVmZmVyXCI9PT10LmVuY29kaW5nP3ZvaWQgMDp0LmVuY29kaW5nKTt2YXIgbz1uLnJlYWQoKTtyZXR1cm5cImJ1ZmZlclwiPT09dC5lbmNvZGluZz9vOm8udG9TdHJpbmcodC5lbmNvZGluZyl9ZnVuY3Rpb24geShlLHQsbil7bj1ufHxbXTt2YXIgcj1mdW5jdGlvbihlKXtyZXR1cm4gdC51cGRhdGU/dC51cGRhdGUoZSxcInV0ZjhcIik6dC53cml0ZShlLFwidXRmOFwiKX07cmV0dXJue2Rpc3BhdGNoOmZ1bmN0aW9uKHQpe2UucmVwbGFjZXImJih0PWUucmVwbGFjZXIodCkpO3ZhciBuPXR5cGVvZiB0O3JldHVybiBudWxsPT09dCYmKG49XCJudWxsXCIpLHRoaXNbXCJfXCIrbl0odCl9LF9vYmplY3Q6ZnVuY3Rpb24odCl7dmFyIG89L1xcW29iamVjdCAoLiopXFxdL2ksdT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCksYT1vLmV4ZWModSk7YT1hP2FbMV06XCJ1bmtub3duOltcIit1K1wiXVwiLGE9YS50b0xvd2VyQ2FzZSgpO3ZhciBmPW51bGw7aWYoKGY9bi5pbmRleE9mKHQpKT49MClyZXR1cm4gdGhpcy5kaXNwYXRjaChcIltDSVJDVUxBUjpcIitmK1wiXVwiKTtpZihuLnB1c2godCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkmJmkuaXNCdWZmZXImJmkuaXNCdWZmZXIodCkpcmV0dXJuIHIoXCJidWZmZXI6XCIpLHIodCk7aWYoXCJvYmplY3RcIj09PWF8fFwiZnVuY3Rpb25cIj09PWEpe3ZhciBzPU9iamVjdC5rZXlzKHQpLnNvcnQoKTtlLnJlc3BlY3RUeXBlPT09ITF8fHAodCl8fHMuc3BsaWNlKDAsMCxcInByb3RvdHlwZVwiLFwiX19wcm90b19fXCIsXCJjb25zdHJ1Y3RvclwiKSxyKFwib2JqZWN0OlwiK3MubGVuZ3RoK1wiOlwiKTt2YXIgYz10aGlzO3JldHVybiBzLmZvckVhY2goZnVuY3Rpb24obil7Yy5kaXNwYXRjaChuKSxyKFwiOlwiKSxlLmV4Y2x1ZGVWYWx1ZXN8fGMuZGlzcGF0Y2godFtuXSkscihcIixcIil9KX1pZighdGhpc1tcIl9cIithXSl7aWYoZS5pZ25vcmVVbmtub3duKXJldHVybiByKFwiW1wiK2ErXCJdXCIpO3Rocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicrYSsnXCInKX10aGlzW1wiX1wiK2FdKHQpfSxfYXJyYXk6ZnVuY3Rpb24odCxvKXtvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBvP286ZS51bm9yZGVyZWRBcnJheXMhPT0hMTt2YXIgaT10aGlzO2lmKHIoXCJhcnJheTpcIit0Lmxlbmd0aCtcIjpcIiksIW98fHQubGVuZ3RoPD0xKXJldHVybiB0LmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGkuZGlzcGF0Y2goZSl9KTt2YXIgdT1bXSxhPXQubWFwKGZ1bmN0aW9uKHQpe3ZhciByPW5ldyB3LG89bi5zbGljZSgpLGk9eShlLHIsbyk7cmV0dXJuIGkuZGlzcGF0Y2godCksdT11LmNvbmNhdChvLnNsaWNlKG4ubGVuZ3RoKSksci5yZWFkKCkudG9TdHJpbmcoKX0pO3JldHVybiBuPW4uY29uY2F0KHUpLGEuc29ydCgpLHRoaXMuX2FycmF5KGEsITEpfSxfZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImRhdGU6XCIrZS50b0pTT04oKSl9LF9zeW1ib2w6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJzeW1ib2w6XCIrZS50b1N0cmluZygpKX0sX2Vycm9yOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZXJyb3I6XCIrZS50b1N0cmluZygpKX0sX2Jvb2xlYW46ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJib29sOlwiK2UudG9TdHJpbmcoKSl9LF9zdHJpbmc6ZnVuY3Rpb24oZSl7cihcInN0cmluZzpcIitlLmxlbmd0aCtcIjpcIikscihlKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKHQpe3IoXCJmbjpcIikscCh0KT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaCh0LnRvU3RyaW5nKCkpLGUucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKHQubmFtZSkpLGUucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KHQpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiByKFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVybDpcIitlLnRvU3RyaW5nKCksXCJ1dGY4XCIpfSxfbWFwOmZ1bmN0aW9uKHQpe3IoXCJtYXA6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfc2V0OmZ1bmN0aW9uKHQpe3IoXCJzZXQ6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfYmxvYjpmdW5jdGlvbigpe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRvbXdpbmRvd1wiKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiByKFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiByKFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiByKFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIHcoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fXZhciBiPWUoXCJjcnlwdG9cIik7bj10LmV4cG9ydHM9ZCxuLnNoYTE9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4ua2V5cz1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHtleGNsdWRlVmFsdWVzOiEwLGFsZ29yaXRobTpcInNoYTFcIixlbmNvZGluZzpcImhleFwifSl9LG4uTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbi5rZXlzTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCIsZXhjbHVkZVZhbHVlczohMH0pfTt2YXIgdj1iLmdldEhhc2hlcz9iLmdldEhhc2hlcygpLnNsaWNlKCk6W1wic2hhMVwiLFwibWQ1XCJdO3YucHVzaChcInBhc3N0aHJvdWdoXCIpO3ZhciBtPVtcImJ1ZmZlclwiLFwiaGV4XCIsXCJiaW5hcnlcIixcImJhc2U2NFwiXTtuLndyaXRlVG9TdHJlYW09ZnVuY3Rpb24oZSx0LG4pe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBuJiYobj10LHQ9e30pLHQ9aChlLHQpLHkodCxuKS5kaXNwYXRjaChlKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzhjM2FkYzc4LmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjEwfV0sMjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7dmFyIGM9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApO3JldHVybiB0PT09aXx8dD09PWw/NjI6dD09PXV8fHQ9PT1kPzYzOnQ8YT8tMTp0PGErMTA/dC1hKzI2KzI2OnQ8cysyNj90LXM6dDxmKzI2P3QtZisyNjp2b2lkIDB9ZnVuY3Rpb24gbihlKXtmdW5jdGlvbiBuKGUpe3NbbCsrXT1lfXZhciByLGksdSxhLGYscztpZihlLmxlbmd0aCU0PjApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgYz1lLmxlbmd0aDtmPVwiPVwiPT09ZS5jaGFyQXQoYy0yKT8yOlwiPVwiPT09ZS5jaGFyQXQoYy0xKT8xOjAscz1uZXcgbygzKmUubGVuZ3RoLzQtZiksdT1mPjA/ZS5sZW5ndGgtNDplLmxlbmd0aDt2YXIgbD0wO2ZvcihyPTAsaT0wO3I8dTtyKz00LGkrPTMpYT10KGUuY2hhckF0KHIpKTw8MTh8dChlLmNoYXJBdChyKzEpKTw8MTJ8dChlLmNoYXJBdChyKzIpKTw8Nnx0KGUuY2hhckF0KHIrMykpLG4oKDE2NzExNjgwJmEpPj4xNiksbigoNjUyODAmYSk+PjgpLG4oMjU1JmEpO3JldHVybiAyPT09Zj8oYT10KGUuY2hhckF0KHIpKTw8Mnx0KGUuY2hhckF0KHIrMSkpPj40LG4oMjU1JmEpKToxPT09ZiYmKGE9dChlLmNoYXJBdChyKSk8PDEwfHQoZS5jaGFyQXQocisxKSk8PDR8dChlLmNoYXJBdChyKzIpKT4+MixuKGE+PjgmMjU1KSxuKDI1NSZhKSksc31mdW5jdGlvbiByKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuIGMuY2hhckF0KGUpfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIHQoZT4+MTgmNjMpK3QoZT4+MTImNjMpK3QoZT4+NiY2MykrdCg2MyZlKX12YXIgcixvLGksdT1lLmxlbmd0aCUzLGE9XCJcIjtmb3Iocj0wLGk9ZS5sZW5ndGgtdTtyPGk7cis9MylvPShlW3JdPDwxNikrKGVbcisxXTw8OCkrZVtyKzJdLGErPW4obyk7c3dpdGNoKHUpe2Nhc2UgMTpvPWVbZS5sZW5ndGgtMV0sYSs9dChvPj4yKSxhKz10KG88PDQmNjMpLGErPVwiPT1cIjticmVhaztjYXNlIDI6bz0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSxhKz10KG8+PjEwKSxhKz10KG8+PjQmNjMpLGErPXQobzw8MiY2MyksYSs9XCI9XCJ9cmV0dXJuIGF9dmFyIG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSxpPVwiK1wiLmNoYXJDb2RlQXQoMCksdT1cIi9cIi5jaGFyQ29kZUF0KDApLGE9XCIwXCIuY2hhckNvZGVBdCgwKSxmPVwiYVwiLmNoYXJDb2RlQXQoMCkscz1cIkFcIi5jaGFyQ29kZUF0KDApLGw9XCItXCIuY2hhckNvZGVBdCgwKSxkPVwiX1wiLmNoYXJDb2RlQXQoMCk7ZS50b0J5dGVBcnJheT1uLGUuZnJvbUJ5dGVBcnJheT1yfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygbj90aGlzLmJhc2U2NGpzPXt9Om4pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMzpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbih0LHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbyhlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgbykpcmV0dXJuIG5ldyBvKGUsdCxuKTt2YXIgcj10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09PXIpZm9yKGU9TihlKTtlLmxlbmd0aCU0IT09MDspZSs9XCI9XCI7dmFyIGk7aWYoXCJudW1iZXJcIj09PXIpaT1GKGUpO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpaT1vLmJ5dGVMZW5ndGgoZSx0KTtlbHNle2lmKFwib2JqZWN0XCIhPT1yKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO2k9RihlLmxlbmd0aCl9dmFyIHU7by5fdXNlVHlwZWRBcnJheXM/dT1vLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGkpKToodT10aGlzLHUubGVuZ3RoPWksdS5faXNCdWZmZXI9ITApO3ZhciBhO2lmKG8uX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKXUuX3NldChlKTtlbHNlIGlmKE8oZSkpZm9yKGE9MDthPGk7YSsrKW8uaXNCdWZmZXIoZSk/dVthXT1lLnJlYWRVSW50OChhKTp1W2FdPWVbYV07ZWxzZSBpZihcInN0cmluZ1wiPT09cil1LndyaXRlKGUsMCx0KTtlbHNlIGlmKFwibnVtYmVyXCI9PT1yJiYhby5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihhPTA7YTxpO2ErKyl1W2FdPTA7cmV0dXJuIHV9ZnVuY3Rpb24gbChlLHQsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgaT1lLmxlbmd0aC1uO3I/KHI9TnVtYmVyKHIpLHI+aSYmKHI9aSkpOnI9aTt2YXIgdT10Lmxlbmd0aDtHKHUlMj09PTAsXCJJbnZhbGlkIGhleCBzdHJpbmdcIikscj51LzImJihyPXUvMik7Zm9yKHZhciBhPTA7YTxyO2ErKyl7dmFyIGY9cGFyc2VJbnQodC5zdWJzdHIoMiphLDIpLDE2KTtHKCFpc05hTihmKSxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxlW24rYV09Zn1yZXR1cm4gby5fY2hhcnNXcml0dGVuPTIqYSxhfWZ1bmN0aW9uIGQoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoVih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gaChlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhxKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiBwKGUsdCxuLHIpe3JldHVybiBoKGUsdCxuLHIpfWZ1bmN0aW9uIGcoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24geShlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhQKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiB3KGUsdCxuKXtyZXR1cm4gMD09PXQmJm49PT1lLmxlbmd0aD9LLmZyb21CeXRlQXJyYXkoZSk6Sy5mcm9tQnl0ZUFycmF5KGUuc2xpY2UodCxuKSl9ZnVuY3Rpb24gYihlLHQsbil7dmFyIHI9XCJcIixvPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIGk9dDtpPG47aSsrKWVbaV08PTEyNz8ocis9SihvKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbaV0pLG89XCJcIik6bys9XCIlXCIrZVtpXS50b1N0cmluZygxNik7cmV0dXJuIHIrSihvKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIG0oZSx0LG4pe3JldHVybiB2KGUsdCxuKX1mdW5jdGlvbiBfKGUsdCxuKXt2YXIgcj1lLmxlbmd0aDsoIXR8fHQ8MCkmJih0PTApLCghbnx8bjwwfHxuPnIpJiYobj1yKTtmb3IodmFyIG89XCJcIixpPXQ7aTxuO2krKylvKz1IKGVbaV0pO3JldHVybiBvfWZ1bmN0aW9uIEUoZSx0LG4pe2Zvcih2YXIgcj1lLnNsaWNlKHQsbiksbz1cIlwiLGk9MDtpPHIubGVuZ3RoO2krPTIpbys9U3RyaW5nLmZyb21DaGFyQ29kZShyW2ldKzI1NipyW2krMV0pO3JldHVybiBvfWZ1bmN0aW9uIEkoZSx0LG4scil7cnx8KEcoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksRyh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk7cmV0dXJuIG4/KGk9ZVt0XSx0KzE8byYmKGl8PWVbdCsxXTw8OCkpOihpPWVbdF08PDgsdCsxPG8mJihpfD1lW3QrMV0pKSxpfX1mdW5jdGlvbiBBKGUsdCxuLHIpe3J8fChHKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyh0KzI8byYmKGk9ZVt0KzJdPDwxNiksdCsxPG8mJihpfD1lW3QrMV08PDgpLGl8PWVbdF0sdCszPG8mJihpKz1lW3QrM108PDI0Pj4+MCkpOih0KzE8byYmKGk9ZVt0KzFdPDwxNiksdCsyPG8mJihpfD1lW3QrMl08PDgpLHQrMzxvJiYoaXw9ZVt0KzNdKSxpKz1lW3RdPDwyND4+PjApLGl9fWZ1bmN0aW9uIEIoZSx0LG4scil7cnx8KEcoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksRyh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9SShlLHQsbiwhMCksdT0zMjc2OCZpO3JldHVybiB1Pyg2NTUzNS1pKzEpKi0xOml9fWZ1bmN0aW9uIEwoZSx0LG4scil7cnx8KEcoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksRyh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9QShlLHQsbiwhMCksdT0yMTQ3NDgzNjQ4Jmk7cmV0dXJuIHU/KDQyOTQ5NjcyOTUtaSsxKSotMTppfX1mdW5jdGlvbiBVKGUsdCxuLHIpe3JldHVybiByfHwoRyhcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiwyMyw0KX1mdW5jdGlvbiB4KGUsdCxuLHIpe3JldHVybiByfHwoRyhcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodCs3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiw1Miw4KX1mdW5jdGlvbiBTKGUsdCxuLHIsbyl7b3x8KEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLEcoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksRyhuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDY1NTM1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShuPj1pKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiwyKTt1PGE7dSsrKWVbbit1XT0odCYyNTU8PDgqKHI/dToxLXUpKT4+PjgqKHI/dToxLXUpfWZ1bmN0aW9uIEMoZSx0LG4scixvKXtvfHwoRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksRyhcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSxHKG4rMzxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KHQsNDI5NDk2NzI5NSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sNCk7dTxhO3UrKyllW24rdV09dD4+PjgqKHI/dTozLXUpJjI1NX1mdW5jdGlvbiBqKGUsdCxuLHIsbyl7b3x8KEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLEcoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksRyhuKzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWCh0LDMyNzY3LC0zMjc2OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP1MoZSx0LG4scixvKTpTKGUsNjU1MzUrdCsxLG4scixvKSl9ZnVuY3Rpb24gayhlLHQsbixyLG8pe298fChHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSxHKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLEcobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8KHQ+PTA/QyhlLHQsbixyLG8pOkMoZSw0Mjk0OTY3Mjk1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIFQoZSx0LG4scixvKXtvfHwoRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksRyhcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSxHKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSwkKHQsMy40MDI4MjM0NjYzODUyODg2ZTM4LC0zLjQwMjgyMzQ2NjM4NTI4ODZlMzgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHxRLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24gTShlLHQsbixyLG8pe298fChHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSxHKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLEcobis3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLCQodCwxLjc5NzY5MzEzNDg2MjMxNTdlMzA4LC0xLjc5NzY5MzEzNDg2MjMxNTdlMzA4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDUyLDgpfWZ1bmN0aW9uIE4oZSl7cmV0dXJuIGUudHJpbT9lLnRyaW0oKTplLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9ZnVuY3Rpb24gWShlLHQsbil7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGU/bjooZT1+fmUsZT49dD90OmU+PTA/ZTooZSs9dCxlPj0wP2U6MCkpfWZ1bmN0aW9uIEYoZSl7cmV0dXJuIGU9fn5NYXRoLmNlaWwoK2UpLGU8MD8wOmV9ZnVuY3Rpb24gRChlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gTyhlKXtyZXR1cm4gRChlKXx8by5pc0J1ZmZlcihlKXx8ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aH1mdW5jdGlvbiBIKGUpe3JldHVybiBlPDE2P1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfWZ1bmN0aW9uIFYoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8PTEyNyl0LnB1c2goZS5jaGFyQ29kZUF0KG4pKTtlbHNle3ZhciBvPW47cj49NTUyOTYmJnI8PTU3MzQzJiZuKys7Zm9yKHZhciBpPWVuY29kZVVSSUNvbXBvbmVudChlLnNsaWNlKG8sbisxKSkuc3Vic3RyKDEpLnNwbGl0KFwiJVwiKSx1PTA7dTxpLmxlbmd0aDt1KyspdC5wdXNoKHBhcnNlSW50KGlbdV0sMTYpKX19cmV0dXJuIHR9ZnVuY3Rpb24gcShlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gdH1mdW5jdGlvbiBQKGUpe2Zvcih2YXIgdCxuLHIsbz1bXSxpPTA7aTxlLmxlbmd0aDtpKyspdD1lLmNoYXJDb2RlQXQoaSksbj10Pj44LHI9dCUyNTYsby5wdXNoKHIpLG8ucHVzaChuKTtyZXR1cm4gb31mdW5jdGlvbiBSKGUpe3JldHVybiBLLnRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIFcoZSx0LG4scil7Zm9yKHZhciBvPTA7bzxyJiYhKG8rbj49dC5sZW5ndGh8fG8+PWUubGVuZ3RoKTtvKyspdFtvK25dPWVbb107cmV0dXJuIG99ZnVuY3Rpb24gSihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKX1jYXRjaCh0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTUzMyl9fWZ1bmN0aW9uIHooZSx0KXtHKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxHKGU+PTAsXCJzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZVwiKSxHKGU8PXQsXCJ2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlXCIpLEcoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiBYKGUsdCxuKXtHKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxHKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksRyhlPj1uLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKSxHKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gJChlLHQsbil7RyhcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksRyhlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLEcoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIil9ZnVuY3Rpb24gRyhlLHQpe2lmKCFlKXRocm93IG5ldyBFcnJvcih0fHxcIkZhaWxlZCBhc3NlcnRpb25cIil9dmFyIEs9ZShcImJhc2U2NC1qc1wiKSxRPWUoXCJpZWVlNzU0XCIpO24uQnVmZmVyPW8sbi5TbG93QnVmZmVyPW8sbi5JTlNQRUNUX01BWF9CWVRFUz01MCxvLnBvb2xTaXplPTgxOTIsby5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2gobil7cmV0dXJuITF9fSgpLG8uaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LG8uaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT09ZXx8dm9pZCAwPT09ZXx8IWUuX2lzQnVmZmVyKX0sby5ieXRlTGVuZ3RoPWZ1bmN0aW9uKGUsdCl7dmFyIG47c3dpdGNoKGUrPVwiXCIsdHx8XCJ1dGY4XCIpe2Nhc2VcImhleFwiOm49ZS5sZW5ndGgvMjticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpuPVYoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwicmF3XCI6bj1lLmxlbmd0aDticmVhaztjYXNlXCJiYXNlNjRcIjpuPVIoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm49MiplLmxlbmd0aDticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG59LG8uY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoRyhEKGUpLFwiVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG5saXN0IHNob3VsZCBiZSBhbiBBcnJheS5cIiksMD09PWUubGVuZ3RoKXJldHVybiBuZXcgbygwKTtpZigxPT09ZS5sZW5ndGgpcmV0dXJuIGVbMF07dmFyIG47aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpZm9yKHQ9MCxuPTA7bjxlLmxlbmd0aDtuKyspdCs9ZVtuXS5sZW5ndGg7dmFyIHI9bmV3IG8odCksaT0wO2ZvcihuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciB1PWVbbl07dS5jb3B5KHIsaSksaSs9dS5sZW5ndGh9cmV0dXJuIHJ9LG8ucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lmKGlzRmluaXRlKHQpKWlzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTtlbHNle3ZhciBvPXI7cj10LHQ9bixuPW99dD1OdW1iZXIodCl8fDA7dmFyIGk9dGhpcy5sZW5ndGgtdDtuPyhuPU51bWJlcihuKSxuPmkmJihuPWkpKTpuPWkscj1TdHJpbmcocnx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCk7dmFyIHU7c3dpdGNoKHIpe2Nhc2VcImhleFwiOnU9bCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjp1PWQodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjp1PWgodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6dT1wKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOnU9Zyh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjp1PXkodGhpcyxlLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiB1fSxvLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCxuPXZvaWQgMCE9PW4/TnVtYmVyKG4pOm49ci5sZW5ndGgsbj09PXQpcmV0dXJuXCJcIjt2YXIgbztzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6bz1fKHIsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpvPWIocix0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6bz12KHIsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjpvPW0ocix0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm89dyhyLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bz1FKHIsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG99LG8ucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxvLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXRoaXM7aWYobnx8KG49MCkscnx8MD09PXJ8fChyPXRoaXMubGVuZ3RoKSx0fHwodD0wKSxyIT09biYmMCE9PWUubGVuZ3RoJiYwIT09aS5sZW5ndGgpe0cocj49bixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLEcodD49MCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksRyhuPj0wJiZuPGkubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxHKHI+PTAmJnI8PWkubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpLGUubGVuZ3RoLXQ8ci1uJiYocj1lLmxlbmd0aC10K24pO3ZhciB1PXItbjtpZih1PDEwMHx8IW8uX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgYT0wO2E8dTthKyspZVthK3RdPXRoaXNbYStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbit1KSx0KX19LG8ucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1ZKGUsbiwwKSx0PVkodCxuLG4pLG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBvLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxpPW5ldyBvKHIsKHZvaWQgMCksKCEwKSksdT0wO3U8cjt1KyspaVt1XT10aGlzW3UrZV07cmV0dXJuIGl9LG8ucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gY29uc29sZS5sb2coXCIuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy5yZWFkVUludDgoZSl9LG8ucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3JldHVybiBjb25zb2xlLmxvZyhcIi5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLndyaXRlVUludDgoZSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KEcodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSxHKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIHRoaXNbZV19LG8ucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoRyh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSl7dmFyIG49MTI4JnRoaXNbZV07cmV0dXJuIG4/KDI1NS10aGlzW2VdKzEpKi0xOnRoaXNbZV19fSxvLnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBCKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdEJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiB4KHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUud3JpdGVVSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KEcodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSxHKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseihlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoRyh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3NpbmcgdmFsdWVcIiksRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcodDx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKGUsMTI3LC0xMjgpKSx0Pj10aGlzLmxlbmd0aHx8KGU+PTA/dGhpcy53cml0ZVVJbnQ4KGUsdCxuKTp0aGlzLndyaXRlVUludDgoMjU1K2UrMSx0LG4pKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe2oodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtrKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQsbil7VCh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVMRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQsbil7aWYoZXx8KGU9MCksdHx8KHQ9MCksbnx8KG49dGhpcy5sZW5ndGgpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1lLmNoYXJDb2RlQXQoMCkpLEcoXCJudW1iZXJcIj09dHlwZW9mIGUmJiFpc05hTihlKSxcInZhbHVlIGlzIG5vdCBhIG51bWJlclwiKSxHKG4+PXQsXCJlbmQgPCBzdGFydFwiKSxuIT09dCYmMCE9PXRoaXMubGVuZ3RoKXtHKHQ+PTAmJnQ8dGhpcy5sZW5ndGgsXCJzdGFydCBvdXQgb2YgYm91bmRzXCIpLEcobj49MCYmbjw9dGhpcy5sZW5ndGgsXCJlbmQgb3V0IG9mIGJvdW5kc1wiKTtmb3IodmFyIHI9dDtyPG47cisrKXRoaXNbcl09ZX19LG8ucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD10aGlzLmxlbmd0aCxyPTA7cjx0O3IrKylpZihlW3JdPUgodGhpc1tyXSkscj09PW4uSU5TUEVDVF9NQVhfQllURVMpe2VbcisxXT1cIi4uLlwiO2JyZWFrfXJldHVyblwiPEJ1ZmZlciBcIitlLmpvaW4oXCIgXCIpK1wiPlwifSxvLnByb3RvdHlwZS50b0FycmF5QnVmZmVyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkpe2lmKG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgbyh0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpfTt2YXIgWj1vLnByb3RvdHlwZTtvLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PVouZ2V0LGUuc2V0PVouc2V0LGUud3JpdGU9Wi53cml0ZSxlLnRvU3RyaW5nPVoudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz1aLnRvU3RyaW5nLGUudG9KU09OPVoudG9KU09OLGUuY29weT1aLmNvcHksZS5zbGljZT1aLnNsaWNlLGUucmVhZFVJbnQ4PVoucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPVoucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPVoucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPVoucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPVoucmVhZFVJbnQzMkJFLGUucmVhZEludDg9Wi5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPVoucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT1aLnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9Wi5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPVoucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT1aLnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9Wi5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT1aLnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT1aLnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9Wi53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT1aLndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPVoud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9Wi53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT1aLndyaXRlVUludDMyQkUsZS53cml0ZUludDg9Wi53cml0ZUludDgsZS53cml0ZUludDE2TEU9Wi53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9Wi53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9Wi53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9Wi53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9Wi53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9Wi53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPVoud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9Wi53cml0ZURvdWJsZUJFLGUuZmlsbD1aLmZpbGwsZS5pbnNwZWN0PVouaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9Wi50b0FycmF5QnVmZmVyLGV9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTEsbFlwb0kyOjEwfV0sNDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2lmKGUubGVuZ3RoJXAhPT0wKXt2YXIgbj1lLmxlbmd0aCsocC1lLmxlbmd0aCVwKTtlPW8uY29uY2F0KFtlLGddLG4pfWZvcih2YXIgcj1bXSxpPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrPXApci5wdXNoKGkuY2FsbChlLHUpKTtyZXR1cm4gcn1mdW5jdGlvbiBkKGUsdCxuKXtmb3IodmFyIHI9bmV3IG8odCksaT1uP3Iud3JpdGVJbnQzMkJFOnIud3JpdGVJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrKylpLmNhbGwocixlW3VdLDQqdSwhMCk7cmV0dXJuIHJ9ZnVuY3Rpb24gaChlLHQsbixyKXtvLmlzQnVmZmVyKGUpfHwoZT1uZXcgbyhlKSk7dmFyIGk9dChsKGUsciksZS5sZW5ndGgqeSk7cmV0dXJuIGQoaSxuLHIpfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLHA9NCxnPW5ldyBvKHApO2cuZmlsbCgwKTt2YXIgeT04O3QuZXhwb3J0cz17aGFzaDpofX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDU6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0LG4pe28uaXNCdWZmZXIodCl8fCh0PW5ldyBvKHQpKSxvLmlzQnVmZmVyKG4pfHwobj1uZXcgbyhuKSksdC5sZW5ndGg+bT90PWUodCk6dC5sZW5ndGg8bSYmKHQ9by5jb25jYXQoW3QsX10sbSkpO2Zvcih2YXIgcj1uZXcgbyhtKSxpPW5ldyBvKG0pLHU9MDt1PG07dSsrKXJbdV09NTRedFt1XSxpW3VdPTkyXnRbdV07dmFyIGE9ZShvLmNvbmNhdChbcixuXSkpO3JldHVybiBlKG8uY29uY2F0KFtpLGFdKSl9ZnVuY3Rpb24gZChlLHQpe2U9ZXx8XCJzaGExXCI7dmFyIG49dltlXSxyPVtdLGk9MDtyZXR1cm4gbnx8aChcImFsZ29yaXRobTpcIixlLFwiaXMgbm90IHlldCBzdXBwb3J0ZWRcIikse3VwZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gby5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpLHIucHVzaChlKSxpKz1lLmxlbmd0aCx0aGlzfSxkaWdlc3Q6ZnVuY3Rpb24oZSl7dmFyIGk9by5jb25jYXQociksdT10P2wobix0LGkpOm4oaSk7cmV0dXJuIHI9bnVsbCxlP3UudG9TdHJpbmcoZSk6dX19fWZ1bmN0aW9uIGgoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfWZ1bmN0aW9uIHAoZSx0KXtmb3IodmFyIG4gaW4gZSl0KGVbbl0sbil9dmFyIG89ZShcImJ1ZmZlclwiKS5CdWZmZXIsZz1lKFwiLi9zaGFcIikseT1lKFwiLi9zaGEyNTZcIiksdz1lKFwiLi9ybmdcIiksYj1lKFwiLi9tZDVcIiksdj17c2hhMTpnLHNoYTI1Njp5LG1kNTpifSxtPTY0LF89bmV3IG8obSk7Xy5maWxsKDApLG4uY3JlYXRlSGFzaD1mdW5jdGlvbihlKXtyZXR1cm4gZChlKX0sbi5jcmVhdGVIbWFjPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQoZSx0KX0sbi5yYW5kb21CeXRlcz1mdW5jdGlvbihlLHQpe2lmKCF0fHwhdC5jYWxsKXJldHVybiBuZXcgbyh3KGUpKTt0cnl7dC5jYWxsKHRoaXMsdm9pZCAwLG5ldyBvKHcoZSkpKX1jYXRjaChuKXt0KG4pfX0scChbXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLGZ1bmN0aW9uKGUpe25bZV09ZnVuY3Rpb24oKXtoKFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fSl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjEwfV0sNjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2VbdD4+NV18PTEyODw8dCUzMixlWyh0KzY0Pj4+OTw8NCkrMTRdPXQ7Zm9yKHZhciBuPTE3MzI1ODQxOTMscj0tMjcxNzMzODc5LG89LTE3MzI1ODQxOTQsaT0yNzE3MzM4NzgsdT0wO3U8ZS5sZW5ndGg7dSs9MTYpe3ZhciBhPW4sZj1yLHM9byxjPWk7bj1oKG4scixvLGksZVt1KzBdLDcsLTY4MDg3NjkzNiksaT1oKGksbixyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG89aChvLGksbixyLGVbdSsyXSwxNyw2MDYxMDU4MTkpLHI9aChyLG8saSxuLGVbdSszXSwyMiwtMTA0NDUyNTMzMCksbj1oKG4scixvLGksZVt1KzRdLDcsLTE3NjQxODg5NyksaT1oKGksbixyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG89aChvLGksbixyLGVbdSs2XSwxNywtMTQ3MzIzMTM0MSkscj1oKHIsbyxpLG4sZVt1KzddLDIyLC00NTcwNTk4Myksbj1oKG4scixvLGksZVt1KzhdLDcsMTc3MDAzNTQxNiksaT1oKGksbixyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxvPWgobyxpLG4scixlW3UrMTBdLDE3LC00MjA2Mykscj1oKHIsbyxpLG4sZVt1KzExXSwyMiwtMTk5MDQwNDE2Miksbj1oKG4scixvLGksZVt1KzEyXSw3LDE4MDQ2MDM2ODIpLGk9aChpLG4scixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxvPWgobyxpLG4scixlW3UrMTRdLDE3LC0xNTAyMDAyMjkwKSxyPWgocixvLGksbixlW3UrMTVdLDIyLDEyMzY1MzUzMjkpLG49cChuLHIsbyxpLGVbdSsxXSw1LC0xNjU3OTY1MTApLGk9cChpLG4scixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxvPXAobyxpLG4scixlW3UrMTFdLDE0LDY0MzcxNzcxMykscj1wKHIsbyxpLG4sZVt1KzBdLDIwLC0zNzM4OTczMDIpLG49cChuLHIsbyxpLGVbdSs1XSw1LC03MDE1NTg2OTEpLGk9cChpLG4scixvLGVbdSsxMF0sOSwzODAxNjA4Myksbz1wKG8saSxuLHIsZVt1KzE1XSwxNCwtNjYwNDc4MzM1KSxyPXAocixvLGksbixlW3UrNF0sMjAsLTQwNTUzNzg0OCksbj1wKG4scixvLGksZVt1KzldLDUsNTY4NDQ2NDM4KSxpPXAoaSxuLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG89cChvLGksbixyLGVbdSszXSwxNCwtMTg3MzYzOTYxKSxyPXAocixvLGksbixlW3UrOF0sMjAsMTE2MzUzMTUwMSksbj1wKG4scixvLGksZVt1KzEzXSw1LC0xNDQ0NjgxNDY3KSxpPXAoaSxuLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG89cChvLGksbixyLGVbdSs3XSwxNCwxNzM1MzI4NDczKSxyPXAocixvLGksbixlW3UrMTJdLDIwLC0xOTI2NjA3NzM0KSxuPWcobixyLG8saSxlW3UrNV0sNCwtMzc4NTU4KSxpPWcoaSxuLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG89ZyhvLGksbixyLGVbdSsxMV0sMTYsMTgzOTAzMDU2Mikscj1nKHIsbyxpLG4sZVt1KzE0XSwyMywtMzUzMDk1NTYpLG49ZyhuLHIsbyxpLGVbdSsxXSw0LC0xNTMwOTkyMDYwKSxpPWcoaSxuLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1Myksbz1nKG8saSxuLHIsZVt1KzddLDE2LC0xNTU0OTc2MzIpLHI9ZyhyLG8saSxuLGVbdSsxMF0sMjMsLTEwOTQ3MzA2NDApLG49ZyhuLHIsbyxpLGVbdSsxM10sNCw2ODEyNzkxNzQpLGk9ZyhpLG4scixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxvPWcobyxpLG4scixlW3UrM10sMTYsLTcyMjUyMTk3OSkscj1nKHIsbyxpLG4sZVt1KzZdLDIzLDc2MDI5MTg5KSxuPWcobixyLG8saSxlW3UrOV0sNCwtNjQwMzY0NDg3KSxpPWcoaSxuLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG89ZyhvLGksbixyLGVbdSsxNV0sMTYsNTMwNzQyNTIwKSxyPWcocixvLGksbixlW3UrMl0sMjMsLTk5NTMzODY1MSksbj15KG4scixvLGksZVt1KzBdLDYsLTE5ODYzMDg0NCksaT15KGksbixyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG89eShvLGksbixyLGVbdSsxNF0sMTUsLTE0MTYzNTQ5MDUpLHI9eShyLG8saSxuLGVbdSs1XSwyMSwtNTc0MzQwNTUpLG49eShuLHIsbyxpLGVbdSsxMl0sNiwxNzAwNDg1NTcxKSxpPXkoaSxuLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG89eShvLGksbixyLGVbdSsxMF0sMTUsLTEwNTE1MjMpLHI9eShyLG8saSxuLGVbdSsxXSwyMSwtMjA1NDkyMjc5OSksbj15KG4scixvLGksZVt1KzhdLDYsMTg3MzMxMzM1OSksaT15KGksbixyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG89eShvLGksbixyLGVbdSs2XSwxNSwtMTU2MDE5ODM4MCkscj15KHIsbyxpLG4sZVt1KzEzXSwyMSwxMzA5MTUxNjQ5KSxuPXkobixyLG8saSxlW3UrNF0sNiwtMTQ1NTIzMDcwKSxpPXkoaSxuLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxvPXkobyxpLG4scixlW3UrMl0sMTUsNzE4Nzg3MjU5KSxyPXkocixvLGksbixlW3UrOV0sMjEsLTM0MzQ4NTU1MSksbj13KG4sYSkscj13KHIsZiksbz13KG8scyksaT13KGksYyl9cmV0dXJuIEFycmF5KG4scixvLGkpfWZ1bmN0aW9uIGQoZSx0LG4scixvLGkpe3JldHVybiB3KGIodyh3KHQsZSksdyhyLGkpKSxvKSxuKX1mdW5jdGlvbiBoKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gcChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIGcoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiB5KGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24gdyhlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBiKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHY9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHYuaGFzaChlLGwsMTYpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDc6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpeyFmdW5jdGlvbigpe3ZhciBlLG4scj10aGlzO2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHQsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspMD09KDMmcikmJih0PTQyOTQ5NjcyOTYqTWF0aC5yYW5kb20oKSksbltyXT10Pj4+KCgzJnIpPDwzKSYyNTU7cmV0dXJuIG59LHIuY3J5cHRvJiZjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzJiYobj1mdW5jdGlvbihlKXt2YXIgdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh0KSx0fSksdC5leHBvcnRzPW58fGV9KCl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDg6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBuPUFycmF5KDgwKSxyPTE3MzI1ODQxOTMsbz0tMjcxNzMzODc5LGk9LTE3MzI1ODQxOTQsdT0yNzE3MzM4NzgsYT0tMTAwOTU4OTc3NixmPTA7ZjxlLmxlbmd0aDtmKz0xNil7Zm9yKHZhciBzPXIsYz1vLGw9aSx5PXUsdz1hLGI9MDtiPDgwO2IrKyl7YjwxNj9uW2JdPWVbZitiXTpuW2JdPWcobltiLTNdXm5bYi04XV5uW2ItMTRdXm5bYi0xNl0sMSk7dmFyIHY9cChwKGcociw1KSxkKGIsbyxpLHUpKSxwKHAoYSxuW2JdKSxoKGIpKSk7YT11LHU9aSxpPWcobywzMCksbz1yLHI9dn1yPXAocixzKSxvPXAobyxjKSxpPXAoaSxsKSx1PXAodSx5KSxhPXAoYSx3KX1yZXR1cm4gQXJyYXkocixvLGksdSxhKX1mdW5jdGlvbiBkKGUsdCxuLHIpe3JldHVybiBlPDIwP3Qmbnx+dCZyOmU8NDA/dF5uXnI6ZTw2MD90Jm58dCZyfG4mcjp0Xm5ecn1mdW5jdGlvbiBoKGUpe3JldHVybiBlPDIwPzE1MTg1MDAyNDk6ZTw0MD8xODU5Nzc1MzkzOmU8NjA/LTE4OTQwMDc1ODg6LTg5OTQ5NzUxNH1mdW5jdGlvbiBwKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH12YXIgeT1lKFwiLi9oZWxwZXJzXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4geS5oYXNoKGUsbCwyMCwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sOTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7dmFyIGw9ZShcIi4vaGVscGVyc1wiKSxkPWZ1bmN0aW9uKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufSxoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fGU8PDMyLXR9LHA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR9LGc9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnRefmUmbn0seT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGUmdF5lJm5edCZufSx3PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMileaChlLDEzKV5oKGUsMjIpfSxiPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNileaChlLDExKV5oKGUsMjUpfSx2PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNyleaChlLDE4KV5wKGUsMyl9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwxNyleaChlLDE5KV5wKGUsMTApfSxfPWZ1bmN0aW9uKGUsdCl7dmFyIG4scixvLGksdSxhLGYscyxjLGwsaCxwLF89bmV3IEFycmF5KDExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCwxNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OCksRT1uZXcgQXJyYXkoMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjUpLEk9bmV3IEFycmF5KDY0KTtcbmVbdD4+NV18PTEyODw8MjQtdCUzMixlWyh0KzY0Pj45PDw0KSsxNV09dDtmb3IodmFyIGM9MDtjPGUubGVuZ3RoO2MrPTE2KXtuPUVbMF0scj1FWzFdLG89RVsyXSxpPUVbM10sdT1FWzRdLGE9RVs1XSxmPUVbNl0scz1FWzddO2Zvcih2YXIgbD0wO2w8NjQ7bCsrKWw8MTY/SVtsXT1lW2wrY106SVtsXT1kKGQoZChtKElbbC0yXSksSVtsLTddKSx2KElbbC0xNV0pKSxJW2wtMTZdKSxoPWQoZChkKGQocyxiKHUpKSxnKHUsYSxmKSksX1tsXSksSVtsXSkscD1kKHcobikseShuLHIsbykpLHM9ZixmPWEsYT11LHU9ZChpLGgpLGk9byxvPXIscj1uLG49ZChoLHApO0VbMF09ZChuLEVbMF0pLEVbMV09ZChyLEVbMV0pLEVbMl09ZChvLEVbMl0pLEVbM109ZChpLEVbM10pLEVbNF09ZCh1LEVbNF0pLEVbNV09ZChhLEVbNV0pLEVbNl09ZChmLEVbNl0pLEVbN109ZChzLEVbN10pfXJldHVybiBFfTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGwuaGFzaChlLF8sMzIsITApfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYTI1Ni5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDEwOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsbixyLG8saSx1LGEsZixzKXtmdW5jdGlvbiBjKCl7fXZhciBlPXQuZXhwb3J0cz17fTtlLm5leHRUaWNrPWZ1bmN0aW9uKCl7dmFyIGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnNldEltbWVkaWF0ZSx0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wb3N0TWVzc2FnZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7aWYoZSlyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZSl9O2lmKHQpe3ZhciBuPVtdO3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixmdW5jdGlvbihlKXt2YXIgdD1lLnNvdXJjZTtpZigodD09PXdpbmRvd3x8bnVsbD09PXQpJiZcInByb2Nlc3MtdGlja1wiPT09ZS5kYXRhJiYoZS5zdG9wUHJvcGFnYXRpb24oKSxuLmxlbmd0aD4wKSl7dmFyIHI9bi5zaGlmdCgpO3IoKX19LCEwKSxmdW5jdGlvbihlKXtuLnB1c2goZSksd2luZG93LnBvc3RNZXNzYWdlKFwicHJvY2Vzcy10aWNrXCIsXCIqXCIpfX1yZXR1cm4gZnVuY3Rpb24oZSl7c2V0VGltZW91dChlLDApfX0oKSxlLnRpdGxlPVwiYnJvd3NlclwiLGUuYnJvd3Nlcj0hMCxlLmVudj17fSxlLmFyZ3Y9W10sZS5vbj1jLGUuYWRkTGlzdGVuZXI9YyxlLm9uY2U9YyxlLm9mZj1jLGUucmVtb3ZlTGlzdGVuZXI9YyxlLnJlbW92ZUFsbExpc3RlbmVycz1jLGUuZW1pdD1jLGUuYmluZGluZz1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX0sZS5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn0sZS5jaGRpcj1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDExOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsdCxyLG8saSx1LGEsZixzKXtuLnJlYWQ9ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaSx1LGE9OCpvLXItMSxmPSgxPDxhKS0xLHM9Zj4+MSxjPS03LGw9bj9vLTE6MCxkPW4/LTE6MSxoPWVbdCtsXTtmb3IobCs9ZCxpPWgmKDE8PC1jKS0xLGg+Pj0tYyxjKz1hO2M+MDtpPTI1NippK2VbdCtsXSxsKz1kLGMtPTgpO2Zvcih1PWkmKDE8PC1jKS0xLGk+Pj0tYyxjKz1yO2M+MDt1PTI1Nip1K2VbdCtsXSxsKz1kLGMtPTgpO2lmKDA9PT1pKWk9MS1zO2Vsc2V7aWYoaT09PWYpcmV0dXJuIHU/TmFOOihoPy0xOjEpKigxLzApO3UrPU1hdGgucG93KDIsciksaS09c31yZXR1cm4oaD8tMToxKSp1Kk1hdGgucG93KDIsaS1yKX0sbi53cml0ZT1mdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIHUsYSxmLHM9OCppLW8tMSxjPSgxPDxzKS0xLGw9Yz4+MSxkPTIzPT09bz9NYXRoLnBvdygyLC0yNCktTWF0aC5wb3coMiwtNzcpOjAsaD1yPzA6aS0xLHA9cj8xOi0xLGc9dDwwfHwwPT09dCYmMS90PDA/MTowO2Zvcih0PU1hdGguYWJzKHQpLGlzTmFOKHQpfHx0PT09MS8wPyhhPWlzTmFOKHQpPzE6MCx1PWMpOih1PU1hdGguZmxvb3IoTWF0aC5sb2codCkvTWF0aC5MTjIpLHQqKGY9TWF0aC5wb3coMiwtdSkpPDEmJih1LS0sZio9MiksdCs9dStsPj0xP2QvZjpkKk1hdGgucG93KDIsMS1sKSx0KmY+PTImJih1KyssZi89MiksdStsPj1jPyhhPTAsdT1jKTp1K2w+PTE/KGE9KHQqZi0xKSpNYXRoLnBvdygyLG8pLHUrPWwpOihhPXQqTWF0aC5wb3coMixsLTEpKk1hdGgucG93KDIsbyksdT0wKSk7bz49ODtlW24raF09MjU1JmEsaCs9cCxhLz0yNTYsby09OCk7Zm9yKHU9dTw8b3xhLHMrPW87cz4wO2VbbitoXT0yNTUmdSxoKz1wLHUvPTI1NixzLT04KTtlW24raC1wXXw9MTI4Kmd9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvaWVlZTc1NFwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dfSx7fSxbMV0pKDEpfSk7IiwiLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVBcGlFbmRwb2ludENvbmZpZ1xuXHQqIEBkZXNjIENyZWF0ZXMgYSBuZXcgQXBpIEVuZHBvaW50IENvbmZpZyBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3Jcblx0KiBAcmV0dXJucyB7b2JqZWN0fSBBcGlFbmRwb2ludENvbmZpZ1xuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZUFwaUVuZHBvaW50Q29uZmlnKCRpbmplY3Rvcikge1xuXHQvKipcblx0ICAqIEBjb25zdHJ1Y3RvclxuXHQgICovXG5cdGZ1bmN0aW9uIEFwaUVuZHBvaW50Q29uZmlnKCkge31cblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLnJvdXRlID0gcm91dGU7XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5tb2RlbCA9IG1vZGVsO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUubWV0aG9kcyA9IG1ldGhvZHM7XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5jbGFzc0RlZiA9IGNsYXNzRGVmO1xuXG5cdHJldHVybiBBcGlFbmRwb2ludENvbmZpZztcblxuXHQvKipcblx0XHQqIEBkZXNjIE92ZXJyaWRlcyB0aGUgbWV0aG9kcyBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtZXRob2RzKG1ldGhvZHMpIHtcblx0ICB0aGlzLm1ldGhvZHMgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobWV0aG9kcyk7IFxuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHRcdCogQGRlc2MgT3ZlcnJpZGVzIHRoZSBtb2RlbCBjb25zdHJ1Y3RvciBmb3IgdGhpcyBlbmRwb2ludFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludENvbmZpZ1xuXHRcdCogQHBhcmFtIHtvYmplY3R9IG1ldGhvZHNcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcblx0XHQqL1xuXHRmdW5jdGlvbiBtb2RlbChtb2RlbCkge1xuXHQgIHRoaXMubW9kZWwgPSAkaW5qZWN0b3IuaW5zdGFudGlhdGUobW9kZWwpO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xhc3NEZWYoY2xhc3NEZWZPYmplY3QpIHtcblx0XHR0aGlzLl9jbGFzc0RlZiA9IGNsYXNzRGVmT2JqZWN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBQb2ludHMgdGhpcyBlbmRwb2ludCB0byBhIGdpdmVuIHJvdXRlIG9uIHRoZSBzZXJ2ZXJcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gcm91dGUocm91dGUpIHtcblx0ICB0aGlzLnJvdXRlID0gcm91dGU7XG5cdCAgcmV0dXJuIHRoaXM7XG5cdH1cblxufTsiLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcbnZhciBpbnN0YW50aWF0ZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG4vKipcbiAgKiBAbmFtZSBBcGlFbmRwb2ludFxuICAqIEBkZXNjIENvbnN0cnVjdG9yIGZvciBhcGkgZW5kcG9pbnRzXG4gICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG4gICogQHBhcmFtIHtzdHJpbmd9IGJhc2VSb3V0ZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbmRwb2ludENvbmZpZ1xuICAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc3BvcnRcbiAgKiBAcmV0dXJucyB7b2JqZWN0fSBlbmRwb2ludFxuICAqIEByZXF1aXJlcyBhbmd1bGFyXG4gICogQHJlcXVpcmVzIGV4dGVuZFxuICAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcGlFbmRwb2ludChiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnLCB0cmFuc3BvcnQsIGNhY2hlLCAkdGltZW91dCkge1xuICAndXNlIHN0cmljdCc7XG4gICduZ0luamVjdCc7XG5cbiAgLypcbiAgICBUaGlzIG1pZ2h0IHNlZW0gY29uZnVzaW5nLCBidXQgd2hhdCB3ZSBhY3R1YWxseSBkb2luZyBpcyBwcm92aWRpbmcgYW4gaW50ZXJmYWNlXG4gICAgZm9yIHdoZW4gd2UgY2FsbCBgbmV3YCBvbiB0aGlzLiBUaGF0IGlzLCBpZiB3ZSBkbyBzb21ldGhpbmcgbGlrZTpcbiAgICB2YXIgc29tZU9iaiA9IG5ldyBUaGlzRW5kcG9pbnQoKVxuXG4gICAgV2UgdGhlbiBoYXZlIHRoZSBhYmlsaXR5IHRvIHBhc3MgaW4gZGVmYXVsdCBkYXRhXG4gICovXG4gIHZhciBzZWxmID0gZnVuY3Rpb24oZGF0YSwgb25SZWFkeSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBleHRlbmQodHJ1ZSwgdGhpcywgZGF0YSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgIElmIHdlJ3ZlIHBhc3NlZCBpbiBhIGN1c3RvbSBtb2RlbCBvYmplY3QsIGxldCdzIGV4dGVuZCBvdXIgZGVmYXVsdCBtb2RlbFxuICAgICAgd2l0aCB0aGlzIGN1c3RvbSBtb2RlbC4gVGhpcyBnaXZlcyB1cyBuZXcgbWV0aG9kcyB0aGF0IG5ld2x5IGNyZWF0ZWQgbW9kZWxzIGZvclxuICAgICAgdGhpcyBlbmRwb2ludCB3aWxsIGhhdmVcbiAgICAqL1xuICAgIC8vIGlmIChlbmRwb2ludENvbmZpZy5tb2RlbCkge1xuICAgIC8vICAgdmFyIGluc3RhbmNlID0gdGhpcztcbiAgICAvLyAgIHZhciBtb2RlbEluc3RhbmNlID0gbmV3IGVuZHBvaW50Q29uZmlnLm1vZGVsKGluc3RhbmNlKTtcbiAgICAvLyAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIG1vZGVsSW5zdGFuY2UpO1xuICAgIC8vIH1cbiAgICB2YXIgcm9vdFVybCA9IGJhc2VSb3V0ZSArIGVuZHBvaW50Q29uZmlnLnJvdXRlO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBlbmRwb2ludENvbmZpZy5fY2xhc3NEZWYpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICB2YXIgbW9kZWxJbnN0YW5jZSA9IG5ldyBlbmRwb2ludENvbmZpZy5fY2xhc3NEZWYoaW5zdGFuY2UpO1xuICAgICAgZm9yICh2YXIgaSBpbiBpbnN0YW5jZSkge1xuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGluc3RhbmNlW2ldKSB7XG4gICAgICAgICAgbW9kZWxJbnN0YW5jZVtpXSA9IGluc3RhbmNlW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbW9kZWxJbnN0YW5jZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKlxuICAgIERlZmF1bHRzIGZvciBvdXIgcmVxdWVzdCwgaW4gY2FzZSBjb25maWcgb2JqZWN0cyBhcmVuJ3QgcGFzc2VkIGluXG4gICovXG4gIHNlbGYucmVxID0ge1xuICAgIG1ldGhvZCA6ICdnZXQnLFxuICAgIHVybCA6ICcnLFxuICAgIHF1ZXJ5IDoge30sXG4gICAgY29uZmlnIDoge30sXG4gICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgLypcbiAgICBCcmluZyBpbiB0aGUgY29uZmlndXJhdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiBvbiBiYXNlUm91dGUgYW5kIGVuZHBvaW50Q29uZmlnXG4gICovXG4gIHNlbGYuY29uZmlnID0gZW5kcG9pbnRDb25maWc7XG4gIHNlbGYuYmFzZVVybCA9IGJhc2VSb3V0ZSArIHNlbGYuY29uZmlnLnJvdXRlO1xuXG4gIC8qXG4gICAgSW5zdGVhZCBvZiBpbmxpbmluZyBvdXIgZnVuY3Rpb25zLCB1c2UgaG9pc3RpbmcgdG8gbWFrZSB0aGluZ3MgbmljZSBhbmQgY2xlYW5cbiAgKi9cbiAgc2VsZi5leGVjID0gZXhlYztcbiAgc2VsZi5maW5kID0gZmluZDtcbiAgc2VsZi5zZWFyY2ggPSBzZWFyY2g7XG4gIHNlbGYuc2tpcCA9IHNraXA7XG4gIHNlbGYuZmllbGRzID0gZmllbGRzO1xuICBzZWxmLmxpbWl0ID0gbGltaXQ7XG4gIHNlbGYuZmluZEJ5SWQgPSBmaW5kQnlJZDtcbiAgc2VsZi5maW5kQnlJZEFuZFJlbW92ZSA9IGZpbmRCeUlkQW5kUmVtb3ZlO1xuICBzZWxmLmZpbmRCeUlkQW5kVXBkYXRlID0gZmluZEJ5SWRBbmRVcGRhdGU7XG5cblxuICAvKlxuICAgIFNhdmUgaXMgYm91bmQgdG8gdGhlIHByb3RvdHlwZSBzbyB3ZSBjYW4gdXNlIGl0IHdoZW4gY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2VcbiAgKi9cbiAgc2VsZi5wcm90b3R5cGUuc2F2ZSA9IHNhdmU7XG5cbiAgLypcbiAgICBJZiB0aGUgZW5kcG9pbnRDb25maWcgaGFzIGEgY3VzdG9tIG1ldGhvZHMgb2JqZWN0LCBleHRlbmQgb3VyIGN1cnJlbnQgbWV0aG9kcyBsaXN0XG4gICAgd2l0aCB0aGUgbWV0aG9kcyB0aGF0IHdlJ3ZlIHBhc3NlZCBpbi4gVGhpcyBoYXNuJ3QgYmVlbiB0ZXN0ZWQgdmVyeSBleHRlbnNpdmVseVxuICAqL1xuICBpZiAoZW5kcG9pbnRDb25maWcubWV0aG9kcykge1xuICAgIGVuZHBvaW50Q29uZmlnLm1ldGhvZHMuX3BhcmVudCA9IHNlbGY7XG4gICAgYW5ndWxhci5leHRlbmQoc2VsZiwgZW5kcG9pbnRDb25maWcubWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcblxuICAvKipcbiAgICAqIEBkZXNjIEluZGljYXRlcyB0aGUgYW1vdW50IG9mIHJlY29yZHMgdG8gcmV0dXJuIHdoZW4gcXVlcnlpbmdcbiAgICAqIEBtZW1iZXJPZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICAqL1xuICBmdW5jdGlvbiBsaW1pdChhbW91bnQpIHtcbiAgICBzZWxmLnJlcS5xdWVyeS5saW1pdCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxsb3cgdXMgdG8gc2VsZWN0IHNwZWNpZmljIGZpZWxkcyB0aGF0IHdlIHdhbnQgYmFjayBmcm9tIHRoZSBkYlxuICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfGFycmF5fSBmaWVsZE5hbWVzXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICovXG4gIGZ1bmN0aW9uIGZpZWxkcyhmaWVsZE5hbWVzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGROYW1lcykpIHtcbiAgICAgIGZpZWxkTmFtZXMgPSBmaWVsZE5hbWVzLmpvaW4oJywnKTtcbiAgICB9XG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgZmllbGROYW1lcykge1xuICAgICAgZmllbGROYW1lcyA9ICcnO1xuICAgIH1cbiAgICBzZWxmLnJlcS5xdWVyeS5maWVsZHMgPSBmaWVsZE5hbWVzO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIC8qKlxuICAgICogQGRlc2MgSW5kaWNhdGVzIHRoZSBhbW91bnQgb2YgcmVjb3JkcyB0byBza2lwIG92ZXIgd2hlbiBxdWVyeWluZ1xuICAgICogQG1lbWJlck9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgICogQHJldHVybnMge29iamVjdH0gc2VsZlxuICAgICovXG4gIGZ1bmN0aW9uIHNraXAoYW1vdW50KSB7XG4gICAgc2VsZi5yZXEucXVlcnkuc2tpcCA9IGFtb3VudDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc2F2ZShjYWxsYmFjaykge1xuICAgIHZhciBjYiA9IGNhbGxiYWNrIHx8IGFuZ3VsYXIubm9vcDtcbiAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvL1VzZSAucmVxdWVzdCBpbnN0ZWFkIG9mIC5wb3N0IGluIHRoZSBzdXBlciByYXJlIGNhc2Ugd2Ugd2FudCB0byBwYXNzIGluIHNvbWVcbiAgICAvL2NvbmZpZyBvYmplY3QgcHJpb3IgdG8gc2F2aW5nLiBJIGNhbid0IHRoaW5rIG9mIGFueSBuZWVkIGZvciB0aGlzLCBidXQgSSdtXG4gICAgLy9pbmNsdWRpbmcgdGhhdCBmdW5jdGlvbmFsaXR5IGp1c3QgaW4gY2FzZS5cbiAgICAvKipcbiAgICAgICogSEFDSyAtIHRoaXMgb25seSB3b3JrcyAqanVzdCBiZWNhdXNlKiBhbmQgc2hvdWxkIGJlIGZpeGVkIHRvIHVzZSBhIG1vZGVsIGluc3RhbmNlXG4gICAgICAqL1xuICAgIHZhciBtZXRob2QgPSAnUE9TVCc7IC8vaWYgbmV3XG4gICAgdmFyIHRhcmdldFVybCA9IHNlbGYuYmFzZVVybDtcbiAgICBpZiAoX3RoaXMuaGFzT3duUHJvcGVydHkoJ0BocmVmJykpIHtcbiAgICAgIC8vIGlmIChfdGhpcy5fdGVtcG9yYXJ5ICE9PSB0cnVlKSB7XG4gICAgICAvLyAgIG1ldGhvZCA9ICdQVVQnO1xuICAgICAgLy8gfVxuICAgICAgdGFyZ2V0VXJsID0gX3RoaXNbJ0BocmVmJ107XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0XG4gICAgICAucmVxdWVzdCh0YXJnZXRVcmwsIG1ldGhvZCwgX3RoaXMsIHt9LCBzZWxmLnJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlIHx8IHt9O1xuICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgZXh0ZW5kKHRydWUsIF90aGlzLCBkYXRhKTtcblxuICAgICAgICAvLyBjYWNoZS5pbnZhbGlkYXRlKGRhdGEuX2lkKTtcblxuICAgICAgICAvL1NpZ25hdHVyZSBpczogZXJyb3IsICp0aGlzKiBpbnN0YW5jZSwgZnVsbCByZXNwb25zZSBib2R5IChtb3N0bHkgZm9yIGRlYnVnZ2luZy9zYW5pdHkgY2hlY2spXG4gICAgICAgIHJldHVybiBjYihudWxsLCBfdGhpcywgcmVzcG9uc2UpO1xuICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGNiKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgU2VuZHMgYSBxdWVyeSB0byB0aGUgYXBpLiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgbGFzdFxuICAgICogcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGUgdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAqIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtvYmplY3R9IHF1ZXJ5XG4gICAgKiBAcGFyYW0ge29iamVjdD19IGNvbmZpZ1xuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZChxdWVyeSwgY29uZmlnLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2dldCc7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybDtcbiAgICByZXEucXVlcnkgPSB7XG4gICAgICBzZWFyY2ggOiBxdWVyeVxuICAgIH1cbiAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgY2I7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgY2IgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgY2IgPSBjYWxsYmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNiKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2goa2V5d29yZCwgY29uZmlnLCBjYikge1xuXG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnc2VhcmNoJztcbiAgICByZXEucXVlcnkgPSB7IHNlYXJjaCA6IHtcbiAgICAgICdrZXl3b3JkJyA6IGtleXdvcmRcbiAgICB9fTtcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsO1xuICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBjYjtcblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICBjYiA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICBjYiA9IGNhbGxiYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2IpIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2IpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgQXNrcyB0aGUgYXBpIHRvIHJldHVybiBvbmUgZWxlbWVudC4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlXG4gICAgKiBsYXN0IHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgKiB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZSBpZFxuICAgICogQHBhcmFtIHtvYmplY3Q9fSBjb25maWdcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkKGlkLCBjb25maWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJlcS5tZXRob2QgPSAnZ2V0JztcbiAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgcmVxLnVybCA9IHRoaXMuYmFzZVVybCArICcvJyArIGlkO1xuICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICB2YXIgY2I7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbmZpZykge1xuICAgICAgY2IgPSBjb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgY2IgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICAvLyBIZXJlLCB3ZSBuZWVkIHRvIHNlZSBpZiB0aGlzIG9iamVjdCBpcyBhbHJlYWR5IGluIHRoZSBjYWNoZS4gSWYgc28sXG4gICAgLy8gZmV0Y2ggaXQgYW5kIG92ZXJyaWRlIG91ciBjYWxsYmFjayBzdGFja1xuXG4gICAgdmFyIGNhY2hlZE1vZGVsID0gY2FjaGUuZ2V0KGlkLCBfaW5zdGFudGlhdGUpO1xuICAgIGlmIChjYWNoZWRNb2RlbCkge1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgICByZXR1cm4gY2IobnVsbCwgY2FjaGVkTW9kZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGV4ZWMgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgY2FjaGVkTW9kZWwpO1xuICAgICAgICAgICAgfSwxMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBGaW5kcyBhbiBlbGVtZW50IG9uIHRoZSBBUEkgYW5kIHJlbW92ZXMgaXQgdXNpbmcgYSB1bmlxdWUgSUQuIElmIGFcbiAgICAqIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIsIHRoaXMgbWV0aG9kIHdpbGwgZXhlY3V0ZVxuICAgICogdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHMgdXNpbmcgdGhhdCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAqIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlIGlkXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kQnlJZEFuZFJlbW92ZShpZCwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdkZWxldGUnO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmwgKyAnLycgKyBpZDtcblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBGaW5kcyBhIHNpbmdsZSBlbGVtZW50IG9uIHRoZSBBUEkgdXNpbmcgYSB1bmlxdWUgaWQgYW5kIFJFUExBQ0VTIGl0XG4gICAgKiB3aXRoIHRoZSBkYXRhIHlvdSBwcm92aWRlLiBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IHByb3ZpZGUgYXRvbWljIHVwZGF0ZXMuXG4gICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGUgY2FsbGJhY2ssIHRoZSBxdWVyeSB3aWxsIGV4ZWN1dGUgYW5kIHRoZVxuICAgICogZXJyb3Igb3IgcmVzdWx0IGZyb20gdGhlIGNhbGwgd2lsbCBiZSBwYXNzZWQgYmFjayB1c2luZyB0aGUgY2FsbGJhY2suIElmXG4gICAgKiBubyBmdW5jdGlvbiBpcyBwcm92aWRlZCwgYHRoaXNgIHdpbGwgYmUgcmV0dXJuZWQgZm9yIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtvYmplY3R8cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBmaW5kQnlJZEFuZFVwZGF0ZShpZCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdwdXQnO1xuICAgIHJlcS5kYXRhID0gZGF0YTtcbiAgICByZXEudXJsID0gc2VsZi5iYXNlVXJsICsgJy8nICsgaWQ7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcblxuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBUaGlzIG1ldGhvZCB3aWxsIGNvbXBvc2UgdGhlIGZpbmFsIHJlcXVlc3QsIHNlbmQgaXQgb3ZlciBvdXIgdHJhbnNwb3J0LFxuICAgICogYW5kIHJldHVybiB0aGUgZXJyb3Igb3IgcmVzdWx0cyB1c2luZyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgKiBBZGRpdGlvbmFsbHksIHRoZSByZXNwb25zZSBpcyB3cmFwcGVkIGluIG91ciBjdXN0b20gTW9kZWwgb2JqZWN0cyB0byBtYWtlXG4gICAgKiB3b3JraW5nIHdpdGggdGhlbSBhIGxvdCBlYXNpZXJcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7cHJvbWlzZX1cbiAgICAqL1xuICBmdW5jdGlvbiBleGVjKGNiKSB7XG4gICAgdmFyIHJlcSA9IHNlbGYucmVxO1xuICAgIHJldHVybiB0cmFuc3BvcnRcbiAgICAgIC5yZXF1ZXN0KHJlcS51cmwsIHJlcS5tZXRob2QsIHJlcS5kYXRhLCByZXEucXVlcnksIHJlcS5jb25maWcpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvL2NvbnZlcnQgcmVzcG9uc2UgdG8gbW9kZWxzXG4gICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZSB8fCB7fTtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgKSB7XG4gICAgICAgICAgICBtb2RlbCA9IGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgLy8gcmV0dXJuIGluc3RhbnRpYXRlTW9kZWwoaXRlbSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW50aWF0ZShpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RlbCA9IF9pbnN0YW50aWF0ZShkYXRhKTtcbiAgICAgICAgICAgIC8vIG1vZGVsID0gaW5zdGFudGlhdGVNb2RlbChkYXRhLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGRhdGEsIHJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBlcnIgPSBlcnIgfHwge307XG4gICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfaW5zdGFudGlhdGUoaXRlbSkge1xuICAgIHJldHVybiBpbnN0YW50aWF0ZU1vZGVsKGl0ZW0sIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgY2FjaGUpO1xuICB9XG59O1xuIiwiLyoqXG5cdCogQG5hbWUgQXBpUHJvdmlkZXJcblx0KiBAZGVzYyBXaXJlcyB1cCB0aGUgYXBpIGZ1bmN0aW9ucyBhbmQgcHJvdmlkZXMgYSBjb25maWcgZnVuY3Rpb25cblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5BcGlQcm92aWRlclxuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkcHJvdmlkZVxuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RvclxuXHQqIEByZXR1cm5zIG51bGxcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXBpUHJvdmlkZXIoJHByb3ZpZGUsICRpbmplY3Rvcikge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0dmFyIEFwaSA9IHJlcXVpcmUoJy4vYXBpLmpzJykoJHByb3ZpZGUsICRpbmplY3Rvcik7XG5cdCRwcm92aWRlLnByb3ZpZGVyKCdhcGknLCBBcGkpO1xufTsiLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbi8qKlxuICAqIEBuYW1lIEluc3RhbnRpYXRlQXBpXG4gICogQGRlc2MgUmV0dXJucyBBcGkgY29uc3RydWN0b3JcbiAgKiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5BcGlcbiAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG4gICogQHBhcmFtIHtwcm92aWRlcn0gJHByb3ZpZGVcbiAgKiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0XG4gICogQHJldHVybnMge29iamVjdH0gYXBpXG4gICogQHJlcXVpcmVzIGFuZ3VsYXJcbiAgKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVBcGkoJHByb3ZpZGUsICRpbmplY3QpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgQXBpRW5kcG9pbnRDb25maWcgPSByZXF1aXJlKCcuL2FwaS1lbmRwb2ludC1jb25maWcuanMnKSgkaW5qZWN0KTtcbiAgdmFyIEFwaUVuZHBvaW50Q29uc3RydWN0b3IgPSByZXF1aXJlKCcuL2FwaS1lbmRwb2ludC5qcycpO1xuICAvKipcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqL1xuICBmdW5jdGlvbiBBcGkoKSB7XG4gICAgdGhpcy5lbmRwb2ludHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIEFwaS5wcm90b3R5cGUuc2V0QmFzZVJvdXRlID0gc2V0QmFzZVJvdXRlO1xuICBBcGkucHJvdG90eXBlLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gIEFwaS5wcm90b3R5cGUuJGdldCA9IFsnJGluamVjdG9yJywndHJhbnNwb3J0JywnbW9kZWxDYWNoZScsJyR0aW1lb3V0JywgZ2V0XTtcblxuICByZXR1cm4gQXBpO1xuICAvKipcbiAgICAqIEBkZXNjIFNldHMgdGhlIHJvb3QgdXJsIGZvciB0aGlzIGFwaVxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVXJsXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG4gICAgKi9cbiAgZnVuY3Rpb24gc2V0QmFzZVJvdXRlKGJhc2VVcmwpIHtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9IGJhc2VVcmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIENyZWF0ZXMgYSBuZXcgZW5kcG9pbnQgY29uZmlndXJhdGlvbnMgYW5kIGF0dGFjaGVzIGl0IHRvIHRoaXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZW5kcG9pbnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IG5ld0VuZHBvaW50XG4gICAgKi9cbiAgZnVuY3Rpb24gZW5kcG9pbnQobmFtZSkge1xuICAgIHZhciBiYXNlUm91dGUgPSB0aGlzLmJhc2VSb3V0ZTtcbiAgICB2YXIgbmV3RW5kcG9pbnQgPSBuZXcgQXBpRW5kcG9pbnRDb25maWcoKTtcbiAgICB0aGlzLmVuZHBvaW50c1tuYW1lXSA9IG5ld0VuZHBvaW50O1xuICAgIHJldHVybiBuZXdFbmRwb2ludDtcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgSW5qZWN0b3IgZnVuY3Rpb24gdGhhdCBhbmd1bGFyIHdpbGwgdXNlXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG4gICAgKiBAcGFyYW0ge29iamVjdH0gdHJhbnNwb3J0XG4gICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxDYWNoZVxuICAgICogQHJldHVybnMge29iamVjdH0gYXBpXG4gICAgKi9cbiAgZnVuY3Rpb24gZ2V0KCRpbmplY3RvciwgdHJhbnNwb3J0LCBtb2RlbENhY2hlKSB7XG4gICAgdmFyIGFwaSA9IHt9O1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmVuZHBvaW50cywgZnVuY3Rpb24oZW5kcG9pbnRDb25maWcsIG5hbWUpIHtcbiAgICAgIGFwaVtuYW1lXSA9ICRpbmplY3Rvci5pbnN0YW50aWF0ZShBcGlFbmRwb2ludENvbnN0cnVjdG9yLCB7XG4gICAgICAgIGJhc2VSb3V0ZTogc2VsZi5iYXNlUm91dGUsXG4gICAgICAgIGVuZHBvaW50Q29uZmlnOiBlbmRwb2ludENvbmZpZyxcbiAgICAgICAgdHJhbnNwb3J0IDogdHJhbnNwb3J0LFxuICAgICAgICBjYWNoZSA6IG1vZGVsQ2FjaGVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFwaTtcbiAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1vZGVsQ2FjaGVTZXJ2aWNlKCkge1xuXHR2YXIgbCA9IGxvY2FsU3RvcmFnZTtcblxuXHR0aGlzLnB1dCA9IHB1dDtcblx0dGhpcy5nZXQgPSBnZXQ7XG5cdHRoaXMuaW52YWxpZGF0ZSA9IGludmFsaWRhdGU7XG5cblx0ZnVuY3Rpb24gcHV0KG9iamVjdCwga2V5KSB7XG5cdFx0dmFyIG9iamVjdElkID0ga2V5IHx8IG9iamVjdC5faWQ7XG5cdFx0bC5zZXRJdGVtKG9iamVjdElkLCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcblx0XHRyZXR1cm4gb2JqZWN0SWQ7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXQob2JqZWN0SWQsIGNvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKCFvYmplY3RJZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgY2FjaGVkSXRlbTtcblx0XHRpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBsLmdldEl0ZW0ob2JqZWN0SWQpKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjYWNoZWRJdGVtID0gSlNPTi5wYXJzZSggbC5nZXRJdGVtKG9iamVjdElkKSApO1xuXHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdGludmFsaWRhdGUob2JqZWN0SWQpO1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjb25zdHJ1Y3Rvcikge1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yKGNhY2hlZEl0ZW0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gY2FjaGVkSXRlbTtcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRmdW5jdGlvbiBpbnZhbGlkYXRlKG9iamVjdElkKSB7XG5cdFx0aWYgKCFvYmplY3RJZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gbC5yZW1vdmVJdGVtKG9iamVjdElkKTtcblx0fVxufSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnc2RrLWNvcmUnO1xuLyoqXG5cdCogQG5hbWUgc2RrLWNvcmVcblx0KiBAZGVzYyBPZmZpY2VCb3RTREsgbGlicmFyeVxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLXG5cdCogQHJldHVybnMge3N0cmluZ30gbW9kdWxlTmFtZVxuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovXG5hbmd1bGFyXG5cdC5tb2R1bGUobW9kdWxlTmFtZSwgW10pXG5cdC5zZXJ2aWNlKCd0cmFuc3BvcnQnLCByZXF1aXJlKCcuL3RyYW5zcG9ydC5qcycpKVxuXHQuc2VydmljZSgnbW9kZWxDYWNoZScsIHJlcXVpcmUoJy4vY2FjaGUuanMnKSlcblx0LmNvbmZpZyhyZXF1aXJlKCcuL2FwaS1wcm92aWRlci5qcycpKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IG1vZHVsZU5hbWU7IiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgaGFzaCA9IHJlcXVpcmUoJ29iamVjdC1oYXNoJyk7XG5cbi8qKlxuXHQqIEBuYW1lIEluc3RhbnRpYXRlTW9kZWxcblx0KiBAZGVzYyBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIGEgTW9kZWwgb2JqZWN0XG5cdCogQG5hbWVzcGFjZSBNb2RlbFxuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0KiBAcGFyYW0ge29iamVjdH0gZGF0YSBNb2RhbCBwcm9wZXJ0aWVzIHRvIGluc3RhbnRpYXRlIHdpdGhcblx0KiBAcmV0dXJucyB7b2JqZWN0fSBtb2RlbFxuXHQqIEByZXF1aXJlcyBleHRlbmRcblx0KiBAcmVxdWlyZXMgYW5ndWxhclxuXHQqLyBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVNb2RlbChkYXRhLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcsIG1vZGVsQ2FjaGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgVGhpcyBpcyBvdXIgY29uc3RydWN0b3IgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZmlsZS5cblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fVxuXHRcdCovXG5cdHZhciBNb2RlbCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRleHRlbmQodHJ1ZSwgdGhpcywgZGF0YSk7XG5cdFx0dGhpc1snQGhhc2gnXSA9IGhhc2goYW5ndWxhci50b0pzb24odGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2F2ZXMgdGhlIGN1cnJlbnQgbW9kZWwncyByZXByZXNlbnRhdGlvbiB0byB0aGUgQVBJLiBUaGUgbW9kZWwgTVVTVFxuXHRcdCogaGF2ZSBhIHZhbGlkIEhSRUYgdGFnIG9yIHRoaXMgY2FsbCB3aWxsIGZhaWxcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG5cdFx0KiBAcmV0dXJucyB7bnVsbH1cblx0XHQqL1xuXHRNb2RlbC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKGNiKSB7XG5cdCAgdmFyIGNhbGxiYWNrID0gY2IgfHwgYW5ndWxhci5ub29wO1xuXHQgIHZhciBtb2RlbCA9IHRoaXM7XG5cblx0ICBkZWxldGUgbW9kZWxbJ0BoYXNoJ107XG5cdFx0dmFyIHRtcCA9IEpTT04ucGFyc2UoIGFuZ3VsYXIudG9Kc29uKG1vZGVsKSApO1xuXHRcdHZhciBtZXRob2QgPSAncHV0Jztcblx0XHR2YXIgaHJlZiA9IHRtcFsnQGhyZWYnXTtcblxuXHQgIHRyYW5zcG9ydFxuXHRcdCAgLnJlcXVlc3QoaHJlZiwgbWV0aG9kLCB0bXAsIHt9LCB7fSlcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhKSB7XG5cdCAgICAgIFx0ZXh0ZW5kKHRydWUsIG1vZGVsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgICAgXHRtb2RlbFsnQGhhc2gnXSA9IGhhc2goYW5ndWxhci50b0pzb24obW9kZWwpKTtcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG5cdCAgICB9LCBmdW5jdGlvbihlcnIpIHtcblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cdCAgICB9KTtcblx0fTtcblxuXHQvKipcblx0XHQqIEBkZXNjIERvZXMgYSBzaW1wbGUgZGlydHkgY2hlY2sgYnkgY2FsY3VsYXRpbmcgYSBuZXcgaGFzaCBhbmQgY29tcGFyaW5nIGl0IHRvXG5cdFx0KiB0aGUgb3JpZ2luYWxcblx0XHQqL1xuXHRNb2RlbC5wcm90b3R5cGUuaXNEaXJ0eSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjdXJyZW50SGFzaCA9IHRoaXNbJ0BoYXNoJ107XG5cdFx0dmFyIGN1cnJlbnRNb2RlbCA9IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KHRoaXMpICk7XG5cdFx0ZGVsZXRlIGN1cnJlbnRNb2RlbFsnQGhhc2gnXTtcblx0XHR2YXIgbmV3SGFzaCA9IGhhc2goYW5ndWxhci50b0pzb24oY3VycmVudE1vZGVsKSk7XG5cdFx0cmV0dXJuIG5ld0hhc2ggIT09IGN1cnJlbnRIYXNoO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgUmVtb3ZlcyB0aGlzIG1vZGVsIGZyb20gdGhlIEFQSS4gVGhlIG1vZGVsIE1VU1Rcblx0XHQqIGhhdmUgYSB2YWxpZCBIUkVGIHRhZyBvciB0aGlzIGNhbGwgd2lsbCBmYWlsXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLk1vZGVsXG5cdFx0KiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdCogQHJldHVybnMge251bGx9XG5cdFx0Ki9cblx0TW9kZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGNiKSB7XG5cdCAgdmFyIGNhbGxiYWNrID0gY2IgfHwgYW5ndWxhci5ub29wO1xuXHQgIHZhciBtb2RlbCA9IHRoaXM7XG5cblx0ICByZXR1cm4gdHJhbnNwb3J0XG5cdCAgXHQuZGVsZXRlKCBtb2RlbFsnQGhyZWYnXSApXG5cdCAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG5cdCAgICB9LCBmdW5jdGlvbihlcnIpIHtcblx0ICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cdCAgICB9KTtcblx0fTtcblx0XG5cdC8vRmluYWxseSwgc2VuZCB0aGUgbmV3IG1vZGVsIGJhY2tcblx0dmFyIG5ld01vZGVsID0gbmV3IE1vZGVsKGRhdGEpO1xuXHRpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGVuZHBvaW50Q29uZmlnLl9jbGFzc0RlZikge1xuICAgIHZhciBtb2RlbEluc3RhbmNlID0gbmV3IGVuZHBvaW50Q29uZmlnLl9jbGFzc0RlZihuZXdNb2RlbCk7XG4gICAgZm9yICh2YXIgaSBpbiBuZXdNb2RlbCkge1xuICAgIFx0aWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBuZXdNb2RlbFtpXSkge1xuICAgIFx0XHRtb2RlbEluc3RhbmNlW2ldID0gbmV3TW9kZWxbaV07XG4gICAgXHR9XG4gICAgfVxuICAgIHJldHVybiBtb2RlbEluc3RhbmNlO1xuXHR9XG5cdHJldHVybiBuZXdNb2RlbDtcbn07IiwiLyoqXG5cdCogQG5hbWUgaHR0cFRyYW5zcG9ydFxuXHQqIEBkZXNjIEFic3RyYWN0aW9uIGxheWVyIGZvciBvdXIgY29ubmVjdGlvbnMgaW5zaWRlIG9mIHRoZSBhcGkgcHJvdmlkZXIuXG5cdCogVGhpcyB3aWxsIGFsbG93IHVzIHRvIGVhc2lseSByZXBsYWNlIHRoaXMgZG93biB0aGUgbGluZSB3aXRoIHNvbWV0aGluZ1xuXHQqIGVsc2UgKGxpa2Ugc29ja2V0cykgaWYgd2UgZGVjaWRlIHRvXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBuYW1lc3BhY2UgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGh0dHBcblx0KiBAcmV0dXJucyB7b2JqZWN0fVxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBodHRwVHJhbnNwb3J0KCRodHRwKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0J25nSW5qZWN0JztcblxuXHR2YXIgc2VsZiA9IHt9O1xuXHRzZWxmLnJlcXVlc3QgPSByZXF1ZXN0O1xuXHRzZWxmLmdldCA9IGdldDtcblx0c2VsZi5wb3N0ID0gcG9zdDtcblx0c2VsZi5wdXQgPSBwdXQ7XG5cdHNlbGYuZGVsZXRlID0gcmVtb3ZlO1xuXHRzZWxmLnBhdGNoID0gcGF0Y2g7XG5cdHNlbGYuaGVhZCA9IGhlYWQ7XG5cdHNlbGYub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFxuXHRyZXR1cm4gc2VsZjtcblxuXHQvKipcblx0XHQqIEBkZXNjIFRoaXMgbWV0aG9kIGJ1bmRsZXMgZXZlcnl0aGluZyB1cCBpbnRvIGFuICRodHRwIHJlcXVlc3Rcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2Rcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiByZXF1ZXN0KHVybCwgbWV0aG9kLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHR1cmwgOiB1cmwsXG5cdFx0XHRtZXRob2QgOiBtZXRob2QudG9VcHBlckNhc2UoKSxcblx0XHRcdGRhdGEgOiBkYXRhLFxuXHRcdFx0cGFyYW1zIDogcXVlcnksXG5cdFx0XHRoZWFkZXJzIDogaGVhZGVyc1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdHRVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIGdldCh1cmwsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnR0VUJywge30sIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnR0VUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHBvc3QodXJsLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ1BPU1QnLCBkYXRhLCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ1BVVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gZGF0YVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBwdXQodXJsLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ1BVVCcsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnREVMRVRFJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiByZW1vdmUodXJsLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ0RFTEVURScsIHt9LCBxdWVyeSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0hFQUQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIGhlYWQodXJsLCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnSEVBRCcsIHt9LCB7fSwgaGVhZGVycyk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ1BBVENIJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHBhdGNoKHVybCwgZGF0YSwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdQQVRDSCcsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnT1BUSU9OUycsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gb3B0aW9ucyh1cmwsIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdPUFRJT05TJywge30sIHt9LCBoZWFkZXJzKTtcblx0fVxufTsiLCIvKipcblx0KiBAbmFtZSB1dGlsc1xuXHQqIEBkZXNjIFV0aWxzIGxpYnJhcnlcblx0KiBAcmV0dXJucyB7b2JqZWN0fSBzZWxmXG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuVXRpbHNcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHV0aWxzKCkge1xuXHR2YXIgc2VsZiA9IHt9O1xuXHRzZWxmLnJlbW92ZSA9IHJlbW92ZTtcblxuXHRyZXR1cm4gc2VsZjtcblxuXHQvKipcblx0ICAqIEBwcml2YXRlXG5cdCAgKiBAZGVzYyBIZWxwZXIgZnVuY3Rpb24gdG8gbnVsbGlmeSBvYmplY3RzIGFmdGVyIC5yZW1vdmUgaXMgY2FsbGVkXG5cdCAgKiBAcGFyYW0ge29iamVjdH0gaXRlbSBUaGluZyB0byBiZSByZW1vdmVkXG5cdCAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gc3RhdHVzXG5cdCAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLlV0aWxzXG5cdCAgKi9cblx0ZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcblx0ICBmb3IgKHZhciBpIGluIGl0ZW0pIHtcblx0ICAgIGl0ZW1baV0gPSB1bmRlZmluZWQ7XG5cdCAgICBkZWxldGUgaXRlbVtpXTtcblx0ICB9XG5cdCAgaXRlbSA9IHVuZGVmaW5lZDtcblx0ICBkZWxldGUgaXRlbTtcblx0ICByZXR1cm4gdHJ1ZTtcblx0fVxufTsiXX0=
