import * as TYPE from './type'
import axios from '@/util/http'
import {
    getSelect,
    getSearch,
    getDetailInfo,
    getNextAreaDetailInfo,
    getMsMacroData,
    getQueryElementByPoint,
    getTourismTopic,
    getProvertyTopic,
    getAreaDetailByAreaCode,
    getEconomicUnitHtmlByAreaCode,
    getDataFileInfo,
    getAreaPovertyAlleviationDetail
} from '@/api/dataSheets'
import {
    getAreaCodeAndDataIdInJS,
    getReportDataInJS,
    getReportDataByAreaCodeInJS,
    getDataFileByCodeAndIdInJS,
    getAreaPovertyAlleviationDetailByAreaCodeInJS
} from '@/util/reportForm'
import { getJson } from '@/api/getJson'
import mapHelper from '@/util/mapHelper'
import state from './state'

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
    return temp
}

/* 图层加载
 * 1：当前区域
 * 2：拓展10公里
 * 3：无
 */
function addLayer(datapath, id) {
    getJson(datapath).then(res => {
        const result = mapHelper.addLayerByCodeAndJson(id, res)
        getQueryElementByPoint(result).then(res => {
            if (res.data && res.data.flag !== 3) {
                // 地图飞点
                mapHelper.flyByBounds(handleArray(res.data.points))
                mapHelper.setMarksToMap(id, handleArray(res.data.points).splice(1, handleArray(res.data.points).length - 1), res.data.mapguid, 'TS_定位1', 0.8, result.minzoom)
                    /*删除地图mark */
                for (let i = 0; i < 10; i++) {
                    mapHelper.removeLayerById((state.searchParams.start + i).toString())
                }
                /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
            }
        })
    })
}
/*
 *判断当前图层列表是否存在，存在删除，并移除地图图层
 *不存在，push进图层列表，并加载地图图层
 */
function checkData(data, commit, first) {
    console.log(first)
    let cur = Object.assign({}, data)
    let temp = state.activeAreaInfoList.slice()
    let layerIdList = state.layerIdList.slice()
    if (cur.children && cur.children.length > 0) {
        cur.children.map(v => {
            let index = temp.findIndex(f => f.id === v.id)
            if (first) {
                if (index < 0) {
                    addLayer(v.datapath, v.id)
                    v.isActive = true
                    cur.isActive = true
                    commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': v, 'isRemoveAll': false })
                    commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
                    commit(TYPE.ADD_LAYER_ID_LIST, v.id)
                }
            } else {
                if (index < 0) {
                    addLayer(v.datapath, v.id)
                    v.isActive = true
                    cur.isActive = true
                } else if (!first) {
                    v.isActive = false
                    cur.isActive = false
                    mapHelper.removeLayerByCode(v.id)
                }
                commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': v, 'isRemoveAll': false })
                commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
                commit(TYPE.ADD_LAYER_ID_LIST, v.id)
            }
        })
    } else {
        let index = temp.findIndex(f => f.id === cur.id)
        if (first) {
            if (index < 0) {
                addLayer(cur.datapath, cur.id)
                cur.isActive = true
                commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': cur, 'isRemoveAll': false })
                commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            }
        } else {
            if (index < 0) {
                addLayer(cur.datapath, cur.id)
                cur.isActive = true
            } else if (!first) {
                cur.isActive = false
                mapHelper.removeLayerByCode(cur.id)
            }
            commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': cur, 'isRemoveAll': false })
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            commit(TYPE.ADD_LAYER_ID_LIST, cur.id)
        }
    }
    return cur
}

/*
 *判断数据type类型，做相应操作
 */
function checkClickedDataType({ dispatch, data, commit, first }) {
    let cur = Object.assign({}, data)
    let type = parseInt(Number(cur.type) / 10)
    let yu = Number(cur.type) % 10
    let temp
        // 加入图层数组前，判断是否存在，存在删除，不存在push，然后设置isActive
        // type为0，仅为目录，直接显示列表
    if (type === 0) {
        console.log('仅为目录')
        cur.isActive = false
        temp = cur
    } else if (type === 1) { // type为1，无下一级目录
        if (yu === 0) { // yu为0，不做任何操作
            console.log('仅为目录')
            cur.isActive = false
            temp = cur
        } else if (yu === 1) { // yu为1，仅有空间数据，即加载空间数据
            temp = checkData(cur, commit, first)
        } else if (yu === 2) { // yu为2，仅有统计数据，加载统计数据
            console.log('仅有统计数据，加载统计数据')
            if (first) {
                cur.isActive = true
            } else {
                cur.isActive = !cur.isActive
            }
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            temp = cur
        } else if (yu === 3) { // yu为3，有空间数据和统计数据，优先加载空间数据
            console.log('有空间数据和统计数据，优先加载空间数据')
            temp = checkData(cur, commit, first)
        } else if (yu === 4) { // yu为4，仅有文本数据，即加载文本数据
            console.log('仅有文本数据，即加载文本数据')
            if (first) {
                cur.isActive = true
            } else {
                cur.isActive = !cur.isActive
            }
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            temp = cur
        } else if (yu === 5) { // yu为5，有文本数据和空间数据，优先加载空间数据
            console.log('有文本数据和空间数据，优先加载空间数据')
            temp = checkData(cur, commit, first)
        }
    } else if (type === 2) { // type为2，即为图层，加载图层
        console.log('即为图层，加载图层')
        temp = checkData(cur, commit, first)
    } else if (type === 3) { // type为3，即为网页，记载网页

    } else if (type === 4) { // type为4，即为720图片

    }
}

