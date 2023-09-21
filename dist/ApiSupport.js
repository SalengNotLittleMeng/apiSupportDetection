(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ApiSupport"] = factory();
	else
		root["ApiSupport"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiSupport)
/* harmony export */ });
/* harmony import */ var _options_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _request_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _info_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var _plugin_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* harmony import */ var _support_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);





class ApiSupport {
  constructor(options) {
    this.$options = (0,_options_merge__WEBPACK_IMPORTED_MODULE_0__.mergeOptions)(options);
    if (!this.flowLimitController(this)) {
      return;
    }
    (0,_request_request__WEBPACK_IMPORTED_MODULE_1__.initRequest)(this);
    (0,_plugin_plugin__WEBPACK_IMPORTED_MODULE_3__.initPlugin)(this);
    (0,_info_info__WEBPACK_IMPORTED_MODULE_2__.initInfo)(this);
    if (this.$options.immediate) {
      this.run();
    }
  }
  run() {
    const {
      filter,
      timeout
    } = this.$options;
    function raceTimeout() {
      return new Promise(reslove => {
        setTimeout(() => {
          reslove();
        }, timeout);
      });
    }
    Promise.race([(0,_support_support__WEBPACK_IMPORTED_MODULE_4__.collectApiSupportInfo)(this), raceTimeout()]).then(() => {
      let info = null;
      if (typeof filter == 'function') {
        info = filter(this.$info.getFinInfo());
      } else {
        info = this.$info.getFinInfo();
      }
      this.requestMessage(info);
    });
  }
  // 流量限制
  flowLimitController(vm) {
    const {
      limit
    } = vm.$options;
    return Math.random() <= limit;
  }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeOptions: () => (/* binding */ mergeOptions)
/* harmony export */ });
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _plugin_innerPlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



const verifyTypeParams = new Set(["js", "css", "html"]);
function mergeOptions(options) {
  verifyOptions(options);
  optionsFilter(options);
  return deepMerge(_default__WEBPACK_IMPORTED_MODULE_0__.defaultOptions, options);
}
//配置过滤器，处理配置保证标准化
function optionsFilter(options) {
  const {
    api,
    plugins
  } = options;
  if (typeof api == 'string') {
    options.api = [{
      name: api
    }];
  }
  if (typeof api === "object" && !Array.isArray(api)) {
    options.api = [api];
  }
  if (!plugins) {
    options.plugins = [];
  }
  if ((typeof plugins == "object" || 'string') && !Array.isArray(plugins)) {
    options.plugins = [plugins];
  }
  options.plugins = (0,_plugin_innerPlugin__WEBPACK_IMPORTED_MODULE_1__.useInnerPlugins)(options.plugins, options.api);
  options.api.forEach(item => {
    if (!item.type) {
      item.type = 'js';
    }
  });
}
// 检验配置合法性
function verifyOptions(options) {
  const {
    api = null,
    plugins
  } = options;
  if (!api) {
    (0,_error__WEBPACK_IMPORTED_MODULE_2__.handlerError)(_error__WEBPACK_IMPORTED_MODULE_2__.NEED_API);
  }
  if (typeof api !== 'string' && !isObjectOrArray(api)) {
    (0,_error__WEBPACK_IMPORTED_MODULE_2__.handlerError)(_error__WEBPACK_IMPORTED_MODULE_2__.API_NEED_ARRAY_OR_OBJECT);
  }
  if (options.type && verifyTypeParams.has(options.type)) {
    (0,_error__WEBPACK_IMPORTED_MODULE_2__.handlerError)(_error__WEBPACK_IMPORTED_MODULE_2__.NEED_VERIFY_TYPE);
  }
}
function isObjectOrArray(params) {
  return typeof params === "object" && params !== null || Array.isArray(params);
}
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return deepMerge(target, ...sources);
}
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultOptions: () => (/* binding */ defaultOptions)
/* harmony export */ });
const defaultOptions = {
  api: [],
  request: null,
  plugins: [],
  filter: function (data) {
    return data;
  },
  owlOptions: {
    project: '',
    pageUrl: "",
    devMode: false,
    // 请根据环境来赋值，线上环境设为false，线下环境设为true
    autoCatch: {
      pv: false,
      page: false,
      ajax: false,
      resource: false,
      js: false
    },
    metric: {
      combo: false
    }
  },
  raptorKey: 'sdk_data',
  immediate: true,
  timeout: 3000,
  limit: 1
};

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInnerPlugins: () => (/* binding */ useInnerPlugins)
/* harmony export */ });
/* harmony import */ var _plugins_serviceworker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

// 这里的每个key一定要跟插件的name属性对齐
const InnnerPluginMap = new Map([['serviceWorker', _plugins_serviceworker__WEBPACK_IMPORTED_MODULE_0__["default"]]]);
// 如果用户传入字符串作为插件，则认为使用内置插件进行处理
// 也可以添加一个参数innerPlugin:true,表明是内置插件，通过这种方式添加插件，可以注入参数
function useInnerPlugins(plugins, apis) {
  return plugins.map(plugin => {
    if (typeof plugin == 'string') {
      return addInnerPlugin(plugin, apis);
    }
    // 处理带参数的内置插件的情况
    if (typeof plugin == 'object' && typeof plugin !== null) {
      if (plugin.innerPlugin) {
        const {
          params = {},
          name = ''
        } = plugin;
        return addInnerPlugin(name, apis, params);
      }
    }
    return plugin;
  });
}
function addInnerPlugin(pluginName, apis, params = {}) {
  if (!InnnerPluginMap.has(pluginName)) {
    return undefined;
  }
  // 对api中没有注册的插件名进行补充
  if (!apis.find(api => api.name == pluginName)) {
    apis.push({
      name: pluginName
    });
  }
  const Ctor = InnnerPluginMap.get(pluginName);
  return new Ctor(params);
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServiceWorkerPlugin)
/* harmony export */ });
const MESSAGE_EVENT_NAME = "service_client_sdk";
const unUseEventData = new Set(['eventType', 'type']);
const BaseData = {
  hitCache: false,
  hitPreload: false,
  error: null,
  errorCode: 0,
  supportServiceWorker: true
};
class ServiceWorkerPlugin {
  constructor(options = {}) {
    this.name = 'serviceWorker', this.type = 'js';
    this.test = initServiceWorker, this.filter = serviceWorkerDataFilter;
    this.async = true;
  }
}
function initServiceWorker() {
  const vm = this;
  return new Promise(reslove => {
    if (!navigator.serviceWorker) {
      reslove(false);
      return;
    }
    navigator.serviceWorker.register("./sw.js").then(registration => {
      initMessageListener(reslove, vm);
      messageServiceWorkerErrorHandler(reslove, vm);
    }).catch(e => {
      console.log(e);
      reslove(false);
    });
  });
}
// 跟service worker层进行通信
function initMessageListener(cb, vm) {
  navigator.serviceWorker.addEventListener("message", function (event) {
    const {
      data
    } = event;
    // 考虑预加载时需要合并两次的问题
    if (data.eventType == MESSAGE_EVENT_NAME) {
      // 删除无用的参数
      unUseEventData.forEach(value => {
        if (data[value]) {
          delete data[value];
        }
      });
      vm.setExtraData(data);
      cb(true);
    }
  });
}

// 传输失败的兜底机制
function messageServiceWorkerErrorHandler(cb, vm) {
  window.addEventListener('unload', () => {
    vm.setExtraData(createServiceWorkerMessageErrorInfo());
    cb(false);
  });
}
function createServiceWorkerMessageErrorInfo() {
  return {
    error: '未收到传输消息',
    errorCode: 1001
  };
}
function serviceWorkerDataFilter(data) {
  if (!data) {
    return {
      ...BaseData,
      error: 'timeout',
      errorCode: 1002,
      supportServiceWorker: true,
      isInit: false,
      hitPreload: false,
      hitCache: false
    };
  }
  data.supportServiceWorker = data.support;
  delete data.support;
  return {
    ...BaseData,
    ...data
  };
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_NEED_ARRAY_OR_OBJECT: () => (/* binding */ API_NEED_ARRAY_OR_OBJECT),
/* harmony export */   NEED_API: () => (/* binding */ NEED_API),
/* harmony export */   NEED_VERIFY_TYPE: () => (/* binding */ NEED_VERIFY_TYPE),
/* harmony export */   PLUGINS_NEED_ARRAY_OR_OBJECT: () => (/* binding */ PLUGINS_NEED_ARRAY_OR_OBJECT),
/* harmony export */   PLUGIN_NEED_NAME: () => (/* binding */ PLUGIN_NEED_NAME),
/* harmony export */   handlerError: () => (/* binding */ handlerError)
/* harmony export */ });
const NEED_API = "api parameter required";
const API_NEED_ARRAY_OR_OBJECT = "The api parameter should be an array or object type";
const PLUGINS_NEED_ARRAY_OR_OBJECT = "The plugins parameter should be an array or object type";
const NEED_VERIFY_TYPE = "The parameter 'type' should be 'js','css' or 'html'";
const PLUGIN_NEED_NAME = "The plugin requires a parameter name";
function handlerError(tips) {
  throw Error(tips);
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initRequest: () => (/* binding */ initRequest),
/* harmony export */   requestMessage: () => (/* binding */ requestMessage)
/* harmony export */ });
/* harmony import */ var _histroy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _owl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


function request(params) {
  const inst = (0,_owl__WEBPACK_IMPORTED_MODULE_1__.getOwlMetricInst)();
  inst.setExtraData(JSON.stringify(params));
  inst.setMetric(inst.raptorKey, 1);
  inst.report();
}
async function requestMessage(data) {
  try {
    if (!navigator.onLine) {
      _histroy__WEBPACK_IMPORTED_MODULE_0__["default"].addHistroyData({
        ...data,
        errorCode: 3000
      });
      return;
    }
    await request(data);
  } catch (e) {
    console.log(e);
  }
}
function initRequest(vm) {
  if (vm.$options && vm.$options.request && typeof vm.$options.request == "function") {
    vm.requestMessage = vm.$options.request;
  } else {
    (0,_owl__WEBPACK_IMPORTED_MODULE_1__.initOwlMetricInst)(vm);
    vm.requestMessage = requestMessage;
  }
  _histroy__WEBPACK_IMPORTED_MODULE_0__["default"].useHistroyData(vm.requestMessage);
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 考虑上报失败的问题，如果因为离线等原因未上报成功，则在下一次进入页面时重新进行之前的上报操作

class HistoryData {
  constructor() {
    this.key = "API_SUPPORT_SDK_STORAGE";
  }
  addHistroyData(data) {
    let history = localStorage.getItem(this.key);
    if (!history) {
      history = [];
    } else {
      history = JSON.parse(history);
      if (history instanceof Array) {
        history.push(data);
      }
    }
    localStorage.setItem(this.key, JSON.stringify(history));
  }
  useHistroyData(fn) {
    let history = localStorage.getItem(this.key);
    if (!history) {
      return;
    }
    history = JSON.parse(history);
    if (history instanceof Array) {
      setTimeout(() => {
        history.forEach(data => {
          fn(data);
        });
        localStorage.removeItem(this.key);
      });
    } else {
      localStorage.removeItem(this.key);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new HistoryData());

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOwlMetricInst: () => (/* binding */ getOwlMetricInst),
/* harmony export */   initOwlMetricInst: () => (/* binding */ initOwlMetricInst)
/* harmony export */ });
/* harmony import */ var _dp_owl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _dp_owl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dp_owl__WEBPACK_IMPORTED_MODULE_0__);

let metricInst = null;
function initOwlMetricInst(vm) {
  if (metricInst) {
    return metricInst;
  }
  const {
    $options
  } = vm;
  window.Owl.start($options.owlOptions);
  metricInst = _dp_owl__WEBPACK_IMPORTED_MODULE_0___default().MetricManager();
  metricInst.raptorKey = $options.raptorKey;
  return metricInst;
}
function getOwlMetricInst() {
  if (metricInst) {
    return metricInst;
  }
  return initOwlMetricInst();
}

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var CfgManager = __webpack_require__(11);
var ErrManager = __webpack_require__(18);
var PageManager = __webpack_require__(35);
var ResManager = __webpack_require__(40);
var MetricManager = __webpack_require__(42);
var PvManager = __webpack_require__(43);
var LogManager = __webpack_require__(44);
var Dimns = __webpack_require__(45);
var Util = __webpack_require__(20);
var configFilter = __webpack_require__(47);
var Logger = __webpack_require__(13);
var guid = __webpack_require__(15);
var Extend = __webpack_require__(12);
var Logan = __webpack_require__(33);
var Event = __webpack_require__(21);
var category = __webpack_require__(29);
var version = (__webpack_require__(16).version);
var EM = __webpack_require__(28);
var catchPage = __webpack_require__(49);
var catchError = __webpack_require__(50);
var catchResource = __webpack_require__(51);
var OWL = function () {
  function OWL(config, opts) {
    _classCallCheck(this, OWL);
    var cfgManager = new CfgManager(config);
    this.errManager = new ErrManager(cfgManager);
    this.pageManager = new PageManager(cfgManager, this.errManager);
    this.resManager = new ResManager(cfgManager, this.errManager);
    this.metricManager = new MetricManager(cfgManager);
    this.pvManager = new PvManager(cfgManager);
    this.logManager = new LogManager(cfgManager);
    this.cfgManager = cfgManager;
    this.cfgManager.setExtension(Dimns.getExt());

    // 待配置 devMode 后再做 configFilter
    if (!(opts && opts.noFilter)) {
      configFilter(this.cfgManager);
    }
  }
  _createClass(OWL, [{
    key: 'config',
    value: function config(_config) {
      this.cfgManager.set(_config);
    }
  }, {
    key: 'getConfig',
    value: function getConfig(key) {
      return this.cfgManager.get(key);
    }
  }, {
    key: 'debug',
    value: function debug() {
      this.cfgManager.set({
        devMode: true
      });
      Logger.setDebug();
    }
    /**
     *  上报自定义异常
     *  @param {any} err - 异常信息
     *  @param {Object} opts
     *  @param {Boolean} opts.combo - 是否合并请求
     *  @param {string} opts.category - 异常分类
     *  @param {string} opts.level - 异常级别
     *  @param {Object} opts.tags - 其他自定义信息
     */
  }, {
    key: 'addError',
    value: function addError(err, opts) {
      // 基于不同的参数条件，使用不同的方法
      var name = opts && opts.combo || this.getConfig('error').combo ? 'push' : 'report';
      this.errManager[name](err, opts);
    }
  }, {
    key: 'sendErrors',
    value: function sendErrors() {
      this.errManager.report();
    }
    /**
     *  上报自定义性能指标
     *  @param {Object} point - 性能指标信息
     *  @param {Number} point.position - 指标点位置
     *  @param {Number} point.duration - 耗时
     *  @param {Number} point.timeStamp - 时间戳
     */
  }, {
    key: 'addPoint',
    value: function addPoint(point) {
      if (!point || point.position === undefined) return;
      var newPoint = void 0;
      if (point.duration !== undefined) {
        newPoint = point;
      } else {
        var timing = Util.getPerfTiming();
        var navStart = timing && timing.navigationStart;
        if (typeof navStart == 'number') {
          newPoint = {
            position: point.position,
            duration: (point.timeStamp || +new Date()) - navStart
          };
        }
      }
      if (newPoint) {
        this.pageManager.setUserReady();
        this.pageManager.push(newPoint);
      }
    }
  }, {
    key: 'sendPoints',
    value: function sendPoints() {
      this.pageManager.report(true);
    }
    /**
     *  上报自定义请求信息
     *  @param {Object} api - 请求信息
     *  @param {string} api.name - 请求名称
     *  @param {Number} api.networkCode - 网络状态码
     *  @param {Number} api.statusCode - 业务状态码
     *  @param {Number} api.responseTime - 请求耗时
     *  @param {string} [api.content] - 异常堆栈
     */
  }, {
    key: 'addApi',
    value: function addApi(api) {
      var validTypes = ['undefined', 'number'];
      if (!api || validTypes.indexOf(_typeof(api.networkCode)) < 0 || validTypes.indexOf(_typeof(api.statusCode)) < 0) return Logger.log('参数对象属性类型错误');
      var networkCode = api.networkCode !== undefined ? api.networkCode : '';
      var statusCode = api.statusCode !== undefined ? api.statusCode : '';
      var newApi = {
        type: 'api',
        connectType: api.connectType || '',
        resourceUrl: api.name,
        statusCode: networkCode + '|' + statusCode,
        responsetime: api.responseTime && api.responseTime.toString() || '0'
      };
      if (api.content) {
        newApi.firstCategory = category.AJAX;
        newApi.secondCategory = api.secondCategory || api.name;
        newApi.logContent = api.content;
      }
      this.resManager.pushApi(newApi);
    }
  }, {
    key: 'reportApi',
    value: function reportApi() {
      this.addApi.apply(this, arguments);
    }
  }, {
    key: 'sendApis',
    value: function sendApis() {
      this.resManager.report();
    }
    // 记录Logan日志
  }, {
    key: 'addLog',
    value: function addLog() {
      Logan._log.apply(Logan, arguments);
    }
  }, {
    key: 'createLog',
    value: function createLog() {
      return new LogManager(this.cfgManager);
    }
    // 重置参数并重新上报pv
  }, {
    key: 'resetPv',
    value: function resetPv(opts) {
      var _this = this;
      opts = opts || {};
      var cfgManager = this.cfgManager;
      var from = cfgManager.get('pageUrl');
      var to = opts.pageUrl || Util.getPageUrl();
      // if (!to || to === from) return
      var project = opts.project || cfgManager.get('project');
      var configs = {
        project: project,
        pageUrl: to,
        pageId: opts.pageId || 'owl-' + guid()
      };
      cfgManager.set(configs);
      if (opts.delay) {
        // 连续快速resetPv时，只上报一次
        this.resetPvTimer && clearTimeout(this.resetPvTimer);
        this.resetPvTimer = setTimeout(function () {
          _this.pvManager.report(configs);
          Logan._log('[Navigation]:' + JSON.stringify({
            project: project,
            from: from,
            to: to
          }), 'owl', 'info', ['navi']);
        }, 200);
      } else {
        this.pvManager.report(configs);
        Logan._log('[Navigation]:' + JSON.stringify({
          project: project,
          from: from,
          to: to
        }), 'owl', 'info', ['navi']);
      }
    }
  }, {
    key: 'reportPv',
    value: function reportPv() {
      this.pvManager.report();
    }
    // 创建新的自定义指标实例
  }, {
    key: 'newMetricInst',
    value: function newMetricInst() {
      return new MetricManager(this.cfgManager);
    }
    // 新增, 更新, 移除异常过滤方法
  }, {
    key: 'updateFilter',
    value: function updateFilter(key, fn) {
      if (fn) {
        this.cfgManager.addFilter(key, fn);
      } else {
        this.cfgManager.removeFilter(key);
      }
    }
  }, {
    key: 'removeFilter',
    value: function removeFilter(key) {
      this.cfgManager.removeFilter(key);
    }
    /**
     * 为函数提供try-catch封装, 避免异常被抛出的同时上报异常
     * 
     * @param {Function} func - 需封装的函数
     * @param {Object} context - 函数执行的上下文
     * @param {Object} opts - 等同于addError的opts
     */
  }, {
    key: 'wrap',
    value: function wrap(func, context, opts) {
      if (typeof func !== 'function') return func;
      try {
        if (func.__owl_wrapped__) return func;
        if (func.__owl_wrapper__) return func.__owl_wrapper__;
      } catch (e) {
        return func;
      }
      var wrapped = function wrapped() {
        try {
          return func.apply(context, arguments);
        } catch (e) {
          Owl.addError(e, opts);
        }
      };
      for (var property in func) {
        if (func.prototype.hasOwnProperty(property)) {
          wrapped[property] = func[property];
        }
      }
      wrapped.prototype = func.prototype;
      func.__owl_wrapper__ = wrapped;
      wrapped.__owl_wrapper__ = true;
      return wrapped;
    }
    // 设置维度信息,支持:region,operator,network,container,os,unionId,latlng
    // latlng用于设置位置信息,值为:'${lat},${lng}'格式,如:'121.426805,31.221485'
  }, {
    key: 'setDimension',
    value: function setDimension(obj) {
      this.cfgManager.setExtension(obj);
    }
  }, {
    key: 'getDimension',
    value: function getDimension(key) {
      this.cfgManager.getExtension(key);
    }
  }, {
    key: 'reportFST',
    value: function reportFST() {
      var pageCfg = this.cfgManager.get('page');
      if (pageCfg.sensoryIndex || pageCfg.manualReportFST) return;
      this.cfgManager.set({
        page: {
          manualReportFST: true
        }
      });
      this.pageManager.manualReportFST();
    }
  }, {
    key: 'createInstance',
    value: function createInstance(config) {
      var instance = null;
      try {
        if (window.Owl && window.Owl.OWL && config && config.project) {
          if (typeof config.devMode === 'undefined') {
            config.devMode = window.Owl.cfgManager.get('devMode');
          }
          instance = new window.Owl.OWL(config);
        }
      } catch (e) {
        Util.reportSysError(e);
      }
      return instance;
    }
  }, {
    key: 'getResTimingInfo',
    value: function getResTimingInfo(url) {
      if (!(window.performance && typeof window.performance.getEntriesByName === 'function')) return null;
      try {
        if (typeof url === 'string') {
          var temp = window.performance.getEntriesByName(url, 'resource');
          if (temp instanceof Array && temp.length && temp[0]) {
            var duration = parseInt(Math.round(temp[0].duration));
            return isNaN(duration) ? null : {
              name: url,
              duration: duration
            };
          }
        } else if (url instanceof Array) {
          var result = [];
          for (var i = 0; i < url.length; i++) {
            if (typeof url[i] === 'string') {
              var info = this.getResTimingInfo(url[i]);
              result.push(info ? info : null);
            } else {
              result.push(null);
            }
          }
          return result;
        }
      } catch (e) {
        Util.reportSysError(e);
      }
      return null;
    }
  }, {
    key: 'SDKMetrics',
    value: function SDKMetrics(config) {
      try {
        if (!(config && config.project)) return;
        var instance = this.createInstance({
          project: config.project,
          devMode: config.devMode,
          metric: {
            combo: false
          }
        });
        if (!(instance && instance.metricManager)) return;
        var metricManager = instance.metricManager;
        var tags = {
          project: config.userProject || '',
          version: config.version || ''
        };
        if (_typeof(config.tags) === 'object') {
          tags = Extend(tags, config.tags);
        }
        metricManager.setTags(tags);
        metricManager.setExtraData(config.version || '');
        var random = Math.random();
        var pvConf = Extend({
          auto: true,
          sample: 0.01
        }, config.pv);
        if (pvConf.auto && random < pvConf.sample) {
          metricManager.setMetric('sdkPV', 1);
        }
        var resConf = Extend({
          auto: true,
          sample: 0.01
        }, config.resource);
        if (config.url && resConf.auto && random < resConf.sample) {
          var duration = void 0;
          var info = this.getResTimingInfo(config.url);
          if (info instanceof Array) {
            for (var i = 0; i < info.length; i++) {
              if (info[i] && typeof info[i].duration !== 'undefined') {
                duration = info[i].duration;
                break;
              }
            }
          } else if (info && typeof info.duration !== 'undefined') {
            duration = info.duration;
          }
          if (!isNaN(duration)) metricManager.setMetric('sdkCDNTiming', duration);
        }
        metricManager.report();
      } catch (e) {
        Util.reportSysError(e);
      }
    }
  }]);
  return OWL;
}();
var Owl = new OWL({}, {
  noFilter: true
});
Owl.OWL = OWL;
// Important(2021-03-30): mws-sdk 内判断 window.Owl.__version__ < '1.8.10' 时会重新加载 owl_latest.js 文件
//   但这种判断方式不兼容 1.10.x 版本，导致版本为 1.10.x 时也会重新加载 owl 并覆盖此前的 window.Owl
//   已反馈 mws-sdk 同学修复，但因为有 mws-sdk 缓存，因此暂时强制写为 1.9.5，至少两周后的新版本才可改回正常逻辑
// Owl.__version__ = version
Owl.__version__ = '1.9.5';
Owl.errorModel = EM;
Owl.MetricManager = function () {
  var cfgManager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Owl.cfgManager;
  return new MetricManager(cfgManager);
};
Owl.start = function (configs) {
  if (Util.checkIsSpider()) return;
  if (window.Owl && window.Owl.isStarted) return;
  this.isStarted = true;
  var cfgManager = this.cfgManager;
  configs = configs || {};
  configs.pageUrl = configs.pageUrl || Util.getPageUrl();
  cfgManager.set(configs);
  var project = cfgManager.get('project');
  var loganCfg = cfgManager.get('logan');
  if (loganCfg && loganCfg.enable) {
    Logan.ready({
      LoganAPI: loganCfg.Logan,
      project: project,
      pageUrl: cfgManager.get('pageUrl'),
      loganConfig: loganCfg.config,
      version: loganCfg.version || '2.1.2'
    });
  }

  // 不同环境下设定特定过滤规则
  configFilter(cfgManager);

  // auto capture performance, error & resource
  catchPage(this.pageManager);
  catchError(this.errManager);
  catchResource(this.resManager);
  var captureCfg = cfgManager.get('autoCatch') || {};
  captureCfg.pv && this.reportPv(); // 自动上报一次pv

  var spaCfg = cfgManager.get('SPA') || {};
  if (spaCfg.autoPV || spaCfg.getFST) {
    // 自动监听路由变化
    Util.hackHistoryStateFuncs();

    // 路由变化的回调
    var that = this;
    Event.on('validStateChange', function (pathInfo) {
      try {
        spaCfg.autoPV && that.resetPv({
          delay: true
        });

        // 页面加载完成后再进行路由页面的首屏监听计算以提升准确性
        if (spaCfg.getFST && document.readyState == 'complete') {
          var path = pathInfo.path;
          var prevPath = that.prevRoutePath;
          that.prevRoutePath = path;
          that.pageManager.getRouteFst(path, prevPath);
        }
      } catch (e) {
        Util.reportSysWarn(e);
      }
    });
  }
  var handleApiCall = function handleApiCall(args) {
    try {
      if (args && args.length) {
        var name = args[0]; // api name
        if (!name || typeof name != 'string') return Logger.warn('Api名称不是有效字符串');
        if (name == 'start') return Logger.warn('start方法不可重复执行');
        if (typeof Owl[name] != 'function') return Logger.warn(name + '\u4E0D\u662F\u6709\u6548\u7684Api');
        try {
          var params = args.slice(1); // api params
          return Owl[name].apply(Owl, params);
        } catch (e) {
          Logger.warn(name + ' Api\u6267\u884C\u62A5\u9519');
          Logger.warn(e);
          Util.reportSysWarn(e);
        }
      } else {
        Logger.warn('Api调用未传入有效参数');
      }
    } catch (e) {
      Util.reportSysWarn(e);
    }
  };
  var queue = window.owl && window.owl.q;
  if (queue && queue.length) {
    for (var i = 0; i < queue.length; i++) {
      handleApiCall(queue[i]);
    }
  }
  window.owl = function () {
    var args = [].slice.call(arguments);
    return handleApiCall(args);
  };
  var preLoadName = '_Owl_';
  if (window[preLoadName]) {
    window[preLoadName].isReady = true;
    var _window$preLoadName = window[preLoadName],
      preTasks = _window$preLoadName.preTasks,
      dataSet = _window$preLoadName.dataSet;
    if (preTasks && preTasks.length) {
      // sync execute api tasks
      preTasks.forEach(function (task) {
        Owl[task.api] && Owl[task.api].apply(Owl, task.data);
      });
      window[preLoadName].preTasks = [];
    }
    setTimeout(function () {
      // async report pre-catch data
      if (dataSet && dataSet.length) {
        dataSet.forEach(function (item) {
          try {
            if (item.type === 'jsError' && captureCfg.js) {
              var name = item.data && item.data[0].type === 'unhandledrejection' ? 'parsePromiseUnhandled' : 'parseWindowError';
              Owl.errManager[name].apply(Owl.errManager, item.data);
            } else if (item.type === 'resError' && captureCfg.resource) {
              Owl.resManager.handleResourceLoadError.apply(Owl.resManager, item.data);
            } else if (item.type === 'resTime') {
              Owl.resManager.handleResourceTiming.apply(Owl.resManager, item.data);
            } else if (item.type === 'pageTime') {
              Owl.pageManager.parsePageTime.apply(Owl.pageManager, item.data);
            }
          } catch (e) {}
        });
      }
      window[preLoadName].dataSet = [];
    }, 0);
  }
  this.errManager.checkCache();

  // report Owl version
  var versionReport = __webpack_require__(54);
  versionReport('owl_sdk', Owl);

  // capture Owl self metrics
  var urlPrefix = Util.getProtocol() + '//www.dpfile.com/app/owl/static/owl_';
  this.SDKMetrics({
    project: 'owl',
    userProject: project,
    version: version,
    url: [urlPrefix + 'latest.js', urlPrefix + version + '.js']
  });
};
if (!(window.Owl instanceof OWL)) {
  window.Owl = Owl;
}

