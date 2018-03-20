import * as TYPE from './type'
import axios from '@/util/http'
import {getJson} from '@/api/getJson'
import mapHelper from '@/util/mapHelper'

const mutations = {
  /** SOURCE */
  [TYPE.REQUEST_SOURCE_START](state) {
    state.sourceLoading = true
  },
  [TYPE.REQUEST_SOURCE_END](state) {
    state.sourceLoading = false
  },
  [TYPE.LOAD_SOURCE](state, source) {
    console.info(`[${TYPE.LOAD_SOURCE}]`, source)
    state.mapSource = source
  },
  [TYPE.UPDATE_ACTIVE_SOURCE](state, source) {
    state.activeSource = source
  },
  /** STYLE */
  [TYPE.REQUEST_STYLE_START](state, source) {
    state.styleLoading = true
  },
  [TYPE.REQUEST_STYLE_END](state, source) {
    console.info(`[LOAD_STYLE_END]`)
    state.styleLoading = false
  },
  [TYPE.LOAD_STYLE](state, styles) {
    console.info(`[${TYPE.LOAD_STYLE}]`, styles)
    state.mapStyles = Object.assign({}, state.mapStyles, styles)
  },
  /** MAP */
  [TYPE.SET_MAIN_MAP](state, mainMap) {
    state.mainMap = mainMap
  },
  [TYPE.SEARCH_PANE_IS_SHOW](state, searchPaneShow) {
    state.searchPaneShow = searchPaneShow
  },
  [TYPE.TABLE_PANE_SHOW](state, tableMenuPaneShow) {
    state.tableMenuPaneShow = tableMenuPaneShow
  },
  [TYPE.SEARCH_PARAMS](state, searchParams) {
    state.searchParams = searchParams
  },
  [TYPE.GET_SEARCH_RESULT](state, searchList) {
    for (let val of searchList) {
      if (val) {
        val.isActive = false
      }
    }
    state.searchList = searchList
  },
  [TYPE.SET_SEARCH_MACRO_LIST](state, item) {
    item.isActive = !item.isActive
    /*设置搜索列表的加载状态*/
    let i = state.searchList.findIndex(v => v.macro.data.id === item.macro.data.id)
    state.searchList[i].isActive = item.isActive
    let index = state.searchItemMacroList.findIndex(v => v.macro.data.id === item.macro.data.id)
    if (item.isActive) {
      addLayer(item.macro.data.datapath, item.macro.data.id)
    } else {
      mapHelper.removeLayerByCode(item.macro.data.id)
    }
    /*不存在push，存在替换*/
    if (index < 0) {
      state.searchItemMacroList.push(item)
    } else {
      state.searchItemMacroList.splice(index, 1, item)
    }
  },
  [TYPE.SET_SEARCH_MACRO_LIST](state, item) {
    item.isActive = !item.isActive
    /*设置搜索列表的加载状态*/
    let i = state.searchList.findIndex(v => v.macro.data.id === item.macro.data.id)
    state.searchList[i].isActive = item.isActive
    let index = state.searchItemMacroList.findIndex(v => v.macro.data.id === item.macro.data.id)
    if (item.isActive) {
      getJson(item.macro.data.datapath).then(res => {
        mapHelper.addLayerByCodeAndJson(item.macro.data.id, res)
      })
    } else {
      mapHelper.removeLayerByCode(item.macro.data.id)
    }
    /*不存在push，存在替换*/
    if (index < 0) {
      state.searchItemMacroList.push(item)
    } else {
      state.searchItemMacroList.splice(index, 1, item)
    }
  },
  [TYPE.GET_AREA_DATA](state, areaInfoData) {
    /*判断第一级是否存在json数据*/
    let type = parseInt(Number(areaInfoData[0].type) / 10)
    let yu = Number(areaInfoData[0].type) % 10
    if (type === 2 && yu === 1) {
      areaInfoData[0].isActive = true
      getJson(areaInfoData[0].datapath).then(res => {
        mapHelper.addLayerByCodeAndJson(areaInfoData[0].id, res)
        state.idList.push(areaInfoData[0].id)
        /*图层过滤*/
        mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
      })
      state.activeAreaInfoList = areaInfoData
    } else {
      if (areaInfoData[0].datapath && areaInfoData[0].children.length === 0) {
        areaInfoData[0].isActive = true
        addLayer(areaInfoData[0].datapath, areaInfoData[0].id)
        // getJson(areaInfoData[0].datapath).then(res => {
        //   mapHelper.addLayerByCodeAndJson(areaInfoData[0].id, res)
        //   state.idList.push(areaInfoData[0].id)
        //   /*图层过滤*/
        //   mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
        // })
        /*存在json就push进图层列表*/
        if (state.activeAreaInfoList.findIndex(v => v.id === areaInfoData[0].id) < 0) {
          state.activeAreaInfoList.push(areaInfoData[0])
        }
        state.areaInfoList = areaInfoData
      } else {
        let hasThirdLevel = false
        let temp = []
        let areaInfoList = areaInfoData[0].children
        areaInfoData[0].isActive = false
        for (let value of areaInfoList) {
          if (value.children.length > 0) {
            hasThirdLevel = true
            for (let val of value.children) {
              val.isActive = false
              temp.push(val)
              state.idList.push(val.id)
            }
          } else {
            temp.push(value)
            state.idList.push(value.id)
          }
        }
        areaInfoData[0].isActive = true
        if (!hasThirdLevel) {
          areaInfoList.filter(v => v.isActive = true)
        } else {
          areaInfoList.filter(v => v.isActive = false)
        }
        state.areaInfoList = areaInfoData
        /*所有子集push到一个数组里面*/
        temp.map(v => {
          let index = state.activeAreaInfoList.findIndex(i => v.id === i.id)
          if (index < 0) {
            state.activeAreaInfoList.push(v)
          }
        })
        /*如果存在第三级目录，不初始叠加图层*/
        if (!hasThirdLevel) {
          temp.map(v => {
            getJson(v.datapath).then(res => {
              mapHelper.addLayerByCodeAndJson(v.id, res)
            })
          })
          /*图层过滤*/
          mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
        }
      }
    }
    if (state.areaInfoData.findIndex(v => v.id === areaInfoData[0].id) < 0) {
      state.areaInfoData = state.areaInfoData.concat(areaInfoData)
    }
  },
  [TYPE.SET_ACTIVE_AREA_LIST](state, {
    activeAreaInfoList,
    isRemoveAll
  }) {
    if (isRemoveAll) {
      state.activeAreaInfoList.map(v => {
        v.isActive = false
        /*清空所有图层*/
        mapHelper.removeLayerByCode(v.id)
      })
      state.activeAreaInfoList = []
      state.areaInfoData = []
      state.areaInfoList.map(v => v.isActive = false)
      /*图层过滤*/
      mapHelper.setFilterByCodeArrayAndAreacodeArray([], state.areaCodeList)
    }
  },
  [TYPE.SET_SEC_AREA_LIST](state, secAreaList) {
    state.secAreaList = secAreaList
  },
  [TYPE.SET_AREA_DETAIL_INFO](state, areaDetailInfo) {
    state.areaDetailInfo = areaDetailInfo
  },
  [TYPE.SET_AREA_INFO](state, areaInfo) {
    state.areaInfo = areaInfo
  },
  [TYPE.SET_SELECTED_AREA_LIST](state, {
    areainfo,
    isRemoveAll
  }) {
    if (!isRemoveAll) {
      let temp = state.areaList
      let bol = false
      for (let val of temp) {
        if (val.areacode === areainfo.areacode) {
          bol = true
        }
      }
      if (bol) {
        let index = temp.findIndex(v => v.areacode === areainfo.areacode)
        temp.splice(index, 1)
        let codeIndex = state.areaCodeList.findIndex(v => v === areainfo.areacode)
        state.areaCodeList.splice(codeIndex, 1)
        /*删除行政区划线*/
        let areaIndex = state.secAreaList.findIndex(v => v.areacode === areainfo.areacode)
        mapHelper.removeLayerById(areaIndex.toString())
        /*图层过滤*/
        mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
      } else {
        temp.push(areainfo)
        /*更新选中区域areacode列表*/
        if (areainfo.areacode !== '501002') {
          state.areaCodeList.push(areainfo.areacode)
        }
        /*画行政区划线*/
        /*选中区域所在详细信息列表的位置,图层id为当前区域所在列表的下标*/
        let index = state.secAreaList.findIndex(v => v.areacode === areainfo.areacode)
        if (state.areaDetailInfo) {
          mapHelper.addLayerByIdAndGeojson(index.toString(), state.areaDetailInfo.geojson)
          mapHelper.flyByPointAndZoom(state.areaDetailInfo.geopoint, 8)
          /*图层过滤*/
          mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
        }
      }
    } else {
      /*删除全部行政区划线*/
      state.areaList.map(v => {
        let index = state.secAreaList.findIndex(i => i.areacode === v.areacode)
        mapHelper.removeLayerById(index.toString())
      })
      /*图层过滤*/
      mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList = [])
      state.areaList = []
    }
  },
  [TYPE.SET_LEFT_ACTIVE_AREA_LIST](state, {
    bol,
    id
  }) {
    state.activeAreaInfoList.map(v => {
      if (v.id === id) {
        if (!bol) {
          v.isActive = false
        } else {
          v.isActive = true
        }
      }
    })
    state.areaInfoData.map((v, idx) => {
      if (v.id !== id) {
        if (v.children.length > 0) {
          let index = v.children.findIndex(i => i.id === id)
          if (index >= 0) {
            let temp = v.children[index]
            if (!bol) {
              temp.isActive = false
              if (temp.children.length > 0) {
                temp.children.map(v => v.isActive = false)
              }
              /*删除对应id图层*/
              mapHelper.removeLayerByCode(id)
            } else if (bol) {
              temp.isActive = true
              if (temp.children.length > 0) {
                temp.children.map(v => {
                  v.isActive = true
                  getJson(v.datapath).then(res => {
                    mapHelper.addLayerByCodeAndJson(v.id, res)
                  })
                  /*图层过滤*/
                  mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
                })
              } else {
                /*增加对应图层*/
                getJson(temp.datapath).then(res => {
                  mapHelper.addLayerByCodeAndJson(id, res)
                })
                console.log(state.idList, state.areaCodeList)
                /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
              }
            }
            v.children.splice(index, 1, temp)
          } else {
            v.children.map(i => {
              if (i.children.length > 0) {
                let index = i.children.findIndex(i => i.id === id)
                if (index >= 0) {
                  let temp = i.children[index]
                  if (!bol) {
                    temp.isActive = false
                    /*删除对应id图层*/
                    mapHelper.removeLayerByCode(id)
                  } else if (bol) {
                    temp.isActive = true
                    /*增加对应图层*/
                    getJson(temp.datapath).then(res => {
                      mapHelper.addLayerByCodeAndJson(id, res)
                    })
                    /*图层过滤*/
                    mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
                  }
                  i.children.splice(index, 1, temp)
                }
              }
            })
          }
        } else {}
      } else {
        if (v.id === id) {
          let temp = v
          if (temp.children.length > 0) {
            temp.children.map(v => {
              if (!bol) {
                v.isActive = false
                /*删除对应id图层*/
                mapHelper.removeLayerByCode(v.id)
              } else if (bol) {
                v.isActive = true
                /*增加对应图层*/
                getJson(v.datapath).then(res => {
                  mapHelper.addLayerByCodeAndJson(v.id, res)
                })
                /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
              }
            })
          }
          if (!bol) {
            temp.isActive = false
            /*删除对应id图层*/
            mapHelper.removeLayerByCode(id)
          } else if (bol) {
            temp.isActive = true
            /*增加对应图层,首先判断第一层是否存在json数据*/
            if (temp.datapath) {
              getJson(temp.datapath).then(res => {
                mapHelper.addLayerByCodeAndJson(id, res)
              })
              /*图层过滤*/
              mapHelper.setFilterByCodeArrayAndAreacodeArray(state.idList, state.areaCodeList)
            }
          }
          state.areaInfoData.splice(idx, 1, temp)
        }
      }
    })
  },
  [TYPE.SET_UUID_INFO](state, uuidClickedInfo) {
    state.uuidClickedInfo = uuidClickedInfo
  },
  [TYPE.SET_REPORT_FORM_SHOW](state, reportFormShow) {
    state.reportFormShow = reportFormShow
  },
  [TYPE.SET_REPORT_FORM_DATA](state, reportFormData) {
    state.reportFormData = reportFormData
  },
  [TYPE.SET_AREACODE_AND_DATAID](state, areaCodeAndDataId) {
    state.areaCodeAndDataId = areaCodeAndDataId
  },
  [TYPE.CLEAR_REPORT_FORM](state, {
    key,
    data
  }) {
    if (key !== "" && key !== undefined && key !== null) {
      data.splice(key, 1)
    } else {
      data = []
    }
    state.reportFormData.data = data
  },
  [TYPE.SET_MEASURE_NUM](state, measureNum) {
    state.measureNum = measureNum
  },
  [TYPE.SET_AREA_REPORT_FORM_SHOW](state, areaReportFormShow) {
    state.areaReportFormShow = areaReportFormShow
  }
}

export default mutations
