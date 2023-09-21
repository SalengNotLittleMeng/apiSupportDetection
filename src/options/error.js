export const NEED_API = "api parameter required";
export const API_NEED_ARRAY_OR_OBJECT =
  "The api parameter should be an array or object type";
export const PLUGINS_NEED_ARRAY_OR_OBJECT =
  "The plugins parameter should be an array or object type";
export const NEED_VERIFY_TYPE =
  "The parameter 'type' should be 'js','css' or 'html'";
export const PLUGIN_NEED_NAME = "The plugin requires a parameter name";
export function handlerError(tips) {
  throw Error(tips);
}
