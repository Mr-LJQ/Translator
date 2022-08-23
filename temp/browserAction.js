(self["webpackChunktranslator_extensions"] = self["webpackChunktranslator_extensions"] || []).push([["browserAction"],{

/***/ "./src/browser-action/HotKeySelect.tsx":
/*!*********************************************!*\
  !*** ./src/browser-action/HotKeySelect.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HotKeySelect": () => (/* binding */ HotKeySelect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var hotkeys = ["altKey", "shiftKey", "ctrlKey"];
var HotKeySelect = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function HotKeySelect(props) {
  var hotKey = props.hotKey,
      handleChange = props.handleChange;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    title: "\u5207\u6362\u7528\u4E8E\u53D6\u8BCD\u7684\u70ED\u952E",
    className: " flex items-center justify-between p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "selectionHotkey",
    className: "text-lg"
  }, "\u53D6\u8BCD\u70ED\u952E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: hotKey,
    id: "selectionHotkey",
    name: "selectionHotkey",
    onChange: handleChange,
    className: " \r rounded-full\r h-8 w-20  \r bg-gray-600\r text-white\r pl-2\r cursor-pointer  \r focus:outline-none  \r focus:ring-2  \r focus:ring-offset-2  \r focus:ring-offset-slate-50 \r "
  }, hotkeys.map(function (hotKey) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      value: hotKey,
      key: hotKey
    }, hotKey.slice(0, -3).replace(/^[a-z]/gi, function (letter) {
      return letter.toUpperCase();
    }));
  })));
});

/***/ }),

/***/ "./src/browser-action/Popup.tsx":
/*!**************************************!*\
  !*** ./src/browser-action/Popup.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
/* harmony import */ var _Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Switch */ "./src/browser-action/Switch.tsx");
/* harmony import */ var _HotKeySelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HotKeySelect */ "./src/browser-action/HotKeySelect.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Popup = /*#__PURE__*/function (_React$Component) {
  _inherits(Popup, _React$Component);

  var _super = _createSuper(Popup);

  function Popup() {
    var _this;

    _classCallCheck(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hotKey: "shiftKey",
      switchHotkeyAndSelectionListener: true,
      switchStrengthenSelectionByPressedCtrl: true
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenOptionsPage", function () {
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.setStorage)({
        checkedTabPanel: _extensions_api__WEBPACK_IMPORTED_MODULE_1__.TabPanelName.Home
      }, _extensions_api__WEBPACK_IMPORTED_MODULE_1__.openOptionsPage);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSwitchOpen", function () {
      var switchHotkeyAndSelectionListener = _this.state.switchHotkeyAndSelectionListener;
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.setStorage)({
        switchHotkeyAndSelectionListener: !switchHotkeyAndSelectionListener
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var hotKey = event.target.value;
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.setStorage)({
        hotKey: hotKey
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleStrengthenSelectionByPressedCtrl", function () {
      var switchStrengthenSelectionByPressedCtrl = _this.state.switchStrengthenSelectionByPressedCtrl;
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.setStorage)({
        switchStrengthenSelectionByPressedCtrl: !switchStrengthenSelectionByPressedCtrl
      });
    });

    return _this;
  }

  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.getStorageByArray)(["hotKey", "switchHotkeyAndSelectionListener", "switchStrengthenSelectionByPressedCtrl"], function (_ref) {
        var hotKey = _ref.hotKey,
            switchHotkeyAndSelectionListener = _ref.switchHotkeyAndSelectionListener,
            switchStrengthenSelectionByPressedCtrl = _ref.switchStrengthenSelectionByPressedCtrl;

        _this2.setState({
          hotKey: hotKey,
          switchHotkeyAndSelectionListener: switchHotkeyAndSelectionListener,
          switchStrengthenSelectionByPressedCtrl: switchStrengthenSelectionByPressedCtrl
        });
      });
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.onStorageChange)({
        switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(_, _switchHotkeyAndSelectionListener) {
          return _this2.setState({
            switchHotkeyAndSelectionListener: _switchHotkeyAndSelectionListener
          });
        },
        hotKey: function hotKey(_, _hotKey) {
          return _this2.setState({
            hotKey: _hotKey
          });
        },
        switchStrengthenSelectionByPressedCtrl: function switchStrengthenSelectionByPressedCtrl(_, _switchStrengthenSelectionByPressedCtrl) {
          return _this2.setState({
            switchStrengthenSelectionByPressedCtrl: _switchStrengthenSelectionByPressedCtrl
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          hotKey = _this$state.hotKey,
          switchHotkeyAndSelectionListener = _this$state.switchHotkeyAndSelectionListener,
          switchStrengthenSelectionByPressedCtrl = _this$state.switchStrengthenSelectionByPressedCtrl;
      var handleChange = this.handleChange,
          handleSwitchOpen = this.handleSwitchOpen,
          handleOpenOptionsPage = this.handleOpenOptionsPage,
          handleStrengthenSelectionByPressedCtrl = this.handleStrengthenSelectionByPressedCtrl;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Header, {
        openOptionsPage: handleOpenOptionsPage
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", {
        className: " bg-gray-200  rounded-tl-sm "
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Switch__WEBPACK_IMPORTED_MODULE_2__["default"], {
        enabled: switchHotkeyAndSelectionListener,
        setEnabled: handleSwitchOpen,
        title: "\u505C\u7528\u5212\u8BCD\u529F\u80FD\u4E0E\u70ED\u952E\u9009\u8BCD\u529F\u80FD"
      }, "\u5F00\u5173\u63D2\u4EF6"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Switch__WEBPACK_IMPORTED_MODULE_2__["default"], {
        enabled: switchStrengthenSelectionByPressedCtrl,
        setEnabled: handleStrengthenSelectionByPressedCtrl,
        title: "\u589E\u5F3A\u5212\u8BCD\u529F\u80FD\u7684\u6548\u679C\uFF0C\u4F7F\u5176\u5728\u6309\u4F4FCtrl\u952E\u65F6\uFF0C\u80FD\u591F\u67E5\u8BE2\u53EF\u7F16\u8F91\u6846\u4E2D\u7684\u6587\u672C\u5E76\u4E14\u53EF\u4EE5\u9009\u4E2D\u90E8\u5206\u672C\u6765\u4E0D\u53EF\u4EE5\u9009\u4E2D\u7684\u6587\u672C"
      }, "\u5212\u8BCD\u589E\u5F3A"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_HotKeySelect__WEBPACK_IMPORTED_MODULE_3__.HotKeySelect, {
        hotKey: hotKey,
        handleChange: handleChange
      })));
    }
  }]);

  return Popup;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));
