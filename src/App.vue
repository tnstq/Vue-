<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在Home、Search下显示，在Login,Register下隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {Header,Footer},
  mounted() {
    //通知vuex发请求，获取数据存进仓库
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>
  body{
  padding-right: 0px !important;
  overflow: hidden;
  }
</style>