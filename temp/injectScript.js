/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/configuration/command.ts":
/*!**************************************!*\
  !*** ./src/configuration/command.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Command": () => (/* binding */ Command)
/* harmony export */ });
var Command;

(function (Command) {
  Command[Command["AddNote"] = 0] = "AddNote";
  Command[Command["UpdateNote"] = 1] = "UpdateNote";
  Command[Command["RelearnNote"] = 2] = "RelearnNote";
  Command[Command["HistoryIndex"] = 3] = "HistoryIndex";
  Command[Command["TranslateText"] = 4] = "TranslateText";
  Command[Command["PauseAudio"] = 5] = "PauseAudio";
  Command[Command["ShowTranslation"] = 6] = "ShowTranslation";
  Command[Command["OpenSelection"] = 7] = "OpenSelection";
  Command[Command["HiddenChinese"] = 8] = "HiddenChinese";
  Command[Command["BackHistory"] = 9] = "BackHistory";
  Command[Command["ForwardHistory"] = 10] = "ForwardHistory";
  Command[Command["Callback"] = 11] = "Callback";
  Command[Command["OpenSearchBox"] = 12] = "OpenSearchBox";
  Command[Command["ShowInjectTranslation"] = 13] = "ShowInjectTranslation";
  Command[Command["ShowIframe"] = 14] = "ShowIframe";
  Command[Command["GetVersion"] = 15] = "GetVersion";
  Command[Command["GetDeckNames"] = 16] = "GetDeckNames";
  Command[Command["GetModelNames"] = 17] = "GetModelNames";
  Command[Command["GetModelFieldNames"] = 18] = "GetModelFieldNames";
  Command[Command["TranslateInjectText"] = 19] = "TranslateInjectText";
})(Command || (Command = {}));

/***/ }),

/***/ "./src/configuration/index.ts":
/*!************************************!*\
  !*** ./src/configuration/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANKI_CONNECTION_MAP": () => (/* reexport safe */ _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__.ANKI_CONNECTION_MAP),
/* harmony export */   "COMMON_CONFIG_MAP": () => (/* reexport safe */ _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__.COMMON_CONFIG_MAP),
/* harmony export */   "Command": () => (/* reexport safe */ _command__WEBPACK_IMPORTED_MODULE_1__.Command),
/* harmony export */   "DEFAULT_ANKI_CONNECTION_URL": () => (/* binding */ DEFAULT_ANKI_CONNECTION_URL),
/* harmony export */   "PHRASE_FIELDS_MAP": () => (/* reexport safe */ _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__.PHRASE_FIELDS_MAP),
/* harmony export */   "SENTENCE_FIELDS_MAP": () => (/* reexport safe */ _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__.SENTENCE_FIELDS_MAP),
/* harmony export */   "WORD_FIELDS_MAP": () => (/* reexport safe */ _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__.WORD_FIELDS_MAP)
/* harmony export */ });
/* harmony import */ var _modelFieldNameMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modelFieldNameMap */ "./src/configuration/modelFieldNameMap.ts");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./command */ "./src/configuration/command.ts");


var DEFAULT_ANKI_CONNECTION_URL = "http://127.0.0.1:8765";

/***/ }),

/***/ "./src/configuration/modelFieldNameMap.ts":
/*!************************************************!*\
  !*** ./src/configuration/modelFieldNameMap.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANKI_CONNECTION_MAP": () => (/* binding */ ANKI_CONNECTION_MAP),
/* harmony export */   "COMMON_CONFIG_MAP": () => (/* binding */ COMMON_CONFIG_MAP),
/* harmony export */   "PHRASE_FIELDS_MAP": () => (/* binding */ PHRASE_FIELDS_MAP),
/* harmony export */   "SENTENCE_FIELDS_MAP": () => (/* binding */ SENTENCE_FIELDS_MAP),
/* harmony export */   "WORD_FIELDS_MAP": () => (/* binding */ WORD_FIELDS_MAP)
/* harmony export */ });
var WORD_FIELDS_MAP = {
  definition: "定义",
  word: "单词",
  translation: "翻译",
  part_of_speech: "词性",
  definition_audio: "定义音频",
  am: "美国音标",
  en: "英国音标",
  am_audio: "美国音频",
  en_audio: "英国音频",
  star_amount: "出现频率",
  example_audio: "例句音频",
  example_sentence: "例句原文",
  example_sentence_translation: "例句翻译"
};
var PHRASE_FIELDS_MAP = {
  phrase: "短语词组",
  phrase_audio: "短语音频",
  translations: "短语翻译",
  example_audio_1: "例句1音频",
  example_audio_2: "例句2音频",
  example_audio_3: "例句3音频",
  example_sentence_1: "例句1原文",
  example_sentence_2: "例句2原文",
  example_sentence_3: "例句3原文",
  example_sentence_translation_1: "例句1翻译",
  example_sentence_translation_2: "例句2翻译",
  example_sentence_translation_3: "例句3翻译"
};
var SENTENCE_FIELDS_MAP = {
  sentence: "句子原文",
  sentence_audio: "句子音频",
  sentence_translation: "句子翻译"
};
var COMMON_CONFIG_MAP = {
  deckName: "牌组名称",
  modelName: "模型名称",
  tags: "卡片标签"
};
var ANKI_CONNECTION_MAP = {
  ankiConnectionMethod: "连接方法",
  ankiConnectionURL: "连接URL"
};

if (true) {
  Object.freeze(WORD_FIELDS_MAP);
  Object.freeze(PHRASE_FIELDS_MAP);
  Object.freeze(SENTENCE_FIELDS_MAP);
  Object.freeze(COMMON_CONFIG_MAP);
  Object.freeze(ANKI_CONNECTION_MAP);
}