var Header = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function Header(props) {
  var openOptionsPage = props.openOptionsPage;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", {
    className: "p-1 border rounded-tr-sm text-xl  font-bold text-white bg-blue-gray "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "inline"
  }, "Options"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: openOptionsPage,
    title: "\u6253\u5F00\u914D\u7F6E\u9875,\u8FDB\u884C\u66F4\u591A\u914D\u7F6E",
    className: " float-right mr-1 outline-none cursor-pointer focus:text-blue-400 "
  }, "..."));
});

/***/ }),

/***/ "./src/browser-action/Switch.tsx":
/*!***************************************!*\
  !*** ./src/browser-action/Switch.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/switch/switch.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function Component(props) {
  var children = props.children,
      enabled = props.enabled,
      setEnabled = props.setEnabled,
      title = props.title;
  console.log(title);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Switch.Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between p-1",
    title: title
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Switch.Label, {
    className: "text-lg"
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Switch, {
    checked: enabled,
    onChange: setEnabled,
    className: "\n            relative\n            inline-flex \n            h-8  w-20 \n            items-center \n            justify-between  \n            rounded-full  \n            font-bold  \n            bg-gray-600  \n            focus:outline-none  \n            focus:ring-2  \n            focus:ring-offset-2  \n            focus:ring-offset-slate-50  \n            select-none  \n            cursor-pointer \n          "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    "aria-hidden": !enabled,
    className: "\r float-left\r duration-500\r transition-colors\r pl-3\r text-gray-50\r prior:text-green-viridity\r "
  }, "\u5F00"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    "aria-hidden": enabled,
    className: " float-right pr-3 text-gray-50  "
  }, "\u5173"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    "aria-hidden": "true",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      "prior:left-8 prior:bg-green-viridity": enabled
    }, " absolute\n                left-0\n                w-10 h-6 \n                m-1 rounded-full\n                bg-white \n                transition-all\n              ")
  }))));
}));

/***/ }),

/***/ "./src/browser-action/index.tsx":
/*!**************************************!*\
  !*** ./src/browser-action/index.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/.pnpm/registry.npmmirror.com+react-dom@18.2.0_react@18.2.0/node_modules/react-dom/client.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Popup */ "./src/browser-action/Popup.tsx");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index.css */ "./src/index.css");




