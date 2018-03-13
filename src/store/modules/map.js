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
import {getSelect, getSearch, getDetailInfo, getNextAreaInfo, getJson} from '@/api/dataSheets'
import mapHelper from '@/util/mapHelper'
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
  areaInfo: {
    areacode: 500000,
    areaname: '重庆'
  },
  areaList: [],
  searchParams: {},
  searchList: [],
  areaInfoData: [],
  areaInfoList: [],
  activeAreaInfoList: []
}

const getters = {
  areaInfo: state => state.areaInfo,
  areaList: state => state.areaList,
  searchPaneShow: state => state.searchPaneShow,
  searchParams: state => state.searchParams,
  searchList: state => state.searchList,
  areaInfoData: state => state.areaInfoData,
  areaInfoList: state => state.areaInfoList,
  activeAreaInfoList: state => state.activeAreaInfoList,
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
    let hasThirdLevel = false
    let temp = []
    for(let value of areaInfoList) {
      if(value.children.length > 0) {
        hasThirdLevel = true
        for(let val of value.children) {
          val.isActive = false
          temp.push(val)
        }
      } else {
        temp.push(value)
      }
    }
    if(!hasThirdLevel) {
      areaInfoList.filter(v => v.isActive = true)
    } else {
      areaInfoList.filter(v => v.isActive = false)
    }
    state.areaInfoList = areaInfoList
    /*所有子集push到一个数组里面*/
    state.activeAreaInfoList = temp
    temp.map(v => {
      getJson(v.datapath).then(res => {
        mapHelper.addLayerByCodeAndJson(v.id, res)
      })
    })
  },
  [TYPE.SET_ACTIVE_AREA_LIST] (state, activeAreaInfoList) {
    state.activeAreaInfoList = activeAreaInfoList
  },
  [TYPE.SET_AREA_INFO] (state, areaInfo) {
    state.areaInfo = areaInfo
  },
  [TYPE.SET_SELECTED_AREA_LIST] (state, {areainfo, isRemoveAll}) {
    if(!isRemoveAll) {
      let temp = state.areaList
      let bol = false
      for(let val of temp) {
        if(val.areacode === areainfo.areacode) {
          bol = true
        }
      }
      if(bol) {
        temp.splice(temp.findIndex(v => v.areacode === areainfo.areacode), 1)
      } else {
        temp.push(areainfo)
      }
    } else {
      state.areaList = []
    }
  },
  [TYPE.SET_LEFT_ACTIVE_AREA_LIST] (state, {bol, name}) {
    if(state.areaInfoList.findIndex(v => v.name === name) < 0) {
      state.areaInfoList.filter(v => {
        if(v.children.length > 0) {
          let index = v.children.findIndex(i => i.name === name)
          if(index >= 0) {
            let temp = v.children[index]
            if(!bol) {
              temp.isActive = false
            } else if(bol) {
              temp.isActive = true
            }
            v.children.splice(index, 1, temp)
          }
        }
      })
    } else {
      let index = state.areaInfoList.findIndex(v => v.name === name)
      let temp = state.areaInfoList[index]
      if(temp.children.length > 0) {
        temp.children.filter(v => {
          if(!bol) {
            v.isActive = false
          } else if(bol) {
            v.isActive = true
          }
        })
      }
      if(!bol) {
        temp.isActive = false
      } else if(bol) {
        temp.isActive = true
      }
      state.areaInfoList.splice(index, 1, temp)
    }
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
    commit(TYPE.SEARCH_PARAMS, Object.assign({}, state.searchParams, params, typeParams, state.areaInfo))
    // 首先选择type时不做请求
    if(params == {}) {
      return
    }
    dispatch('getSearchResult')
  },
  getAreaDetail({dispatch, commit, state}, params) {
    getDetailInfo(Object.assign({}, params)).then(res => {
      commit(TYPE.GET_AREA_DATA, res.data)
      commit(TYPE.SET_AREA_LIST, res.data[0].children)
      // 隐藏目录列表、搜索列表
      commit(TYPE.SEARCH_PANE_IS_SHOW, false)
      commit(TYPE.TABLE_PANE_SHOW, false)
    })
  },
  setAreaInfo({commit, state}, areaInfo) {
    commit(TYPE.SET_AREA_INFO, areaInfo)
  },
  setSelectedAreaList({commit, state}, {areainfo, isRemoveAll}) {
    commit(TYPE.SET_SELECTED_AREA_LIST, {areainfo, isRemoveAll})
  },
  getSearchResult({commit, state}) {
    getSearch(state.searchParams).then(res => {
      commit(TYPE.GET_SEARCH_RESULT, res.data)
    })
  },
  setAreaList({commit, state}, {bol, name}) {
    console.log({bol, name})
    let tempArray = []
    // 判断剔除的数据图层，设置active为false
    for(let val of state.areaInfoList) {
      if(val.children.length > 0) {
        if(val.name === name) {
          for(let value of val.children) {
            if(!bol) {
              value.isActive = false
            } else if(bol) {
              value.isActive = true
            }
            tempArray.push(value)
          }
        } else {
          for(let value of val.children) {
            if(value.name === name && !bol) {
              value.isActive = false
            } else if(value.name === name && bol) {
              value.isActive = true
            }
            tempArray.push(value)
          }
        }
      } else {
        if(val.name === name && !bol) {
          val.isActive = false
        } else if(val.name === name && bol) {
          val.isActive = true
        }
        tempArray.push(val)
      }
    }
    commit(TYPE.SET_LEFT_ACTIVE_AREA_LIST, {bol, name})
    commit(TYPE.SET_ACTIVE_AREA_LIST, tempArray)
  },
  // 区县区域下一级详细信息
  getNextAreaInfo({commit, state}) {
    getNextAreaInfo(state.areaInfo.areacode).then(res => {
      console.log(JSON.parse(res.data))
    })
  },
  removeAllAreaList({commit, state}) {
    // 设置areainfolist每个isactive为false
    let tempArray = []
    for(let val of state.areaInfoList) {
      val.isActive = false
    }
    for(let val of state.activeAreaInfoList) {
      val.isActive = false
      tempArray.push(val)
    }
    commit(TYPE.SET_ACTIVE_AREA_LIST, tempArray)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
