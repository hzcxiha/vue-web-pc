<template>
    <div class="flex4 proTopRight" >
      <div class="proTopRightCnt" v-if="showHqj">
        <div class="inputMoneyWrap flex">
          <div class="flex3 proTopRightFont">输入金额</div>
          <div class="flex7">
            <input type="tel" placeholder="100元起够" value="100" maxlength="9" class="inputMoney" v-model="hqjBuyMoney" :input="expectedEarning">
          </div>
        </div>
        <div class="flex">
          <div class="flex1 proTopRightFont">计息日</div>
          <div class="flex1 proTopRightFont textRight jxDay" id="jxDayHqj">{{time | formatDate}}</div>
        </div>
        <div class="flex relative marginTop10">
          <div class="flex1 proTopRightFont">到期日</div>
          <datepicker v-model="date" language="ch" id="datePicker" style="color: #666;width: 120px;" @input="dayDiff(),getExpectedEarning()"></datepicker>
          <!--<div class="flex1 proTopRightFont textRight dqDay"></div>-->
          <i class="iconfont icon-right-copy" style="font-size: 20px;color:#f2b643;position: absolute;top:5px;right: -24px;"></i>
        </div>
        <div class="flex paddingTop15 marginTop20 borderT">
          <div class="flex1 proTopRightFont">预期收益（元）</div>
          <div class="flex1 proTopRightFont textRight colorYE yqProfit" v-text="expectedEarnings"></div>
        </div>
        <div class="flex paddingTop15 marginTop10 unbindCard" v-if="noauthenticate">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u163666.png" alt="">
          </div>
          <div class="flex4 proTopRightFont">
            <h3 class="bankNameWrap">银行卡支付</h3>
            <p class="bankFont">先实名认证，后支付</p>
          </div>
          <div class="flex3 proTopRightFont textRight goAuthentication" @click="goIdentification">
            <span class="colorYE">去认证</span>&nbsp;<i class="iconfont icon-jinru" style="font-size: 18px;display: inline-block;vertical-align: middle"></i>
          </div>
        </div>
        <div class="flex paddingTop15 marginTop10 bindCard" v-if="authenticated">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u163666.png" :src="bankImgUrl" alt="">
          </div>
          <div class="flex3 proTopRightFont">
            <h3 class="bankNameWrap"><span class="bankName">{{getBankName}}</span> <span class="bankEndNum"></span></h3>
            <p class="bankFont"><span class="bankFontInfo">{{IdCard}}</span> </p>
          </div>
          <div class="flex4 proTopRightFont textRight">
            <span class="waitPayFont">待支付:</span><span class="waitPayMoney">{{hqjBuyMoney}}</span>
          </div>
          <div class="flex0_6 choosePayWrap">
            <img src="../../../static/img/register.png" alt="" :src="chooseBankImg" @click="chooseBank">
          </div>
        </div>
        <div class="flex paddingTop15 marginTop10">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u1024.png" alt="">
          </div>
          <div class="flex3 proTopRightFont">
            <h3 class="yePay">余额支付</h3>
            <p class="yePayFont">余额:<span class="yePayMoney">{{balance}}</span> 元</p>
          </div>
          <div class="flex4 proTopRightFont textRight">
            <div class="waitPayWrap" v-if="enoughMoney">
              <span class="waitPayFont">待支付:</span><span class="waitPayMoney">{{hqjBuyMoney}}</span>
            </div>
            <span class="noMoney" v-else>余额不足</span>
          </div>
          <div class="flex0_6 choosePayWrap">
            <img src="@/../static/img/unchecked.png" alt="" :src="chooseBalanceImg" @click="chooseBalance">
          </div>
        </div>
        <div class="errorMsg" v-text="errorMsg"  style="text-align: left;width: 295px;"></div>
        <div><input type="button" value="立即购买" :disabled="disabled" :style="{background: backgroundStyle}" class="buyNow" @click="buyHqj"></div>
        <div class="popBg" v-show="popBgShow">
          <div class="buySuccessWrap" v-show="showBuySuccess">
            <div><img src="../../../static/img/buy_success.png" alt=""></div>
            <p>购买成功！去了解更多产品吧</p>
            <div>
              <input type="button" value="确认" @click="viewProducts">
              <input type="button" value="取消" @click="closePop">
            </div>
          </div>
          <div class="setPayPwdWrap" v-show="showSetPayPwdWrap">
            <h3 class="closeSetPayWrap">
              <span class="closeSetPayBtn" @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">请先设置6位数字交易密码</h3>
            <div>
              设置交易密码<input type="password" maxlength="6" class="inputSetPwd" v-model="inputPayPwd" placeholder="请设置6位数字支付密码">
            </div>
            <div>
              确认交易密码<input type="password" maxlength="6" class="inputSetPwd" v-model="confirmPayPwd" placeholder="请确认6位数字支付密码">
            </div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 295px;padding: 0;font-size: 14px;"></div>
            <div style="padding-top:5px;">
              <input type="button" class="confirmSetPayPwd" v-loading.fullscreen="fullscreenLoading" value="确认" @click="setPayPwd">
            </div>
          </div>
          <div class="YEpayWrap" v-show="showYEpayWrap">
            <h3 class="closeSetPayWrap">
              <span class="closeSetPayBtn" @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">余额支付￥ <span>{{this.hqjBuyMoney}}</span>元</h3>
            <div>
              交易密码<input type="password" maxlength="6" v-loading.fullscreen="fullscreenLoading" placeholder="请输入6位数字支付密码" v-model="payPwd" :input="hqjBuy">
            </div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 250px;padding: 0;margin-top: -2px;font-size: 14px;"></div>
          </div>
          <div class="bankPayWrap" v-show="showBankWrap">
            <h3 class="closeSetPayWrap">
              <span class="closeSetPayBtn" @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">银行卡支付￥{{hqjBuyMoney}}元</h3>
            <div class="yzmWrap">短信验证码已发送至您的手机</div>
            <div class="inputYzmWrap">
              手机验证码 <input type="text" class="inputYzm" :input="inputMsg" v-model="bankPhoneMsg" maxlength="6" placeholder="请输入验证码"> <input type="button" value="" class="yzmBtn" v-model="timer">
            </div>
            <div>使用<span v-text="getBankName"></span>(<span v-text="bankEndFourNum"></span>)付款</div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 295px;padding: 0;margin-top: -2px;font-size: 14px;"></div>
            <div><input type="button" class="confirmPayBank" v-loading.fullscreen="fullscreenLoading" :style="{background: confirmBG}" :disabled="confirmDisabled" value="确认" @click="confirmPayBank"></div>
          </div>
        </div>
      </div>
      <div class="proTopRightCnt" v-if="showWzj">
        <div class="inputMoneyWrap flex">
          <div class="flex3 proTopRightFont">
            <span class="inputJE" v-if="byAmount">输入金额</span>
            <span class="inputKS" v-if="byGrams">输入克数</span>
          </div>
          <div class="flex7">
            <input type="tel" placeholder="100元起够" maxlength="9" class="inputMoney"  v-if="byAmount" v-model="inputAmounts" :input="convertGrams,wzjExpectProfit">
            <input type="tel" placeholder="请输入克数" maxlength="6" class="inputMoney inputKe"  v-if="byGrams" v-model="inputGrams" :input="convertMoney,wzjExpectProfit">
          </div>
          <div class="flex3 switchWrap">
            <span class="switchKe"  v-if="byAmount" @click="changeByGrams">切换为<br>按克重买</span>
            <span class="switchWrapMoney"  v-if="byGrams" @click="changeByAmount">切换为<br>按金额买</span>
          </div>
        </div>
        <div class="flex zhKeWrap"  v-if="byAmount">
          <div class="flex1 proTopRightFont">折合黄金（克）</div>
          <div class="flex1 proTopRightFont textRight zhKe" v-text="equivalentGrams">0.00</div>
        </div>
        <div class="flex zhMoneyWrap"  v-if="byGrams">
          <div class="flex1 proTopRightFont ">折合金额（元）</div>
          <div class="flex1 proTopRightFont textRight zhMoney" v-text="equivalentMoney"></div>
        </div>
        <div class="flex paddingTop15 marginTop20 borderT">
          <div class="flex1 proTopRightFont">预期收益（元）</div>
          <div class="flex1 proTopRightFont textRight colorYE yqProfit" v-text="expectProfitWzj">0.00</div>
        </div>
        <div class="flex paddingTop15 marginTop20 unbindCard" v-if="noauthenticate">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u163666.png" alt="">
          </div>
          <div class="flex4 proTopRightFont">
            <h3 class="bankNameWrap">银行卡支付</h3>
            <p class="bankFont">先实名认证，后支付</p>
          </div>
          <div class="flex3 proTopRightFont textRight goAuthentication" @click="goIdentification">
            <span class="colorYE">去认证</span>   <i class="iconfont icon-jinru" style="font-size: 18px;display: inline-block;vertical-align: middle"></i>
          </div>
        </div>
        <div class="flex paddingTop15 marginTop20 bindCard" v-if="authenticated">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u163666.png" :src="bankImgUrl" alt="">
          </div>
          <div class="flex3 proTopRightFont">
            <h3 class="bankNameWrap"><span class="bankName">{{getBankName}}</span><span class="bankEndNum"></span></h3>
            <p class="bankFont"><span class="bankFontInfo">{{IdCard}}</span> </p>
          </div>
          <div class="flex4 proTopRightFont textRight goAuthentication">
            <span class="waitPayFont">待支付:</span><span class="waitPayMoney">{{wzjWaitPay}}</span>
          </div>
          <div class="flex0_6 choosePayWrap">
            <img src="../../../static/img/register.png" alt="" :src="chooseBankImg" @click="chooseBank">
          </div>
        </div>

        <div class="flex paddingTop15 marginTop20">
          <div class="flex1 bankIconWrap">
            <img src="../../../static/img/u1024.png" alt="">
          </div>
          <div class="flex3 proTopRightFont">
            <h3 class="yePay">余额支付</h3>
            <p class="yePayFont">余额:<span class="yePayMoney">{{balance}}</span> 元</p>
          </div>
          <div class="flex4 proTopRightFont textRight goAuthentication">
            <div class="waitPayWrap" v-if="enoughMoney">
              <span class="waitPayFont" >待支付:</span><span class="waitPayMoney">{{wzjWaitPay}}</span>
            </div>
            <span class="noMoney" v-else>余额不足</span>
          </div>
          <div class="flex0_6 choosePayWrap">
            <img src="../../../static/img/register.png" alt="" :src="chooseBalanceImg" @click="chooseBalance">
          </div>
        </div>
        <div class="errorMsg" v-text="errorMsg"  style="text-align: left;width: 295px;"></div>
        <div><input type="button" value="立即购买" :disabled="disabled" :style="{background: backgroundStyle}" class="buyNow" @click="buyWzj"></div>
        <div class="popBg" v-show="popBgShow">
          <div class="buySuccessWrap" v-show="showBuySuccess">
            <div><img src="../../../static/img/buy_success.png" alt=""></div>
            <p>购买成功！去了解更多产品吧</p>
            <div>
              <input type="button" value="确认" @click="viewProducts">
              <input type="button" value="取消" @click="closePop">
            </div>
          </div>
          <div class="setPayPwdWrap" v-show="showSetPayPwdWrap">
            <h3 class="closeSetPayWrap" >
              <span class="closeSetPayBtn"  @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">请先设置6位数字交易密码</h3>
            <div>
              设置交易密码<input type="password" maxlength="6" class="inputSetPwd" v-model="inputPayPwd" placeholder="请设置6位数字支付密码">
            </div>
            <div>
              确认交易密码<input type="password" maxlength="6" class="inputSetPwd" v-model="confirmPayPwd" placeholder="请确认6位数字支付密码">
            </div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 295px;padding: 0;margin-top: -2px;font-size: 14px;"></div>
            <div style="padding-top:5px;">
              <input type="button" class="confirmSetPayPwd" v-loading.fullscreen="fullscreenLoading" value="确认" @click="setPayPwd">
            </div>
          </div>
          <div class="YEpayWrap" v-show="showYEpayWrap">
            <h3 class="closeSetPayWrap">
              <span class="closeSetPayBtn" @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">余额支付￥{{wzjWaitPay}}元</h3>
            <div>
              交易密码<input type="password" maxlength="6" v-loading.fullscreen="fullscreenLoading" placeholder="请输入6位数字支付密码" v-model="payPwd" :input="wzjBuy">
            </div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 295px;padding: 0;margin-top: -2px;font-size: 14px;"></div>
          </div>
          <div class="bankPayWrap" v-show="showBankWrap">
            <h3 class="closeSetPayWrap">
              <span class="closeSetPayBtn" @click="closePop">x</span>
            </h3>
            <h3 class="pleaseSet">银行卡支付￥{{wzjWaitPay}}元</h3>
            <div class="yzmWrap">短信验证码已发送至您的手机</div>
            <div class="inputYzmWrap">
              手机验证码 <input type="text" class="inputYzm" :input="inputMsg" v-model="bankPhoneMsg" maxlength="6" placeholder="请输入验证码"> <input type="button" value="" class="yzmBtn" :disabled="timerDisabled" v-model="timer" @click="sendVercodeAgain">
            </div>
            <div>使用<span v-text="getBankName"></span>(<span v-text="bankEndFourNum"></span>)付款</div>
            <div class="errorMsg" v-text="popErrorMsg"  style="text-align: left;width: 250px;padding: 0;margin-top: -2px;font-size: 14px;"></div>
            <div><input type="button" class="confirmPayBank" v-loading.fullscreen="fullscreenLoading" :style="{background: confirmBG}" :disabled="confirmDisabled" value="确认" @click="confirmPayBank"></div>
          </div>
        </div>
      </div>
    </div>
