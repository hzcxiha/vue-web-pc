<template>
  <div class="container">
    <div class="accountWrap">
      <crumbs></crumbs>
      <div class="accountBody">
        <account-list></account-list>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Crumbs from './../components/crumbs/crumbs'
  import AccountList from './../components/account/accountList'
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      Crumbs,
      AccountList
    }
  }
</script>
