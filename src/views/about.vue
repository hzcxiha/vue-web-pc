<template>
    <div>
      <section class="aboutWrap">
        <div class="pageCenter">
          <about-title></about-title>
          <ul id="aboutContent" class="aboutContent">
            <router-view></router-view>
          </ul>
          <div class="clear"></div>
        </div>
      </section>
    </div>
</template>
<script>
  import AboutTitle from '@/components/about/aboutTitle/aboutTitle'
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      AboutTitle
    }
  }
</script>
