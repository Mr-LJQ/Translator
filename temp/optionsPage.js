(self["webpackChunktranslator_extensions"] = self["webpackChunktranslator_extensions"] || []).push([["optionsPage"],{

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

/***/ "./src/options-page/components/AnkiConfig.tsx":
/*!****************************************************!*\
  !*** ./src/options-page/components/AnkiConfig.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnkiConfig": () => (/* binding */ AnkiConfig)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/options-page/types/index.ts");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/options-page/utils/index.ts");
/* harmony import */ var _TagsItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TagsItem */ "./src/options-page/components/TagsItem.tsx");
/* harmony import */ var _SelectItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectItem */ "./src/options-page/components/SelectItem.tsx");
/* harmony import */ var _pure_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pure-components */ "./src/options-page/pure-components/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils */ "./src/utils/index.ts");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var AnkiConfig = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function AnkiConfig(props) {
  var configType = props.configType;
  var configName = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getConfigName)(configType);
  var duplicateConfigName = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getDuplicateConfigName)(configType);
  var config = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useStorageStore)(function (state) {
    return state[configName];
  });
  var duplicateConfig = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useStorageStore)(function (state) {
    return state[duplicateConfigName];
  });
  var updateConfig = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useStorageStore)(function (state) {
    return state.updateConfig;
  });
  var updateDuplicateConfig = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useStorageStore)(function (state) {
    return state.updateDuplicateConfig;
  });
  var modelValue = config.modelName;
  var version = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.version;
  });
  var deckNames = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.deckNames;
  });
  var modelNames = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.modelNames;
  });
  var fieldNamesObject = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.fieldNamesObject;
  });
  var modelFieldNames = modelValue == null ? undefined : fieldNamesObject[modelValue];
  var disabled = version == null;
  var connected = version != null;
  var headerTitle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _ConfigType$Word$Conf;

    return (_ConfigType$Word$Conf = {}, _defineProperty(_ConfigType$Word$Conf, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Word, "单词配置"), _defineProperty(_ConfigType$Word$Conf, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Phrase, "短语配置"), _defineProperty(_ConfigType$Word$Conf, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Sentence, "句子配置"), _ConfigType$Word$Conf)[configType];
  }, [configType]);
  var modelFieldObject = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _ConfigType$Word$Conf2;

    return (_ConfigType$Word$Conf2 = {}, _defineProperty(_ConfigType$Word$Conf2, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Word, _configuration__WEBPACK_IMPORTED_MODULE_7__.WORD_FIELDS_MAP), _defineProperty(_ConfigType$Word$Conf2, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Phrase, _configuration__WEBPACK_IMPORTED_MODULE_7__.PHRASE_FIELDS_MAP), _defineProperty(_ConfigType$Word$Conf2, _types__WEBPACK_IMPORTED_MODULE_1__.ConfigType.Sentence, _configuration__WEBPACK_IMPORTED_MODULE_7__.SENTENCE_FIELDS_MAP), _ConfigType$Word$Conf2)[configType];
  }, [configType]);

  var _useMemo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_8__.extractEntry)(_configuration__WEBPACK_IMPORTED_MODULE_7__.COMMON_CONFIG_MAP, "deckName");
  }, []),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      deckName = _useMemo2[0],
      deckText = _useMemo2[1];

  var _useMemo3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_8__.extractEntry)(_configuration__WEBPACK_IMPORTED_MODULE_7__.COMMON_CONFIG_MAP, "modelName");
  }, []),
      _useMemo4 = _slicedToArray(_useMemo3, 2),
      modelName = _useMemo4[0],
      modelText = _useMemo4[1];

  var _useMemo5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_8__.extractEntry)(_configuration__WEBPACK_IMPORTED_MODULE_7__.COMMON_CONFIG_MAP, "tags");
  }, []),
      _useMemo6 = _slicedToArray(_useMemo5, 2),
      tagsName = _useMemo6[0],
      tagsText = _useMemo6[1];

  var args = {
    connected: connected,
    configName: configName,
    duplicateConfigName: duplicateConfigName,
    updateConfig: updateConfig,
    updateDuplicateConfig: updateDuplicateConfig
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_6__.H3, {
    className: "col-span-4"
  }, headerTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_6__.Fieldset, {
    disabled: disabled
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SelectItem__WEBPACK_IMPORTED_MODULE_5__.SelectItem, _extends({}, args, {
    name: deckName,
    text: deckText,
    options: deckNames,
    value: config[deckName] || "",
    duplicateValue: !!duplicateConfig[deckName],
    className: "col-span-3"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SelectItem__WEBPACK_IMPORTED_MODULE_5__.SelectItem, _extends({}, args, {
    name: modelName,
    text: modelText,
    options: modelNames,
    value: config[modelName] || "",
    duplicateValue: !!duplicateConfig[modelName],
    className: "col-span-3"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TagsItem__WEBPACK_IMPORTED_MODULE_4__.TagsItem, {
    name: tagsName,
    text: tagsText,
    configName: configName,
    value: config[tagsName] || "",
    updateConfig: updateConfig
  }), Object.entries(modelFieldObject).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        text = _ref2[1];

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SelectItem__WEBPACK_IMPORTED_MODULE_5__.SelectItem, _extends({}, args, {
      key: name,
      name: name,
      text: text,
      options: modelFieldNames //@ts-ignore 是相互匹配的
      ,
      value: config[name] || "" //@ts-ignore 是相互匹配的
      ,
      duplicateValue: !!duplicateConfig[name],
      className: "col-span-1"
    }));
  })));
});

/***/ }),

