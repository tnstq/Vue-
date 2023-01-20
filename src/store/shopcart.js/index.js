import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";
const state = {
    cartList:[]
};

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};

const actions = {
    //获取购物车列表
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code = 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车的某一个产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code = 200){
            return 'ok'
        }else{
            console.log('faile');
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        //获取购物车中全部的产品，是一个数组
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId) : '';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    },
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll);
    }
};
//简化数据
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    //计算购物车的数据
}
export default {
    state,
    mutations,
    actions,
    getters
}