/***/ }),

/***/ "./src/extensions-api/browserAction.ts":
/*!*********************************************!*\
  !*** ./src/extensions-api/browserAction.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setBadgeText": () => (/* binding */ setBadgeText)
/* harmony export */ });
function setBadgeText(details, callback) {
  chrome.browserAction.setBadgeText(details, callback);
}

/***/ }),

/***/ "./src/extensions-api/commands.ts":
/*!****************************************!*\
  !*** ./src/extensions-api/commands.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onCommand": () => (/* binding */ onCommand)
/* harmony export */ });
//此处的值与 manifest 中 command对象的键相关
var onCommand = function onCommand(handlerObject) {
  //监听用户快捷键，用于开关拓展
  chrome.commands.onCommand.addListener(function (command) {
    var handler = handlerObject[command];
    handler === null || handler === void 0 ? void 0 : handler();
  });
};

if (true) {
  onCommand = function StrictOnCommand(handlerObject) {
    var _chrome$runtime$getMa = chrome.runtime.getManifest(),
        commands = _chrome$runtime$getMa.commands;

    if (!commands) throw new Error("manifest.json 文件中没有 commands 项");
    var commandNames = Object.keys(handlerObject);
    commandNames.forEach(function (command) {
      if (!(command in commands)) throw new Error("\u6CA1\u6709\u5728 commands \u4E2D\u627E\u5230 ".concat(command, " \u9879"));
    }); //监听用户快捷键，用于开关拓展

    chrome.commands.onCommand.addListener(function (command) {
      var handler = handlerObject[command];
      handler === null || handler === void 0 ? void 0 : handler();
    });
  };
}



/***/ }),

/***/ "./src/extensions-api/contextMenus.ts":
/*!********************************************!*\
  !*** ./src/extensions-api/contextMenus.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addContextMenuItem": () => (/* binding */ addContextMenuItem),
/* harmony export */   "onContextMenuClick": () => (/* binding */ onContextMenuClick)
/* harmony export */ });
function addContextMenuItem(createProperties, callback) {
  chrome.contextMenus.create(createProperties, callback);
}
function onContextMenuClick(callback) {
  chrome.contextMenus.onClicked.addListener(callback);
}

/***/ }),

/***/ "./src/extensions-api/index.ts":
/*!*************************************!*\
  !*** ./src/extensions-api/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabPanelName": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_6__.TabPanelName),
/* harmony export */   "addContextMenuItem": () => (/* reexport safe */ _contextMenus__WEBPACK_IMPORTED_MODULE_4__.addContextMenuItem),
/* harmony export */   "executeScript": () => (/* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_3__.executeScript),
/* harmony export */   "getStorageByArray": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_0__.getStorageByArray),
/* harmony export */   "getStorageByObject": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_0__.getStorageByObject),
/* harmony export */   "getURL": () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_5__.getURL),
/* harmony export */   "onCommand": () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_1__.onCommand),
/* harmony export */   "onContextMenuClick": () => (/* reexport safe */ _contextMenus__WEBPACK_IMPORTED_MODULE_4__.onContextMenuClick),
/* harmony export */   "onMessage": () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_5__.onMessage),
/* harmony export */   "onStorageChange": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_0__.onStorageChange),
/* harmony export */   "openOptionsPage": () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_5__.openOptionsPage),
/* harmony export */   "postBackend": () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_5__.postBackend),
/* harmony export */   "postFrontend": () => (/* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_3__.postFrontend),
/* harmony export */   "setBadgeText": () => (/* reexport safe */ _browserAction__WEBPACK_IMPORTED_MODULE_2__.setBadgeText),
/* harmony export */   "setStorage": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_0__.setStorage)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/extensions-api/storage.ts");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands */ "./src/extensions-api/commands.ts");
/* harmony import */ var _browserAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browserAction */ "./src/extensions-api/browserAction.ts");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs */ "./src/extensions-api/tabs.ts");
/* harmony import */ var _contextMenus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contextMenus */ "./src/extensions-api/contextMenus.ts");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runtime */ "./src/extensions-api/runtime.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./src/extensions-api/types/index.ts");








/***/ }),

/***/ "./src/extensions-api/runtime.ts":
/*!***************************************!*\
  !*** ./src/extensions-api/runtime.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getURL": () => (/* binding */ getURL),
/* harmony export */   "onMessage": () => (/* binding */ onMessage),
/* harmony export */   "openOptionsPage": () => (/* binding */ openOptionsPage),
/* harmony export */   "postBackend": () => (/* binding */ postBackend)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getURL(name) {
  return chrome.runtime.getURL(name);
}
function openOptionsPage(callback) {
  chrome.runtime.openOptionsPage(callback);
}
function postBackend(_x, _x2) {
  return _postBackend.apply(this, arguments);
}

function _postBackend() {
  _postBackend = _asyncToGenerator(function* (command, data) {
    return new Promise(function (resolve) {
      chrome.runtime.sendMessage({
        command: command,
        data: data
      }, function (response) {
        resolve(response);
      });
    });
  });
  return _postBackend.apply(this, arguments);
}

//监听拓展不同模块间消息传递的函数
function onMessage(handler) {
  chrome.runtime.onMessage.addListener(function (message, sender, _sendResponse) {
    //主要用于消除因为 return true,但却没有调用 sendResponse 而造成的报错。
    var called = false;
    handler(_objectSpread(_objectSpread({}, message), {}, {
      sendResponse: function sendResponse() {
        called = true;
        return _sendResponse.apply(void 0, arguments);
      }
    })).then(function () {
      if (called) return;

      _sendResponse();
    });
    return true; //为了使sendResponse可以异步调用，这是必须的
  });
}

/***/ }),