/***/ "./src/options-page/components/BasisConfig.tsx":
/*!*****************************************************!*\
  !*** ./src/options-page/components/BasisConfig.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasisConfig": () => (/* binding */ BasisConfig)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _pure_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pure-components */ "./src/options-page/pure-components/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils */ "./src/utils/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var BasisConfig = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function BasisConfig() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.H3, {
    className: "col-span-4"
  }, "\u57FA\u7840\u914D\u7F6E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Fieldset, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ConnectionMethod, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ConnectionURL, null)));
});
var ConnectionMethod = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function ConnectionMethod() {
  var value = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.useStorageStore)(function (state) {
    return state.ankiConnectionMethod;
  });

  var _useMemo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.extractEntry)(_configuration__WEBPACK_IMPORTED_MODULE_4__.ANKI_CONNECTION_MAP, "ankiConnectionMethod");
  }, []),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      name = _useMemo2[0],
      text = _useMemo2[1];

  var id = "basis-config-".concat(text);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Label, {
    className: "col-span-1",
    htmlFor: id
  }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Select, {
    id: id,
    name: name,
    value: value,
    className: "col-span-3",
    onChange: function onChange() {
      //暂时没有其它连接anki的方法
      return void 0;
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: value
  }, value)));
});
var ConnectionURL = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function ConnectionURL() {
  var value = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.useStorageStore)(function (state) {
    return state.ankiConnectionURL;
  });
  var update = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.useStorageStore)(function (state) {
    return state.updateOtherConfig;
  });

  var _useMemo3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.extractEntry)(_configuration__WEBPACK_IMPORTED_MODULE_4__.ANKI_CONNECTION_MAP, "ankiConnectionURL");
  }, []),
      _useMemo4 = _slicedToArray(_useMemo3, 2),
      name = _useMemo4[0],
      text = _useMemo4[1];

  var handleChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    update(name, event.target.value);
  }, [update, name]);
  var handleClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return update(name, _configuration__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_ANKI_CONNECTION_URL);
  }, [update, name]);
  var id = "basis-config-".concat(text);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Label, {
    className: "col-span-1",
    htmlFor: id
  }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-span-3 flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Input, {
    id: id,
    name: name,
    type: "text",
    value: value,
    className: "flex-1 mr-2",
    onChange: handleChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      className: " \r px-2  \r rounded  \r border-none \r text-white \r bg-green-light  \r hover:bg-green-dark  \r focus:outline-none  \r focus:ring-2  \r focus:ring-green-800 \r cursor-pointer \r ",
      onClick: handleClick
    }, "\u91CD\u7F6E");
  }, [handleClick])));
});

/***/ }),

/***/ "./src/options-page/components/ConfigTabs.tsx":
/*!****************************************************!*\
  !*** ./src/options-page/components/ConfigTabs.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigTabs": () => (/* binding */ ConfigTabs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/tabs/tabs.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/options-page/types/index.ts");
/* harmony import */ var _AnkiConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnkiConfig */ "./src/options-page/components/AnkiConfig.tsx");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _BasisConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BasisConfig */ "./src/options-page/components/BasisConfig.tsx");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var ConfigTabs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function ConfigTabs() {
  var _TabPanelName$Home$Ta;

  var checkedTabPanel = (0,_stores__WEBPACK_IMPORTED_MODULE_4__.useStorageStore)(function (state) {
    return state.checkedTabPanel;
  });
  var update = (0,_stores__WEBPACK_IMPORTED_MODULE_4__.useStorageStore)(function (state) {
    return state.updateOtherConfig;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return (0,_extensions_api__WEBPACK_IMPORTED_MODULE_6__.onStorageChange)({
      checkedTabPanel: function checkedTabPanel(_, val) {
        update("checkedTabPanel", val);
      }
    });
  }, [update]);
  var onChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (key) {
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_6__.setStorage)({
      checkedTabPanel: key
    });
  }, []);
  var selectedIndex = (_TabPanelName$Home$Ta = {}, _defineProperty(_TabPanelName$Home$Ta, _extensions_api__WEBPACK_IMPORTED_MODULE_6__.TabPanelName.Home, 0), _defineProperty(_TabPanelName$Home$Ta, _extensions_api__WEBPACK_IMPORTED_MODULE_6__.TabPanelName.Word, 1), _defineProperty(_TabPanelName$Home$Ta, _extensions_api__WEBPACK_IMPORTED_MODULE_6__.TabPanelName.Phrase, 2), _defineProperty(_TabPanelName$Home$Ta, _extensions_api__WEBPACK_IMPORTED_MODULE_6__.TabPanelName.Sentence, 3), _TabPanelName$Home$Ta)[checkedTabPanel];
  var classNameCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_ref) {
    var selected = _ref.selected;
    return classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      "prior:text-red-600 prior:border-red-600 prior:border-b-2": selected
    }, "\n          mt-1 mx-2 \n          px-2 \n          first:ml-0\n          font-bold text-base\n          text-gray-600 \n          cursor-pointer \n          flex-shrink-0\n          focus-visible:outline-none\n          focus-visible:ring-2\n          focus-visible:ring-offset-slate-50\n        ");
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Group, {
    onChange: onChange,
    selectedIndex: selectedIndex
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.List, {
    className: "flex justify-around border-b mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab, {
    className: classNameCallback
  }, "\u57FA\u7840\u914D\u7F6E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab, {
    className: classNameCallback
  }, "\u5355\u8BCD\u914D\u7F6E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab, {
    className: classNameCallback
  }, "\u77ED\u8BED\u914D\u7F6E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab, {
    className: classNameCallback
  }, "\u53E5\u5B50\u914D\u7F6E")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panels, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_BasisConfig__WEBPACK_IMPORTED_MODULE_5__.BasisConfig, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AnkiConfig__WEBPACK_IMPORTED_MODULE_3__.AnkiConfig, {
    configType: _types__WEBPACK_IMPORTED_MODULE_2__.ConfigType.Word
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AnkiConfig__WEBPACK_IMPORTED_MODULE_3__.AnkiConfig, {
    configType: _types__WEBPACK_IMPORTED_MODULE_2__.ConfigType.Phrase
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Tab.Panel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AnkiConfig__WEBPACK_IMPORTED_MODULE_3__.AnkiConfig, {
    configType: _types__WEBPACK_IMPORTED_MODULE_2__.ConfigType.Sentence
  })))));
});

/***/ }),

/***/ "./src/options-page/components/Footer.tsx":
/*!************************************************!*\
  !*** ./src/options-page/components/Footer.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Footer": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
/* harmony import */ var _translation_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/translation-page */ "./src/translation-page/index.ts");
/* harmony import */ var _pure_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pure-components */ "./src/options-page/pure-components/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var Footer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function Footer() {
  var version = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.version;
  });
  var alertMessages = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.alertMessages;
  });
  var fetchAnki = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.useAnkiStore)(function (state) {
    return state.fetchAnki;
  });
  var isNil = alertMessages.length === 0;
  var connected = version != null; //刷新操作

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isRefreshing = _useState2[0],
      setIsRefreshing = _useState2[1];

  var refresh = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (isRefreshing) return;
    setIsRefreshing(true);
    fetchAnki();
    var unsubscribe = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.ankiStoreSubscribe)(function () {
      unsubscribe();
      setIsRefreshing(false);
    });
  }, [isRefreshing, fetchAnki]); //处理保存

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSaving = _useState4[0],
      setIsSaving = _useState4[1];

  var saveOptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (isSaving) return;
    setIsSaving(true);
    var storage = (0,_stores__WEBPACK_IMPORTED_MODULE_2__.getStorage)();
    (0,_extensions_api__WEBPACK_IMPORTED_MODULE_3__.setStorage)(storage, function () {
      setTimeout(function () {
        setIsSaving(false);
      }, 800);
    });
  }, [isSaving]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (isRefreshing || isSaving) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_translation_page__WEBPACK_IMPORTED_MODULE_4__.Loading, {
    className: "absolute inset-0 z-50"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
    className: "\r flex \r items-center \r justify-between \r mt-1 \r border-t \r border-dashed \r border-gray-600 \r overflow-hidden\r "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    type: "button",
    onClick: refresh,
    title: "\u5982\u679C anki \u53D1\u751F\u6539\u53D8,\u5219\u53EF\u4EE5\u6309\u4E0B\u8BE5\u6309\u94AE\u8FDB\u884C\u5237\u65B0\uFF0C\u4EE5\u540C\u6B65anki\u66F4\u6539"
  }, "\u5237\u65B0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    role: "status",
    "aria-labelledby": "connectionStatus",
    className: "p-1 mr-1 text-sm flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    id: "connectionStatus"
  }, "\u8FDE\u63A5\u72B6\u6001\uFF1A"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      "text-red-500": !connected
    })
  }, connected ? "已连接" : "未连接")), !isNil && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    tabIndex: 0,
    className: " px-1 py-0.5 mr-1 text-sm text-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 warning-message "
  }, "\u8B66\u544A\u4FE1\u606F"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    type: "button",
    onClick: saveOptions
  }, "\u4FDD\u5B58"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    type: "button",
    onClick: window.close
  }, "\u9000\u51FA")));
});

