<template>
  <div>
    <div class="proDetailsTitleWrap marginTop40">
    <span class="proDetailsTitleImg">
        <img src="../../../static/img/u1041.png" alt="">
    </span>
    <span class="proDetailsTitle">计息方式：</span>
  </div>
    <p class="marginTop20 proDetailsFont" v-text="interestWay[0]">
    </p>
    <table cellpadding="0" cellspacing="0" style="border-bottom: 0;" class="tableWrap hqjTable">
      <tbody class="tbody">
      <tr style="background-color: rgb(239, 243, 249);">
        <th>期限</th>
        <th>年预期收益</th>
        <th>日预期收益</th>
      </tr>
      <tr style="background-color: rgb(247, 249, 252);">
        <td v-text="interestWay[1]"></td>
        <td class="colorYE" v-text="interestWay[2]"></td>
        <td class="colorYE" v-text="interestWay[3]"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: ['interestWay'],
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
