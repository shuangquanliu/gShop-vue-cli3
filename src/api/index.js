/*
1.封装接口请求函数，每个函数返回的都是Promise /index_category
*/
import ajax from './ajax.js'
const BASE = '/api'

//获取定位
export const reqAddress = (latitude,longitude)=> ajax.get(`${BASE}/position/${latitude},${longitude}`)//先传维度，再传精度
//获取食品分类了表
// export const reqCatorgorys = ()=> ajax.get(`/index_category`)

export const reqCatorgorys = () => ajax({
  method:'GET',
  url:BASE+'/index_category'
})


//3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude}) => ajax({
  method:'GET',
  url:BASE+'/shops',
  params:{
    latitude,
    longitude
  }
})
