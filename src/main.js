import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
//轮播图全局组件
import Carousel from './components/Carousel'
//分页器全局组件
import Pagination from './components/Pagination'
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
//引入MockServer.js---mock数据
import '@/mock/mockSever'
//引入swiper样式
import "swiper/css/swiper.css";
//引入路由
import router from '@/router'
//引入仓库
import store from './store';
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
//引入图片懒加载
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
});
//表单验证
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  messages: {
  ...zh_CN.messages,
  is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: { // 给校验的 field 属性名映射中文名称
  phone: '手机号',
  code: '验证码',
  password:'密码',
  password1:'确认密码',
  agree:'协议'
  }
  });
  //自定义校验规则
  VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })
//按需引入element-ui
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
//element-ui注册组件的时候可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  //组件实例身上会多一个属性$store属性
  store,
}).$mount('#app')
