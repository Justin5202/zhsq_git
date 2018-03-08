/*
 * @Description: 地图数据处理
 * @Author: xia
 * @Date: 2017-12-05 11:03:53
 * @Last Modified by: xia
 * @Last Modified time: 2018-01-22 16:13:05
 */

import axios from '@/util/http'

import URL from '@/settings/sourceControl'
import {parallel} from '@/util/async'
import * as TYPE from '../type'

const timeout = 15000

/* 请求配置 */
const http = axios.create({timeout: timeout})

/* 加载样式 */
function loadStyle (styles, afterLoad) {
  const tasks = []
  for (let j = 0; j < styles.length; j++) {
    const data = styles[j].data
    for (let i = 0; i < data.length; i++) {
      tasks.push(() => {
        const url = data[i].url
        return http
          .get(url)
          .then(res => afterLoad({[url]: res.data}))
          .catch(error => {
            console.error(`${url} load false \n${error}`)
          })
      })
    }
  }
  return parallel(tasks)
}

const state = {
  sourceLoading: false,
  styleLoading: false,
  mapSource: null,
  checkedRows: [],
  activeSource: [],
  mapStyles: {},
  mainMap: null,
  searchPaneShow: false
}

const getters = {
  searchPaneShow: state => state.searchPaneShow
}

const mutations = {
  /** SOURCE */
  [TYPE.REQUEST_SOURCE_START] (state) {
    state.sourceLoading = true
  },
  [TYPE.REQUEST_SOURCE_END] (state) {
    state.sourceLoading = false
  },
  [TYPE.LOAD_SOURCE] (state, source) {
    console.info(`[${TYPE.LOAD_SOURCE}]`, source)
    state.mapSource = source
  },
  [TYPE.UPDATE_ACTIVE_SOURCE] (state, source) {
    state.activeSource = source
  },
  /** STYLE */
  [TYPE.REQUEST_STYLE_START] (state, source) {
    state.styleLoading = true
  },
  [TYPE.REQUEST_STYLE_END] (state, source) {
    console.info(`[LOAD_STYLE_END]`)
    state.styleLoading = false
  },
  [TYPE.LOAD_STYLE] (state, styles) {
    console.info(`[${TYPE.LOAD_STYLE}]`, styles)
    state.mapStyles = Object.assign({}, state.mapStyles, styles)
  },
  /** MAP */
  [TYPE.SET_MAIN_MAP] (state, mainMap) {
    state.mainMap = mainMap
  },
  [TYPE.SEARCH_PANE_IS_SHOW] (state, searchPaneShow) {
    state.searchPaneShow = searchPaneShow
  }
}

const actions = {
  LOAD_SOURCE ({
    commit,
    state
  }, url) {
    if (typeof URL.MAP_SOURCE !== 'string') {
      commit(TYPE.LOAD_SOURCE, URL.MAP_SOURCE)
    } else {
      commit(TYPE.REQUEST_SOURCE_START)
      try {
        http
        .get(URL.MAP_SOURCE)
        .then(res => {
          commit(TYPE.REQUEST_SOURCE_END)
          if (res.data.meta.success) {
            commit(TYPE.LOAD_SOURCE, res.data.data)
          }
        })
      } catch (error) {
        console.error(`> ${TYPE.LOAD_SOURCE}`, error)
      }
    }
  },
  async LOAD_STYLE ({
    commit,
    state
  }, source) {
    commit(TYPE.REQUEST_STYLE_START)
    await loadStyle(source, (styles) => {
      commit(TYPE.LOAD_STYLE, styles)
    })
    commit(TYPE.REQUEST_STYLE_END)
  },
  searchPaneShow({commit, state}, isShow) {
    commit(TYPE.SEARCH_PANE_IS_SHOW, isShow)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
