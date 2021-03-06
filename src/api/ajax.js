/*
  封装ajax的函数
  1.统一处理请求异常
  2.异步请求成功的数据不是response ，而是response.data
  3.将json请求转化为urlencoded格式(可能后台不支持json 只支持 urlencolde )
*/
/*
1.axions 服务端 XHR XMLHttpRequests （ajax请求）
2.基于promise对象
3.支持服务器端
4.interceptors 请求拦截和响应拦截
5.自动将json数据转化为js数据
6.取消请求 cancelToken
7.
*/
// get请求：query参数 配置对象{params：{}}
//post请求：默认为json数据 后台可能不支持json合适 需要转化为urlencoded 格式name=“张三”&age=“12’
//asios({}) //配置对象 属性名是特定的属性不能写错这是他不好的地方 asios.get 和asios.post()
//axios(url,{配置对象}) 强大；形参和实参可以不一样 判断第一个参数 是不是字符串
//axios 可以发多种请求 get：查询 post：添加 put：更新 delet：删除
//timeout 请求超时
//status: 200 请求状态码
import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import router from '../router'


axios.defaults.timeout = 20000 //全局配置超时时间

//添加一个请求拦截
axios.interceptors.request.use((config)=>{

  //1.拿到请求对象data
  const {method,data} = config
  //转化为urlencoded格式
  if(method.toLowerCase() ==='post'  && data && typeof data === 'object'){
    config.data = qs.stringify(data)
  }

  //如果浏览器有token，就自动携带上token
  const token = localStorage.getItem('token_key')

  if (token) {
    config.headers.Authorization = 'token ' + token
  }


  return config
})

//添加一个相应拦截得到response.data
axios.interceptors.response.use(responce =>{
  return responce.data
},error =>{
  //统一处理异常
  //alert('错误异常'+ error.message)
  //正常他是抛出异常进入.catch 直接统抛出异常
  // return Promise.reject(error)
  // return error
  const status = error.response.status
  const msg = error.message
  if (status === 401) { // 未授权
    // 退出登陆
    store.dispatch('logout')
    router.replace('/login')
    alert(error.response.data.message)
  } else if (status === 404) {
    alert('请求的资源不存在')
  } else {
    alert('请求异常: ' + msg)
  }
  
  return new Promise(()=>{}) //返回panding 状态 从而阻止后面的异常不处理
})




export default axios

//测试
// axios.get('/api/test_get',{
//   params:{
//     name:'张三',
//     pwd:'123'
//   }
// })

// axios.post('/api/test_post',{
//   name:'tom',
//   pwd:'22222'
// })
// .then(data=>{
//   console.log('请求成功'+data)
// })
