import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import d2cmap from './modules/map'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  searching: false
}

const getters = {
  searching: state => state.searching
}

export default new Vuex.Store({
  state,
  getters,
  modules: {
    d2cmap
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
