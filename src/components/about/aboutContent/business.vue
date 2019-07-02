<template>
  <li id="aboutContent7">
    <h2 class="aboutMainTitle">商业模式</h2>
    <section class="businessModel">
      <div class="businessModelImgWrap">
        <img src="../../../../static/img/00000.png" alt="">
      </div>
      <h3 class="DevOpsTitle">超宝宝理财运营模式</h3>
    </section>
    <div class="wrapBg" v-show="isShow">
      <div class="videoWrap">
        <video id="myvideo" class="videoPlay" loop="loop" style="width: 100%" controls>
          <source src="http://video.zhaocaiweb.com/huoqijinwenzhuanjin.mp4" type="video/mp4" />
          您的浏览器不支持 HTML5 视频,请更换浏览器。比如 Chrome 、 Firefox 等主流浏览器。
        </video>
      </div>
      <div class="closeVideo" @click="clooseVedio">关闭</div>
    </div>
  </li>
</template>
<script>
  export default {
    data () {
      return {
        isShow: false,
        playStatus: '',
        isPlay: false
      }
    },
    methods: {
      showVedio () {
        this.isShow = true
        this._dom = document.getElementById('myvideo')
        this.isPlay = !this.isPlay
        this._dom.play()
      },
      clooseVedio () {
        this.isShow = false
        this._dom = document.getElementById('myvideo')
        this.isPlay = false
        this._dom.pause()
      }
    }
  }
</script>
