<template>
  <section class="rightFix bgWhite" v-show="showSlideBar">
    <ul class="rightFixUl">
      <li class="relative">
        <a href="javascript:;">电话</a>
        <div class="rightFixImgWrap bgWhite noPadding">
          <span class="kfrx">客服热线：4000-xx-xxxx</span>
        </div>
      </li>
      <li class="relative">
        <a href="javascript:;">APP</a>
        <div class="rightFixImgWrap bgWhite">
          <img src="../../../static/img/down-load.png" alt="">
          <p style="padding:3px 5px 2px 5px">扫描二维码下载APP</p>
        </div>
      </li>
      <li class="relative">
        <a href="javascript:;">公众号</a>
        <div class="rightFixImgWrap bgWhite">
          <img src="../../../static/img/1.png">
          <p>关注公众号不定期<br>参与抽奖活动</p>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  export default ({
    data () {
      return {
        showSlideBar: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.isShowSlide()
      })
    },
    methods: {
      isShowSlide () {
        if (document.body.clientWidth <= 1200) {
          this.showSlideBar = false
        } else {
          this.showSlideBar = true
        }
      }
    }
  })
</script>

