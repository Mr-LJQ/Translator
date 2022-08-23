/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/anki/AnkiConnection.ts":
/*!************************************!*\
  !*** ./src/anki/AnkiConnection.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnkiConnection": () => (/* binding */ AnkiConnection)
/* harmony export */ });
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.omit */ "./node_modules/.pnpm/registry.npmmirror.com+lodash.omit@4.5.0/node_modules/lodash.omit/index.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/anki/utils/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/anki/types/index.ts");
var _excluded = ["deckName", "modelName", "tags"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 这是用于调用 AnkiConnection 提供的接口的封装
 */


 //声明

 //值必须是小写，且必须是这个值，不应该修改，这是AnkiConnection所要求的

var Action;

(function (Action) {
  Action["Version"] = "version";
  Action["AddNote"] = "addNote";
  Action["FindCards"] = "findCards";
  Action["DeckNames"] = "deckNames";
  Action["ModelNames"] = "modelNames";
  Action["RelearnCards"] = "relearnCards";
  Action["ModelFieldNames"] = "modelFieldNames";
  Action["UpdateNoteFields"] = "updateNoteFields";
})(Action || (Action = {}));

var AnkiConnection = /*#__PURE__*/function () {
  function AnkiConnection() {
    var _this = this;

    _classCallCheck(this, AnkiConnection);

    _defineProperty(this, "version", void 0);

    _defineProperty(this, "ankiConfig", void 0);

    _defineProperty(this, "addNote", void 0);

    _defineProperty(this, "getVersion", void 0);

    _defineProperty(this, "getDeckNames", void 0);

    _defineProperty(this, "relearnCards", void 0);

    _defineProperty(this, "getModelNames", void 0);

    _defineProperty(this, "getModelFieldNames", void 0);

    this.version = 6; //版本不同，返回值不同，不能够随意修改

    this.ankiConfig = {}; //后面会进行初始化赋值
    //初始化AnkiConfig
    //值是必定存在的，因为 getStorage 内部会保证在没值的时候使用默认值，而默认值设定了相应的值

    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.getStorageByArray)(["wordConfig", "phraseConfig", "sentenceConfig", "ankiConnectionURL", "checkWordDuplicate", "checkPhraseDuplicate", "checkSentenceDuplicate"], function (config) {
      _this.updateAnkiConfig(config); //初始化时，必须包括所有的 AnkiConfig 配置

    }); //监听用户配置更新

    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.onStorageChange)({
      wordConfig: function wordConfig(_, _wordConfig) {
        return _this.updateAnkiConfig({
          wordConfig: _wordConfig
        });
      },
      phraseConfig: function phraseConfig(_, _phraseConfig) {
        return _this.updateAnkiConfig({
          phraseConfig: _phraseConfig
        });
      },
      sentenceConfig: function sentenceConfig(_, _sentenceConfig) {
        return _this.updateAnkiConfig({
          sentenceConfig: _sentenceConfig
        });
      },
      ankiConnectionURL: function ankiConnectionURL(_, _ankiConnectionURL) {
        return _this.updateAnkiConfig({
          ankiConnectionURL: _ankiConnectionURL
        });
      },
      checkPhraseDuplicate: function checkPhraseDuplicate(_, _checkPhraseDuplicate) {
        return _this.updateAnkiConfig({
          checkPhraseDuplicate: _checkPhraseDuplicate
        });
      },
      checkSentenceDuplicate: function checkSentenceDuplicate(_, _checkSentenceDuplicate) {
        return _this.updateAnkiConfig({
          checkSentenceDuplicate: _checkSentenceDuplicate
        });
      },
      checkWordDuplicate: function checkWordDuplicate(_, _checkWordDuplicate) {
        return _this.updateAnkiConfig({
          checkWordDuplicate: _checkWordDuplicate
        });
      }
    });
    this.addNote = this._addErrorCatch(this._addNote);
    this.getVersion = this._addErrorCatch(this._getVersion);
    this.getDeckNames = this._addErrorCatch(this._getDeckNames);
    this.relearnCards = this._addErrorCatch(this._relearnCards);
    this.getModelNames = this._addErrorCatch(this._getModelNames);
    this.getModelFieldNames = this._addErrorCatch(this._getModelFieldNames);
  }

  _createClass(AnkiConnection, [{
    key: "_addErrorCatch",
    value: function _addErrorCatch(executor) {
      var _this2 = this;

      return /*#__PURE__*/_asyncToGenerator(function* () {
        try {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          /**
           * result 有两种情况：
           *  第一种，返回的是AnkiResponse，那么不需要再次包装，直接返回
           *  第二种，返回的不是AnkiResponse,而是一个正常值，则需要包装后返回
           * 这是为了保证，返回的都是AnkiResponse.
           */
          var result = yield executor.apply(_this2, args);
          if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isAnkiResponse)(result)) return result;
          return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createSuccessAnkiResponse)(result);
        } catch (e) {
          if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isAnkiResponse)(e)) return e;

          if (true) {
            console.error(e);
          }

          if (typeof e === "string" || e instanceof Error) {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createUnexpectedErrorResponse)(e);
          }

          return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createUnexpectedErrorResponse)("这是一个出乎该插件开发者预料的错误,如需解决请提交该问题");
        }
      });
    }
  }, {
    key: "updateAnkiConfig",
    value: function updateAnkiConfig(config) {
      this.ankiConfig = _objectSpread(_objectSpread({}, this.ankiConfig), config);
    }
  }, {
    key: "_addNote",
    value: function () {
      var _addNote2 = _asyncToGenerator(function* (data) {
        var type = null;
        if ("word" in data) type = _types__WEBPACK_IMPORTED_MODULE_3__.NoteType.Word;
        if ("phrase" in data) type = _types__WEBPACK_IMPORTED_MODULE_3__.NoteType.Phrase;
        if ("sentence" in data) type = _types__WEBPACK_IMPORTED_MODULE_3__.NoteType.Sentence; //await是必须的

        yield this._testSecurity(type);

        var note = this._formatData(type, data);

        var result = yield this._handleDuplicate(type, data, note);
        return result;
      });

      function _addNote(_x) {
        return _addNote2.apply(this, arguments);
      }

      return _addNote;
    }()
    /**
     * 确保deckName、modelName、fieldNames等是存在的
     */

  }, {
    key: "_testSecurity",
    value: function () {
      var _testSecurity2 = _asyncToGenerator(function* (type) {
        var configName = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getConfigName)(type);
        var config = this.ankiConfig[configName]; //检查 deckName 是否为空

        var deckName = config.deckName;
        var deckNames = yield this._getDeckNames();

        if (deckName == null || !deckNames.includes(deckName)) {
          throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createConfigErrorResponse)();
        } //检查 modelName 是否为空


        var modelName = config.modelName;
        var modelNames = yield this._getModelNames();

        if (modelName == null || !modelNames.includes(modelName)) {
          throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createConfigErrorResponse)();
        } //检查 fields 是否正确（在Anki上该值是否存在）


        var modelFieldNames = yield this._getModelFieldNames(modelName);
        var fieldNames = Object.values(lodash_omit__WEBPACK_IMPORTED_MODULE_0___default()(config, ["deckName", "modelName", "tags"])); //检查用户是否配置了任何一个fieldName，fieldNames不能够都没有配置

        var isEmpty = fieldNames.every(function (val) {
          return val == null || val === "";
        });

        if (isEmpty) {
          throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createConfigErrorResponse)();
        }

        var includesAll = fieldNames.every(function (val) {
          if (val == null || val === "") return true;
          return modelFieldNames.includes(val);
        });

        if (!includesAll) {
          throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createConfigErrorResponse)();
        }
      });

      function _testSecurity(_x2) {
        return _testSecurity2.apply(this, arguments);
      }

      return _testSecurity;
    }()
    /**
     * 处理卡片重复添加的逻辑
     */

  }, {
    key: "_handleDuplicate",
    value: function () {
      var _handleDuplicate2 = _asyncToGenerator(function* (type, data, note) {
        var configName = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getConfigName)(type);
        var duplicateConfigName = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getDuplicateConfigName)(type);
        var config = this.ankiConfig[configName];
        var duplicateConfig = this.ankiConfig[duplicateConfigName]; //改写Anki内置的重复判断逻辑，将控制权交给用户

        var query = Object.entries(duplicateConfig).reduce(function (query, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              val = _ref3[1];

          //检查deck
          if (key === "deckName") {
            return query + val ? " deck:".concat(config[key]) : "";
          } //检查 model


          if (key === "modelName") {
            return query + val ? " note:".concat(config[key]) : "";
          } //val为falsy则表示其不是用于查重的字段


          if (!val) return query; //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题

          var fieldName = config[key]; //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题

          var content = data[key];
          if (!fieldName || !content) return query; //注意前方的空格，其是必须的

          query += " \"".concat(content, "\"");
          return query;
        }, ""); // - cardIds没有值，此时逻辑应该为:再次添加卡片，添加方式为允许重复。
        // - cardIds有一个值，此时逻辑应该为:立刻开始学习
        // - cardIds有多个值，此时逻辑应该为:报错，返回查询字符串，让用户到Anki中查看重复。

        var cardIds = yield this._findCards(query);
        var length = cardIds.length;

        switch (length) {
          case 0:
            {
              //卡片不存在，作为新卡片添加
              var cardId = yield this._request(Action.AddNote, {
                note: note
              });
              return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createFirstAddSuccessResponse)([cardId]);
            }

          case 1:
            //卡片已添加，是否立刻复习/学习
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createForgottenResponse)(cardIds);

          default:
            //卡片重复添加
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createDuplicateResponse)(cardIds);
        }
      });

      function _handleDuplicate(_x3, _x4, _x5) {
        return _handleDuplicate2.apply(this, arguments);
      }

      return _handleDuplicate;
    }()
  }, {
    key: "_findCards",
    value: function () {
      var _findCards2 = _asyncToGenerator(function* (query) {
        return this._request(Action.FindCards, {
          query: query
        });
      });

      function _findCards(_x6) {
        return _findCards2.apply(this, arguments);
      }

      return _findCards;
    }()
  }, {
    key: "_relearnCards",
    value: function () {
      var _relearnCards2 = _asyncToGenerator(function* (cards) {
        //await是必须的
        yield this._request(Action.RelearnCards, {
          cards: cards
        });
        return cards;
      });

      function _relearnCards(_x7) {
        return _relearnCards2.apply(this, arguments);
      }

      return _relearnCards;
    }()
  }, {
    key: "_getModelNames",
    value: function () {
      var _getModelNames2 = _asyncToGenerator(function* () {
        var result = yield this._request(Action.ModelNames);
        return result;
      });

      function _getModelNames() {
        return _getModelNames2.apply(this, arguments);
      }

      return _getModelNames;
    }()
  }, {
    key: "_getDeckNames",
    value: function () {
      var _getDeckNames2 = _asyncToGenerator(function* () {
        var result = yield this._request(Action.DeckNames);
        return result;
      });

      function _getDeckNames() {
        return _getDeckNames2.apply(this, arguments);
      }

      return _getDeckNames;
    }()
  }, {
    key: "_getModelFieldNames",
    value: function () {
      var _getModelFieldNames2 = _asyncToGenerator(function* (modelName) {
        var result = yield this._request(Action.ModelFieldNames, {
          modelName: modelName
        });
        return result;
      });

      function _getModelFieldNames(_x8) {
        return _getModelFieldNames2.apply(this, arguments);
      }

      return _getModelFieldNames;
    }()
  }, {
    key: "_getVersion",
    value: function () {
      var _getVersion2 = _asyncToGenerator(function* () {
        var result = yield this._request(Action.Version); //更新 version

        this.version = result;
        return result;
      });

      function _getVersion() {
        return _getVersion2.apply(this, arguments);
      }

      return _getVersion;
    }()
    /**
     * 将数据格式化为Anki所要求的格式
     */

  }, {
    key: "_formatData",
    value: function _formatData(type, data) {
      var configName = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getConfigName)(type);
      var config = this.ankiConfig[configName];

      var deckName = config.deckName,
          modelName = config.modelName,
          tags = config.tags,
          modelFieldNames = _objectWithoutProperties(config, _excluded);

      var audio = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getMediaFields)(type, data, modelFieldNames);
      var fields = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNotMediaFields)(type, data, modelFieldNames);
      return {
        deckName: deckName,
        //在调用该函数前已经调用 testSecurity 进行非空检查
        modelName: modelName,
        //在调用该函数前已经调用 testSecurity 进行非空检查
        fields: fields,
        audio: audio,
        tags: tags && tags.trim().split(/\s+/g) || [],
        options: {
          allowDuplicate: true,
          //重复判断逻辑已经重写，所以这里恒定true，避免被原有逻辑影响到
          duplicateScope: "deck",
          duplicateScopeOptions: {
            deckName: deckName,
            //在调用该函数前已经调用 testSecurity 进行非空检查
            checkChildren: false,
            checkAllModels: false
          }
        }
      };
    }
    /**
     * 向Anki发送请求的函数
     * @param action 具体请求动作，类似 http 中的 method
     * @param params 请求所携带的参数
     */

  }, {
    key: "_request",
    value: function () {
      var _request2 = _asyncToGenerator(function* (action) {
        var _this3 = this;

        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new Promise(function (resolve, reject) {
          var version = _this3.version;
          var ankiConnectionURL = _this3.ankiConfig.ankiConnectionURL;
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("error", function () {
            return reject((0,_utils__WEBPACK_IMPORTED_MODULE_2__.createDisconnectionResponse)("\u65E0\u6CD5\u901A\u8FC7URL: ".concat(ankiConnectionURL, " \u8FDE\u63A5\u5230Anki\uFF0C\u53EF\u901A\u8FC7\u68C0\u67E5\uFF1A\n\t- Anki\u662F\u5426\u6253\u5F00\n\t- AnkiConnection\u63D2\u4EF6\u662F\u5426\u5B89\u88C5\n\t- \u76EE\u6807URL\u662F\u5426\u6B63\u786E\u914D\u7F6E\u6765\u6392\u67E5\u8BE5\u95EE\u9898")));
          });
          xhr.addEventListener("load", function () {
            try {
              var response = JSON.parse(xhr.responseText);

              if (Object.getOwnPropertyNames(response).length != 2 || !Object.prototype.hasOwnProperty.call(response, "result") || !Object.prototype.hasOwnProperty.call(response, "error")) {
                throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createOldVersionResponse)();
              }

              if (response.error) {
                throw (0,_utils__WEBPACK_IMPORTED_MODULE_2__.createAnkiErrorResponse)(response.error);
              }

              resolve(response.result);
            } catch (e) {
              reject(e);
            }
          });
          xhr.open("POST", ankiConnectionURL);
          xhr.send(JSON.stringify({
            action: action,
            version: version,
            params: params
          }));
        });
      });

      function _request(_x9) {
        return _request2.apply(this, arguments);
      }

      return _request;
    }()
  }]);

  return AnkiConnection;
}();

