<template>
  <div class="accountContent">
    <div class="accountContentTitle">实名认证</div>
    <div class="noCertification" style="display: none;">
      <h3 class="noCertificationFont">您还没有实名认证哦，赶紧去交易实名认证吧</h3>
      <a href="javascript:;" class="goCertificationBtn">去交易认证</a>
      <div class="superviseFont">监管部门规定，购买理财产品需要提供实名信息以确保投资安全</div>
    </div>
    <div class="authenticated" v-if="authenticated">
      <h3 class="congratulation">恭喜您已完成实名认证</h3>
      <p class="authenticateDes">
        1.实名认证将您的资产与个人绑定，保障账户资金安全。<br>
        2.您已实名认证通过，身份信息将不得修改。
      </p>
      <div class="userInfoWrap">
        <ul>
          <li>
            <img src="../../../static/img/u5581.png" alt=""> &nbsp;实名认证
          </li>
          <li>
            认证姓名：<span>{{userName}}</span><br>
            身份证号：<span>{{IdCard}}</span>
          </li>
          <li class="textRight colorYE marginTop10">√已实名认证</li>
          <div class="clear"></div>
        </ul>
        <ul>
          <li><img src="../../../static/img/u5585.png" alt="">&nbsp;绑定银行卡</li>
          <li>
            <div class="bankIcon">
              <img src="../../../static/img/zhaoshangbank.png" :src="bankImgUrl" alt="">
            </div>
            <div class="bankInfo">
              <span>{{getBankName}}</span>&nbsp;尾号<span>{{bankEndNum}}</span><br>
              <span>单笔5万</span>&nbsp;<span>单日5万</span>
            </div>

          </li>
          <li class="textRight colorYE marginTop10">√银行卡已绑定</li>
          <div class="clear"></div>
        </ul>
      </div>
    </div>
    <div class="authenticating" v-if="noauthenticate">
      <div v-if="noAuth">
        <div class="superviseFont">监管部门规定，购买理财产品需要提供实名信息以确保投资安全</div>
        <ul class="authenticatingContent">
          <li>
            开户银行
            <!--<input type="text" placeholder="" v-model="bankName">-->
            <autocomplete
              style="height: 48px;"
              class="inline-input"
              v-model="bankName"
              :fetch-suggestions="querySearch"
              placeholder="请选择银行"
              @select="handleSelect">
              <template slot-scope="props">
                <div class="name">{{ props.item.value }}</div>
                <div class="addr" style="border-bottom: 1px solid #ccc;">{{ props.item.des }}</div>
              </template></autocomplete>
          </li>
          <li>开户卡号 <input type="phone" placeholder="银行卡号" v-model="bankCardNum"></li>
          <li>开户人 <input type="text" placeholder="开户人" v-model="personName"></li>
          <li>身份证号码 <input type="phone" maxlength="18" placeholder="开户人身份证号码" v-model="IDCard"></li>
          <li>手机号码 <input type="phone" maxlength="11" placeholder="银行预留手机号码" v-model="bankPhone"></li>
          <li>验证码 <input type="tel" maxlength="6" placeholder="手机验证码" class="identifyingCode" v-model="authCode">
            <input type="button" ref="getMsgCode" v-loading.fullscreen="fullscreenLoading" v-model="getMsgCodeBtn" class="getIdentifyingCode" @click="getMsgCode">
            <!--<a href="javascript:;" class="getIdentifyingCode">获取验证码</a>-->
          </li>
          <li>
            <div class="errorMsg" v-text="errorMsg"  style="text-align: left;width: 345px;"></div>
          </li>
          <li>
            <!--<a href="javascript:;" class="authenticatingNow">马上认证</a>-->
            <input type="button" class="authenticatingNow" value="马上认证" @click="authNow">
          </li>
          <li class="flex" style="text-align: center;line-height: 20px">
            <span class="colorYE flex0_6" style="font-size: 20px;">★</span>
            <span class="flex8">依据《中华人民共和国居民身份证条例》第十五条，为了 保证您的账户及资金安全，请勿冒用他人身份信息及银行卡信息，请使用真实有效的本人身份信息。</span>
          </li>
        </ul>
      </div>
      <div v-else style="text-align: center;padding-top: 150px;">
        <p class="noRecordFont">您还没有实名认证哦，赶紧去交易实名认证吧!</p>
        <a href="javascript:;" class="goMakeMoneyBtn" @click="goBuyHqj" style="width: 380px;margin:50px 0 20px 0;">去交易认证</a>
        <div class="superviseFont">监管部门规定，购买理财产品需要提供实名信息以确保投资安全</div>
      </div>
    </div>
  </div>