/***/ "./src/extensions-api/storage.ts":
/*!***************************************!*\
  !*** ./src/extensions-api/storage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStorageByArray": () => (/* binding */ getStorageByArray),
/* harmony export */   "getStorageByObject": () => (/* binding */ getStorageByObject),
/* harmony export */   "onStorageChange": () => (/* binding */ onStorageChange),
/* harmony export */   "setStorage": () => (/* binding */ setStorage)
/* harmony export */ });
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.pick */ "./node_modules/.pnpm/registry.npmmirror.com+lodash.pick@4.4.0/node_modules/lodash.pick/index.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/extensions-api/types/index.ts");


 //缓存默认值对象，用于在用户刚刚加载拓展，没有进行任何配置时作为初始配置。
//确保 Storage 中的缓存无论何时都是符合要求的，不存在刚刚加载插件时因为 Storage 为空而导致的问题。

var defaultStorage = {
  switchHotkeyAndSelectionListener: true,
  hotKey: "shiftKey",
  openSelection: true,
  hiddenChinese: false,
  checkedTabPanel: _types__WEBPACK_IMPORTED_MODULE_2__.TabPanelName.Home,
  ankiConnectionMethod: "AnkiConnection",
  ankiConnectionURL: _configuration__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ANKI_CONNECTION_URL,
  switchStrengthenSelectionByPressedCtrl: true,
  wordConfig: {},
  phraseConfig: {},
  sentenceConfig: {},
  checkWordDuplicate: {
    word: true,
    deckName: true,
    definition: true,
    translation: true
  },
  checkPhraseDuplicate: {
    phrase: true,
    deckName: true
  },
  checkSentenceDuplicate: {
    deckName: true,
    sentence: true
  }
};

function handlersIsArray(handlers) {
  return Array.isArray(handlers);
}

function getStorage(handlers, callback) {
  var storageKeys = handlersIsArray(handlers) ? handlers : Object.keys(handlers);
  var storage = lodash_pick__WEBPACK_IMPORTED_MODULE_0___default()(defaultStorage, storageKeys);
  chrome.storage.local.get(storage, function (storage) {
    if (!handlersIsArray(handlers)) {
      Object.keys(storage).forEach(function (key) {
        var handler = handlers[key];
        var cacheValue = storage[key]; //@ts-ignore 是匹配的值

        handler === null || handler === void 0 ? void 0 : handler(cacheValue);
      });
    }

    callback === null || callback === void 0 ? void 0 : callback(storage);
  });
}

function getStorageByArray(names, callback) {
  getStorage(names, callback);
}
function getStorageByObject(handlers, callback) {
  getStorage(handlers, callback);
}
function onStorageChange(handlers) {
  var listener = function listener(changes) {
    Object.keys(changes).forEach(function (key) {
      var handler = handlers[key];

      if (handler) {
        var _ref = changes[key],
            oldValue = _ref.oldValue,
            newValue = _ref.newValue; //@ts-ignore 是正确匹配的

        handler(oldValue, newValue);
      }
    });
  };

  chrome.storage.onChanged.addListener(listener);
  return function () {
    chrome.storage.onChanged.removeListener(listener);
  };
}
function setStorage(partialStorage, callback) {
  chrome.storage.local.set(partialStorage, callback);
}

/***/ }),

/***/ "./src/extensions-api/tabs.ts":
/*!************************************!*\
  !*** ./src/extensions-api/tabs.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeScript": () => (/* binding */ executeScript),
/* harmony export */   "postFrontend": () => (/* binding */ postFrontend)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//向前端发送消息的函数
function postFrontend(_x, _x2) {
  return _postFrontend.apply(this, arguments);
}

function _postFrontend() {
  _postFrontend = _asyncToGenerator(function* (command, data) {
    return new Promise(function (resolve) {
      chrome.tabs.query({
        active: true
      }, function (tabs) {
        tabs.forEach(function (tab) {
          if (!tab.id) return;
          chrome.tabs.sendMessage(tab.id, {
            command: command,
            data: data
          }, function (response) {
            resolve(response);
          });
        });
      });
    });
  });
  return _postFrontend.apply(this, arguments);
}

function executeScript(details, callback) {
  chrome.tabs.executeScript(details, callback);
}

/***/ }),

/***/ "./src/extensions-api/types/index.ts":
/*!*******************************************!*\
  !*** ./src/extensions-api/types/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabPanelName": () => (/* binding */ TabPanelName)
/* harmony export */ });
var TabPanelName;

(function (TabPanelName) {
  TabPanelName[TabPanelName["Home"] = 0] = "Home";
  TabPanelName[TabPanelName["Word"] = 1] = "Word";
  TabPanelName[TabPanelName["Phrase"] = 2] = "Phrase";
  TabPanelName[TabPanelName["Sentence"] = 3] = "Sentence";
})(TabPanelName || (TabPanelName = {}));

/***/ }),

/***/ "./src/user-operation/CursorListener.ts":
/*!**********************************************!*\
  !*** ./src/user-operation/CursorListener.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CursorListener": () => (/* binding */ CursorListener)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CursorListener = /*#__PURE__*/_createClass(function CursorListener() {
  var _this = this;

  _classCallCheck(this, CursorListener);

  _defineProperty(this, "clientPoint", {
    x: 0,
    y: 0
  });

  _defineProperty(this, "screenPoint", {
    x: 0,
    y: 0
  });

  _defineProperty(this, "getClientPoint", function () {
    return _this.clientPoint;
  });

  _defineProperty(this, "getScreenPoint", function () {
    return _this.screenPoint;
  });

  _defineProperty(this, "install", function () {
    document.addEventListener("mousemove", _this.onMouseMove, true); //避免被阻止冒泡导致失效
  });

  _defineProperty(this, "uninstall", function () {
    document.removeEventListener("mousemove", _this.onMouseMove, true);
  });

  _defineProperty(this, "onMouseMove", function (event) {
    var clientX = event.clientX,
        clientY = event.clientY,
        screenY = event.screenY,
        screenX = event.screenX;
    _this.clientPoint = {
      x: clientX,
      y: clientY
    };
    _this.screenPoint = {
      x: screenX,
      y: screenY
    };
  });
});

