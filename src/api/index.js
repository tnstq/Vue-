//当前模块：API接口进行统一管理
import requests from './request';
import mockRequests from './mockAjax'
import { get, method } from 'lodash';
//三级联动接口 /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => {
    //发请求
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
    return mockRequests.get('/banner');
}

//获取floor组件的数组
export const reqGetFloorList = () => {
    return mockRequests.get('/floor');
}

//获取搜索模块数据 地址/api/list 参数:需要带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
export const reqGetSearchInfo = (params) => {
    return requests({
        url: "/list",
        method: "post",
        data: params
    })
}

//获取产品详细信息的接口 URL: /api/item/{ skuId } 请求方式：get

export const reqGoodsInfo = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: 'get' })
}

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取购物车列表数据接口
//URL: /api/cart/cartList method:get
export const reqCartList = ()=>{
    return requests({url:'/cart/cartList',method:'get'});
}

//删除购物车产品的接口
//URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中的状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedById = (skuId,isChecked) => {
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册的接口
//url:/api/user/passport/register method:post  phone code password
export const reqUserRegister = (data) => {
    return requests({url:`/user/passport/register`,data,method:'post'})
};

//登录
//url:/api/user/passport/login method:get
export const reqUserLogin = (data) => requests({url:`/user/passport/login`,data,method:'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo method:get
export const reqUserInfo = () => {
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'});
};

//退出登录
//URL:/api/user/passport/logout method:GET
export const reqLogout = ()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}

//获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () => {
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

//获取商品清单
//URL:/api/order/auth/trade  method:get
export const reqOrderInfo = () => {
    return requests({url:'/order/auth/trade',method:'get'})
}

//提交订单
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:POST
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}

//获取支付信息
//URL：/api/payment/weixin/createNative/{orderId} method:GET
export const reqPayInfo = (orderId) => {
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
};

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId} method:GET
export const reqPayStatus = (orderId) => {
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

//获取个人中心的数据
//URL:/api/order/auth/{page}/{limit} method:GET
export const reqMyOrserList = (page,limit) => {
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}
