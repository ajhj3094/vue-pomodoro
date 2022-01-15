import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    timeleft: time,
    items: [],
    breaker: false,
    finishedlist: [],
    // Sidebar 2
    todo: 0,
    done: 0
  },
  mutations: {
    additem (state, data) {
      state.items.push({
        name: data,
        edit: false,
        model: data
      })
      state.todo++
    },
    delitem (state, data) {
      state.items.splice(data, 1)
    },
    edititem (state, data) {
      state.items[data].edit = true
    },
    submitedit (state, data) {
      if (state.items[data].model.length > 0) {
        state.items[data].name = state.items[data].model
        state.items[data].edit = false
      }
    },
    canceledit (state, data) {
      state.items[data].edit = false
      state.items[data].model = state.items[data].name
    },
    complete (state, data) {
      state.finishedlist.push(state.items[data])
      // state.finishedlist2.push(state.items[data])
      state.items.splice(data, 1)
      state.done++
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.breaker) {
        state.finishedlist.push(state.items[0])
        // state.finishedlist2.push(state.items[0])
        state.items.pop()
      }
      if (state.items.length > 0) {
        state.breaker = !state.breaker
      }
      state.timeleft = state.breaker ? timebreak : time
    },
    skipbreak (state) {
      if (state.items.length > 0) {
        state.breaker = !state.breaker
      }
      state.timeleft = time
    },
    deletefinished (state, data) {
      state.finishedlist.splice(data, 1)
    },
    increasedone (state) {
      state.done++
    }
    // items (state) {
    //   state.todo++
    // },
    // finishedlist (state) {
    //   state.done++
    // }
  },
  actions: {
  },
  plugins: [
    createPersistedState({ key: 'pomodoro' })
  ]
})
