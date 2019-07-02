<template>
    <div>
      <banner-card></banner-card>
      <products-card></products-card>
      <safety-card></safety-card>
    </div>
</template>
<script>
  import BannerCard from './../components/banner/bannerCard.vue'
  import ProductsCard from './../components/productCard/productsCard.vue'
  import SafetyCard from './../components/safetyCard/safetyCard.vue'
  export default {
    components: {
      BannerCard,
      ProductsCard,
      SafetyCard
    }
  }
</script>