</template>
<style>
  .buySuccessWrap{
    text-align: center;
    background: #fff;
    /*width: 400px;*/
    min-width: 420px;
    height: 250px;
    border-radius: 5px;
    position: fixed;
    top:30%;
    left: 32%;
    right: 32%;
  }
  .buySuccessWrap img{
    width: 80px;
    margin-top: 20px;
  }
  .buySuccessWrap p{
    font-size: 16px;
    padding:20px 0;
  }
  .buySuccessWrap input{
    width: 100px;
    height: 40px;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
  }
  .buySuccessWrap input:focus{
    border:0;
  }
  .buySuccessWrap input:first-child{
    margin-right: 20px;
    background: #f2b643;
  }
  .buyNow:focus{
    border: none !important;
  }
  .closeSetPayWrap{
    text-align: right;
  }
  .closeSetPayBtn{
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #666;
    font-size: 22px;
    cursor: pointer;
  }
  .pleaseSet{
    text-align: center;
    font-size: 20px;
    color: #f2b643;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  .popBg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 100;
  }
  .inputSetPwd{
    margin-left: 10px;
    height: 30px;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: 2px;
    padding-left: 2px;
  }
  .setPayPwdWrap{
    text-align: center;
    background: #fff;
    /*width: 400px;*/
    min-width: 420px;
    height: 250px;
    border-radius: 5px;
    position: fixed;
    top:30%;
    left: 32%;
    right: 32%;
  }
  .setPayPwdWrap div{
    padding: 10px 0;
    font-size: 16px;
  }
  .confirmSetPayPwd{
    width: 200px;
    height: 50px;
    cursor: pointer;
    background: #f2b643;
    border-radius: 5px;
    color: #fff;
  }
  .YEpayWrap{
    text-align: center;
    background: #fff;
    /*width: 400px;*/
    min-width: 400px;
    height: 200px;
    border-radius: 5px;
    position: fixed;
    top:30%;
    left: 32%;
    right: 32%;
  }
  .YEpayWrap div{
    margin-top: 20px;
    padding: 20px 0;
    font-size: 16px;
  }
  .YEpayWrap div input{
    border: 1px solid #ccc;
    margin-left: 5px;
    border-radius: 5px;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 5px;
  }
  .bankPayWrap{
    text-align: center;
    background: #fff;
    /*width: 400px;*/
    min-width: 400px;
    height: 250px;
    border-radius: 5px;
    position: fixed;
    top:30%;
    left: 35%;
    right: 35%;
  }
  .yzmWrap{
    padding: 5px 0;
    font-size: 14px;
  }
  .inputYzmWrap{
    font-size: 14px;
    padding: 6px 0;
  }
  .inputYzm{
    border: 1px solid #ccc;
    border-radius: 5px;
    /*padding-left: 5px;*/
    height: 30px;
    line-height: 30px;
    width: 120px;
  }
  .yzmBtn{
    width: 50px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
  }
  .yzmBtn:focus{
    border: none;
  }
  .confirmPayBank{
    width: 200px;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 5px;
  }
  .confirmPayBank:focus{
    border: none;
  }