/***/ }),

/***/ "./src/options-page/components/OptionsPage.tsx":
/*!*****************************************************!*\
  !*** ./src/options-page/components/OptionsPage.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsPage": () => (/* binding */ OptionsPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _ConfigTabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigTabs */ "./src/options-page/components/ConfigTabs.tsx");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer */ "./src/options-page/components/Footer.tsx");




function OptionsPage() {
  var fetchAnki = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.useAnkiStore)(function (state) {
    return state.fetchAnki;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchAnki();
  }, [fetchAnki]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    action: "#",
    className: "relative flex flex-col h-full "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ConfigTabs__WEBPACK_IMPORTED_MODULE_2__.ConfigTabs, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_3__.Footer, null));
}

/***/ }),

/***/ "./src/options-page/components/SelectItem.tsx":
/*!****************************************************!*\
  !*** ./src/options-page/components/SelectItem.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => (/* binding */ Select),
/* harmony export */   "SelectItem": () => (/* binding */ SelectItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pure_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pure-components */ "./src/options-page/pure-components/index.ts");
var _excluded = ["className", "value", "connected"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var SelectItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function SelectItem(props) {
  var configName = props.configName,
      duplicateConfigName = props.duplicateConfigName,
      name = props.name,
      text = props.text,
      value = props.value,
      options = props.options,
      className = props.className,
      connected = props.connected,
      duplicateValue = props.duplicateValue,
      updateConfig = props.updateConfig,
      updateDuplicateConfig = props.updateDuplicateConfig;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_2__.Label, {
    className: "col-span-1"
  }, text, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    className: "align-[-1px] focus:outline-none focus:ring-2 focus:ring-offset-slate-50 ",
    title: "\u7528\u4E8E\u5224\u65AD\u662F\u5426\u91CD\u590D\u6DFB\u52A0\uFF0C\u9009\u4E2D\u8D8A\u591A\u5224\u65AD\u8D8A\u4E25\u683C(\u547D\u4E2D\u91CD\u590D\u7684\u6982\u7387\u66F4\u4F4E\uFF0C\u66F4\u591A\u7C7B\u4F3C\u7684\u5361\u7247\u88AB\u6DFB\u52A0)\uFF0C\u53CD\u4E4B\u5219\u8D8A\u5BBD\u677E(\u547D\u4E2D\u91CD\u590D\u7684\u6982\u7387\u66F4\u9AD8\uFF0C\u66F4\u5C11\u7C7B\u4F3C\u7684\u5361\u7247\u88AB\u6DFB\u52A0)\uFF0C\u63A8\u8350\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E\u3002",
    checked: duplicateValue,
    onChange: function onChange(event) {
      updateDuplicateConfig(duplicateConfigName, //@ts-ignore 能够正确匹配的
      name, event.target.checked);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Select, {
    name: name,
    value: value,
    "aria-label": text,
    connected: connected,
    className: className,
    options: options,
    onChange: function onChange(event) {
      updateConfig(configName, //@ts-ignore 是能够正确匹配的
      name, event.target.value);
    }
  }));
});
var Select = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function Select(props) {
  var className = props.className,
      value = props.value,
      connected = props.connected,
      other = _objectWithoutProperties(props, _excluded);

  var options = props.options;
  var isNil = options == null || options.length === 0;

  if (isNil) {
    options = [""];
  } else {
    options = [""].concat(options);
  }

  var containValue = options.includes(value);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", _extends({}, other, {
    value: value,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("\n          rounded\n          border\n          border-black\n          focus:outline-none \n          focus:ring-2 \n          focus:ring-offset-slate-50 \n        ", className, {
      "prior:border-red-500": connected && !containValue
    }),
    title: connected && !containValue ? "[".concat(value, "]\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9") : undefined
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Options, {
    options: options
  }, !containValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: value
  }, value)));
});

function Options(props) {
  var options = props.options,
      children = props.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children, options && options.map(function (value) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      value: value,
      key: value
    }, value);
  }));
}

/***/ }),

/***/ "./src/options-page/components/TagsItem.tsx":
/*!**************************************************!*\
  !*** ./src/options-page/components/TagsItem.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagsItem": () => (/* binding */ TagsItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pure_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pure-components */ "./src/options-page/pure-components/index.ts");


var TagsItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function TagsInput(props) {
  var configName = props.configName,
      value = props.value,
      name = props.name,
      text = props.text,
      updateConfig = props.updateConfig;
  var handleChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    //@ts-ignore 能够正确匹配的
    updateConfig(configName, name, event.target.value);
  }, [updateConfig, name, configName]);
  var id = "".concat(configName, "-").concat(name);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_1__.Label, {
    htmlFor: id,
    className: "col-span-1"
  }, text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pure_components__WEBPACK_IMPORTED_MODULE_1__.Input, {
    id: id,
    type: "text",
    name: name,
    value: value,
    className: "col-span-3",
    onChange: handleChange
  }));
});

/***/ }),

/***/ "./src/options-page/index.tsx":
/*!************************************!*\
  !*** ./src/options-page/index.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/.pnpm/registry.npmmirror.com+react-dom@18.2.0_react@18.2.0/node_modules/react-dom/client.js");
/* harmony import */ var _components_OptionsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/OptionsPage */ "./src/options-page/components/OptionsPage.tsx");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores */ "./src/options-page/stores/index.ts");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index.css */ "./src/index.css");