// 首先执行start方法，在start方法内处理其他的API调用
var queue = window.owl && window.owl.q;
if (queue && queue.length) {
  var item = queue[0];
  if (item && item[0] === 'start') {
    Owl.start(item[1]);
  }
}
module.exports = Owl;

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Extend = __webpack_require__(12);
var Logger = __webpack_require__(13);
var Url = __webpack_require__(14);
var guid = __webpack_require__(15);
var sdkVersion = (__webpack_require__(16).version);
var protocol = __webpack_require__(17);
var EXT = ['region', 'operator', 'network', 'container', 'os', 'unionId'];
var urlProduct = protocol + '//catfront.dianping.com';
var urlBeta = protocol + '//catfront.51ping.com';

// 配置管理类

var CfgManager = function () {
  function CfgManager(config) {
    _classCallCheck(this, CfgManager);
    this._config = {
      devMode: false,
      project: '',
      pageUrl: '',
      webVersion: '',
      autoCatch: {
        page: true,
        ajax: true,
        fetch: false,
        resource: true,
        js: true,
        console: false,
        pv: true
      },
      page: {
        sample: 0.5,
        auto: true,
        sensoryIndex: true,
        disableSensoryImageIndex: true,
        interactToStopObserver: true,
        noCheckOuterMutaCount: false,
        fstPerfSample: 0.5,
        fstPerfAnalysis: false,
        logSlowView: false,
        delay: 0,
        logFirstScreen: false,
        ignoreIframe: true,
        mainResourceNumber: 5,
        timeThreshold: 5
      },
      SPA: {
        autoPV: false,
        getFST: false
      },
      resource: {
        sample: 0.1,
        sampleApi: 0.1,
        combo: true,
        delay: 1000,
        catchAbort: true,
        catchTimeout: false,
        enableStatusCheck: false,
        ignoreMTSIForbidRequest: true
      },
      resourceReg: /(.51ping|.dianping|.dpfile|.meituan|.sankuai|.kuxun|.maoyan|.neixin|.mobike|.dper.com)/,
      enableLogTrace: false,
      ajax: {
        invalid: true,
        flag: false,
        duration: 2000,
        autoBusinessCode: false,
        parseResponse: function parseResponse(res) {
          if (!res || (typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object') return {};
          return {
            code: res.code || res.status
          };
        }
      },
      invalid: {
        ajax: true
      },
      image: {
        flag: false,
        duration: 5000,
        fileSize: 100,
        filter: false
      },
      error: {
        sample: 1,
        delay: 1000,
        combo: false,
        maxSize: 1024 * 10,
        maxNum: 100,
        maxTime: 60 * 1000,
        formatUnhandledRejection: false
      },
      useSendBeacon: false,
      disableCache: true,
      noScriptError: true,
      metric: {
        sample: 0.5,
        combo: true,
        delay: 1500
      },
      logan: {
        enable: false
      },
      ignoreList: {
        js: ['Illegal invocation'],
        ajax: ['https?://report.meituan.com/', 'https?://logan.sankuai.com/'],
        resource: ['https?://hls.dianping.com/', 'https?://frep.meituan.net/']
      },
      disabledFilters: [],
      pageId: 'owl-' + guid()
    };
    this.baseQuery = {
      v: 1,
      sdk: sdkVersion
    };
    this.apiPaths = {
      log: '/api/log',
      error: '/api/log',
      page: '/api/speed',
      resource: '/batch',
      metric: '/api/metric',
      pv: '/api/pv',
      fstInfo: '/raptorapi/fstSpeed',
      fstLog: '/raptorapi/fstLog'
    };
    this.userConfig = {};
    this.config = {};
    this.extensions = {};
    this.filters = [];
    this.url = urlProduct;
    if (config) {
      this.set(config);
    } else {
      this.config = this._config;
    }
  }
  _createClass(CfgManager, [{
    key: 'get',
    value: function get(key) {
      return key ? this.config[key] : this.config;
    }
  }, {
    key: 'set',
    value: function set(data) {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          if (key === 'devMode') {
            this.setApiDomain(val);
            if (val) {
              Logger.setDebug();
            }
          }
          if (key === 'webVersion' && val) {
            this.baseQuery['webVersion'] = val;
          }
          if (key === 'ext') {
            this.setExtension(val);
          }
          if (key === 'resource' && val) {
            val.sample = undefined;
          }
          try {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object' || val instanceof RegExp || val instanceof Array) {
              this.userConfig[key] = key !== 'resourceReg' ? val : new RegExp(val);
            } else if (key !== 'pageUrl') {
              this.userConfig[key] = Extend(this.userConfig[key], val);
            }
          } catch (e) {
            Logger.ignore(e);
          }
        }
      }
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      this.config = this._config;
      for (var key in this.userConfig) {
        var data = this.userConfig[key];
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) != 'object' || data instanceof RegExp || data instanceof Array) {
          this.config[key] = data;
        } else {
          this.config[key] = Extend(this.config[key], this.userConfig[key]);
        }
      }
    }
  }, {
    key: 'setApiDomain',
    value: function setApiDomain(isDev) {
      this.url = isDev ? urlBeta : urlProduct;
    }
  }, {
    key: 'getExtension',
    value: function getExtension(key) {
      return key ? this.extensions[key] : this.extensions;
    }
  }, {
    key: 'setExtension',
    value: function setExtension(exts) {
      if (!exts) return;
      for (var key in exts) {
        if (exts.hasOwnProperty(key)) {
          var value = exts[key];
          if (key == 'latlng') {
            // 修改url参数, 声明使用经纬度替换region
            this.extensions['region'] = value;
            this.baseQuery['useLatlng'] = true;
          } else if (EXT.indexOf(key) > -1) {
            this.extensions[key] = value;
          }
        }
      }
    }
  }, {
    key: 'addFilter',
    value: function addFilter(key, fn) {
      if (key && fn instanceof Function && this.config.disabledFilters && this.config.disabledFilters.indexOf(key) === -1) {
        var filterIndex = -1;
        for (var i = 0; i < this.filters.length; i++) {
          var filter = this.filters[i];
          if (filter.key === key) {
            filterIndex = i;
            filter.fn = fn;
            break;
          }
        }
        if (filterIndex === -1) {
          this.filters.push({
            key: key,
            fn: fn
          });
        }
      }
    }
  }, {
    key: 'removeFilter',
    value: function removeFilter(key) {
      for (var i = 0; i < this.filters.length; i++) {
        var filter = this.filters[i];
        if (filter.key === key) {
          this.filters.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'getApiPath',
    value: function getApiPath(key) {
      var path = this.apiPaths[key];
      return Url.stringify(this.url + path, this.baseQuery);
    }
  }]);
  return CfgManager;
}();
module.exports = CfgManager;

/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";


module.exports = function extend(target, source) {
  var ret = {};
  if (target) {
    for (var key in target) {
      ret[key] = target[key];
    }
  }
  if (source) {
    for (var _key in source) {
      if (source.hasOwnProperty(_key) && source[_key] !== undefined) {
        ret[_key] = source[_key];
      }
    }
  }
  return ret;
};

/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";


module.exports = {
  devMode: false,
  setDebug: function setDebug() {
    this.devMode = true;
  },
  ignore: function ignore() {
    if (window.Owl && window.Owl.debugLog) {
      window.console.log('【OWL日志:】');
      window.console.log && window.console.log.apply(window.console, arguments);
    }
  },
  log: function log(msg) {
    this.devMode && console.log('[Owl]', msg);
  },
  warn: function warn(msg) {
    this.devMode && console.warn('[Owl]', msg);
  },
  logScreen: function logScreen() {
    if (window.Owl && window.Owl.cfgManager.get('page').logFirstScreen) {
      console.log.apply(console, arguments);
    }
  }
};

/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";


module.exports = {
  stringify: function stringify(url, data) {
    if (!data) return url;
    var param = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        param.push(key + '=' + data[key]);
      }
    }
    return ~url.indexOf('?') ? url + '&' + param.join('&') : url + '?' + param.join('&');
  },
  // 1. url中有name参数, value不为空, 更新参数
  // 2. url中有name参数, value为空, 删除参数
  // 3. url中无name参数, value不为空, 增加参数
  replaceParam: function replaceParam(url, name, value) {
    if (!url || !name) return url;
    try {
      var pattern = new RegExp('(&' + name + '=)' + '([^\\?&]+)(&?)'); // eg: /(&webVersion=)([^\?&]+)(&?)/
      if (pattern.test(url)) {
        if (value) {
          url = url.replace(pattern, '$1' + value + '$3');
        } else {
          url = url.replace(pattern, '$3');
        }
      } else if (value) {
        var temp = {};
        temp[name] = value;
        url = this.stringify(url, temp);
      }
    } catch (e) {}
    return url;
  }
};

/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";


function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}
function guid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + Date.now();
}
module.exports = guid;

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.version = '1.11.1';

/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";


var protocol = window.location.protocol ? window.location.protocol : 'http:';
protocol = new RegExp('http').test(protocol) ? protocol : 'http:';
module.exports = protocol;