/***/ }),

/***/ "./src/user-operation/HotKeyListener.ts":
/*!**********************************************!*\
  !*** ./src/user-operation/HotKeyListener.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HotKeyListener": () => (/* binding */ HotKeyListener)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/user-operation/utils/index.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var HotKeyListener = /*#__PURE__*/_createClass(function HotKeyListener(translateAndDisplayText, getPoint) {
  var _this = this;

  _classCallCheck(this, HotKeyListener);

  _defineProperty(this, "modify", void 0);

  _defineProperty(this, "restore", void 0);

  _defineProperty(this, "hotKey", void 0);

  _defineProperty(this, "checkout", void 0);

  _defineProperty(this, "getPoint", void 0);

  _defineProperty(this, "translateAndDisplayText", void 0);

  _defineProperty(this, "updateHotKey", function (hotKey) {
    _this.hotKey = hotKey;
  });

  _defineProperty(this, "install", function () {
    document.addEventListener("keydown", _this.onKeyDown);
  });

  _defineProperty(this, "uninstall", function () {
    document.removeEventListener("keydown", _this.onKeyDown);

    _this.restore();
  });

  _defineProperty(this, "onKeyDown", function (event) {
    var hotKey = _this.hotKey;

    if (hotKey && event[hotKey]) {
      //当焦点在可输入元素上，不进行热键选词
      var focusNode = document.activeElement;
      if (focusNode && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isContentEditable)(focusNode)) return; //这是一个用 div 封装的 input

      if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isSearchContainer)(focusNode)) return;

      var _this$getPoint = _this.getPoint(),
          x = _this$getPoint.x,
          y = _this$getPoint.y;

      _this.autoSelectText(x, y);

      var selectedText = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getSelectionText)();
      if (!selectedText) return;

      _this.translateAndDisplayText(selectedText);
    }
  });

  _defineProperty(this, "validate", function (letter) {
    if (letter == null) return false;
    return _this.checkout.test(letter);
  });

  _defineProperty(this, "autoSelectText", function (x, y) {
    var range = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRangeFromPoint)(x, y);
    if (!range) return;
    range = _this.extendRange(range);
    if (range == null) return;
    var selection = getSelection();
    if (!selection) return; //避免因为 user-select:none 而导致 热键选中失效

    var target = range.commonAncestorContainer.parentElement;

    if (target != null) {
      _this.modify(target);
    } //只有 firefox支持多个拖蓝选中，而其它浏览器不支持，因此如果不先清空原有的range，则后面的添加无效


    selection.removeAllRanges(); //用拖蓝形式展现被选中的单词

    selection.addRange(range);
  });

  _defineProperty(this, "extendRange", function (range) {
    var textNode = range.startContainer; //并非文本节点，退出

    if (!isText(textNode)) return null;
    var limit_left = 0;
    var limit_right = textNode.length;
    var text = textNode.data;
    var startOffset = range.startOffset,
        endOffset = range.endOffset; //如果当前鼠标位置的字符不符合要求，则表明无需进行自动选取

    if (!_this.validate(text[startOffset])) return range;

    while (limit_left <= startOffset) {
      var letter = text[startOffset];

      if (_this.validate(letter)) {
        startOffset--;
      } else {
        break;
      }
    } //回退到前一个符合要求的字符


    startOffset++; //startOffset与endOffset在一开始是相等的，避免重复验证同一个字符

    endOffset++;

    while (endOffset < limit_right) {
      var _letter = text[endOffset];

      if (_this.validate(_letter)) {
        endOffset++;
      } else {
        break;
      }
    } //因为setEnd不包括endOffset，因此不用回退到上一个符合要求的字符
    //但需要注意，避免endOffset超出limit_right


    endOffset = Math.min(limit_right, endOffset);
    var newRange = new Range();
    newRange.setStart(textNode, startOffset);
    newRange.setEnd(textNode, endOffset);
    return newRange;
  });

  this.getPoint = getPoint;
  this.translateAndDisplayText = translateAndDisplayText;
  this.hotKey = "shiftKey";
  this.checkout = /[a-z_]/i;

  var _UserSelectHandler = new _utils__WEBPACK_IMPORTED_MODULE_0__.UserSelectHandler(),
      modify = _UserSelectHandler.modify,
      restore = _UserSelectHandler.restore;

  this.modify = modify;
  this.restore = restore;
});

function isText(node) {
  return node.nodeType === 3;
}

/***/ }),

/***/ "./src/user-operation/SearchBox.ts":
/*!*****************************************!*\
  !*** ./src/user-operation/SearchBox.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchBox": () => (/* binding */ SearchBox)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/user-operation/utils/index.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 允许用户通过搜索栏主动输入单词，而后对单词进行查询
 */

var SearchBox = /*#__PURE__*/_createClass(function SearchBox(translateAndDisplayText) {
  var _this = this;

  _classCallCheck(this, SearchBox);

  _defineProperty(this, "openSearchBox", void 0);

  _defineProperty(this, "closeSearchBox", void 0);

  _defineProperty(this, "container", void 0);

  _defineProperty(this, "install", function () {
    document.body.append(_this.container);
  });

  _defineProperty(this, "uninstall", function () {
    _this.closeSearchBox();

    _this.container.remove();
  });

  var _createSearchBar = createSearchBar(translateAndDisplayText),
      container = _createSearchBar.container,
      openSearchBox = _createSearchBar.openSearchBox,
      closeSearchBox = _createSearchBar.closeSearchBox;

  this.container = container;
  this.openSearchBox = openSearchBox;
  this.closeSearchBox = closeSearchBox;
});
var FORM_ID = "search-form";
var INPUT_ID = "search-input";
var BUTTON_ID = "search-button";
/**
 * 创建搜索条
 */

