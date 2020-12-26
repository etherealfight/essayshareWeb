import axios from 'axios'
//创建axios实例
const instance = axios.create({
    //baseURL: 'http://121.196.154.219:8080',
    baseURL:'http://192.168.1.104:8080',
    timeout: 5000
})
//添加拦截器
instance.interceptors.response.use(res => res.data)

export {
    instance
}