/***/ }),
/* 18 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Ajax = __webpack_require__(19);
var extend = __webpack_require__(12);
var EM = __webpack_require__(28);
var DB = __webpack_require__(31);
var Category = __webpack_require__(29);
var Level = __webpack_require__(30);
var Logger = __webpack_require__(13);
var Util = __webpack_require__(20);
var Url = __webpack_require__(14);
var Logan = __webpack_require__(33);
var Version = (__webpack_require__(16).version);
var NAME = 'error';
var encodeDataBeforeSend = function encodeDataBeforeSend(data) {
  return 'c=' + encodeURIComponent(JSON.stringify(data));
};
var doSend = function doSend(opts) {
  if (opts && opts.data) {
    return Ajax({
      url: opts.url,
      type: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: encodeDataBeforeSend(opts.data),
      success: opts.success,
      fail: opts.fail,
      xhrRewritten: opts.xhrRewritten
    });
  }
};

// Owl 错误管理类

var ErrorManager = function () {
  function ErrorManager(cfgManager) {
    _classCallCheck(this, ErrorManager);
    this.cfgManager = cfgManager;
    this.cache = [];
    this.cacheSending = {};
    this.comboTimeout = 0;
    this.timeLimit = Date.now();
    this.errorCount = 0;
    this.isTimeLimit = false;
    this.detectLeave();
  }
  // 解析 window.onerror 采集到的 JS 错误

  _createClass(ErrorManager, [{
    key: 'parseWindowError',
    value: function parseWindowError(msg, url, line, col, error) {
      try {
        if (error && error.stack) {
          // this.push(error)
          error = this._processError(error);
          if (error.sec_category !== 'Invalid_Error') {
            error.rowNum = error.rowNum || line;
            error.colNum = error.colNum || col;
            error.resourceUrl = error.resourceUrl || url;
          }
          this._push(error);
        } else if (typeof msg === 'string') {
          this._push({
            category: Category.SCRIPT,
            sec_category: msg,
            resourceUrl: url,
            rowNum: line,
            colNum: col
          });
        }
      } catch (e) {
        this.reportSystemError(e);
      }
    }
    // 处理 unhandledrejection 错误
  }, {
    key: 'parsePromiseUnhandled',
    value: function parsePromiseUnhandled(event) {
      if (!(event && event.type === 'unhandledrejection')) return;
      try {
        var reason = event.reason;
        if (reason) {
          var name = 'unhandledrejection';
          var stack = '';
          if (reason instanceof Error) {
            var errName = reason.message || reason.name || '';
            if (errName && this.cfgManager.get(NAME).formatUnhandledRejection) {
              name = '[unhandledrejection] ' + errName;
            }
            stack = reason.stack || reason.toString() || '';
          } else {
            stack = reason;
          }
          this._push({
            category: Category.SCRIPT,
            sec_category: name,
            content: stack
          });
        }
      } catch (e) {
        this.reportSystemError(e);
      }
    }
  }, {
    key: 'parseConsoleError',
    value: function parseConsoleError() {
      try {
        var args = Array.prototype.slice.call(arguments);
        if (!(args && args.length)) return;
        var contents = [];
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          if (arg) {
            var msg = '';
            if (typeof arg === 'string') {
              msg = arg;
            } else if (arg instanceof window.Error) {
              msg = arg.stack || arg.message || '';
            } else if (arg instanceof window.ErrorEvent) {
              msg = arg.error && (arg.error.stack || arg.error.message) || arg.message || '';
            } else {
              msg = JSON.stringify(arg);
            }
            contents.push(msg);
          }
        }
        if (contents && contents.length) {
          this._push({
            category: Category.SCRIPT,
            sec_category: 'consoleError',
            content: contents.join(' ')
          });
        }
      } catch (e) {
        this.reportSystemError(e);
      }
    }
    // 监听页面卸载事件, 异步上报或存储还未上报的异常
  }, {
    key: 'detectLeave',
    value: function detectLeave() {
      var _this = this;
      try {
        var origin = window.onbeforeunload;
        window.onbeforeunload = function () {
          var cacheDisabled = _this.cfgManager.get('disableCache') || window.Owl && window.Owl.cfgManager.get('disableCache');
          var useSendBeacon = _this.cfgManager.get('useSendBeacon') && window.navigator && window.navigator.sendBeacon;
          if (!cacheDisabled || useSendBeacon) {
            var cacheCombined = _this.addCacheExtension(); // 1.未进入上报流程
            var cacheSending = _this.cacheSending; // 2.上报流程未结束
            if (cacheSending && Object.keys(cacheSending).length) {
              for (var key in cacheSending) {
                try {
                  if (cacheSending.hasOwnProperty(key) && cacheSending[key]) {
                    var _cacheSending$key = cacheSending[key],
                      xhr = _cacheSending$key.xhr,
                      cache = _cacheSending$key.cache;
                    xhr.abort();
                    if (cache instanceof Array && cache.length) {
                      cacheCombined = cacheCombined.concat(cache);
                    }
                  }
                } catch (e) {
                  Logger.ignore(e);
                }
              }
            }
            if (cacheCombined && cacheCombined.length) {
              if (useSendBeacon) {
                var url = Url.stringify(_this.cfgManager.getApiPath(NAME), {
                  pageId: _this.cfgManager.get('pageId'),
                  beacon: 1
                });
                window.navigator.sendBeacon(url, encodeDataBeforeSend(cacheCombined));
              } else if (!cacheDisabled) {
                DB.add(cacheCombined, _this.cfgManager.get('webVersion'));
              }
            }
          }
          origin && origin.call();
        };
      } catch (e) {
        Logger.ignore(e);
      }
    }
    // 读取并上报 localStorage 中历史上报失败后存储的异常
  }, {
    key: 'checkCache',
    value: function checkCache() {
      var _this2 = this;
      setTimeout(function () {
        var preCache = DB.get();
        DB.clearAll();
        if ((typeof preCache === 'undefined' ? 'undefined' : _typeof(preCache)) === 'object' && Object.keys(preCache).length) {
          var cfgManager = _this2.cfgManager;
          var currVer = cfgManager.get('webVersion') || '';
          var originUrl = cfgManager.getApiPath(NAME);
          for (var key in preCache) {
            try {
              var data = preCache[key];
              if (data instanceof Array && data.length) {
                var cacheVer = key === 'no-version' ? '' : key;
                var url = cacheVer !== currVer ? Url.replaceParam(originUrl, 'webVersion', cacheVer) : originUrl;
                doSend({
                  url: url,
                  data: data,
                  xhrRewritten: cfgManager.get('autoCatch').ajax ? true : false
                });
              }
            } catch (e) {
              _this2.reportSystemError(e);
            }
          }
        }
      }, 4000);
    }
  }, {
    key: 'reportSystemError',
    value: function reportSystemError(err) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!err) return;
      try {
        this.cache.push(new EM({
          project: 'owl',
          pageUrl: 'version_' + Version,
          category: opts.category || Category.SCRIPT,
          level: opts.level || Level.ERROR,
          realUrl: Util.getHref(),
          sec_category: err.message || err.name || 'parseError',
          content: err.stack ? JSON.stringify(err.stack) : err.toString && err.toString() || ''
        }));
        this.send(true);
      } catch (e) {}
    }
  }, {
    key: 'reportSystemWarn',
    value: function reportSystemWarn(err, opts) {
      if (!err) return;
      opts = opts || {};
      opts.level = Level.WARN;
      this.reportSystemError(err, opts);
    }
  }, {
    key: '_processError',
    value: function _processError(errObj) {
      var doFallback = function doFallback(err) {
        var name = err.message || err.name || 'Invalid_Error';
        var content = err instanceof Error ? err.toString() : JSON.stringify(err);
        return {
          category: Category.SCRIPT,
          sec_category: name,
          content: content
        };
      };
      var doParse = function doParse(err) {
        if (err.stack) {
          var info = err.stack.match('https?://[^\n]+');
          info = info ? info[0] : '';
          var jsReg = /https?:\/\/(\S)+\.js/;
          var scriptUrl = jsReg.test(info) ? info.match(jsReg)[0] : '';
          var rowCols = info.match(':(\\d+):(\\d+)');
          if (!rowCols) {
            rowCols = [0, 0, 0];
          }
          return {
            category: Category.SCRIPT,
            sec_category: err.message || err.name || '',
            content: err.stack,
            resourceUrl: scriptUrl,
            rowNum: rowCols[1],
            colNum: rowCols[2]
          };
        } else {
          return doFallback(err);
        }
      };
      try {
        return doParse(errObj);
      } catch (e) {
        this.reportSystemError(e);
        return doFallback(errObj);
      }
    }
  }, {
    key: '_push',
    value: function _push(error, opts) {
      error = this.parse(error);
      this.push(new EM(error), opts);
    }
    // 向错误队列增加资源错误 resourceError
  }, {
    key: '_pushResource',
    value: function _pushResource() {
      if (Math.random() > this.cfgManager.get('resource').sample) return;
      this._push.apply(this, arguments);
    }
    // 统一处理错误属性
  }, {
    key: 'parse',
    value: function parse(error) {
      if (!error.project) {
        error.project = this.cfgManager.get('project');
      }
      if (!error.pageUrl) {
        error.pageUrl = this.cfgManager.get('pageUrl') || 'default';
      }
      if (!error.unionId) {
        error.unionId = this.cfgManager.getExtension('unionId');
      }
      error.realUrl = Util.getHref();
      return error;
    }
    // 格式化错误信息并 push 至错误队列中
  }, {
    key: 'push',
    value: function push(error, opts) {
      var cfgManager = this.cfgManager;
      var errCfg = cfgManager.get(NAME);
      if (!error || Math.random() > errCfg.sample) return;

      // format as ErrorModel
      if (!(error instanceof EM)) {
        if (error instanceof Error) {
          error = this._processError(error);
        } else if (typeof error === 'string') {
          error = {
            sec_category: error
          };
        } else if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
          error = {
            sec_category: error.name || '',
            content: error.msg || ''
          };
        }
        error = this.parse(error);
        error = new EM(error);
      }
      if (error.content && error.content.length >= errCfg.maxSize) return;
      error.update(opts);
      try {
        var seen = [];
        var logInfo = JSON.stringify(error.toLoganJson(), function (k, v) {
          if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v !== null) {
            if (seen.indexOf(v) >= 0) {
              return;
            }
            seen.push(v);
          }
          return v;
        });
        Logan._log('[Error]:' + logInfo, 'owl', error.level, [error.category]);
      } catch (e) {
        this.reportSystemError(e);
      }

      // 异常过滤策略 (Script error / filters / ignoreList.js)
      var isValid = true;
      if (cfgManager.get('noScriptError') && error.sec_category.indexOf('Script error') === 0) {
        return isValid = false;
      }
      var filters = cfgManager.filters;
      if (filters && filters.length) {
        for (var i = 0; i < filters.length; i++) {
          var filter = filters[i];
          if (!filter.fn(error)) {
            return isValid = false;
          }
        }
      }
      var ignoreErrors = cfgManager.get('ignoreList').js;
      if (ignoreErrors && ignoreErrors.length) {
        for (var _i = 0; _i < ignoreErrors.length; _i++) {
          if (error.sec_category.indexOf(ignoreErrors[_i]) === 0) {
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) return;

      // 广播自定义事件, 告知外部采集到了有效的异常信息
      try {
        if (window && window.dispatchEvent && error && error.getEventInfo) {
          var eventInfo = error.getEventInfo({
            'pageId': cfgManager.get('pageId') || ''
          });
          var errEvent = void 0;
          if (typeof window.CustomEvent === 'function') {
            errEvent = new CustomEvent('owlErrDetected', {
              'detail': eventInfo
            });
          } else if (document && typeof document.createEvent === 'function') {
            // polyfill CustomEvent for IE9+
            var evt = document.createEvent('CustomEvent');
            if (typeof evt.initCustomEvent === 'function') {
              errEvent = evt.initCustomEvent('owlErrDetected', false, false, eventInfo);
            }
          }
          errEvent && window.dispatchEvent(errEvent);
        }
      } catch (e) {
        this.reportSystemError(e);
      }
      if (!this.isExist(error)) {
        error = this._handleError(error);
        if (error) {
          this.cache.push(error);
          this.send();
        }
      }
    }
    // 判断错误是否已存在当前错误队列中
  }, {
    key: 'isExist',
    value: function isExist(error) {
      for (var i = 0; i < this.cache.length; i++) {
        var element = this.cache[i];
        if (!(element instanceof EM)) {
          element = new EM(element);
        }
        if (element.isEqual(error)) {
          return true;
        }
      }
      return false;
    }
    // 异常上报前的拦截处理
  }, {
    key: '_handleError',
    value: function _handleError(instance) {
      try {
        var hook = this.cfgManager.get('onErrorPush');
        if (hook instanceof Function) {
          instance = hook(instance);
        }
        if (instance instanceof EM || instance === undefined) {
          return instance;
        } else {
          Logger.ignore('onErrorPush 方法的返回值仅能为ErrorModel实例或undefined');
        }
      } catch (e) {
        Logger.ignore('onErrorPush 方法处理有误', e);
        return instance;
      }
    }
  }, {
    key: 'report',
    value: function report() {
      this.push.apply(this, arguments);
      this.send(true);
    }
    // 异常上报流程
  }, {
    key: 'send',
    value: function send(isReportNow) {
      var _this3 = this;
      var cfgManager = this.cfgManager;
      var errCfg = cfgManager.get(NAME);
      var comboTimeout = this.comboTimeout;

      // 限制 maxTime 内上报的异常数不能超过 maxNum
      var maxError = errCfg.maxNum || 100;
      var maxTime = errCfg.maxTime || 60 * 1000;
      var timeLimit = Date.now() - this.timeLimit;
      if (!this.isTimeLimit) {
        this.timeLimit = Date.now();
      }
      this.isTimeLimit = true;
      var comboReport = function comboReport() {
        if (!_this3.cache.length) return;
        clearTimeout(comboTimeout);
        comboTimeout = 0;
        try {
          _this3.errorCount += _this3.cache.length;
          if (timeLimit <= maxTime) {
            if (_this3.errorCount >= maxError) return;
          } else {
            _this3.isTimeLimit = false;
            _this3.errorCount = 0;
          }
        } catch (e) {
          Logger.ignore(e);
        }
        var cache = _this3.addCacheExtension();
        var ts = +new Date();
        var xhr = doSend({
          url: cfgManager.getApiPath(NAME) + ('&pageId=' + cfgManager.get('pageId')),
          data: cache,
          success: function success() {
            _this3.cacheSending[ts] = undefined;
          },
          fail: function fail() {
            try {
              if (!(cfgManager.get('disableCache') || window.Owl && window.Owl.cfgManager.get('disableCache'))) {
                var record = _this3.cacheSending[ts];
                if (record && record.cache && record.cache.length) {
                  DB.add(record.cache, cfgManager.get('webVersion'));
                }
              }
              _this3.cacheSending[ts] = undefined;
            } catch (e) {
              _this3.cacheSending[ts] = undefined;
              Logger.ignore(e);
            }
          },
          xhrRewritten: cfgManager.get('autoCatch').ajax ? true : false
        });
        _this3.cacheSending[ts] = {
          xhr: xhr,
          cache: cache
        };
        _this3.cache = [];
      };
      var delay = errCfg.delay;
      if (isReportNow) {
        comboReport();
      } else if (!comboTimeout && delay !== -1) {
        comboTimeout = setTimeout(comboReport, delay);
      }
    }
    // 绑定 Extension 扩展信息
  }, {
    key: 'addCacheExtension',
    value: function addCacheExtension() {
      var cache = this.cache;
      var ret = [];
      if (!(cache && cache.length)) return ret;
      var ext = this.cfgManager.getExtension();
      for (var i = 0; i < cache.length; i++) {
        var error = cache[i];
        if (ext && (typeof ext === 'undefined' ? 'undefined' : _typeof(ext)) === 'object') {
          error = extend(error.toJson(), ext);
        }
        ret.push(error);
      }
      return ret;
    }
  }]);
  return ErrorManager;
}();
module.exports = ErrorManager;

/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Util = __webpack_require__(20);
var NOOP = function NOOP() {};

// 封装 AJAX 接口
module.exports = function (opts) {
  if (!opts) return;
  var UA = Util.getUserAgent();
  var browserName = Util.getAppName();
  var isIE89 = browserName.indexOf('Microsoft Internet Explorer') !== -1 && (UA.indexOf('MSIE 8.0') !== -1 || UA.indexOf('MSIE 9.0') !== -1);
  var useXDomainRequest = isIE89 && window.XDomainRequest;
  var req = void 0;
  if (useXDomainRequest) {
    req = new XDomainRequest();
  } else {
    req = new XMLHttpRequest();
  }
  req.open(opts.type || 'GET', opts.url, true);
  req.success = opts.success || NOOP;
  req.fail = opts.fail || NOOP;
  var _handleXhrEvent = function _handleXhrEvent(event) {
    if (event && /catfront.(dianping|51ping).com/.test(opts.url)) {
      if (event.currentTarget.status === 200) {
        req.success && req.success();
      } else {
        req.fail && req.fail();
      }
    }
  };

  // 当设置了 autoCatch.ajax 为false时，也需要支持 success/fail 回调
  if (opts.xhrRewritten === false && !useXDomainRequest) {
    if ('addEventListener' in req) {
      req.addEventListener('load', _handleXhrEvent);
      req.addEventListener('error', _handleXhrEvent);
      req.addEventListener('abort', _handleXhrEvent);
    } else {
      var _originStateChange = req.onreadystatechange;
      req.onreadystatechange = function (event) {
        if (this.readyState === 4) {
          _handleXhrEvent(event);
        }
        if (_originStateChange) {
          _originStateChange.apply(this, arguments);
        }
      };
    }
  }
  if (opts.type === 'POST') {
    if (opts.header && !useXDomainRequest) {
      for (var key in opts.header) {
        if (opts.header.hasOwnProperty(key)) {
          req.setRequestHeader(key, opts.header[key]);
        }
      }
    }
    req.send(opts.data);
  } else {
    req.send();
  }
  return req;
};

/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Event = __webpack_require__(21);
var spiderList = ['baiduspider', 'googlebot', 'bingbot', 'yammybot', '360spider', 'haosouspider', 'youdaobot', 'sogou news spider', 'yisouspider', 'mtdp-infosec', 'mtdp-searchspider', 'yandexbot', 'yandexmobilebot'];
var _int64Convert = __webpack_require__(22);
var uuid = __webpack_require__(23);
var _uuid = uuid && uuid.__esModule ? uuid : {
  default: uuid
};
module.exports = {
  // 复写History对象方法以实现路由变化的监听
  hackHistoryStateFuncs: function hackHistoryStateFuncs() {
    if (this.historyStateHacked) return;
    var ADD_EVENT = window.addEventListener || window.attachEvent;
    var that = this;
    ADD_EVENT('hashchange', function (event) {
      try {
        var newURL = event && event.newURL || '';
        var oldURL = event && event.oldURL || '';
        var curPath = that.parseRoutePath(newURL);
        var prePath = that.parseRoutePath(oldURL);
        if (curPath && prePath && curPath !== prePath) {
          // 路由路径发生了变化
          Event.trigger('validStateChange', {
            path: curPath
          });
        }
      } catch (e) {
        that.reportSysError(e);
      }
    });
    try {
      this.hackStateFunc('pushState');
      this.hackStateFunc('replaceState');
    } catch (e) {
      this.reportSysWarn(e);
    }
    this.historyStateHacked = true;
  },
  hackStateFunc: function hackStateFunc(name) {
    var oldFunc = window.history[name];
    if (typeof oldFunc == 'function') {
      var that = this;
      window.history[name] = function (state, title, url) {
        var preHref = location.href;
        var result = oldFunc.apply(window.history, [].slice.call(arguments));
        var curHref = location.href; // location.href 已完成变更
        if (!url || typeof url != 'string' || curHref === preHref) return result;
        try {
          var prePath = that.parseRoutePath(preHref);
          var curPath = that.parseRoutePath(curHref);
          if (curPath && prePath && curPath !== prePath) {
            // 路由路径发生了变化
            Event.trigger('validStateChange', {
              path: curPath
            });
          }
        } catch (e) {
          that.reportSysError(e);
        }
        return result;
      };
    }
  },
  // 解析出url的路径部分
  parseRoutePath: function parseRoutePath(url) {
    if (url && typeof url == 'string') {
      var path = url.replace(/^(https?:)?(\/\/[^\/]*)?/, '');
      var query = path.match(/\?.*$/) && path.match(/\?.*$/)[0] || '';
      var hashAfterQuery = query.match(/\#.*$/) && query.match(/\#.*$/)[0] || '';
      return path.replace(/\?.*$/, '') + hashAfterQuery;
    } else {
      return '';
    }
  },
  getHref: function getHref() {
    return location && location.href || '';
  },
  getProtocol: function getProtocol() {
    return location && location.protocol || 'https:';
  },
  getOrigin: function getOrigin() {
    return location.origin || location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
  },
  getPageUrl: function getPageUrl() {
    return this.getHref().replace(/\?.*(?=(\#))/, '').replace(/\?.*/, '');
  },
  getPerfTiming: function getPerfTiming() {
    return window.performance && window.performance.timing;
  },
  getConnectionType: function getConnectionType() {
    var connection = window.navigator && window.navigator.connection;
    return connection ? connection.effectiveType || connection.type || '' : '';
  },
  reportSysError: function reportSysError(err) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var errManager = window.Owl && window.Owl.errManager;
    if (errManager && typeof errManager.reportSystemError === 'function') {
      errManager.reportSystemError(err, opts);
    }
  },
  reportSysWarn: function reportSysWarn(err, opts) {
    opts = opts || {};
    opts.level = 'warn';
    this.reportSysError(err, opts);
  },
  getUserAgent: function getUserAgent() {
    return window.navigator && window.navigator.userAgent || '';
  },
  getAppName: function getAppName() {
    return window.navigator.appName;
  },
  checkIsSpider: function checkIsSpider() {
    try {
      var ua = this.getUserAgent().toLowerCase();
      for (var i = 0; i < spiderList.length; i++) {
        if (ua.indexOf(spiderList[i]) > -1) return true;
      }
    } catch (e) {
      this.reportSysError(e);
    }
    return false;
  },
  getFullUrl: function getFullUrl(url) {
    if (url.indexOf('//') === 0) {
      url = this.getProtocol() + url;
    } else if (url.indexOf('/') === 0) {
      url = this.getOrigin() + url;
    }
    return url;
  },
  checkSameOrigin: function checkSameOrigin(url) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    origin = origin || this.getOrigin();
    if (!(url && origin)) return false;
    url = this.getFullUrl(url);
    return url.indexOf(origin) === 0;
  },
  traceid: function traceid() {
    try {
      var uu = _uuid.default.v1().replace(/-/g, '');
      var f16 = uu.slice(0, 16);
      var l16 = uu.slice(16);
      var hex = Array(16).fill(0).map(function (_, i) {
        return parseInt(f16[15 - i], 16) ^ parseInt(l16[15 - i], 16);
      }).map(function (it) {
        return it.toString(16);
      }).join('');
      return (0, _int64Convert.signedHexToDec)(hex);
    } catch (e) {
      this.reportSysError(e);
      return '';
    }
  },
  getXPath: function getXPath(node) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    try {
      var id = node.id ? '#' + node.id : '';
      var className = 'string' === typeof node.className && node.className ? '.' + node.className.split(' ').join('.') : '';
      var nodeName = 'string' === typeof node.nodeName ? node.nodeName.toLowerCase() : '';
      var path = nodeName + id + className;
      return node.parentNode && node.parentNode.nodeName && count - 1 > 0 ? this.getXPath(node.parentNode, count - 1) + ' > ' + path : path;
    } catch (e) {
      return '';
    }
  }
};

/***/ }),
/* 21 */
/***/ ((module) => {

"use strict";


module.exports = {
  on: function on(name, listener) {
    if (!name || !listener) return;
    this._events_ = this._events_ || {};
    this._events_[name] = this._events_[name] || [];
    this._events_[name].push(listener);
  },
  trigger: function trigger(name) {
    var events = this._events_;
    if (!name || !events || !events[name]) return;
    var queue = events[name];
    var args = [].slice.call(arguments, 1);
    for (var i = 0; i < queue.length; i++) {
      queue[i].apply(this, args);
    }
  }
};

/***/ }),
/* 22 */
/***/ ((module, exports) => {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
  /*
   * @desc trim number string, remove front zero
   * @params {String} number string
   * @return {String} trimed number string
   */
  function trim(str) {
    while (str[0] === '0' && str.length > 1) {
      str = str.slice(1);
    }
    return str;
  }
  /*
   * @desc polish number string, add front zero
   * @params {String} number string
   * @params {Number} target length
   * @return {String} polished number string
   */
  function polish(str, len) {
    while (str.length < len) {
      str = '0' + str;
    }
    return str;
  }
  /*
   * @desc convert char to number
   * @params {String} number char
   * @params {Number} scale
   * @return {Number} polished number string
   */
  function toNumber(char, scale) {
    if (!char) {
      return 0;
    }
    var num = parseInt(char, scale);
    if (isNaN(num)) {
      throw new Error("parse char '" + char + "' to number(" + scale + ") failed");
    }
    return num;
  }
  /*
   * @desc compare two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {Number} 1 0 -1
   */
  function compare(firstr, secstr, scale) {
    if (firstr.length > secstr.length) {
      return 1;
    } else if (firstr.length < secstr.length) {
      return -1;
    } else {
      var i = 0;
      while (i < firstr.length) {
        var fn = toNumber(firstr[i], scale);
        var sn = toNumber(secstr[i], scale);
        if (fn > sn) {
          return 1;
        } else if (fn < sn) {
          return -1;
        }
        i++;
      }
    }
    return 0;
  }
  /*
   * @desc add two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {String} added number string
   */
  function add(firstr, secstr, scale) {
    var result = '';
    var firlen = firstr.length;
    var seclen = secstr.length;
    var n;
    var carry = 0;
    var remainder;
    var i = 0;
    while (i < firlen || i < seclen) {
      i++;
      n = toNumber(firstr[firlen - i], scale) + toNumber(secstr[seclen - i], scale) + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while (carry > 0) {
      remainder = carry % scale;
      result = remainder.toString(scale) + result;
      carry = Math.floor(carry / scale);
    }
    return result;
  }
  /*
   * @desc sub two number string
   * @params {String} first number string
   * @params {String} second number string
   * @params {Number} scale
   * @return {String} subed number string
   */
  function sub(firstr, secstr, scale) {
    if (compare(firstr, secstr, scale) < 0) {
      return sub(secstr, firstr, scale);
    }
    var result = '';
    var firlen = firstr.length;
    var seclen = secstr.length;
    var n;
    var carry = 0;
    var i = 0;
    while (i < firlen) {
      i++;
      n = toNumber(firstr[firlen - i], scale) - toNumber(secstr[seclen - i], scale) + carry;
      if (n < 0) {
        carry = -1;
        n = n + scale;
      }
      result = n.toString(scale) + result;
    }
    return trim(result);
  }

  /*
   * @desc multiply number string
   * @params {String} number string multiplicand
   * @params {Number} multiplier
   * @params {Number} scale
   * @return {String} multiplied number string
   */
  function multiply(str, multiplier, scale) {
    var result = '';
    var n;
    var carry = 0;
    var remainder;
    var i = str.length;
    while (--i >= 0) {
      n = toNumber(str[i], scale) * multiplier + carry;
      carry = Math.floor(n / scale);
      remainder = n % scale;
      result = remainder.toString(scale) + result;
    }
    while (carry > 0) {
      remainder = carry % scale;
      result = remainder.toString(scale) + result;
      carry = Math.floor(carry / scale);
    }
    return result;
  }
  /*
   * @desc convert number string from scale to scale
   * @params {String} number string
   * @params {Number} from scale
   * @params {Number} to scale
   * @params {Boolean} fullfill int64 value
   * @return {String} converted number string
   */
  function convert(src, fromScale, toScale, polishLen) {
    src = trim(src);
    fromScale = fromScale || 10;
    toScale = toScale || 16;
    var result = '0';
    var n;
    var rate = '1';
    var i = 0;
    while (i++ < src.length) {
      n = multiply(rate, toNumber(src[src.length - i], fromScale), toScale);
      result = add(result, n, toScale);
      rate = multiply(rate, fromScale, toScale);
    }
    if (polishLen) {
      return polish(result, polishLen);
    }
    return result;
  }
  convert.signedHexToDec = function (src) {
    var negate = src.length > 15 && toNumber(src[0], 16) >= 8;
    var result = convert(negate ? sub('10000000000000000', src, 16) : src, 16, 10);
    return negate ? '-' + result : result;
  };
  convert.signedDecToHex = function (src, polishLen) {
    var negate = src[0] === '-';
    var result = convert(negate ? src.slice(1) : src, 10, 16, polishLen);
    return negate ? sub('10000000000000000', result, 16) : result;
  };
  /*
   * @export
   */
  if ( true && module.exports) {
    module.exports = convert;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return convert;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(24);
var v4 = __webpack_require__(27);
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
module.exports = uuid;

/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(25);
var bytesToUuid = __webpack_require__(26);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf ? buf : bytesToUuid(b);
}
module.exports = v1;

/***/ }),
/* 25 */
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }
    return rnds;
  };
}

