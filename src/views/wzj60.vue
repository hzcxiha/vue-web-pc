<template>
  <div class="productWrap productsWrap ">
    <section class="pageCenter bgWhite">
      <div class="content">
        <div class="proTop flex">
          <pro-left-card v-bind:message="msg"></pro-left-card>
          <pro-hqj-right v-bind:message="msg" v-bind:interest="msg"></pro-hqj-right>
        </div>
        <div class="proBottom">
          <interest-way v-bind:interestWay="interestWay"></interest-way>
          <insurance></insurance>
          <details-content v-bind:message="msg"></details-content>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import ProLeftCard from '@/components/proDesDetails/proLeftCard'
  import ProHqjRight from '@/components/proDesDetails/proHqjRight'
  import InterestWay from '@/components/proDesDetails/interestWay'
  import Insurance from '@/components/proDesDetails/insurance'
  import DetailsContent from '@/components/proDesDetails/details/detailsContent'
  export default {
    data () {
      return {
        msg: [
          '稳赚金60天',
          '6%+1%',
          '60天',
          '0.07'
        ],
        interestWay: [
          '稳赚金60天产品预期年化收益率为7%，按日计算收益，到期一次性还本付息。以买入100000元为例，预期年化收益如下：',
          '60天',
          '1166.67元',
          '19.44元'
        ]
      }
    },
    components: {
      ProLeftCard,
      ProHqjRight,
      InterestWay,
      Insurance,
      DetailsContent
    }
  }
</script>
