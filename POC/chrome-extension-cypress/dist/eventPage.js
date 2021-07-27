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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eventPage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eventPage.ts":
/*!**************************!*\
  !*** ./src/eventPage.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Listen to messages sent from other parts of the extension.
var recordUserActivity = __importStar(__webpack_require__(/*! ./recordUserActivity */ "./src/recordUserActivity.ts"));
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // onMessage must return "true" if response is async.
    var isResponseAsync = false;
    var USER_ACTIVITIES_STORAGE_KEY = 'USER_ACTIVITIES';
    switch (true) {
        case request.modeChanged:
            if (request.modeChanged) {
                recordUserActivity.addListeners();
            }
            else {
                recordUserActivity.removeListeners();
            }
            break;
    }
    if (request.popupMounted) {
    }
    return isResponseAsync;
});


/***/ }),

/***/ "./src/recordUserActivity.ts":
/*!***********************************!*\
  !*** ./src/recordUserActivity.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeListeners = exports.addListeners = void 0;
var selectorPicker_1 = __webpack_require__(/*! ./selectorPicker */ "./src/selectorPicker.ts");
var STORAGE_KEY = 'USER_ACTIVITIES';
var clickHandler = function (e) {
    var str = "cy.get(''" + selectorPicker_1.useSelector(e).cySelector + ").click()";
    setTostorage(str);
};
var changeHandler = function (e) {
    var target = e.target;
    var tagName = target.tagName.toLowerCase();
    var type = tagName === 'textarea' || (tagName === 'input' && target.type === 'text') ? 'type' : 'change';
    var str = "cy.get(''" + selectorPicker_1.useSelector(e).cySelector + ")." + type + "(\"" + target.value + "\")";
    setTostorage(str);
};
var setTostorage = function (str) {
    chrome.storage.local.get([STORAGE_KEY], function (result) {
        var _a;
        chrome.storage.local.set((_a = {}, _a[STORAGE_KEY] = (result[STORAGE_KEY] ? result[STORAGE_KEY] : '') + " \n         " + str, _a));
        console.log(result[STORAGE_KEY]);
    });
};
exports.addListeners = function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        var url = tabs[0].url.replace(/^(?:\/\/|[^\/]+)*\//, "");
        var str = "cy.visit('" + url + "')";
        if (url) {
            setTostorage(str);
        }
        document.addEventListener('click', clickHandler, true);
        document.addEventListener('change', changeHandler, false);
    });
};
exports.removeListeners = function () {
    document.removeEventListener('click', clickHandler, true);
    document.removeEventListener('change', changeHandler, false);
};


/***/ }),

