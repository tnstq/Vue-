import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
    {
        path:'/center',
        component:Center,
        meta:{show:false},
        //二级路由组件
        children:[
            {
                name:'myorder',
                path:'myorder',
                component:MyOrder
            },
            {
                name:'grouporder',
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'myorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/home',
        component:()=>import("@/pages/Home"),
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/search/:keyword?',
        name:'search',
        component:Search,
        meta:{show:true}

    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{show:false}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        meta:{show:false}
    },
    {
        path:'/trade',
        name:'trade',
        component:Trade,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            //必须从购物车去交易界面
            if(from.path == '/shopcart'){
                next()
                //停留在当前页面
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        name:'pay',
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next(false); 
            }
        }
    },
    //重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]