/***/ }),
/* 26 */
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}
function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}
module.exports = bytesToUuid;

/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(25);
var bytesToUuid = __webpack_require__(26);
function v4(options, buf, offset) {
  var i = buf && offset || 0;
  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || bytesToUuid(rnds);
}
module.exports = v4;

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Util = __webpack_require__(20);
var extend = __webpack_require__(12);
var Category = __webpack_require__(29);
var Level = __webpack_require__(30);
var errKeys = ['project', 'pageUrl', 'realUrl', 'resourceUrl', 'category', 'sec_category', 'level', 'unionId', 'timestamp', 'content', 'traceid'];
var VALID_ATTR = ['rowNum', 'colNum', 'tags'].concat(errKeys);
var eventKeys = ['project', 'pageUrl', 'category', 'sec_category', 'level', 'unionId'];

/**
 * 异常数据模型
 *
 * @param {string} project - 错误所在项目
 * @param {string} pageUrl - 错误聚合页面地址
 * @param {string} realUrl - 错误真实地址
 * @param {string} [resourceUrl] - 错误资源地址
 * @param {string} category - 错误类型jsError, resourceError, ajaxError
 * @param {string} sec_category - 错误名称，用户错误聚合
 * @param {string} level - 错误程度, 默认error, 分类info, debug, error, warn
 * @param {string} [content] - 错误详细日志信息
 * @param {Number} [rowNum] - 错误行
 * @param {Number} [colNum] - 错误列
 * @param {Number} timestamp - 时间戳
 * @param {string} unionId - unionId
 * @param {Object} [tags] - 其他用户自定义信息
 */

var OwlError = function () {
  function OwlError(data) {
    _classCallCheck(this, OwlError);
    if (!data) return;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    this.parse(data);
  }
  _createClass(OwlError, [{
    key: 'parse',
    value: function parse() {
      this.category = this.category || Category.SCRIPT;
      this.level = this.level || Level.ERROR;
      this.timestamp = this.timestamp || +new Date();
      this.sec_category = this.sec_category || 'default';
    }
  }, {
    key: 'isEqual',
    value: function isEqual(other) {
      return this.sec_category === other.sec_category && this.resourceUrl === other.resourceUrl && this.colNum === other.colNum && this.rowNum === other.rowNum && this.content === other.content;
    }
  }, {
    key: 'update',
    value: function update(data) {
      if (data) {
        for (var key in data) {
          if (data[key] !== undefined && VALID_ATTR.indexOf(key) > -1) {
            this[key] = data[key];
          }
        }
      }
      return this;
    }
  }, {
    key: 'updateTags',
    value: function updateTags(obj) {
      this.tags = extend(this.tags || {}, obj);
      return this;
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      var _this = this;
      var str = {};
      errKeys.map(function (key) {
        if (_this[key] !== undefined) {
          str[key] = _this[key];
        }
      });
      var rowNum = this.rowNum;
      var colNum = this.colNum;
      if (str.category === Category.SCRIPT && rowNum && colNum) {
        str.dynamicMetric = {
          rowNum: rowNum,
          colNum: colNum
        };
      }
      if (this.tags) {
        str.dynamicMetric = extend(str.dynamicMetric || {}, this.tags);
      }
      return str;
    }
  }, {
    key: 'toLoganJson',
    value: function toLoganJson() {
      var _this2 = this;
      var info = {};
      VALID_ATTR.map(function (key) {
        if (_this2[key] !== undefined) {
          info[key] = _this2[key];
        }
      });
      try {
        var content = info.content || '';
        if (typeof content !== 'string') {
          content = JSON.stringify(content);
        }
        info.content = content.substr && content.substr(0, 200) || '';
      } catch (e) {
        info.content = '';
        Util.reportSysError(e);
      }
      return info;
    }
  }, {
    key: 'getEventInfo',
    value: function getEventInfo() {
      var _this3 = this;
      var ext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var temp = {};
      eventKeys.map(function (key) {
        if (_this3[key] !== undefined) {
          temp[key] = _this3[key];
        }
      });
      for (var key in ext) {
        if (ext.hasOwnProperty(key)) {
          temp[key] = ext[key];
        }
      }
      return temp;
    }
  }]);
  return OwlError;
}();
OwlError.LEVEL = Level;
OwlError.CATEGORY = Category;
module.exports = OwlError;

/***/ }),
/* 29 */
/***/ ((module) => {

"use strict";


module.exports = {
  SCRIPT: 'jsError',
  AJAX: 'ajaxError',
  RESOURCE: 'resourceError'
};

/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";


module.exports = {
  ERROR: 'error',
  INFO: 'info',
  WARN: 'warn',
  DEBUG: 'debug'
};

/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isSupport = __webpack_require__(32);
var Logger = __webpack_require__(13);
var LS_KEY = 'owl_cache';
var LS_KEY_V2 = 'owl_cache_v2';
module.exports = {
  isSupport: isSupport(),
  get: function get() {
    if (!this.isSupport) return;
    var data = {};
    try {
      var rawV2 = localStorage.getItem(LS_KEY_V2); // new storage format - Object
      if (rawV2) {
        var tempV2 = JSON.parse(rawV2);
        if ((typeof tempV2 === 'undefined' ? 'undefined' : _typeof(tempV2)) === 'object' && Object.keys(tempV2).length) {
          data = tempV2;
        }
      }
    } catch (e) {
      this.clear(LS_KEY_V2);
      Logger.ignore(e);
    }
    try {
      var raw = localStorage.getItem(LS_KEY); // history storage format - Array
      if (raw) {
        var temp = JSON.parse(raw);
        if (temp instanceof Array) {
          data['no-version'] = temp.concat(data['no-version'] || []);
        }
      }
    } catch (e) {
      this.clear(LS_KEY);
      Logger.ignore(e);
    }
    return data;
  },
  add: function add(cache, version) {
    if (!this.isSupport) return;
    try {
      if (cache instanceof Array) {
        version = version || 'no-version';
        var preCache = this.get();
        if (preCache[version] instanceof Array) {
          preCache[version] = cache.concat(preCache[version]);
        } else {
          preCache[version] = cache;
        }
        localStorage.setItem(LS_KEY_V2, JSON.stringify(preCache));
      }
    } catch (e) {
      Logger.ignore(e);
    }
  },
  clear: function clear(key) {
    if (!this.isSupport) return;
    try {
      key = key || LS_KEY;
      localStorage.removeItem(key);
    } catch (e) {
      Logger.ignore(e);
    }
  },
  clearAll: function clearAll() {
    if (!this.isSupport) return;
    try {
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem(LS_KEY_V2);
    } catch (e) {}
  },
  clearItem: function clearItem(version) {
    if (!this.isSupport) return;
    try {
      var preCache = this.get();
      if ((typeof preCache === 'undefined' ? 'undefined' : _typeof(preCache)) === 'object' && preCache.hasOwnProperty(version)) {
        delete preCache[version];
        if (Object.keys(preCache).length) {
          localStorage.setItem(LS_KEY_V2, JSON.stringify(preCache));
        } else {
          localStorage.removeItem(LS_KEY_V2);
        }
        if (version === 'no-version') {
          localStorage.removeItem(LS_KEY);
        }
      }
    } catch (e) {
      Logger.ignore(e);
    }
  }
};

/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";


module.exports = function () {
  var testKey = 'owl_local_test';
  try {
    localStorage.setItem(testKey, 1);
    localStorage.removeItem(testKey);
  } catch (e) {
    return false;
  }
  return true;
};

/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var loadScript = (__webpack_require__(34).loadScript);
var prefixV1 = '//www.dpfile.com/app/dp-logan-web/logan_';
var prefixV2 = '//s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_';
var Logan = void 0;
var enable = false;
module.exports = {
  queue: [],
  ready: function ready() {
    var _this = this;
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var LoganAPI = config.LoganAPI,
      project = config.project,
      pageUrl = config.pageUrl,
      loganConfig = config.loganConfig,
      version = config.version;
    enable = true;
    var doTask = function doTask() {
      if (!Logan) return;
      if (loganConfig) Logan = Logan.config(loganConfig);
      Logan.log('[Session]:' + JSON.stringify({
        project: project,
        pageUrl: pageUrl
      }), 'owl', 'info', ['session']);
      while (_this.queue.length) {
        Logan.log(_this.queue.shift(), 'owl');
      }
    };
    if (LoganAPI) {
      Logan = LoganAPI;
      doTask();
    } else {
      try {
        if (window.Logan) {
          Logan = window.Logan;
          doTask();
        } else {
          var url = (version.indexOf('1.') === 0 ? prefixV1 : prefixV2) + version + '.js';
          loadScript(url, function () {
            Logan = window.Logan;
            doTask();
          });
        }
      } catch (e) {
        console.log('logan 加载失败');
      }
    }
  },
  log: function log(msg) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!enable) return;
    var type = opts.noType ? 'default' : 'owl';
    if (Logan) {
      Logan.log(msg, type);
    } else {
      this.queue.push(msg);
    }
  },
  _log: function _log() {
    try {
      if (Logan && Logan.log) {
        Logan.log.apply(Logan, arguments);
      }
    } catch (e) {}
  }
};

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var cached = [];
exports.loadScript = function (src, cb) {
  if (~cached.indexOf(src)) {
    cb();
    return;
  }
  var ele = document.createElement('script');
  ele.src = src;
  ele.onload = function () {
    cached.push(src);
    cb();
  };
  document.getElementsByTagName('head')[0].appendChild(ele);
};

/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Ajax = __webpack_require__(19);
var Url = __webpack_require__(14);
var Extend = __webpack_require__(12);
var Logan = __webpack_require__(33);
var Logger = __webpack_require__(13);
var CanIUse = __webpack_require__(36);
var _require = __webpack_require__(37),
  jsPattern = _require.jsPattern,
  cssPattern = _require.cssPattern,
  imgPattern = _require.imgPattern,
  urlPattern = _require.urlPattern;
var FirstScreenManager = __webpack_require__(38);
var parseInt = Number.parseInt || window.parseInt;
var NAME = 'page';
var parseTime = function parseTime(time) {
  var temp = Math && Math.round ? Math.round(time) : time;
  return parseInt(temp);
};
var PageManager = function () {
  function PageManager(cfgManager, errManager) {
    _classCallCheck(this, PageManager);
    this.cfgManager = cfgManager;
    this.errManager = errManager;
    this.points = [];
    this.pointsCustom = [];
    this.noCache = 'false';
    this.titansTags = {};
  }
  //因为FST指标是load后计算，期间用户可能跳转页面或对config进行设置，所以预先存储pageUrl和project

  _createClass(PageManager, [{
    key: 'setInitConfig',
    value: function setInitConfig() {
      this.initialPage = this.cfgManager.get('pageUrl');
      this.initialProject = this.cfgManager.get('project');
    }
    // custom points ready
  }, {
    key: 'setUserReady',
    value: function setUserReady() {
      if (this.cfgManager.get(NAME).auto) return;
      this.cfgManager.set({
        page: {
          auto: true
        }
      });
    }
  }, {
    key: 'getUserReady',
    value: function getUserReady() {
      return this.cfgManager.get(NAME).auto;
    }
    // default points ready
  }, {
    key: 'setReady',
    value: function setReady() {
      this.isReady = true;
    }
  }, {
    key: 'getReady',
    value: function getReady() {
      return this.isReady;
    }
  }, {
    key: 'getPerformaceTiming',
    value: function getPerformaceTiming() {
      return {
        perf: window.performance && window.performance.timing,
        paint: window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType('paint')
      };
    }
    // get resource timing of critical resources
  }, {
    key: 'getMainResourceTiming',
    value: function getMainResourceTiming() {
      var resourceTiming = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType('resource');
      var filter = this.cfgManager.get(NAME).isMainResource;
      var mainResourceTiming = [];
      try {
        if (!resourceTiming) return;
        if (typeof filter === 'function') {
          for (var i = 0; i < resourceTiming.length; i++) {
            var item = resourceTiming[i];
            if (filter(item)) {
              mainResourceTiming.push(item);
            }
          }
          return mainResourceTiming;
        } else {
          for (var _i = 0; _i < resourceTiming.length; _i++) {
            var resource = resourceTiming[_i];
            if (resource.initiatorType === 'link' || resource.initiatorType === 'script') {
              mainResourceTiming.push(resource);
            }
          }
          var size = this.cfgManager.get(NAME).mainResourceNumber;
          if (mainResourceTiming.length <= size) {
            return mainResourceTiming;
          } else {
            return mainResourceTiming.splice(0, size);
          }
        }
      } catch (e) {
        Logger.ignore(e);
      }
    }
    // 启动首屏时间 FST 的计算
  }, {
    key: 'sensoryObserver',
    value: function sensoryObserver() {
      this.firstScreenManager = new FirstScreenManager(this.cfgManager, this);
      this.firstScreenManager.mutaObserver();
    }
  }, {
    key: 'getRouteFst',
    value: function getRouteFst(path, prevPath) {
      if (this.firstScreenManager && path) {
        if (prevPath) {
          this.firstScreenManager.stopRouteMutaObserver(prevPath);
        }
        if (Math.random() < this.cfgManager.get(NAME).sample) {
          this.firstScreenManager.startRouteMutaObserver(path);
        }
      }
    }
  }, {
    key: 'reportRouteFst',
    value: function reportRouteFst(result, pageUrl) {
      var _this = this;
      var cfgManager = this.cfgManager;
      setTimeout(function () {
        var points = [];
        points[27] = result;
        var data = Extend({
          project: cfgManager.get('project'),
          pageurl: encodeURIComponent(pageUrl),
          speed: encodeURIComponent(points.join('|')),
          customspeed: '',
          timestamp: +new Date(),
          noCache: _this.noCache,
          pageId: cfgManager.get('pageId')
        }, cfgManager.getExtension());
        var url = Url.stringify(cfgManager.getApiPath(NAME), data);
        Ajax({
          url: url,
          method: 'GET'
        });
      }, 0);
    }
  }, {
    key: 'parsePageTimeWithDefer',
    value: function parsePageTimeWithDefer() {
      var _this2 = this;
      setTimeout(function () {
        try {
          if (_this2.cfgManager.get(NAME).sensoryIndex) {
            _this2.firstScreenManager.getSensoryIndex(function (senseTime) {
              _this2.parsePageTime(senseTime); // W3C points and paint time (FST, FP, FCP)
              _this2.parseFirstScreenPerf(senseTime); // first screen performance analysis
            });
          } else {
            _this2.parsePageTime();
          }
        } catch (e) {
          _this2.parsePageTime();
        }
      }, 0);
    }
  }, {
    key: 'parsePageTime',
    value: function parsePageTime(senseTime) {
      var _getPerformaceTiming = this.getPerformaceTiming(),
        perf = _getPerformaceTiming.perf,
        paint = _getPerformaceTiming.paint;
      if (!perf) return this.setReady();
      var navStart = perf.navigationStart;
      var perfMap = {
        unloadEventStart: 1,
        unloadEventEnd: 2,
        redirectStart: 3,
        redirectEnd: 4,
        fetchStart: 5,
        domainLookupStart: 6,
        domainLookupEnd: 7,
        connectStart: 8,
        // secureConnectionStart
        connectEnd: 9,
        requestStart: 10,
        responseStart: 11,
        responseEnd: 12,
        domLoading: 13,
        domInteractive: 14,
        domContentLoadedEventStart: 15,
        domContentLoadedEventEnd: 16,
        domComplete: 17,
        loadEventStart: 18,
        loadEventEnd: 19
      };
      for (var key in perfMap) {
        var value = perf[key] || 0;
        this.points[perfMap[key]] = value ? value - navStart : 0;
      }
      this.points[20] = perf.domainLookupEnd - perf.domainLookupStart; // dns
      this.points[21] = perf.connectEnd - perf.connectStart; // tcp
      this.points[22] = perf.responseEnd - perf.requestStart; // download

      var firstPaint = 0;
      var firstContentfulPaint = 0;
      if (paint && paint.length) {
        for (var i = 0; i < paint.length; i++) {
          var item = paint[i];
          if (item.name === 'first-paint') {
            firstPaint = parseInt(item.startTime);
          } else if (item.name === 'first-contentful-paint') {
            firstContentfulPaint = parseInt(item.startTime);
          }
        }
        if (firstPaint && firstContentfulPaint) {
          this.points[23] = firstPaint;
          this.points[24] = firstContentfulPaint;
        }
      }
      if (senseTime) {
        this.points[25] = senseTime.FST && senseTime.FST > firstContentfulPaint ? senseTime.FST : firstContentfulPaint;
        this.points[26] = senseTime.FCP || firstContentfulPaint || this.points[15];
      }
      if (window.Owl && window.Owl.fstInfo) {
        window.Owl.fstInfo.FST = this.points[25];
      }
      try {
        // handle titans perf timing
        var titansData = window.titansReport;
        if (!titansData && window.KNBTitansXSync && typeof window.KNBTitansXSync.getTitansReport === 'function') {
          var result = window.KNBTitansXSync.getTitansReport();
          titansData = result && JSON.parse(result);
        }
        if (titansData) {
          if (titansData.h5Env) {
            var envInfo = titansData.h5Env;
            if (envInfo.timestamp && envInfo.timestamp.h5EnvInit) {
              this.points[28] = perf.loadEventStart - envInfo.timestamp.h5EnvInit;
            }
            if (envInfo.timing) {
              this.points[29] = envInfo.timing.h5EnvPrepare;
              this.points[30] = envInfo.timing.pagePreprocess;
              this.points[31] = envInfo.timing.webviewPrepare;
            }
            if (envInfo.tag && typeof envInfo.tag.isWebViewInitialed != 'undefined') {
              this.titansTags.isWebViewInitialed = envInfo.tag.isWebViewInitialed ? 'true' : 'false';
            }
          }
          if (titansData.urlPreprocess) {
            var urlPreInfo = titansData.urlPreprocess;
            if (urlPreInfo.timing) {
              this.points[32] = urlPreInfo.timing.urlPreprocess;
            }
            if (urlPreInfo.tag && typeof urlPreInfo.tag.isInterJump != 'undefined') {
              this.titansTags.isInterJump = urlPreInfo.tag.isInterJump ? 'true' : 'false';
            }
          }
          if (titansData.commonTag && titansData.commonTag.titansCoreVersion) {
            this.titansTags.titansCoreVersion = titansData.commonTag.titansCoreVersion;
          }
        }
      } catch (e) {
        this.errManager.reportSystemWarn(e);
      }
      for (var _i2 = 0; _i2 < this.points.length; _i2++) {
        if (isNaN(this.points[_i2]) || this.points[_i2] < 0) {
          this.points[_i2] = 0;
        }
      }
      var cfgManager = this.cfgManager;
      var logInfo = {
        project: cfgManager.get('project'),
        pageUrl: cfgManager.get('pageUrl'),
        start: this.points[11],
        dcl: this.points[16],
        load: this.points[18],
        fst: this.points[25] || 0
      };
      Logan._log('[Performance]:' + JSON.stringify(logInfo), 'owl', 'info', ['perf']);

      // is cache hit
      var resTiming = this.getMainResourceTiming();
      if (resTiming) {
        var timeThreshold = cfgManager.get(NAME).timeThreshold;
        for (var _i3 = 0; _i3 < resTiming.length; _i3++) {
          var res = resTiming[_i3];
          if (res.transferSize !== undefined) {
            if (res.transferSize !== 0) this.noCache = 'true';
          } else if (res.duration !== undefined) {
            if (res.duration > timeThreshold) this.noCache = 'true';
          }
        }
      }
      this.setReady();
      this.report();
    }
    // handle custom points
  }, {
    key: 'push',
    value: function push(point) {
      if (!point || typeof point.position != 'number' || point.position < 0 || point.position > 31) return;
      this.pointsCustom[point.position] = point.duration || 0;
      this.report();
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }
      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };
      return clearTimeout;
    }(function () {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    })
  }, {
    key: 'report',
    value: function report(reportNow) {
      var _this3 = this;
      var cfgManager = this.cfgManager;
      var catchPage = cfgManager.get('autoCatch').page;
      if (catchPage && !this.getReady()) return;
      if (!this.getUserReady()) return;
      if (!this.points.length && !this.pointsCustom.length) return;
      if (Math.random() > cfgManager.get(NAME).sample) return;
      try {
        if (this.timeout) {
          this.clearTimeout();
        } else if (this.pendingAjax && typeof this.pendingAjax.abort === 'function') {
          this.pendingAjax.abort();
        }
      } catch (e) {
        this.errManager.reportSystemError(e);
      }
      var doSend = function doSend() {
        _this3.clearTimeout();
        if (!_this3.points.length && !_this3.pointsCustom.length) return;

        // 默认性能指标上报至最先设置的pageUrl内容
        var pageUrl = _this3.points.length && _this3.initialPage || cfgManager.get('pageUrl');
        var project = _this3.points.length && _this3.initialProject || cfgManager.get('project');
        var ext = cfgManager.getExtension();
        var data = Extend({
          project: project,
          pageurl: encodeURIComponent(pageUrl),
          speed: encodeURIComponent(_this3.points.join('|')),
          customspeed: encodeURIComponent(_this3.pointsCustom.join('|')),
          timestamp: +new Date(),
          noCache: _this3.noCache,
          pageId: cfgManager.get('pageId')
        }, ext);
        data = Extend(data, _this3.titansTags);
        var url = Url.stringify(cfgManager.getApiPath(NAME), data);
        _this3.pendingAjax = Ajax({
          method: 'GET',
          url: url,
          success: function success() {
            _this3.points = [];
            _this3.pointsCustom = [];
            _this3.pendingAjax = undefined;
          },
          xhrRewritten: cfgManager.get('autoCatch').ajax ? true : false
        });
      };
      var delay = cfgManager.get(NAME).delay || 0;
      if (reportNow) {
        doSend();
      } else if (delay >= 0) {
        this.timeout = setTimeout(function () {
          doSend();
        }, delay);
      }
    }
    // 解析并上报页面首屏的性能指标及慢访问个案数据
  }, {
    key: 'parseFirstScreenPerf',
    value: function parseFirstScreenPerf(senseTime) {
      var _this4 = this;
      var cfgManager = this.cfgManager;
      var pageConfig = cfgManager.get(NAME);
      // 确保测速点上报之后再开始解析首屏性能指标
      var delay = pageConfig.delay || 0;
      setTimeout(function () {
        if (pageConfig.fstPerfAnalysis === true && senseTime && senseTime.FST) {
          var resEntries = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType('resource');
          if (resEntries && resEntries.length) {
            var fst = parseInt(senseTime.FST || 0);
            var random = Math.random();
            var logSumInfo = random < pageConfig.fstPerfSample;
            // 首屏时间超过 1s 且命中采样率时上报慢访问的个案数据, 暂不支持不同区间内采样率的可配置
            var sampleRate = fst < 2000 ? 0.05 : 0.1;
            var logSlowView = pageConfig.logSlowView === true && fst > 1000 && random < sampleRate;
            if (logSumInfo) {
              // 首屏性能指标汇总数据
              var sumInfo = {
                picCount: 0,
                picSize: 0,
                jsCount: 0,
                jsSize: 0,
                cssCount: 0,
                cssSize: 0,
                ajaxCount: 0
                // 慢访问个案数据
              };
              var resList = {
                js: {},
                css: {},
                img: {},
                ajax: {}
                // initiatorType 不能代表请求资源的类型, 需要进一步通过以下正则做匹配
              };
              var time = void 0,
                start = void 0,
                stalled = void 0,
                dns = void 0,
                tcp = void 0,
                ssl = void 0,
                ttfb = void 0,
                load = void 0,
                hit = void 0,
                logStr = void 0;
              try {
                resEntries.filter(function (res) {
                  // 筛选 fetchStart 在 fst 之前的资源请求
                  return res.fetchStart && res.fetchStart < fst;
                }).forEach(function (res) {
                  var type = '';
                  var name = res.name || '';
                  var initType = res.initiatorType || '';
                  var size = res.transferSize || 0;
                  if (name && initType) {
                    if (initType === 'img' || name.match(imgPattern)) {
                      type = 'img';
                      sumInfo.picCount++;
                      sumInfo.picSize += size;
                    } else if (initType === 'script' || initType === 'link' && name.match(jsPattern)) {
                      type = 'js';
                      sumInfo.jsCount++;
                      sumInfo.jsSize += size;
                    } else if (initType === 'css' || initType === 'link' && name.match(cssPattern)) {
                      type = 'css';
                      sumInfo.cssCount++;
                      sumInfo.cssSize += size;
                    } else if (initType === 'xmlhttprequest' || initType === 'fetch' || initType === 'beacon') {
                      type = 'ajax';
                      sumInfo.ajaxCount++;
                    }
                  }
                  if (logSlowView && type && name) {
                    var matches = name.match(urlPattern);
                    if (matches && matches[1] && matches[2]) {
                      var bodySize = res.decodedBodySize || 0;
                      var duration = res.duration || 0;
                      time = parseTime(res.responseEnd - res.fetchStart);
                      start = parseTime(res.fetchStart);
                      stalled = parseTime(res.domainLookupStart - res.fetchStart);
                      dns = parseTime(res.domainLookupEnd - res.domainLookupStart);
                      tcp = parseTime(res.connectEnd - res.connectStart);
                      ssl = parseTime(res.connectEnd - res.secureConnectionStart);
                      ttfb = parseTime(res.responseStart - res.requestStart);
                      load = parseTime(res.responseEnd - res.responseStart);
                      hit = (size > 0 ? false : bodySize > 0 ? true : duration < 30) ? 1 : 0;
                      logStr = '' + size + ',' + time + ',' + start + ',' + dns + ',' + tcp + ',' + ssl + ',' + ttfb + ',' + load + ',' + stalled + ',' + hit;
                      if (resList[type][matches[1]] instanceof Array) {
                        resList[type][matches[1]].push([matches[2], logStr]);
                      } else {
                        resList[type][matches[1]] = [[matches[2], logStr]];
                      }
                    }
                  }
                });

                // 上报首屏性能的汇总数据
                var url = Url.stringify(cfgManager.getApiPath('fstInfo'));
                var data = Extend({
                  p: _this4.initialProject || cfgManager.get('project'),
                  page: _this4.initialPage || cfgManager.get('pageUrl'),
                  ts: Date.now(),
                  pageId: cfgManager.get('pageId'),
                  unionId: cfgManager.getExtension('unionId'),
                  respTime: fst
                }, sumInfo);
                Ajax({
                  type: 'POST',
                  url: url,
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data: 'data=' + encodeURIComponent(JSON.stringify(data))
                });
                // 上报慢访问个案数据
                if (logSlowView) {
                  var _url = Url.stringify(cfgManager.getApiPath('fstLog'));
                  var _data = {
                    p: _this4.initialProject || cfgManager.get('project'),
                    page: _this4.initialPage || cfgManager.get('pageUrl'),
                    ts: Date.now(),
                    pageId: cfgManager.get('pageId'),
                    unionId: cfgManager.getExtension('unionId'),
                    respTime: fst,
                    content: JSON.stringify(resList)
                  };
                  Ajax({
                    type: 'POST',
                    url: _url,
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'data=' + encodeURIComponent(JSON.stringify(_data))
                  });
                }
                // 首屏最后一次DOM变更的时间及其Xpath路径
              } catch (e) {
                _this4.errManager.reportSystemError(e);
              }
            }
          }
        }
      }, delay);
    }
  }, {
    key: 'manualReportFST',
    value: function manualReportFST() {
      var _this5 = this;
      var pageConfig = this.cfgManager.get(NAME);
      if (pageConfig.sensoryIndex || !pageConfig.manualReportFST || this.firstScreenManager) return;
      if (!CanIUse.PerformanceNow()) return;

      // 清空数据
      this.points = [];
      this.pointsCustom = [];
      if (window._Owl_ && window._Owl_.pageData) {
        window._Owl_.pageData = [];
      }
      // 设置计时起点
      var time = parseInt(performance.now());
      // 开启 FST 的监听计算
      this.sensoryObserver();
      // 等待 FST 计算完成并上报
      setTimeout(function () {
        try {
          if (pageConfig && pageConfig.manualReportFST) {
            _this5.firstScreenManager.getSensoryIndex(function (senseTime) {
              _this5.parseAsyncFST(senseTime, time);
            });
          }
        } catch (e) {
          Logger.ignore(e);
        }
      }, 0);
    }
  }, {
    key: 'parseAsyncFST',
    value: function parseAsyncFST(senseTime, startTime) {
      if (senseTime) {
        var fst = parseInt(senseTime.FST || 0) - startTime;
        var fcp = parseInt(senseTime.FCP || 0) - startTime;
        if (fst > 0) {
          this.points[25] = fst;
          this.points[26] = fcp > 0 ? fcp : 0;
        }
      }

      // 其他默认测速点置为 0
      for (var i = 0; i < this.points.length; i++) {
        if (isNaN(this.points[i])) {
          this.points[i] = 0;
        }
      }
      this.setReady();
      this.report();
    }
  }]);
  return PageManager;
}();
module.exports = PageManager;

