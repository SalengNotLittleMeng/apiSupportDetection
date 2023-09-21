// sw层错误码
// 2003:请求(fetch)过程中出现异常
// 2004:添加缓存出现异常
// 2005:预加载资源过程中异常
const config = {
  preload: ["/example/static/index.css"],
  cache: ["/example/static/resource.json"],
};
let count=1
let isInit = false;
let PreloadList = config.preload.map(item=>{
  if(/^(https?|ftp):\/\//i.test(item)){
      return item
  }
  return self.origin+item.slice(item.indexOf('/'))
})
const fetchHitList = config.cache.map(item=>{
  if(/^(https?|ftp):\/\//i.test(item)){
      return item
  }
  return self.origin+item.slice(item.indexOf('/'))
})
// 由于预加载会发生在JS加载完之前，因此只能在service worker层处理预加载的逻辑
let preloadState = false;
function postMessageService(data) {
  if (data.type === "preload"&&!preloadState) {
    preloadState = true;
    return;
  }
  let message = data;
  message.eventType = "service_client_sdk";
  message = Object.assign(getBaseInfoServiceWorker(), message);
  self.clients.matchAll().then(function (clients) {
    preloadState=false
    isInit=false
    clients.forEach(function (client) {
      client.postMessage(message);
    });
  });
}

function getBaseInfoServiceWorker() {
  return {
    hitCache: false,
    hitPreload: preloadState,
    isInit,
  };
}
// 监听 fetch 事件
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (checkCacheHit(response)) {
          return response;
        }

        return addFetchCache(event.request);
      })
      .catch((e) => {
        postMessageService({
          type: "error",
          error: e,
          errorCode: 2003,
        });
      })
  );
});

// 监听 install 事件
self.addEventListener("install", function (event) {
  isInit = true;
  event.waitUntil(
    caches
      .open("sw-cache")
      .then(function (cache) {
        return cache.addAll(PreloadList);
      })
      .catch((error) => {
        postMessageService({
          type: "error",
          error,
          errorCode: 2005,
        });
      })
  );
});

function checkCacheHit(cacheResponse) {
  if (
    cacheResponse &&
    fetchHitList.find((url) => {
      return url == cacheResponse.url;
    })
  ) {
    postMessageService({
      hitCache: true,
      type: "cache",
    });
    return cacheResponse;
  } else if (
    cacheResponse &&
    PreloadList.find((url) => {
      return url == cacheResponse.url;
    })
  ) {
    postMessageService({
      hitPreload: true,
      type: "preload",
    });
    return cacheResponse;
  }
  return null;
}

function addFetchCache(request) {
  if (
    ![...PreloadList, ...fetchHitList].find((url) => {
      return url == request.url;
    })
  ) {
    return fetch(request);
  }
  // 如果缓存中不存在响应，则发起网络请求并缓存响应
  return fetch(request).then(function (response) {
    return caches.open("sw-cache").then(function (cache) {
      cache.put(request, response.clone());
      return response;
    }).catch(e=>{
      postMessageService({
        type: "error",
        error: e,
        errorCode: 2004,
      });
    })
  });
}
