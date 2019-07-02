import Vue from 'vue'
import Vuex from 'vuex'
// import whetherLogin from './modules/whetherLogin'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    noLogin: true,
    nickName: '',
    goldPrice: ''
  },
  // getters: {},
  mutations: {
    updateLogin (state, isshow) {
      state.login = isshow
    },
    updateNoLogin (state, isshow) {
      state.noLogin = isshow
    },
    updateNickName (state, userName) {
      state.nickName = userName
    },
    upsetGoldPrice (state, price) {
      state.goldPrice = price
    }
  },
  // actions: {},
  modules: {
    // whetherLogin
  }
})
export default store
