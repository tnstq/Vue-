import { reqGetSearchInfo } from "@/api";
//state：存储数据的地方
const state = {
    searchList:{}
};
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getSearchList({commit},params = {}){
        //params形参,是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//getters：计算属性，用于简化仓库数组，让组件获取仓库数组更加方便
//可以把我们将来在组件当中需要用的数据简化一下
const getters = {
    //当前形参state,当前仓库中的state,并非大仓库中的哪个state
    goodsList(state){
        return state.searchList.goodsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}