/***/ }),
/* 36 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Util = __webpack_require__(20);
module.exports = {
  PerformanceObserver: function PerformanceObserver() {
    if (window.PerformanceObserver) {
      try {
        var chromeVersionReg = /Chrome\/(\d+)/;
        var UA = Util.getUserAgent();
        if (chromeVersionReg.test(UA)) {
          var version = UA.match(chromeVersionReg)[1];
          if (parseInt(version) > 59) return true;
        } else {
          return true;
        }
      } catch (e) {}
    }
  },
  MutationObserver: function MutationObserver() {
    if (window.MutationObserver) {
      try {
        // 处理IE11下开启首屏后的模板渲染异常问题
        var IEVersion = -1;
        var UA = Util.getUserAgent();
        if (UA.indexOf('compatible') > -1 && UA.indexOf('MSIE') > -1) {
          new RegExp('MSIE (\\d+\\.\\d+);').test(UA);
          IEVersion = parseFloat(RegExp['$1']);
        } else if (UA.indexOf('Trident') > -1 && UA.indexOf('rv:11.0') > -1) {
          IEVersion = 11;
        }
        if (IEVersion === -1 || IEVersion > 11) return true;
      } catch (e) {}
    }
  },
  PerformanceNow: function PerformanceNow() {
    return window.performance && window.performance.now && typeof window.performance.now === 'function' ? true : false;
  },
  GetEntries: function GetEntries() {
    return window.performance && typeof window.performance.getEntries === 'function' ? true : false;
  }
};

/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";


module.exports = {
  jsPattern: /\.js$/i,
  cssPattern: /\.css$/i,
  imgPattern: /\.(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)$/i,
  urlPattern: /^(https?:\/\/[^/\r\n]+)(\/[^\r\n]*)?$/
};

/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var ImgUtils = __webpack_require__(39);
var Logger = __webpack_require__(13);
var CanIUse = __webpack_require__(36);
var Util = __webpack_require__(20);
var mutaRecords = []; // 记录 mutation 新增节点及其对应时间
var domTimer = null; // DOM 变化监听计时器
var perfTimer = null; // 资源请求监听计时器
var domDone = false; // DOM 变化监听结束标记
var perfDone = false; // 资源请求监听结束标记
var senseTime = void 0; // 存放 FST 和 FCP 时间
var FCP = -1; // 模拟的 first contentful paint 时间
var ignoreFirstScreenImg = void 0; // 是否忽略首屏内图片的加载
var outCount = 0; // 记录检测到首屏外 mutation 的次数
var scrollDom = void 0;
var MaxOutCount = 15; // 检测到首屏外 mutation 次数阈值
var STOPTIME = 3000; // 默认的停止监听超时阈值
var MinScore = 3; // 有效 DOM 变更的最小权重阈值
var ELEMENT_WEIGHT = 1; // 元素权重的基本权重
var DEP_WEIGHT = 0; // 元素权重的深度权重
var NodesFilter = ['HTML', 'HEAD', 'META', 'LINK', 'SCRIPT', 'STYLE', 'NOSCRIPT']; // 非视觉元素

var ArraySlice = Array.prototype.slice;
var parseInt = Number.parseInt || window.parseInt;
var windowSize = getViewportSize();
var windowHeight = windowSize.height;
var windowWidth = windowSize.width;
var NAME = 'page';
var FirstScreenManager = function () {
  function FirstScreenManager(cfgManager, pageManager) {
    _classCallCheck(this, FirstScreenManager);
    this.cfgManager = cfgManager;
    this.pageManager = pageManager;
    this.pageData = [];
    this.observer = null;
    this.disableMutaObserver = false;
    var pageCfg = cfgManager.get(NAME);
    var mutaStopTime = parseInt(pageCfg.mutaStopTime || 0);
    this.mutaStopTime = mutaStopTime > STOPTIME ? mutaStopTime : STOPTIME;
    this.perfObserver = null;
    this.ignoreDom = pageCfg.ignoreAttr || 'owl-ignore';
    this.imgPattern = /(\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i;
    this.noCheckOuterMutaCount = pageCfg.noCheckOuterMutaCount;
    this.canStartObserver = CanIUse.PerformanceNow() && CanIUse.MutationObserver();
    this.spaRoutesData = {};
    scrollDom = pageCfg.scrollDom;
    if (window._Owl_) {
      this.pageData = window._Owl_.pageData;
      this.observer = window._Owl_.observer;
      this.disableMutaObserver = window._Owl_.disableMutaObserver;
    }
    // 要求算法开始前body已存在, 新的observer能以body作为目标, 取代document来缩小监听范围
    if (this.disableMutaObserver || !document.body) {
      domDone = true;
      perfDone = true;
      try {
        this.observer && this.observer.disconnect();
      } catch (e) {}
    }
  }
  /**
   * 配置 DOM 变化和资源请求的监听及回调
   *
   * @memberof FirstScreenManager
   */

  _createClass(FirstScreenManager, [{
    key: 'mutaObserver',
    value: function mutaObserver() {
      var _this = this;
      if (!this.canStartObserver || domDone) return;
      if (this.observer && this.observer.disconnect) {
        // 关闭预采集模块中创建的observer并处理之前记录的mutation
        try {
          this.observer.disconnect();
          this.observer = null;
          if (this.pageData && this.pageData.length) {
            this.pageData.forEach(function (item) {
              _this.mutaCallback(item.mutations, item.startTime, false);
            });
            // clear this.pageData
          }
        } catch (e) {
          console.log('observer disconnect err');
        }
      }
      var pageConfig = this.cfgManager.get(NAME);
      try {
        // 创建新的observer, 以body为目标来缩小监听范围
        this.observer = new MutationObserver(function (mutations) {
          var time = performance.now();
          _this.mutaCallback(mutations, time, true);
        });
        this.observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        this.resetTimer(true);

        // 页面加载完成之后, 响应用户交互来停止DOM变化监听
        if (pageConfig.interactToStopObserver === true && document && document.addEventListener) {
          if (document.readyState === 'complete') {
            this.interactToStopObserver();
          } else {
            var ADD_EVENT = window.addEventListener || window.attachEvent;
            ADD_EVENT('load', function () {
              _this.interactToStopObserver();
            });
          }
        }
      } catch (e) {
        console.log('observer observe err');
      }

      // 忽略首屏内图片的加载请求
      ignoreFirstScreenImg = pageConfig.disableSensoryImageIndex;
      perfDone = ignoreFirstScreenImg || perfDone;
      if (!perfDone) {
        this.registerPerfObserver();
      }
    }
    /**
     * 开启资源请求的监听
     *
     * @memberof FirstScreenManager
     */
  }, {
    key: 'registerPerfObserver',
    value: function registerPerfObserver() {
      var _this2 = this;
      var disablePerfObserver = this.cfgManager.get('resource').disablePerformanceObserver || false;
      if (CanIUse.PerformanceObserver() && disablePerfObserver !== true) {
        // 8s图片监听超时时间, 防止perfDone不会变成true, 导致无法进入最终的回调
        var perTimer = setTimeout(function () {
          _this2.perfObserverStop();
        }, 8000);
        this.perfObserver = new window.PerformanceObserver(function () {
          clearTimeout(perfTimer);
          perfTimer = setTimeout(function () {
            clearTimeout(perTimer);
            _this2.perfObserverStop();
          }, STOPTIME);
        });
        this.perfObserver.observe({
          entryTypes: ['resource']
        });
      } else {
        perfDone = true;
      }
    }
  }, {
    key: 'getSensoryIndex',
    value: function getSensoryIndex(callback) {
      var _this3 = this;
      var doneTimer = 0;
      // 8s超时监听, 防止无法执行callback并导致不上报测速点
      var fstTimer = setTimeout(function () {
        clearInterval(doneTimer);
        _this3.mutaObserverStop();
        _this3.perfObserverStop();
        callback(senseTime);
      }, 8000);
      var getSense = function getSense() {
        if (domDone && perfDone) {
          clearInterval(doneTimer);
          clearTimeout(fstTimer);
          if (senseTime) {
            if (!ignoreFirstScreenImg) {
              caculateImageTiming(_this3.ignoreDom, _this3.imgPattern);
            }
            callback(senseTime);
          } else {
            callback();
          }
        }
      };
      doneTimer = setInterval(getSense, 500);
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer(newTimer) {
      var _this4 = this;
      if (domTimer) clearTimeout(domTimer);
      if (newTimer) {
        domTimer = setTimeout(function () {
          Logger.logScreen(_this4.mutaStopTime + 'ms\u65F6\u95F4\u5185\u6CA1\u6709\u76D1\u542C\u5230\u65B0\u7684DOM\u53D8\u5316, \u505C\u6B62DOM\u53D8\u5316\u76D1\u542C');
          _this4.mutaObserverStop();
        }, this.mutaStopTime);
      }
    }
    /*
    * mutation 回调: 记录变更时间和元素集合, 存储到 mutaRecords, 用于 FST 的计算
    * @param mutations
    * @param startTime
    * @param reset 是否重置计时器
    */
  }, {
    key: 'mutaCallback',
    value: function mutaCallback(mutations, startTime, reset) {
      var _this5 = this;
      if (reset) this.resetTimer(true);
      startTime = startTime || performance.now();

      // 为什么要用那么多个setTimeout？是否形成了多个闭包从而影响了性能？
      setTimeout(function () {
        // 已达到停止DOM变化监听的条件后, 不再处理还未处理的mutations
        if (domDone) return;
        Logger.logScreen('DOM原始变更:', startTime, mutations);
        // 筛选有效的MutationRecord
        mutations.filter(function (mutation) {
          var targetNodeName = (mutation.target.nodeName || '').toUpperCase();
          return mutation.type === 'childList' && targetNodeName && NodesFilter.indexOf(targetNodeName) < 0 && mutation.addedNodes && mutation.addedNodes.length;
        }).forEach(function (mutation) {
          if (domDone) return;

          // 筛选有效的新增节点
          var addedNodes = ArraySlice.call(mutation.addedNodes, 0).filter(function (node) {
            var nodeName = (node.nodeName || '').toUpperCase();
            return node.nodeType === 1 // 忽略非元素节点
            && nodeName && NodesFilter.indexOf(nodeName) < 0 // 忽略非视觉元素
            && nodeName !== 'IFRAME' // 忽略iframe
            && node.isConnected !== false // 忽略未挂载至DOM树的元素
            && !shouldIgnoreNode(node, _this5.ignoreDom); // 忽略业务手动配置的元素
          });

          if (!(addedNodes && addedNodes.length && addedNodes[0])) return;

          // 记录筛选后的新增节点及其对应时间, 用于之后FST的计算
          mutaRecords.push({
            nodes: addedNodes,
            startTime: startTime
          });
          var firstNode = addedNodes[0];
          // 模拟白屏时间 FCP - first contentful paint
          if (FCP < 0) {
            calcuFCP(firstNode, startTime);
          }

          // 检测到有效的首屏外mutation的次数达到阈值时, 停止DOM变化监听
          // 此处的rect可以记录下来供后面使用, 减少getBoundingClientRect的执行次数(important)
          try {
            if (!_this5.noCheckOuterMutaCount) {
              var rect = firstNode.getBoundingClientRect && firstNode.getBoundingClientRect();
              if (rect && rect.width && rect.height && rect.top >= windowHeight) {
                // 此处的判断逻辑是否应该加强？
                Logger.logScreen('\u68C0\u6D4B\u5230\u9996\u5C4F\u5916\u8282\u70B9\u6B21\u6570: ' + ++outCount + '\u6B21, \u8282\u70B9\u5185\u5BB9\u4E3A:', addedNodes);
                if (outCount >= MaxOutCount) {
                  Logger.logScreen('\u68C0\u6D4B\u5230\u9996\u5C4F\u5916mutation\u8FBE\u5230 ' + MaxOutCount + ' \u6B21, \u505C\u6B62DOM\u53D8\u5316\u76D1\u542C');
                  _this5.mutaObserverStop();
                }
              }
            }
          } catch (e) {
            Util.reportSysWarn(e);
          }

          // 支持自定义响应用户交互后停止DOM变化监听
          if (document && document.querySelectorAll) {
            addedNodes.forEach(function (node) {
              _this5.addEventToStopObserver(node);
            });
          }
        });
      }, 0);
    }
    /**
     * 关闭MutationObserver, 并开始进行计算
     *
     * @memberof FirstScreenManager
     */
  }, {
    key: 'mutaObserverStop',
    value: function mutaObserverStop() {
      if (this.observer && this.observer.disconnect) {
        try {
          this.observer.disconnect();
          this.observer = null;
          var config = this.cfgManager.get(NAME);
          markMeasure(config.sensoryIndex || config.manualReportFST);
          this.resetTimer(false);
        } catch (e) {
          console.log('observer disconnect err');
        }
      }
    }
  }, {
    key: 'perfObserverStop',
    value: function perfObserverStop() {
      try {
        if (this.perfObserver && this.perfObserver.disconnect) {
          this.perfObserver.disconnect();
          this.perfObserver = null;
        }
        perfDone = true;
      } catch (e) {
        console.log('perfObserver disconnect err');
      }
    }
    // 支持业务自定义响应用户交互以停止DOM变化监听
  }, {
    key: 'addEventToStopObserver',
    value: function addEventToStopObserver(node) {
      var _this6 = this;
      ArraySlice.call(node.querySelectorAll('[interactive]'), 0).forEach(function (eventNode) {
        var type = eventNode.getAttribute('interactive') || 'click';
        var callback = function callback() {
          _this6.mutaObserverStop();
          eventNode.removeEventListener(type, callback);
        };
        eventNode.addEventListener(type, callback);
      });
    }
    // 全局响应用户交互以停止DOM变化监听
  }, {
    key: 'interactToStopObserver',
    value: function interactToStopObserver() {
      var _this7 = this;
      if (domDone) return;
      var callback = function callback() {
        if (domDone) {
          removeListener();
          return;
        }
        Logger.logScreen('onload后响应到用户交互事件, 停止DOM变化监听');
        _this7.mutaObserverStop();
        removeListener();
      };
      var removeListener = function removeListener() {
        document.removeEventListener('click', callback);
        document.removeEventListener('wheel', callback);
        document.removeEventListener('touchmove', callback);
      };
      document.addEventListener('click', callback);
      document.addEventListener('wheel', callback);
      document.addEventListener('touchmove', callback);
    }
  }, {
    key: 'startRouteMutaObserver',
    value: function startRouteMutaObserver(path) {
      var _this8 = this;
      if (!domDone || !this.canStartObserver || !document.body) return;

      // 初始化路由页面的首屏计算信息
      var start = performance.now();
      var routeInfo = {
        start: start,
        pageUrl: '',
        observer: null,
        mutaRecords: [],
        domTimer: null,
        domDone: false,
        outCount: 0,
        fst: 0,
        interactCallback: null
      };
      this.spaRoutesData[path] = routeInfo;
      Logger.logScreen('[' + path + '] ' + start + ' \u65F6\u523B\u5F00\u59CB\u9996\u5C4F\u8BA1\u7B97');
      try {
        routeInfo.observer = new MutationObserver(function (mutations) {
          _this8.routeMutaCallback(path, mutations);
        });
        routeInfo.observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        this.resetRouteTimer(path, true);
        setTimeout(function () {
          _this8.interactToStopRouteObserver(path);
        }, 0);
      } catch (e) {}
    }
  }, {
    key: 'stopRouteMutaObserver',
    value: function stopRouteMutaObserver(prevPath) {
      var routeInfo = this.spaRoutesData[prevPath];
      if (routeInfo && !routeInfo.domDone) {
        // 上一页面尚未停止 DOM 变化的监听
        routeInfo.domDone = true;
        this.removeRouteInteractListener(prevPath);
        this.resetRouteTimer(prevPath, false);
        routeInfo.observer.disconnect();
        routeInfo.observer = null;
      }
    }
  }, {
    key: 'resetRouteTimer',
    value: function resetRouteTimer(path, newTimer) {
      var _this9 = this;
      var routeInfo = this.spaRoutesData[path];
      if (routeInfo) {
        routeInfo.domTimer && clearTimeout(routeInfo.domTimer);
        if (newTimer) {
          routeInfo.domTimer = setTimeout(function () {
            Logger.logScreen('[' + path + '] ' + _this9.mutaStopTime + 'ms\u5185\u65E0\u65B0\u7684DOM\u53D8\u5316, \u505C\u6B62\u76D1\u542C');
            _this9.routeMutaStop(path);
          }, this.mutaStopTime);
        } else {
          routeInfo.domTimer = null;
        }
      }
    }
  }, {
    key: 'routeMutaCallback',
    value: function routeMutaCallback(path, mutations) {
      var _this10 = this;
      var routeInfo = this.spaRoutesData[path];
      if (!routeInfo || routeInfo.domDone) return;
      var startTime = performance.now();
      this.resetRouteTimer(path, true);
      Logger.logScreen('[' + path + '] DOM\u53D8\u5316\u539F\u59CB\u5185\u5BB9: ', startTime, mutations);
      mutations.filter(function (mutation) {
        var targetNodeName = (mutation.target.nodeName || '').toUpperCase();
        return mutation.type === 'childList' && targetNodeName && NodesFilter.indexOf(targetNodeName) < 0 && mutation.addedNodes && mutation.addedNodes.length;
      }).forEach(function (mutation) {
        if (!routeInfo || routeInfo.domDone) return;
        var addedNodes = ArraySlice.call(mutation.addedNodes, 0).filter(function (node) {
          var nodeName = (node.nodeName || '').toUpperCase();
          return node.nodeType === 1 && nodeName && NodesFilter.indexOf(nodeName) < 0 && nodeName != 'IFRAME' && node.isConnected !== false && !shouldIgnoreNode(node, _this10.ignoreDom);
        });
        if (!(addedNodes && addedNodes.length && addedNodes[0])) return;
        routeInfo.mutaRecords.push({
          nodes: addedNodes,
          startTime: startTime
        });
        try {
          var rect = addedNodes[0].getBoundingClientRect();
          if (rect && rect.width && rect.height && rect.top >= windowHeight) {
            Logger.logScreen('[' + path + '] \u68C0\u6D4B\u5230\u9996\u5C4F\u5916mutation ' + ++routeInfo.outCount + '\u6B21: ', addedNodes);
            if (routeInfo.outCount >= MaxOutCount) {
              Logger.logScreen('[' + path + '] \u68C0\u6D4B\u5230\u9996\u5C4F\u5916mutation\u8FBE\u5230 ' + MaxOutCount + '\u6B21, \u505C\u6B62\u76D1\u542C');
              _this10.routeMutaStop(path);
            }
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'routeMutaStop',
    value: function routeMutaStop(path) {
      try {
        var routeInfo = this.spaRoutesData[path];
        if (!routeInfo || routeInfo.domDone) return;
        routeInfo.domDone = true;
        routeInfo.observer && routeInfo.observer.disconnect();
        routeInfo.observer = null;
        this.removeRouteInteractListener(path);
        this.resetRouteTimer(path, false);
        var validRecords = [];
        Logger.logScreen('[' + path + '] \u7B5B\u9009\u540E\u7684\u6709\u6548DOM\u53D8\u5316: ', routeInfo.mutaRecords);
        routeInfo.mutaRecords.forEach(function (_ref) {
          var nodes = _ref.nodes,
            startTime = _ref.startTime;
          var validNodes = [];
          nodes.forEach(function (node) {
            var _ref2 = node.style || {},
              visibility = _ref2.visibility,
              display = _ref2.display;
            if (visibility != 'hidden' && display != 'none') {
              var rect = node.getBoundingClientRect && node.getBoundingClientRect();
              if (inViewPort(rect)) {
                validNodes.push({
                  node: node,
                  rect: rect
                });
              }
            }
          });
          if (validNodes.length) {
            var score = calScore(validNodes);
            if (score) {
              validRecords.push({
                score: score,
                startTime: startTime,
                validNodes: validNodes
              });
              Logger.logScreen('[' + path + '] \u6709\u6548\u7684\u9996\u5C4F\u65B0\u589E\u8282\u70B9, \u6743\u91CD\u53CA\u65F6\u523B: ', validNodes, score, startTime);
            }
          }
        });
        routeInfo.mutaRecords = [];
        var routeFstEnd = getFST(validRecords, path);
        var result = parseInt(routeFstEnd - routeInfo.start);
        Logger.logScreen('[' + path + '] DOM\u9996\u5C4F\u65F6\u95F4\u7684\u8BA1\u7B97\u7ED3\u679C\u4E3A: ' + result);
        if (result > 0) {
          routeInfo.fst = result;
          routeInfo.pageUrl = this.cfgManager.get('pageUrl');
          this.pageManager.reportRouteFst(result, routeInfo.pageUrl);
        }
      } catch (e) {}
    }
  }, {
    key: 'removeRouteInteractListener',
    value: function removeRouteInteractListener(path) {
      var routeInfo = this.spaRoutesData[path];
      if (!routeInfo || !routeInfo.interactCallback) return;
      document.removeEventListener('click', routeInfo.interactCallback);
      document.removeEventListener('wheel', routeInfo.interactCallback);
      document.removeEventListener('touchmove', routeInfo.interactCallback);
    }
  }, {
    key: 'interactToStopRouteObserver',
    value: function interactToStopRouteObserver(path) {
      var _this11 = this;
      var routeInfo = this.spaRoutesData[path];
      if (!routeInfo || routeInfo.domDone) return;
      routeInfo.interactCallback = function () {
        Logger.logScreen('[' + path + '] \u54CD\u5E94\u5230\u7528\u6237\u4EA4\u4E92\u4E8B\u4EF6, \u505C\u6B62\u76D1\u542C');
        _this11.routeMutaStop(path);
      };
      document.addEventListener('click', routeInfo.interactCallback);
      document.addEventListener('wheel', routeInfo.interactCallback);
      document.addEventListener('touchmove', routeInfo.interactCallback);
    }
  }]);
  return FirstScreenManager;
}();

// 视口viewport尺寸计算

function getViewportSize() {
  return {
    height: window.innerHeight || 0,
    width: window.innerWidth || 0
  };
}

// 使用HTML标签属性自定义忽略一些元素
function shouldIgnoreNode(node, ignoreDom) {
  var ignore = false;
  if (ignoreDom) {
    ignore = !!(node.closest && node.closest('[' + ignoreDom + ']')) || node.hasAttribute && node.hasAttribute(ignoreDom);
  }
  if (ignore) {
    Logger.logScreen('自定义忽略元素: ', node);
  }
  return ignore;
}

// 模拟计算首次内容绘制时间
function calcuFCP(node, time) {
  // 浏览器支持Paint Timing时模拟时间置为0
  if (performance && performance.getEntriesByType && performance.getEntriesByType('paint') && document && document.body && document.body.innerText !== '') {
    FCP = 0;
  } else if (node && (node.nodeType === 3 || node.innerText !== '') || document.querySelector && document.querySelector('img')) {
    FCP = parseInt(time || 0);
  }
}
function markMeasure(fstFlag) {
  if (domDone) return;
  calcuFST(fstFlag);
}
function calcuFST(flag) {
  var validRecords = [];
  if (flag) {
    Logger.logScreen('\u7B5B\u9009\u540E\u7684\u6709\u6548DOM\u53D8\u66F4:', mutaRecords);
    mutaRecords.forEach(function (_ref3) {
      var nodes = _ref3.nodes,
        startTime = _ref3.startTime;
      var validNodes = [];
      nodes.forEach(function (node) {
        // 筛选首屏内可见节点
        var _ref4 = node.style || {},
          visibility = _ref4.visibility,
          display = _ref4.display;
        if (visibility !== 'hidden' && display !== 'none') {
          var rect = node.getBoundingClientRect && node.getBoundingClientRect(); // [text]元素无此方法
          if (inViewPort(rect)) {
            validNodes.push({
              node: node,
              rect: rect
            });
          }
        }
      });
      if (validNodes.length) {
        var score = calScore(validNodes);
        if (score) {
          validRecords.push({
            score: score,
            startTime: startTime,
            validNodes: validNodes
          });
          Logger.logScreen('\u6709\u6548\u7684\u9996\u5C4F\u5185\u65B0\u589E\u8282\u70B9:', validNodes, '\u65B0\u589E\u8282\u70B9\u7684\u6743\u91CD\u548C\u53D1\u751F\u65F6\u95F4:', score, startTime);
        }
      }
    });
  }
  domDone = true;
  mutaRecords = [];
  var FST = getFST(validRecords);
  senseTime = {
    FST: FST,
    FCP: FCP || 0
  };
  Logger.logScreen('最终DOM首屏时间的计算结果为: ', FST);
}

// 判断节点是否在视口范围内
function inViewPort(rect) {
  var _ref5 = rect || {},
    width = _ref5.width,
    height = _ref5.height,
    top = _ref5.top,
    right = _ref5.right,
    bottom = _ref5.bottom,
    left = _ref5.left;
  // 节点在视口外的条件: 节点和视口无重合区域

  return width > 0 && height > 0 && bottom > 0 && top < windowHeight && right > 0 && left < windowWidth;
}

// 计算新增节点的权重和
function calScore(wrapedNodes) {
  return wrapedNodes.reduce(function (score, it) {
    return score + depScore(it, 0);
  }, 0);
}

// 遍历子节点计算权重 (深度优先)
function depScore(wrapedNode, dep) {
  // 优先使用缓存数据
  var node = wrapedNode.node,
    rect = wrapedNode.rect;
  var _ref6 = node.style || {},
    visibility = _ref6.visibility,
    display = _ref6.display;

  // 1.隐藏元素直接返回

  if (visibility === 'hidden' || display === 'none') return 0;

  // 2.文本元素: 首字符非回车换行 (浏览器注入较多空白文本元素)
  if (node.nodeType === 3) {
    if (node.textContent) {
      var firstChar = node.textContent.charCodeAt(0);
      if (firstChar !== 10 && firstChar !== 13) {
        return dep + ELEMENT_WEIGHT;
      }
    }
    return 0;
  }

  // 3.遍历子元素: 若子元素均不可见则退化为叶节点
  if (node.childNodes && node.childNodes.length) {
    var subScore = ArraySlice.call(node.childNodes, 0).reduce(function (score, node) {
      return score + depScore({
        node: node
      }, dep + DEP_WEIGHT);
    }, 0);
    if (subScore > 0) return subScore + ELEMENT_WEIGHT;
  }

  // 4.叶节点

  var _ref7 = rect || {
      width: node.clientWidth,
      height: node.clientHeight
    },
    width = _ref7.width,
    height = _ref7.height;
  return width > 0 && height > 0 ? dep + ELEMENT_WEIGHT : 0;
}

// 选取权重大于阈值的最后一次变更
function getFST(records, routePath) {
  if (!(records && records.length)) return 0;

  // 合并同时或紧邻的两次记录 (startTime差小于1)
  var batchRecords = records.reduce(function (tempArr, current) {
    var prev = tempArr[tempArr.length - 1];
    if (prev && current.startTime - prev.startTime < 1) {
      prev.score += current.score;
    } else {
      tempArr.push({
        score: current.score,
        startTime: current.startTime,
        nodes: current.validNodes
      });
    }
    return tempArr;
  }, []);
  Logger.logScreen('合并后的首屏新增节点权重记录:', batchRecords);

  // 选择最后一次有效的首屏内DOM变更记录 (最后一次新增节点权重大于阈值3的变更)
  var bestMatch = batchRecords.reduce(function (prev, current) {
    return !prev || current.score > Math.min(prev.score, MinScore) ? current : prev;
  }, null);
  var result = parseInt(bestMatch && bestMatch.startTime || 0);
  if (!routePath && window.Owl && bestMatch) {
    window.Owl.fstInfo = {
      domFST: result,
      decisiveNode: bestMatch.nodes && bestMatch.nodes[0] ? bestMatch.nodes[0].node : ''
    };
  }
  return result;
}
function caculateImageTiming(ignoreTag, imgPattern) {
  var inScreenImgTimes = ImgUtils.getImageTimingsInFirstScreen(ignoreTag, imgPattern, scrollDom);
  if (senseTime && inScreenImgTimes.length) {
    var imageFST = Math.round(inScreenImgTimes[0]);
    senseTime.FST = Math.max(senseTime.FST, imageFST);
    Logger.logScreen('首屏图片时间: ', imageFST);
    Logger.logScreen('最终首屏时间: ', senseTime.FST);
    if (window.Owl && window.Owl.fstInfo) {
      window.Owl.fstInfo.imgFST = imageFST;
    }
  }
}
module.exports = FirstScreenManager;

/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Logger = __webpack_require__(13);
function isBase64Img(src) {
  return src && src.slice(0, 10) === 'data:image';
}
function formatImageUrl(src) {
  var link = document.createElement('a');
  link.href = src;
  return link.href;
}

/**
 * extract img src from background prop
 * @param {*} src
 */
function getImgSrcFromBackground(src, imgPattern) {
  var imgSrc = void 0;
  var matches = src.match(/url\(.*?\)/g);
  if (matches && matches.length) {
    // use the last one
    var urlStr = matches[matches.length - 1];
    var innerUrl = urlStr.replace(/^url\([\'\"]?/, '').replace(/[\'\"]?\)$/, '');
    // only url has .[img] extensions, but not base64
    if (imgPattern.test(innerUrl) && !isBase64Img(innerUrl)) {
      imgSrc = innerUrl;
    }
  }
  return imgSrc;
}

/**
 * filter both img and node with background-image prop setted
 * @param {*} node
 */
function getImgSourceFromDom(node, imgPattern) {
  if (node.nodeName.toUpperCase() === 'IMG') {
    // also include img with data-srcset attribute
    return node.getAttribute('data-srcset') || node.getAttribute('src');
  } else {
    var computedStyle = window.getComputedStyle(node);
    var backgroundProp = computedStyle.getPropertyValue('background-image') || computedStyle.getPropertyValue('background');
    return getImgSrcFromBackground(backgroundProp, imgPattern);
  }
}

/**
 * using NodeIterator to filter all dom element, including elements with background-image setted.
 * but node with @ignoreTag attribute specified will be ignored
 * @param {*} ignoreTag
 */
function getDomImgs(ignoreTag, imgPattern, scrollDom) {
  var domImages = [];
  try {
    var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, function (node) {
      if (node && node.getAttribute && !node.hasAttribute('' + ignoreTag)) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);
    var currentNode = iterator.nextNode();
    while (currentNode) {
      var imgSrc = getImgSourceFromDom(currentNode, imgPattern);
      if (!imgSrc) {
        currentNode = iterator.nextNode();
        continue;
      }
      if (isInFirstScreen(currentNode, scrollDom) && !isBase64Img(imgSrc)) {
        domImages.push(formatImageUrl(imgSrc));
      }
      currentNode = iterator.nextNode();
    }
  } catch (e) {
    console.log('getDomImgs err');
  }
  return domImages;
}

/**
 * judge whether a node is in first screen area (top: 0, left: 0, width: 100vw, height: 100vh)
 * @param {*} currentNode
 */
function isInFirstScreen(currentNode, scrollDom) {
  if (!currentNode) {
    return false;
  }
  var _currentNode$getBound = currentNode.getBoundingClientRect(),
    top = _currentNode$getBound.top,
    left = _currentNode$getBound.left,
    right = _currentNode$getBound.right,
    bottom = _currentNode$getBound.bottom;
  // display:none element

  if (!top && !bottom) {
    return false;
  }

  // 如果在结构上的首屏内（上下、左右）
  // 当整体页面有绝对定位时，则选实际滚动的DOM作为标准，window的滚动已经失效
  var scrollTop = void 0;
  if (scrollDom) {
    scrollTop = document.getElementById(scrollDom).scrollTop;
  } else {
    scrollTop = window.scrollY || window.pageYOffset;
  }
  if (scrollTop + top < window.innerHeight && right > 0 && left < window.innerWidth) {
    return true;
  }
  return false;
}

/**
 * filter img timing resource that only in first screen, excluding ignored element
 * @param {*} ignoreTag
 */
function getImageTimingsInFirstScreen(ignoreTag, imgPattern, scrollDom) {
  // only when performance supported
  if (!window.performance || !window.performance.getEntriesByType) {
    return [];
  }
  var result = [];
  try {
    // retrieve img resource timing
    var imageResources = window.performance.getEntriesByType('resource')
    // filter img and background image timing resource
    .filter(function (s) {
      return s.initiatorType === 'img' || s.initiatorType === 'css';
    }).map(function (s) {
      return {
        name: s.name.split(':')[1] || s.name,
        // escape protocol
        responseEnd: s.responseEnd,
        connectEnd: s.connectEnd,
        duration: s.duration
      };
    });
    // filter first screen img resource
    var domImages = getDomImgs(ignoreTag, imgPattern, scrollDom).join('###');
    // filter first screen img timing, in descend order
    result = imageResources.filter(function (img) {
      return domImages.indexOf(img.name) !== -1;
    }).map(function (s) {
      var time = s.responseEnd || s.connectEnd + s.duration;
      return {
        name: s.name,
        time: time
      };
    }).sort(function (s1, s2) {
      return s2.time - s1.time;
    });
    Logger.logScreen('首屏内图片的加载时间', result);
    return result.map(function (img) {
      return img.time;
    });
  } catch (err) {
    result = [];
  }
  return result;
}
module.exports = {
  getImageTimingsInFirstScreen: getImageTimingsInFirstScreen,
  isInFirstScreen: isInFirstScreen
};

/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Ajax = __webpack_require__(19);
var RM = __webpack_require__(41);
var Category = __webpack_require__(29);
var _require = __webpack_require__(37),
  jsPattern = _require.jsPattern,
  cssPattern = _require.cssPattern,
  imgPattern = _require.imgPattern;
var Util = __webpack_require__(20);
var Event = __webpack_require__(21);
var Logger = __webpack_require__(13);
var Logan = __webpack_require__(33);
var protocol = __webpack_require__(17);
var canIUse = __webpack_require__(36);
var CACHE_SEND_TRIGGER = 10;
var parseInt = Number.parseInt || window.parseInt;
var NAME = 'resource';
var getImageDomain = function getImageDomain(url) {
  var arr = url.split('//');
  if (arr && arr.length > 1) {
    return arr[0] + '//' + arr[1].split('/')[0] + '/images';
  }
};
var ResManager = function () {
  function ResManager(cfgManager, errManager) {
    _classCallCheck(this, ResManager);
    this.cfgManager = cfgManager;
    this.errManager = errManager;
    this.cache = [];
    this.entryCache = [];
    this.comboTimeout = 0;
    this.isSupportGetEntries = canIUse.GetEntries();
  }
  // parse xhr info

  _createClass(ResManager, [{
    key: 'parseAjax',
    value: function parseAjax(event) {
      try {
        if (!event || !event.currentTarget || isNaN(event.duration)) return;
        var state = event.type;
        var duration = event.duration;
        var byte = event.total;
        var currTarget = event.currentTarget;
        var statusCode = currTarget.status;
        var url = Util.getFullUrl(currTarget.responseURL || currTarget.url);
        if (!this.checkUrlValid(url)) return;
        if (this.checkMTSIForbid(currTarget)) return;
        var cfgManager = this.cfgManager;
        var resReg = cfgManager.get('resourceReg');
        var isUrlValid = cfgManager.get('devMode') || resReg instanceof RegExp && resReg.test(url);
        var ajaxConfig = cfgManager.get('ajax');
        var config = cfgManager.get(NAME);
        var responsetime = duration.toString();
        var traceid = currTarget.traceid || '';
        var logInfo = {
          project: cfgManager.get('project'),
          url: url,
          method: currTarget.method || '',
          duration: responsetime,
          traceid: traceid,
          timestamp: +new Date()
        };
        if (isUrlValid) {
          if (!ajaxConfig.flag || duration < ajaxConfig.duration) {
            var isSuccess = void 0;
            var httpCode = void 0;
            var businessCode = void 0;
            var content = '';
            if (config.enableStatusCheck) {
              httpCode = statusCode || (state === 'load' ? 200 : 500);
              isSuccess = (state === 'load' || state === 'readystatechange') && (httpCode >= 200 && httpCode < 300 || httpCode === 304);
              if (!isSuccess) {
                content = state === 'load' ? '' : 'from: xhr ' + state + '.';
                content += currTarget.statusText ? httpCode + ' ' + currTarget.statusText : '';
              }
            } else {
              isSuccess = state === 'load' || state === 'readystatechange' && statusCode === 200;
              httpCode = isSuccess ? 200 : 500;
              content = isSuccess ? '' : 'from: xhr ' + state;
            }
            if (isSuccess && ajaxConfig.autoBusinessCode && typeof currTarget.getResponseHeader === 'function' && typeof ajaxConfig.parseResponse === 'function') {
              try {
                var contentType = currTarget.getResponseHeader('Content-Type');
                if (!contentType || !/(text)|(json)/.test(contentType)) return;
                var responseType = currTarget.responseType;
                var response = void 0;
                if (!responseType || responseType === 'text') {
                  response = currTarget.responseText;
                } else if (responseType === 'json') {
                  response = currTarget.response;
                }
                try {
                  response = response && typeof response == 'string' ? JSON.parse(response) : response;
                } catch (e) {}
                var result = ajaxConfig.parseResponse(response);
                businessCode = result.code;
              } catch (e) {
                Util.reportSysError(e);
              }
            }
            this.pushApi({
              type: 'ajax',
              resourceUrl: url,
              connectType: this.getConnectTypeByUrl(url),
              responsetime: responsetime,
              responsebyte: byte && byte.toString() ? byte.toString() : '0',
              statusCode: httpCode + '|' + (typeof businessCode === 'undefined' ? '' : businessCode),
              firstCategory: isSuccess ? '' : Category.AJAX,
              logContent: content,
              traceid: traceid
            });
            logInfo.code = httpCode;
            var logLevel = 'info';
            var logTag = 'ajax';
            if (!isSuccess) {
              logInfo.error = {
                type: 'default',
                content: content
              };
              logLevel = 'error';
              logTag = 'ajaxError';
            }
            Logan._log('[Ajax]:' + JSON.stringify(logInfo), 'owl', logLevel, [logTag]);
          } else if (Math.random() < config.sampleApi) {
            var msg = 'ajax\u8BF7\u6C42\u65F6\u95F4\u8D85\u8FC7\u8BBE\u5B9A ' + url;
            this.errManager.push({
              name: 'TIMEOUT_AJAX',
              msg: msg
            }, {
              category: Category.AJAX
            });
            logInfo.error = {
              type: 'timeout',
              content: msg
            };
            Logan._log('[Ajax]:' + JSON.stringify(logInfo), 'owl', 'error', ['ajaxError']);
          }
        } else if (cfgManager.get('invalid').ajax && ajaxConfig.invalid && Math.random() < config.sample) {
          this.errManager.push({
            name: 'INVALID_AJAX',
            msg: url
          }, {
            category: Category.AJAX
          });
          logInfo.error = {
            type: 'invalidUrl',
            content: url
          };
          Logan._log('[Ajax]:' + JSON.stringify(logInfo), 'owl', 'error', ['ajaxError']);
        }
      } catch (e) {
        Util.reportSysError(e);
      }
    }
    // parse fetch info
  }, {
    key: 'parseFetch',
    value: function parseFetch(info) {
      try {
        var url = info.url,
          duration = info.duration,
          isSuccess = info.isSuccess;
        if (!url || isNaN(duration) || isSuccess === undefined) return;
        url = Util.getFullUrl(url);
        if (!this.checkUrlValid(url)) return;
        var cfgManager = this.cfgManager;
        var ajaxConfig = cfgManager.get('ajax');
        var resReg = cfgManager.get('resourceReg');
        if (!(cfgManager.get('devMode') || resReg instanceof RegExp && resReg.test(url))) return;
        if (cfgManager.get(NAME).ignoreMTSIForbidRequest && info.xForbidReason && info.statusCode === 403) return;
        Logan.log('[Fetch]:' + JSON.stringify(info), 'owl', 'error', ['ajaxError']);
        var statusCode = void 0;
        var firstCategory = void 0;
        var logContent = void 0;
        var businessCode = void 0;
        var response = info.response;
        if (isSuccess) {
          var ok = info.ok ? true : false;
          var defaultCode = ok ? 200 : 404;
          statusCode = info.statusCode || defaultCode;
          firstCategory = ok ? '' : Category.AJAX;
          logContent = ok ? '' : statusCode + ' ' + (info.statusText || '');
          if (ajaxConfig.autoBusinessCode) {
            try {
              response = response && typeof response == 'string' ? JSON.parse(response) : response;
              var result = ajaxConfig.parseResponse(response);
              businessCode = result.code;
            } catch (e) {}
          }
        } else {
          statusCode = '500';
          firstCategory = Category.AJAX;
          logContent = info.errMsg || info.errName || '';
        }
        this.pushApi({
          type: 'fetch',
          resourceUrl: url,
          connectType: this.getConnectTypeByUrl(url),
          responsetime: duration.toString() || '0',
          responsebyte: '0',
          statusCode: statusCode + '|' + (typeof businessCode === 'undefined' ? '' : businessCode),
          firstCategory: firstCategory,
          logContent: logContent,
          traceid: info.traceid
        });
      } catch (e) {
        Util.reportSysError(e);
      }
    }
  }, {
    key: 'checkUrlValid',
    value: function checkUrlValid(url) {
      try {
        var ignoreList = this.cfgManager.get('ignoreList').ajax || [];
        for (var i = 0; i < ignoreList.length; i++) {
          var urlReg = new RegExp(ignoreList[i]);
          if (urlReg.test(url)) return false;
        }
      } catch (e) {
        Util.reportSysError(e);
        return false;
      }
      return true;
    }
    // 过滤 MTSI 反爬拦截的请求
  }, {
    key: 'checkMTSIForbid',
    value: function checkMTSIForbid(target) {
      if (!target || !this.cfgManager.get(NAME).ignoreMTSIForbidRequest) return false;
      try {
        if (target.status === 403 && typeof target.getAllResponseHeaders === 'function') {
          var headers = target.getAllResponseHeaders();
          if (headers && headers.indexOf('x-forbid-reason') > -1) {
            return true;
          }
        }
      } catch (e) {
        Util.reportSysError(e);
      }
      return false;
    }
  }, {
    key: 'parseType',
    value: function parseType(type) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (!(type && url)) return '';
      // type: script link img css
      if (type === 'img' || url.match(imgPattern)) {
        type = 'image';
      } else if (type === 'script' || type === 'link' && url.match(jsPattern)) {
        type = 'js';
      } else if (type === 'css' || type === 'link' && url.match(cssPattern)) {
        type = 'css';
      }
      return type;
    }
  }, {
    key: 'filterResource',
    value: function filterResource(url) {
      try {
        var filters = this.cfgManager.get('ignoreList').resource;
        for (var i = 0; i < filters.length; i++) {
          var tempReg = new RegExp(filters[i]);
          if (tempReg.test(url)) return false;
        }
        return true;
      } catch (e) {
        Util.reportSysError(e);
        return false;
      }
    }
    // 解析性能条目的列表数据
  }, {
    key: 'parsePerformanceEntries',
    value: function parsePerformanceEntries(entries) {
      entries = this.filterEntries(entries);
      if (!(entries && entries.length)) return;
      var cfgManager = this.cfgManager;
      var devMode = cfgManager.get('devMode');
      var resReg = cfgManager.get('resourceReg');
      var imgConfig = cfgManager.get('image');
      var entryCache = this.entryCache;
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var url = entry.name;
        var urlValid = this.filterResource(url);
        if (!(urlValid && (devMode || resReg instanceof RegExp && resReg.test(url)))) continue;
        entryCache.push(url);
        var hasError = false;
        var type = this.parseType(entry.initiatorType, url);
        var isImg = type === 'image';
        var duration = parseInt(entry.duration || 0) || 0;
        if (imgConfig.flag && isImg) {
          var filter = imgConfig.filter;
          if (!filter || typeof filter === 'function' && !filter(url)) {
            var sec_category = void 0;
            var size = entry.transferSize;
            if (size && size > imgConfig.fileSize * 1000) {
              sec_category = 'IMAGE_SIZE_EXCEED';
            } else if (duration && duration > imgConfig.duration) {
              sec_category = 'IMAGE_DURATION_EXCEED';
            }
            if (sec_category) {
              hasError = true;
              this.errManager._pushResource({
                category: Category.RESOURCE,
                sec_category: sec_category,
                content: url
              });
            }
          }
        }
        if (!hasError) {
          this.push({
            type: type,
            connectType: this.getConnectTypeByUrl(url),
            resourceUrl: isImg ? getImageDomain(url) : url,
            responsetime: duration.toString() || '0',
            responsebyte: entry.transferSize && entry.transferSize.toString() || '0',
            statusCode: '200|',
            logContent: isImg ? url : ''
          });
        }
      }
      this.triggerReport();
    }
  }, {
    key: 'filterEntries',
    value: function filterEntries(entries) {
      // 筛选静态资源类型
      var ret = [];
      var validList = ['link', 'script', 'img', 'css'];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (validList.indexOf(entry.initiatorType) > -1) {
          ret.push(entry);
        }
      }
      return ret;
    }
    // 资源加载的动态监测
  }, {
    key: 'observeResourceTiming',
    value: function observeResourceTiming() {
      var _this = this;
      if (this.resTimingObserved) return;
      this.resTimingObserved = true;
      var disableObserver = this.cfgManager.get(NAME).disablePerformanceObserver || false;
      if (!disableObserver && canIUse.PerformanceObserver()) {
        var observer = new window.PerformanceObserver(function (list) {
          try {
            var entries = list.getEntries();
            _this.parsePerformanceEntries(entries);
          } catch (e) {
            Util.reportSysError(e);
          }
        });
        observer.observe({
          entryTypes: ['resource']
        });
      } else {
        // 通过响应 ajax 请求实现动态监测
        Event.on('ajaxCall', function () {
          setTimeout(function () {
            var entryCache = _this.entryCache;
            var nextEntries = window.performance.getEntries();
            if (nextEntries.length === entryCache.length) {
              return;
            } else if (nextEntries.length > entryCache.length) {
              var diffEntries = [];
              for (var i = 0; i < nextEntries.length; i++) {
                if (entryCache.indexOf(nextEntries[i].name) === -1) {
                  diffEntries.push(nextEntries[i]);
                }
              }
              entryCache = nextEntries;
              _this.parsePerformanceEntries(diffEntries);
            }
          }, 1500);
        });
      }
    }
  }, {
    key: 'handleResourceTiming',
    value: function handleResourceTiming() {
      try {
        if (this.isSupportGetEntries) {
          var entries = window.performance.getEntries();
          this.parsePerformanceEntries(entries);
          this.observeResourceTiming();
        }
      } catch (e) {
        Util.reportSysWarn(e);
      }
    }
  }, {
    key: 'handleResourceLoadError',
    value: function handleResourceLoadError(event) {
      var _this2 = this;
      var target = event.target || event.srcElement;
      var doTask = function doTask() {
        var url = target.src || target.href;
        var href = Util.getHref();
        if (!url || !href || href.indexOf(url) === 0) return; // 过滤图片懒加载触发的error (url等于前部分href)

        var sec_category = (target.nodeName || '').toLowerCase();
        if (!sec_category) return;
        var urlShort = sec_category === 'img' ? getImageDomain(url) : url;
        if (!urlShort) return;
        var urlValid = _this2.filterResource(urlShort);
        if (!urlValid) return;
        if (jsPattern.test(url)) {
          Logan._log('[Error]:' + JSON.stringify({
            type: 'js',
            url: url
          }), 'owl', 'error', ['resourceError']);
        }
        var xpath = Util.getXPath(target);
        var content = url + (xpath ? '\n' + xpath : '');
        if (_this2.isSupportGetEntries) {
          _this2.pushApi({
            type: _this2.parseType(sec_category, url),
            resourceUrl: urlShort,
            connectType: _this2.getConnectTypeByUrl(urlShort),
            responsetime: '0',
            statusCode: '500|',
            firstCategory: Category.RESOURCE,
            secondCategory: sec_category,
            logContent: content
          });
        } else {
          _this2.errManager._pushResource({
            category: Category.RESOURCE,
            sec_category: sec_category,
            content: content
          });
        }
      };
      try {
        if (target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement) {
          doTask();
        }
      } catch (e) {
        Util.reportSysError(e);
      }
    }
  }, {
    key: '_stringify',
    value: function _stringify() {
      var cache = this.cache;
      if (!(cache && cache.length)) return;
      var ext = this.cfgManager.getExtension();
      var ret = {
        region: '',
        operator: '',
        network: '',
        container: '',
        os: '',
        unionId: ''
      };
      for (var key in ret) {
        if (ret.hasOwnProperty(key)) {
          ret[key] = ext[key] || '';
        }
      }
      var infos = [];
      for (var i = 0; i < cache.length; i++) {
        infos.push(cache[i]);
      }
      ret['infos'] = infos;
      return ret;
    }
  }, {
    key: 'doBatchPush',
    value: function doBatchPush(data) {
      data = this.parse(data);
      var instance = new RM(data);
      var shouldPush = true;
      var onBatchPush = this.cfgManager.get('onBatchPush');
      if (typeof onBatchPush === 'function') {
        try {
          shouldPush = onBatchPush(instance);
        } catch (e) {
          Logger.ignore(e);
        }
      }
      if (!shouldPush) return;
      this.cache.push(instance);
    }
  }, {
    key: 'push',
    value: function push(resource) {
      if (Math.random() > this.cfgManager.get(NAME).sample) return;
      this.doBatchPush(resource);
      if (this.cache.length >= CACHE_SEND_TRIGGER) {
        this.report(true);
      } else {
        this.triggerReport();
      }
    }
  }, {
    key: 'parse',
    value: function parse(res) {
      res.pageUrl = res.pageUrl || this.cfgManager.get('pageUrl');
      res.project = res.project || this.cfgManager.get('project');
      res.realUrl = res.realUrl || location.href;
      return res;
    }
  }, {
    key: 'pushApi',
    value: function pushApi(api) {
      if (Math.random() > this.cfgManager.get(NAME).sampleApi) return;
      this.doBatchPush(api);
      this.triggerReport();
    }
  }, {
    key: 'report',
    value: function report() {
      this.triggerReport(true);
    }
  }, {
    key: 'triggerReport',
    value: function triggerReport(reportNow) {
      var _this3 = this;
      if (!this.cache.length) return;
      var comboReport = function comboReport() {
        clearTimeout(_this3.comboTimeout);
        _this3.comboTimeout = 0;
        _this3.send();
      };
      var delay = this.cfgManager.get(NAME).delay;
      if (reportNow) {
        this.send();
      } else if (!this.comboTimeout && delay !== -1) {
        this.comboTimeout = setTimeout(comboReport, delay);
      }
    }
  }, {
    key: 'send',
    value: function send() {
      var data = this._stringify();
      if (!data) return;
      var apiPath = this.cfgManager.getApiPath(NAME);
      Ajax({
        type: 'POST',
        url: apiPath + ('&pageId=' + this.cfgManager.get('pageId')),
        data: JSON.stringify(data)
      });
      this.cache = [];
    }
  }, {
    key: 'getConnectTypeByUrl',
    value: function getConnectTypeByUrl(url) {
      if (url.indexOf('https') === 0) {
        return 'https';
      } else if (url.indexOf('http') === 0) {
        return 'http';
      }
      return protocol.indexOf('https') === 0 ? 'https' : 'http';
    }
  }]);
  return ResManager;
}();
module.exports = ResManager;

/***/ }),
/* 41 */
/***/ ((module) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var keys = ['resourceUrl', 'connectType', 'type', 'timestamp', 'requestbyte', 'responsebyte', 'responsetime', 'project', 'pageUrl', 'realUrl', 'statusCode', 'firstCategory', 'secondCategory', 'logContent', 'traceid'];
var uploadKeys = keys;

/**
 * 资源信息数据模型
 * 
 * @param {string} project - 资源所在项目
 * @param {string} pageUrl - 资源聚合页面地址
 * @param {string} realUrl - 页面真实地址
 * @param {string} resourceUrl - 资源的名称，通常是url，也可以是其他字符串
 * @param {String} type - 资源类型,包括link,script,img,ajax,api
 * @param {Number} timestamp - 时间戳
 * @param {Number} requestbyte - 资源请求大小
 * @param {Number} responsebyte - 资源响应大小
 * @param {Number} responsetime - 资源响应时间
 * @param {string} statusCode - 资源状态码, 格式为：'网络状态码|业务状态码', 一般有一个状态码即可
 * @param {string} firstCategory - 资源出错时的错误分类
 * @param {string} secondCategory - 资源出错时的子分类
 * @param {string} logContent - 资源出错时的详情
 * @param {string} traceid
 * 
 * @class ResourceModel
 */

var ResourceModel = function () {
  function ResourceModel(data) {
    var _this = this;
    _classCallCheck(this, ResourceModel);
    keys.forEach(function (key) {
      _this[key] = data[key];
    });
    this.parse();
  }
  _createClass(ResourceModel, [{
    key: 'parse',
    value: function parse() {
      this.timestamp = this.timestamp || Date.now().toString();
      this.requestbyte = this.requestbyte || '0';
      this.responsebyte = this.responsebyte || '0';
    }
  }, {
    key: 'update',
    value: function update(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && keys.indexOf(key) > -1) {
          this[key] = obj[key];
        }
      }
    }
  }, {
    key: 'stringify',
    value: function stringify() {
      var _this2 = this;
      var ret = uploadKeys.map(function (key) {
        return _this2[key];
      });
      return ret.join('\t');
    }
  }]);
  return ResourceModel;
}();
module.exports = ResourceModel;

/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var extend = __webpack_require__(12);
var Ajax = __webpack_require__(19);
var Logger = __webpack_require__(13);
var Url = __webpack_require__(14);
var NAME = 'metric';
var MetricManager = function () {
  function MetricManager(cfgManager) {
    _classCallCheck(this, MetricManager);
    this.cfgManager = cfgManager;
    this.tags = {};
    this.kvs = {};
    this.extraData = '';
  }
  /**
   * 设置维度信息
   * 
   * @param {Object} tags - key为维度名称，value为维度数据
   * @memberof MetricManager
   */

  _createClass(MetricManager, [{
    key: 'setTags',
    value: function setTags(tags) {
      this.tags = extend(this.tags, tags);
    }
  }, {
    key: 'getTags',
    value: function getTags(tagName) {
      return tagName ? this.tags[tagName] : this.tags;
    }
    /**
     * 增加metric数据
     * 
     * @param {string} name - metric名称 
     * @param {number} value  - metric值
     * @memberof MetricManager
     */
  }, {
    key: 'setMetric',
    value: function setMetric(name, value) {
      var _this = this;
      if (typeof name !== 'string') {
        return Logger.log('metric名称必须是string类型');
      }
      if (typeof value !== 'number') {
        return Logger.log('metric\u503C\u5FC5\u987B\u662Fnumber\u7C7B\u578B,\u5F53\u524D\u4E3A' + name + '-' + value);
      }
      if (!this.kvs[name]) {
        this.kvs[name] = [];
      }
      this.kvs[name].push(value);
      try {
        if (this.cfgManager.get(NAME).combo) {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.timeout = setTimeout(function () {
            _this.report();
          }, this.cfgManager.get(NAME).delay || 1500);
        }
      } catch (e) {}
    }
  }, {
    key: 'setExtraData',
    value: function setExtraData(msg) {
      this.extraData = msg || '';
    }
  }, {
    key: 'getMetric',
    value: function getMetric(name) {
      return name ? this.kvs[name] : this.kvs;
    }
  }, {
    key: 'clearMetric',
    value: function clearMetric() {
      this.kvs = {};
    }
  }, {
    key: '_rollbackMetric',
    value: function _rollbackMetric(preMetric) {
      if (preMetric) {
        for (var name in preMetric) {
          if (preMetric.hasOwnProperty(name)) {
            this.kvs[name] = preMetric[name].concat(this.kvs[name] || []);
          }
        }
      }
    }
  }, {
    key: 'report',
    value: function report() {
      var _this2 = this;
      if (!this.kvs || Object.keys(this.kvs).length === 0) return;
      var data = {
        kvs: this.kvs,
        tags: this.tags,
        ts: parseInt(+new Date() / 1000),
        extraData: this.extraData
      };
      var preMetric = this.kvs;
      this.clearMetric();
      var cfgManager = this.cfgManager;
      var url = Url.stringify(cfgManager.getApiPath(NAME), {
        p: cfgManager.get('project'),
        pageId: cfgManager.get('pageId'),
        unionId: cfgManager.getExtension('unionId')
      });
      Ajax({
        url: url,
        type: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'data=' + encodeURIComponent(JSON.stringify(data)),
        fail: function fail() {
          _this2._rollbackMetric(preMetric);
        }
      });
    }
  }]);
  return MetricManager;
}();
module.exports = MetricManager;

/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Ajax = __webpack_require__(19);
var Url = __webpack_require__(14);
var NAME = 'pv';
var PvManager = function () {
  function PvManager(cfgManager) {
    _classCallCheck(this, PvManager);
    this.cfgManager = cfgManager;
  }
  _createClass(PvManager, [{
    key: 'report',
    value: function report(opts) {
      opts = opts || {};
      var cfgManager = this.cfgManager;
      var ext = cfgManager.getExtension();
      var url = Url.stringify(cfgManager.getApiPath(NAME), {
        project: opts.project || cfgManager.get('project'),
        pageurl: encodeURIComponent(opts.pageUrl || cfgManager.get('pageUrl')),
        pageId: opts.pageId || cfgManager.get('pageId'),
        timestamp: Date.now(),
        region: ext.region || '',
        operator: ext.operator || '',
        network: ext.network || '',
        container: ext.container || '',
        os: ext.os || '',
        unionid: ext.unionId || ''
      });
      Ajax({
        url: url,
        type: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }
  }]);
  return PvManager;
}();
module.exports = PvManager;

/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Logan = __webpack_require__(33);
var LogManager = function () {
  function LogManager(cfgManager) {
    _classCallCheck(this, LogManager);
    this.cfgManager = cfgManager;
  }
  _createClass(LogManager, [{
    key: 'addLog',
    value: function addLog(log) {
      Logan.log('[Log]: ' + log, {
        noType: true
      });
    }
  }]);
  return LogManager;
}();
module.exports = LogManager;

/***/ }),
/* 45 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Util = __webpack_require__(20);
var getCookie = __webpack_require__(46);
module.exports = {
  getExt: function getExt() {
    var ret = {};
    try {
      var network = getCookie('network');
      if (!network) {
        var ua = Util.getUserAgent();
        var reg = /NetType\/([a-zA-Z0-9]+)/;
        if (ua && reg.test(ua)) {
          network = ua.match(reg)[1];
        }
      }
      network = network || Util.getConnectionType();
      var unionId = getCookie('uuid') || getCookie('unionid') || getCookie('dpid') || getCookie('_lxsdk_cuid');
      if (network) ret.network = network;
      if (unionId) ret.unionId = unionId;
    } catch (e) {}
    return ret;
  }
};

/***/ }),
/* 46 */
/***/ ((module) => {

"use strict";


// 读取cookie值
module.exports = function readCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var filterMap = __webpack_require__(48);
var Util = __webpack_require__(20);
module.exports = function configFilter(cfgManager) {
  if (cfgManager.get('devMode')) return;
  cfgManager.addFilter('base', filterMap['base']);
  var UA = Util.getUserAgent();
  if (/MicroMessenger/.test(UA)) {
    cfgManager.addFilter('weixin', filterMap['weixin']);
  } else if (/dp\/com\.dianping/.test(UA)) {
    cfgManager.addFilter('dianping', filterMap['dianping']);
  }
};

/***/ }),
/* 48 */
/***/ ((module) => {

"use strict";


module.exports = {
  base: function base(model) {
    return !model.resourceUrl || /\.(dpfile|dianping|51ping|meituan|sankuai)\.(com|net)/.test(model.resourceUrl);
  },
  weixin: function weixin(model) {
    return !/(WeixinJSBridge|_WXJS|WebViewJavascriptBridge)/.test(model.sec_category);
  },
  dianping: function dianping(model) {
    return !/document.elementFromPoint/.test(model.sec_category);
  }
};

/***/ }),
/* 49 */
/***/ ((module) => {

"use strict";


// capture and report performance timing information of page loading process
module.exports = function capturePerfTiming(pageManager) {
  var cfgManager = pageManager.cfgManager;
  var catchPage = cfgManager.get('autoCatch').page;
  var pageConfig = cfgManager.get('page');
  if (catchPage && pageConfig.sensoryIndex) {
    pageManager.sensoryObserver();
  } else {
    try {
      // disconnect MutationObserver created in pre-catch module
      if (window._Owl_ && window._Owl_.observer && window._Owl_.observer.disconnect) {
        window._Owl_.observer.disconnect();
      }
    } catch (e) {}
  }
  if (catchPage && !pageManager.getReady()) {
    pageManager.setInitConfig();
    if (document && document.readyState === 'complete') {
      pageManager.parsePageTimeWithDefer();
    } else {
      var ADD_EVENT_FUNC = window.addEventListener || window.attachEvent;
      var loadName = window.addEventListener ? 'load' : 'onload';
      ADD_EVENT_FUNC(loadName, function () {
        pageManager.parsePageTimeWithDefer();
      });
    }
  }
};

/***/ }),
/* 50 */
/***/ ((module) => {

"use strict";


// capture JS errors
module.exports = function (errManager) {
  var captureCfg = errManager.cfgManager.get('autoCatch');
  if (captureCfg.js) {
    // global JS error
    var origin = window.onerror;
    window.onerror = function () {
      errManager.parseWindowError.apply(errManager, arguments);
      origin && origin.apply(window, arguments);
    };

    // unhandled promise rejection
    var ADD_EVENT = window.addEventListener || window.attachEvent;
    ADD_EVENT('unhandledrejection', function () {
      errManager.parsePromiseUnhandled.apply(errManager, arguments);
    });
  }

  // console.error
  if (captureCfg.console && window.console && window.console.error) {
    var consoleError = window.console.error;
    window.console.error = function () {
      errManager.parseConsoleError.apply(errManager, arguments);
      consoleError && consoleError.apply(window.console, arguments);
    };
  }
};

/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Event = __webpack_require__(21);
var interceptAjax = __webpack_require__(52);
var interceptFetch = __webpack_require__(53);

// capture performance and errors of Ajax (xhr & fetch) and static resources
module.exports = function (resManager) {
  var cfgManager = resManager.cfgManager;
  var captureCfg = cfgManager.get('autoCatch');
  var enableLogTrace = cfgManager.get('enableLogTrace') || false;
  var project = cfgManager.get('project');
  var resCfg = cfgManager.get('resource');
  if (captureCfg.ajax) {
    // rewrite and monitor stage change of xhr instance
    interceptAjax(enableLogTrace, project, resCfg.catchAbort, resCfg.catchTimeout);
    Event.on('ajaxCall', function () {
      resManager.parseAjax.apply(resManager, arguments);
    });
  }
  if (captureCfg.fetch) {
    interceptFetch(enableLogTrace, project);
    Event.on('fetchCall', function () {
      resManager.parseFetch.apply(resManager, arguments);
    });
  }
  if (captureCfg.resource) {
    var EVENT_LISTEN_FUNC = window.addEventListener || window.attachEvent;
    var loadName = window.addEventListener ? 'load' : 'onload';
    var errName = window.addEventListener ? 'error' : 'onerror';
    // get all static resources after page load
    if (document && document.readyState === 'complete') {
      resManager.handleResourceTiming.apply(resManager);
    } else {
      EVENT_LISTEN_FUNC(loadName, function () {
        resManager.handleResourceTiming.apply(resManager);
      });
    }

    // capture static resources load error
    EVENT_LISTEN_FUNC(errName, function (event) {
      if (event) {
        resManager.handleResourceLoadError.apply(resManager, arguments);
      }
    }, true);
  }
};

/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Util = __webpack_require__(20);
var Event = __webpack_require__(21);
var xhr = window.XMLHttpRequest;
module.exports = function interceptAjax() {
  var enableLogTrace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var catchAbort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var catchTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!xhr || xhr._owl) return;
  xhr._owl = true;
  if (window.location && window.location.protocol === 'file:') return;
  try {
    var _open = xhr.prototype.open;
    var _send = xhr.prototype.send;
    var origin = Util.getOrigin();
    xhr.prototype.open = function (method, url) {
      this._startTime = +new Date();
      this.method = method;
      this.url = url;
      _open && _open.apply(this, arguments);
      try {
        // setRequestHeader should be after xhr.open
        if (enableLogTrace && project && Util.checkSameOrigin(url, origin) && typeof this.setRequestHeader === 'function') {
          var id = Util.traceid();
          if (id) {
            this.setRequestHeader('M-TRACEID', id);
            this.setRequestHeader('M-APPKEY', 'fe_' + project);
            this.traceid = id;
          }
        }
      } catch (e) {
        Util.reportSysError(e);
      }
    };
    xhr.prototype.send = function () {
      var _this = this,
        _arguments = arguments;
      var EVENT_LISTENER = 'addEventListener';
      var STATE_CHANGE = 'onreadystatechange';
      var _dispatchEvent = function _dispatchEvent(event) {
        if (!event) return;
        if (/catfront.(dianping|51ping).com/.test(_this.url)) {
          try {
            var response = void 0;
            if (_this.getAllResponseHeaders('content-type').indexOf('application/json') !== -1) {
              response = JSON.parse(event.currentTarget.response);
            }
            // callback of Owl report requests
            if (event.currentTarget.status === 200) {
              _this.success && _this.success(response);
            } else {
              _this.fail && _this.fail(response);
            }
          } catch (e) {}
        } else {
          event.duration = +new Date() - _this._startTime;
          Event.trigger('ajaxCall', event);
        }
      };
      if (EVENT_LISTENER in this) {
        this[EVENT_LISTENER]('load', _dispatchEvent);
        this[EVENT_LISTENER]('error', _dispatchEvent);
        catchAbort && this[EVENT_LISTENER]('abort', _dispatchEvent);
        catchTimeout && this[EVENT_LISTENER]('timeout', _dispatchEvent);
      } else {
        var _originStateChange = this[STATE_CHANGE];
        this[STATE_CHANGE] = function (event) {
          if (_this.readyState === 4) {
            _dispatchEvent(event);
          }
          _originStateChange && _originStateChange.apply(_this, _arguments);
        };
      }
      return _send && _send.apply(this, arguments);
    };
  } catch (e) {
    Util.reportSysError(e);
  }
};

/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Event = __webpack_require__(21);
var Util = __webpack_require__(20);
module.exports = function interceptFetch() {
  var enableLogTrace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (typeof window.fetch !== 'function' || window.fetch._owl) return;
  var protocol = window.location && window.location.protocol;
  if (protocol === 'file:') return;
  var _fetch = window.fetch;
  window.fetch = function (input) {
    var args = Array.prototype.slice.call(arguments, 0);
    var fetchUrl = (input && typeof input !== 'string' ? input.url : input) || '';
    var init = args[1] || {};
    var origin = Util.getOrigin();
    if (init.method === 'HEAD' || init.mode === 'no-cors') return _fetch.apply(window, args);
    var traceid = void 0;
    try {
      if (enableLogTrace && Util.checkSameOrigin(fetchUrl, origin) && project) {
        traceid = Util.traceid();
        init.headers = new Headers(init.headers);
        init.headers.append('M-TRACEID', traceid);
        init.headers.append('M-APPKEY', 'fe_' + project);
        args[1] = init;
      }
    } catch (e) {
      Util.reportSysError(e);
    }
    var startTime = +new Date();
    return _fetch && _fetch.apply(window, args).then(function (res) {
      try {
        if (!res || typeof res.clone !== 'function') return res;
        var copy = res.clone();
        var resHeaders = copy.headers;
        var xForbidReason = '';
        if (resHeaders && typeof resHeaders.get === 'function') {
          var contentType = resHeaders.get('content-type');
          if (contentType && !/(text)|(json)/.test(contentType)) return res;
          xForbidReason = resHeaders.get('x-forbid-reason') || '';
        }
        copy.text().then(function (response) {
          Event.trigger('fetchCall', {
            url: fetchUrl,
            duration: +new Date() - startTime,
            isSuccess: true,
            ok: copy.ok,
            response: response,
            statusCode: copy.status,
            statusText: copy.statusText,
            xForbidReason: xForbidReason,
            traceid: traceid
          });
        });
        return res;
      } catch (e) {
        Util.reportSysError(e);
        return res;
      }
    }).catch(function (err) {
      Event.trigger('fetchCall', {
        url: fetchUrl,
        duration: +new Date() - startTime,
        isSuccess: false,
        errName: err.name,
        errMsg: err.stack || err.message,
        traceid: traceid
      });
      throw err;
    });
  };
  window.fetch._owl = true;
};

/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Ajax = __webpack_require__(19);
var Url = __webpack_require__(14);
var version = (__webpack_require__(16).version);
var Logger = __webpack_require__(13);
var RATE = 0.01;

/**
 * Owl 版本号上报
 * 
 * @param {string} name
 * @param {OWL} Owl
 */
module.exports = function (name, Owl) {
  if (!name || !Owl) return;
  if (Math.random() > RATE) return;
  var ge = function ge(v1, v2) {
    try {
      v1 = v1.split('.').map(function (value) {
        return parseInt(value);
      });
      v2 = v2.split('.').map(function (value) {
        return parseInt(value);
      });
      var ret = void 0;
      if (v1[0] !== v2[0]) {
        ret = v1[0] - v2[0];
      } else if (v1[1] !== v2[1]) {
        ret = v1[1] - v2[1];
      } else {
        ret = v1[2] - v2[2];
      }
      return ret >= 0 ? true : false;
    } catch (e) {
      Logger.ignore(e);
      return false;
    }
  };
  if (ge(Owl.cfgManager.get('version'), version)) return;
  var data = {
    v: 1,
    rate: RATE,
    project: name,
    version: 'v_' + version,
    pageurl: encodeURIComponent(window.location.href),
    count: 1
  };
  var url = Owl.cfgManager.url + '/api/version';
  url = Url.stringify(url, data);
  setTimeout(function () {
    Ajax({
      type: 'GET',
      url: url
    });
  }, 1500);
};

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initInfo: () => (/* binding */ initInfo)
/* harmony export */ });
/* harmony import */ var _device__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);

