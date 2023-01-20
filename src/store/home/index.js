import { reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api";
//state：存储数据的地方
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
}
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList();
        //console.log(result);
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.data);
        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        //console.log(result);
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
//getters：计算属性，用于简化仓库数组，让组件获取仓库数组更加方便
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}