<template>
  <div class="recordContentTitle">
    <div class="recordBtn" @click="changeAll" :class="{'recordActive':activeAll}">
      <router-link to="/account/records/all">全部类型</router-link>
    </div>
    <div @click="changeWzj"  class="recordBtn" :class="{'recordActive':activeWzj}">
      <router-link to="/account/records/wzj">稳赚金</router-link>
    </div>
    <div class="recordBtn" @click="changeHqj" :class="{'recordActive':activeHqj}">
      <router-link to="/account/records/hqj">活期金</router-link>
    </div>
    <div class="recordBtn" @click="changeWithdraw" :class="{'recordActive':activeWithdraw}">
      <router-link to="/account/records/withdraw">提现</router-link>
    </div>
    <div class="recordBtn" @click="changeRecharge" :class="{'recordActive':activeRecharge}">
      <router-link to="/account/records/recharge">充值</router-link>
    </div>
  </div>
</template>
<style>
  .recordActive{
    color: #f2b643;
    border: 1px solid #f2b643;
  }
  .recordActive a{
    color: #f2b643;
  }
  .recordContentTitle a{
    width: 100%;
    display: inline-block;
  }
</style>
<script>
  export default {
    data () {
      return {
        activeAll: true,
        activeWzj: false,
        activeHqj: false,
        activeWithdraw: false,
        activeRecharge: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.whoShow()
      })
    },
    methods: {
      changeAll () {
        this.activeAll = true
        this.activeWzj = false
        this.activeHqj = false
        this.activeWithdraw = false
        this.activeRecharge = false
      },
      changeWzj () {
        this.activeAll = false
        this.activeWzj = true
        this.activeHqj = false
        this.activeWithdraw = false
        this.activeRecharge = false
      },
      changeHqj () {
        this.activeAll = false
        this.activeWzj = false
        this.activeHqj = true
        this.activeWithdraw = false
        this.activeRecharge = false
      },
      changeWithdraw () {
        this.activeAll = false
        this.activeWzj = false
        this.activeHqj = false
        this.activeWithdraw = true
        this.activeRecharge = false
      },
      changeRecharge () {
        this.activeAll = false
        this.activeWzj = false
        this.activeHqj = false
        this.activeWithdraw = false
        this.activeRecharge = true
      },
      whoShow () {
        if (this.$route.path.indexOf('wzj') >= 0) {
          this.activeAll = false
          this.activeWzj = true
          this.activeHqj = false
          this.activeWithdraw = false
          this.activeRecharge = false
        } else if (this.$route.path.indexOf('all') >= 0) {
          this.activeAll = true
          this.activeWzj = false
          this.activeHqj = false
          this.activeWithdraw = false
          this.activeRecharge = false
        } else if (this.$route.path.indexOf('hqj') >= 0) {
          this.activeAll = false
          this.activeWzj = false
          this.activeHqj = true
          this.activeWithdraw = false
          this.activeRecharge = false
        } else if (this.$route.path.indexOf('withdraw') >= 0) {
          this.activeAll = false
          this.activeWzj = false
          this.activeHqj = false
          this.activeWithdraw = true
          this.activeRecharge = false
        } else if (this.$route.path.indexOf('recharge') >= 0) {
          this.activeAll = false
          this.activeWzj = false
          this.activeHqj = false
          this.activeWithdraw = false
          this.activeRecharge = true
        }
      }
    }
  }
</script>
