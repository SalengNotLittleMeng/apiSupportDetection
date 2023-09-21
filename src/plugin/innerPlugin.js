import ServiceWorkerPlugin from "./plugins/serviceworker";
// 这里的每个key一定要跟插件的name属性对齐
const InnnerPluginMap=new Map([
    ['serviceWorker',ServiceWorkerPlugin]
])
// 如果用户传入字符串作为插件，则认为使用内置插件进行处理
// 也可以添加一个参数innerPlugin:true,表明是内置插件，通过这种方式添加插件，可以注入参数
export function useInnerPlugins(plugins,apis){
    return plugins.map(plugin=>{
        if(typeof plugin=='string'){
           return addInnerPlugin(plugin,apis)
        }
        // 处理带参数的内置插件的情况
        if(typeof plugin=='object'&&typeof plugin!==null){
            if(plugin.innerPlugin){
                const {params={},name=''}=plugin
                return addInnerPlugin(name,apis,params)
            }
        }
        return plugin
    })
}

function addInnerPlugin(pluginName,apis,params={}){
    if(!InnnerPluginMap.has(pluginName)){
        return undefined
    }
    // 对api中没有注册的插件名进行补充
    if(!apis.find(api=>api.name==pluginName)){
        apis.push({
            name:pluginName
        })
    }
    const Ctor=InnnerPluginMap.get(pluginName)
    return new Ctor(params)
}