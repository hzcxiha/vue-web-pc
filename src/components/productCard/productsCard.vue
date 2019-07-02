<template>
  <section class="productWrap">
    <div class="pageCenter">
      <div class="productWrapTitle">
        <span class="rowLine"></span>
        <div class="titleTop">
          <span class="titleTopFont">产品多选</span><br>
          <span class="titleTopFontEng">diverse products</span><br>
          <span class="bottomLine"></span><br>
        </div>
        <span class="rowLine"></span>
      </div>
      <div class="productContent">
        <ul>
          <li class="productCard">
            <div class="xinShou">
              <img src="../../../static/img/newUsersUse.png" alt="">
            </div>
            <h3 class="productCardTitle">新手活期金</h3>
            <div class="textCenter">
              <span class="bigNum">11.8</span><span class="smallNum">%</span>
            </div>
            <p class="productCardSYL">预期年化收益率</p>
            <div class="proCircle flex">
              <div class="flex1">90天</div>
              <div class="flex1">100元起购</div>
            </div>
            <div class="productCardBtnWrap">
              <input type="button" class="productCardBtn" value="立即抢购" @click="goNovice">
            </div>
          </li>
          <li class="productCard">
            <div class="xinShou"><img src="../../../static/img/newUsersUse.png" alt=""></div>
            <h3 class="productCardTitle">新手30天稳赚金</h3>
            <div class="textCenter">
              <span class="bigNum">18</span><span class="smallNum">%</span>
            </div>
            <p class="productCardSYL">预期年化收益率</p>
            <div class="proCircle flex">
              <div class="flex1">30天</div>
              <div class="flex1">100元起购</div>
            </div>
            <div class="productCardBtnWrap">
              <input type="button" class="productCardBtn" value="立即抢购" @click="goNoviceWzj30">
            </div>
          </li>
          <li class="productCard">
            <div class="xinShou"><img src="../../../static/img/newUsersUse.png" alt=""></div>
            <h3 class="productCardTitle">新手360天稳赚金</h3>
            <div class="textCenter">
              <span class="bigNum">18</span><span class="smallNum">%</span>
            </div>
            <p class="productCardSYL">预期年化收益率</p>
            <div class="proCircle flex">
              <div class="flex1">360天</div>
              <div class="flex1">100元起购</div>
            </div>
            <div class="productCardBtnWrap">
              <input type="button" class="productCardBtn" value="立即抢购" @click="goNoviceWzj360">
            </div>
          </li>
          <li class="productCard">
            <div class="tuiJian"><img src="../../../static/img/u255.png" alt=""></div>
            <h3 class="productCardTitle">活期金</h3>
            <div class="textCenter">
              <span class="bigNum">4</span><span class="smallNum">%</span><span class="bigNum">+</span><span class="bigNum">2</span><span class="smallNum">%</span>
            </div>
            <p class="productCardSYL">预期年化收益率</p>
            <div class="proCircle flex">
              <div class="flex1">活期</div>
              <div class="flex1">100元起购</div>
            </div>
            <div class="productCardBtnWrap">
              <input type="button" class="productCardBtn" value="立即抢购" @click="goHqj">
            </div>
          </li>
          <li class="productCard">
            <div class="tuiJian"><img src="../../../static/img/u255.png" alt=""></div>
            <h3 class="productCardTitle">30天稳赚金</h3>
            <div class="textCenter">
              <span class="bigNum">5</span><span class="smallNum">%</span><span class="bigNum">+</span><span class="bigNum">1</span><span class="smallNum">%</span>
            </div>
            <p class="productCardSYL">预期年化收益率</p>
            <div class="proCircle flex">
              <div class="flex1">30天</div>
              <div class="flex1">100元起购</div>
            </div>
            <div class="productCardBtnWrap">
              <input type="button" class="productCardBtn" value="立即抢购" @click="goWzj30">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style>
  .productWrap{
    padding:100px 0 0 0 !important;
  }
</style>
<script>
  export default {
    methods: {
      goNovice () {
        window.sessionStorage.buyMoney = ''
        this.$router.push('/novicehqj')
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goNoviceWzj30 () {
        this.$router.push('/novicewzj30')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goNoviceWzj360 () {
        this.$router.push('/novicewzj360')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goHqj () {
        this.$router.push('/hqj')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      goWzj30 () {
        this.$router.push('/wzj30')
        window.sessionStorage.buyMoney = ''
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
</script>

