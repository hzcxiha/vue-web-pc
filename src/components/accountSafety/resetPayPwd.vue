<template>
  <div class="accountSafetyContent">
    <div class="accountContentTitle flex">
      <div class="flex1 textLeft" style="font-size: 18px">重置交易密码</div>
      <div class="flex1 textRight"><a  href="javascript:history.back(-1);" style="font-size: 18px;color: #f2b643;"><  返回</a></div>
    </div>
    <div class="accountSafetyWrap">
      <div class="textCenter" style="font-size: 16px;color: #444;margin-left: 100px;">{{phone}}</div>
      <ul class="reviseContent">
        <li>
          当前密码<input type="password" maxlength="6" placeholder="请输入当前6位数字交易密码" v-model="oldPwd">
        </li>
        <li>
          新密码<input type="password" maxlength="6" placeholder="请输入新6位数字交易密码" v-model="newPwd">
        </li>
        <li>
          确认密码<input type="password" maxlength="6" placeholder="请确认新的交易密码" v-model="confirmPwd">
        </li>
        <div class="errorMsg" v-text="errorMsg"  style="text-align: left;width: 186px;"></div>
        <li>
          <a href="javscript:;" class="confirm" @click="resetPwd">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {host, paypwd} from '@/assets/js/config.js'
  import {sha256} from 'js-sha256'
  export default {
    data () {
      return {
        phone: window.localStorage.userName,
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
        errorMsg: ''
      }
    },
    methods: {
      resetPwd () {
        if (this.oldPwd === '') {
          this.errorMsg = '原支付密码不能为空'
        } else if (this.newPwd === '') {
          this.errorMsg = '请输入新的支付密码'
        } else if (this.confirmPwd === '') {
          this.errorMsg = '请确认新的支付密码'
        } else if (this.newPwd.length < 6 || this.confirmPwd.length < 6) {
          this.errorMsg = '密码不足6位'
        } else {
          this.$http.patch(host + paypwd, {
            phone: window.localStorage.userName,
            paypwd: sha256(this.oldPwd),
            newPaypwd: sha256(this.confirmPwd)
          }, {
            headers: {
              'Content-Type': 'application/json',
              'token': window.localStorage.userToken
            }
          }).then((response) => {
            let res = response.data
            if (res.code === 0) {
              this.errorMsg = res.msg
            } else {
              this.errorMsg = res.msg
            }
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        }
      }
    }
  }
</script>