/*
 *数据添加isActive标志位
 */
function addIsActive(data) {
    data.isActive = false
    if (data.children.length > 0) {
        data.children.map(v => {
            v.isActive = false
            if (v.children.length > 0) {
                v.children.map(i => i.isActive = false)
            }
        })
    }
    return data
}

export const searchPaneShow = function({ commit, state }, isShow) {
    commit(TYPE.SEARCH_PANE_IS_SHOW, isShow)
}
export const tablePaneShow = function({ commit, state }, isShow) {
    commit(TYPE.TABLE_PANE_SHOW, isShow)
}
export const getSearchParams = function({ dispatch, commit, state }, { typeParams, params }) {
    // 首先选择type时不做请求
    if (params == {}) {
        return
    }
    let data = Object.assign({}, state.searchParams, params, typeParams, state.areaInfo)
    getSearch(data).then(res => {
        if (res.code == '1') {
            commit(TYPE.GET_SEARCH_RESULT, res.data)
                /*地点数据标点*/
            res.data.map((v, index) => {
                if (v.element) {
                    if (state.searchParams.start && typeParams.start > state.searchParams.start) {
                        mapHelper.removeLayerById((state.searchParams.start + index - 10).toString())
                    } else {
                        mapHelper.removeLayerById((state.searchParams.start + index).toString())
                    }
                    mapHelper.setMarkToMap((typeParams.start + index).toString(), v.element.geopoint, v.uuid, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                }
                /*如果存在行政区域，画线*/
                if (v.searchType === 2) {
                    let areainfo = {
                        areacode: v.area.areacode,
                        areaname: v.area.areaname
                    }
                    dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
                    mapHelper.setPopupToMap(v.area.geopoint)
                }
            })
            commit(TYPE.SEARCH_PARAMS, data)
        }
    })
}
export const getAreaDetail = function({ dispatch, commit, state }, params) {
    getDetailInfo(Object.assign({}, params)).then(res => {
        let data = addIsActive(res.data[0])
        commit(TYPE.GET_AREA_DATA, data)
        checkClickedDataType({ dispatch, data, commit, "first": true })
            // 隐藏目录列表、搜索列表
        commit(TYPE.SEARCH_PANE_IS_SHOW, false)
        commit(TYPE.TABLE_PANE_SHOW, false)
    })
}
export const setAreaInfo = function({ commit, state }, { areainfo, isRemoveAll }) {
    if (!isRemoveAll) {
        getNextAreaDetailInfo(areainfo.areacode).then(res => {
            if (res.code == '1') {
                areainfo.areaname = JSON.parse(res.data).areaname
                commit(TYPE.SET_AREA_DETAIL_INFO, JSON.parse(res.data))
                commit(TYPE.SET_AREA_INFO, areainfo)
                commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
            }
        })
    } else {
        commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
    }
}
export const deleteAreaInfo = function({ commit, state }, { areainfo, isRemoveAll }) {
    commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
}
export const getSearchResult = function({ dispatch, commit, state }) {
    getSearch(state.searchParams).then(res => {
        if (res.code == '1') {
            commit(TYPE.GET_SEARCH_RESULT, res.data)
                /*地点数据标点*/
            res.data.map((v, index) => {
                if (v.element) {
                    mapHelper.removeLayerById((state.searchParams.start + index - 10).toString())
                    mapHelper.setMarkToMap((state.searchParams.start + index).toString(), v.element.geopoint, v.uuid, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                }
                /*如果存在行政区域，画线*/
                if (v.searchType === 2) {
                    let areainfo = {
                        areacode: v.area.areacode,
                        areaname: v.area.areaname
                    }
                    dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
                    mapHelper.setPopupToMap(v.area.geopoint)
                }
            })
        }
    })
}
export const setSecAreaList = function({ commit, state }, list) {
    commit(TYPE.SET_SEC_AREA_LIST, list)
}
export const setAreaList = function({ dispatch, commit, state }, data) {
        checkClickedDataType({ dispatch, data, commit, 'first': false })
    }
    // 区县区域下一级详细信息
export const getNextAreaInfo = function({ commit, state }) {
    getNextAreaDetailInfo(state.areaInfo.areacode).then(res => {
        console.log(JSON.parse(res.data))
        commit(TYPE.SET_SEC_AREA_LIST, JSON.parse(res.data))
    })
}
export const removeAllAreaList = function({ commit, state }) {
        commit(TYPE.SET_ACTIVE_AREA_LIST, { list: [], isRemoveAll: true })
    }
    // 加载搜索结果的空间数据，并push到areainfodata
export const loadSearchItemMacro = function({ commit, state }, item) {
        commit(TYPE.SET_SEARCH_MACRO_LIST, item)
    }
    /*移除搜索结果空间数据渲染列表*/
export const removeSearchItem = function({ commit, state }, item) {
        commit(TYPE.SET_SEARCH_MACRO_LIST, item)
    }
    /*设置uuidinfo*/
export const setUuidInfo = function({ commit, state }, uuidinfo) {
        commit(TYPE.SET_UUID_INFO, uuidinfo)
    }
    //获取测量数据
export const setMeasurNum = function({ commit, state }, data) {
        commit(TYPE.SET_MEASURE_NUM, data)
    }
    // 搜周边显示隐藏
export const setAroundSearchShow = function({ commit, state }, data) {
    commit(TYPE.SET_SEARCH_AROUND_SHOW, data)
}

// 获取旅游专题数据
export const getTopicData = function({ commit, state }, type) {
    getTourismTopic().then(res => {
        let data = {
            type: type,
            list: res.data
        }
        commit(TYPE.SET_TOPIC_LIST, data)
    })
}

export const addTourismLayer = function({ commit, state }, type) {
    commit(TYPE.ADD_TOURSIM_LAYER, type)
}

// 获取扶贫专题数据
export const getProvertyData = function({ commit, state }, type) {
    getProvertyTopic().then(res => {
        let data = {
            type: type,
            list: res.data.data
        }
        commit(TYPE.SET_TOPIC_LIST, data)
    })
}

// 保存用户登录信息
export const setUserinfo = function({ commit, state }, data) {
        commit(TYPE.SET_USER_INFO, data)
    }
    // 专题数据直接展示详情
export const setReportFormDetails = function({ commit, state }, data) {
    commit(TYPE.SET_REPORT_FORM_DATA, data)
}
export const setNewMapJsonAndImg = function({ commit, state }, data) {
        commit(TYPE.SET_MAP_JSON_AND_IMG, data)
    }
    // 报表的相关方法
    // 统计数据显示隐藏
export const setReportFormShow = function({ dispatch, commit, state }, isShow) {
        commit(TYPE.SET_REPORT_FORM_SHOW, isShow)
        if (isShow) {
            dispatch('getAreaCodeAndDataId', {
                'areaCode': state.areaList,
                'dataId': [state.areaInfoList, state.searchItemMacroList]
            })
            dispatch('getReportData', {
                'areaCode': state.areaCodeAndDataId[0],
                'dataId': state.areaCodeAndDataId[1]
            })
        }
    }
    //行政区划详情显示隐藏
export const setAreaReportFormShow = function({ commit, state }, data) {
        commit(TYPE.SET_AREA_REPORT_FORM_SHOW, data)
    }
    //获取areaCode 和 dataId
export const getAreaCodeAndDataId = function({ commit, state }, { areaCode, dataId }) {
        var AreaCodeAndDataId = getAreaCodeAndDataIdInJS(areaCode, dataId)
        commit(TYPE.SET_AREACODE_AND_DATAID, AreaCodeAndDataId)
    }
    //获取报表详情
export const getReportData = async function({ commit, state }, { areaCode, dataId }) {
        var dataArray = await getReportDataInJS(areaCode, dataId)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    //根据areacode获取行政区划详情
export const getReportDataByAreaCode = async function({ commit, state }, data) {
        var dataArray = await getReportDataByAreaCodeInJS(data)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    //获取文件数据
export const getDataFileByCodeAndId = async function({ commit, state }, { areaCode, dataId }) {
        var dataArray = await getDataFileByCodeAndIdInJS(areaCode, dataId)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    // 获取贫困乡镇数据详情
export const getAreaPovertyAlleviationDetailByAreaCode = async function({ commit, state }, data) {
        var dataArray = await getAreaPovertyAlleviationDetailByAreaCodeInJS(data)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    //清空报表
export const clearReport = function({ commit, state }, { key, data }) {
    commit(TYPE.CLEAR_REPORT_FORM, { key, data })
}