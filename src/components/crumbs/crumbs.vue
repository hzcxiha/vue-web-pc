<template>
  <div class="crumbs bgWhite">
    <div class="floatLeft">Hi，<span class="userName" v-text="nickName">176****8185</span>用户，为理想和财富开始活力的一天吧！</div>
    <div class="floatRight">
      <a href="javascript:;">
        <span class="rechargeBt" @click="openCrumbs">充值</span>
      </a>
      <a href="javascript:;">
        <span class="withdrawBt" @click="openCrumbs">提现</span>
      </a>
    </div>
    <div class="clear"></div>
    <div class="crumbsBg" v-show="showCrumbs">
      <div class="crumbsContent">
        <div class="crumbsCenter">
          <div class="textRight">
            <span class="closeCrumbsBg" @click="closeCrumbs">×</span>
          </div>
          <div class="flex">
            <div class="flex1_5">
              <h3>提示</h3>
              <h3>扫描二维码</h3>
              <h3>下载超宝宝理财App 立即充值提现!</h3>
            </div>
            <div class="flex1 textRight">
              <img src="../../../static/img/down-load.png" alt="">
              <h3>扫描下载App</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .crumbsBg{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 102;
    /*display: table;*/
    background: rgba(0,0,0,0.6);
    transition: opacity .5s ease;
  }
  .closeCrumbsBg{
    font-size: 30px;
    margin-right: -50px;
    color: #ccc;
    cursor: pointer;
  }
  .crumbsContent{
    margin: 0 auto;
    /*display: table-cell;*/
    vertical-align: middle;
    position: absolute;
    top:35%;
    left: 50%;
    margin-top: -20px;
    margin-left: -360px;
  }
  .crumbsCenter{
    width: 720px;
    margin: 0 auto;
    height: 240px;
    padding: 20px 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    -webkit-transition: all .5s ease;
    transition: all .3s ease;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .crumbsCenter h3{
    font-size: 18px;
  }
  .crumbsCenter img{
    width: 110px;
    height: 100px;
  }
</style>
<script>
  export default {
    data () {
      return {
        showCrumbs: false
      }
    },
    methods: {
      closeCrumbs () {
        this.showCrumbs = false
      },
      openCrumbs () {
        this.showCrumbs = true
      }
    },
    computed: {
      nickName () {
        if (this.$store.state.nickName === '') {
          this.$store.commit('updateNickName', window.localStorage.nickName)
          return this.$store.state.nickName
        } else {
          return this.$store.state.nickName
        }
      }
    }
  }
</script>
