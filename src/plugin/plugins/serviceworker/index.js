const MESSAGE_EVENT_NAME="service_client_sdk"
const unUseEventData=new Set([
    'eventType',
    'type'
])
const BaseData={
    hitCache:false,
    hitPreload:false,
    error:null,
    errorCode:0,
    supportServiceWorker:true
}
export default class ServiceWorkerPlugin{
    constructor(options={}){
        this.name='serviceWorker',
        this.type='js'
        this.test=initServiceWorker,
        this.filter=serviceWorkerDataFilter
        this.async=true
    }
}

function initServiceWorker(){
    const vm=this
    return new Promise((reslove)=>{
        if (!navigator.serviceWorker) {
            reslove(false)
            return
        }
        navigator.serviceWorker.register("./sw.js").then((registration)=>{
            initMessageListener(reslove,vm)
            messageServiceWorkerErrorHandler(reslove,vm)
        }).catch(e=>{
            console.log(e)
            reslove(false)
        })
    })
}
// 跟service worker层进行通信
function initMessageListener(cb,vm){
    navigator.serviceWorker.addEventListener("message", function (event) {
        const { data } = event;
        // 考虑预加载时需要合并两次的问题
        if (data.eventType == MESSAGE_EVENT_NAME) {
            // 删除无用的参数
            unUseEventData.forEach((value)=>{
                if(data[value]){
                    delete data[value]
                }
            })
           vm.setExtraData(data)
            cb(true)
        }
      });
}

// 传输失败的兜底机制
function messageServiceWorkerErrorHandler(cb,vm){
    window.addEventListener('unload',()=>{
        vm.setExtraData(createServiceWorkerMessageErrorInfo())
        cb(false)
    })
}

function createServiceWorkerMessageErrorInfo(){
    return {
        error:'未收到传输消息',
        errorCode:1001
    }
}
function serviceWorkerDataFilter(data){
    if(!data){
        return {
            ...BaseData,
            error:'timeout',
            errorCode:1002,
            supportServiceWorker:true,
            isInit:false,
            hitPreload:false,
            hitCache:false
        }
    }
    data.supportServiceWorker=data.support
    delete data.support
    return {
      ...BaseData,
      ...data
    }
}