<template>
  <div class="accountSafetyContent">
    <div class="accountContentTitle">账户安全</div>
    <div class="accountSafetyWrap">
      <div class="accountSafetyList borderBottom flex">
        <div class="flex1">
          <img src="../../../static/img/u6679.png" alt="">
          <span>登录密码</span>
        </div>
        <div class="flex2 textCenter">登录超宝宝理财账户时需要输入密码</div>
        <div class="flex1 textRight colorYE"> <span class="goReviseLoginPwd" @click="goResetLogin">修改&nbsp;＞</span></div>
      </div>
      <div class="accountSafetyList flex">
        <div class="flex1">
          <img src="../../../static/img/u6678.png" alt="">
          <span>交易密码</span>
        </div>
        <div class="flex2 textCenter">保障资金安全，提现投资等资金相关操作时使用</div>
        <div class="flex1 textRight colorYE"><span class="goRevisePayPwd" @click="goSetPayPwd"><span v-text="revise">修改</span>&nbsp;＞</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {host, paypwd} from '@/assets/js/config.js'
  export default {
    data () {
      return {
        revise: '修改'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.isSetPayPwd()
      })
    },
    methods: {
      isSetPayPwd () {
        this.$http.interceptors.request.use((config) => {
          console.log(config)
          return config
        }, (err) => {
          return Promise.reject(err)
        })
        this.$http.get(host + paypwd, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            this.revise = '修改'
          } else if (res.code === -1) {
            this.revise = '设置'
          }
          console.log(res)
        }).catch((result) => {
        })
      },
      goResetLogin () {
        this.$router.push('/account/accountSafety/resetLoginPwd')
      },
      goSetPayPwd () {
        this.$http.get(host + paypwd, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            this.$router.push('/account/accountSafety/resetPayPwd')
          } else if (res.code === -1) {
            this.$router.push('/account/accountSafety/setPayPwd')
          } else if (res.code === -3 || res.code === -4) {
            this.$route.push('/login/pwdLogin')
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
          }
          console.log(res)
        }).catch((result) => {
        })
      }
    }
  }
</script>
