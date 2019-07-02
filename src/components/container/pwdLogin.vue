<template>
  <div class="tab tab1 pwdLogin" style="display: block;">
    <div class="infoWrap">
      <span class="registerName">手机号</span>
      <input type="phone" placeholder="请输入注册的手机号码" class="phoneNumSet" maxlength="11" v-model="phone">
    </div>
    <div class="infoWrap">
      <span class="registerName">密&nbsp;&nbsp;&nbsp;码</span>
      <input type="password" placeholder="6-16位字符组成" class="pwdNum" maxlength="16" minlength="6" v-model="userPwd" @keyup.enter="judgeRegister">
    </div>
    <div class="errorMsg" v-text="errorMsg"></div>
    <div class="loginButtonWrap">
      <input type="button" value="登录" class="loginBtn loginPwdBtn" @click="judgeRegister" @keyup.enter="judgeRegister">
    </div>
    <div class="forgetLoginPwd"><a href="javascript:;" @click="openlogin" style="color: #a0a0a0; cursor: pointer;">忘记密码？</a></div>
    <div class="loginBg" v-show="showlogin">
      <div class="loginContent">
        <div class="loginCenter">
          <div class="textRight">
            <span class="closeloginBg" @click="closelogin">×</span>
          </div>
          <div class="flex">
            <div class="flex1_5">
              <h3>提示</h3>
              <h3>扫描二维码</h3>
              <h3>下载超宝宝理财App 找回密码!</h3>
            </div>
            <div class="flex1 textRight">
              <img src="../../../static/img/down-load.png" alt="">
              <h3 style="text-align: right;">扫描下载App</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .loginBg{
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
  .closeloginBg{
    font-size: 30px;
    margin-right: -50px;
    color: #ccc;
    cursor: pointer;
  }
  .loginContent{
    margin: 0 auto;
    /*display: table-cell;*/
    vertical-align: middle;
    position: absolute;
    top:35%;
    left: 50%;
    margin-top: -20px;
    margin-left: -360px;
  }
  .loginCenter{
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
  .loginCenter h3{
    font-size: 18px;
    text-align: left;
    margin-top: 10px;
  }
  .loginCenter img{
    width: 110px;
    height: 100px;
  }
</style>
<script>
  import {host, loginPwd, registQuery} from '@/assets/js/config.js'
  import {sha256} from 'js-sha256'
  export default {
    data () {
      return {
        phone: '',
        userPwd: '',
        errorMsg: '',
        showlogin: false
      }
    },
    methods: {
      closelogin () {
        this.showlogin = false
      },
      openlogin () {
        this.showlogin = true
      },
      judgeRegister () {
        this.$http.get(host + registQuery, {
          params: {
            phone: this.phone
          }
        }).then((response) => {
          let res = response.data
//          var regPhone = document.getElementById('phoneNumSet')
          if (this.phone === '') {
            this.errorMsg = '手机号不能为空'
          } else if ((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))) {
            if (res.code === -1) {
              this.errorMsg = res.msg
              setTimeout(() => {
                this.$router.push('/register')
              }, 1500)
            } else if (res.code === 0) {
              this.loginPwd()
            } else {
              this.errorMsg = res.msg
            }
          } else {
            if (this.phone === '10000000000' || this.phone === '11111111111' || this.phone === '12222222222' || this.phone === '13333333333' || this.phone === '14444444444' || this.phone === '15555555555' || this.phone === '16666666666' || this.phone === '17777777777' || this.phone === '18888888888' || this.phone === '19999999999') {
              this.loginPwd()
            } else {
              this.errorMsg = '手机号不合法'
            }
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      loginPwd () {
        this.$http.post(host + loginPwd, {
          phone: this.phone,
          pwd: sha256(this.userPwd)
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            window.localStorage.userName = this.phone
            window.localStorage.nickName = this.phone.substring(0, 3) + '*********'
            window.localStorage.userToken = res.token
            let nickName = this.phone.substring(0, 3) + '*********'
            this.$store.commit('updateLogin', true)
            this.$store.commit('updateNoLogin', false)
            this.$store.commit('updateNickName', nickName)
            if (window.sessionStorage.goBuyproMark === 'hqj') {
              this.$router.push('/hqj/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'novicehqj') {
              this.$router.push('/novicehqj/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'novicewzj30') {
              this.$router.push('/novicewzj30/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'novicewzj360') {
              this.$router.push('/novicewzj360/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'wzj30') {
              this.$router.push('/wzj30/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'wzj60') {
              this.$router.push('/wzj60/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'wzj90') {
              this.$router.push('/wzj90/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'wzj180') {
              this.$router.push('/wzj180/proDetail')
            } else if (window.sessionStorage.goBuyproMark === 'wzj360') {
              this.$router.push('/wzj360/proDetail')
            } else {
              this.$router.push('/homePage')
            }
          } else {
            this.errorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      }
    },
    computed: {
    }
  }
</script>