/***/ }),

/***/ "./src/anki/index.ts":
/*!***************************!*\
  !*** ./src/anki/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnkiConnection": () => (/* reexport safe */ _AnkiConnection__WEBPACK_IMPORTED_MODULE_0__.AnkiConnection),
/* harmony export */   "AnkiResponseStatus": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus)
/* harmony export */ });
/* harmony import */ var _AnkiConnection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnkiConnection */ "./src/anki/AnkiConnection.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/anki/types/index.ts");



/***/ }),

/***/ "./src/anki/types/index.ts":
/*!*********************************!*\
  !*** ./src/anki/types/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnkiResponseStatus": () => (/* binding */ AnkiResponseStatus),
/* harmony export */   "NoteType": () => (/* binding */ NoteType)
/* harmony export */ });
var NoteType;

(function (NoteType) {
  NoteType[NoteType["Word"] = 0] = "Word";
  NoteType[NoteType["Phrase"] = 1] = "Phrase";
  NoteType[NoteType["Sentence"] = 2] = "Sentence";
})(NoteType || (NoteType = {}));

var AnkiResponseStatus;

(function (AnkiResponseStatus) {
  AnkiResponseStatus[AnkiResponseStatus["Error"] = 0] = "Error";
  AnkiResponseStatus[AnkiResponseStatus["Success"] = 1] = "Success";
  AnkiResponseStatus[AnkiResponseStatus["Forgotten"] = 2] = "Forgotten";
  AnkiResponseStatus[AnkiResponseStatus["Duplicate"] = 3] = "Duplicate";
  AnkiResponseStatus[AnkiResponseStatus["Disconnect"] = 4] = "Disconnect";
  AnkiResponseStatus[AnkiResponseStatus["OldVersion"] = 5] = "OldVersion";
  AnkiResponseStatus[AnkiResponseStatus["ConfigError"] = 6] = "ConfigError";
  AnkiResponseStatus[AnkiResponseStatus["FirstAddSuccess"] = 7] = "FirstAddSuccess";
  AnkiResponseStatus[AnkiResponseStatus["UnexpectedError"] = 8] = "UnexpectedError";
})(AnkiResponseStatus || (AnkiResponseStatus = {}));

