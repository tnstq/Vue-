import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid--->生成一个随机字符串
import {getUUID} from '@/uuid_token'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
};

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};

const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data);
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        //console.log(result);
        //代表服务器加入购物车成功
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
};
//简化数据
const getters = {
    categoryView(state){
        //当前计算出来的属性值至少是一个空对象，不会假报错
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}