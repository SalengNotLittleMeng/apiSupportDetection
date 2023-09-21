
import { defaultCssPlugin,cssPluginOptionsExtra } from "../adapter/css";
import { defaultHtmlPlugin ,htmlPluginOptionsExtra } from "../adapter/html";
import {PLUGIN_NEED_NAME,handlerError} from '../options/error'
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
export function initPlugin(vm){
    const {plugins=[],api=[]}=vm.$options
    if(plugins.length!==0){
        plugins.forEach(plugin => {
            if(!plugin.name){
                handlerError(PLUGIN_NEED_NAME)
            }
            if(!plugin.type){
                plugin.type='js'
            }
        });
    }
    vm.$plugins=api.map(apiItem=>{
        mergePluginParam(apiItem)
        let exitsPlugin=plugins.find(plugin=>plugin.name==apiItem.name)
        if(exitsPlugin){
            return {
                ...apiItem,
                ...exitsPlugin
            }
        }
            const test=createDefaultPlugin(apiItem)
            return {
                ...apiItem,
                test
            }
    })
}

function createDefaultPlugin(apiItem){
    switch (apiItem.type){
        case 'js':{
            return function(){
                return Boolean(window[apiItem.name])
            }
        }
        case 'css':{
            return defaultCssPlugin(apiItem)
        }
        case 'html':{
             return defaultHtmlPlugin(apiItem)
        }
        default:{
            break
        }
    }
}
// 由于各种类型的插件参数有差异，因此需要在这里统一做一轮处理
function mergePluginParam(plugin){
        addPluginMethods(plugin)
        const {type}=plugin
        switch (type){
            case 'js':{
                break;
            }
            case 'css':{
                cssPluginOptionsExtra(plugin)
                break
            }
            case 'html':{
                htmlPluginOptionsExtra (plugin)
                break
            }
        }
}

// 给插件增加静态方法
function addPluginMethods(plugin){
    addPluginMethodsExtraData(plugin)
}
// 增加给插件保存和修改额外数据的方法
function addPluginMethodsExtraData(plugin){
    plugin.extra={}
    plugin.setExtraData=function(params){
        Object.entries(params).forEach(([key,value])=>{
            this.extra[key]=value
        })
    }.bind(plugin)
}