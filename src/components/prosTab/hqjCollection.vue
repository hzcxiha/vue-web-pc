<template>
  <div class="tab active">
    <div class="tabCardCenter">
      <div class="proTitle">
        活期金
        <span class="newGx">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">5%+1%</div>
        <div class="cycle">活期</div>
        <div class="buyBtnWrap">
          <a href="javascript:;"><input type="button" value="立即抢购" class="buyBtn go" @click="goHqj"></a>
        </div>
      </div>
      <div>
        <span class="yuQi">预期年华收益率</span>
        <span class="touZI">投资期限</span>
        <span class="nullWrap"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      goHqj () {
        window.sessionStorage.buyMoney = ''
        this.$router.push('/hqj')
        document.body.scrollTop = document.documentElement.scrollTop = 0
        window.sessionStorage.iDays = 1
      }
    }
  }
</script>