/***/ }),

/***/ "./src/anki/utils/createAnkiResponse.ts":
/*!**********************************************!*\
  !*** ./src/anki/utils/createAnkiResponse.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAnkiErrorResponse": () => (/* binding */ createAnkiErrorResponse),
/* harmony export */   "createConfigErrorResponse": () => (/* binding */ createConfigErrorResponse),
/* harmony export */   "createDisconnectionResponse": () => (/* binding */ createDisconnectionResponse),
/* harmony export */   "createDuplicateResponse": () => (/* binding */ createDuplicateResponse),
/* harmony export */   "createFirstAddSuccessResponse": () => (/* binding */ createFirstAddSuccessResponse),
/* harmony export */   "createForgottenResponse": () => (/* binding */ createForgottenResponse),
/* harmony export */   "createOldVersionResponse": () => (/* binding */ createOldVersionResponse),
/* harmony export */   "createSuccessAnkiResponse": () => (/* binding */ createSuccessAnkiResponse),
/* harmony export */   "createUnexpectedErrorResponse": () => (/* binding */ createUnexpectedErrorResponse),
/* harmony export */   "isAnkiResponse": () => (/* binding */ isAnkiResponse)
/* harmony export */ });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/anki/types/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }




function createAnkiResponse(options) {
  return Object.assign({
    __isAnkiResponse__: true
  }, options);
}

function isAnkiResponse(target) {
  if (target === null || _typeof(target) !== "object") return false;
  return target.__isAnkiResponse__ === true;
}
function createSuccessAnkiResponse(data) {
  return createAnkiResponse({
    data: data,
    message: "ok",
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Success
  });
}
function createDisconnectionResponse(message) {
  return createAnkiResponse({
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Disconnect,
    message: message
  });
}
function createForgottenResponse(cardIds) {
  return createAnkiResponse({
    data: cardIds,
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Forgotten,
    message: "曾经添加过该卡片，是否做遗忘处理？(立刻将其添加到学习列表中)"
  });
}
function createDuplicateResponse(cardIds) {
  return createAnkiResponse({
    data: cardIds,
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Duplicate,
    message: "该卡片出现重复项，请自行在Anki上处理重复项，单击复制重复卡片的ID，以在Anki Browser上快速定位。"
  });
}
function createFirstAddSuccessResponse(cardIds) {
  return createAnkiResponse({
    data: cardIds,
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.FirstAddSuccess,
    message: "已成功添加到Anki，是否需要立刻开始学习？(用于在待学习列表很长的时候，使其无需等待，立刻开始学习)"
  });
}
function createConfigErrorResponse() {
  return createAnkiResponse({
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.ConfigError,
    message: "\u5B58\u5728\u914D\u7F6E\u9519\u8BEF\uFF0C\u662F\u5426\u6253\u5F00\u914D\u7F6E\u9875\u9762\u8BBE\u7F6E\u914D\u7F6E\uFF1F\u53EF\u80FD\u662F\u4E00\u4E0B\u95EE\u9898\u4E4B\u4E00\u5BFC\u81F4\u8BE5\u9519\u8BEF\uFF1A\n\t- ".concat(_configuration__WEBPACK_IMPORTED_MODULE_0__.COMMON_CONFIG_MAP.deckName, ",\u672A\u914D\u7F6E\n\t- ").concat(_configuration__WEBPACK_IMPORTED_MODULE_0__.COMMON_CONFIG_MAP.modelName, ",\u672A\u914D\u7F6E\n\t- \u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55\u4E00\u4E2A model field \u9879\n\t- \u914D\u7F6E\u7684\u67D0\u4E2A model field \u9879\u4E0E Anki \u4E0A\u7684\u4E0D\u5339\u914D\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u65B0\u914D\u7F6E")
  });
}
function createOldVersionResponse() {
  return createAnkiResponse({
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.OldVersion,
    message: "AnkiConnection版本过低，请更新到最新版本。"
  });
}
function createAnkiErrorResponse(message) {
  return createAnkiResponse({
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Error,
    message: message
  });
}
function createUnexpectedErrorResponse(e) {
  return createAnkiResponse({
    status: _types__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.UnexpectedError,
    message: typeof e === "string" ? e : e.message
  });
}

