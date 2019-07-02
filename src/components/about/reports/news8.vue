<template>
    <li style="display: block;" class="newsContent">
      <h2 class="newsTitle">P2P金融“猛虎”何时变“乖乖虎”</h2>
      <h4>xxxxxxx</h4>
      <div><img src="../../../../static/img/F0029F58BE9.jpeg" alt="" style="width: 30%;"></div>
      <h3>名词解释：P2P金融</h3>
      <p>又叫P2P信贷。其中，P2P是peer-to-peer或per-son-to-person的简写，意思是：个人对个人。P2P金融指个人与个人间的小额借贷交易，一般需要借助电子商务专业网络平台帮助借贷双方确立借贷关系并完成相关交易手续。借款者可自行发布借款信息，包括金额、利息、还款方式和时间，实现自助式借款；借出者根据借款人发布的信息，自行决定借出金额，实现自助式借贷。</p>
      <a href="javascript:history.back(-1);" class="goBackNews">返回列表>></a>
    </li>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.colorYellow()
      })
    },
    methods: {
      colorYellow () {
        if (this.$route.path.indexOf('new') >= 0) {
          let y = document.getElementById('about_nav8').childNodes.item(0)
          y.style.color = '#f2b643'
        }
      }
    }
  }
</script>
