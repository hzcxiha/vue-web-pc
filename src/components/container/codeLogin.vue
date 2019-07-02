<template>
  <div class="tab tab2 codeLogin" style="display: block;">
    <div class="infoWrap">
      <span class="registerName">手机号</span>
      <input type="phone" placeholder="请输入您的手机号码" class="phoneNumSet" maxlength="11" v-model="phoneNum" v-on:input="phoneLength">
    </div>
    <div class="infoWrap veri" v-show="veriShow">
      <span class="registerName">图形验证码</span>
      <input type="phone" placeholder="请输入结果" class="veriCode" maxlength="6" v-model="veriCode">
      <input type="button" value="" class="getVeriCode" @click="getVeriCode" v-model="veriCodeNum">
    </div>
    <div class="infoWrap">
      <span class="registerName">验证码</span>
      <input type="phone" placeholder="请输入验证码" class="phoneCode" maxlength="6" v-model="msgCode" @keyup.13="judgeReg">
      <input type="button" value="" class="getCode" @click="judgeRegister" v-model="timeNum">
    </div>
    <div class="voiceVerifyWrap" v-if="showVoice"><span>未收到短信？</span>&nbsp;<span class="voiceVerifyBtn" @click="getVoiceCode">使用语音验证</span></div>
    <div class="errorMsg" v-text="errorMsg"></div>
    <div class="loginButtonWrap">
      <input type="button" value="登录" class="loginBtn loginCodeBtn" @click="judgeReg" @keyup.13="judgeReg">
    </div>
  </div>
</template>
<script>
//  import axios from 'axios'
  import {host, sms, loginCode, voiceVeri, registQuery, veri} from '@/assets/js/config.js'
  export default {
    data () {
      return {
        veriShow: false,
        phoneNum: '',
        veriCode: '',
        veriCodeNum: '',
        usageNum: '0',
        msgCode: '',
        timeNum: '点我获取',
        errorMsg: '',
        showVoice: false
      }
    },
    methods: {
      getVeriCode () {
        this.$http.get(host + veri, {
          params: {
            phone: this.phoneNum
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.veriCodeNum = res.expression
          } else {
            this.errorMsg = res.msg
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      judgeRegister () {
        this.$http.get(host + registQuery, {
          params: {
            phone: this.phoneNum
          }
        }).then((response) => {
          let res = response.data
//          var regPhone = document.getElementById('phoneNumSet')
          if (this.phoneNum === '') {
            this.errorMsg = '手机号不能为空'
          } else if ((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phoneNum))) {
            if (this.veriCode === '') {
              this.errorMsg = '请输入图形验证结果'
            } else {
              if (res.code === -1) {
                this.errorMsg = res.msg
                setTimeout(() => {
                  this.$router.push('/register')
                }, 1500)
              } else if (res.code === 0) {
                this.getCodeNum()
              } else {
                this.errorMsg = res.msg
              }
            }
          } else {
            this.errorMsg = '手机号不合法'
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      judgeReg () {
        this.$http.get(host + registQuery, {
          params: {
            phone: this.phoneNum
          }
        }).then((response) => {
          let res = response.data
//          var regPhone = document.getElementById('phoneNumSet')
          if (this.phoneNum === '') {
            this.errorMsg = '手机号不能为空'
          } else if ((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phoneNum))) {
            if (res.code === -1) {
              this.errorMsg = res.msg
              setTimeout(() => {
                this.$router.push('/register')
              }, 1500)
            } else if (res.code === 0) {
              this.login()
            } else {
              this.errorMsg = res.msg
            }
          } else {
            this.errorMsg = '手机号不合法'
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      getCodeNum () {
        this.$http.interceptors.request.use((config) => {
          console.log(config)
          return config
        }, (err) => {
          return Promise.reject(err)
        })
        this.$http.post(host + sms, {
          phone: this.phoneNum,
          usage: this.usageNum,
          result: this.veriCode
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            this.errorMsg = res.msg
            let getCode = document.getElementsByClassName('getCode')[0]
            getCode.disabled = true
            this.timeNum = 60
            var timer2 = setInterval(() => {
              this.timeNum--
              if (this.timeNum <= 0) {
                clearInterval(timer2)
                getCode.disabled = false
                this.timeNum = '重新获取'
                this.errorMsg = ''
                this.showVoice = true
              }
            }, 1000)
          } else {
            this.errorMsg = res.msg
          }
        }).catch((result) => {
          let res = result.data
          this.errorMsg = res.msg
        })
      },
      getVoiceCode () {
        this.$http.post(host + voiceVeri, {
          phone: this.phoneNum,
          usage: this.usageNum
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            this.errorMsg = res.msg
          } else {
            this.errorMsg = res.msg
          }
        })
      },
      login () {
        this.$http.post(host + loginCode, {
          phone: this.phoneNum,
          veriCode: this.msgCode
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            window.localStorage.userName = this.phoneNum
            window.localStorage.nickName = this.phoneNum.substring(0, 3) + '*********'
            window.localStorage.userToken = res.token
            let nickName = this.phoneNum.substring(0, 3) + '*********'
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
        }).catch((result) => {
          let res = result.data
//          this.errorMsg = res.msg
          console.log(res)
        })
      }
    },
    computed: {
      phoneLength: function () {
        if (this.phoneNum.length === 11) {
          this.veriShow = true
          this.getVeriCode()
        } else {
          this.veriShow = false
        }
      }
    }
  }
</script>
