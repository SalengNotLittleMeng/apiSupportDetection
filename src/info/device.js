export function getDeviceInfo() {
    return {
        os:getDeviceOS(),
        onLine:getOnlineState(),
        timeStamp:getCurrentTimeStamp(),
        ...getBrowserTypeAneVersion()

    }
}
function getDeviceOS() {
  let userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "IOS";
  } else {
    return navigator.platform;
  }
}

function getOnlineState() {
  return navigator.onLine;
}

function getBrowserTypeAneVersion() {
  let ua = navigator.userAgent.toLocaleLowerCase();
  let version = "";
  let browserType = null;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE";
    version = /msie\s(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/firefox/) != null) {
    browserType = "firefox";
    version = /firefox\/(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/ucbrowser/) != null) {
    version = /ucbrowser\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "UC";
  } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
    version = /opera\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "opera";
  } else if (ua.match(/metasr/) != null) {
    version = /metasr\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "sougou";
  } else if (
    ua.match(/tencenttraveler/) != null ||
    ua.match(/qqbrowse/) != null
  ) {
    version =
      /tencenttraveler\/(\d+\.\d+)/i.exec(ua)[1] ||
      /qqbrowse\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "QQ";
  } else if (ua.match(/chrome/) != null) {
    browserType = "chrome";
    version = /chrome\/(\d+\.\d+)/i.exec(ua)[1];
  } else if (ua.match(/safari/) != null) {
    version = /safari\/(\d+\.\d+)/i.exec(ua)[1];
    browserType = "Safari";
  } else {
    browserType = "others";
  }
  return {
    browserType,
    browserVersion:version
  };
}

function getCurrentTimeStamp(){
    return  new Date().getTime()
}