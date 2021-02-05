/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/select2.js":
/*!*********************************!*\
  !*** ./resources/js/select2.js ***!
  \*********************************/
/*! exports provided: formatOptionWithIcon, formatOptionWithImage, formatOption */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: I:\\projects\\task-manager\\resources\\js\\select2.js: Unexpected token (107:0)\n\n\u001b[0m \u001b[90m 105 | \u001b[39m            }\u001b[0m\n\u001b[0m \u001b[90m 106 | \u001b[39m        }\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 107 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 108 | \u001b[39m        allowClear\u001b[33m:\u001b[39m \u001b[36mtrue\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 109 | \u001b[39m\u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 110 | \u001b[39m        allowClear\u001b[33m:\u001b[39m \u001b[36mtrue\u001b[39m\u001b[0m\n    at Object._raise (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:748:17)\n    at Object.raiseWithData (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:741:17)\n    at Object.raise (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:735:17)\n    at Object.unexpected (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9101:16)\n    at Object.parseIdentifierName (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11344:18)\n    at Object.parseIdentifier (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11317:23)\n    at Object.parseMaybePrivateName (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10645:19)\n    at Object.parsePropertyName (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11130:155)\n    at Object.parsePropertyDefinition (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11016:22)\n    at Object.parseObjectLike (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10931:25)\n    at Object.parseExprAtom (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10491:23)\n    at Object.parseExprAtom (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:4763:20)\n    at Object.parseExprSubscripts (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10150:23)\n    at Object.parseUpdate (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10130:21)\n    at Object.parseMaybeUnary (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10119:17)\n    at Object.parseExprOps (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9989:23)\n    at Object.parseMaybeConditional (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9963:23)\n    at Object.parseMaybeAssign (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9926:21)\n    at I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9893:39\n    at Object.allowInAnd (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11547:12)\n    at Object.parseMaybeAssignAllowIn (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9893:17)\n    at Object.parseExprListItem (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11309:18)\n    at Object.parseCallExpressionArguments (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10350:22)\n    at Object.parseCoverCallAndAsyncArrowHead (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10258:29)\n    at Object.parseSubscript (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10194:19)\n    at Object.parseSubscripts (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10167:19)\n    at Object.parseExprSubscripts (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10156:17)\n    at Object.parseUpdate (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10130:21)\n    at Object.parseMaybeUnary (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:10119:17)\n    at Object.parseExprOps (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9989:23)\n    at Object.parseMaybeConditional (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9963:23)\n    at Object.parseMaybeAssign (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9926:21)\n    at Object.parseExpressionBase (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9871:23)\n    at I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9865:39\n    at Object.allowInAnd (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:11547:12)\n    at Object.parseExpression (I:\\projects\\task-manager\\node_modules\\@babel\\parser\\lib\\index.js:9865:17)");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./resources/js/select2.js ./resources/sass/app.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! I:\projects\task-manager\resources\js\select2.js */"./resources/js/select2.js");
module.exports = __webpack_require__(/*! I:\projects\task-manager\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });