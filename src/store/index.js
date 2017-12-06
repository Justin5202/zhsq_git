import Vue from 'vue'
import Vuex from 'vuex'
import d2cmap from './modules/map'

Vue.use(Vuex)

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
  }
})
