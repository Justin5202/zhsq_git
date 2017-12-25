/*
 * @Description: 地图数据处理
 * @Author: xia
 * @Date: 2017-12-05 11:03:53
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-25 09:28:09
 */

import axios from '@/util/http'
import URL from '@/settings/sourceControl'

const timeout = 5000

/* 请求配置 */
const http = axios.create({
  timeout: timeout
})

function requestStyles (url, result) {
  try {
    return http.get(url).then(res => {
      result[url] = res.data
    })
  } catch (error) {
    console.error(`> ${url}`, error)
  }
}
/* 加载样式 */
async function loadStyle (styles, cb) {
  const result = {}
  for (var j = 0; j < styles.length; j++) {
    for (var i = 0; i < styles[j].data.length; i++) {
      await requestStyles(styles[j].data[i].url, result)
    }
  }
  cb(result)
}

const state = {
  activeSource: [],
  checkedRows: [],
  map: null,
  mapSource: null,
  mapStyles: {},
  sourceLoading: false
}

const mutations = {
  REQUEST_SOURCE (state) {
    state.sourceLoading = true
  },
  REQUESETED_SOURCE (state) {
    state.sourceLoading = false
  },
  LOAD_SOURCE (state, source) {
    console.info('> LOAD_SOURCE', source)
    state.mapSource = source
  },
  UPDATE_ACTIVE_SOURCE (state, source) {
    state.activeSource = source
  },
  LOAD_STYLE (state, styles) {
    console.info('> LOAD_STYLES', styles)
    state.mapStyles = styles
  },
  SET_MAP (state, map) {
    console.info('> SET_MAP', map)
    state.map = map
  }
}

const actions = {
  LOAD_SOURCE ({commit, state}, url) {
    commit('REQUEST_SOURCE')
    try {
      http.get(URL.MAP_SOURCE).then(res => {
        commit('REQUESETED_SOURCE')
        if (res.data.meta.success) {
          commit('LOAD_SOURCE', res.data.data)
        }
      })
    } catch (error) {
      console.error('> LOAD_SOURCE', error)
    }
  },
  LOAD_STYLE ({commit, state}, source) {
    loadStyle(source, (styles) => commit('LOAD_STYLE', styles))
  }
}

export default {
  state,
  mutations,
  actions
}
