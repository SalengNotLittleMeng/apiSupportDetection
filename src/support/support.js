// 这部分需要考虑异步问题，有些检测API可能是异步的，需要额外处理
export function collectApiSupportInfo(vm){
    return new Promise((reslove,reject)=>{
      const {$plugins,$info}=vm
      const asyncCheckList=[]
      $plugins.forEach(plugin => {
          if(plugin.async){
            asyncCheckList.push(plugin)
          }else{
            $info.setSupportInfo(plugin.name,createSupportInfo(plugin,vm))
          }
      });
      if(asyncCheckList.length!==0){
        Promise.all(asyncCheckList.map(item=>item.test.call(item,vm))).then(infoList=>{
          asyncCheckList.forEach((plugin,index)=>{
              $info.setSupportInfo(plugin.name,{
                support:infoList[index],
                ...plugin.extra
              })
          })
          reslove(true)
      })
      }else{
        reslove(true)
      }
    })
}
// 创建支持度信息，插件可以通过修改插件的extra属性来扩展其他需要上报的属性
function createSupportInfo(plugin,vm){
  return {
     support:plugin.test.call(plugin,vm),
     ...plugin.extra
  }
}