var root = document.getElementById("root");
root.classList.add("w-44", "m-1", "text-sm");
(0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root).render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Popup__WEBPACK_IMPORTED_MODULE_2__.Popup, null));

/***/ }),

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


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+react-dom@18.2.0_react@18.2.0/node_modules/react-dom/client.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+react-dom@18.2.0_react@18.2.0/node_modules/react-dom/client.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "./node_modules/.pnpm/registry.npmmirror.com+react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/description/description.js":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/description/description.js ***!
  \********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Description": () => (/* binding */ F),
/* harmony export */   "useDescriptions": () => (/* binding */ k)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js");
let d=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function u(){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(d);if(r===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,u),t}return r}function k(){let[r,t]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return[r.length>0?r.join(" "):void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(e){let i=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(n=>(t(o=>[...o,n]),()=>t(o=>{let c=o.slice(),p=c.indexOf(n);return p!==-1&&c.splice(p,1),c}))),s=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({register:i,slot:e.slot,name:e.name,props:e.props}),[i,e.slot,e.name,e.props]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(d.Provider,{value:s},e.children)},[t])]}let S="p",F=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.forwardRefWithAs)(function(t,a){let e=u(),i=`headlessui-description-${(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__.useId)()}`,s=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(a);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__.useIsoMorphicEffect)(()=>e.register(i),[i,e.register]);let n=t,o={ref:s,...e.props,id:i};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.render)({ourProps:o,theirProps:n,slot:e.slot||{},defaultTag:S,name:e.name||"Description"})});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/keyboard.js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/keyboard.js ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keys": () => (/* binding */ o)
/* harmony export */ });
var o=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(o||{});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/label/label.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/label/label.js ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Label": () => (/* binding */ F),
/* harmony export */   "useLabels": () => (/* binding */ M)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js");
let u=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function c(){let o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(u);if(o===null){let t=new Error("You used a <Label /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,c),t}return o}function M(){let[o,t]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return[o.length>0?o.join(" "):void 0,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>function(e){let l=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(a=>(t(i=>[...i,a]),()=>t(i=>{let n=i.slice(),d=n.indexOf(a);return d!==-1&&n.splice(d,1),n}))),r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({register:l,slot:e.slot,name:e.name,props:e.props}),[l,e.slot,e.name,e.props]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(u.Provider,{value:r},e.children)},[t])]}let h="label",F=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.forwardRefWithAs)(function(t,s){let{passive:e=!1,...l}=t,r=c(),a=`headlessui-label-${(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_3__.useId)()}`,i=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(s);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_5__.useIsoMorphicEffect)(()=>r.register(a),[a,r.register]);let n={ref:i,...r.props,id:a};return e&&("onClick"in n&&delete n.onClick,"onClick"in l&&delete l.onClick),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.render)({ourProps:n,theirProps:l,slot:r.slot||{},defaultTag:h,name:r.name||"Label"})});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/switch/switch.js":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/switch/switch.js ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Switch": () => (/* binding */ ue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../keyboard.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _utils_bugs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/bugs.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/bugs.js");
/* harmony import */ var _label_label_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../label/label.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/label/label.js");
/* harmony import */ var _description_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../description/description.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/description/description.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../internal/hidden.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/hidden.js");
/* harmony import */ var _utils_form_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/form.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/form.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js");
let p=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);p.displayName="GroupContext";let j=react__WEBPACK_IMPORTED_MODULE_0__.Fragment;function N(m){let[n,i]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[r,s]=(0,_label_label_js__WEBPACK_IMPORTED_MODULE_1__.useLabels)(),[l,c]=(0,_description_description_js__WEBPACK_IMPORTED_MODULE_2__.useDescriptions)(),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({switch:n,setSwitch:i,labelledby:r,describedby:l}),[n,i,r,l]),u={},e=m;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(c,{name:"Switch.Description"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(s,{name:"Switch.Label",props:{onClick(){!n||(n.click(),n.focus({preventScroll:!0}))}}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(p.Provider,{value:d},(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:u,theirProps:e,defaultTag:j,name:"Switch.Group"}))))}let $="button",q=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(n,i){let{checked:r,onChange:s,name:l,value:c,...d}=n,u=`headlessui-switch-${(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_4__.useId)()}`,e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(p),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),S=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_5__.useSyncRefs)(f,i,e===null?null:e.setSwitch),h=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(()=>s(!r)),E=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(t=>{if((0,_utils_bugs_js__WEBPACK_IMPORTED_MODULE_7__.isDisabledReactIssue7711)(t.currentTarget))return t.preventDefault();t.preventDefault(),h()}),w=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(t=>{t.key===_keyboard_js__WEBPACK_IMPORTED_MODULE_8__.Keys.Space?(t.preventDefault(),h()):t.key===_keyboard_js__WEBPACK_IMPORTED_MODULE_8__.Keys.Enter&&(0,_utils_form_js__WEBPACK_IMPORTED_MODULE_9__.attemptSubmit)(t.currentTarget)}),P=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(t=>t.preventDefault()),v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({checked:r}),[r]),g={id:u,ref:S,role:"switch",type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_10__.useResolveButtonType)(n,f),tabIndex:0,"aria-checked":r,"aria-labelledby":e==null?void 0:e.labelledby,"aria-describedby":e==null?void 0:e.describedby,onClick:E,onKeyUp:w,onKeyPress:P};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,l!=null&&r&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Hidden,{features:_internal_hidden_js__WEBPACK_IMPORTED_MODULE_11__.Features.Hidden,...(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.compact)({as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:r,name:l,value:c})}),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:g,theirProps:d,slot:v,defaultTag:$,name:"Switch"}))}),ue=Object.assign(q,{Group:N,Label:_label_label_js__WEBPACK_IMPORTED_MODULE_1__.Label,Description:_description_description_js__WEBPACK_IMPORTED_MODULE_2__.Description});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEvent": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-latest-value.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
let o=function(t){let e=(0,_use_latest_value_js__WEBPACK_IMPORTED_MODULE_1__.useLatestValue)(t);return react__WEBPACK_IMPORTED_MODULE_0__.useCallback((...r)=>e.current(...r),[e])};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js ***!
  \**********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useId": () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-server-handoff-complete.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js");
