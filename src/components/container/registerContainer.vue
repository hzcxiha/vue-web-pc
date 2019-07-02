<template>
  <section class="container">
    <div class="containerWrap">
      <div class="containerContent">
        <div class="containerLeft">
          <div class="containerLeftSlide">
            <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
              <!-- slides -->
              <swiper-slide class="swiper-item">
                <img src="../../../static/img/4.jpg" alt="">
                <div class="swiperFont">1111<br>2222</div>
              </swiper-slide>
              <swiper-slide class="swiper-item">
                <img src="../../../static/img/5.jpg" alt="">
                <div class="swiperFont">333<br>444</div>
              </swiper-slide>
              <swiper-slide class="swiper-item">
                <img src="../../../static/img/6.jpg" alt="">
                <div class="swiperFont">555<br>666</div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="containerRight bgWhite">
          <div class="registerCard bgWhite">
            <h3 class="freeRegisterFont">免费注册，新手投资送8888元体验金</h3>
            <div class="registerCardInfo">
              <div class="infoWrap">
                <span class="registerName">手机号</span>
                <input type="phone" placeholder="请输入您的手机号码" id="phoneNumSet" class="phoneNumSet" maxlength="11" v-model="regPhoneNum" v-on:input="phoneLength">
              </div>
              <div class="infoWrap veri" v-show="veriShow">
                <span class="registerName">图形验证码</span>
                <input type="phone" placeholder="请输入结果" class="veriCode" maxlength="6" v-model="veriCode">
                <input type="button" value="" class="getVeriCode" @click="getVeriCode" v-model="veriCodeNum">
              </div>
              <div class="infoWrap">
                <span class="registerName">手机验证码</span>
                <input type="phone" placeholder="请输入验证码" class="phoneCode" maxlength="6" v-model="phoneCode">
                <input type="button" value="" class="getCode" @click="judgeRegister" v-model="timeNum">
              </div>
              <div class="infoWrap">
                <span class="registerName">设置密码</span>
                <input type="password" placeholder="6-16位字符组成" class="pwdNum" maxlength="16" minlength="6" v-model="setPwd" @keyup.13="register">
              </div>
            </div>
            <div class="errorMsg" v-text="errorMsg"></div>
            <div class="protocolWrap">
              <span class="chooseBtn agree"><img src="../../../static/img/duihao.png" alt=""></span>同意 <a href="javascript:;">《超宝宝理财服务协议》</a>
            </div>
            <div class="regstBtnWrap">
              <input type="button" value="领取8888元" class="regstBtn" @click="register" @keyup.13="register">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  .agree{
    text-align: center;
    line-height: 6px;
  }
  .agree img{
    width: 100%;
    vertical-align: middle;
  }
</style>
<script>
  import axios from 'axios'
  import {host, sms, regist, registQuery, loginpwd, veri} from '@/assets/js/config.js'
  import {sha256} from 'js-sha256'
  export default {
    data () {
      return {
        veriShow: false,
        timeNum: '点击获取',
        phoneCode: '',
        regPhoneNum: '',
        setPwd: '',
        errorMsg: '',
        veriCode: '',
        veriCodeNum: '',
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          autoHeight: true,
          onTransitionStart (swiper) {
//            console.log(swiper)
          }
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    methods: {
      getVeriCode () {
        this.$http.get(host + veri, {
          params: {
            phone: this.regPhoneNum
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
            phone: this.regPhoneNum
          }
        }).then((response) => {
          let res = response.data
//          var regPhone = document.getElementById('phoneNumSet')
          if (this.regPhoneNum === '') {
            this.errorMsg = '手机号不能为空'
          } else if ((/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.regPhoneNum))) {
            if (this.veriCode === '') {
              this.errorMsg = '请输入图形验证结果'
            } else {
              if (res.code === -1) {
                this.getsms()
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
      getsms () {
        axios.post(host + sms, {
          phone: this.regPhoneNum,
          usage: '1',
          result: this.veriCode
        }).then((result) => {
          let res = result.data
          if (res.code === 0) {
            let getCode = document.getElementsByClassName('getCode')[0]
            getCode.disabled = true
            this.timeNum = 60
            var timer2 = setInterval(() => {
              this.timeNum--
              if (this.timeNum <= 0) {
                clearInterval(timer2)
                getCode.disabled = false
                this.timeNum = '重新获取'
              }
            }, 1000)
          } else {
            this.errorMsg = res.msg
          }
          console.log(res)
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
        this.errorMsg = ''
      },
      setLoginPwd () {
        this.$http.put(host + loginpwd, {
          phone: this.regPhoneNum,
          pwd: sha256(this.setPwd)
        }, {
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.$router.push('/homePage')
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      register () {
        if (this.regPhoneNum === '') {
          this.errorMsg = '请输入手机号'
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.regPhoneNum))) {
          this.errorMsg = '手机号不合法'
        } else if (this.veriCode === '') {
          this.errorMsg = '请输入图形验证结果'
        } else if (this.phoneCode === '') {
          this.errorMsg = '请输入短信验证码'
        } else if (this.phoneCode.length < 6) {
          this.errorMsg = '请输入6位短信验证码'
        } else if (this.setPwd === '') {
          this.errorMsg = '请设置您的登录密码'
        } else {
          this.$http.post(host + regist, {
            phone: this.regPhoneNum,
            veriCode: this.phoneCode,
            registFrom: 'pc',
            registChannel: 'web'
          }).then((response) => {
            let res = response.data
            if (res.code === 0) {
              window.localStorage.userName = this.regPhoneNum
              window.localStorage.nickName = this.regPhoneNum.substring(0, 3) + '*********'
              window.localStorage.userToken = res.token
              let nickName = this.regPhoneNum.substring(0, 3) + '*********'
              this.$store.commit('updateLogin', true)
              this.$store.commit('updateNoLogin', false)
              this.$store.commit('updateNickName', nickName)
              this.setLoginPwd()
            } else {
              this.errorMsg = res.msg
            }
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        }
      }
    },
    computed: {
      phoneLength: function () {
        if (this.regPhoneNum.length === 11) {
          this.veriShow = true
          this.getVeriCode()
        } else {
          this.veriShow = false
        }
      }
    }
  }
</script>
<style>
  .containerLeftSlide{
    margin-top: 55px;
    min-width: 400px;
    max-width: 400px;
    /*min-height: 260px;*/
    overflow: hidden;
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .swiper-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    -ms-transition-property: -ms-transform;
    transition-property: transform;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .containerLeftSlide .swiper-slide img{
    width: 400px;
  }
</style>

