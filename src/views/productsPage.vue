<template>
  <div>
    <pro-page></pro-page>
    <pro-safety></pro-safety>
  </div>
</template>
<script>
  import ProPage from './../components/prosTab/proPage.vue'
  import ProSafety from './../components/safetyCard/proSafety.vue'
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      ProSafety,
      ProPage
    }
  }
</script>
