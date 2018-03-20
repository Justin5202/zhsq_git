import * as TYPE from './type'
import axios from '@/util/http'
import {
  getSelect,
  getSearch,
  getDetailInfo,
  getNextAreaDetailInfo,
  getMsMacroData,
  getQueryElementByPoint
} from '@/api/dataSheets'
import {
  getJson
} from '@/api/getJson'
import mapHelper from '@/util/mapHelper'

// 数组处理
function handleArray(array) {
  let temp = []
  array.map(v => {
    temp.push(v.split(','))
  })
  temp.push([mapHelper.getCenter().lng, mapHelper.getCenter().lat])
  temp.map(v => {
    v.map(v => v = Number(v))
  })
  return JSON.stringify(temp)
}

export const searchPaneShow = function({
  commit,
  state
}, isShow) {
  commit(TYPE.SEARCH_PANE_IS_SHOW, isShow)
}
export const tablePaneShow = function({
  commit,
  state
}, isShow) {
  commit(TYPE.TABLE_PANE_SHOW, isShow)
}
export const getSearchParams = function({
  dispatch,
  commit,
  state
}, {
  typeParams,
  params
}) {
  console.log({
    typeParams,
    params
  })
  commit(TYPE.SEARCH_PARAMS, Object.assign({}, state.searchParams, params, typeParams, state.areaInfo))
  // 首先选择type时不做请求
  if (params == {}) {
    return
  }
  dispatch('getSearchResult')
}
export const getAreaDetail = function({
  dispatch,
  commit,
  state
}, params) {
  getDetailInfo(Object.assign({}, params)).then(res => {
    commit(TYPE.GET_AREA_DATA, res.data)
    // 隐藏目录列表、搜索列表
    commit(TYPE.SEARCH_PANE_IS_SHOW, false)
    commit(TYPE.TABLE_PANE_SHOW, false)
  })
}
export const setAreaInfo = function({
  commit,
  state
}, {
  areainfo,
  isRemoveAll
}) {
  if (!isRemoveAll) {
    getNextAreaDetailInfo(areainfo.areacode).then(res => {
      commit(TYPE.SET_AREA_DETAIL_INFO, JSON.parse(res.data))
      commit(TYPE.SET_AREA_INFO, areainfo)
      commit(TYPE.SET_SELECTED_AREA_LIST, {
        areainfo,
        isRemoveAll
      })
    })
  } else {
    commit(TYPE.SET_SELECTED_AREA_LIST, {
      areainfo,
      isRemoveAll
    })
  }
}
export const deleteAreaInfo = function({
  commit,
  state
}, {
  areainfo,
  isRemoveAll
}) {
  commit(TYPE.SET_SELECTED_AREA_LIST, {
    areainfo,
    isRemoveAll
  })
}
export const getSearchResult = function({
  dispatch,
  commit,
  state
}) {
  getSearch(state.searchParams).then(res => {
    if (res.code == '1') {
      commit(TYPE.GET_SEARCH_RESULT, res.data)
      /*地点数据标点*/
      res.data.map((v, index) => {
        if (v.element) {
          mapHelper.removeLayerById((state.searchParams.start + index - 10).toString())
          mapHelper.setMarkToMap((state.searchParams.start + index).toString(), v.element.geopoint, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
        }
        /*如果存在行政区域，画线*/
        if (v.searchType === 2) {
          let areainfo = {
            areacode: v.area.areacode,
            areaname: v.area.areaname
          }
          dispatch('setAreaInfo', {
            'areainfo': areainfo,
            'isRemoveAll': false
          })
        }
      })
    }
  })
}
export const setSecAreaList = function({
  commit,
  state
}, list) {
  commit(TYPE.SET_SEC_AREA_LIST, list)
}
export const setAreaList = function({
  commit,
  state
}, {
  bol,
  id
}) {
  console.log({
    bol,
    id
  })
  commit(TYPE.SET_LEFT_ACTIVE_AREA_LIST, {
    bol,
    id
  })
}
// 区县区域下一级详细信息
export const getNextAreaInfo = function({
  commit,
  state
}) {
  getNextAreaDetailInfo(state.areaInfo.areacode).then(res => {
    console.log(JSON.parse(res.data))
    commit(TYPE.SET_SEC_AREA_LIST, JSON.parse(res.data))
  })
}
export const removeAllAreaList = function({
  commit,
  state
}) {
  commit(TYPE.SET_ACTIVE_AREA_LIST, {
    list: [],
    isRemoveAll: true
  })
}
// 加载搜索结果的空间数据，并push到areainfodata
export const loadSearchItemMacro = function({
  commit,
  state
}, item) {
  commit(TYPE.SET_SEARCH_MACRO_LIST, item)
}
/*移除搜索结果空间数据渲染列表*/
export const removeSearchItem = function({
  commit,
  state
}, item) {
  commit(TYPE.SET_SEARCH_MACRO_LIST, item)
}
/*设置uuidinfo*/
export const setUuidInfo = function({
  commit,
  state
}, uuidinfo) {
  commit(TYPE.SET_UUID_INFO, uuidinfo)
}
//报表显示隐藏
export const setReportFormShow = function({
  dispatch,
  commit,
  state
}, isShow) {
  commit(TYPE.SET_REPORT_FORM_SHOW, isShow)
  if(isShow) {
    dispatch('getAreaCodeAndDataId', {
      'areaCode': state.areaList,
      'dataId': [state.areaInfoData, state.searchItemMacroList]
    })
    dispatch('getReportData', {
      'areaCode': state.areaCodeAndDataId[0],
      'dataId': state.areaCodeAndDataId[1]
    })
  }
}
//获取areaCode 和 dataId
export const getAreaCodeAndDataId = function({
  commit,
  state
}, {
  areaCode,
  dataId
}) {
  console.log(dataId)
  var AreaCodeAndDataId = []
  var idList = ""
  var codeList = ""
  for (let i in dataId[0]) {
    if (dataId[0][i].target.length > 0 && dataId[0][i].isActive) {
      idList += ',' + dataId[0][i].id
    }
    if (dataId[0][i].children.length > 0) {
      for (let j in dataId[0][i].children) {
        if (dataId[0][i].children[j].target.length > 0 && dataId[0][i].children[j].isActive) {
          idList += ',' + dataId[0][i].children[j].id
        }
        if (dataId[0][i].children[j].children.length > 0) {
          for (let k in dataId[0][i].children[j].children) {
            if (dataId[0][i].children[j].children[k].target.length > 0 && dataId[0][i].children[j].children[k].isActive) {
              idList += ',' + dataId[0][i].children[j].children[k].id
            }
          }
        }
      }
    }
  }
  for (let i in dataId[1]) {
    if (dataId[1][i].macro.filedsData && dataId[1][i].isActive) {
      idList += ',' + dataId[1][i].macro.dataId
    }
  }
  if (areaCode.length > 0) {
    for (let i in areaCode) {
      codeList += ',' + areaCode[i].areacode
    }
  } else {
    codeList = ',500000'
  }
  AreaCodeAndDataId.push(codeList.substring(1))
  AreaCodeAndDataId.push(idList.substring(1))
  commit(TYPE.SET_AREACODE_AND_DATAID, AreaCodeAndDataId)
}
//获取报表详情
export const getReportData = function({
  commit,
  state
}, {
  areaCode,
  dataId
}) {
  console.log({
    areaCode,
    dataId
  })
  var typeNum = 0; //用于保存数据类型数量
  var areaNum = 0; //用于保存不同的地区数量
  var arrayList = []
  var yearListMax = [] //用于保存最大的年份数组长度
  var dataArray = {}
  getMsMacroData(areaCode, dataId).then(res => {
    for (let i in res.data) {
      typeNum++
      areaNum = 0 //只取一次循环的数量
      for (let j in res.data[i]) {
        areaNum++
        var dataByYear = []; //用于保存每条数据
        for (let k = 0; k < res.data[i][j]['year'].length; k++) {
          var yearList = res.data[i][j]['year'][k]
          if (yearListMax.length < res.data[i][j]['year'].length) {
            yearListMax = res.data[i][j]['year']
          }
          var filedsData = res.data[i][j][yearList][0].filedsData.split('|ZX|')
          for (var p = 0; p < filedsData.length; p++) {
            if (dataByYear.length < filedsData.length) {
              dataByYear.push({
                "type": filedsData[p].split(':')[0],
                "areaName": res.data[i][j][yearList][0].areaName,
                "areaCode": j
              })
            }
            dataByYear[p][yearList] = filedsData[p].split(':')[1] || "--"
          }
          if (k == res.data[i][j]['year'].length - 1) {
            arrayList.push({
              "name": res.data[i][j][yearList][0].name,
              "id": res.data[i][j][yearList][0].dataId,
              "dataByYear": dataByYear
            })
          }
        }
      }
    }
    //将返回数据拆分拼接
    var result = []
    var dataList = []
    for (var i = 0; i < Math.ceil(arrayList.length / areaNum); i++) {
      var start = i * areaNum;
      var end = start + areaNum;
      result.push(arrayList.slice(start, end));
    }
    for (var m = 0; m < result.length; m++) {
      for (var n = 0; n < result[m].length; n += areaNum) {
        var temporary = [];
        for (var k = 0; k < result[m][n].dataByYear.length; k++) {
          for (var j = 0; j < areaNum; j++) {
            if ((n + j) > 0) {
              result[m][n + j].dataByYear[k].type = ""
            }
            temporary.push(result[m][n + j].dataByYear[k])
          }
        }
        result[m][0].dataByYear = temporary
      }
      dataList.push(result[m][0])
    }
    dataArray.data = dataList
    dataArray.year = yearListMax.reverse()
    commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
  })
}
//清空报表
export const clearReport = function({
  commit,
  state
}, {
  key,
  data
}) {
  commit(TYPE.CLEAR_REPORT_FORM, {
    key,
    data
  })
}
//获取测量数据
export const setMeasurNum = function({
  commit,
  state
}, data) {
  commit(TYPE.SET_MEASURE_NUM, data)
}
//行政区划详情显示隐藏
export const setAreaReportFormShow = function({
  commit,
  state
}, data) {
  commit(TYPE.SET_AREA_REPORT_FORM_SHOW, data)
}