/***/ }),

/***/ "./src/anki/utils/helper.ts":
/*!**********************************!*\
  !*** ./src/anki/utils/helper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfigName": () => (/* binding */ getConfigName),
/* harmony export */   "getDuplicateConfigName": () => (/* binding */ getDuplicateConfigName),
/* harmony export */   "getMediaFields": () => (/* binding */ getMediaFields),
/* harmony export */   "getNotMediaFields": () => (/* binding */ getNotMediaFields)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/anki/types/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 纯函数
 */

function getConfigName(type) {
  var _configNames;

  var configNames = (_configNames = {}, _defineProperty(_configNames, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Word, "wordConfig"), _defineProperty(_configNames, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Phrase, "phraseConfig"), _defineProperty(_configNames, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Sentence, "sentenceConfig"), _configNames);
  return configNames[type];
}
/**
 * 纯函数
 */

function getDuplicateConfigName(type) {
  var _configNames2;

  var configNames = (_configNames2 = {}, _defineProperty(_configNames2, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Word, "checkWordDuplicate"), _defineProperty(_configNames2, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Phrase, "checkPhraseDuplicate"), _defineProperty(_configNames2, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Sentence, "checkSentenceDuplicate"), _configNames2);
  return configNames[type];
}
/**
 * 纯函数，获取特定类型的代表音频媒体的 key 的集合
 */

function getMediaNames(type) {
  var _NoteType$Word$NoteTy;

  var wordMedias = ["am_audio", "en_audio", "example_audio", "definition_audio"];
  var phraseMedias = ["phrase_audio", "example_audio_1", "example_audio_2", "example_audio_3"];
  var sentenceMedias = ["sentence_audio"];
  var mediaNames = (_NoteType$Word$NoteTy = {}, _defineProperty(_NoteType$Word$NoteTy, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Word, wordMedias), _defineProperty(_NoteType$Word$NoteTy, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Phrase, phraseMedias), _defineProperty(_NoteType$Word$NoteTy, _types__WEBPACK_IMPORTED_MODULE_0__.NoteType.Sentence, sentenceMedias), _NoteType$Word$NoteTy)[type];
  return mediaNames;
}
/**
 * 纯函数，获取媒体部分的域
 */


function getMediaFields(type, data, modelFieldsMap) {
  var mediaNames = getMediaNames(type);
  return Object.entries(modelFieldsMap).reduce(function (audio, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        field = _ref2[1];

    //@ts-ignore 是能够正确匹配的
    if (!mediaNames.includes(key)) return audio; //@ts-ignore 是能够正确匹配的

    var url = data[key];
    if (!url || !field) return audio;
    audio.push({
      url: url,
      fields: [field],
      filename: "".concat(encodeURIComponent(url), ".mp3")
    });
    return audio;
  }, []);
}
/**
 * 纯函数，获取非媒体部分的域
 */

function getNotMediaFields(type, data, modelFieldsMap) {
  var mediaNames = getMediaNames(type);
  return Object.entries(modelFieldsMap).reduce(function (fields, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        fieldKey = _ref4[1];

    //@ts-ignore 是可以正确匹配的
    if (mediaNames.includes(key)) return fields; //@ts-ignore 是可以正确匹配的

    var fieldValue = data[key];
    if (!fieldKey || !fieldValue) return fields;
    fields[fieldKey] = fieldValue;
    return fields;
  }, {});
}

/***/ }),

/***/ "./src/anki/utils/index.ts":
/*!*********************************!*\
  !*** ./src/anki/utils/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAnkiErrorResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createAnkiErrorResponse),
/* harmony export */   "createConfigErrorResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createConfigErrorResponse),
/* harmony export */   "createDisconnectionResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createDisconnectionResponse),
/* harmony export */   "createDuplicateResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createDuplicateResponse),
/* harmony export */   "createFirstAddSuccessResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createFirstAddSuccessResponse),
/* harmony export */   "createForgottenResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createForgottenResponse),
/* harmony export */   "createOldVersionResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createOldVersionResponse),
/* harmony export */   "createSuccessAnkiResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createSuccessAnkiResponse),
/* harmony export */   "createUnexpectedErrorResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.createUnexpectedErrorResponse),
/* harmony export */   "getConfigName": () => (/* reexport safe */ _helper__WEBPACK_IMPORTED_MODULE_1__.getConfigName),
/* harmony export */   "getDuplicateConfigName": () => (/* reexport safe */ _helper__WEBPACK_IMPORTED_MODULE_1__.getDuplicateConfigName),
/* harmony export */   "getMediaFields": () => (/* reexport safe */ _helper__WEBPACK_IMPORTED_MODULE_1__.getMediaFields),
/* harmony export */   "getNotMediaFields": () => (/* reexport safe */ _helper__WEBPACK_IMPORTED_MODULE_1__.getNotMediaFields),
/* harmony export */   "isAnkiResponse": () => (/* reexport safe */ _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__.isAnkiResponse)
/* harmony export */ });
/* harmony import */ var _createAnkiResponse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createAnkiResponse */ "./src/anki/utils/createAnkiResponse.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/anki/utils/helper.ts");



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

/***/ "./src/dictionary/Collins_en_cn/index.ts":
/*!***********************************************!*\
  !*** ./src/dictionary/Collins_en_cn/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collins_en_cn": () => (/* binding */ Collins_en_cn)
