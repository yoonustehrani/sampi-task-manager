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
/*! exports provided: formatOptionWithIcon, formatOptionWithImage, formatOption, simpleSearch, renderWithImg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatOptionWithIcon", function() { return formatOptionWithIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatOptionWithImage", function() { return formatOptionWithImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatOption", function() { return formatOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleSearch", function() { return simpleSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderWithImg", function() { return renderWithImg; });
var formatOptionWithIcon = function formatOptionWithIcon(option) {
  if (option.element) {
    var icon_name = option.element.attributes.icon_name.nodeValue;
    var containerClass = option.element.attributes.container_class ? option.element.attributes.container_class.nodeValue : null;
    return $("<div class=\"select-option ".concat(containerClass !== null ? containerClass : "", "\"><i class=\"").concat(icon_name, "\"></i>").concat(option.text, "</div>"));
  }
};
var formatOptionWithImage = function formatOptionWithImage(option) {
  if (option.element) {
    var img_src = option.element.attributes.img_address.nodeValue ? option.element.attributes.img_address.nodeValue : console.log('kirsag');
    var is_user_admin = option.element.attributes.is_admin;
    return $("\n            <div class=\"select-option circle-avatar-pic\">\n                <img class=\"ml-1\" src=\"".concat(img_src, "\"/>\n                ").concat(option.text, "\n                ").concat(typeof is_user_admin !== "undefined" ? "<span class=\"badge badge-pill mr-1 ".concat(is_user_admin.nodeValue === "1" ? "badge-success" : "badge-primary", "\">").concat(is_user_admin.nodeValue === "1" ? "ادمین" : "کاربر", "</span>") : "", "  \n            </div>\n        "));
  }
};
var formatOption = function formatOption(option) {
  return $("\n        <div class=\"select-option\">\n            ".concat(option.workspace ? "<div class=\"circle-avatar-pic small-avatar mb-1\"><img src=\"".concat(APP_PATH + option.workspace.avatar_pic, "\"/><span class=\"badge badge-light mr-1\">").concat(option.workspace.title, "</span></div>") : "", "\n            ").concat(option.text).concat(option.group ? " (".concat(option.group, ")") : "", "\n        </div>\n    "));
};
$('#new-task-priority, #tasks_order_select, #tasks_order_by_select, #tasks_relation_select, #mixed_tasks_order_select, #mixed_tasks_order_by_select, #mixed_tasks_relation_select, #mixed_demands_order_select, #mixed_demands_order_by_select, #mixed_demands_relation_select, #mixed_needs_order_select, #mixed_needs_order_by_select, #mixed_needs_relation_select, #mixed_all_order_select, #mixed_all_order_by_select, #mixed_all_relation_select').select2({
  templateResult: formatOptionWithIcon,
  minimumResultsForSearch: Infinity,
  width: '100%',
  dir: "rtl",
  language: {
    searching: function searching() {
      return "درحال جستجو ...";
    },
    noResults: function noResults() {
      return "نتیجه ای یافت نشد";
    }
  }
});
$('.select2-search__field').css('width', '100%');
var simpleSearch = function simpleSearch(ids, parentOnly) {
  var workspaceId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : $("#new-demand-project-select").val();
  $(ids).select2({
    templateResult: formatOption,
    templateSelection: function templateSelection(data, container) {
      $(data.element).attr('workspace_id', data.workspace_id);
      return data.text;
    },
    placeholder: 'کار مربوطه را جستجو و انتخاب کنید',
    width: "100%",
    dir: "rtl",
    minimumInputLength: 3,
    delay: 250,
    ajax: {
      url: typeof simple_search_url !== "undefined" ? simple_search_url : "",
      data: function data(params) {
        return {
          q: params.term,
          workspace: workspaceId,
          parentOnly: parentOnly
        };
      },
      processResults: function processResults(res) {
        var data = $.map(res, function (obj) {
          obj.text = obj.text || obj.title; // replace name with the property used for the text

          return obj;
        });
        return {
          results: data
        };
      }
    },
    language: {
      searching: function searching() {
        return "درحال جستجو ...";
      },
      noResults: function noResults() {
        return "نتیجه ای یافت نشد";
      }
    },
    allowClear: true
  });
};
simpleSearch('#task-select', false);
simpleSearch("#parent-task-select", true);
var renderWithImg = function renderWithImg(ids, placeholder, multiple) {
  $(ids).select2({
    templateResult: formatOptionWithImage,
    placeholder: placeholder,
    width: "100%",
    dir: "rtl",
    multiple: multiple,
    language: {
      searching: function searching() {
        return "درحال جستجو ...";
      },
      noResults: function noResults() {
        return "نتیجه ای یافت نشد";
      }
    },
    allowClear: true
  });
};
renderWithImg("#new-demand-member", "نیاز به کمک چه کسی دارید؟", false);
renderWithImg("#new-demand-project-select", "پروژه مربوطه را انتخاب کنید", false);
renderWithImg("#new-task-members", "انجام دهندگان این کار", true);
renderWithImg("#new-task-project-select", "پروژه مربوطه را انتخاب کنید", false);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/auth.scss":
/*!**********************************!*\
  !*** ./resources/sass/auth.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/tinytheme.scss":
/*!***************************************!*\
  !*** ./resources/sass/tinytheme.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/welcome.scss":
/*!*************************************!*\
  !*** ./resources/sass/welcome.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**********************************************************************************************************************************************************!*\
  !*** multi ./resources/js/select2.js ./resources/sass/app.scss ./resources/sass/welcome.scss ./resources/sass/tinytheme.scss ./resources/sass/auth.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! W:\programming\php\sampies\resources\js\select2.js */"./resources/js/select2.js");
__webpack_require__(/*! W:\programming\php\sampies\resources\sass\app.scss */"./resources/sass/app.scss");
__webpack_require__(/*! W:\programming\php\sampies\resources\sass\welcome.scss */"./resources/sass/welcome.scss");
__webpack_require__(/*! W:\programming\php\sampies\resources\sass\tinytheme.scss */"./resources/sass/tinytheme.scss");
module.exports = __webpack_require__(/*! W:\programming\php\sampies\resources\sass\auth.scss */"./resources/sass/auth.scss");


/***/ })

/******/ });