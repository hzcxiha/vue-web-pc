<template>
  <div class="tab active">
    <div class="tabCardCenter">
      <div class="proTitle">
        新手活期金
        <span class="newGx">新手专享高息</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">11.80%</div>
        <div class="cycle">活期（90天后自动卖出至账户余额）</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goNovice">
          </a>
        </div>
      </div>
      <div>
        <span class="yuQi">预期年华收益率</span>
        <span class="touZI">投资期限</span>
        <span class="nullWrap"></span>
      </div>
    </div>
    <div class="tabCardCenter">
      <div class="proTitle">
        新手稳赚金30天
        <span class="newGx" style="left: 140px">新手专享高息</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">18.00%</div>
        <div class="cycle">30天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goNoviceWzj30">
          </a>
        </div>
      </div>
      <div>
        <span class="yuQi">预期年华收益率</span>
        <span class="touZI">投资期限</span>
        <span class="nullWrap"></span>
      </div>
    </div>
    <div class="tabCardCenter">
      <div class="proTitle">
        新手稳赚金360天
        <span class="newGx" style="left: 145px">新手专享高息</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">18.00%</div>
        <div class="cycle">360天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goNoviceWzj360">
          </a>
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
      goNovice () {
        window.sessionStorage.buyMoney = ''
        this.$router.push('/novicehqj')
        document.body.scrollTop = document.documentElement.scrollTop = 0
        window.sessionStorage.iDays = 1
      },
      goNoviceWzj30 () {
        window.sessionStorage.buyMoney = ''
        this.$router.push('/novicewzj30')
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goNoviceWzj360 () {
        window.sessionStorage.buyMoney = ''
        this.$router.push('/novicewzj360')
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
</script>