var root = document.getElementById("root");
root.classList.add("h-[26rem]", "w-[30rem]");
(0,_stores__WEBPACK_IMPORTED_MODULE_3__.fetchStorage)();
var unsubscribe = (0,_stores__WEBPACK_IMPORTED_MODULE_3__.storageStoreSubscribe)(function () {
  unsubscribe();
  (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root).render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_OptionsPage__WEBPACK_IMPORTED_MODULE_2__.OptionsPage, null)));
});

/***/ }),

/***/ "./src/options-page/pure-components/Button.tsx":
/*!*****************************************************!*\
  !*** ./src/options-page/pure-components/Button.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["children", "className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



/**
 * button标签的UI封装
 */

var Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function Button(props, ref) {
  var children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", _extends({
    ref: ref
  }, other, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("\n          w-20 \n          p-1 \n          m-1 \n          rounded \n          border-none \n          text-center\n          text-white \n          bg-green-light \n          hover:bg-green-dark \n          cursor-pointer \n          focus:outline-none \n          focus:ring-2 \n          focus:ring-green-800\n        ", className)
  }), children);
});

/***/ }),

/***/ "./src/options-page/pure-components/Fieldset.tsx":
/*!*******************************************************!*\
  !*** ./src/options-page/pure-components/Fieldset.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fieldset": () => (/* binding */ Fieldset)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["children", "className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



/**
 * fieldset标签的UI封装
 */

var Fieldset = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function Fieldset(props, ref) {
  var children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("fieldset", _extends({
    ref: ref
  }, other, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("grid grid-cols-4 gap-y-1 gap-x-2 px-2 text-black text-base", className)
  }), children);
});

/***/ }),

/***/ "./src/options-page/pure-components/H3.tsx":
/*!*************************************************!*\
  !*** ./src/options-page/pure-components/H3.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H3": () => (/* binding */ H3)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["children", "className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



/**
 * h3标签的UI封装
 */

var H3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function H3(props, ref) {
  var children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", _extends({
    ref: ref
  }, other, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("mb-1 py-1 px-2 rounded-t text-white text-lg bg-blue-gray", className)
  }), children);
});

/***/ }),

/***/ "./src/options-page/pure-components/Input.tsx":
/*!****************************************************!*\
  !*** ./src/options-page/pure-components/Input.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



/**
 * input标签的UI封装
 */

var Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function Input(props, ref) {
  var className = props.className,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", _extends({
    ref: ref
  }, other, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("\n          px-1\n          rounded \n          border\n          border-black\n          outline-none \n          focus:outline-none \n          focus:ring-2 \n          focus:ring-offset-slate-50 \n        ", className)
  }));
});

/***/ }),

/***/ "./src/options-page/pure-components/Label.tsx":
/*!****************************************************!*\
  !*** ./src/options-page/pure-components/Label.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Label": () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _excluded = ["children"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


/**
 * label标签的UI封装
 */

var Label = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function Label(props, ref) {
  var children = props.children,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", _extends({
    ref: ref
  }, other), children);
});

/***/ }),

/***/ "./src/options-page/pure-components/Select.tsx":
/*!*****************************************************!*\
  !*** ./src/options-page/pure-components/Select.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["className", "children"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



/**
 * 对select标签的封装,添加了一些默认样式
 */

var Select = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function Select(props, ref) {
  var className = props.className,
      children = props.children,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", _extends({
    ref: ref
  }, other, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, "\n          rounded\n          border\n          border-black\n          focus:outline-none \n          focus:ring-2 \n          focus:ring-offset-slate-50 \n        ")
  }), children);
});

/***/ }),

/***/ "./src/options-page/pure-components/index.ts":
/*!***************************************************!*\
  !*** ./src/options-page/pure-components/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_0__.Button),
/* harmony export */   "Fieldset": () => (/* reexport safe */ _Fieldset__WEBPACK_IMPORTED_MODULE_1__.Fieldset),
/* harmony export */   "H3": () => (/* reexport safe */ _H3__WEBPACK_IMPORTED_MODULE_2__.H3),
/* harmony export */   "Input": () => (/* reexport safe */ _Input__WEBPACK_IMPORTED_MODULE_3__.Input),
/* harmony export */   "Label": () => (/* reexport safe */ _Label__WEBPACK_IMPORTED_MODULE_4__.Label),
/* harmony export */   "Select": () => (/* reexport safe */ _Select__WEBPACK_IMPORTED_MODULE_5__.Select)
/* harmony export */ });
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./src/options-page/pure-components/Button.tsx");
/* harmony import */ var _Fieldset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fieldset */ "./src/options-page/pure-components/Fieldset.tsx");
/* harmony import */ var _H3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./H3 */ "./src/options-page/pure-components/H3.tsx");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Input */ "./src/options-page/pure-components/Input.tsx");
/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Label */ "./src/options-page/pure-components/Label.tsx");
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select */ "./src/options-page/pure-components/Select.tsx");







/***/ }),

/***/ "./src/options-page/stores/ankiStore.ts":
/*!**********************************************!*\
  !*** ./src/options-page/stores/ankiStore.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ankiStoreSubscribe": () => (/* binding */ ankiStoreSubscribe),
/* harmony export */   "useAnkiStore": () => (/* binding */ useAnkiStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/configuration */ "./src/configuration/index.ts");
/* harmony import */ var _anki__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/anki */ "./src/anki/index.ts");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var useAnkiStore = (0,zustand__WEBPACK_IMPORTED_MODULE_3__["default"])(function (set) {
  return {
    deckNames: [],
    modelNames: [],
    alertMessages: [],
    version: undefined,
    fieldNamesObject: {},
    fetchAnki: function fetchAnki() {
      return _asyncToGenerator(function* () {
        //每次刷新都初始化,以避免上次的状态遗留影响本次的状态
        var result = {
          deckNames: [],
          modelNames: [],
          alertMessages: [],
          version: undefined,
          fieldNamesObject: {}
        };

        var _yield$postBackend = yield (0,_extensions_api__WEBPACK_IMPORTED_MODULE_2__.postBackend)(_configuration__WEBPACK_IMPORTED_MODULE_0__.Command.GetVersion),
            version = _yield$postBackend.data,
            status0 = _yield$postBackend.status,
            message0 = _yield$postBackend.message;

        if (status0 !== _anki__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Success) {
          result.alertMessages.push(message0);
          return set(result);
        } else {
          result.version = version;
        }

        var _yield$postBackend2 = yield (0,_extensions_api__WEBPACK_IMPORTED_MODULE_2__.postBackend)(_configuration__WEBPACK_IMPORTED_MODULE_0__.Command.GetDeckNames),
            deckNames = _yield$postBackend2.data,
            status1 = _yield$postBackend2.status,
            message1 = _yield$postBackend2.message;

        if (status1 !== _anki__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Success) {
          result.alertMessages.push(message1);
        } else {
          result.deckNames = deckNames;
        }

        var _yield$postBackend3 = yield (0,_extensions_api__WEBPACK_IMPORTED_MODULE_2__.postBackend)(_configuration__WEBPACK_IMPORTED_MODULE_0__.Command.GetModelNames),
            modelNames = _yield$postBackend3.data,
            status2 = _yield$postBackend3.status,
            message2 = _yield$postBackend3.message;

        if (status2 !== _anki__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Success) {
          result.alertMessages.push(message2);
        } else {
          result.modelNames = modelNames;
        }

        var fieldNamesObject = {};
        modelNames === null || modelNames === void 0 ? void 0 : modelNames.forEach( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (modelName) {
            var _yield$postBackend4 = yield (0,_extensions_api__WEBPACK_IMPORTED_MODULE_2__.postBackend)(_configuration__WEBPACK_IMPORTED_MODULE_0__.Command.GetModelFieldNames, modelName),
                status = _yield$postBackend4.status,
                message = _yield$postBackend4.message,
                modelFieldNames = _yield$postBackend4.data;

            if (status !== _anki__WEBPACK_IMPORTED_MODULE_1__.AnkiResponseStatus.Success) {
              result.alertMessages.push(message);
            } else {
              fieldNamesObject[modelName] = modelFieldNames;
            }
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        result.fieldNamesObject = fieldNamesObject;
        return set(result);
      })();
    }
  };
});
var ankiStoreSubscribe = useAnkiStore.subscribe;

/***/ }),

