import { mergeOptions } from "./options/merge"
import { initRequest } from "./request/request"
import { initInfo } from "./info/info"
import { initPlugin } from "./plugin/plugin"
import { collectApiSupportInfo } from "./support/support"
export default class ApiSupport{
     constructor(options){
        this.$options=mergeOptions(options) 
        if(!this.flowLimitController(this)){
            return
        }
        initRequest(this)
        initPlugin(this)
        initInfo (this)
        if(this.$options.immediate){
            this.run()
        }
    }
    run(){
        const {filter,timeout}=this.$options
        function raceTimeout(){
            return new Promise((reslove)=>{
                setTimeout(()=>{
                    reslove()
                },timeout)
            })
        }
        Promise.race([collectApiSupportInfo(this),raceTimeout()]).then(()=>{
            let info=null
            if(typeof filter=='function'){
                info=filter(this.$info.getFinInfo())
            }else{
                info=this.$info.getFinInfo()
            }
            this.requestMessage(info)
        })
    }
    // 流量限制
    flowLimitController(vm){
        const {limit}=vm.$options
        return Math.random()<=limit
    }
}

