import { defaultOptions } from "./default";
import { useInnerPlugins } from "../plugin/innerPlugin";
import {
  handlerError,
  NEED_API,
  NEED_VERIFY_TYPE,
  API_NEED_ARRAY_OR_OBJECT,
} from "./error";
const verifyTypeParams = new Set(["js", "css", "html"]);
export function mergeOptions(options) {
  verifyOptions(options);
  optionsFilter(options);
  return deepMerge(defaultOptions, options);
}
//配置过滤器，处理配置保证标准化
function optionsFilter(options) {
  const { api, plugins } = options;
  if(typeof api=='string'){
    options.api=[{
      name:api
    }]
  }
  if (typeof api === "object"&&!Array.isArray(api)) {
    options.api = [api];
  }
  if(!plugins){
    options.plugins=[]
  }
  if ((typeof plugins == "object"||'string')&&!Array.isArray(plugins)) {
    options.plugins = [plugins];
  }
  options.plugins=useInnerPlugins(options.plugins,options.api)
  options.api.forEach(item => {
      if(!item.type){
        item.type='js'
      }
  });
}
// 检验配置合法性
function verifyOptions(options) {
  const { api = null, plugins } = options;
  if (!api) {
    handlerError(NEED_API);
  }
  if ((typeof api!=='string')&&(!isObjectOrArray(api))) {
    handlerError(API_NEED_ARRAY_OR_OBJECT);
  }
  if (options.type && verifyTypeParams.has(options.type)) {
    handlerError(NEED_VERIFY_TYPE);
  }
}

function isObjectOrArray(params) {
 return (typeof params === "object" && params !== null) || Array.isArray(params);
}
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