/***/ "./src/options-page/stores/index.ts":
/*!******************************************!*\
  !*** ./src/options-page/stores/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ankiStoreSubscribe": () => (/* reexport safe */ _ankiStore__WEBPACK_IMPORTED_MODULE_0__.ankiStoreSubscribe),
/* harmony export */   "fetchStorage": () => (/* reexport safe */ _storageStore__WEBPACK_IMPORTED_MODULE_1__.fetchStorage),
/* harmony export */   "getStorage": () => (/* reexport safe */ _storageStore__WEBPACK_IMPORTED_MODULE_1__.getStorage),
/* harmony export */   "storageStoreSubscribe": () => (/* reexport safe */ _storageStore__WEBPACK_IMPORTED_MODULE_1__.storageStoreSubscribe),
/* harmony export */   "useAnkiStore": () => (/* reexport safe */ _ankiStore__WEBPACK_IMPORTED_MODULE_0__.useAnkiStore),
/* harmony export */   "useStorageStore": () => (/* reexport safe */ _storageStore__WEBPACK_IMPORTED_MODULE_1__.useStorageStore)
/* harmony export */ });
/* harmony import */ var _ankiStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ankiStore */ "./src/options-page/stores/ankiStore.ts");
/* harmony import */ var _storageStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storageStore */ "./src/options-page/stores/storageStore.ts");



/***/ }),

/***/ "./src/options-page/stores/storageStore.ts":
/*!*************************************************!*\
  !*** ./src/options-page/stores/storageStore.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchStorage": () => (/* binding */ fetchStorage),
/* harmony export */   "getStorage": () => (/* binding */ getStorage),
/* harmony export */   "storageStoreSubscribe": () => (/* binding */ storageStoreSubscribe),
/* harmony export */   "useStorageStore": () => (/* binding */ useStorageStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.omit */ "./node_modules/.pnpm/registry.npmmirror.com+lodash.omit@4.5.0/node_modules/lodash.omit/index.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand/middleware/immer */ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/middleware/immer.js");
/* harmony import */ var _extensions_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/extensions-api */ "./src/extensions-api/index.ts");




var useStorageStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__["default"])((0,zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_3__.immer)(function (set) {
  function updateConfig(configName, name, value) {
    set(function (state) {
      //@ts-ignore 是能够正确配对的
      state[configName][name] = value;
    });
  }

  function updateDuplicateConfig(configName, name, value) {
    set(function (state) {
      //@ts-ignore 是能够正确配对的
      state[configName][name] = value;
    });
  }

  return {
    fetchStorage: function fetchStorage() {
      (0,_extensions_api__WEBPACK_IMPORTED_MODULE_1__.getStorageByArray)(["wordConfig", "phraseConfig", "sentenceConfig", "checkWordDuplicate", "checkPhraseDuplicate", "checkSentenceDuplicate", "ankiConnectionMethod", "ankiConnectionURL", "checkedTabPanel"], function (val) {
        set(val);
      });
    },
    updateConfig: updateConfig,
    updateDuplicateConfig: updateDuplicateConfig,
    updateOtherConfig: function updateOtherConfig(name, value) {
      set(function (state) {
        state[name] = value;
      });
    }
  }; //设计上是，必须先调用 fetchStorage获取到 相应的数据后，才能够调用其它方法的
}));
var getStorage = function getStorage() {
  var state = useStorageStore.getState();
  return lodash_omit__WEBPACK_IMPORTED_MODULE_0___default()(state, ["fetchStorage", "updateConfig", "updateOtherConfig", "updateDuplicateConfig"]);
};
var fetchStorage = useStorageStore.getState().fetchStorage;
var storageStoreSubscribe = useStorageStore.subscribe;

/***/ }),

/***/ "./src/options-page/types/index.ts":
/*!*****************************************!*\
  !*** ./src/options-page/types/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigType": () => (/* binding */ ConfigType)
/* harmony export */ });
var ConfigType;

(function (ConfigType) {
  ConfigType[ConfigType["Word"] = 0] = "Word";
  ConfigType[ConfigType["Phrase"] = 1] = "Phrase";
  ConfigType[ConfigType["Sentence"] = 2] = "Sentence";
})(ConfigType || (ConfigType = {}));

/***/ }),

/***/ "./src/options-page/utils/index.ts":
/*!*****************************************!*\
  !*** ./src/options-page/utils/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfigName": () => (/* binding */ getConfigName),
/* harmony export */   "getDuplicateConfigName": () => (/* binding */ getDuplicateConfigName)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/options-page/types/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function getConfigName(configName) {
  var _obj;

  var obj = (_obj = {}, _defineProperty(_obj, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Word, "wordConfig"), _defineProperty(_obj, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Phrase, "phraseConfig"), _defineProperty(_obj, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Sentence, "sentenceConfig"), _obj);
  return obj[configName];
}
function getDuplicateConfigName(configName) {
  var _obj2;

  var obj = (_obj2 = {}, _defineProperty(_obj2, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Word, "checkWordDuplicate"), _defineProperty(_obj2, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Phrase, "checkPhraseDuplicate"), _defineProperty(_obj2, _types__WEBPACK_IMPORTED_MODULE_0__.ConfigType.Sentence, "checkSentenceDuplicate"), _obj2);
  return obj[configName];
}

/***/ }),

/***/ "./src/translation-page/components/Loading.tsx":
/*!*****************************************************!*\
  !*** ./src/translation-page/components/Loading.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loading": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/.pnpm/registry.npmmirror.com+classnames@2.3.1/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/**
 * 一个展示loading状态的组件
 */


