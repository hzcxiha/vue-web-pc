<template>
  <div class="tabs">
    <div class="tabs-header">
      <ul id="proTitleWrap">
        <li @click="proDetail"><a href="javascript:">产品详情</a></li>
        <li @click="userVoice"><a href="javascript:">用户心声</a></li>
        <li @click="investment"><a href="javascript:">投资详情</a></li>
      </ul>
    </div>
    <div class="tabs-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
  .tabs {
    width: 100%;
    padding: 20px 0 50px 0;
    box-shadow: none;
    margin-bottom: 0;
    margin-top: 0;
  }
  .tabs-header ul {
    border-bottom: 1px solid #eee;
    width: 100%;
    /* margin: 0 auto; */
  }
  .tabs-header li:first-child{
    border-bottom: 1px solid #f2b643;
  }
  .tabs-header li {
    width: 32.5%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }
  .tabs-header a {
    color: #000;
    font-size: 20px;
    padding: 15px 10px;
    text-align: center;
    letter-spacing: 5px;
  }
</style>
<script>
  export default {
    props: ['message'],
    data () {
      return {
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.showBorder()
      })
    },
    methods: {
      showBorder () {
        var titleWrap = document.getElementById('proTitleWrap')
        if (this.$route.path.indexOf('proDetail') >= 0) {
          titleWrap.children[0].style.borderBottom = '1px solid #f2b643'
          titleWrap.children[1].style.borderBottom = '0'
          titleWrap.children[2].style.borderBottom = '0'
        } else if (this.$route.path.indexOf('userVoice') >= 0) {
          titleWrap.children[1].style.borderBottom = '1px solid #f2b643'
          titleWrap.children[0].style.borderBottom = '0'
          titleWrap.children[2].style.borderBottom = '0'
        } else if (this.$route.path.indexOf('investment') >= 0) {
          titleWrap.children[2].style.borderBottom = '1px solid #f2b643'
          titleWrap.children[1].style.borderBottom = '0'
          titleWrap.children[0].style.borderBottom = '0'
        }
      },
      proDetail (e) {
        e.currentTarget.parentNode.children[1].style.borderBottom = '0'
        e.currentTarget.parentNode.children[2].style.borderBottom = '0'
        e.currentTarget.style.borderBottom = '1px solid #f2b643'
        if (this.message[0] === '新手活期金') {
          this.$router.push('/novicehqj/proDetail')
        } else if (this.message[0] === '新手稳赚金30天') {
          this.$router.push('/novicewzj30/proDetail')
        } else if (this.message[0] === '新手稳赚金360天') {
          this.$router.push('/novicewzj360/proDetail')
        } else if (this.message[0] === '活期金') {
          this.$router.push('/hqj/proDetail')
        } else if (this.message[0] === '稳赚金30天') {
          this.$router.push('/wzj30/proDetail')
        } else if (this.message[0] === '稳赚金60天') {
          this.$router.push('/wzj60/proDetail')
        } else if (this.message[0] === '稳赚金90天') {
          this.$router.push('/wzj90/proDetail')
        } else if (this.message[0] === '稳赚金180天') {
          this.$router.push('/wzj180/proDetail')
        } else if (this.message[0] === '稳赚金360天') {
          this.$router.push('/wzj360/proDetail')
        }
      },
      userVoice (e) {
        e.currentTarget.parentNode.children[0].style.borderBottom = '0'
        e.currentTarget.parentNode.children[2].style.borderBottom = '0'
        e.currentTarget.style.borderBottom = '1px solid #f2b643'
        if (this.message[0] === '新手活期金') {
          this.$router.push('/novicehqj/userVoice')
        } else if (this.message[0] === '新手稳赚金30天') {
          this.$router.push('/novicewzj30/userVoice')
        } else if (this.message[0] === '新手稳赚金360天') {
          this.$router.push('/novicewzj360/userVoice')
        } else if (this.message[0] === '活期金') {
          this.$router.push('/hqj/userVoice')
        } else if (this.message[0] === '稳赚金30天') {
          this.$router.push('/wzj30/userVoice')
        } else if (this.message[0] === '稳赚金60天') {
          this.$router.push('/wzj60/userVoice')
        } else if (this.message[0] === '稳赚金90天') {
          this.$router.push('/wzj90/userVoice')
        } else if (this.message[0] === '稳赚金180天') {
          this.$router.push('/wzj180/userVoice')
        } else if (this.message[0] === '稳赚金360天') {
          this.$router.push('/wzj360/userVoice')
        }
      },
      investment (e) {
        e.currentTarget.parentNode.children[0].style.borderBottom = '0'
        e.currentTarget.parentNode.children[1].style.borderBottom = '0'
        e.currentTarget.style.borderBottom = '1px solid #f2b643'
        if (this.message[0] === '新手活期金') {
          this.$router.push('/novicehqj/investment')
        } else if (this.message[0] === '新手稳赚金30天') {
          this.$router.push('/novicewzj30/investment')
        } else if (this.message[0] === '新手稳赚金360天') {
          this.$router.push('/novicewzj360/investment')
        } else if (this.message[0] === '活期金') {
          this.$router.push('/hqj/investment')
        } else if (this.message[0] === '稳赚金30天') {
          this.$router.push('/wzj30/investment')
        } else if (this.message[0] === '稳赚金60天') {
          this.$router.push('/wzj60/investment')
        } else if (this.message[0] === '稳赚金90天') {
          this.$router.push('/wzj90/investment')
        } else if (this.message[0] === '稳赚金180天') {
          this.$router.push('/wzj180/investment')
        } else if (this.message[0] === '稳赚金360天') {
          this.$router.push('/wzj360/investment')
        }
      }
    },
    computed: {
    }
  }
</script>
