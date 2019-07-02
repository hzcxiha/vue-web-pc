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
          <div class="loginCard bgWhite">
            <div class="tabBar flex border_Bottom">
              <span class="bar1 flex1"><router-link to="/login/pwdLogin" @click.native="bar1" :class="{'barActive': isBar1}">密码登录</router-link></span>
              <span class="bar2 flex1"><router-link to="/login/codeLogin" @click.native="bar2" :class="{'barActive': isBar2}">短信登录</router-link></span>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  .barActive{
    color: #f2b643;
  }
</style>
<script>
  import PwdLogin from './pwdLogin.vue'
  import CodeLogin from './codeLogin.vue'
  export default {
    data () {
      return {
        isBar1: true,
        isBar2: false,
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
    methods: {
      bar1 () {
        this.isBar1 = true
        this.isBar2 = false
      },
      bar2 () {
        this.isBar1 = false
        this.isBar2 = true
      }
    },
    components: {
      PwdLogin,
      CodeLogin
    }
  }
</script>
<style>
  .tabBar span:hover{
    color: #f2b643;
  }
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
