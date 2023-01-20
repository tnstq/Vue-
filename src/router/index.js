import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
import routes from './routes';

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0代表滚动条在最上方
        return {x : 0, y : 0}
    }
});

//全局首位：前置首位(在路由跳转前进行判断)
router.beforeEach(async (to,from,next)=> {
    //to:可以获取到你要跳转到哪个路由信息
    //from:可以获取到你从1哪个路由而来
    //next:放行函数
    //next();
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if(token){
        //用户登陆后不能去login
        if(to.path == '/login'){
            next('/home')
        }else{
            //如果用户名已有
            if(name){
                next()
            }else{
                //没有用户信息
                //获取用户信息在首页展示
                try {
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    //token失效了获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        //未登录:不能去交易相关，支付相关的页面，不能去个人中心
        let toPath = to.path
        if(toPath.indexOf('./trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            //把未登录是想去而没有去的信息存储于路由当中
            next('/login?redirect=' + toPath)
        }else{
            next();
        }
    }
}) 

export default router;