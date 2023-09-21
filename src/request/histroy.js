// 考虑上报失败的问题，如果因为离线等原因未上报成功，则在下一次进入页面时重新进行之前的上报操作

class HistoryData{
    constructor(){
      this.key="API_SUPPORT_SDK_STORAGE"
    }
    addHistroyData(data){
      let history=localStorage.getItem(this.key)
      if(!history){
          history=[]
      }else{
        history=JSON.parse(history)
        if(history instanceof Array){
          history.push(data)
        }
      }
      localStorage.setItem(this.key,JSON.stringify(history))
    }
    useHistroyData(fn){
      let history=localStorage.getItem(this.key)
      if(!history){
        return 
      }
      history=JSON.parse(history)
      if(history instanceof Array){
        setTimeout(()=>{
          history.forEach(data=>{
            fn(data)
          })
          localStorage.removeItem(this.key)
        })
      }else{
        localStorage.removeItem(this.key)
      }
    }
  }

  export default new HistoryData()