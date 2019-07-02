<template>
  <div>
    <li id="aboutContent8">
      <h2 class="aboutMainTitle">媒体报道</h2>
      <section class="coverageWrap">
        <p>超宝宝理财的快速成长和迅猛发展，吸引了各界人士的关注，通过媒体朋友们的报道，使更多人加深了对我们的了解。</p>
        <div class="coverageCard">
          <div class="coverageCardImg">
            <img src="../../../../static/img/u4114.png" alt="">
          </div>
          <div class="coverageCardFont">
            <div @click="goTop()"><router-link to="/about/news8" >xxxxxxxxxx</router-link></div>
            <h4>xxxx-xx-xx</h4>
            <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          </div>
        </div>
      </section>
    </li>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    methods: {
      goTop () {
//        let y = document.getElementById('about_nav8').childNodes.item(0)
//        y.style.color = '#f2b643'
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
</script>
