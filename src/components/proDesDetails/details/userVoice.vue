<template>
    <div>
      <div class="tab">
        <div class="contentCenter">
          <ul class="userQuestionWrap">
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8">
                  <span>用户187********：</span>
                  <span class="fontBlue">超宝宝理财保本息吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服西西：</h3>
                所有理财产品都有风险，所以我国规定，互联网上的任何理财产品都不可以承诺保本保息的。超宝宝理财通过跟资产合作方签署违约责任协议、监管资产运作账户、银行第三方存管等方式，最大限度的保障用户资金安全。同时，我们历史上所有产品都是100%到期安全兑付的。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8">
                  <span>用户189********：</span>
                  <span class="fontBlue">超宝宝理财是做黄金的吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服兔兔：</h3>
                超宝宝理财是创新型互联网理财服务平台，超宝宝理财自己本身不做黄金，也不做其他任何金融业务，我们通过互联网为大家提供投资理财信息渠道。目前为大家提供的活期金和稳赚金两款产品，是以实物黄金和黄金量化对冲产品为标的物。所以目前超宝宝理财对接的所有产品都跟黄金相关。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8 titleOverFlow">
                  <span>用户156********：</span>
                  <span class="fontBlue">超宝宝理财是做贵金属的吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服窝窝：</h3>
                超宝宝理财是创新型互联网理财服务平台，超宝宝理财自己本身不做黄金，也不做其他任何金融业务，我们通过互联网为大家提供投资理财信息渠道。目前为大家提供的活期金和稳赚金两款产品，是以实物黄金和黄金量化对冲产品为标的物。所以目前超宝宝理财对接的所有产品都只跟黄金相关，与其他贵金属无关。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8 titleOverFlow">
                  <span>用户136********：</span>
                  <span class="fontBlue">如何防止跑路？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服佳佳：</h3>
                目前超宝宝理财的所有资金通过xxxx存管，所有黄金资产通过xxxx黄金股份有限公司存管，超宝宝理财平台触碰不到任何用户资产，不存在资金挪用的可能性，所以跑路没有任何意义。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8 titleOverFlow">
                  <span>用户137********：</span>
                  <span class="fontBlue">超宝宝理财有托管吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服多多：</h3>
                目前超宝宝理财的所有资金通过xxxx存管，所有黄金资产通过xxxx黄金股份有限公司存管，超宝宝理财通过大数据系统全程监控账户运作。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">置顶</span>
                </div>
                <div class="flex8 titleOverFlow">
                  <span>用户176********：</span>
                  <span class="fontBlue">超宝宝理财有风投吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服小凤：</h3>
                深圳市xxxx资产管理有限公司先后注资5000万元人民币，展示了对超宝宝理财的充分肯定。互联网金融行业118名资深投资人联合入股1000万元人民币，让超宝宝理财成为国内少数拥有投资人共同持股的互联网金融平台之一。
              </div>
            </li>
            <!--非置顶-->
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phonen">用户176********：</span>
                  <span class="fontBlue ">首页右上角金价怎么不变呢？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服多多：</h3>
                尊敬的用户您好：超宝宝理财的金价是以上海黄金交易所的上海金基准价为标准的哦，超宝宝金价于每个上海黄金交易所交易日的10:30分更新，一天只有一个金价哦。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phonea">用户176********：</span>
                  <span class="fontBlue ">2张加息券能同时用吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服西西：</h3>
                尊敬的用户您好：
                一个订单最多只能使用一张加息券，同时加息券不可以给其他账户的订单支付或转给其他用户哦。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phoneb">用户176********：</span>
                  <span class="fontBlue ">8888元的体验金是干啥的？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服小丽：</h3>
                尊敬的用户您好：8888元体验金是超宝宝理财送您的免费大礼包哦，凡是新注册用户，均可免费领取一次8888元的体验金，体验金收益8.8元会在您领取2日后发送至您的账户余额哦。
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phonec">用户176********：</span>
                  <span class="fontBlue ">充值、提现、支付有费用吗？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服小凤：</h3>
                尊敬的用户您好：在超宝宝理财平台充值、提现、支付等操作不存在任何手续费用哦
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phoned">用户176********：</span>
                  <span class="fontBlue ">稳赚金年化收益率是啥意思？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服兔兔：</h3>
                尊敬的用户您好：稳赚金年化收益率是指用户购买稳赚金产品到期获得的收益相比于买入稳赚金产品时的本金的百分比。<br>
                <h3 style="color:#f2b643;">▎公式如下哦：</h3>
                到期获得的收益=稳赚金产品周期（天）X 买入稳赚金产品本金 X 稳赚金年化收益率/360。<br>
                <h3 style="color:#f2b643;">▎我给您举个例子吧：</h3>
                计算一下您购买10000元购买360天稳赚金到期可以获得多少收益吧！<br>
                假设您在9月20日购买了10000元稳赚金产品，年化收益率为14%<br>
                那么360天到期后您可以一次性获得本息10000+10000*14%=14000元哦。<br>
              </div>
            </li>
            <li @click="openQuestion">
              <div class="flex userQuestion">
                <div class="mTopWrap">
                  <span class="mTop">★★</span>
                </div>
                <div class="flex8 titleOverFlow">
                  用户<span class="phonee">用户176********：</span>
                  <span class="fontBlue ">量化对冲基金是什么？</span>
                </div>
                <div class="flex1 arrowTop"></div>
              </div>
              <div class="answer" v-show="isshow">
                <h3 class="service">超宝宝客服兔兔：</h3>
                尊敬的用户您好：超宝宝的量化对冲基金是以现货黄金和黄金资产衍生品为投资标的的量化对冲基金。
                量化对冲基金基金的解释见百度百科：<a href="http://baike.baidu.com/item/量化对冲" style="display: inline-block;color: #999;text-decoration: underline">http://baike.baidu.com/item/量化对冲</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        isshow: false
      }
    },
    methods: {
      openQuestion (e) {
        console.log(e.currentTarget.children[0].children[2].style.backgroundImage)
        for (let i = 0; i < e.currentTarget.parentNode.children.length; i++) {
          e.currentTarget.parentNode.children.item(i).children[1].style.display = 'none'
        }
        e.currentTarget.children[1].style.display = 'block'
      }
    }
  }
</script>