function createSearchBar(translateAndDisplayText) {
  var container = document.createElement("div");
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.attachSymbolToSearchContainer)(container); //实现幽灵节点

  container.style.setProperty("display", "contents", "important");
  var shadow = container.attachShadow({
    mode: "open"
  });
  shadow.innerHTML = "\n    <style>\n      #".concat(FORM_ID, " {\n        display:none;\n        box-sizing: border-box;\n        position: fixed;\n        z-index: 99999;\n        left: 50%;     \n        right: 0;       \n        top: 10vh;\n        margin: auto;\n        min-width: 200px;\n        width: 25%;\n        border: 1px solid #666;\n        border-radius: 5px;\n        background:white;\n        box-shadow: 1px 1px 2px -1px #333;\n      }\n      #").concat(INPUT_ID, " {\n        flex: 1;\n        box-sizing: border-box;\n        width: 100%;\n        border: none;\n        border-radius: 5px 0 0 5px;\n        padding: 0 10px;\n        outline: none;\n        font-size: 16px;\n        line-height: 2;\n      }\n      #").concat(BUTTON_ID, " {\n        font-size: 28px;\n        line-height: 1;\n        border: none;\n        border-radius: 0 5px 5px 0;\n        background: white;\n        outline:none;\n      }\n      #").concat(BUTTON_ID, ":hover,\n      #").concat(BUTTON_ID, ":focus {\n        background: #e6e6e6;\n      }\n      .vertical {\n        width: 1px;\n        background: #666;\n        margin: 3px 0;\n      }\n    </style>    \n    <form action=\"#\" autocomplete=\"off\" id=\"").concat(FORM_ID, "\">\n      <input type=\"text\" id=\"").concat(INPUT_ID, "\"/>\n      <span class=\"vertical\"></span>\n      <button type=\"button\" id=\"").concat(BUTTON_ID, "\">\xD7</button>\n    </form>\n  ");
  var form = shadow.getElementById(FORM_ID);
  var input = shadow.getElementById(INPUT_ID);
  var button = shadow.getElementById(BUTTON_ID); //绑定事件监听
  //当用户按下enter键时进行查询

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();

    if (text) {
      translateAndDisplayText(text);
    }
  });
  button.addEventListener("click", closeSearchBox);

  function closeSearchBox() {
    input.value = "";
    form.style.display = "none";
  }

  function openSearchBox() {
    form.style.display = "flex";
    input.focus();
    input.select();
  }

  return {
    container: container,
    openSearchBox: openSearchBox,
    closeSearchBox: closeSearchBox
  };
}

/***/ }),

/***/ "./src/user-operation/SelectionListener.ts":
/*!*************************************************!*\
  !*** ./src/user-operation/SelectionListener.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectionListener": () => (/* binding */ SelectionListener)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/user-operation/utils/index.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 双击选中翻译事件
 */

var SelectionListener = /*#__PURE__*/_createClass(function SelectionListener(translateAndDisplayText) {
  var _this = this;

  _classCallCheck(this, SelectionListener);

  _defineProperty(this, "enableCtrl", true);

  _defineProperty(this, "selectionChanged", false);

  _defineProperty(this, "translateAndDisplayText", void 0);

  _defineProperty(this, "install", function () {
    document.addEventListener("mousedown", _this.onMouseDown);
    document.addEventListener("mouseup", _this.onMouseUp);
  });

  _defineProperty(this, "uninstall", function () {
    document.removeEventListener("mousedown", _this.onMouseDown);
    document.removeEventListener("mouseup", _this.onMouseUp);
  });

  _defineProperty(this, "switchStrengthenSelectionByPressedCtrl", function (value) {
    _this.enableCtrl = value;
  });

  _defineProperty(this, "onMouseDown", function () {
    document.addEventListener("selectionchange", _this.onSelectionChange, {
      once: true
    });
  });

  _defineProperty(this, "onSelectionChange", function () {
    _this.selectionChanged = true;
  });

  _defineProperty(this, "onMouseUp", function (event) {
    if (!_this.selectionChanged) {
      document.removeEventListener("selectionchange", _this.onSelectionChange);
      return;
    }

    _this.selectionChanged = false;
    var selectedText = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getSelectionText)();
    if (!selectedText) return;
    var hotKey = event.ctrlKey;
    var focusNode = document.activeElement; //判断是否跳过对于可编辑元素的过滤

    if (!(_this.enableCtrl && hotKey)) {
      //不对输入框中的文本进行选中翻译
      if (focusNode && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isContentEditable)(focusNode)) return;
    }

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isSearchContainer)(focusNode)) return;

    _this.translateAndDisplayText(selectedText);
  });

  this.translateAndDisplayText = translateAndDisplayText;
});

/***/ }),

/***/ "./src/user-operation/index.ts":
/*!*************************************!*\
  !*** ./src/user-operation/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CursorListener": () => (/* reexport safe */ _CursorListener__WEBPACK_IMPORTED_MODULE_1__.CursorListener),