var Loading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function Loading(props) {
  var className = props.className;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    title: "loading...",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("\n        inline-flex\n        flex-col\n        items-center\n        justify-center\n        px-4 py-2\n        font-bold\n        leading-6 \n        text-sm \n        shadow \n        rounded-md \n        text-white \n        bg-white/70\n        transition \n        ease-in-out \n        duration-150 \n        cursor-not-allowed\n        select-none\n      ", className)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    className: " animate-spin h-10 w-10  text-blue-700 ",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })));
});

/***/ }),

/***/ "./src/translation-page/index.ts":
/*!***************************************!*\
  !*** ./src/translation-page/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loading": () => (/* reexport safe */ _components_Loading__WEBPACK_IMPORTED_MODULE_0__.Loading)
/* harmony export */ });
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Loading */ "./src/translation-page/components/Loading.tsx");


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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
var shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/index.js");

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var useSyncExternalStore = shim.useSyncExternalStore;

// for CommonJS interop.

var useRef = React.useRef,
    useEffect = React.useEffect,
    useMemo = React.useMemo,
    useDebugValue = React.useDebugValue; // Same as useSyncExternalStore, but supports selector and isEqual arguments.

function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  // Use this to track the rendered snapshot.
  var instRef = useRef(null);
  var inst;

  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }

  var _useMemo = useMemo(function () {
    // Track the memoized state using closure variables that are local to this
    // memoized instance of a getSnapshot function. Intentionally not using a
    // useRef hook, because that state would be shared across all concurrent
    // copies of the hook/component.
    var hasMemo = false;
    var memoizedSnapshot;
    var memoizedSelection;

    var memoizedSelector = function (nextSnapshot) {
      if (!hasMemo) {
        // The first time the hook is called, there is no memoized result.
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;

        var _nextSelection = selector(nextSnapshot);

        if (isEqual !== undefined) {
          // Even if the selector has changed, the currently rendered selection
          // may be equal to the new selection. We should attempt to reuse the
          // current value if possible, to preserve downstream memoizations.
          if (inst.hasValue) {
            var currentSelection = inst.value;

            if (isEqual(currentSelection, _nextSelection)) {
              memoizedSelection = currentSelection;
              return currentSelection;
            }
          }
        }

        memoizedSelection = _nextSelection;
        return _nextSelection;
      } // We may be able to reuse the previous invocation's result.


      // We may be able to reuse the previous invocation's result.
      var prevSnapshot = memoizedSnapshot;
      var prevSelection = memoizedSelection;

      if (objectIs(prevSnapshot, nextSnapshot)) {
        // The snapshot is the same as last time. Reuse the previous selection.
        return prevSelection;
      } // The snapshot has changed, so we need to compute a new selection.


      // The snapshot has changed, so we need to compute a new selection.
      var nextSelection = selector(nextSnapshot); // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.

      // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    }; // Assigning this to a constant so that Flow knows it can't change.


    // Assigning this to a constant so that Flow knows it can't change.
    var maybeGetServerSnapshot = getServerSnapshot === undefined ? null : getServerSnapshot;

    var getSnapshotWithSelector = function () {
      return memoizedSelector(getSnapshot());
    };

    var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? undefined : function () {
      return memoizedSelector(maybeGetServerSnapshot());
    };
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]),
      getSelection = _useMemo[0],
      getServerSelection = _useMemo[1];

  var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
  useEffect(function () {
    inst.hasValue = true;
    inst.value = value;
  }, [value]);
  useDebugValue(value);
  return value;
}

exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/index.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/index.js ***!
  \*************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/with-selector.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/with-selector.js ***!
  \*********************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStore": () => (/* reexport safe */ zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "default": () => (/* binding */ create$1),
/* harmony export */   "useStore": () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/vanilla.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/.pnpm/registry.npmmirror.com+use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/with-selector.js");






const { useSyncExternalStoreWithSelector } = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__;
function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = typeof createState === "function" ? (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__["default"])(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var create$1 = create;




/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/middleware/immer.js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/middleware/immer.js ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "immer": () => (/* binding */ immer)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immer */ "./node_modules/.pnpm/registry.npmmirror.com+immer@9.0.15/node_modules/immer/dist/immer.esm.mjs");


