import axios from 'axios'
import Qs from 'qs'
import { ElNotification } from 'element-plus'
import Func from './func'


var Request = {}

/**
 * axios Get方式获取数据
 * @param {String} url 
 * @param {Object} params 
 * @returns 
 */
Request.Get = function(url,params){
    var data = axios.get(window.ACCESS_URL + url,{
        params:params,
        paramsSerializer:function(params){
            return Qs.stringify(params,{arrayFormat:'repeat'})
        }
    })
    return new ApiRequest(data)
}

/**
 * axios Post方式获取数据
 * @param {String} url 
 * @param {Object} params 
 * @returns 
 */
Request.Post = function(url,params){
    var data = axios.Post(window.ACCESS_URL + url,params)
    return new ApiRequest(data)
}

/**
 * axios Put方式获取数据
 * @param {String} url 
 * @param {Object} params 
 * @returns 
 */
Request.Put = function(url,params){
    var data = axios.put(window.ACCESS_URL + url,params)
    return new ApiRequest(data)
}

/**
 * axios 删除数据
 * @param {String} url 
 * @param {Object} params 
 * @returns 
 */
Request.Delete = function(url,params){
    var data = axios.delete(window.ACCESS_URL + url,params)
    return new ApiRequest(data)
}

/**
 * 设置Token，将token添加至LocalStorage及默认Http请求头
 * @param {String} token 
 */
Request.SetToken = function(token){
    if(token !== null && token !== undefined){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        Func.localStorage.set('token',token)
    }
}

axios.interceptors.request.use(function(config) {
    return config
},function(error){
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
    return Promise.resolve(response)
},function(error){
    console.error(error)
    return Promise.reject(error)
})

/**
 * 对请求的返回数据机型判断处理
 * @param {Object} axiosData 
 */
function ApiRequest(axiosData){
    var data = axiosData.then(res => res.data).catch(error => {
        console.error(error)
        ElNotification({
            title:'服务端错误',
            duration:0,
            dangerouslyUseHTMLString:true,
            message:error.config.url + '<br />' + error.message
        })
    })

    this.then = function(callBack){
        return data.then(d => {
            if(d){
                if(d.RetCode !== 1 && callBack.length <= 1) {
                    ElNotification({
                        title:'提示',
                        message:d.RetMsg
                    })
                }
                if(callBack !== undefined){
                    return callBack(d.RetObj,d.RetMsg,d.RetCode)
                }
            }
        }).then(res => {
            return res
        }).catch(error => {
            console.error(error)
        })
    }
}

Request.install = function(app) {
    app.config.globalProperties.$func = Func;
  }

export default Request