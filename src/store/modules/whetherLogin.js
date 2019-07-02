// const SHOW_LOGIN = false
// const SHOW_NOLOGIN = true
const loginInfo = {
  state: {
    login: false,
    noLogin: true
  },
  mutations: {
    updateLogin (state, isshow) {
      state.login = isshow
    },
    updateNoLgin (state, isshow) {
      state.noLogin = isshow
    }
  },
  actions: {},
  getters: {}
}
export default loginInfo
