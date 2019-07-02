<template>
  <div>
    <div  class="tab">
      <div class="provideoWrap" @click="showVedio()">
        <img src="../../../../static/img/vediobg.png" alt="" class="playVideo">
      </div>
      <p style="text-align: left">本项目原始标的物主要为通过超宝宝理财合作机构xxxx中華財寳有限公司的补充库存金，本项目筛选注重流动性及安全性，其中包含大部分比例的黄金销售库存金，小部分比例的黄金出租库存金和金饰生产库存金等。<br></p>
      <p style="text-align: left">用户持有本项目期间收益主要来自于黄金销售和黄金租赁产生的利润，而超宝宝理财活期金的流动性主要依靠中華財寳库存金的销售额流动性来保障。<br></p>
      <p style="text-align: left">活期金是超宝宝理财推出的创新型“类活期”产品，用户购买活期金后的第二个自然日即开始计算收益，首笔收益将于第三个交易日的0:00到达用户的活期金账户并且自动复投，以此类推，每天的收益于第二天的凌晨0:00到达活期金账户中。用户可随时选择卖出活期金，卖出当日不计算收益。</p>
      <p style="color: #ff5855;padding-top: 20px; text-align: left;">目前推广期间，活期金不收取任何额外手续费。</p>
      <div v-show="showHqj">
        <h3 class="proContrast">活期金VS余额宝VS银行活期</h3>
        <ul class="contrastWrap">
          <li style="background-color: rgb(239, 243, 249);">
            <div>&nbsp;</div>
            <div>超宝宝活期金</div>
            <div>余额宝</div>
            <div>银行活期</div>
          </li>
          <li style="background-color: rgb(247, 249, 252);">
            <div>收益</div>
            <div>6%</div>
            <div>3%浮动</div>
            <div>0.35%</div>
          </li>
          <li style="background-color: rgb(239, 243, 249);">
            <div>资产</div>
            <div>黄金资产</div>
            <div>货币基金</div>
            <div>银行存款</div>
          </li>
          <li style="background-color: rgb(247, 249, 252);">
            <div>风险</div>
            <div>低</div>
            <div>低</div>
            <div>很低</div>
          </li>
          <li style="background-color: rgb(239, 243, 249);">
            <div>灵活程度</div>
            <div>随时存取</div>
            <div>随时存取</div>
            <div>随时存取</div>
          </li>
        </ul>
      </div>
      <div class="ws" v-show="showWzj">
        <h3 class="proContrast">稳赚金 VS P2P网贷 VS 股票型基金 VS 银行理财</h3>
        <ul class="contrastWrap">
          <li style="background-color: rgb(239, 243, 249);">
            <div>&nbsp;</div>
            <div>稳赚金</div>
            <div>P2P网贷</div>
            <div>股票型基金</div>
            <div>银行理财</div>
          </li>
          <li style="background-color: rgb(247, 249, 252);">
            <div>收益</div>
            <div>6%-10%</div>
            <div>8%左右</div>
            <div>-20%~20%</div>
            <div>4%</div>
          </li>
          <li style="background-color: rgb(239, 243, 249);">
            <div>资产</div>
            <div>黄金资产</div>
            <div>民间借贷</div>
            <div>股票</div>
            <div>实体项目</div>
          </li>
          <li style="background-color: rgb(247, 249, 252);">
            <div>风险</div>
            <div>低</div>
            <div>中</div>
            <div>高</div>
            <div>低</div>
          </li>
          <li style="background-color: rgb(239, 243, 249);">
            <div>灵活程度</div>
            <div>到期提取<br>
              不存在逾期</div>
            <div>
              到期提取<br>
              可能逾期
            </div>
            <div>
              到期清算<br>
              可能亏损
            </div>
            <div>
              到期提取<br>
              可能逾期
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrapBg" v-show="isShow">
      <div class="videoWrap">
        <video id="myvideo" class="videoPlay" loop="loop" style="width: 100%" controls :src="videoSrc">
          <!--<source src="http://video.zhaocaiweb.com/huoqijinwenzhuanjin.mp4" type="video/mp4" />-->
          您的浏览器不支持 HTML5 视频,请更换浏览器。比如 Chrome 、 Firefox 等主流浏览器。
        </video>
      </div>
      <div class="closeVideo" @click="clooseVedio">关闭</div>
    </div>
  </div>
</template>
<style>
  .ws .contrastWrap li div{
    width: 19%;
  }
</style>
<script>
  export default {
    props: ['message'],
    data () {
      return {
        showHqj: false,
        showWzj: false,
        isShow: false,
        playStatus: '',
        isPlay: false,
        videoSrc: ''
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getUrlQuery()
      })
    },
    methods: {
      getUrlQuery () {
        if (this.$route.path.indexOf('hqj') >= 0) {
          this.videoSrc = 'http://video.zhaocaiweb.com/huoqijin.mp4'
          this.showHqj = true
          this.showWzj = false
        } else if (this.$route.path.indexOf('wzj') >= 0) {
          this.videoSrc = 'http://video.zhaocaiweb.com/wenzhuanjin.mp4'
          this.showHqj = false
          this.showWzj = true
        }
      },
      showVedio () {
        this.isShow = true
        this._dom = document.getElementById('myvideo')
        this.isPlay = !this.isPlay
        this._dom.play()
      },
      clooseVedio () {
        this.isShow = false
        this._dom = document.getElementById('myvideo')
        this.isPlay = false
        this._dom.pause()
      }
    },
    computed: {
    }
  }
</script>