/***/ "./src/selectorPicker.ts":
/*!*******************************!*\
  !*** ./src/selectorPicker.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelector = exports.getClosestParent = void 0;
exports.getClosestParent = function (elem, selector) {
    if (selector === void 0) { selector = '[id]'; }
    var tags = '';
    if (elem) {
        for (; elem && elem !== document; elem = elem.parentNode) {
            //if (elem.matches(selector) || document.body === elem) {
            if (document.body === elem) {
                return {
                    elem: elem,
                    tags: tags,
                };
            }
            else {
                var index = [].indexOf.call(elem.parentNode.children, elem) + 1;
                tags += elem.tagName + ':nth-child(' + index + ') ';
            }
        }
    }
    return null;
};
exports.useSelector = function (event) {
    var _a, _b, _c, _d;
    var selector = 'data-testid';
    var parent = exports.getClosestParent(event.target, "[" + selector + "]");
    var firstTag = parent.elem.getAttribute([selector]);
    //const firstSelector = firstTag ? `[${selector}='${firstTag}']` : 'BODY';
    var firstSelector = 'BODY';
    var cySelector = firstSelector + " " + parent.tags.split(' ').reverse().join(' ');
    return {
        cySelector: cySelector,
        value: (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value,
        text: ((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.textContent) || ((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.innerText) || ((_d = event === null || event === void 0 ? void 0 : event.target) === null || _d === void 0 ? void 0 : _d.value)
    };
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50UGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVjb3JkVXNlckFjdGl2aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RvclBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDZEQUE2RDtBQUM3RCxzSEFBMkQ7QUFFM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZO0lBQy9ELHFEQUFxRDtJQUNyRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBTSwyQkFBMkIsR0FBRyxpQkFBaUIsQ0FBQztJQUV0RCxRQUFRLElBQUksRUFB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QUcsQ0FBQztJQUNwRixPQUFPO1FBQ0gsVUFBVTtRQUNWLEtBQUssUUFBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsTUFBTSwwQ0FBRSxLQUFLO1FBQzFCLElBQUksRUFBRSxZQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsTUFBTSwwQ0FBRSxXQUFXLFlBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE1BQU0sMENBQUUsU0FBUyxZQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLDBDQUFFLEtBQUs7S0FDdkY7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZXZlbnRQYWdlLnRzXCIpO1xuIiwiLy8gTGlzdGVuIHRvIG1lc3NhZ2VzIHNlbnQgZnJvbSBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uLlxyXG5pbXBvcnQgKiBhcyByZWNvcmRVc2VyQWN0aXZpdHkgZnJvbSAnLi9yZWNvcmRVc2VyQWN0aXZpdHknO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgLy8gb25NZXNzYWdlIG11c3QgcmV0dXJuIFwidHJ1ZVwiIGlmIHJlc3BvbnNlIGlzIGFzeW5jLlxyXG4gICAgbGV0IGlzUmVzcG9uc2VBc3luYyA9IGZhbHNlO1xyXG4gICAgY29uc3QgVVNFUl9BQ1RJVklUSUVTX1NUT1JBR0VfS0VZID0gJ1VTRVJfQUNUSVZJVElFUyc7XHJcblxyXG4gICAgc3dpdGNoICh0cnVlKXtcclxuICAgICAgICBjYXNlIHJlcXVlc3QubW9kZUNoYW5nZWQ6XHJcbiAgICAgICAgICAgIGlmKHJlcXVlc3QubW9kZUNoYW5nZWQpe1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkVXNlckFjdGl2aXR5LmFkZExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlY29yZFVzZXJBY3Rpdml0eS5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVxdWVzdC5wb3B1cE1vdW50ZWQpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBpc1Jlc3BvbnNlQXN5bmM7XHJcbn0pOyIsImltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gXCIuL3NlbGVjdG9yUGlja2VyXCI7XHJcblxyXG5cclxuY29uc3QgU1RPUkFHRV9LRVkgPSAnVVNFUl9BQ1RJVklUSUVTJztcclxuXHJcbmNvbnN0IGNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBzdHIgPSBgY3kuZ2V0KCcnJHt1c2VTZWxlY3RvcihlKS5jeVNlbGVjdG9yfSkuY2xpY2soKWA7XHJcbiAgICBzZXRUb3N0b3JhZ2Uoc3RyKTtcclxufVxyXG5cclxuY29uc3QgY2hhbmdlSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSAoZS50YXJnZXQgYXMgSFRNTEZvcm1FbGVtZW50KTtcclxuICAgIGNvbnN0IHRhZ05hbWUgPSB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgdHlwZSA9ICB0YWdOYW1lID09PSAndGV4dGFyZWEnIHx8ICh0YWdOYW1lID09PSAnaW5wdXQnICYmIHRhcmdldC50eXBlID09PSAndGV4dCcpID8gJ3R5cGUnIDogJ2NoYW5nZSdcclxuICAgIGNvbnN0IHN0ciA9IGBjeS5nZXQoJycke3VzZVNlbGVjdG9yKGUpLmN5U2VsZWN0b3J9KS4ke3R5cGV9KFwiJHt0YXJnZXQudmFsdWV9XCIpYDtcclxuICAgIHNldFRvc3RvcmFnZShzdHIpO1xyXG59XHJcblxyXG5jb25zdCBzZXRUb3N0b3JhZ2UgPSAoc3RyKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1NUT1JBR0VfS0VZXSwgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7W1NUT1JBR0VfS0VZXTogYCR7cmVzdWx0W1NUT1JBR0VfS0VZXSA/IHJlc3VsdFtTVE9SQUdFX0tFWV0gOiAnJ30gXHJcbiAgICAgICAgICR7c3RyfWB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRbU1RPUkFHRV9LRVldKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkTGlzdGVuZXJzID0gICgpID0+IHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGxhc3RGb2N1c2VkV2luZG93OiB0cnVlfSwgdGFicyA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGFic1swXS51cmwucmVwbGFjZSgvXig/OlxcL1xcL3xbXlxcL10rKSpcXC8vLCBcIlwiKTtcclxuICAgICAgICBjb25zdCBzdHIgPSBgY3kudmlzaXQoJyR7dXJsfScpYDtcclxuICAgICAgICBpZih1cmwpe1xyXG4gICAgICAgICAgICBzZXRUb3N0b3JhZ2Uoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIsIGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUxpc3RlbmVycyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyLCB0cnVlKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIsIGZhbHNlKTtcclxufSIsIlxyXG5leHBvcnQgY29uc3QgZ2V0Q2xvc2VzdFBhcmVudCA9IChlbGVtICwgc2VsZWN0b3IgPSAnW2lkXScpID0+IHtcclxuICAgIGxldCB0YWdzID0gJyc7XHJcbiAgICBpZihlbGVtKSB7XHJcbiAgICAgICAgZm9yICg7IGVsZW0gJiYgZWxlbSAhPT0gZG9jdW1lbnQ7IGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgLy9pZiAoZWxlbS5tYXRjaGVzKHNlbGVjdG9yKSB8fCBkb2N1bWVudC5ib2R5ID09PSBlbGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggZG9jdW1lbnQuYm9keSA9PT0gZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtOiBlbGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3MsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBbXS5pbmRleE9mLmNhbGwoZWxlbS5wYXJlbnROb2RlLmNoaWxkcmVuLCBlbGVtKSArIDE7XHJcbiAgICAgICAgICAgICAgICB0YWdzICs9IGVsZW0udGFnTmFtZSArICc6bnRoLWNoaWxkKCcgKyBpbmRleCArICcpICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVNlbGVjdG9yID0gKGV2ZW50PykgPT4ge1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdG9yID0gJ2RhdGEtdGVzdGlkJztcclxuICAgIGNvbnN0IHBhcmVudCA9IGdldENsb3Nlc3RQYXJlbnQoZXZlbnQudGFyZ2V0LCBgWyR7c2VsZWN0b3J9XWApO1xyXG4gICAgY29uc3QgZmlyc3RUYWcgPSBwYXJlbnQuZWxlbS5nZXRBdHRyaWJ1dGUoW3NlbGVjdG9yXSk7XHJcbiAgICAvL2NvbnN0IGZpcnN0U2VsZWN0b3IgPSBmaXJzdFRhZyA/IGBbJHtzZWxlY3Rvcn09JyR7Zmlyc3RUYWd9J11gIDogJ0JPRFknO1xyXG4gICAgY29uc3QgZmlyc3RTZWxlY3RvciA9ICAnQk9EWSc7XHJcbiAgICBjb25zdCBjeVNlbGVjdG9yID0gYCR7Zmlyc3RTZWxlY3Rvcn0gJHtwYXJlbnQudGFncy5zcGxpdCgnICcpLnJldmVyc2UoKS5qb2luKCcgJyl9YDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3lTZWxlY3RvcixcclxuICAgICAgICB2YWx1ZTpldmVudD8udGFyZ2V0Py52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBldmVudD8udGFyZ2V0Py50ZXh0Q29udGVudCB8fCBldmVudD8udGFyZ2V0Py5pbm5lclRleHQgfHwgZXZlbnQ/LnRhcmdldD8udmFsdWVcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==