/* harmony export */   "HotKeyListener": () => (/* reexport safe */ _HotKeyListener__WEBPACK_IMPORTED_MODULE_2__.HotKeyListener),
/* harmony export */   "SearchBox": () => (/* reexport safe */ _SearchBox__WEBPACK_IMPORTED_MODULE_0__.SearchBox),
/* harmony export */   "SelectionListener": () => (/* reexport safe */ _SelectionListener__WEBPACK_IMPORTED_MODULE_3__.SelectionListener)
/* harmony export */ });
/* harmony import */ var _SearchBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchBox */ "./src/user-operation/SearchBox.ts");
/* harmony import */ var _CursorListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CursorListener */ "./src/user-operation/CursorListener.ts");
/* harmony import */ var _HotKeyListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HotKeyListener */ "./src/user-operation/HotKeyListener.ts");
/* harmony import */ var _SelectionListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectionListener */ "./src/user-operation/SelectionListener.ts");
 //创建一个搜索框，允许用户搜索

 //实时监听鼠标位置

 //监听用户热键选词翻译的操作

 //监听用户双击、拖蓝选中翻译的操作

/***/ }),

/***/ "./src/user-operation/utils/UserSelectHandler.ts":
/*!*******************************************************!*\
  !*** ./src/user-operation/utils/UserSelectHandler.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSelectHandler": () => (/* binding */ UserSelectHandler)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var USER_SELECT = "user-select";
var UserSelectHandler = /*#__PURE__*/_createClass(function UserSelectHandler() {
  var _this = this;

  _classCallCheck(this, UserSelectHandler);

  _defineProperty(this, "modifiedHTMLElements", new Map());

  _defineProperty(this, "modify", function (element) {
    var modifiedHTMLElements = _this.modifiedHTMLElements;

    if (!modifiedHTMLElements.has(element)) {
      var userSelectValue = element.style.getPropertyValue(USER_SELECT);
      var userSelectPriority = element.style.getPropertyPriority(USER_SELECT);
      modifiedHTMLElements.set(element, [userSelectValue, userSelectPriority]);
      element.style.setProperty(USER_SELECT, "text", "important");
    }
  });

  _defineProperty(this, "restore", function () {
    var modifiedHTMLElements = _this.modifiedHTMLElements;
    modifiedHTMLElements.forEach(function (_ref, element) {
      var _ref2 = _slicedToArray(_ref, 2),
          value = _ref2[0],
          priority = _ref2[1];

      element.style.setProperty(USER_SELECT, value, priority);
    });
    modifiedHTMLElements.clear();
  });
});

/***/ }),

/***/ "./src/user-operation/utils/getRangeFromPoint.ts":
/*!*******************************************************!*\
  !*** ./src/user-operation/utils/getRangeFromPoint.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRangeFromPoint": () => (/* binding */ getRangeFromPoint)
/* harmony export */ });
/**
 * 对 document.caretPositionFromPoint/caretRangeFromPoint 进行浏览器兼容处理
 * @param x clientX
 * @param y clientY
 * @returns Range
 */
function getRangeFromPoint(x, y) {
  if ("caretRangeFromPoint" in document) {
    return document.caretRangeFromPoint(x, y);
  }

  if ("caretPositionFromPoint" in document) {
    //@ts-ignore 该方法存在于firefox
    var caretPosition = document.caretPositionFromPoint(x, y);
    if (!caretPosition) return null;
    var offsetNode = caretPosition.offsetNode,
        offset = caretPosition.offset;
    var range = document.createRange();
    range.setStart(offsetNode, offset);
    return range;
  }

  if (true) {
    throw new Error("没有在 document 上找到 'caretPositionFromPoint' 或者 'caretRangeFromPoint' 方法，无法实现热键选中功能。");
  }

  return null;
}

/***/ }),

/***/ "./src/user-operation/utils/getSelectionText.ts":
/*!******************************************************!*\
  !*** ./src/user-operation/utils/getSelectionText.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSelectionText": () => (/* binding */ getSelectionText)
/* harmony export */ });
function getSelectionText() {
  var selection = getSelection();
  return selection === null || selection === void 0 ? void 0 : selection.toString().trim();
}

/***/ }),

/***/ "./src/user-operation/utils/index.ts":
/*!*******************************************!*\
  !*** ./src/user-operation/utils/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSelectHandler": () => (/* reexport safe */ _UserSelectHandler__WEBPACK_IMPORTED_MODULE_3__.UserSelectHandler),
/* harmony export */   "attachSymbolToSearchContainer": () => (/* reexport safe */ _verifySearchContainer__WEBPACK_IMPORTED_MODULE_4__.attachSymbolToSearchContainer),
/* harmony export */   "getRangeFromPoint": () => (/* reexport safe */ _getRangeFromPoint__WEBPACK_IMPORTED_MODULE_1__.getRangeFromPoint),
/* harmony export */   "getSelectionText": () => (/* reexport safe */ _getSelectionText__WEBPACK_IMPORTED_MODULE_0__.getSelectionText),
/* harmony export */   "isContentEditable": () => (/* reexport safe */ _isContentEditable__WEBPACK_IMPORTED_MODULE_2__.isContentEditable),
/* harmony export */   "isSearchContainer": () => (/* reexport safe */ _verifySearchContainer__WEBPACK_IMPORTED_MODULE_4__.isSearchContainer)
/* harmony export */ });
/* harmony import */ var _getSelectionText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getSelectionText */ "./src/user-operation/utils/getSelectionText.ts");
/* harmony import */ var _getRangeFromPoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getRangeFromPoint */ "./src/user-operation/utils/getRangeFromPoint.ts");
/* harmony import */ var _isContentEditable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isContentEditable */ "./src/user-operation/utils/isContentEditable.ts");
/* harmony import */ var _UserSelectHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserSelectHandler */ "./src/user-operation/utils/UserSelectHandler.ts");
/* harmony import */ var _verifySearchContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./verifySearchContainer */ "./src/user-operation/utils/verifySearchContainer.ts");






