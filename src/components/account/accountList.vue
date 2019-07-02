<template>
  <div class="accountTitle">
    <ul>
      <li @click="activeColor">
        <a href="javascript:;" id="asset" @click="goAsset">我的资产</a>
        <!--<router-link to="/account/asset" id="asset" >我的资产</router-link>-->
      </li>
      <li @click="activeColor">
        <a href="javascript:;" id="certification" @click="goCertification">实名认证</a>
        <!--<router-link to="/account/certification" id="certification">实名认证</router-link>-->
      </li>
      <li @click="activeColor">
        <a href="javascript:;" id="record" @click="goRecord">交易记录</a>
        <!--<router-link to="/account/records" id="record">交易记录</router-link>-->
      </li>
      <li @click="activeColor">
        <a href="javascript:;" id="safety" @click="goSafety">账户安全</a>
        <!--<router-link to="/account/accountSafety" id="safety">账户安全</router-link>-->
      </li>
      <li @click="activeColor">
        <a href="javascript:;" id="logout" @click="signout">安全退出</a>
      </li>
    </ul>
  </div>
</template>
<style>
  .accountTitleActive{
    color: #fff;
  }
</style>
<script>
  import {host, signOut} from '@/assets/js/config.js'
  export default {
    data () {
      return {
//        active: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.activeColor()
      })
    },
    methods: {
      activeColor () {
        if (this.$route.path.indexOf('asset') >= 0) {
          let asset = document.getElementById('asset')
          let certification = document.getElementById('certification')
          let record = document.getElementById('record')
          let safety = document.getElementById('safety')
          let logout = document.getElementById('logout')
          asset.style.color = '#fff'
          record.style.color = '#999'
          safety.style.color = '#999'
          logout.style.color = '#999'
          certification.style.color = '#999'
        } else if (this.$route.path.indexOf('certification') >= 0) {
          let certification = document.getElementById('certification')
          let asset = document.getElementById('asset')
          let record = document.getElementById('record')
          let safety = document.getElementById('safety')
          let logout = document.getElementById('logout')
          certification.style.color = '#fff'
          asset.style.color = '#999'
          record.style.color = '#999'
          safety.style.color = '#999'
          logout.style.color = '#999'
        } else if (this.$route.path.indexOf('records') >= 0) {
          let certification = document.getElementById('certification')
          let asset = document.getElementById('asset')
          let record = document.getElementById('record')
          let safety = document.getElementById('safety')
          let logout = document.getElementById('logout')
          certification.style.color = '#999'
          asset.style.color = '#999'
          record.style.color = '#fff'
          safety.style.color = '#999'
          logout.style.color = '#999'
        } else if (this.$route.path.indexOf('accountSafety') >= 0) {
          let certification = document.getElementById('certification')
          let asset = document.getElementById('asset')
          let record = document.getElementById('record')
          let safety = document.getElementById('safety')
          let logout = document.getElementById('logout')
          certification.style.color = '#999'
          asset.style.color = '#999'
          record.style.color = '#999'
          safety.style.color = '#fff'
          logout.style.color = '#999'
        }
      },
      goAsset () {
        this.$router.push('/account/asset')
      },
      goCertification () {
        this.$router.push('/account/certification')
      },
      goRecord () {
        this.$router.push('/account/records')
      },
      goSafety () {
        this.$router.push('/account/accountSafety/safe')
      },
      signout () {
        this.$http.post(host + signOut, {
          phone: window.localStorage.userName
        }, {
          headers: {
            'token': window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          console.log(res)
          if (res.code === 0) {
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
            this.$router.push('/homePage')
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }
          console.log(res)
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      }
    }
  }
</script>
