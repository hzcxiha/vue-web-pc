<template>
  <div class="headWrap">
    <header class="head">
      <nav class="navWrap">
        <div class="logoWrap relative">
          <router-link to="/homePage">
            <a href="javascript:" @click="goTop">
              <div class="logoImgWrap">
                  <img style="width: 30px" src="../../../static/img/caibaosmall.png" alt="">
              </div>
              <div class="logoFontWrap">
                <h3 class="logoTitle">超宝宝理财</h3><br>
                <p class="logoFont">超宝宝，就在这里</p>
              </div>
            </a>
          </router-link>
        </div>
        <div class="goldPriceWrap">
          今日金价：<span class="goldPrice" 
          <!-- v-text="currentPrice" -->
          888.88</span><span class="goldUnit">元/克</span>
        </div>
        <ul class="nav">
          <li @click="goTop"><router-link to="/homePage">首页</router-link></li>
          <li @click="goTop"><router-link to="/productsPage" @click="goTop">我要投资</router-link></li>
          <li @click="goTop"><router-link to="/about" class="cpys" @click="goTop">产品优势</router-link></li>
          <li>
            <a href="javascript:;">安全保障</a>&nbsp;&nbsp;<i class="iconfont icon-right-copy" style="font-size: 12px;"></i>
            <ul class="secNav bgWhite">
              <li @click="goTop"><router-link to="/about/safetyPage">安全保障</router-link></li>
              <li @click="goTop"><router-link to="/about/aboutUs">关于我们</router-link></li>
              <li @click="goTop"><router-link to="/about/teamInfo">团队介绍</router-link></li>
              <li @click="goTop"><router-link to="/about/devHistory">发展历程</router-link></li>
              <li @click="goTop"><router-link to="/about/productAdvantage">产品优势</router-link></li>
              <li @click="goTop"><router-link to="/about/partner">合作伙伴</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="loginBtnWrap">
          <li v-if="isNoLogin">
            <a href="javascript:">注册/登录</a>&nbsp;&nbsp;<i class="iconfont icon-right-copy" style="font-size: 12px;"></i>
            <ul class="loginSecNav bgWhite">
              <li @click="goTop"><router-link to="/register">免费注册</router-link></li>
              <li @click="goTop"><router-link to="/login">请登录</router-link></li>
            </ul>
          </li>
          <li v-if="isLogin">
            <a href="javascript:" v-text="nickName">187********</a>&nbsp;&nbsp;<i class="iconfont icon-right-copy" style="font-size: 12px;"></i>
            <ul class="loginSecNav bgWhite">
              <li><router-link to="/account/asset">我的资产</router-link></li>
              <li><router-link to="/account/certification">实名认证</router-link></li>
              <li><router-link to="/account/records">交易记录</router-link></li>
              <li><router-link to="/account/accountSafety/safe">安全设置</router-link></li>
              <li><a href="javaScript:;" @click="signOut">安全退出</a></li>
            </ul>
          </li>
        </ul>
        <div class="downAPP">
          <span class="downFont">下载APP</span>
          <div class="ewm bgWhite">
            <img src="../../../static/img/down-load.png" alt="">
            <p>扫描二维码下载APP</p>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
  import {priceHost, historyPrice, signOut, host} from '@/assets/js/config.js'
  export default({
    data () {
      return {
        currentPrice: window.sessionStorage.currentPrice
//        nickName: window.localStorage.nickName
//        noLogin: true,
//        login: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getGoldPrice()
        this.getUserInfo()
      })
    },
    methods: {
      goTop () {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      getGoldPrice () {
        this.$http.get(priceHost + historyPrice).then(res => {
          window.sessionStorage.currentPrice = res.data.week[0].price
          this.currentPrice = window.sessionStorage.currentPrice
          this.$store.commit('upsetGoldPrice', res.data.week[0].price)
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      getUserInfo () {
        if (window.localStorage.userName === undefined) {
          this.$store.commit('updateLogin', false)
          this.$store.commit('updateNoLogin', true)
        } else {
          this.$store.commit('updateLogin', true)
          this.$store.commit('updateNoLogin', false)
        }
      },
      signOut () {
        this.$http({
          method: 'post',
          url: host + signOut,
          data: {
            phone: window.localStorage.userName
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          console.log(res)
          if (res.code === 0) {
            localStorage.clear()
            sessionStorage.clear()
            document.body.scrollTop = document.documentElement.scrollTop = 0
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
            this.$router.push('/homePage')
          } else if (res.code === -4) {
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
            this.$router.push('/homePage')
          }
//          this.noLogin = true
//          this.login = false
          console.log(res)
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.login
      },
      isNoLogin () {
        return this.$store.state.noLogin
      },
      nickName () {
        if (this.$store.state.nickName === '') {
          this.$store.commit('updateNickName', window.localStorage.nickName)
          return this.$store.state.nickName
        } else {
          return this.$store.state.nickName
        }
      }
    }
  })
</script>