/***/ }),

/***/ "./src/user-operation/utils/isContentEditable.ts":
/*!*******************************************************!*\
  !*** ./src/user-operation/utils/isContentEditable.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isContentEditable": () => (/* binding */ isContentEditable)
/* harmony export */ });
function isContentEditable(element) {
  if (["INPUT", "TEXTAREA"].includes(element.tagName)) return true;
  if (element instanceof HTMLElement && element.isContentEditable) return true;
  return false;
}

/***/ }),

/***/ "./src/user-operation/utils/verifySearchContainer.ts":
/*!***********************************************************!*\
  !*** ./src/user-operation/utils/verifySearchContainer.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attachSymbolToSearchContainer": () => (/* binding */ attachSymbolToSearchContainer),
/* harmony export */   "isSearchContainer": () => (/* binding */ isSearchContainer)
/* harmony export */ });
var SEARCH_CONTAINER_ID = "ANKI_BROWSER_EXTENSIONS_SEARCH_CONTAINER_ID";
var ATTRIBUTE_NAME = "ANKI_BROWSER_EXTENSIONS_SEARCH_CONTAINER_ATTRIBUTE_NAME";
function isSearchContainer(element) {
  if (element == null) return false;
  if (!(element instanceof HTMLElement)) return false;
  return element.getAttribute(ATTRIBUTE_NAME) === SEARCH_CONTAINER_ID;
}
function attachSymbolToSearchContainer(element) {
  element.setAttribute(ATTRIBUTE_NAME, SEARCH_CONTAINER_ID);
}

/***/ }),

/***/ "./src/utils/Messenger.ts":
/*!********************************!*\
  !*** ./src/utils/Messenger.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Messenger": () => (/* binding */ Messenger)
/* harmony export */ });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/utils/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 对 window.addEventListener("message",callback) 与 window.postMessage 进行二次封装，
 *  使window.postMessage具备回调函数功能
 */


var uniqueId = 1;
var CALLBACK = "CALLBACK";
var Messenger = /*#__PURE__*/function () {
  function Messenger(options) {
    var _this = this;

    _classCallCheck(this, Messenger);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "self", void 0);

    _defineProperty(this, "callbacks", void 0);

    _defineProperty(this, "handlers", void 0);

    _defineProperty(this, "install", function () {
      var self = _this.self;
      self.addEventListener("message", _this.handleMessage);
    });

    _defineProperty(this, "uninstall", function () {
      var self = _this.self;
      self.removeEventListener("message", _this.handleMessage);
    });

    _defineProperty(this, "addTarget", function (target) {
      _this.target = target;
    });

    _defineProperty(this, "handleMessage", function (event) {
      var target = _this.target,
          handlers = _this.handlers,
          callbacks = _this.callbacks;
      var source = event.source;
      var _event$data = event.data,
          data = _event$data.data,
          command = _event$data.command,
          callbackName = _event$data.callbackName;
      if (target !== source) return;
      var callback = callbackName == null ? null : callbacks[callbackName]; // 注释一
      //执行回调专用指令(回调函数响应)
      //@ts-ignore 内部使用，不对外暴露

      if (command === CALLBACK && callback == null) return; //@ts-ignore 内部使用，不对外暴露

      if (command === CALLBACK && callback) {
        callback(data); //@ts-ignore 根据 注释一 ,callback 存在，则 callbackName 必定不为 undefined

        delete callbacks[callbackName];
        return;
      }

      if (true) {
         true ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.warning)(handlers[command] != null && handlers[command].length !== 0, "\u5BF9\u4E8E\u6307\u4EE4 ".concat(_configuration__WEBPACK_IMPORTED_MODULE_0__.Command[command], " ,\u672A\u6DFB\u52A0\u4EFB\u4F55\u5904\u7406\u51FD\u6570")) : 0;
      }

      if (handlers[command] != null) {
        handlers[command].forEach(function (fn) {
          fn(data, function (data) {
            //传递给用户的回调函数，下面是内部发送逻辑
            if (callbackName != null) {
              //只有设置了回调函数的指令调用该方法时才有效。
              //@ts-ignore CALLBACK 为内部使用的，用于触发回调
              _this.postMessage(CALLBACK, data, callbackName);
            }
          });
        });
      }
    });

    this.self = options.self;
    this.target = options.target;
    this.handlers = Object.create(null);
    this.callbacks = Object.create(null);
    this.onMessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  _createClass(Messenger, [{
    key: "onMessage",
    value: function onMessage(command, listener) {
      var handlers = this.handlers;

      if (handlers[command] == null) {
        handlers[command] = [listener];
      } else {
        handlers[command].push(listener);
      } //单例


      var called = false;
      return function () {
        if (called) return;
        called = true;
        handlers[command] = handlers[command].filter(function (fn) {
          return fn !== listener;
        });
      };
    } //agent to translation-page

  }, {
    key: "postMessage",
    value: function postMessage(command, data, callback) {
      var target = this.target; //此处应该使用报错的 invariant 而非 warning，因为其执行会添加回调函数，如果不报错属于内存泄漏

      if (!target) {
         true ?  true ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "target 不存在，其在通信中是必须的") : 0 : 0;
      }
      /* 因为浏览器的postMessage不提供原生的响应回调功能，因此需要自定义实现
       * 设置回调时:(postMessage)
       *   如果存在回调函数，则创建一个唯一的ID保存该回调函数
       *   该唯一ID保存在 data.callbackName 中，随请求携带
       * 执行回调时:(onMessage)
       *   定义收到command为"callback"的指令时，调用缓存的回调函数
       *   该指令的data[callbackName]应该有值，通过该值进行正确的回调匹配
       */
      //确保data是引用数据类型


      var message = Object.create(null);
      message.data = data;
      message.command = command; //如果传递的是number，则说明该次调用是为了触发回调，因为标识是number，所以此处判断number
      //与用户无关，是触发回调的内部逻辑

      if (typeof callback === "number") {
        message.callbackName = callback;
      }

      if (typeof callback === "function") {
        var callbackName = uniqueId;
        this.callbacks[callbackName] = callback;
        message.callbackName = callbackName;
        uniqueId++; //保证唯一性
      }

      target.postMessage(message, "*");
    }
  }]);

  return Messenger;
}();