/* harmony export */ });
/* harmony import */ var lodash_lowercase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.lowercase */ "./node_modules/.pnpm/registry.npmmirror.com+lodash.lowercase@4.3.0/node_modules/lodash.lowercase/index.js");
/* harmony import */ var lodash_lowercase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_lowercase__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/dictionary/utils/index.ts");
/* harmony import */ var _translateWord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translateWord */ "./src/dictionary/Collins_en_cn/translateWord.ts");
/* harmony import */ var _translatePhrase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translatePhrase */ "./src/dictionary/Collins_en_cn/translatePhrase.ts");
/* harmony import */ var _translateSentence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translateSentence */ "./src/dictionary/Collins_en_cn/translateSentence.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现
var Collins_en_cn = /*#__PURE__*/function () {
  function Collins_en_cn() {
    var cacheAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

    _classCallCheck(this, Collins_en_cn);

    _defineProperty(this, "xhr", void 0);

    _defineProperty(this, "cache", void 0);

    this.xhr = null;
    this.cache = new _utils__WEBPACK_IMPORTED_MODULE_1__.Cache(cacheAmount);
  }
  /**
   * 对translateText的包装，为其添加缓存能力
   * @param text 待翻译文本
   */


  _createClass(Collins_en_cn, [{
    key: "translate",
    value: function () {
      var _translate = _asyncToGenerator(function* (text) {
        var cache = this.cache;
        var translation = cache.get(text);
        if (translation) return translation;
        var translationResult = yield this.translateText(text);

        if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isErrorData)(translationResult) && !translationResult.cache) {
          translationResult.queryText = text;
          return translationResult;
        }

        this.cache.set(text, translationResult);
        return translationResult;
      });

      function translate(_x) {
        return _translate.apply(this, arguments);
      }

      return translate;
    }()
    /**
     * 词典基于有道翻译网页版，因此需要获取特定的网页DOM
     */

  }, {
    key: "getPageDOM",
    value: function () {
      var _getPageDOM = _asyncToGenerator(function* (input) {
        var _this = this;

        //短时间内快速查询的情况下，如果上一个未返回，则直接中止
        if (this.xhr) this.xhr.abort();
        return new Promise(function (resolve, reject) {
          //词典基于有道网页版
          var searchURL = "https://dict.youdao.com/w/" + encodeURIComponent(input);
          var xhr = new XMLHttpRequest();
          _this.xhr = xhr;
          xhr.open("GET", searchURL);
          xhr.responseType = "document";
          xhr.timeout = 6000;
          xhr.addEventListener("load", function () {
            if (xhr.status < 200 || xhr.status >= 400) reject((0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)("\u8BF7\u6C42\u9519\u8BEF,\u72B6\u6001\u7801\uFF1A".concat(xhr.status, "\uFF0C\u539F\u56E0\uFF1A").concat(xhr.statusText)));
            resolve(xhr.response);
          });
          xhr.addEventListener("error", function () {
            reject((0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)("\u7F51\u7EDC\u8FDE\u63A5\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u72B6\u6001"));
          });
          xhr.addEventListener("timeout", function () {
            reject((0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)("请求超时,请再次尝试或查看网络连接状态"));
          });
          xhr.addEventListener("abort", function () {
            reject((0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)("请求被取消"));
          });
          xhr.send(null);
        });
      });

      function getPageDOM(_x2) {
        return _getPageDOM.apply(this, arguments);
      }

      return getPageDOM;
    }()
    /**
     * 对text进行翻译，获取翻译数据
     * @param text 需要进行翻译的文本
     */

  }, {
    key: "translateText",
    value: function () {
      var _translateText = _asyncToGenerator(function* (text) {
        try {
          //将 驼峰、-、_ 等写法连接的文本转换为由空格分隔的文本
          text = lodash_lowercase__WEBPACK_IMPORTED_MODULE_0___default()(text);
          var dom = yield this.getPageDOM(text);
          var translation; //如果存在空格，则认为其为多个单词组合的句子、词组

          if (/\s/g.test(text)) {
            translation = translatePhraseAndSentence(dom);
          } else {
            translation = (0,_translateWord__WEBPACK_IMPORTED_MODULE_2__.translateWord)(dom);
          }

          if (!translation) handleNotFound(dom, text); //上面的判断决定了其必定不为空，因此可以使用 !进行断言

          return translation;
        } catch (err) {
          if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isErrorData)(err)) return err;
          return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)(err === null || err === void 0 ? void 0 : err.message);
        }
      });

      function translateText(_x3) {
        return _translateText.apply(this, arguments);
      }

      return translateText;
    }()
  }]);

  return Collins_en_cn;
}();
/**
 * 处理多个单词组成的翻译文本，一般情况下是 短语或句子
 */

function translatePhraseAndSentence(dom) {
  //情况一：待翻译的是短语
  var translatedPhrase = (0,_translatePhrase__WEBPACK_IMPORTED_MODULE_3__.translatePhrase)(dom);
  if (translatedPhrase) return translatedPhrase; //情况二:待翻译的是句子

  var translatedSentence = (0,_translateSentence__WEBPACK_IMPORTED_MODULE_4__["default"])(dom);
  if (translatedSentence) return translatedSentence;
}
/**
 * 用于兜底处理未找到任何翻译的情况
 */


function handleNotFound(dom, text) {
  //可能是用户拼写出错，推测正确的拼写给用户参考
  var possibleSpelling = getCorrectSpelling(dom);

  if (possibleSpelling) {
    throw (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createCacography)(possibleSpelling);
  } //真的没有找到任何翻译


  throw (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError)("\"\u6CA1\u627E\u5230\u5173\u4E8E '".concat(text, "' \u7684\u4EFB\u4F55\u7FFB\u8BD1\""));
}
/**
 * 获取页面的中关于拼写错误部分的正确推断
 */


function getCorrectSpelling(dom) {
  var inferCorrects = _toConsumableArray(dom.querySelectorAll("#results-contents .error-typo .typo-rel a")).reduce(function (acc, node) {
    var text = node.textContent;
    if (text) acc.push(text);
    return acc;
  }, []);

  if (inferCorrects.length) return inferCorrects;
}

/***/ }),

/***/ "./src/dictionary/Collins_en_cn/translatePhrase.ts":
/*!*********************************************************!*\
  !*** ./src/dictionary/Collins_en_cn/translatePhrase.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "translatePhrase": () => (/* binding */ translatePhrase)
/* harmony export */ });
//短语翻译
function translatePhrase(dom) {
  var _dom$querySelectorAll, _dom$querySelectorAll2;

  var phrase = getOriginText(dom);
  if (!phrase) return;
  var translation = (_dom$querySelectorAll = dom.querySelectorAll("#ydTrans .trans-container p")[1]) === null || _dom$querySelectorAll === void 0 ? void 0 : (_dom$querySelectorAll2 = _dom$querySelectorAll.textContent) === null || _dom$querySelectorAll2 === void 0 ? void 0 : _dom$querySelectorAll2.trim();
  var translations = getTranslation(dom) || translation && [translation];
  if (!translations) return;
  var phrase_audio = "https://dict.youdao.com/dictvoice?audio=".concat(encodeURIComponent(phrase));
  var example_sentences = getPhraseExamples(dom);
  return {
    phrase: phrase,
    translations: translations,
    phrase_audio: phrase_audio,
    type: "PHRASE",
    example_sentences: example_sentences
  };
}
/**
 * 获取翻译源文本
 * @param dom
 * @returns
 */

function getOriginText(dom) {
  var _dom$querySelector, _dom$querySelector$fi, _dom$querySelector$fi2;

  return ((_dom$querySelector = dom.querySelector(".wordbook-js")) === null || _dom$querySelector === void 0 ? void 0 : (_dom$querySelector$fi = _dom$querySelector.firstElementChild) === null || _dom$querySelector$fi === void 0 ? void 0 : (_dom$querySelector$fi2 = _dom$querySelector$fi.textContent) === null || _dom$querySelector$fi2 === void 0 ? void 0 : _dom$querySelector$fi2.trim()) || "";
}
/**
 * 获取单词的粗略翻译
 * @param dom 具有翻译内容的页面DOM
 * @returns
 */


function getTranslation(dom) {
  var ul = dom.querySelector("#phrsListTab .trans-container > ul");
  if (!ul) return;
  var liNodes = ul.children;
  var result = Array.from(liNodes).reduce(function (result, li) {
    var _li$textContent;

    var text = (_li$textContent = li.textContent) === null || _li$textContent === void 0 ? void 0 : _li$textContent.trim();
    if (!text) return result;
    result.push(text);
    return result;
  }, []);
  if (!result.length) return;
  return result;
}
/**
 * 获取短语例句
 * @param dom
 * @returns
 */


