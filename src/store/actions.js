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
import router from '@/router'

// 数组处理
function handleArray(array) {
    let temp = []
    array.map(v => {
        temp.push(v.split(','))
    })
    temp.push([mapHelper.getCenter().lng, mapHelper.getCenter().lat])
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
                let temp = handleArray(res.data.points)
                if (res.data.flag === 2) {
                    mapHelper.flyByBounds(temp)
                }
                temp.splice(-1, 1)
                mapHelper.setMarksToMap(id, temp, res.data.mapguid, 'TS_定位1', 0.8, result.minzoom)
                    /*删除地图mark */
                for (let i = -1; i < 10; i++) {
                    mapHelper.removeLayerById((i + 1).toString())
                }
                mapHelper.closePopup()
                mapHelper.closePicPopup()
            }
        })
    })
}
/*
 *判断当前图层列表是否存在，存在删除，并移除地图图层
 *不存在，push进图层列表，并加载地图图层
 */
function checkData(data, commit, first, type) {
    let cur = Object.assign({}, data)
    let temp = state.activeAreaInfoList.slice()
    let layerIdList = state.layerIdList.slice()
    let clickType = data.clickType
    let falseLength = 0
    let isGo = true
    if (cur.isActive && cur.children && cur.children.length > 0) {
        cur.children.map(v => {
            if (!v.isActive) {
                falseLength += 1
            }
        })
        if (falseLength === cur.children.length || type == 'report') {
            cur.isActive = false
            isGo = false
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
        }
    }
    if (!isGo) {
        return
    }
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
                }
            } else {
                if (index < 0) {
                    addLayer(v.datapath, v.id)
                    v.isActive = true
                    cur.isActive = true
                    commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': v, 'isRemoveAll': false })
                    commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
                } else if (!first && !clickType) {
                    v.isActive = false
                    cur.isActive = false
                    mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
                    mapHelper.removeLayerByCode(v.id)
                    mapHelper.removeLayerById(v.id)
                    commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': v, 'isRemoveAll': false })
                    commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
                }
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
                commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': cur, 'isRemoveAll': false })
                commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            } else if (!first) {
                cur.isActive = false
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
                mapHelper.removeLayerByCode(cur.id)
                mapHelper.removeLayerById(cur.id)
                if (!clickType) {
                    commit(TYPE.SET_ACTIVE_AREA_LIST, { 'item': cur, 'isRemoveAll': false })
                    commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
                }
            }
        }
    }
    return cur
}

/*
 *判断数据type类型，做相应操作
 */
function checkClickedDataType({ dispatch, data, commit, first, reportType }) {
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
        if (((cur.reportShow || cur.clickType === 'details') || (cur.isOnCilckGet && cur.reportShow)) && !reportType) {
            dispatch('setAreaReportFormShow', {
                isShow: true,
                dataId: cur.id,
                index: '',
                type: 1
            })
            dispatch('setReportFormShow', false)
        }
    } else if (type === 1) { // type为1，无下一级目录
        if (yu === 0) { // yu为0，不做任何操作
            console.log('仅为目录')
            cur.isActive = false
            temp = cur
        } else if (yu === 1) { // yu为1，仅有空间数据，即加载空间数据
            temp = checkData(cur, commit, first, reportType)
            if (((cur.reportShow || cur.clickType === 'details') || (cur.isOnCilckGet && cur.reportShow)) && !reportType) {
                dispatch('setReportFormShow', true)
                dispatch('setAreaReportFormShow', { isShow: false })
            }
        } else if (yu === 2) { // yu为2，仅有统计数据，加载统计数据
            console.log('仅有统计数据，加载统计数据')
            if (first) {
                cur.isActive = true
                commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            } else {
                if (!cur.reportShow) {
                    cur.isActive = !cur.isActive
                } else {
                    cur.isActive = true
                }
            }
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            dispatch('setReportFormShow', true)
            dispatch('setAreaReportFormShow', { isShow: false })
            temp = cur
        } else if (yu === 3) { // yu为3，有空间数据和统计数据，优先加载空间数据
            console.log('有空间数据和统计数据，优先加载空间数据')
            temp = checkData(cur, commit, first, reportType)
            if (((cur.reportShow || cur.clickType === 'details') || (cur.isOnCilckGet && cur.reportShow)) && !reportType) {
                dispatch('setReportFormShow', true)
                dispatch('setAreaReportFormShow', { isShow: false })
            }
        } else if (yu === 4) { // yu为4，仅有文本数据，即加载文本数据
            console.log('仅有文本数据，即加载文本数据')
            if (first) {
                cur.isActive = false
                dispatch('setReportFormShow', false)
                dispatch('setAreaReportFormShow', {
                    isShow: true,
                    dataId: cur.id,
                    index: '',
                    type: 1
                })
            } else {
                cur.isActive = !cur.isActive
            }
            if (((cur.reportShow || cur.clickType === 'details') || (cur.isOnCilckGet && cur.reportShow)) && !reportType) {
                dispatch('setReportFormShow', false)
                dispatch('setAreaReportFormShow', {
                    isShow: true,
                    dataId: cur.id,
                    index: '',
                    type: 1
                })
            }
            commit(TYPE.MODIFY_AREA_INFO_LIST, cur)
            temp = cur
        } else if (yu === 5) { // yu为5，有文本数据和空间数据，优先加载空间数据
            console.log('有文本数据和空间数据，优先加载空间数据')
            temp = checkData(cur, commit, first, reportType)
        }
    } else if (type === 2) { // type为2，即为图层，加载图层
        console.log('即为图层，加载图层')
        temp = checkData(cur, commit, first, reportType)
        if ((cur.reportShow || cur.clickType === 'details') && !reportType) {
            dispatch('setReportFormShow', true)
            dispatch('setAreaReportFormShow', { isShow: false })
        }
    } else if (type === 3) { // type为3，即为网页，记载网页
        console.log('即为网页，加载网页')
        commit(TYPE.SET_URL_PATH, cur.datapath)
        window.open(cur.datapath)
    } else if (type === 4) { // type为4，即为720图片
        console.log('为720图片')
    }
}