// 状态管理类
class InfoManager {
  constructor() {
    this.info = {};
    this.supportInfo = {};
  }
  setSupportInfo(name, supportInfo) {
    this.supportInfo[name] = {
      ...(this.supportInfo[name] || {}),
      ...supportInfo
    };
  }
  setInfo(newInfo) {
    for (const [key, value] of Object.entries(newInfo)) {
      this.info[key] = value;
    }
  }
  getInfo(key) {
    return this.info[key];
  }
  getFinInfo() {
    const vm = InfoManager.Inst;
    vm.$plugins.forEach(plugin => {
      if (plugin.filter && typeof plugin.filter == 'function') {
        this.supportInfo[plugin.name] = plugin.filter(this.supportInfo[plugin.name]);
      }
    });
    const finInfo = {
      ...this.info,
      ...this.supportInfo
    };
    const {
      filter
    } = vm.$options;
    if (filter && typeof filter == 'function') {
      return filter(finInfo);
    }
    return finInfo;
  }
}
function initInfo(vm) {
  if (!vm.$info) {
    vm.$info = new InfoManager();
    InfoManager.Inst = vm;
    vm.$info.setInfo((0,_device__WEBPACK_IMPORTED_MODULE_0__.getDeviceInfo)());
  }
}

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDeviceInfo: () => (/* binding */ getDeviceInfo)
/* harmony export */ });
function getDeviceInfo() {
  return {
    os: getDeviceOS(),
    onLine: getOnlineState(),
    timeStamp: getCurrentTimeStamp(),
    ...getBrowserTypeAneVersion()
  };
}
function getDeviceOS() {
  let userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "IOS";
  } else {
    return navigator.platform;
  }
}
function getOnlineState() {
  return navigator.onLine;
}
function getBrowserTypeAneVersion() {
  let ua = navigator.userAgent.toLocaleLowerCase();
  let version = "";
  let browserType = null;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE";
    version = /msie\s(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/firefox/) != null) {
    browserType = "firefox";
    version = /firefox\/(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/ucbrowser/) != null) {
    version = /ucbrowser\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "UC";
  } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
    version = /opera\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "opera";
  } else if (ua.match(/metasr/) != null) {
    version = /metasr\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "sougou";
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    version = /tencenttraveler\/(\d+\.\d+)/i.exec(ua)[1] || /qqbrowse\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "QQ";
  } else if (ua.match(/chrome/) != null) {
    browserType = "chrome";
    version = /chrome\/(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/safari/) != null) {
    version = /safari\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "Safari";
  } else {
    browserType = "others";
  }
  return {
    browserType,
    browserVersion: version
  };
}
function getCurrentTimeStamp() {
  return new Date().getTime();
}

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initPlugin: () => (/* binding */ initPlugin)
/* harmony export */ });
/* harmony import */ var _adapter_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _adapter_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var _options_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