var u;let l=0;function r(){return++l}let I=(u=react__WEBPACK_IMPORTED_MODULE_0__.useId)!=null?u:function(){let n=(0,_use_server_handoff_complete_js__WEBPACK_IMPORTED_MODULE_1__.useServerHandoffComplete)(),[e,o]=react__WEBPACK_IMPORTED_MODULE_0__.useState(n?r:null);return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_2__.useIsoMorphicEffect)(()=>{e===null&&o(r())},[e]),e!=null?""+e:void 0};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js ***!
  \**************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsoMorphicEffect": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
let t=typeof window!="undefined"?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-latest-value.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-latest-value.js ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useLatestValue": () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
function s(e){let r=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(e);return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{r.current=e},[e]),r}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useResolveButtonType": () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
function i(t){var n;if(t.type)return t.type;let e=(n=t.as)!=null?n:"button";if(typeof e=="string"&&e.toLowerCase()==="button")return"button"}function s(t,e){let[n,u]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>i(t));return (0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{u(i(t))},[t.type,t.as]),(0,_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_1__.useIsoMorphicEffect)(()=>{n||!e.current||e.current instanceof HTMLButtonElement&&!e.current.hasAttribute("type")&&u("button")},[n,e]),n}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useServerHandoffComplete": () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
let r={serverHandoffComplete:!1};function a(){let[e,f]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(r.serverHandoffComplete);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{e!==!0&&f(!0)},[e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{r.serverHandoffComplete===!1&&(r.serverHandoffComplete=!0)},[]),e}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "optionalRef": () => (/* binding */ T),
/* harmony export */   "useSyncRefs": () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _use_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-event.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js");
let u=Symbol();function T(t,n=!0){return Object.assign(t,{[u]:n})}function y(...t){let n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(t);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n.current=t},[t]);let c=(0,_use_event_js__WEBPACK_IMPORTED_MODULE_1__.useEvent)(e=>{for(let o of n.current)o!=null&&(typeof o=="function"?o(e):o.current=e)});return t.every(e=>e==null||(e==null?void 0:e[u]))?void 0:c}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/hidden.js":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/hidden.js ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Features": () => (/* binding */ s),
/* harmony export */   "Hidden": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js");
let a="div";var s=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(s||{});let h=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.forwardRefWithAs)(function(t,o){let{features:e=1,...r}=t,d={ref:o,"aria-hidden":(e&2)===2?!0:void 0,style:{position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(e&4)===4&&(e&2)!==2&&{display:"none"}}};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)({ourProps:d,theirProps:r,slot:{},defaultTag:a,name:"Hidden"})});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/bugs.js":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/bugs.js ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDisabledReactIssue7711": () => (/* binding */ r)
/* harmony export */ });
function r(n){let e=n.parentElement,l=null;for(;e&&!(e instanceof HTMLFieldSetElement);)e instanceof HTMLLegendElement&&(l=e),e=e.parentElement;let t=(e==null?void 0:e.getAttribute("disabled"))==="";return t&&i(l)?!1:t}function i(n){if(!n)return!1;let e=n.previousElementSibling;for(;e!==null;){if(e instanceof HTMLLegendElement)return!1;e=e.previousElementSibling}return!0}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/form.js":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/form.js ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attemptSubmit": () => (/* binding */ p),
/* harmony export */   "objectToFormEntries": () => (/* binding */ e)
/* harmony export */ });
function e(n={},r=null,t=[]){for(let[i,o]of Object.entries(n))f(t,s(r,i),o);return t}function s(n,r){return n?n+"["+r+"]":r}function f(n,r,t){if(Array.isArray(t))for(let[i,o]of t.entries())f(n,s(r,i.toString()),o);else t instanceof Date?n.push([r,t.toISOString()]):typeof t=="boolean"?n.push([r,t?"1":"0"]):typeof t=="string"?n.push([r,t]):typeof t=="number"?n.push([r,`${t}`]):t==null?n.push([r,""]):e(t,r,n)}function p(n){var t;let r=(t=n==null?void 0:n.form)!=null?t:n.closest("form");if(!!r){for(let i of r.elements)if(i.tagName==="INPUT"&&i.type==="submit"||i.tagName==="BUTTON"&&i.type==="submit"||i.nodeName==="INPUT"&&i.type==="image"){i.click();return}}}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "match": () => (/* binding */ u)
/* harmony export */ });
function u(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,u),t}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js ***!
  \**********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Features": () => (/* binding */ x),
