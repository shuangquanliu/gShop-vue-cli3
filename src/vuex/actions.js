/*
包含n个间接修改状态数据的方法
*/

import {reqAddress,reqShops,reqCatorgorys} from '../api/index'
import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_GATEGORGRYS} from './mutation-types'
export default {
  async reqAddress({commit,state}){
    const {latitude,longitude} = state
    const result = await reqAddress(latitude,longitude)
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  async reqCategorys({commit}){
    const result = await reqCatorgorys()
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_GATEGORGRYS,categorys)
    }
  },
  async reqShops({commit,state}){
    const {latitude,longitude} = state
    const result = await reqShops({latitude,longitude})
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },
}