function getPhraseExamples(dom) {
  var liNodes = dom.querySelectorAll("#bilingual .ol li");
  var result = Array.from(liNodes).reduce(function (result, li) {
    var _pNodes$, _pNodes$$textContent, _pNodes$1$textContent;

    var pNodes = li.querySelectorAll("p");
    if (!pNodes[0] || !pNodes[1]) return result; //用于获取音频

    var example_sentence_origin = ((_pNodes$ = pNodes[0]) === null || _pNodes$ === void 0 ? void 0 : (_pNodes$$textContent = _pNodes$.textContent) === null || _pNodes$$textContent === void 0 ? void 0 : _pNodes$$textContent.trim()) || ""; //获取短语加粗的例句

    var example_sentence = Array.from(pNodes[0].childNodes).reduce(function (sentence, node) {
      if (node.nodeName !== "SPAN") return sentence;
      var children = node.children;
      if (!children.length) return sentence + node.textContent;
      var childNodes = node.childNodes;
      var text = Array.from(childNodes).reduce(function (text, node) {
        if (node.nodeType === 3) return text + node.textContent;

        if (node.nodeName === "B") {
          return text + "<b>".concat(node.textContent, "</b>");
        }

        return text;
      }, "");
      return sentence + text;
    }, "").trim();
    var example_sentence_translation = ((_pNodes$1$textContent = pNodes[1].textContent) === null || _pNodes$1$textContent === void 0 ? void 0 : _pNodes$1$textContent.trim()) || "";
    var example_audio = "https://dict.youdao.com/dictvoice?audio=".concat(encodeURIComponent(example_sentence_origin), "&le=eng");
    result.push({
      example_audio: example_audio,
      example_sentence: example_sentence,
      example_sentence_translation: example_sentence_translation
    });
    return result;
  }, []);
  if (!result.length) return;
  return result;
}

/***/ }),

/***/ "./src/dictionary/Collins_en_cn/translateSentence.ts":
/*!***********************************************************!*\
  !*** ./src/dictionary/Collins_en_cn/translateSentence.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ translateSentence)
/* harmony export */ });
//句子翻译
function translateSentence(dom) {
  var _sentenceNode$textCon, _transNode$textConten;

  var sentenceNode = dom.querySelectorAll("#ydTrans .trans-container p")[0];
  var transNode = dom.querySelectorAll("#ydTrans .trans-container p")[1];
  var sentence = sentenceNode === null || sentenceNode === void 0 ? void 0 : (_sentenceNode$textCon = sentenceNode.textContent) === null || _sentenceNode$textCon === void 0 ? void 0 : _sentenceNode$textCon.trim();
  var sentence_translation = transNode === null || transNode === void 0 ? void 0 : (_transNode$textConten = transNode.textContent) === null || _transNode$textConten === void 0 ? void 0 : _transNode$textConten.trim();
  if (!sentence || !sentence_translation) return;
  return {
    sentence: sentence,
    type: "SENTENCE",
    sentence_translation: sentence_translation,
    sentence_audio: "https://dict.youdao.com/dictvoice?audio=".concat(encodeURIComponent(sentence), "&le=eng")
  };
}

/***/ }),

/***/ "./src/dictionary/Collins_en_cn/translateWord.ts":
/*!*******************************************************!*\
  !*** ./src/dictionary/Collins_en_cn/translateWord.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "translateWord": () => (/* binding */ translateWord)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//单词翻译
function translateWord(dom) {
  var _dom$querySelector, _dom$querySelector$cl, _dom$querySelector$cl2;

  var word = getOriginText(dom);
  var star_amount = Number((_dom$querySelector = dom.querySelector(".star")) === null || _dom$querySelector === void 0 ? void 0 : (_dom$querySelector$cl = _dom$querySelector.className) === null || _dom$querySelector$cl === void 0 ? void 0 : (_dom$querySelector$cl2 = _dom$querySelector$cl.match(/star(\d)/)) === null || _dom$querySelector$cl2 === void 0 ? void 0 : _dom$querySelector$cl2[1]) || 0;
  if (!word) return;
  return {
    word: word,
    star_amount: star_amount,
    type: "WORD",
    phonetic: getPhonetic(dom, word),
    translationList: getTranslationList(dom),
    translations: formatTranslations(getTranslation(dom))
  };
}
/**
 * 获取翻译源文本
 * @param dom
 * @returns
 */

function getOriginText(dom) {
  var _dom$querySelector2, _dom$querySelector2$f, _dom$querySelector2$f2;

  return ((_dom$querySelector2 = dom.querySelector(".wordbook-js")) === null || _dom$querySelector2 === void 0 ? void 0 : (_dom$querySelector2$f = _dom$querySelector2.firstElementChild) === null || _dom$querySelector2$f === void 0 ? void 0 : (_dom$querySelector2$f2 = _dom$querySelector2$f.textContent) === null || _dom$querySelector2$f2 === void 0 ? void 0 : _dom$querySelector2$f2.trim()) || "";
}
/**
 * 获取单词的粗略翻译
 * @param dom 具有翻译内容的页面DOM
 * @returns
 */


function getTranslation(dom) {
  var ul = dom.querySelector("#phrsListTab .trans-container > ul");
  if (!ul) return;
  var liNodes = ul.children;
  var result = Array.from(liNodes).reduce(function (result, li) {
    var text = li.textContent;
    if (!text) return result;
    result.push(text);
    return result;
  }, []);
  if (!result.length) return;
  return result;
}
/**
 * @param dom 有道翻译页面文档DOM
 * @param word 翻译的目标单词
 * @returns 单词音标与音频对象
 */


