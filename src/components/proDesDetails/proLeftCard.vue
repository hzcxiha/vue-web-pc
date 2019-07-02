<template>
  <div class="flex7 proTopLeft">
    <div class="proTitleWrap">
      <h3 class="proTitleD" v-text="message[0]"></h3>
      <span class="borderY">限时高息</span>
      <span class="borderY">新手专享</span>
      <span class="borderY">固定收益</span>
    </div>
    <div class="flex marginTop40">
      <div class="flex1 textCenter lx" v-text="message[1]"></div>
      <div class="flex1 textCenter cycle colorBlack font20" v-text="message[2]"></div>
      <div class="flex1 textCenter cycle colorBlack font20">100元起够</div>
    </div>
    <div class="flex marginTop40">
      <div class="flex1 textCenter touZI">预期年化收益率</div>
      <div class="flex1 textCenter touZI">投资期限</div>
      <div class="flex1 textCenter touZI">起投金额</div>
    </div>
    <div class="flex marginTop60">
      <div class="flex1 textCenter touZI">
        <img src="../../../static/img/u1031.png" alt="">
      </div>
      <div class="flex1 textCenter touZI">
        <img src="../../../static/img/u1034.png" alt="">
      </div>
      <div class="flex1 textCenter touZI">
        <img src="../../../static/img/u1037.png" alt="">
      </div>
    </div>
    <div class="flex marginTop20">
      <div class="flex1 textCenter touZI font18 colorYE">优质资产甄选</div>
      <div class="flex1 textCenter touZI font18 colorYE">严格遵守法律</div>
      <div class="flex1 textCenter touZI font18 colorYE">资金安全透明</div>
    </div>
    <div class="flex marginTop20">
      <div class="flex1 textCenter touZI">标的分散，信息充分披露</div>
      <div class="flex1 textCenter touZI">所有产品合法合规</div>
      <div class="flex1 textCenter touZI">资产托管，安全透明</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['message'],
    data () {
      return {
      }
    }
  }
</script>
