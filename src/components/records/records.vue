<template>
  <div class="accountContent">
    <div class="accountContentTitle">交易记录</div>
    <div class="recordContent">
      <record-header></record-header>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import RecordHeader from '@/components/records/recordHeader/recordHeader'
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      RecordHeader
    }
  }
</script>