// plugin格式{
//     name:'service worker',
//     type:'js',
//     test:function(){
//         return true
//     }，  
//     aysnc:true
// }
// api格式：{
//     name:'service worker'
//     type:'css'
// }
// 如果aysnc设为true，则是一个异步插件，可以异步返回检验结果
// 这里先不处理promise，如果执行插件时返回了Promise，再执行异步逻辑
function initPlugin(vm) {
  const {
    plugins = [],
    api = []
  } = vm.$options;
  if (plugins.length !== 0) {
    plugins.forEach(plugin => {
      if (!plugin.name) {
        (0,_options_error__WEBPACK_IMPORTED_MODULE_2__.handlerError)(_options_error__WEBPACK_IMPORTED_MODULE_2__.PLUGIN_NEED_NAME);
      }
      if (!plugin.type) {
        plugin.type = 'js';
      }
    });
  }
  vm.$plugins = api.map(apiItem => {
    mergePluginParam(apiItem);
    let exitsPlugin = plugins.find(plugin => plugin.name == apiItem.name);
    if (exitsPlugin) {
      return {
        ...apiItem,
        ...exitsPlugin
      };
    }
    const test = createDefaultPlugin(apiItem);
    return {
      ...apiItem,
      test
    };
  });
}
function createDefaultPlugin(apiItem) {
  switch (apiItem.type) {
    case 'js':
      {
        return function () {
          return Boolean(window[apiItem.name]);
        };
      }
    case 'css':
      {
        return (0,_adapter_css__WEBPACK_IMPORTED_MODULE_0__.defaultCssPlugin)(apiItem);
      }
    case 'html':
      {
        return (0,_adapter_html__WEBPACK_IMPORTED_MODULE_1__.defaultHtmlPlugin)(apiItem);
      }
    default:
      {
        break;
      }
  }
}
// 由于各种类型的插件参数有差异，因此需要在这里统一做一轮处理
function mergePluginParam(plugin) {
  addPluginMethods(plugin);
  const {
    type
  } = plugin;
  switch (type) {
    case 'js':
      {
        break;
      }
    case 'css':
      {
        (0,_adapter_css__WEBPACK_IMPORTED_MODULE_0__.cssPluginOptionsExtra)(plugin);
        break;
      }
    case 'html':
      {
        (0,_adapter_html__WEBPACK_IMPORTED_MODULE_1__.htmlPluginOptionsExtra)(plugin);
        break;
      }
  }
}

