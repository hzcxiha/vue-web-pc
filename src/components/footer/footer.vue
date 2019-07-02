<template>
  <footer class="footer">
    <section class="footerWrap flex">
      <div class="flex1" style="border-right: 1px solid #fafafa;   ">
        <h3 class="footerJJ">平台简介</h3>
        <ul class="footerUl">
          <li @click="goTop();safetyPage()"><a href="javascript:;">安全保障</a></li>
          <li @click="goTop();aboutUs()"><a href="javascript:;">关于我们</a></li>
          <li @click="goTop();teamInfo()"><a href="javascript:;">团队介绍</a></li>
        </ul>
        <ul class="footerUl">
          <li @click="goTop();devHistory()"><a href="javascript:;">发展历程</a></li>
          <li @click="goTop();productAdvantage()"><a href="javascript:;">产品优势</a></li>
          <li @click="goTop();partner()"><a href="javascript:;">合作伙伴</a></li>
        </ul>
      </div>
      <div class="flex1">
        <div class="footerRightWrap relative">
          <ul class="footerIconWrap relative">
            <li>
              <img src="../../../static/img/u21.png" alt="">下载APP
              <div class="footImgWrap1 footImgWrap">
                <div class="sanJiaoTopWhite"></div>
                <img src="../../../static/img/down-load.png" alt="">
                <p style="padding:3px 5px 2px 5px">扫描二维码下载APP</p>
              </div>
            </li>
            <li>
              <img src="../../../static/img/u111.png" alt="">
              <div class="footImgWrap2 footImgWrap">
                <div class="sanJiaoTopWhite"></div>
                <img src="../../../static/img/1.png">
                <p style="padding:3px 5px 2px 5px">关注公众号不定期<br>参与抽奖活动</p>
              </div>
            </li>
            <li>
              <img src="../../../static/img/u128.png" alt="">
              <div class="footImgWrap3 footImgWrap">
                <div class="sanJiaoTopWhite"></div>
                <img src="../../../static/img/1.png">
              </div>
            </li>
          </ul>
          <ul class="footerRightUl">
            <li>
              <img src="../../../static/img/u117.png" alt="">
            </li>
            <li class="phoneNum">4000-xx-xxxx</li>
            <li>
              <p>工作日：9:00-17:30</p>
              <p>非工作日请留言</p>
            </li>
          </ul>
          <div class=""></div>
        </div>
      </div>
    </section>

    <section class="footerBottom">
      <p>©2017 超宝宝理财｜ 版权所有 ©超宝宝网 xxx有限公司 地址：xx市xx区xx路xx号xx</p>
      <p>电话：4000-xx-xxxx｜ XICP备xxxxxxxxx号</p>
    </section>
  </footer>
</template>
<script>
  export default {
    methods: {
      goTop () {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      safetyPage () {
        this.$router.push('/about/safetyPage')
      },
      aboutUs () {
        this.$router.push('/about/aboutUs')
      },
      teamInfo () {
        this.$router.push('/about/teamInfo')
      },
      devHistory () {
        this.$router.push('/about/devHistory')
      },
      productAdvantage () {
        this.$router.push('/about/productAdvantage')
      },
      partner () {
        this.$router.push('/about/partner')
      }
    }
  }
</script>
