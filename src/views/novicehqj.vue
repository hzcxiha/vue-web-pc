<template>
  <div class="productWrap productsWrap">
    <section class="pageCenter bgWhite">
      <div class="content">
        <div class="proTop flex">
          <pro-left-card v-bind:message="msg"></pro-left-card>
          <pro-hqj-right v-bind:message="msg"></pro-hqj-right>
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
          '新手活期金',
          '11.80%',
          '活期',
          '0.118'
        ],
        interestWay: [
          '新手活期产品预期复合年化收益率为11.80%，投资（次日）T+1日即开始计息，T+2日收益到账， 每日收益自动复投，按日计算收益。新用户仅限购买一次新手类产品。本产品最大买入周期为90天，在买入90天此期间用户可自由选择卖出。以买入100000元为例，预期年化收益如下：',
          '90天',
          '295.00元',
          '3.27元'
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
