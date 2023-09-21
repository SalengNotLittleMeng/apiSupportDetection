import {getDeviceInfo} from './device'
// 状态管理类
class InfoManager{
    constructor(){
        this.info={}
        this.supportInfo={}
    }
    setSupportInfo(name,supportInfo){
            this.supportInfo[name]={
                ...this.supportInfo[name]||{},
                ...supportInfo
            }
    }
    setInfo(newInfo){
        for(const [key,value] of Object.entries(newInfo)){
         this.info[key]=value
        }
    }
    getInfo(key){
        return this.info[key]
    }
    getFinInfo(){
        const vm=InfoManager.Inst
        vm.$plugins.forEach(plugin=>{
            if(plugin.filter&&typeof plugin.filter=='function'){
               this.supportInfo[plugin.name]=plugin
               .filter(this.supportInfo[plugin.name]) 
            }
        })
        const finInfo={
            ...this.info,
            ...this.supportInfo,
        }
        const {filter}=vm.$options
        if(filter&&typeof filter=='function'){
            return filter(finInfo)
        }
        return finInfo
    }
}
export function initInfo(vm){
    if(!vm.$info){
        vm.$info=new InfoManager()
        InfoManager.Inst=vm
        vm.$info.setInfo(getDeviceInfo())
    }
}