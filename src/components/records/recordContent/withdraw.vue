<template>
  <div>
    <div class="recordContentListTitle flex">
      <span class="flex1">交易名称</span>
      <span class="flex1">金额</span>
      <span class="flex1">时间</span>
      <span class="flex1">状态</span>
      <span class="flex1_5">订单号</span>
    </div>
    <ul class="recordDetails">
      <li class="flex" v-for="records in recordsList">
        <span class="flex1" v-text="records.orderType  + records.type"></span>
        <span class="flex1" v-text="Math.floor(records.amount * 100) / 100"></span>
        <span class="flex1" v-text="records.time"></span>
        <span class="flex1" v-text="records.status"></span>
        <span class="flex1_5" v-text="records.orderId"></span>
      </li>
      <div class="textCnter noRecord" v-if="noRecord">
        <div class="ewm bgWhite" style="display: block;border: none;">
          <img src="../../../../static/img/down-load.png" alt="" style="width: 120px;">
          <p>请移步至超宝宝理财App版本提现</p>
        </div>
      </div>
    </ul>
    <pagination  style="text-align: center;padding-top: 20px;" background
                 layout="prev, pager, next"
                 :total="1000"
                 :page-size="10">
    </pagination>
  </div>
</template>
<script>
  import {host, orders} from '@/assets/js/config.js'
  import {Pagination} from 'element-ui'
  export default {
    data () {
      return {
        recordsList: '',
        noRecord: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.getAll()
      })
    },
    methods: {
      getAll () {
        this.$http.interceptors.response.use(function (response) {
          // Do something with response data
          return response
        }, function (error) {
          // Do something with response error
          return Promise.reject(error)
        })
        this.$http.get(host + orders, {
          params: {
            phone: window.localStorage.userName,
            page: 1,
            limit: 10,
            type: 1
          },
          headers: {
            token: window.localStorage.userToken
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 0) {
            if (res.result.length === 0) {
              this.noRecord = true
            } else {
              this.recordsList = res.result
              this.noRecord = false
            }
          }
          console.log(res)
        })
      }
    },
    components: {
      Pagination
    }
  }
</script>
