import histroyDara from './histroy'
function request(params) {
  console.log(params)
}

export async function requestMessage(data) {
  try {
    if(!navigator.onLine){
      histroyDara.addHistroyData({
        ...data,
        errorCode:3000
      })
      return
    }
    await request(data);
  } catch (e) {
    console.log(e)
  }
}

export function initRequest(vm) {
  if (
    vm.$options &&
    vm.$options.request &&
    typeof vm.$options.request == "function"
  ) {
    vm.requestMessage = vm.$options.request;
  }else{
    vm.requestMessage = requestMessage;
  }
  histroyDara.useHistroyData(vm.requestMessage)
}



