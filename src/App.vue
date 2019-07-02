<template>
  <div class="pWrap">
    <nav-header></nav-header>
    <router-view>
      <home-page></home-page>
    </router-view>
    <side-bar></side-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from './components/header/header.vue'
  import NavFooter from './components/footer/footer.vue'
  import HomePage from './views/homePage.vue'
  import SideBar from '@/components/sidebar/sidebar'

  export default {
    components: {
      NavHeader,
      NavFooter,
      SideBar,
      HomePage
    }
  }
</script>
<style>
.pWrap{
  height: 100%;
}
</style>