/***/ }),

/***/ "./src/utils/alert.ts":
/*!****************************!*\
  !*** ./src/utils/alert.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invariant": () => (/* binding */ invariant),
/* harmony export */   "warning": () => (/* binding */ warning)
/* harmony export */ });
/**
 * invariant 与 warning 的名称不应该改变，其会被 babel的 "babel-plugin-dev-expression" 插件替换，
 *  具体可看："https://www.npmjs.com/package/babel-plugin-dev-expression"
 */
function invariant(cond, message) {
  if (!cond) throw new Error(message);
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);

    try {
      //这样的写法是为了便于调试，能够使其支持 “在遇到异常时暂停”（如果选中该调试功能的话）
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Messenger": () => (/* reexport safe */ _Messenger__WEBPACK_IMPORTED_MODULE_2__.Messenger),
/* harmony export */   "extractEntry": () => (/* binding */ extractEntry),
/* harmony export */   "invariant": () => (/* reexport safe */ _alert__WEBPACK_IMPORTED_MODULE_0__.invariant),
/* harmony export */   "validateText": () => (/* reexport safe */ _validateText__WEBPACK_IMPORTED_MODULE_1__.validateText),
/* harmony export */   "warning": () => (/* reexport safe */ _alert__WEBPACK_IMPORTED_MODULE_0__.warning)
/* harmony export */ });
/* harmony import */ var _alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alert */ "./src/utils/alert.ts");
/* harmony import */ var _validateText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validateText */ "./src/utils/validateText.ts");
/* harmony import */ var _Messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Messenger */ "./src/utils/Messenger.ts");




/**
 * 纯函数，Object.entries()的单一版本，只提取单个键的[key,value]
 */
function extractEntry(target, key) {
  return [key, target[key]];
}

/***/ }),

/***/ "./src/utils/validateText.ts":
/*!***********************************!*\
  !*** ./src/utils/validateText.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateText": () => (/* binding */ validateText)
/* harmony export */ });
/**
 * 纯函数，过滤掉无效查询
 *  - 字符串为空的情况
 *  - 查询主体并非英文
 * @param text
 * @return 返回过滤后的字符，该字符应当是符合查询要求的
 */
function validateText(text) {
  var _text$match;

  text = text.trim(); //过滤为空的字符串

  if (!text) return false; //如果英文字母数量不足百分之五十，则认为其并非需要查询的内容

  var amount = (_text$match = text.match(/\b[a-z]+\b/gi)) === null || _text$match === void 0 ? void 0 : _text$match.reduce(function (amount, item) {
    return amount + item.length;
  }, 0);
  if (!amount || amount / text.length < 0.5) return false; //过滤用户对URL的复制的查询

  if (text.search(/http:|https:/gi) === 0) return false;
  return true;
}

/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+lodash.pick@4.4.0/node_modules/lodash.pick/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+lodash.pick@4.4.0/node_modules/lodash.pick/index.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = baseRest(function(object, props) {
  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
});

module.exports = pick;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./src/inject-script/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/user-operation */ "./src/user-operation/index.ts");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ "./src/utils/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 用于右键菜单注入的代码
 */



 //添加获取鼠标位置的监听

var cursorListener = new _user_operation__WEBPACK_IMPORTED_MODULE_0__.CursorListener();
var getClientPoint = cursorListener.getClientPoint,
    getScreenPoint = cursorListener.getScreenPoint;
var selectionListener = new _user_operation__WEBPACK_IMPORTED_MODULE_0__.SelectionListener(translateText);
var hotKeyListener = new _user_operation__WEBPACK_IMPORTED_MODULE_0__.HotKeyListener(translateText, getClientPoint);
cursorListener.install();

function translateText(_x) {
  return _translateText.apply(this, arguments);
}

function _translateText() {
  _translateText = _asyncToGenerator(function* (text) {
    //过滤掉非英文
    var result = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.validateText)(text);
    if (!result) return;
    var point = getScreenPoint();
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.postBackend)(_configuration__WEBPACK_IMPORTED_MODULE_3__.Command.TranslateInjectText, {
      text: text,
      point: point
    });
  });
  return _translateText.apply(this, arguments);
}

function openSelectionAndHotKeyListener() {
  hotKeyListener.install();
  selectionListener.install();
}

function closeSelectionAndHotKeyListener() {
  hotKeyListener.uninstall();
  selectionListener.uninstall();
}

(0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.getStorageByObject)({
  switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(value) {
    return value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener();
  },
  hotKey: function hotKey(value) {
    return hotKeyListener.updateHotKey(value);
  },
  switchStrengthenSelectionByPressedCtrl: function switchStrengthenSelectionByPressedCtrl(value) {
    return selectionListener.switchStrengthenSelectionByPressedCtrl(value);
  }
});
(0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.onStorageChange)({
  switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(_, value) {
    return value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener();
  },
  hotKey: function hotKey(_, value) {
    return hotKeyListener.updateHotKey(value);
  },
  switchStrengthenSelectionByPressedCtrl: function switchStrengthenSelectionByPressedCtrl(_, value) {
    return selectionListener.switchStrengthenSelectionByPressedCtrl(value);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=injectScript.js.map