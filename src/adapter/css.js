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
export function defaultCssPlugin(apiOptions){
    let {name,values,expression}=apiOptions
    return function(){
        // 版本较新的浏览器使用CSS API进行检测
        // 版本较低的浏览器使用getComputedStyle方法进行polyfill
        function CssSupportPolfill(propertyName,value){
            if(CSS&&CSS.supports){
                if(expression){
                    return CSS.supports(name)
                }
                return CSS.supports(propertyName,value)
            }
            let dom=document.createElement('div')
            dom.style[propertyName]=value
            return window.getComputedStyle(dom)[propertyName] === value
        }
        // 这配置合并阶段处理过了values,values一定是一个数组
            return values.every(val=>{
                    return CssSupportPolfill(name,val)
                })
    }
}

// css插件配置扩展
export function cssPluginOptionsExtra(pluginOptions){
    let values=pluginOptions.value||[]
    const {name}=pluginOptions
    let propertyName,value
    // 处理类似flex:1;这样的情况
    if(name.indexOf(':')!=-1){
        [propertyName,value]=name.split(":")
        if(value[value.length-1]==';'){
            value=value.slice(-2);
        }
        values.push(value)
    }else{
        propertyName=name;
    }
    pluginOptions.values=values
    pluginOptions.name=propertyName
    pluginOptions.expression=pluginOptions.expression||false
    
}