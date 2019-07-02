<template>
  <div class="tab active">
    <div class="tabCardCenter">
      <div class="proTitle">
        稳赚金30天
        <span class="newGx">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">5%+1%</div>
        <div class="cycle">30天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goWzj30">
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
        稳赚金60天
        <span class="newGx">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">6%+1%</div>
        <div class="cycle">60天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goWzj60">
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
        稳赚金90天
        <span class="newGx">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">7%+1%</div>
        <div class="cycle">90天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goWzj90">
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
        稳赚金180天
        <span class="newGx" style="left: 110px">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">8%+1%</div>
        <div class="cycle">180天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goWzj180">
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
        稳赚金360天
        <span class="newGx" style="left: 110px">限时加息1%</span>
      </div>
      <div class="tabCardCenterMid">
        <div class="lx">9%+1%</div>
        <div class="cycle">360天</div>
        <div class="buyBtnWrap">
          <a href="javascript:;">
            <input type="button" value="立即抢购" class="buyBtn" @click="goWzj360">
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
      goWzj30 () {
        this.$router.push('/wzj30')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goWzj60 () {
        this.$router.push('/wzj60')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goWzj90 () {
        this.$router.push('/wzj90')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goWzj180 () {
        this.$router.push('/wzj180')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goWzj360 () {
        this.$router.push('/wzj360')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
</script>