const immerImpl = (initializer) => (set, get, store) => {
  store.setState = (updater, replace, ...a) => {
    const nextState = typeof updater === "function" ? (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(updater) : updater;
    return set(nextState, replace, ...a);
  };
  return initializer(store.setState, get, store);
};
const immer = immerImpl;




/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/vanilla.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/vanilla.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createStore)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(
    setState,
    getState,
    api
  );
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;




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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/tabs/tabs.js":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/tabs/tabs.js ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab": () => (/* binding */ we)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/render.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js");
/* harmony import */ var _hooks_use_id_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/use-id.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js");
/* harmony import */ var _utils_match_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/match.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/keyboard.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/keyboard.js");
/* harmony import */ var _utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/focus-management.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/focus-management.js");
/* harmony import */ var _hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/use-iso-morphic-effect.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js");
/* harmony import */ var _hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-sync-refs.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js");
/* harmony import */ var _hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/use-resolve-button-type.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js");
/* harmony import */ var _hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/use-latest-value.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-latest-value.js");
/* harmony import */ var _internal_focus_sentinel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../internal/focus-sentinel.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/focus-sentinel.js");
/* harmony import */ var _hooks_use_event_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/use-event.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js");
var re=(n=>(n[n.SetSelectedIndex=0]="SetSelectedIndex",n[n.RegisterTab=1]="RegisterTab",n[n.UnregisterTab=2]="UnregisterTab",n[n.RegisterPanel=3]="RegisterPanel",n[n.UnregisterPanel=4]="UnregisterPanel",n[n.ForceRerender=5]="ForceRerender",n))(re||{});let ne={[0](e,t){let r=e.tabs.filter(n=>{var l;return!((l=n.current)!=null&&l.hasAttribute("disabled"))});if(t.index<0)return{...e,selectedIndex:e.tabs.indexOf(r[0])};if(t.index>e.tabs.length)return{...e,selectedIndex:e.tabs.indexOf(r[r.length-1])};let s=e.tabs.slice(0,t.index),d=[...e.tabs.slice(t.index),...s].find(n=>r.includes(n));return d?{...e,selectedIndex:e.tabs.indexOf(d)}:e},[1](e,t){return e.tabs.includes(t.tab)?e:{...e,tabs:(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)([...e.tabs,t.tab],r=>r.current)}},[2](e,t){return{...e,tabs:(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.sortByDomNode)(e.tabs.filter(r=>r!==t.tab),r=>r.current)}},[3](e,t){return e.panels.includes(t.panel)?e:{...e,panels:[...e.panels,t.panel]}},[4](e,t){return{...e,panels:e.panels.filter(r=>r!==t.panel)}},[5](e){return{...e}}},N=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);N.displayName="TabsSSRContext";function B(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(N);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,B),r}return t}let K=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);K.displayName="TabsDataContext";function C(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(K);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,C),r}return t}let $=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);$.displayName="TabsActionsContext";function z(e){let t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)($);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,z),r}return t}function ae(e,t){return (0,_utils_match_js__WEBPACK_IMPORTED_MODULE_2__.match)(t.type,ne,e,t)}let le=react__WEBPACK_IMPORTED_MODULE_0__.Fragment,oe=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{defaultIndex:s=0,vertical:f=!1,manual:d=!1,onChange:n,selectedIndex:l=null,...P}=t;const u=f?"vertical":"horizontal",y=d?"manual":"auto";let c=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r),[p,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(ae,{selectedIndex:l!=null?l:s,tabs:[],panels:[]}),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selectedIndex:p.selectedIndex}),[p.selectedIndex]),g=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(n||(()=>{})),L=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(p.tabs),x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({orientation:u,activation:y,...p}),[u,y,p]),R=(0,_hooks_use_latest_value_js__WEBPACK_IMPORTED_MODULE_5__.useLatestValue)(p.selectedIndex),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({registerTab(i){return o({type:1,tab:i}),()=>o({type:2,tab:i})},registerPanel(i){return o({type:3,panel:i}),()=>o({type:4,panel:i})},forceRerender(){o({type:5})},change(i){R.current!==i&&g.current(i),R.current=i,o({type:0,index:i})}}),[o]);(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>{o({type:0,index:l!=null?l:s})},[l]);let H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({tabs:[],panels:[]}),w={ref:c};return react__WEBPACK_IMPORTED_MODULE_0__.createElement(N.Provider,{value:H},react__WEBPACK_IMPORTED_MODULE_0__.createElement($.Provider,{value:h},react__WEBPACK_IMPORTED_MODULE_0__.createElement(K.Provider,{value:x},x.tabs.length<=0&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(_internal_focus_sentinel_js__WEBPACK_IMPORTED_MODULE_7__.FocusSentinel,{onFocus:()=>{var i,I;for(let D of L.current)if(((i=D.current)==null?void 0:i.tabIndex)===0)return(I=D.current)==null||I.focus(),!0;return!1}}),(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:w,theirProps:P,slot:b,defaultTag:le,name:"Tabs"}))))}),se="div",ie=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{orientation:s,selectedIndex:f}=C("Tab.List"),d=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:{ref:d,role:"tablist","aria-orientation":s},theirProps:t,slot:{selectedIndex:f},defaultTag:se,name:"Tabs.List"})}),ue="button",ce=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){var I,D;let s=`headlessui-tabs-tab-${(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_8__.useId)()}`,{orientation:f,activation:d,selectedIndex:n,tabs:l,panels:P}=C("Tab"),u=z("Tab"),y=B("Tab"),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),p=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(c,r,a=>{!a||u.forceRerender()});(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>u.registerTab(c),[u,c]);let o=y.current.tabs.indexOf(s);o===-1&&(o=y.current.tabs.push(s)-1);let b=l.indexOf(c);b===-1&&(b=o);let g=b===n,L=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_9__.useEvent)(a=>{let A=l.map(X=>X.current).filter(Boolean);if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.Space||a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.Enter){a.preventDefault(),a.stopPropagation(),u.change(b);return}switch(a.key){case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.Home:case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.PageUp:return a.preventDefault(),a.stopPropagation(),(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.First);case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.End:case _components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.PageDown:return a.preventDefault(),a.stopPropagation(),(0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Last)}if((0,_utils_match_js__WEBPACK_IMPORTED_MODULE_2__.match)(f,{vertical(){if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.ArrowUp)return (0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Previous|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround);if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.ArrowDown)return (0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Next|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround)},horizontal(){if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.ArrowLeft)return (0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Previous|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround);if(a.key===_components_keyboard_js__WEBPACK_IMPORTED_MODULE_10__.Keys.ArrowRight)return (0,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.focusIn)(A,_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.Next|_utils_focus_management_js__WEBPACK_IMPORTED_MODULE_1__.Focus.WrapAround)}}))return a.preventDefault()}),x=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_9__.useEvent)(()=>{var a;(a=c.current)==null||a.focus()}),R=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_9__.useEvent)(()=>{var a;(a=c.current)==null||a.focus(),u.change(b)}),h=(0,_hooks_use_event_js__WEBPACK_IMPORTED_MODULE_9__.useEvent)(a=>{a.preventDefault()}),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selected:g}),[g]),w=t,i={ref:p,onKeyDown:L,onFocus:d==="manual"?x:R,onMouseDown:h,onClick:R,id:s,role:"tab",type:(0,_hooks_use_resolve_button_type_js__WEBPACK_IMPORTED_MODULE_11__.useResolveButtonType)(t,c),"aria-controls":(D=(I=P[b])==null?void 0:I.current)==null?void 0:D.id,"aria-selected":g,tabIndex:g?0:-1};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:i,theirProps:w,slot:H,defaultTag:ue,name:"Tabs.Tab"})}),pe="div",de=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){let{selectedIndex:s}=C("Tab.Panels"),f=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(r),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selectedIndex:s}),[s]);return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:{ref:f},theirProps:t,slot:d,defaultTag:pe,name:"Tabs.Panels"})}),fe="div",be=_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.Features.RenderStrategy|_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.Features.Static,Te=(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(function(t,r){var x,R;let{selectedIndex:s,tabs:f,panels:d}=C("Tab.Panel"),n=z("Tab.Panel"),l=B("Tab.Panel"),P=`headlessui-tabs-panel-${(0,_hooks_use_id_js__WEBPACK_IMPORTED_MODULE_8__.useId)()}`,u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),y=(0,_hooks_use_sync_refs_js__WEBPACK_IMPORTED_MODULE_4__.useSyncRefs)(u,r,h=>{!h||n.forceRerender()});(0,_hooks_use_iso_morphic_effect_js__WEBPACK_IMPORTED_MODULE_6__.useIsoMorphicEffect)(()=>n.registerPanel(u),[n,u]);let c=l.current.panels.indexOf(P);c===-1&&(c=l.current.panels.push(P)-1);let p=d.indexOf(u);p===-1&&(p=c);let o=p===s,b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({selected:o}),[o]),g=t,L={ref:y,id:P,role:"tabpanel","aria-labelledby":(R=(x=f[p])==null?void 0:x.current)==null?void 0:R.id,tabIndex:o?0:-1};return (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__.render)({ourProps:L,theirProps:g,slot:b,defaultTag:fe,features:be,visible:o,name:"Tabs.Panel"})}),we=Object.assign(ce,{Group:oe,List:ie,Panels:de,Panel:Te});


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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/focus-sentinel.js":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/focus-sentinel.js ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FocusSentinel": () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/.pnpm/registry.npmmirror.com+react@18.2.0/node_modules/react/index.js");
/* harmony import */ var _hidden_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hidden.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/hidden.js");
function p({onFocus:n}){let[r,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0);return r?react__WEBPACK_IMPORTED_MODULE_0__.createElement(_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Hidden,{as:"button",type:"button",features:_hidden_js__WEBPACK_IMPORTED_MODULE_1__.Features.Focusable,onFocus:a=>{a.preventDefault();let e,u=50;function t(){if(u--<=0){e&&cancelAnimationFrame(e);return}if(n()){o(!1),cancelAnimationFrame(e);return}e=requestAnimationFrame(t)}e=requestAnimationFrame(t)}}):null}


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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/focus-management.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/focus-management.js ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Focus": () => (/* binding */ p),
/* harmony export */   "FocusResult": () => (/* binding */ L),
/* harmony export */   "FocusableMode": () => (/* binding */ b),
/* harmony export */   "focusElement": () => (/* binding */ F),
/* harmony export */   "focusIn": () => (/* binding */ H),
/* harmony export */   "getFocusableElements": () => (/* binding */ T),
/* harmony export */   "isFocusableElement": () => (/* binding */ S),
/* harmony export */   "sortByDomNode": () => (/* binding */ v)
/* harmony export */ });
/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./match.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js");
/* harmony import */ var _owner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./owner.js */ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/owner.js");
let f=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var p=(o=>(o[o.First=1]="First",o[o.Previous=2]="Previous",o[o.Next=4]="Next",o[o.Last=8]="Last",o[o.WrapAround=16]="WrapAround",o[o.NoScroll=32]="NoScroll",o))(p||{}),L=(n=>(n[n.Error=0]="Error",n[n.Overflow=1]="Overflow",n[n.Success=2]="Success",n[n.Underflow=3]="Underflow",n))(L||{}),N=(t=>(t[t.Previous=-1]="Previous",t[t.Next=1]="Next",t))(N||{});function T(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(f))}var b=(t=>(t[t.Strict=0]="Strict",t[t.Loose=1]="Loose",t))(b||{});function S(e,r=0){var t;return e===((t=(0,_owner_js__WEBPACK_IMPORTED_MODULE_0__.getOwnerDocument)(e))==null?void 0:t.body)?!1:(0,_match_js__WEBPACK_IMPORTED_MODULE_1__.match)(r,{[0](){return e.matches(f)},[1](){let l=e;for(;l!==null;){if(l.matches(f))return!0;l=l.parentElement}return!1}})}function F(e){e==null||e.focus({preventScroll:!0})}let M=["textarea","input"].join(",");function h(e){var r,t;return(t=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,M))!=null?t:!1}function v(e,r=t=>t){return e.slice().sort((t,l)=>{let n=r(t),i=r(l);if(n===null||i===null)return 0;let o=n.compareDocumentPosition(i);return o&Node.DOCUMENT_POSITION_FOLLOWING?-1:o&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function H(e,r,t=!0){let l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,n=Array.isArray(e)?t?v(e):e:T(e),i=l.activeElement,o=(()=>{if(r&5)return 1;if(r&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,n.indexOf(i))-1;if(r&4)return Math.max(0,n.indexOf(i))+1;if(r&8)return n.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),m=r&32?{preventScroll:!0}:{},c=0,s=n.length,u;do{if(c>=s||c+s<=0)return 0;let a=d+c;if(r&16)a=(a+s)%s;else{if(a<0)return 3;if(a>=s)return 1}u=n[a],u==null||u.focus(m),c+=o}while(u!==l.activeElement);return r&6&&h(u)&&u.select(),u.hasAttribute("tabindex")||u.setAttribute("tabindex","0"),2}


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

/***/ "./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/owner.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+@headlessui+react@1.6.6_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/owner.js ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOwnerDocument": () => (/* binding */ t)
/* harmony export */ });
function t(n){return typeof window=="undefined"?null:n instanceof Node?n.ownerDocument:n!=null&&n.hasOwnProperty("current")&&n.current instanceof Node?n.current.ownerDocument:document}


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


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+immer@9.0.15/node_modules/immer/dist/immer.esm.mjs":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+immer@9.0.15/node_modules/immer/dist/immer.esm.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Immer": () => (/* binding */ un),
/* harmony export */   "applyPatches": () => (/* binding */ pn),
/* harmony export */   "castDraft": () => (/* binding */ K),
/* harmony export */   "castImmutable": () => (/* binding */ $),
/* harmony export */   "createDraft": () => (/* binding */ ln),
/* harmony export */   "current": () => (/* binding */ D),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "enableAllPlugins": () => (/* binding */ J),
/* harmony export */   "enableES5": () => (/* binding */ N),
/* harmony export */   "enableMapSet": () => (/* binding */ C),
/* harmony export */   "enablePatches": () => (/* binding */ T),
/* harmony export */   "finishDraft": () => (/* binding */ dn),
/* harmony export */   "freeze": () => (/* binding */ d),
/* harmony export */   "immerable": () => (/* binding */ L),
/* harmony export */   "isDraft": () => (/* binding */ r),
/* harmony export */   "isDraftable": () => (/* binding */ t),
/* harmony export */   "nothing": () => (/* binding */ H),
/* harmony export */   "original": () => (/* binding */ e),
/* harmony export */   "produce": () => (/* binding */ fn),
/* harmony export */   "produceWithPatches": () => (/* binding */ cn),
/* harmony export */   "setAutoFreeze": () => (/* binding */ sn),
/* harmony export */   "setUseProxies": () => (/* binding */ vn)
/* harmony export */ });
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(true){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[Q]}function t(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return false||U||n(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function O(n){g(n),n.p.forEach(S),n.p=null}function g(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s){if( true&&c===o&&n(5),r(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r(v))return;e.m=!1}if(t(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function D(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function N(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return true&&f(r),en.get(r,n)},set:function(r){var t=this[Q]; true&&f(t),en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.O&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.D,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=""+i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.D,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=R(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.O&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,O:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.D.set(n,!0),t.o.set(n,r),t.D.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.D.set(n,!1):r.D.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.D=new Map,i(n.t,(function(r){n.D.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=R(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,O:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{N:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){N(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return true&&isNaN(parseInt(t))&&n(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return true&&"length"!==t&&isNaN(parseInt(t))&&n(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?O(c):g(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.F&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; true&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n},i.setUseProxies=function(r){r&&!B&&n(20),this.g=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fn);
//# sourceMappingURL=immer.esm.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/options-page/index.tsx"));
/******/ }
]);
//# sourceMappingURL=optionsPage.js.map