</style>
<script>
  import datepicker from 'vue-date'
  import sha256 from 'js-sha256'
  import md5 from 'js-md5'
  import {formatDate, interestTime, DateDiff} from '@/assets/js/date.js'
  import {host, authQuery, handleresult, bankCards, assetQuery, userProduct, getproduct, paypwd, paypwdCheck, xinshouGoldbuyIn, currentGoldbuyIn, productbuyIn, authPaysendVercode, confirmPay, authPayFirst} from '@/assets/js/config.js'
  import minshengbank from '../../../static/img/minshengbank.png'
  import huaxiabank from '../../../static/img/huaxiabank.png'
  import guangfabank from '../../../static/img/guangfabank.png'
  import zhaoshangbank from '../../../static/img/zhaoshangbank.png'
  import youzhengbank from '../../../static/img/youzhengbank.png'
  import nongyebank from '../../../static/img/nongyebank.png'
  import xingyebank from '../../../static/img/xingyebank.png'
  import jiaotongbank from '../../../static/img/jiaotongbank.png'
  import pufabank from '../../../static/img/pufabank.png'
  import guangdabank from '../../../static/img/guangdabank.png'
  import jianshebank from '../../../static/img/jianshebank.png'
  import zhongxinbank from '../../../static/img/zhongxinbank.png'
  import zhongguobank from '../../../static/img/zhongguobank.png'
  import gongshangbank from '../../../static/img/gongshangbank.png'
  import shanghaiBank from '../../../static/img/shanghaibank.png'
  import pinganbank from '../../../static/img/pinganbank.png'
  import choosed from '../../../static/img/register.png'
  import unchoose from '@/../static/img/unchecked.png'
  export default {
    props: ['message', 'interest'],
    data () {
      return {
        authenticated: false,
        authToken: '',
        bankPhone: '',
        bankPhoneMsg: '',
        bankCard: '',
        byAmount: true,
        byGrams: false,
        bankImgUrl: '',
        balance: '0.00',
        backgroundStyle: '#f2b643',
        bankEndFourNum: '',
        ceiling: '',
        confirmBG: '#CCC',
        confirmPayPwd: '',
        confirmDisabled: true,
        chooseBankImg: choosed,
        chooseBalanceImg: unchoose,
        chooseBankPay: true,
        disabled: false,
        date: interestTime,
        errorMsg: '',
        expectedEarnings: '0.00',
        expectProfitWzj: '0.00',
        equivalentMoney: '0.00',
        equivalentGrams: '0.00',
        enoughMoney: true,
        fullscreenLoading: false,
        getBankName: '',
        hqjBuyMoney: window.sessionStorage.buyMoney,
        inputPayPwd: '',
        inputGrams: '',
        IdCard: '',
        inputAmounts: window.sessionStorage.buyMoney,
        messagemac: '',
        noauthenticate: true,
        orderId: '',
        payWay: '1',
        popErrorMsg: '',
        popBgShow: false,
        payMAC: '',
        prePayMac: '',
        payPwd: '',
        showBuySuccess: false,
        showBankWrap: false,
        showYEpayWrap: false,
        showSetPayPwdWrap: false,
        showHqj: false,
        showWzj: false,
        timerDisabled: false,
        timer: '60',
        time: new Date(),
        userPhone: window.localStorage.userName,
        wzjWaitPay: 0.00,
        ysbRes: ''
      }
    },
    created () {
      this.resetNum()
      this.getUserInfo()
    },
    mounted () {
      this.$nextTick(function () {
        this.whetherAuthenticated()
        this.showBuyWrap()
        this.getAcountBalance()
        this.getProduct()
      })
    },
    methods: {
      viewProducts () {
        this.$router.push('/productsPage/wzjCollection')
      },
      countDown () {
        this.timer = 60
        this.timerDisabled = true
        let timer = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            clearInterval(timer)
            this.timer = '重发'
            this.timerDisabled = false
          }
        }, 1000)
      },
      closePop () {
        this.popBgShow = false
        this.showBankWrap = false
        this.showYEpayWrap = false
        this.showSetPayPwdWrap = false
        this.popErrorMsg = ''
      },
      whitherSetPayPwd () {
        this.$http.get(host + paypwd, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.popBgShow = true
            this.showYEpayWrap = true
          } else if (res.code === -1) {
//            alert('没设置')
            this.popBgShow = true
            this.showSetPayPwdWrap = true
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      getProduct () {
        this.$http.get(host + getproduct, {
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            for (let i = 0; i < res.result.length; i++) {
              if (this.$route.path.indexOf('novicehqj') >= 0) {
                if (res.result[i].name === '新手活期金') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('hqj') >= 0) {
                if (res.result[i].name === '活期金') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('novicewzj30') >= 0) {
                if (res.result[i].name === '新手稳赚金30天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('novicewzj360') >= 0) {
                if (res.result[i].name === '新手稳赚金360天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('wzj30') >= 0) {
                if (res.result[i].name === '稳赚金30天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('wzj60') >= 0) {
                if (res.result[i].name === '稳赚金60天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('wzj90') >= 0) {
                if (res.result[i].name === '稳赚金90天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('wzj180') >= 0) {
                if (res.result[i].name === '稳赚金180天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (this.$route.path.indexOf('wzj360') >= 0) {
                if (res.result[i].name === '稳赚金360天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              }
            }
            this.getCeiling()
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      getCeiling () {
        this.$http.get(host + userProduct, {
          params: {
            phone: window.localStorage.userName,
            id: window.sessionStorage.productId
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.ceiling = ((res.result.userHaveLimit - res.result.haveSum) * 100) / 100
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      resetNum () {
        if (window.sessionStorage.buyMoney === undefined) {
          window.sessionStorage.buyMoney = ''
        } else {
          return window.sessionStorage.buyMoney
        }
        if (isNaN(this.expectedEarnings)) {
          return this.expectedEarnings === '0.00'
        } else {
          return this.expectedEarnings
        }
      },
      chooseBank () {
        this.chooseBankImg = choosed
        this.chooseBalanceImg = unchoose
        this.chooseBankPay = true
        this.payWay = '1'
      },
      chooseBalance () {
        if (this.balance === 0) {
          this.chooseBankImg = choosed
          this.chooseBalanceImg = unchoose
          this.chooseBankPay = false
        } else {
          if (this.$route.path.indexOf('hqj') >= 0) {
            if (this.balance < this.hqjBuyMoney) {
              this.chooseBankImg = choosed
              this.chooseBalanceImg = unchoose
              this.chooseBankPay = false
            } else {
              this.chooseBankImg = unchoose
              this.chooseBalanceImg = choosed
              this.chooseBankPay = false
            }
          } else if (this.$route.path.indexOf('wzj') >= 0) {
            if (this.byAmount === true) {
              if (this.balance < this.inputAmounts) {
                this.chooseBankImg = choosed
                this.chooseBalanceImg = unchoose
                this.chooseBankPay = false
              } else {
                this.chooseBankImg = unchoose
                this.chooseBalanceImg = choosed
                this.chooseBankPay = false
              }
            } else {
              if (this.balance < this.equivalentMoney) {
                this.chooseBankImg = choosed
                this.chooseBalanceImg = unchoose
                this.chooseBankPay = false
              } else {
                this.chooseBankImg = unchoose
                this.chooseBalanceImg = choosed
                this.chooseBankPay = false
              }
            }
          }
        }
      },
      showBuyWrap () {
        if (this.$route.path.indexOf('hqj') >= 0) {
          this.showHqj = true
          this.showWzj = false
        } else if (this.$route.path.indexOf('wzj') >= 0) {
          this.showHqj = false
          this.showWzj = true
        }
      },
      buyHqj () {
        if (window.localStorage.userToken === undefined) {
          if (this.$route.path.indexOf('novicehqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicehqj'
          } else if (this.$route.path.indexOf('hqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'hqj'
          }
          this.$router.push('/login/pwdLogin')
        } else if (this.hqjBuyMoney === '') {
          this.errorMsg = '请输入购买金额'
        } else if (this.hqjBuyMoney < 100) {
          this.errorMsg = '100元起够'
        } else {
          this.errorMsg = ''
          if (this.chooseBankPay === true) {
            if (this.authenticated === true) {
              this.popBgShow = true
              this.showBankWrap = true
              this.buyHQJBank()
            } else {
              this.errorMsg = '请先实名认证'
            }
          } else {
//            alert('余额支付')
            this.whitherSetPayPwd()
          }
        }
      },
      buyWzj () {
        if (window.localStorage.userToken === undefined) {
          if (this.$route.path.indexOf('novicewzj30') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicewzj30'
          } else if (this.$route.path.indexOf('novicewzj360') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicewzj360'
          } else if (this.$route.path.indexOf('wzj30') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj30'
          } else if (this.$route.path.indexOf('wzj60') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj60'
          } else if (this.$route.path.indexOf('wzj90') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj90'
          } else if (this.$route.path.indexOf('wzj180') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj180'
          } else if (this.$route.path.indexOf('wzj360') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj360'
          } else if (this.$route.path.indexOf('novicehqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicehqj'
          } else if (this.$route.path.indexOf('hqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'hqj'
          }
          this.$router.push('/login/pwdLogin')
        } else if (this.byAmount === true) {
          if (this.inputAmounts === '') {
            this.errorMsg = '请输入购买金额'
          } else if (this.inputAmounts < 100) {
            this.errorMsg = '100元起够'
          } else {
            this.errorMsg = ''
            if (this.chooseBankPay === true) {
              if (this.authenticated === true) {
                this.popBgShow = true
                this.showBankWrap = true
                this.buyWZJBank()
              } else {
                this.errorMsg = '请先实名认证'
              }
            } else {
              this.whitherSetPayPwd()
            }
          }
        } else if (this.byAmount === false) {
          if (this.inputGrams === '') {
            this.errorMsg = '请输入购买克数'
          } else if (this.equivalentMoney < 100) {
            this.errorMsg = '购买金额不足100元'
          } else {
            this.errorMsg = ''
            if (this.chooseBankPay === true) {
              if (this.authenticated === true) {
                this.popBgShow = true
                this.showBankWrap = true
                this.buyWZJBank()
              } else {
                this.errorMsg = '请先实名认证'
              }
            } else {
              this.whitherSetPayPwd()
            }
          }
        }
      },
      dayDiff () {
        let newDay = document.getElementById('jxDayHqj').innerText
        let futureDay = this.date
        DateDiff(newDay, futureDay)
      },
      getExpectedEarning () {
        this.dayDiff()
        let interest = 1 + parseFloat(this.message[3])
        this.expectedEarnings = Math.floor((parseFloat(this.hqjBuyMoney * Math.pow(interest, parseFloat(parseInt(window.sessionStorage.iDays) / 360))) - this.hqjBuyMoney) * 100) / 100
        if (isNaN(this.expectedEarnings)) {
          return this.expectedEarnings === '0.00'
        }
      },
      whetherAuthenticated () {
        this.$http.get(host + authQuery, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.authenticated = true
            this.noauthenticate = false
            let buyBtn = document.getElementsByClassName('buyNow')[0]
            buyBtn.style.backgroundColor = '#f2b643'
            buyBtn.disabled = false
          } else if (res.code === -1) {
            this.authenticated = false
            this.noauthenticate = true
            let buyBtn = document.getElementsByClassName('buyNow')[0]
            buyBtn.style.backgroundColor = '#ccc'
            buyBtn.disabled = true
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      changeByAmount () {
        this.chooseBankImg = choosed
        this.chooseBalanceImg = unchoose
        this.chooseBankPay = true
        this.byAmount = true
        this.byGrams = false
        this.inputAmounts = ''
        this.expectProfitWzj = '0.00'
        this.equivalentMoney = '0.00'
        this.errorMsg = ''
        this.wzjWaitPay = '0.00'
      },
      changeByGrams () {
        this.chooseBankImg = choosed
        this.chooseBalanceImg = unchoose
        this.chooseBankPay = true
        this.byAmount = false
        this.byGrams = true
        this.inputGrams = ''
        this.errorMsg = ''
        this.expectProfitWzj = '0.00'
        this.equivalentGrams = '0.00'
        this.wzjWaitPay = '0.00'
      },
      goIdentification () {
        if (window.localStorage.userToken === undefined) {
          if (this.$route.path.indexOf('novicewzj30') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicewzj30'
          } else if (this.$route.path.indexOf('novicewzj360') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicewzj360'
          } else if (this.$route.path.indexOf('wzj30') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj30'
          } else if (this.$route.path.indexOf('wzj60') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj60'
          } else if (this.$route.path.indexOf('wzj90') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj90'
          } else if (this.$route.path.indexOf('wzj180') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj180'
          } else if (this.$route.path.indexOf('wzj360') >= 0) {
            window.sessionStorage.goBuyproMark = 'wzj360'
          } else if (this.$route.path.indexOf('novicehqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'novicehqj'
          } else if (this.$route.path.indexOf('hqj') >= 0) {
            window.sessionStorage.goBuyproMark = 'hqj'
          }
          this.$router.push('/login/pwdLogin')
        } else {
          if (this.$route.path.indexOf('hqj') >= 0) {
//            console.log(this.hqjBuyMoney === '')
            if (this.hqjBuyMoney === '') {
              this.errorMsg = '请输入购买金额'
            } else if (parseFloat(this.hqjBuyMoney) < 100) {
              this.errorMsg = '100元起够'
            } else {
              if (this.$route.path.indexOf('novicehqj') >= 0) {
                window.sessionStorage.productsType = '新手活期金买入'
                window.sessionStorage.buyMoney = this.hqjBuyMoney
                window.sessionStorage.goAuthMark = 'novicehqj'
              } else if (this.$route.path.indexOf('hqj') >= 0) {
                window.sessionStorage.productsType = '活期金买入'
                window.sessionStorage.buyMoney = this.hqjBuyMoney
                window.sessionStorage.goAuthMark = 'hqj'
              }
              this.$router.push('/account/certification')
            }
          } else if (this.$route.path.indexOf('wzj') >= 0) {
            if (this.byAmount === true) {
              if (this.inputAmounts === '') {
                this.errorMsg = '请输入购买金额'
              } else if (parseFloat(this.inputAmounts) < 100) {
                this.errorMsg = '100元起够'
              } else {
                if (this.$route.path.indexOf('novicewzj30') >= 0) {
                  window.sessionStorage.productsType = '新手稳赚金30天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'novicewzj30'
                } else if (this.$route.path.indexOf('novicewzj360') >= 0) {
                  window.sessionStorage.productsType = '新手稳赚金360天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'novicewzj360'
                } else if (this.$route.path.indexOf('wzj30') >= 0) {
                  window.sessionStorage.productsType = '稳赚金30天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'wzj30'
                } else if (this.$route.path.indexOf('wzj60') >= 0) {
                  window.sessionStorage.productsType = '稳赚金60天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'wzj60'
                } else if (this.$route.path.indexOf('wzj90') >= 0) {
                  window.sessionStorage.productsType = '稳赚金90天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'wzj90'
                } else if (this.$route.path.indexOf('wzj180') >= 0) {
                  window.sessionStorage.productsType = '稳赚金180天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'wzj180'
                } else if (this.$route.path.indexOf('wzj360') >= 0) {
                  window.sessionStorage.productsType = '稳赚金360天买入'
                  window.sessionStorage.buyMoney = this.inputAmounts
                  window.sessionStorage.goAuthMark = 'wzj360'
                }
                this.$router.push('/account/certification')
              }
            } else if (this.byAmount === false) {
              if (this.equivalentMoney === '') {
                this.errorMsg = '请输入购买克数'
              } else if (parseFloat(this.equivalentMoney) < 100) {
                this.errorMsg = '100元起够'
              } else {
                if (this.$route.path.indexOf('novicewzj30') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'novicewzj30'
                } else if (this.$route.path.indexOf('novicewzj360') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'novicewzj360'
                } else if (this.$route.path.indexOf('wzj30') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'wzj30'
                } else if (this.$route.path.indexOf('wzj60') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'wzj60'
                } else if (this.$route.path.indexOf('wzj90') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'wzj90'
                } else if (this.$route.path.indexOf('wzj180') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'wzj180'
                } else if (this.$route.path.indexOf('wzj360') >= 0) {
                  window.sessionStorage.buyMoney = this.equivalentMoney
                  window.sessionStorage.goAuthMark = 'wzj360'
                }
                this.$router.push('/account/certification')
              }
            }
          }
        }
      },
      getUserInfo () {
        this.$http.get(host + bankCards, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            this.bankCard = res.result[0].bankCard
            this.bankPhone = res.result[0].bankPhone
            this.authToken = res.result[0].authToken
            this.getBankName = res.result[0].bank
            this.bankEndNum = res.result[0].bankCard.substring(res.result[0].bankCard.length - 4, res.result[0].bankCard.length)
            this.bankEndFourNum = res.result[0].IDcard.substring(res.result[0].IDcard.length - 4, res.result[0].IDcard.length)
            this.userName = res.result[0].name.substring(0, 1) + '**'
            this.IdCard = res.result[0].IDcard.substring(0, 4) + '****' + res.result[0].IDcard.substring(res.result[0].IDcard.length - 3, res.result[0].IDcard.length)
            if (res.result[0].bank.indexOf('交通银行') >= 0) {
              this.bankImgUrl = jiaotongbank
            } else if (res.result[0].bank.indexOf('建设银行') >= 0) {
              this.bankImgUrl = jianshebank
            } else if (res.result[0].bank.indexOf('xxxx') >= 0) {
              this.bankImgUrl = zhongguobank
            } else if (res.result[0].bank.indexOf('工商银行') >= 0) {
              this.bankImgUrl = gongshangbank
            } else if (res.result[0].bank.indexOf('平安银行') >= 0) {
              this.bankImgUrl = pinganbank
            } else if (res.result[0].bank.indexOf('中信银行') >= 0) {
              this.bankImgUrl = zhongxinbank
            } else if (res.result[0].bank.indexOf('光大银行') >= 0) {
              this.bankImgUrl = guangdabank
            } else if (res.result[0].bank.indexOf('浦发银行') >= 0) {
              this.bankImgUrl = pufabank
            } else if (res.result[0].bank.indexOf('兴业银行') >= 0) {
              this.bankImgUrl = xingyebank
            } else if (res.result[0].bank.indexOf('农业银行') >= 0) {
              this.bankImgUrl = nongyebank
            } else if (res.result[0].bank.indexOf('邮政银行') >= 0) {
              this.bankImgUrl = youzhengbank
            } else if (res.result[0].bank.indexOf('招商银行') >= 0) {
              this.bankImgUrl = zhaoshangbank
            } else if (res.result[0].bank.indexOf('华夏银行') >= 0) {
              this.bankImgUrl = huaxiabank
            } else if (res.result[0].bank.indexOf('广发银行') >= 0) {
              this.bankImgUrl = guangfabank
            } else if (res.result[0].bank.indexOf('民生银行') >= 0) {
              this.bankImgUrl = minshengbank
            } else if (res.result[0].bank.indexOf('上海银行') >= 0) {
              this.bankImgUrl = shanghaiBank
            } else {
              this.bankImgUrl = minshengbank
            }
          } else if (res.code === -3 || res.code === -4) {
//            localStorage.clear()
//            sessionStorage.clear()
//            document.body.scrollTop = document.documentElement.scrollTop = 0
//            this.$store.commit('updateLogin', false)
//            this.$store.commit('updateNoLogin', true)
//            this.$router.push('/login/pwdLogin')
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      getAcountBalance () {
        this.$http.get(host + assetQuery, {
          params: {
            phone: window.localStorage.userName
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
//          console.log(res)
          if (res.code === 0) {
            this.balance = Math.floor(res.asset.balance * 100) / 100
          }
        })
      },
      setPayPwd () {
        if (this.inputPayPwd === '') {
          this.popErrorMsg = '请输入6位数字交易密码'
        } else if (this.inputPayPwd.length < 6) {
          this.popErrorMsg = '交易密码不足6位'
        } else if (this.confirmPayPwd === '') {
          this.popErrorMsg = '请确认6位数字支付密码'
        } else if (this.inputPayPwd !== this.confirmPayPwd) {
          this.popErrorMsg = '两次密码不一致'
        } else {
          this.fullscreenLoading = true
          this.$http.post(host + paypwd, {
            phone: window.localStorage.userName,
            paypwd: sha256(this.confirmPayPwd)
          }, {
            headers: {
              'Content-Type': 'application/json',
              'token': window.localStorage.userToken
            }
          }).then((response) => {
            let res = response.data
            console.log(res)
            if (res.code === 0) {
              this.fullscreenLoading = false
              this.popErrorMsg = res.msg
              setTimeout(() => {
                this.showSetPayPwdWrap = false
                this.showYEpayWrap = true
                this.popErrorMsg = ''
              }, 1500)
            }
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        }
      },
      buyNoviceHqjYE () {
        this.$http.post(host + xinshouGoldbuyIn, {
          phone: window.localStorage.userName,
          amount: this.hqjBuyMoney,
          payWay: '0'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.showYEpayWrap = false
            this.showBuySuccess = true
            this.fullscreenLoading = false
          } else if (this.code === -3 || res.code === -4) {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
            setTimeout(() => {
              this.$router.push('/login/pwdLogin')
            }, 1000)
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      buyHQJYE () {
        this.$http.post(host + currentGoldbuyIn, {
          phone: window.localStorage.userName,
          orderId: (window.localStorage.userName + new Date().getTime()),
          amount: this.hqjBuyMoney,
          payWay: '0'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.showYEpayWrap = false
            this.showBuySuccess = true
            this.fullscreenLoading = false
          } else if (this.code === -3 || res.code === -4) {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
            setTimeout(() => {
              this.$router.push('/login/pwdLogin')
            }, 1000)
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      buyWZJProYE () {
        this.$http.post(host + productbuyIn, {
          phone: window.localStorage.userName,
          orderId: (window.localStorage.userName + new Date().getTime()),
          amount: this.wzjWaitPay,
          productId: window.sessionStorage.productId,
          goldPriceBuy: this.$store.state.goldPrice,
          payWay: '0'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            this.showYEpayWrap = false
            this.showBuySuccess = true
            this.fullscreenLoading = false
          } else if (this.code === -3 || res.code === -4) {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
            setTimeout(() => {
              this.$router.push('/login/pwdLogin')
            }, 1000)
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      paypwdCheck () {
        this.popErrorMsg = ''
        this.fullscreenLoading = true
        this.$http.post(host + paypwdCheck, {
          phone: window.localStorage.userName,
          paypwd: sha256(this.payPwd)
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.fullscreenLoading = false
            if (this.$route.path.indexOf('novicehqj') >= 0) {
              this.buyNoviceHqjYE()
            } else if (this.$route.path.indexOf('hqj') >= 0) {
              this.buyHQJYE()
            } else {
              this.buyWZJProYE()
            }
          } else if (this.code === -3 || res.code === -4) {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
            setTimeout(() => {
              this.$router.push('/login/pwdLogin')
            }, 1000)
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      getMessageMac () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')
        let accountId = 'accountId=2120170306142335001'
        let key = 'key=caibao1314'
        let phoneNoName = 'phoneNo'
        let phoneNoNum = this.bankPhone
        let phoneNoArr = []
        phoneNoArr.push(phoneNoName, phoneNoNum)
        let phoneNo = phoneNoArr.join('=')
        let orderIdName = 'orderId'
        let orderIdNum = this.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')
        let tokenName = 'token'
        let tokenNum = this.authToken
        let tokenArr = []
        tokenArr.push(tokenName, tokenNum)
        let token = tokenArr.join('=')
        let messageMacArr = []
        messageMacArr.push(accountId, customerId, token, orderId, phoneNo, key)
        let messagemac = messageMacArr.join('&')
        this.messagemac = md5(messagemac).toUpperCase()
      },
      payMac () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')
        let accountId = 'accountId=2120170306142335001'
        let key = 'key=caibao1314'
        let vericodeName = 'vericode'
        let vericodeNum = this.bankPhoneMsg
        let vericodeArr = []
        vericodeArr.push(vericodeName, vericodeNum)
        let vericode = vericodeArr.join('=')
        let orderIdName = 'orderId'
        let orderIdNum = this.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')
        let tokenName = 'token'
        let tokenNum = this.authToken
        let tokenArr = []
        tokenArr.push(tokenName, tokenNum)
        let token = tokenArr.join('=')
        let payMacArr = []
        payMacArr.push(accountId, customerId, token, orderId, vericode, key)
        let paymac = payMacArr.join('&')
        this.payMAC = md5(paymac).toUpperCase()
      },
      getPrePayMac () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')
        let tokenName = 'token'
        let tokenNum = this.authToken
        let tokenArr = []
        tokenArr.push(tokenName, tokenNum)
        let token = tokenArr.join('=')
        let orderIdName = 'orderId'
        let orderIdNum = this.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')
        let purposeName = 'purpose'
        let purposeNum = '产品购买'
        let purposeArr = []
        purposeArr.push(purposeName, purposeNum)
        let purpose = purposeArr.join('=')
        let amountName = 'amount'
        let amountNum
        if (this.$route.path.indexOf('hqj') >= 0) {
          amountNum = this.hqjBuyMoney
        } else {
          amountNum = this.wzjWaitPay
        }
        let amountArr = []
        amountArr.push(amountName, amountNum)
        let amount = amountArr.join('=')
        let accountId = 'accountId=2120170306142335001'
        let payType = 'payType=1'
        let responseUrl = 'responseUrl=http://47.74.133.222:8888/payResult'
        let key = 'key=caibao1314'
        let macArr = []
        macArr.push(accountId, customerId, payType, token, orderId, purpose, amount, responseUrl, key)
        let mac = macArr.join('&')
        this.prePayMac = md5(mac).toUpperCase()
      },
      ysbResult () {
        this.$http.post(host + handleresult, {
          phone: window.localStorage.userName,
          orderId: this.orderId,
          result: this.ysbRes
        }, {
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      prePaymentAgain () {
        this.getPrePayMac()
        let amountNum
        if (this.$route.path.indexOf('hqj') >= 0) {
          amountNum = this.hqjBuyMoney
        } else {
          amountNum = this.wzjWaitPay
        }
//        this.$http.interceptors.request.use((config) => {
//          console.log(config)
//          return config
//        }, (err) => {
//          return Promise.reject(err)
//        })
        this.$http.post(authPayFirst, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          orderId: this.orderId,
          payType: '1',
          purpose: '产品购买',
          amount: amountNum,
          responseUrl: 'http://47.74.133.222:8888/payResult',
          token: this.authToken,
          mac: this.prePayMac
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          let res = response.data
          this.fullscreenLoading = false
          if (res.result_code === '0000') {
            this.countDown()
          } else {
            this.popErrorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      buyHQJBank () {
        this.orderId = window.localStorage.userName + new Date().getTime()
        console.log(this.$route.path)
        if (this.$route.path.indexOf('novicehqj') >= 0) {
          this.$http.post(host + xinshouGoldbuyIn, {
            phone: window.localStorage.userName,
            amount: this.hqjBuyMoney,
            payWay: '1',
            bankCard: this.bankCard
          }, {
            headers: {
              'Content-Type': 'application/json',
              'token': window.localStorage.userToken
            }
          }).then((response) => {
            let res = response.data
            this.orderId = res.orderId
            if (res.code === 0) {
              this.prePaymentAgain()
            } else if (res.code === -3 || res.code === -4) {
              this.fullscreenLoading = false
              localStorage.clear()
              sessionStorage.clear()
              document.body.scrollTop = document.documentElement.scrollTop = 0
              this.$store.commit('updateLogin', false)
              this.$store.commit('updateNoLogin', true)
              setTimeout(() => {
                this.$router.push('/login/pwdLogin')
              }, 1000)
            } else {
              this.fullscreenLoading = false
              this.popErrorMsg = res.msg
            }
            console.log(res)
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        } else {
          this.$http.post(host + currentGoldbuyIn, {
            phone: window.localStorage.userName,
            orderId: this.orderId,
            amount: this.hqjBuyMoney,
            payWay: '1',
            bankCard: this.bankCard
          }, {
            headers: {
              'Content-Type': 'application/json',
              'token': window.localStorage.userToken
            }
          }).then((response) => {
            let res = response.data
            console.log(res)
            if (res.code === 0) {
              this.prePaymentAgain()
            } else if (res.code === -3 || res.code === -4) {
              this.fullscreenLoading = false
              localStorage.clear()
              sessionStorage.clear()
              document.body.scrollTop = document.documentElement.scrollTop = 0
              this.$store.commit('updateLogin', false)
              this.$store.commit('updateNoLogin', true)
              setTimeout(() => {
                this.$router.push('/login/pwdLogin')
              }, 1000)
            } else {
              this.fullscreenLoading = false
              this.popErrorMsg = res.msg
            }
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        }
      },
      buyWZJBank () {
        this.fullscreenLoading = true
        this.orderId = window.localStorage.userName + new Date().getTime()
        this.$http.post(host + productbuyIn, {
          phone: window.localStorage.userName,
          orderId: this.orderId,
          amount: this.wzjWaitPay,
          productId: window.sessionStorage.productId,
          goldPriceBuy: this.$store.state.goldPrice,
          payWay: '1',
          bankCard: this.bankCard
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            this.prePaymentAgain()
          } else if (res.code === -3 || res.code === -4) {
            this.fullscreenLoading = false
            localStorage.clear()
            sessionStorage.clear()
            document.body.scrollTop = document.documentElement.scrollTop = 0
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
            setTimeout(() => {
              this.$router.push('/login/pwdLogin')
            }, 1000)
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      sendVercodeAgain () {
        this.getMessageMac()
        this.$http.post(authPaysendVercode, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          orderId: this.orderId,
          phoneNo: this.bankPhone,
          token: this.authToken,
          mac: this.messagemac
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          let res = response.data
          if (res.result_code === '0000') {
            this.fullscreenLoading = false
            this.countDown()
          } else {
            this.fullscreenLoading = false
            this.popErrorMsg = res.result_msg
          }
          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      confirmPayBank () {
        this.fullscreenLoading = true
        this.payMac()
        this.$http.post(confirmPay, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          orderId: this.orderId,
          vericode: this.bankPhoneMsg,
          token: this.authToken,
          mac: this.payMAC
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          this.fullscreenLoading = false
          if (res.result_code === '0000') {
            if (res.status === '00') {
              this.showBuySuccess = true
            } else {
              this.popErrorMsg = res.result_msg
            }
          } else {
            this.popErrorMsg = res.result_msg
          }
          this.ysbResult()
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      }
    },
    components: {
      datepicker
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    computed: {
      inputMsg () {
        if (this.bankPhoneMsg.length === 6) {
          this.confirmDisabled = false
          this.confirmBG = '#f2b643'
        } else {
          this.confirmDisabled = true
          this.confirmBG = '#ccc'
        }
      },
      hqjBuy () {
        if (this.payPwd.length === 6) {
          this.paypwdCheck()
        } else {
          this.popErrorMsg = ''
        }
      },
      wzjBuy () {
        if (this.payPwd.length === 6) {
          this.paypwdCheck()
        } else {
          this.popErrorMsg = ''
        }
      },
      expectedEarning () {
        if (parseFloat(this.balance) < parseFloat(this.hqjBuyMoney)) {
          this.enoughMoney = false
          this.chooseBankImg = choosed
          this.chooseBalanceImg = unchoose
          this.chooseBankPay = true
          this.disabled = true
          this.backgroundStyle = '#ccc'
        } else {
          this.enoughMoney = true
          if (parseFloat(this.hqjBuyMoney) >= 100) {
            if (parseFloat(this.hqjBuyMoney) > parseFloat(this.ceiling)) {
              this.errorMsg = '您已超过产品购买限额'
              this.disabled = true
              this.backgroundStyle = '#ccc'
            } else {
              this.errorMsg = ''
              this.disabled = false
              this.backgroundStyle = '#f2b643'
            }
          } else {
            this.disabled = true
            this.backgroundStyle = '#ccc'
          }
        }
        let interest = 1 + parseFloat(this.message[3])
        this.expectedEarnings = (Math.floor((parseFloat(this.hqjBuyMoney * Math.pow(interest, parseFloat(parseInt(window.sessionStorage.iDays) / 360))) - this.hqjBuyMoney) * 100) / 100).toFixed(2)
        if (isNaN(this.expectedEarnings)) {
          return this.expectedEarnings === '0.00'
        }
      },
      convertMoney () {
        this.errorMsg = ''
        this.equivalentMoney = (Math.floor(this.inputGrams * parseFloat(this.$store.state.goldPrice) * 100) / 100).toFixed(2)
        this.wzjWaitPay = this.equivalentMoney
      },
      convertGrams () {
        this.errorMsg = ''
        this.equivalentGrams = (Math.floor(this.inputAmounts / parseFloat(this.$store.state.goldPrice) * 100) / 100).toFixed(2)
        this.wzjWaitPay = this.inputAmounts
      },
      wzjExpectProfit () {
//        console.log(this.byAmount)
        if (this.byAmount === true) {
          if (parseFloat(this.balance) < parseFloat(this.inputAmounts)) {
            this.enoughMoney = false
            this.chooseBankImg = choosed
            this.chooseBalanceImg = unchoose
            this.chooseBankPay = true
            this.disabled = true
            this.backgroundStyle = '#ccc'
          } else {
            this.enoughMoney = true
            if (parseFloat(this.inputAmounts) >= 100) {
              if (parseFloat(this.inputAmounts) > parseFloat(this.ceiling)) {
                this.errorMsg = '您已超过产品购买限额'
                this.disabled = true
                this.backgroundStyle = '#ccc'
              } else {
                this.errorMsg = ''
                this.disabled = false
                this.backgroundStyle = '#f2b643'
              }
            } else {
              this.disabled = true
              this.backgroundStyle = '#ccc'
            }
          }
          this.expectProfitWzj = (Math.floor((this.inputAmounts * this.interest[2].replace(/[\u4E00-\u9FA5]/g, '') * this.interest[3]) / 360 * 100) / 100).toFixed(2)
        } else {
          if (parseFloat(this.balance) < parseFloat(this.equivalentMoney)) {
            this.enoughMoney = false
            this.chooseBankImg = choosed
            this.chooseBalanceImg = unchoose
            this.chooseBankPay = true
            this.disabled = true
            this.backgroundStyle = '#ccc'
          } else {
            this.enoughMoney = true
            if (parseFloat(this.equivalentMoney) >= 100) {
              if (parseFloat(this.equivalentMoney) > parseFloat(this.ceiling)) {
                this.errorMsg = '您已超过产品购买限额'
                this.disabled = true
                this.backgroundStyle = '#ccc'
              } else {
                this.errorMsg = ''
                this.disabled = false
                this.backgroundStyle = '#f2b643'
              }
            } else {
              this.disabled = true
              this.backgroundStyle = '#ccc'
            }
          }
          this.expectProfitWzj = (Math.floor(this.equivalentMoney * this.interest[2].replace(/[\u4E00-\u9FA5]/g, '') * this.interest[3] / 360 * 100) / 100).toFixed(2)
        }
      }
    }
  }
</script>
