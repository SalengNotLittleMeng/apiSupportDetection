export function addParamsInUrl(url,params){
    url+='?'
    Object.entries(params).forEach(([key,value])=>{
        url=`${url}${key}=${value}&`
    })
    url=url.slice(0,-1)
    return url
}