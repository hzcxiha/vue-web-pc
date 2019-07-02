<template>
    <li style="display: block;" class="newsContent">
      
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
