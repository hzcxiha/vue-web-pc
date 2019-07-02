<template>
  <div class="accountSafetyContent">
    <div class="accountContentTitle flex">
      <div class="flex1 textLeft" style="font-size: 18px">设置交易密码</div>
      <div class="flex1 textRight"><a  href="javascript:history.back(-1);" style="font-size: 18px;color: #f2b643;"><  返回</a></div>
    </div>
    <div class="accountSafetyWrap">
      <div class="textCenter" style="font-size: 16px;color: #444;margin-left: 100px;">{{phone}}</div>
      <ul class="reviseContent">
        <li>
          设置密码<input type="password" minlength="6" maxlength="6" placeholder="请输入6位数字交易密码" v-model="payPwd">
        </li>
        <li>
          确认密码<input type="password" minlength="6" maxlength="6" placeholder="请确认新的交易密码" v-model="confirmPayPwd">
        </li>
        <div class="errorMsg" v-text="errorMsg"  style="text-align: left;width: 186px;"></div>
        <li>
          <a href="javscript:;" class="confirm" @click="setPayPwd">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {sha256} from 'js-sha256'
  import {host, paypwd} from '@/assets/js/config.js'
  export default {
    data () {
      return {
        phone: window.localStorage.userName,
        payPwd: '',
        confirmPayPwd: '',
        errorMsg: ''
      }
    },
    methods: {
      setPayPwd () {
        if (this.payPwd === '' || this.confirmPayPwd === '') {
          this.errorMsg = '密码不能为空'
        } else if (this.payPwd !== this.confirmPayPwd) {
          this.errorMsg = '两次输入的密码不一致'
        } else {
          this.$http.interceptors.request.use((config) => {
            console.log(config)
            return config
          }, (err) => {
            return Promise.reject(err)
          })
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
              this.errorMsg = res.msg
            } else {
              this.errorMsg = res.msg
            }
          }).catch((result) => {
            let res = result.data
            console.log(res)
          })
        }
      }
    }
  }
</script>