</template>
<style>
  .authenticatingContent li .getIdentifyingCode{
    border: 1px solid #f2b643;
    vertical-align: middle;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 5px;
    text-align: center;
    line-height: 38px;
    margin-left: 8px;
    color: #f2b643;
    height: 38px;
    width: 90px;
    background-color: #fff;
    cursor:pointer;
    padding:0;
  }
</style>
<script>
  import {host, authQuery, authPayFirst, bankCards, bankCardunique, xinshouGoldbuyIn, productbuyIn, currentGoldbuyIn, getproduct, handleresult, bankCard, authPaysendVercode, confirmPay} from '@/assets/js/config.js'
  import {input, Autocomplete, Loading} from 'element-ui'
  import md5 from 'js-md5'
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
//  this.use(Loading.directive)
  export default {
    data () {
      return {
        fullscreenLoading: false,
        noAuth: false,
        restaurants: [],
        state1: '',
        state2: '',
        errorMsg: '',
        authenticated: false,
        noauthenticate: false,
        bankName: '',
        bankCardNum: '',
        personName: '',
        IDCard: '',
        bankPhone: '',
        authCode: '',
        userName: '',
        IdCard: '',
        getBankName: '',
        bankEndNum: '',
        bankImgUrl: '',
        getMsgCodeBtn: '获取验证码'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getProduct()
        this.whetherAuthenticated()
        this.getBankInfo()
        this.restaurants = this.loadAll()
      })
    },
    methods: {
      confirmPay () {
        this.getConfirmPayMac()
        this.$http.post(confirmPay, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          orderId: window.sessionStorage.orderId,
          vericode: this.authCode,
          token: window.sessionStorage.payToken,
          mac: window.sessionStorage.paymac
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((response) => {
          let res = response.data
          window.sessionStorage.ysbRes = JSON.stringify(res)
          console.log(res)
          this.fullscreenLoading = false
          if (res.result_code === '0000') {
            if (res.status === '00') {
            } else {
              this.errorMsg = res.desc
            }
          } else {
            this.errorMsg = res.result_msg
          }
          this.ysbRes()
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      authNow () {
//        if (window.sessionStorage.goAuthMark === 'novicehqj') {
//          this.$router.push('/novicehqj/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'hqj') {
//          this.$router.push('/hqj/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'novicewzj30') {
//          this.$router.push('/novicewzj30/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'novicewzj360') {
//          this.$router.push('/novicewzj360/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'wzj30') {
//          this.$router.push('/wzj30/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'wzj60') {
//          this.$router.push('/wzj60/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'wzj90') {
//          this.$router.push('/wzj90/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'wzj180') {
//          this.$router.push('/wzj180/proDetail')
//        } else if (window.sessionStorage.goAuthMark === 'wzj360') {
//          this.$router.push('/wzj360/proDetail')
//        }
        if (this.bankName === '') {
          this.errorMsg = '请选择绑定的银行卡'
        } else if (this.bankCardNum === '') {
          this.errorMsg = '请输入开户卡号'
        } else if (this.personName === '') {
          this.errorMsg = '请输入开户人姓名'
        } else if (this.IDCard === '') {
          this.errorMsg = '请输入身份证号码'
        } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDCard))) {
          this.errorMsg = '身份证号码输入不合法'
        } else if (this.bankPhone === '') {
          this.errorMsg = '请输入银行预留手机号码'
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.bankPhone))) {
          this.errorMsg = '手机号码不合法'
        } else if (this.authCode === '') {
          this.errorMsg = '请输入短信验证码'
        } else {
          this.confirmPay()
        }
      },
      goBuyHqj () {
        window.sessionStorage.iDays = '1'
        window.sessionStorage.buyMoney = ''
        this.$router.push('/hqj/proDetail')
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
//          console.log(res)
          if (res.code === 0) {
            this.authenticated = true
            this.noauthenticate = false
          } else if (res.code === -1) {
            this.authenticated = false
            this.noauthenticate = true
            if (window.sessionStorage.goAuthMark === undefined || window.sessionStorage.goAuthMark === '') {
              this.noAuth = false
            } else {
              this.noAuth = true
            }
          } else if (res.code === -3 || res.code === -4) {
//            this.$router.push('/login/pwdLogin')
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      auth () {
        this.$http.post(authPayFirst, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          payType: '0',
          name: this.personName.replace(/\s|\xA0/g, ''),
          phoneNo: this.bankPhone.replace(/\s|\xA0/g, ''),
          cardNo: this.bankCardNum.replace(/\s|\xA0/g, ''),
          idCardNo: this.IDCard.replace(/\s|\xA0/g, ''),
          orderId: window.sessionStorage.orderId,
          amount: window.sessionStorage.buyMoney,
          purpose: window.sessionStorage.productsType,
          responseUrl: 'http://106.14.165.194:1111/payResult',
          mac: window.sessionStorage.mac
        }).then((response) => {
          let res = response.data
          console.log(res)
          window.sessionStorage.ysbRes = JSON.stringify(res)
          this.fullscreenLoading = false
          if (res.result_code === '0000') {
            window.sessionStorage.payToken = res.token
            this.bindCard()
          } else {
            this.errorMsg = res.result_msg
          }
          this.ysbRes()
        })
      },
      ysbRes () {
        this.$http.post(host + handleresult, {
          phone: window.localStorage.userName,
          orderId: window.sessionStorage.orderId,
          result: window.sessionStorage.ysbRes
        }, {
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response.data)
        })
      },
      bindCard () {
        this.$http.post(host + bankCard, {
          phone: window.localStorage.userName,
          bankPhone: this.bankPhone.replace(/\s|\xA0/g, ''),
          name: this.personName.replace(/\s|\xA0/g, ''),
          IDcard: this.IDCard.replace(/\s|\xA0/g, ''),
          bankCard: this.bankCardNum.replace(/\s|\xA0/g, ''),
          bank: this.bankName.replace(/\s|\xA0/g, ''),
          authToken: window.sessionStorage.payToken
        }, {
          headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === -1 || res.code === -2) {
            this.errorMsg = res.msg
          } else if (res.code === 0) {
            this.$refs.getMsgCode.disabled = false
            this.getMsgCodeBtn = 60
            var timer2 = setInterval(() => {
              this.getMsgCodeBtn--
              if (this.getMsgCodeBtn <= 0) {
                clearInterval(timer2)
                this.$refs.getMsgCode.disabled = false
                this.getMsgCodeBtn = '重新获取'
                this.errorMsg = ''
                this.showVoice = true
              }
            }, 1000)
          }
        }).catch((response) => {
          console.log(response.data)
        })
      },
      getBankInfo () {
        this.$http.get(host + bankCards, {
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
            this.getBankName = res.result[0].bank
            this.bankEndNum = res.result[0].bankCard.substring(res.result[0].bankCard.length - 4, res.result[0].bankCard.length)
            this.userName = res.result[0].name.substring(0, 1) + '**'
            this.IdCard = res.result[0].IDcard.substring(0, 4) + '****' + res.result[0].IDcard.substring(res.result[0].IDcard.length - 4, res.result[0].IDcard.length)
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
//            this.$router.push('/login/pwdLogin')
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      getMsgMacFirst () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')

        let nameName = 'name'
        let nameNum = this.personName.replace(/\s|\xA0/g, '')
        let nameArr = []
        nameArr.push(nameName, nameNum)
        let name = nameArr.join('=')

        let phoneNoName = 'phoneNo'
        let phoneNoNum = this.bankPhone.replace(/\s|\xA0/g, '')
        let phoneNoArr = []
        phoneNoArr.push(phoneNoName, phoneNoNum)
        let phoneNo = phoneNoArr.join('=')

        let cardNoName = 'cardNo'
        let cardNoNum = this.bankCardNum.replace(/\s/g, '')
        let cardNoArr = []
        cardNoArr.push(cardNoName, cardNoNum)
        let cardNo = cardNoArr.join('=')

        let idCardNoName = 'idCardNo'
        let idCardNoNum = this.IDCard.replace(/\s/g, '')
        let idCardNoArr = []
        idCardNoArr.push(idCardNoName, idCardNoNum)
        let idCardNo = idCardNoArr.join('=')

        let orderIdName = 'orderId'
        let orderIdNum = window.sessionStorage.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')

        let purposeName = 'purpose'
        let purposeNum = window.sessionStorage.productsType
        let purposeArr = []
        purposeArr.push(purposeName, purposeNum)
        let purpose = purposeArr.join('=')

        let amountName = 'amount'
        let amountNum = window.sessionStorage.buyMoney
        let amountArr = []
        amountArr.push(amountName, amountNum)
        let amount = amountArr.join('=')

        let accountId = 'accountId=2120170306142335001'

        let payType = 'payType=0'

        let responseUrl = 'responseUrl=http://106.14.165.194:1111/payResult'

        let key = 'key=caibao1314'
        let macArr = []
        macArr.push(accountId, customerId, payType, name, phoneNo, cardNo, idCardNo, orderId, purpose, amount, responseUrl, key)
        let mac = macArr.join('&')
        window.sessionStorage.mac = md5(mac).toUpperCase()
      },
      getMsgMacAgain () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')

        let accountId = 'accountId=2120170306142335001'

        let key = 'key=caibao1314'

        let phoneNoName = 'phoneNo'
        let phoneNoNum = this.bankPhone.replace(/\s|\xA0/g, '')
        let phoneNoArr = []
        phoneNoArr.push(phoneNoName, phoneNoNum)
        let phoneNo = phoneNoArr.join('=')

        let orderIdName = 'orderId'
        let orderIdNum = window.sessionStorage.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')

        let tokenName = 'token'
        let tokenNum = window.sessionStorage.payToken
        let tokenArr = []
        tokenArr.push(tokenName, tokenNum)
        let token = tokenArr.join('=')

        let messageMacArr = []
        messageMacArr.push(accountId, customerId, token, orderId, phoneNo, key)
        let messagemac = messageMacArr.join('&')
        window.sessionStorage.messagemac = md5(messagemac).toUpperCase()
      },
      getConfirmPayMac () {
        let customerIdName = 'customerId'
        let customerIdNum = window.localStorage.userName
        let customerIdArr = []
        customerIdArr.push(customerIdName, customerIdNum)
        let customerId = customerIdArr.join('=')
        let accountId = 'accountId=2120170306142335001'
        let key = 'key=caibao1314'
        let vericodeName = 'vericode'
        let vericodeNum = this.authCode
        let vericodeArr = []
        vericodeArr.push(vericodeName, vericodeNum)
        let vericode = vericodeArr.join('=')
        let orderIdName = 'orderId'
        let orderIdNum = window.sessionStorage.orderId
        let orderIdArr = []
        orderIdArr.push(orderIdName, orderIdNum)
        let orderId = orderIdArr.join('=')
        let tokenName = 'token'
        let tokenNum = window.sessionStorage.payToken
        let tokenArr = []
        tokenArr.push(tokenName, tokenNum)
        let token = tokenArr.join('=')
        let payMacArr = []
        payMacArr.push(accountId, customerId, token, orderId, vericode, key)
        let paymac = payMacArr.join('&')
        window.sessionStorage.paymac = md5(paymac).toUpperCase()
        console.log()
      },
      getMsgCode () {
        if (this.bankName === '') {
          this.errorMsg = '请选择绑定的银行卡'
        } else if (this.bankCardNum === '') {
          this.errorMsg = '请输入开户卡号'
        } else if (this.personName === '') {
          this.errorMsg = '请输入开户人姓名'
        } else if (this.IDCard === '') {
          this.errorMsg = '请输入身份证号码'
        } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDCard))) {
          this.errorMsg = '身份证号码输入不合法'
        } else if (this.bankPhone === '') {
          this.errorMsg = '请输入银行预留手机号码'
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.bankPhone))) {
          this.errorMsg = '手机号码不合法'
        } else {
          this.errorMsg = ''
          this.fullscreenLoading = true
          if (window.sessionStorage.goAuthMark === 'novicehqj') {
            if (this.getMsgCodeBtn === '获取验证码') {
              this.uniquenessQuery()
            } else if (this.getMsgCodeBtn === '重新获取') {
              this.sendVercode()
            }
          } else {
            if (this.getMsgCodeBtn === '获取验证码') {
              window.sessionStorage.orderId = window.localStorage.userName + new Date().getTime()
              this.uniquenessQuery()
            } else if (this.getMsgCodeBtn === '重新获取') {
              this.sendVercode()
            }
          }
        }
      },
      uniquenessQuery () {
        this.$http.get(host + bankCardunique, {
          params: {
            phone: window.localStorage.userName,
            IDcard: this.IDCard
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((result) => {
          let res = result.data
          console.log(res)
          if (res.code === 0) {
            if (window.sessionStorage.goAuthMark === 'novicehqj') {
              this.buyNoviceHqj()
            } else if (window.sessionStorage.goAuthMark === 'hqj') {
              this.buyHqj()
            } else {
              this.buyWzj()
            }
          } else if (res.code === -3 || res.code === -4) {
//            this.$route.push('/login/pwdLogin')
          } else {
            this.fullscreenLoading = false
            this.errorMsg = res.msg
          }
        }).catch((result) => {
          let res = result.data
          console.log(res)
        })
      },
      buyNoviceHqj () {
        this.$http.post(host + xinshouGoldbuyIn, {
          phone: window.localStorage.userName,
          amount: window.sessionStorage.buyMoney,
          payWay: '1',
          bankCard: this.bankCardNum.replace(/\s|\xA0/g, '')
        }, {
          headers: {
            token: window.localStorage.userToken,
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            window.sessionStorage.orderId = res.orderId
            this.prePayment()
          } else if (res.code === -3 || res.code === -4) {
            this.$route.push('/login/pwdLogin')
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit('updateLogin', false)
            this.$store.commit('updateNoLogin', true)
          } else {
            this.fullscreenLoading = false
            this.errorMsg = res.msg
          }
//          console.log(res)
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      buyHqj () {
        this.$http.post(host + currentGoldbuyIn, {
          phone: window.localStorage.userName,
          orderId: window.sessionStorage.orderId,
          amount: window.sessionStorage.buyMoney,
          payWay: '1',
          bankCard: this.bankCardNum.replace(/\s|\xA0/g, '')
        }, {
          headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            this.prePayment()
          } else {
            this.fullscreenLoading = false
            this.errorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      buyWzj () {
        this.$http.post(host + productbuyIn, {
          phone: window.localStorage.userName,
          orderId: window.sessionStorage.orderId,
          amount: window.sessionStorage.buyMoney,
          productId: window.sessionStorage.productId,
          goldPriceBuy: window.sessionStorage.currentPrice,
          payWay: '1',
          bankCard: this.bankCardNum.replace(/\s|\xA0/g, '')
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.code === 0) {
            this.prePayment()
          } else {
            this.fullscreenLoading = false
            this.errorMsg = res.msg
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      prePayment () {
        this.getMsgMacFirst()
        this.auth()
      },
      sendVercode () {
        this.getMsgMacAgain()
        this.$http.post(authPaysendVercode, {
          accountId: '2120170306142335001',
          customerId: window.localStorage.userName,
          orderId: window.sessionStorage.orderId,
          phoneNo: this.bankPhone,
          token: window.sessionStorage.payToken,
          mac: window.sessionStorage.messagemac
        }).then((response) => {
          let res = response.data
          console.log(res)
          if (res.result_code === '0000') {
            this.$refs.getMsgCode.disabled = false
            this.getMsgCodeBtn = 60
            var timer2 = setInterval(() => {
              this.getMsgCodeBtn--
              if (this.getMsgCodeBtn <= 0) {
                clearInterval(timer2)
                this.$refs.getMsgCode.disabled = false
                this.getMsgCodeBtn = '重新获取'
                this.errorMsg = ''
                this.showVoice = true
              }
            }, 1000)
          } else {
            this.$refs.getMsgCode.disabled = false
            this.errorMsg = res.result_msg
          }
        })
      },
      getProduct () {
        this.$http.get(host + getproduct, {
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            for (let i = 0; i < res.result.length; i++) {
              if (window.sessionStorage.goAuthMark === 'novicehqj') {
                if (res.result[i].name === '新手活期金') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'hqj') {
                if (res.result[i].name === '活期金') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'novicewzj30') {
                if (res.result[i].name === '新手稳赚金30天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'novicewzj360') {
                if (res.result[i].name === '新手稳赚金360天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'wzj30') {
                if (res.result[i].name === '稳赚金30天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'wzj60') {
                if (res.result[i].name === '稳赚金60天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'wzj90') {
                if (res.result[i].name === '稳赚金90天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'wzj180') {
                if (res.result[i].name === '稳赚金180天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              } else if (window.sessionStorage.goAuthMark === 'wzj360') {
                if (res.result[i].name === '稳赚金360天') {
                  window.sessionStorage.productId = res.result[i].id
                }
              }
            }
          }
        }).catch((response) => {
          let res = response.data
          console.log(res)
        })
      },
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () {
        return [
          { 'value': '交通银行', 'des': '(单笔1万,单日5万)' },
          { 'value': 'xxxx（需开通在线支付）', 'des': '(单笔5万,单日20万)' },
          { 'value': '工商银行', 'des': '(单笔5万,单日20万)' },
          { 'value': '平安银行', 'des': '(单笔5万,单日5万)' },
          { 'value': '中信银行', 'des': '(单笔0.5万,单日1万)' },
          { 'value': '光大银行', 'des': '(单笔5万,单日20万)' },
          { 'value': '浦发银行', 'des': '(单笔5万,单日5万)' },
          { 'value': '兴业银行', 'des': '(单笔5万,单日5万)' },
          { 'value': '农业银行', 'des': '(单笔5万,单日50万)' },
          { 'value': '邮政银行（需开通在线支付）', 'des': '(单笔0.5万,单日0.5万)' },
          { 'value': '招商银行（需开通在线支付）', 'des': '(单笔5万,单日20万)' },
          { 'value': '华夏银行（需开通在线支付）', 'des': '(单笔5万,单日20万)' },
          { 'value': '广发银行', 'des': '(单笔5万,单日无限额)' },
          { 'value': '民生银行', 'des': '(单笔5万,单日500万)' },
          { 'value': '上海银行', 'des': '(单笔5万,单日无限额)' },
          { 'value': '建设银行', 'des': '(单笔2万,单日2万)' }
        ]
      },
      handleSelect (item) {
        console.log(item)
      }
    },
    components: {
      input,
      Autocomplete,
      Loading
    }
  }
</script>
