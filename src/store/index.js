import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexPersisted = new createPersistedState({
  key:'myVuex',
  storage: window.localStorage,
  reducer: state => ({
    userinfo: state.userinfo
  }),
  filter: mutation => (
    'SET_USER_INFO' === mutation.type
  )
});

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: debug ? [createLogger(), vuexPersisted] : [vuexPersisted]
})
