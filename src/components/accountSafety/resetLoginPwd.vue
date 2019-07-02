<template>
  <div class="accountSafetyContent">
    <div class="accountContentTitle flex">
      <div class="flex1 textLeft" style="font-size: 18px">重置登录密码</div>
      <div class="flex1 textRight"><a  href="javascript:javascript:history.back(-1);" style="font-size: 18px;color: #f2b643;"><  返回</a></div>
    </div>
    <div class="accountSafetyWrap">
      <div class="textCenter" style="font-size: 16px;color: #444;margin-left: 100px;" v-text="phone"></div>
      <ul class="reviseContent">
        <li>
          当前密码<input type="password" minlength="6" maxlength="18" placeholder="请输入当前登录密码" v-model="oldPwd">
        </li>
        <li>
          新密码<input type="password" minlength="6" maxlength="18" placeholder="请输入新的6—18位登录密码" v-model="newPwd">
        </li>
        <li>
          确认密码<input type="password" minlength="6" maxlength="18" placeholder="请确认登录密码" v-model="confirmPwd">
        </li>
        <div class="errorMsg" v-text="errorMsg" style="text-align: left;width: 186px;"></div>
        <li>
          <a href="javascript:;" class="confirm" @click="resetLoginPwd">确认</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {host, loginpwd} from '@/assets/js/config.js'
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
      resetLoginPwd () {
        console.log(window.localStorage.userName, this.oldPwd, this.confirmPwd)
        if (this.newPwd === '' || this.newPwd === '' || this.confirmPwd === '') {
          this.errorMsg = '密码不能为空'
        } else if (this.newPwd !== this.confirmPwd) {
          this.errorMsg = '两次输入的新密码不一致'
        } else {
          this.$http.interceptors.request.use((config) => {
            console.log(config)
            return config
          }, (err) => {
            return Promise.reject(err)
          })
          this.$http.patch(host + loginpwd, {
            phone: window.localStorage.userName,
            pwd: sha256(this.oldPwd),
            newPwd: sha256(this.confirmPwd)
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
            console.log(res)
          }).catch((response) => {
            let res = response.data
            console.log(res)
          })
        }
      }
    }
  }
</script>
