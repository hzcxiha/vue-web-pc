<template>
    <div class="accountContent">
      <div class="dataConfluence">
        <ul>
          <li>
            <div class="totalAssetsTitle">总资产（元）</div>
            <div class="totalAssetsNum" v-text="asset">0.00</div>
          </li>
          <li>
            <div class="totalAssetsTitle">昨日总收益（元）</div>
            <div class="totalAssetsNum" v-text="earnYtdSum">0.00</div>
          </li>
          <li>
            <div class="totalAssetsTitle">账户余额（元）</div>
            <div class="totalAssetsNum" v-text="balance">0.00</div>
          </li>
          <div class="clear"></div>
        </ul>
      </div>
      <div class="accountDetails">
        <div class="accountDetailsContent">
          <div class="tabWrap">
            <span class="tabWzj" @click="tabActiveWzj" :class="{'tabActive':activeWzj}">稳赚金</span>
            <span class="tabHqj" @click="tabActiveHqj" :class="{'tabActive':activeHqj}">活期金</span>
          </div>
          <div class="tabContentWzj" v-if="showWzj">
            <ul class="">
              <li>持有资产</li>
              <li>总预期收益</li>
              <li>累计购买</li>
              <li>累计收益</li>
              <div class="clear"></div>
            </ul>
            <ul class="tabContentNum">
              <li v-text="wenzhuanGoldSum">2.00元</li>
              <li v-text="wzjearnSum">1.00元</li>
              <li v-text="wenzhuanBuySum">3.00元</li>
              <li v-text="wenzhuanEarnSum">4.00元</li>
              <div class="clear"></div>
            </ul>
          </div>
          <div class="tabContentHqj" v-if="showHqj">
            <ul class="">
              <li>活期金资产</li>
              <li>昨日收益（元）</li>
              <li>累计收益（元）</li>
              <div class="clear"></div>
            </ul>
            <ul class="tabContentNum">
              <li v-text="huoqiGoldSum">2.00元</li>
              <li v-text="huoqiEarnYtd">1.00元</li>
              <li v-text="huoqiEarnSum">3.00元</li>
              <div class="clear"></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {host, assetQuery, wenzhuanGold, wzjEarnSum, cgQuery} from '@/assets/js/config.js'
  export default {
    data () {
      return {
        activeWzj: true,
        activeHqj: false,
        showWzj: true,
        showHqj: false,
        balance: '0',
        asset: '0',
        earnYtdSum: '0',
        wenzhuanGoldSum: '0',
        wenzhuanEarnSum: '0',
        wenzhuanBuySum: '0',
        wzjearnSum: '0',
        huoqiEarnYtd: '0',
        huoqiGoldSum: '0',
        huoqiEarnSum: '0'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getAsset()
      })
    },
    methods: {
      tabActiveWzj () {
        this.activeWzj = true
        this.activeHqj = false
        this.showWzj = true
        this.showHqj = false
      },
      tabActiveHqj () {
        this.activeWzj = false
        this.activeHqj = true
        this.showWzj = false
        this.showHqj = true
      },
      getAsset () {
        this.$http.get(host + assetQuery, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            let assetNum = parseFloat(res.asset.balance) + parseFloat(res.asset.huoqiGoldSum) + parseFloat(res.asset.qiandaiGoldSum * this.$store.state.goldPrice) + parseFloat(res.asset.jinshengGoldSum * this.$store.state.goldPrice) + parseFloat(res.asset.wenzhuanGoldSum)
            this.balance = Math.floor(parseFloat(res.asset.balance) * 100) / 100
            this.asset = Math.floor(parseFloat(assetNum) * 100) / 100
            this.earnYtdSum = Math.floor(parseFloat(res.asset.earnYtdSum) * 100) / 100
          } else if (res.code === -3 || res.code === -4) {
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
            this.$route.push('/login/pwdLogin')
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
        this.$http.get(host + wenzhuanGold, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          this.wenzhuanGoldSum = Math.floor(parseFloat(res.asset.wenzhuanGoldSum) * 100) / 100 + '元'
          this.wenzhuanEarnSum = Math.floor(parseFloat(res.asset.wenzhuanEarnSum) * 100) / 100 + '元'
          this.wenzhuanBuySum = Math.floor(parseFloat(res.asset.wenzhuanBuySum) * 100) / 100 + '元'
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
        this.$http.get(host + wzjEarnSum, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          if (isNaN(parseFloat(res.earnSum))) {
            this.wzjearnSum = 0 + '元'
          } else {
            this.wzjearnSum = Math.floor(parseFloat(res.earnSum) * 100) / 100 + '元'
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
        this.$http.get(host + cgQuery, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          console.log(res)
          this.huoqiEarnYtd = Math.floor(parseFloat(res.asset.huoqiEarnYtd) * 100) / 100 + '元'
          this.huoqiGoldSum = Math.floor(parseFloat(res.asset.huoqiGoldSum) * 100) / 100 + '元'
          this.huoqiEarnSum = Math.floor(parseFloat(res.asset.huoqiEarnSum) * 100) / 100 + '元'
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      }
    }
  }
</script>
