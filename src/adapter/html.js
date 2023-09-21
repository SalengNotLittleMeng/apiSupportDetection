// 检测html主要是检测一个属性是否支持
// 由于不同属性可能不同标签支持不一样，应该允许传一个标签列表，用这些标签列表进行检测，默认只使用div检测
// apiOptions在type为html时，格式如下：
// {
//     name:’placeholder‘
//     type:'html',
//     tags:['div','input']
// }
export function defaultHtmlPlugin(apiOptions){
    const {name,tags}=apiOptions
    // 这里的逻辑已经在处理插件类型时处理完毕，tag一定存在且为数组
    return function(){
        return tags.every(tag=>{
            const dom=document.createElement(tag)
            return (name in dom)
        })
    }
}
// 处理html的插件类型扩展
export function htmlPluginOptionsExtra(pluginOptions){
    // 没有传tag则默认为div
    if(!pluginOptions.tags){
        pluginOptions.tags=['div']
    }else{
        if(typeof pluginOptions.tags=='string'){
            pluginOptions.tags=[pluginOptions.tags]
        }
        if(!Array.isArray(pluginOptions.tags)){
            throw TypeError('tags is an array')
        }
    }
}