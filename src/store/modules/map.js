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
import {getSearch, getDetailInfo} from '@/api/dataSheets'
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
  searchPaneShow: false,
  tableMenuPaneShow: true,
  areacode: {areacode: 500000},
  searchParams: {},
  searchList: [],
  areaInfoData: [],
  areaInfoList: []
}

const getters = {
  searchPaneShow: state => state.searchPaneShow,
  searchParams: state => state.searchParams,
  searchList: state => state.searchList,
  areaInfoData: state => state.areaInfoData,
  areaInfoList: state => state.areaInfoList,
  tableMenuPaneShow: state => state.tableMenuPaneShow
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
  },
  [TYPE.TABLE_PANE_SHOW] (state, tableMenuPaneShow) {
    state.tableMenuPaneShow = tableMenuPaneShow
  },
  [TYPE.SEARCH_PARAMS] (state, searchParams) {
    state.searchParams = searchParams
  },
  [TYPE.GET_SEARCH_RESULT] (state, searchList) {
    state.searchList = searchList
  },
  [TYPE.GET_AREA_DATA] (state, areaInfoData) {
    state.areaInfoData = areaInfoData
  },
  [TYPE.SET_AREA_LIST] (state, areaInfoList) {
    state.areaInfoList = areaInfoList
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
  },
  tablePaneShow({commit, state}, isShow) {
    commit(TYPE.TABLE_PANE_SHOW, isShow)
  },
  getSearchParams({dispatch, commit, state}, {typeParams, params}) {
    console.log({typeParams, params})
    commit(TYPE.SEARCH_PARAMS, Object.assign({}, state.searchParams, params, typeParams))
    // 首先选择type时不做请求
    if(params == {}) {
      return
    }
    dispatch('getSearchResult')
  },
  getAreaDetail({dispatch, commit, state}, params) {
    getDetailInfo(Object.assign({}, params)).then(res => {
      commit(TYPE.GET_AREA_DATA, res.data)
      commit(TYPE.SET_AREA_LIST, res.data[0].children.filter(v => v.isActive = true))
      // 隐藏目录列表、搜索列表
      commit(TYPE.SEARCH_PANE_IS_SHOW, false)
      commit(TYPE.TABLE_PANE_SHOW, false)
    })
  },
  getSearchResult({commit, state}) {
    getSearch(state.searchParams).then(res => {
      commit(TYPE.GET_SEARCH_RESULT, res.data)
    })
  },
  setAreaList({commit, state}, {bol, name}) {
    let tempArray = []
    // 判断剔除的数据图层，设置active为false
    for(let val of state.areaInfoList) {
      if(val.name === name && !bol) {
        val.isActive = false
      } else if(val.name === name && bol) {
        val.isActive = true
      }
      tempArray.push(val)
    }
    commit(TYPE.SET_AREA_LIST, tempArray)
  },
  removeAllAreaList({commit, state}) {
    // 设置areainfolist每个isactive为false
    let tempArray = []
    for(let val of state.areaInfoList) {
      val.isActive = false
      tempArray.push(val)
    }
    commit(TYPE.SET_AREA_LIST, tempArray)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
