<template>
    <section class="productWrap productsWrap">
      <div class="pageCenter heightWrap" style="height: auto">
        <!--<article class="htmleaf-container">-->
        <div class="tabs">
          <div class="tabsWrap">
            <ul class="title">
              <li><router-link to="/productsPage/noviceCollection" v-bind:class="{active: xactive}">新手专享</router-link></li>
              <li><router-link to="/productsPage/wzjCollection" v-bind:class="{active: wactive}">稳赚金</router-link></li>
              <li><router-link to="/productsPage/hqjCollection" v-bind:class="{active: hactive}">活期金</router-link></li>
            </ul>
          </div>
          <div class="tabs-content">
            <router-view></router-view>
          </div>
        </div>
        <!--</article>-->
      </div>
    </section>
</template>
<style>
  .productWrap{
    padding-top: 0;
  }
  .tab{
    padding:0;
  }
  .tabs{
    width: 100%;
    padding:20px 0 50px 0;
    box-shadow: none;
    margin-bottom: 0;
  }
  .tabsWrap{
    background: #fff;
  }
  .tabsWrap a{
    color: #000;
    font-size: 18px;
    padding: 15px 10px;
  }
  .tabsWrap li{
    margin-right: 30px;
    display: inline-block;
    /*float: left;*/
  }
  .title li .active{
    /*border-bottom:2px solid #f2b643;*/
    color:#f2b643;
  }
</style>
<script type="text/ecmascript-6">
  import './../../assets/css/styles.css'
  import NoviceCollection from './noviceCollection.vue'
  import WzjCollection from './wzjCollection.vue'
  import HqjCollection from './hqjCollection.vue'
  export default {
    data () {
      return {
        xactive: false,
        wactive: false,
        hactive: false
      }
    },
    components: {
      NoviceCollection,
      WzjCollection,
      HqjCollection
    },
    computed: {
      colorWho () {
        if (this.$route.path.indexOf('noviceCollection') >= 0) {
          this.xactive = true
          this.wactive = false
          this.hactive = false
        } else if (this.$route.path.indexOf('wzjCollection') >= 0) {
          this.xactive = false
          this.wactive = true
          this.hactive = false
        } else if (this.$route.path.indexOf('hqjCollection') >= 0) {
          this.xactive = false
          this.wactive = false
          this.hactive = true
        }
      }
    }
  }
</script>
