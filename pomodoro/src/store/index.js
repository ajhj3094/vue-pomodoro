import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
// const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    timeleft: time,
    items: []
  },
  mutations: {
    countdown (state) {
      state.timeleft--
    }
  },
  plugins: [
    createPersistedState({ key: 'pomodoro' })
  ]
})