/* harmony export */   "RenderStrategy": () => (/* binding */ R),
/* harmony export */   "compact": () => (/* binding */ g),
/* harmony export */   "forwardRefWithAs": () => (/* binding */ H),
/* harmony export */   "render": () => (/* binding */ _)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js");
var x=(n=>(n[n.None=0]="None",n[n.RenderStrategy=1]="RenderStrategy",n[n.Static=2]="Static",n))(x||{}),R=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(R||{});function _({ourProps:r,theirProps:t,slot:e,defaultTag:n,features:a,visible:s=!0,name:l}){let o=y(t,r);if(s)return f(o,e,n,l);let d=a!=null?a:0;if(d&2){let{static:i=!1,...u}=o;if(i)return f(u,e,n,l)}if(d&1){let{unmount:i=!0,...u}=o;return (0,_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(i?0:1,{[0](){return null},[1](){return f({...u,hidden:!0,style:{display:"none"}},e,n,l)}})}return f(o,e,n,l)}function f(r,t={},e,n){let{as:a=e,children:s,refName:l="ref",...o}=m(r,["unmount","static"]),d=r.ref!==void 0?{[l]:r.ref}:{},i=typeof s=="function"?s(t):s;o.className&&typeof o.className=="function"&&(o.className=o.className(t));let u={};if(a===react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&Object.keys(g(o)).length>0){if(!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(i)||Array.isArray(i)&&i.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(o).map(p=>`  - ${p}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(p=>`  - ${p}`).join(`
`)].join(`
`));return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(i,Object.assign({},y(i.props,g(m(o,["ref"]))),u,d))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(a,Object.assign({},m(o,["ref"]),a!==react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&d,a!==react__WEBPACK_IMPORTED_MODULE_0__.Fragment&&u),i)}function y(...r){var n;if(r.length===0)return{};if(r.length===1)return r[0];let t={},e={};for(let a of r)for(let s in a)s.startsWith("on")&&typeof a[s]=="function"?((n=e[s])!=null||(e[s]=[]),e[s].push(a[s])):t[s]=a[s];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(e).map(a=>[a,void 0])));for(let a in e)Object.assign(t,{[a](s,...l){let o=e[a];for(let d of o){if(s.defaultPrevented)return;d(s,...l)}}});return t}function H(r){var t;return Object.assign((0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(r),{displayName:(t=r.displayName)!=null?t:r.name})}function g(r){let t=Object.assign({},r);for(let e in t)t[e]===void 0&&delete t[e];return t}function m(r,t=[]){let e=Object.assign({},r);for(let n of t)n in e&&delete e[n];return e}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/browser-action/index.tsx"));
/******/ }
]);
//# sourceMappingURL=browserAction.js.map