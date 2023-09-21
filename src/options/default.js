export const defaultOptions={
    api:[
    ],
    request:null,
    plugins:[],
    filter:function(data){
        return data
    },
    owlOptions:{
            project: '',
            pageUrl:"",
            devMode: false, // 请根据环境来赋值，线上环境设为false，线下环境设为true
            autoCatch: {
                pv: false,
                page:false,
                ajax:false,
                resource:false,
                js:false
            },
            metric:{
                combo:false
            }
    },
    raptorKey:'sdk_data',
    immediate:true,
    timeout:3000,
    limit:1
}