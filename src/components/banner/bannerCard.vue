<template>
  <section class="banner ">
    <div class="bannerMain relative">
      <div class="bgWhite fixedCard">
        <div class="fixedCardTop relative">
          <i class="iconfont icon-wending" style="font-size: 40px;color: #f2b643;display: inline-block"></i>
          <div class="fixedCardTopTitle ">
            <span>年化10%</span>&nbsp;<span>新手特权</span>
          </div><br>
          <span class="sykj">收益可提现</span>
        </div>
        <div class="fixedCardTop relative marginTop20">
          <img src="../../../static/img/n6.png" alt="">
          <div class="fixedCardTopTitle ">
            <span>xxxx实力注资5000万</span>
          </div><br>
          <span class="sykj">收益可提现</span>
        </div>
        <input type="button" value="注册领8888元" class="register888" @click="goRegister" v-if="isNoLogin">
        <input type="button" value="我要去投资" class="goInvest" @click="goToInvest" v-if="isLogin">
      </div>
    </div>
  </section>
</template>
<script>
  export default ({
    data () {
      return {
        register888: true,
        goInvest: false
      }
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    methods: {
      goRegister () {
        this.$router.push('/register')
      },
      goToInvest () {
        this.$router.push('/productsPage/noviceCollection')
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.login
      },
      isNoLogin () {
        return this.$store.state.noLogin
      }
    }
  })
</script>