function getPhonetic(dom, word) {
  var _dom$querySelectorAll, _dom$querySelectorAll2, _dom$querySelectorAll3, _dom$querySelectorAll4, _dom$querySelectorAll5, _dom$querySelectorAll6, _dom$querySelector3, _dom$querySelector3$t;

  var en = (_dom$querySelectorAll = dom.querySelectorAll(".pronounce")) === null || _dom$querySelectorAll === void 0 ? void 0 : (_dom$querySelectorAll2 = _dom$querySelectorAll[0]) === null || _dom$querySelectorAll2 === void 0 ? void 0 : (_dom$querySelectorAll3 = _dom$querySelectorAll2.textContent) === null || _dom$querySelectorAll3 === void 0 ? void 0 : _dom$querySelectorAll3.replace(/\s*|\r|\n/g, "");
  var am = (_dom$querySelectorAll4 = dom.querySelectorAll(".pronounce")) === null || _dom$querySelectorAll4 === void 0 ? void 0 : (_dom$querySelectorAll5 = _dom$querySelectorAll4[1]) === null || _dom$querySelectorAll5 === void 0 ? void 0 : (_dom$querySelectorAll6 = _dom$querySelectorAll5.textContent) === null || _dom$querySelectorAll6 === void 0 ? void 0 : _dom$querySelectorAll6.replace(/\s*|\r|\n/g, "");
  var en_audio = "https://dict.youdao.com/dictvoice?audio=".concat(word, "&type=1");
  var am_audio = "https://dict.youdao.com/dictvoice?audio=".concat(word, "&type=2");
  var phonetic = (_dom$querySelector3 = dom.querySelector("#collinsResult .wt-container .phonetic")) === null || _dom$querySelector3 === void 0 ? void 0 : (_dom$querySelector3$t = _dom$querySelector3.textContent) === null || _dom$querySelector3$t === void 0 ? void 0 : _dom$querySelector3$t.trim();

  if (phonetic) {
    phonetic = phonetic.replace(/^\//g, "[").replace(/\/$/, "]");
    if (!en || en.length < 3) en = (en || "") + phonetic;
    if (!am || am.length < 3) am = (am || "") + phonetic;
  }

  return {
    am: am,
    //美国发音
    en: en,
    //英国发音
    am_audio: am_audio,
    //美国发音音频URI
    en_audio: en_audio //英国发音音频URI

  };
}
/**
 * @param dom 网易网页版翻译所对应的DOM文档对象
 * @param word 查询的单词
 * @returns 获取单词例句相关的数据数组
 */


function getTranslationList(dom) {
  //获取所有翻译项
  var lis = dom.querySelectorAll("#collinsResult .ol li");
  var result = Array.from(lis).reduce(function (result, li) {
    //处理释义与对应的翻译的逻辑
    var textResult = getTranslationText(li); //过滤无效项

    if (!textResult) {
      return result;
    }

    var _textResult = _slicedToArray(textResult, 2),
        text = _textResult[0],
        index = _textResult[1];

    var definition = text.slice(0, index).trim(); //清除<b></b>避免影响音频获取

    var definition_origin = definition.replace(/<b>|<\/b>/g, "");
    result.push({
      part_of_speech: getPartOfSpeech(li),
      //词性
      definition: definition,
      //定义
      definition_audio: "https://dict.youdao.com/dictvoice?audio=".concat(encodeURIComponent(definition_origin), "&le=eng"),
      translation: text.slice(index).trim(),
      //翻译
      example_sentences: getExampleSentences(li) //例句数组

    });
    return result;
  }, []); //避免出现空数组的情况

  if (!result.length) return;
  return result;
}
/**
 *
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回该释义对应单词的词性，例如：n-count
 */


function getPartOfSpeech(li) {
  var _targetNode$textConte;

  var targetNode = li.querySelector(".collinsMajorTrans p .additional");
  return targetNode && ((_targetNode$textConte = targetNode.textContent) === null || _targetNode$textConte === void 0 ? void 0 : _targetNode$textConte.trim()) || "";
}
/**
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns [text,index] 返回翻译文本 text ，以及用于截取英文释义与中文翻译的下标 index
 */


function getTranslationText(li) {
  var pNode = li.querySelector(".collinsMajorTrans p");
  if (!pNode) return null; //不存在释义项
  //过滤掉干扰项

  var nodes = Array.from(pNode.childNodes).filter(function (node) {
    //过滤展示词性的节点
    if (node.nodeType === 1 && node.classList.contains("additional")) return false;
    return true;
  }); //合并目标文本

  var text = "";
  nodes.forEach(function (node) {
    if (node.nodeType === 3) {
      text += node.textContent;
    }

    if (node.nodeName === "B") {
      text += "<b>".concat(node.textContent, "</b>");
    }
  });
  text = text.trim(); //寻找英文释义与中文释义的边界

  var index = text.search(/[\u4e00-\u9fa5]+/i); //没有中文，则判断这并不是一个存放释义与翻译的标签

  if (index === -1) return null; //避免 中文翻译 被括号包裹起来的情况，而导致的 ()残留

  var reg = /[a-z.)]/i;

  while (index > 0) {
    if (reg.test(text[index - 1] || "")) break;
    index--;
  }

  return [text, index];
}
/**
 *
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回例句相关数据
 */


function getExampleSentences(li) {
  var div_example_s = li.querySelectorAll(".exampleLists .examples");
  var exampleSentences = Array.from(div_example_s).reduce(function (acc, div) {
    var _children$, _children$$textConten, _children$2, _children$2$textConte;

    var children = div.children;
    var example_sentence = ((_children$ = children[0]) === null || _children$ === void 0 ? void 0 : (_children$$textConten = _children$.textContent) === null || _children$$textConten === void 0 ? void 0 : _children$$textConten.trim()) || "";
    var example_sentence_translation = ((_children$2 = children[1]) === null || _children$2 === void 0 ? void 0 : (_children$2$textConte = _children$2.textContent) === null || _children$2$textConte === void 0 ? void 0 : _children$2$textConte.trim()) || ""; //如果例句存在才添加，否则应该过滤掉

    if (example_sentence) {
      acc.push({
        example_sentence: example_sentence,
        //英语例句
        example_sentence_translation: example_sentence_translation,
        //中文例句
        example_audio: "https://dict.youdao.com/dictvoice?audio=".concat(encodeURIComponent(example_sentence), "&le=eng")
      });
    }

    return acc;
  }, []);
  if (!exampleSentences.length) return;
  return exampleSentences;
}
/**
 * 纯函数，格式化translations的结构
 */


function formatTranslations(translations) {
  if (translations == null) return;
  var formated = translations.reduce(function (acc, cur) {
    var point = cur.indexOf(".") + 1;
    var part_of_speech = point === -1 ? "" : cur.slice(0, point);
    var oldArray = acc[part_of_speech];
    var newArray = cur.slice(point).split("；");

    if (oldArray == null) {
      acc[part_of_speech] = newArray;
    } else {
      oldArray.push.apply(oldArray, _toConsumableArray(newArray));
      acc[part_of_speech] = oldArray;
    }

    return acc;
  }, {});
  return formated;
}

/***/ }),

/***/ "./src/dictionary/index.ts":
/*!*********************************!*\
  !*** ./src/dictionary/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collins_en_cn": () => (/* reexport safe */ _Collins_en_cn__WEBPACK_IMPORTED_MODULE_1__.Collins_en_cn),
/* harmony export */   "isErrorData": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.isErrorData),
/* harmony export */   "isPhraseData": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.isPhraseData),
/* harmony export */   "isSentenceData": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.isSentenceData),
/* harmony export */   "isWordData": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.isWordData)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/dictionary/utils/index.ts");
/* harmony import */ var _Collins_en_cn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Collins_en_cn */ "./src/dictionary/Collins_en_cn/index.ts");



/***/ }),

/***/ "./src/dictionary/utils/Cache.ts":
/*!***************************************!*\
  !*** ./src/dictionary/utils/Cache.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": () => (/* binding */ Cache)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cache = /*#__PURE__*/function () {
  function Cache(max) {
    _classCallCheck(this, Cache);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "max", void 0);

    this.map = new Map();
    this.max = max;
  }

  _createClass(Cache, [{
    key: "set",
    value: function set(key, value) {
      var map = this.map;
      var max = this.max;

      if (map.size >= max) {
        map["delete"](map.keys().next().value);
      }

      return map.set(key, value);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.map.get(key);
    }
  }]);

  return Cache;
}();

/***/ }),

/***/ "./src/dictionary/utils/determine.ts":
/*!*******************************************!*\
  !*** ./src/dictionary/utils/determine.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isErrorData": () => (/* binding */ isErrorData),