/*
 *数据添加isActive标志位
 */
function addIsActive(data) {
    let temp = state.activeAreaInfoList.slice()
    data.isActive = false
    if (temp.length > 0) {
        temp.map(v => {
            if (data.id == v.id) {
                data.isActive = true
            } else {
                data.isActive = false
            }
            data.children.map(h => {
                if (h.id === v.id) {
                    h.isActive = true
                } else {
                    h.isActive = false
                }
                if (h.children && h.children.length > 0) {
                    h.children.map(n => {
                        if (n.id === v.id) {
                            n.isActive = true
                        } else {
                            h.isActive = false
                        }
                        if (n.children && n.children.length > 0) {
                            n.children.map(f => {
                                if (f.id === v.id) {
                                    f.isActive = true
                                } else {
                                    h.isActive = false
                                }
                            })
                        }
                    })
                }
            })
        })
    } else if (data.children.length > 0) {
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
    let data = Object.assign({}, state.searchParams, typeParams, params, state.areaInfo)
    commit(TYPE.SEARCH_PARAMS, data)
    if (!params) {
        return
    }
    getSearch(data).then(res => {
        if (res.code == '1') {
            /*地点数据标点*/
            res.data.map((v, index) => {
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
                mapHelper.removeLayerById((index + 1).toString())
                mapHelper.closePopup()
                mapHelper.closePicPopup()
                if (v.element || v.poi) {
                    if (v.element) {
                        if (v.element.geopoint) {
                            mapHelper.setMarkToMap((index + 1).toString(), v.element.geopoint, v.uuid, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                        } else if (v.element.geojson) {
                            let json = JSON.parse(v.element.geojson)
                            if (json.type === 'MultiPolygon') {
                                // 多面
                                let temp = json.coordinates[0][0] ? json.coordinates[0][0] : []
                                let sumX = 0,
                                    sumY = 0
                                temp.map(v => {
                                    sumX += v[0]
                                    sumY += v[1]
                                })
                                v.element.geopoint = [sumX / temp.length, sumY / temp.length]
                            } else if (json.type === 'Polygon') {
                                let temp = json.coordinates[0] ? json.coordinates[0] : []
                                let sumX = 0,
                                    sumY = 0
                                temp.map(v => {
                                    sumX += v[0]
                                    sumY += v[1]
                                })
                                v.element.geopoint = [sumX / temp.length, sumY / temp.length]
                            } else if (json.type === 'MultiPolyline') {
                                v.element.geopoint = json.coordinates[json.coordinates[0].length / 2]
                            } else if (json.type === 'Polyline') {
                                v.element.geopoint = json.coordinates[json.coordinates[0].length / 2]
                            } else if (json.type === 'PointCollection') {
                                v.element.geopoint = json.coordinates[json.coordinates[0].length / 2]
                            } else if (json.type === 'Point') {
                                v.element.geopoint = json.coordinates[0]
                            }
                            mapHelper.setMarkToMap((index + 1).toString(), v.element.geopoint, v.uuid, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                        }
                    }
                    if (v.poi) {
                        mapHelper.setMarkToMap((index + 1).toString(), v.poi.geopoint, v.uuid, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                    }
                }
                /*如果存在县市级行政区域，画线*/
                if (v.searchType === 2 && v.area.areacode.length === 6) {
                    let areainfo = {
                        areacode: v.area.areacode,
                        areaname: v.area.areaname
                    }
                    dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
                    mapHelper.setPopupToMap(v.area.geopoint)
                }
            })
            commit(TYPE.GET_SEARCH_RESULT, res.data)
        }
    })
}
export const getAreaDetail = function({ dispatch, commit, state }, params) {
    if (params.searchType && params.searchType === 4) {
        let obj1 = {
            id: params.macro.data.id
        }
        let areainfo = {
            areacode: params.macro.areaCode,
            areaname: params.macro.areaName
        }
        getDetailInfo(Object.assign({}, obj1)).then(res => {
            let data = addIsActive(res.data[0])
            if (data.children.length > 0) {
                commit(TYPE.GET_AREA_DATA, data)
                    // 隐藏目录列表、搜索列表
                commit(TYPE.SEARCH_PANE_IS_SHOW, false)
                commit(TYPE.TABLE_PANE_SHOW, false)
            }
            data.isOncilckGet = true
            data.reportShow = state.reportFormShow
            checkClickedDataType({ dispatch, data, commit, "first": true })
            if (areainfo.areacode !== '500000') {
                dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
            }
        })
        return
    }
    getDetailInfo(Object.assign({}, params)).then(res => {
        let data = addIsActive(res.data[0])
        data.isOnCilckGet = true
        data.reportShow = state.reportFormShow
        commit(TYPE.GET_AREA_DATA, data)
        checkClickedDataType({ dispatch, data, commit, "first": true })
            // 隐藏目录列表、搜索列表
        commit(TYPE.SEARCH_PANE_IS_SHOW, false)
        commit(TYPE.TABLE_PANE_SHOW, false)
    })
}
export const setAreaInfo = function({ commit, state }, { areainfo, isRemoveAll, type }) {
    if (!isRemoveAll) {
        getNextAreaDetailInfo(areainfo.areacode).then(res => {
            if (res.code == '1') {
                areainfo.areaname = JSON.parse(res.data).areaname
                commit(TYPE.SET_AREA_DETAIL_INFO, JSON.parse(res.data))
                commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll, type })
                commit(TYPE.SET_AREA_INFO, areainfo)
            }
        })
    } else {
        commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
    }
}
export const deleteAreaInfo = function({ commit, state }, { areainfo, isRemoveAll }) {
    commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
}
export const setAreaList = function({ dispatch, commit, state }, { param, type }) {
        let data = param
        if (data.searchType) {
            if (data.searchType === 4) {
                checkClickedDataType({ dispatch, 'data': data.macro.data, commit, 'first': false, 'reportType': type })
                if (data.macro.areaCode !== '500000') {
                    let areainfo = {
                        areacode: data.macro.areaCode,
                        areaname: data.macro.areaName
                    }
                    dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
                }
            } else if (data.searchType === 2) {
                if (data.area.areacode !== '500000') {
                    let areainfo = {
                        areacode: data.area.areacode,
                        areaname: data.area.areaname
                    }
                    dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
                }
            } else if (data.searchType === 6) {
                if (data.area.areacode !== '500000') {
                    let areainfo = {
                        areacode: data.area.areacode,
                        areaname: data.area.areaname
                    }
                }
                dispatch('setAreaInfo', { 'areainfo': areainfo, 'isRemoveAll': false })
            }
        } else {
            checkClickedDataType({ dispatch, data, commit, 'first': false, 'reportType': type })
        }
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
    //获取测量数据
export const setMeasurNum = function({ commit, state }, data) {
        commit(TYPE.SET_MEASURE_NUM, data)
    }
    // 搜周边显示隐藏
export const setAroundSearchShow = function({ commit, state }, { isShow, point, mapguid }) {
    let data = {
        isShow: isShow,
        point: point,
        mapguid: mapguid
    }
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

export const addTourismLayer = function({ commit, state }, flag) {
    mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
    if (flag == 0) {
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_5A.json', 'Z10000')
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_4A.json', 'Z10001')
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_3A.json', 'Z10002')
    } else if (flag == 1) {
        mapHelper.removeLayerByCode('Z10000')
        mapHelper.removeLayerByCode('Z10001')
        mapHelper.removeLayerByCode('Z10002')
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_5A.json', 'Z10000')
    } else if (flag == 2) {
        mapHelper.removeLayerByCode('Z10000')
        mapHelper.removeLayerByCode('Z10001')
        mapHelper.removeLayerByCode('Z10002')
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_4A.json', 'Z10001')
    } else if (flag == 3) {
        mapHelper.removeLayerByCode('Z10000')
        mapHelper.removeLayerByCode('Z10001')
        mapHelper.removeLayerByCode('Z10002')
        addLayer('/ZT_DBSJ_LSWH_SJYC/LSWH_3AJJYSJQ_3A.json', 'Z10002')
    } else if (flag == 4) {
        addLayer('/ZT_ZTZT_FPZT/ZT_ZTZT_FPZT.json', 'Z10003')
    }
}

// 获取扶贫专题数据
export const getProvertyData = function({ commit, state }, { type, start }) {
    console.log(type, start)
    getProvertyTopic(start).then(res => {
        let data = {
            type: type,
            list: res.data.data
        }
        commit(TYPE.SET_TOPIC_LIST, data)
    })
}

export const addProvertyAreaLayer = function({ commit, state }, data) {
    addLayer(data.datapath, data.id)
    commit(TYPE.ADD_PROVERTY_AREA_LAYER, data)
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
                'dataId': [state.areaInfoList, state.searchList]
            })
            dispatch('getReportData', {
                'areaCode': state.areaCodeAndDataId[0],
                'dataId': state.areaCodeAndDataId[1],
                'itemList': state.areaCodeAndDataId[2]
            })
        }
    }
    //行政区划详情显示隐藏
export const setAreaReportFormShow = function({ dispatch, commit, state }, { isShow, dataId, index, areaInfo, type }) {
        //type的值为1、文本数据，2、通过搜索得到的数据，3、扶贫数据，4、不用搜索得到popup详情数据
        commit(TYPE.SET_AREA_REPORT_FORM_SHOW, isShow)
        if (isShow) {
            if (type == 1) {
                dispatch('getDataFileByCodeAndId', {
                    'areaCode': state.areaList,
                    'dataId': dataId
                })
            } else if (type == 2) {
                dispatch('getReportDataByAreaCode', areaInfo)
            } else if (type == 3) {
                dispatch('getAreaPovertyAlleviationDetailByAreaCode', areaInfo)
            } else if (type == 4) {
                dispatch('setReportFormDetails', areaInfo)
            }
        }
    }
    //获取areaCode 和 dataId
export const getAreaCodeAndDataId = function({ commit, state }, { areaCode, dataId }) {
        var AreaCodeAndDataId = getAreaCodeAndDataIdInJS(areaCode, dataId)
        commit(TYPE.SET_AREACODE_AND_DATAID, AreaCodeAndDataId)
    }
    //获取报表详情
export const getReportData = async function({ commit, state }, { areaCode, dataId, itemList }) {
        var dataArray = await getReportDataInJS(areaCode, dataId, itemList)
        commit(TYPE.SET_REPORT_FORM_TYPE, 1)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    //根据areacode获取行政区划详情
export const getReportDataByAreaCode = async function({ commit, state }, data) {
        var dataArray = await getReportDataByAreaCodeInJS(data)
        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    }
    //获取文件数据
export const getDataFileByCodeAndId = async function({ commit, state }, { areaCode, dataId, index }) {
        var dataArray = await getDataFileByCodeAndIdInJS(areaCode, dataId, index)
        commit(TYPE.SET_REPORT_FORM_TYPE, 2)
        commit(TYPE.SET_AREACODE_AND_DATAID, { 'codeList': [], 'idList': dataId, 'itemList': [] })
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
    //根据报表类型，请求对应方法，针对areaCodeList改变时调用
export const setFunByReportFormType = function({ dispatch, commit, state }) {
        if (state.reportFormShow || state.areaReportFormShow) {
            if (state.reportFormtype == 1) {
                dispatch('setReportFormShow', true)
            } else if (state.reportFormtype == 2) {
                dispatch('setAreaReportFormShow', {
                    isShow: true,
                    dataId: state.areaCodeAndDataId.idList,
                    index: ''
                })
            }
        }
    }
    //设置绘制面板的type
export const setDrawPanelType = function({ commit, state }, type) {
    commit(TYPE.SET_DRAW_PANEL_TYPE, type)
}

// 设置地图poi点颜色
export const setPoiColor = function({ commit, state }, id) {
    mapHelper.setMarkIconByLayerID(id.toString(), 'TS_定位2')
    for (let i = 1; i <= 10; i++) {
        if (id != i) {
            mapHelper.setMarkIconByLayerID(i.toString(), 'TS_定位1')
        }
    }
}