// 给插件增加静态方法
function addPluginMethods(plugin) {
  addPluginMethodsExtraData(plugin);
}
// 增加给插件保存和修改额外数据的方法
function addPluginMethodsExtraData(plugin) {
  plugin.extra = {};
  plugin.setExtraData = function (params) {
    Object.entries(params).forEach(([key, value]) => {
      this.extra[key] = value;
    });
  }.bind(plugin);
}

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cssPluginOptionsExtra: () => (/* binding */ cssPluginOptionsExtra),
/* harmony export */   defaultCssPlugin: () => (/* binding */ defaultCssPlugin)
/* harmony export */ });
// 检测CSS可能传入的值有：postion:left
// 或者可以仅仅传入potions，传入values数组来检测是否支持数组中的所有值，
// 比如检测[left,right,top,bottom]这一组值是否都允许
// 或者可以检测表达式是否支持，比如(--username: zhangxinxu)
// apiOptions在type为CSS时，格式如下：
// {
//     name:'flex:1'| 'flex',
//     type:'css',
//     values:[1,2,3],
//     expression:true  //如果开启则以表达式来解析 

// }
function defaultCssPlugin(apiOptions) {
  let {
    name,
    values,
    expression
  } = apiOptions;
  return function () {
    // 版本较新的浏览器使用CSS API进行检测
    // 版本较低的浏览器使用getComputedStyle方法进行polyfill
    function CssSupportPolfill(propertyName, value) {
      if (CSS && CSS.supports) {
        if (expression) {
          return CSS.supports(name);
        }
        return CSS.supports(propertyName, value);
      }
      let dom = document.createElement('div');
      dom.style[propertyName] = value;
      return window.getComputedStyle(dom)[propertyName] === value;
    }
    // 这配置合并阶段处理过了values,values一定是一个数组
    return values.every(val => {
      return CssSupportPolfill(name, val);
    });
  };
}

// css插件配置扩展
function cssPluginOptionsExtra(pluginOptions) {
  let values = pluginOptions.value || [];
  const {
    name
  } = pluginOptions;
  let propertyName, value;
  // 处理类似flex:1;这样的情况
  if (name.indexOf(':') != -1) {
    [propertyName, value] = name.split(":");
    if (value[value.length - 1] == ';') {
      value = value.slice(-2);
    }
    values.push(value);
  } else {
    propertyName = name;
  }
  pluginOptions.values = values;
  pluginOptions.name = propertyName;
  pluginOptions.expression = pluginOptions.expression || false;
}

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultHtmlPlugin: () => (/* binding */ defaultHtmlPlugin),
/* harmony export */   htmlPluginOptionsExtra: () => (/* binding */ htmlPluginOptionsExtra)
/* harmony export */ });
// 检测html主要是检测一个属性是否支持
// 由于不同属性可能不同标签支持不一样，应该允许传一个标签列表，用这些标签列表进行检测，默认只使用div检测
// apiOptions在type为html时，格式如下：
// {
//     name:’placeholder‘
//     type:'html',
//     tags:['div','input']
// }
function defaultHtmlPlugin(apiOptions) {
  const {
    name,
    tags
  } = apiOptions;
  // 这里的逻辑已经在处理插件类型时处理完毕，tag一定存在且为数组
  return function () {
    return tags.every(tag => {
      const dom = document.createElement(tag);
      return name in dom;
    });
  };
}
// 处理html的插件类型扩展
function htmlPluginOptionsExtra(pluginOptions) {
  // 没有传tag则默认为div
  if (!pluginOptions.tags) {
    pluginOptions.tags = ['div'];
  } else {
    if (typeof pluginOptions.tags == 'string') {
      pluginOptions.tags = [pluginOptions.tags];
    }
    if (!Array.isArray(pluginOptions.tags)) {
      throw TypeError('tags is an array');
    }
  }
}

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collectApiSupportInfo: () => (/* binding */ collectApiSupportInfo)
/* harmony export */ });
// 这部分需要考虑异步问题，有些检测API可能是异步的，需要额外处理
function collectApiSupportInfo(vm) {
  return new Promise((reslove, reject) => {
    const {
      $plugins,
      $info
    } = vm;
    const asyncCheckList = [];
    $plugins.forEach(plugin => {
      if (plugin.async) {
        asyncCheckList.push(plugin);
      } else {
        $info.setSupportInfo(plugin.name, createSupportInfo(plugin, vm));
      }
    });
    if (asyncCheckList.length !== 0) {
      Promise.all(asyncCheckList.map(item => item.test.call(item, vm))).then(infoList => {
        asyncCheckList.forEach((plugin, index) => {
          $info.setSupportInfo(plugin.name, {
            support: infoList[index],
            ...plugin.extra
          });
        });
        reslove(true);
      });
    } else {
      reslove(true);
    }
  });
}
// 创建支持度信息，插件可以通过修改插件的extra属性来扩展其他需要上报的属性
function createSupportInfo(plugin, vm) {
  return {
    support: plugin.test.call(plugin, vm),
    ...plugin.extra
  };
}

/***/ })
/******/ 	]);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ApiSupport.js.map