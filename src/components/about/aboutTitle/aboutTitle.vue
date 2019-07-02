<template>
    <ul id="aboutNav">
      <!--<li v-for="(item,index) in msg" @click="jump(index)">{{item.message}}</li>-->
      <li id="about_nav1" @click="colorDefault"><router-link to="/about/safetyPage" v-bind:class="{showAboutActive: aboutActive1}">安全保障</router-link></li>
      <li id="about_nav2" @click="colorDefault"><router-link to="/about/aboutUs" v-bind:class="{showAboutActive: aboutActive2}">关于我们</router-link></li>
      <li id="about_nav3" @click="colorDefault"><router-link to="/about/teamInfo" v-bind:class="{showAboutActive: aboutActive3}">团队介绍</router-link></li>
      <li id="about_nav4" @click="colorDefault"><router-link to="/about/devHistory" v-bind:class="{showAboutActive: aboutActive4}">发展历程</router-link></li>
      <li id="about_nav5" @click="colorDefault"><router-link to="/about/productAdvantage" v-bind:class="{showAboutActive: aboutActive5}">产品优势</router-link></li>
      <li id="about_nav6" @click="colorDefault"><router-link to="/about/partner" v-bind:class="{showAboutActive: aboutActive6}">合作伙伴</router-link></li>
      <li id="about_nav7" @click="colorDefault"><router-link to="/about/business" v-bind:class="{showAboutActive: aboutActive7}">商业模式</router-link></li>
      <li id="about_nav8"><router-link to="/about/mediaReport" v-bind:class="{showAboutActive: aboutActive8}">媒体报道</router-link></li>
      <li id="about_nav9" @click="colorDefault"><router-link to="/about/honour" v-bind:class="{showAboutActive: aboutActive9}">荣誉资质</router-link></li>
      <li id="about_nav10" @click="colorDefault"><router-link to="/about/recruit" v-bind:class="{showAboutActive: aboutActive10}">招聘信息</router-link></li>
      <li id="about_nav11" @click="colorDefault"><router-link to="/about/workEnv" :class="{showAboutActive: aboutActive11}">办公环境</router-link></li>
    </ul>
</template>
<style>
  #aboutNav li{
    color:#222;
  }
  #aboutNav li a{
    height: inherit;
    width: 100%;
    display: block;
  }
  #aboutNav li .showAboutActive{
    color: #f2b643 !important;
  }
</style>
<script>
  export default {
    data () {
      return {
        aboutActive1: false,
        aboutActive2: false,
        aboutActive3: false,
        aboutActive4: false,
        aboutActive5: false,
        aboutActive6: false,
        aboutActive7: false,
        aboutActive8: false,
        aboutActive9: false,
        aboutActive10: false,
        aboutActive11: false
//        msg: [
//          { message : '安全保障'},
//          { message : '关于我们'},
//          { message : '团队介绍'},
//          { message : '发展历程'},
//          { message : '产品优势'},
//          { message : '合作伙伴'},
//          { message : '商业模式'},
//          { message : '媒体报道'},
//          { message : '荣誉资质'},
//          { message : '招聘信息'},
//          { message : '办公环境'}
//        ]
      }
    },
    methods: {
      colorDefault () {
        let y = document.getElementById('about_nav8').childNodes.item(0)
//        console.log(y)
        y.style.color = '#222'
      }
//      jump (index) {
//        console.log(this.msg[index].message)
//        if (this.msg[index].message === '安全保障') {
//          this.$router.push('/about/safetyPage')
//        } else if (this.msg[index].message === '关于我们') {
//          this.$router.push('/about/aboutUs')
//        } else if (this.msg[index].message === '团队介绍') {
//          this.$router.push('/about/teamInfo')
//        } else if (this.msg[index].message === '发展历程') {
//          this.$router.push('/about/devHistory')
//        } else if (this.msg[index].message === '产品优势') {
//          this.$router.push('/about/productAdvantage')
//        } else if (this.msg[index].message === '合作伙伴') {
//          this.$router.push('/about/partner')
//        } else if (this.msg[index].message === '商业模式') {
//          this.$router.push('/about/business')
//        } else if (this.msg[index].message === '媒体报道') {
//          this.$router.push('/about/mediaReport')
//        } else if (this.msg[index].message === '荣誉资质') {
//          this.$router.push('/about/honour')
//        } else if (this.msg[index].message === '招聘信息') {
//          this.$router.push('/about/recruit')
//        } else if (this.msg[index].message === '办公环境') {
//          this.$router.push('/about/workEnv')
//        }
//      }
    },
    computed: {
      showActiveColor () {
        alert('111')
        if (this.$route.path.indexOf('safetyPage') >= 0) {
          this.aboutActive1 = true
          this.aboutActive2 = false
          this.aboutActive3 = false
          this.aboutActive4 = false
          this.aboutActive5 = false
          this.aboutActive6 = false
          this.aboutActive7 = false
          this.aboutActive8 = false
          this.aboutActive9 = false
          this.aboutActive10 = false
          this.aboutActive11 = false
        } else if (this.$route.path.indexOf('aboutUs') >= 0) {
          this.aboutActive1 = false
          this.aboutActive2 = true
          this.aboutActive3 = false
          this.aboutActive4 = false
          this.aboutActive5 = false
          this.aboutActive6 = false
          this.aboutActive7 = false
          this.aboutActive8 = false
          this.aboutActive9 = false
          this.aboutActive10 = false
          this.aboutActive11 = false
        }
      }
    }
  }
</script>