/* harmony export */   "isPhraseData": () => (/* binding */ isPhraseData),
/* harmony export */   "isSentenceData": () => (/* binding */ isSentenceData),
/* harmony export */   "isWordData": () => (/* binding */ isWordData)
/* harmony export */ });
function typeOf(thing, type) {
  return Object.prototype.hasOwnProperty.call(thing, "type") && thing.type === type;
}

function isErrorData(thing) {
  return typeOf(thing, "ERROR");
}
function isWordData(thing) {
  return typeOf(thing, "WORD");
}
function isPhraseData(thing) {
  return typeOf(thing, "PHRASE");
}
function isSentenceData(thing) {
  return typeOf(thing, "SENTENCE");
}

/***/ }),

/***/ "./src/dictionary/utils/errorData.ts":
/*!*******************************************!*\
  !*** ./src/dictionary/utils/errorData.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCacography": () => (/* binding */ createCacography),
/* harmony export */   "createNoCacheError": () => (/* binding */ createNoCacheError)
/* harmony export */ });
function createErrorData(options) {
  var target = {
    type: "ERROR"
  };
  return Object.assign(target, options);
}

function createCacography(possibleSpelling) {
  return createErrorData({
    cache: true,
    possibleSpelling: possibleSpelling
  });
}
function createNoCacheError(message) {
  return createErrorData({
    cache: false,
    message: message
  });
}

/***/ }),

/***/ "./src/dictionary/utils/index.ts":
/*!***************************************!*\
  !*** ./src/dictionary/utils/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": () => (/* reexport safe */ _Cache__WEBPACK_IMPORTED_MODULE_0__.Cache),
/* harmony export */   "createCacography": () => (/* reexport safe */ _errorData__WEBPACK_IMPORTED_MODULE_1__.createCacography),
/* harmony export */   "createNoCacheError": () => (/* reexport safe */ _errorData__WEBPACK_IMPORTED_MODULE_1__.createNoCacheError),
/* harmony export */   "isErrorData": () => (/* reexport safe */ _determine__WEBPACK_IMPORTED_MODULE_2__.isErrorData),
/* harmony export */   "isPhraseData": () => (/* reexport safe */ _determine__WEBPACK_IMPORTED_MODULE_2__.isPhraseData),
/* harmony export */   "isSentenceData": () => (/* reexport safe */ _determine__WEBPACK_IMPORTED_MODULE_2__.isSentenceData),
/* harmony export */   "isWordData": () => (/* reexport safe */ _determine__WEBPACK_IMPORTED_MODULE_2__.isWordData)
/* harmony export */ });
/* harmony import */ var _Cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cache */ "./src/dictionary/utils/Cache.ts");
/* harmony import */ var _errorData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorData */ "./src/dictionary/utils/errorData.ts");
/* harmony import */ var _determine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./determine */ "./src/dictionary/utils/determine.ts");




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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+lodash.lowercase@4.3.0/node_modules/lodash.lowercase/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+lodash.lowercase@4.3.0/node_modules/lodash.lowercase/index.js ***!
  \*****************************************************************************************************************/
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
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
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
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * _.lowerCase('fooBar');
 * // => 'foo bar'
 *
 * _.lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 */
var lowerCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = lowerCase;


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+lodash.omit@4.5.0/node_modules/lodash.omit/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+lodash.omit@4.5.0/node_modules/lodash.omit/index.js ***!
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

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

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
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
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

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

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
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
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
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

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
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
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
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
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
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = omit;


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
/*!*************************************!*\
  !*** ./src/backend-script/index.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _anki__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/anki */ "./src/anki/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/dictionary */ "./src/dictionary/index.ts");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




 //获取词典

var collins = new _dictionary__WEBPACK_IMPORTED_MODULE_2__.Collins_en_cn(); //获取anki

var anki = new _anki__WEBPACK_IMPORTED_MODULE_0__.AnkiConnection(); //初始化isOpen标识文本

(0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.getStorageByObject)({
  switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(value) {
    switchBadgeText(value);
  }
});
(0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.onStorageChange)({
  switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(_, value) {
    return switchBadgeText(value);
  }
}); //监听用户快捷键，用于开关拓展

(0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.onCommand)({
  switch_hotkey_and_selection_listener: function switch_hotkey_and_selection_listener() {
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.getStorageByObject)({
      switchHotkeyAndSelectionListener: function switchHotkeyAndSelectionListener(_isOpen) {
        return (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.setStorage)({
          switchHotkeyAndSelectionListener: !_isOpen
        });
      }
    });
  },
  show_translation_page: function show_translation_page() {
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.postFrontend)(_configuration__WEBPACK_IMPORTED_MODULE_1__.Command.ShowIframe);
  },
  open_search_box: function open_search_box() {
    return (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.postFrontend)(_configuration__WEBPACK_IMPORTED_MODULE_1__.Command.OpenSearchBox);
  }
}); //在鼠标右键菜单中添加一项 “注入翻译助手” 的选项，
//并在其点击后注入相应脚本，使其能够通过划词进行翻译

(0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.addContextMenuItem)({
  contexts: ["frame"],
  title: "注入翻译助手"
}, function () {
  //避免重复注入脚本
  var injectedFrames = []; //监听注入划词助手栏目的点击

  (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.onContextMenuClick)(function (info) {
    var frameId = info.frameId;

    if (!frameId) {
      console.error(new Error("info.frameId is undefined"));
      return;
    }

    if (injectedFrames.includes(frameId)) return;
    injectedFrames.push(frameId);
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.executeScript)({
      frameId: info.frameId,
      file: "/injectScript.js"
    });
  });
}); //监听所有发送到后端的请求，并进行处理

(0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.onMessage)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var command = _ref.command,
        data = _ref.data,
        sendResponse = _ref.sendResponse;

    switch (command) {
      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.TranslateText:
        {
          var response = yield collins.translate(data);
          sendResponse(response);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.TranslateInjectText:
        {
          var _response = yield collins.translate(data.text);

          (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.postFrontend)(_configuration__WEBPACK_IMPORTED_MODULE_1__.Command.ShowInjectTranslation, {
            translatedData: _response,
            point: data.point
          });
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.AddNote:
        {
          var _response2 = yield anki.addNote(data);

          sendResponse(_response2);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.RelearnNote:
        {
          var _response3 = yield anki.relearnCards(data);

          sendResponse(_response3);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.GetDeckNames:
        {
          var _response4 = yield anki.getDeckNames();

          sendResponse(_response4);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.GetModelNames:
        {
          var _response5 = yield anki.getModelNames();

          sendResponse(_response5);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.GetVersion:
        {
          var _response6 = yield anki.getVersion();

          sendResponse(_response6);
          break;
        }

      case _configuration__WEBPACK_IMPORTED_MODULE_1__.Command.GetModelFieldNames:
        {
          var _response7 = yield anki.getModelFieldNames(data);

          sendResponse(_response7);
          break;
        }

      default:
        throw new Error("存在未处理的指令:" + command);
    }
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());

function switchBadgeText(isOpen) {
  isOpen ? (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.setBadgeText)({
    text: ""
  }) : (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.setBadgeText)({
    text: "off"
  });
}
})();

/******/ })()
;
//# sourceMappingURL=backendScript.js.map