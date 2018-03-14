/*
 * @Description: 地图数据处理
 * @Author: xia
 * @Date: 2017-12-05 11:03:53
 * @Last Modified by: xia
 * @Last Modified time: 2018-01-22 16:13:05
 */

import axios from '@/util/http'

import URL from '@/settings/sourceControl'
import { parallel } from '@/util/async'
import { getSelect, getSearch, getDetailInfo, getNextAreaInfo, getJson, getMsMacroData } from '@/api/dataSheets'
import mapHelper from '@/util/mapHelper'
import * as TYPE from '../type'

const timeout = 15000

/* 请求配置 */
const http = axios.create({ timeout: timeout })

/* 加载样式 */
function loadStyle(styles, afterLoad) {
    const tasks = []
    for (let j = 0; j < styles.length; j++) {
        const data = styles[j].data
        for (let i = 0; i < data.length; i++) {
            tasks.push(() => {
                const url = data[i].url
                return http
                    .get(url)
                    .then(res => afterLoad({
                        [url]: res.data
                    }))
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
    secAreaList: [],
    areaDetailInfo: '',
    areaList: [],
    searchParams: {},
    searchList: [],
    areaInfoData: [],
    areaInfoList: [],
    activeAreaInfoList: [],
    reportFormShow: false,
    reportFormData: [],
    areaCodeAndDataId: []
}

const getters = {
    areaInfo: state => state.areaInfo,
    secAreaList: state => state.secAreaList,
    areaList: state => state.areaList,
    searchPaneShow: state => state.searchPaneShow,
    searchParams: state => state.searchParams,
    searchList: state => state.searchList,
    areaInfoData: state => state.areaInfoData,
    areaInfoList: state => state.areaInfoList,
    activeAreaInfoList: state => state.activeAreaInfoList,
    tableMenuPaneShow: state => state.tableMenuPaneShow,
    reportFormShow: state => state.reportFormShow,
    reportFormData: state => state.reportFormData,
    areaCodeAndDataId: state => state.areaCodeAndDataId
}

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
        state.searchList = searchList
    },
    [TYPE.GET_AREA_DATA](state, areaInfoData) {
        /*判断第一级是否存在json数据*/
        if (areaInfoData[0].datapath && areaInfoData[0].children.length === 0) {
            areaInfoData[0].isActive = true
            getJson(areaInfoData[0].datapath).then(res => {
                    mapHelper.addLayerByCodeAndJson(areaInfoData[0].id, res)
                })
                /*存在json就push进图层列表*/
            if (state.activeAreaInfoList.findIndex(v => v.id === areaInfoData[0].id) < 0) {
                state.activeAreaInfoList.push(areaInfoData[0])
            }
            state.areaInfoList = areaInfoData
        } else {
            let hasThirdLevel = false
            let temp = []
            let areaInfoList = areaInfoData[0].children
            for (let value of areaInfoList) {
                if (value.children.length > 0) {
                    hasThirdLevel = true
                    for (let val of value.children) {
                        val.isActive = false
                        temp.push(val)
                    }
                } else {
                    temp.push(value)
                }
            }
            if (!hasThirdLevel) {
                areaInfoList.filter(v => v.isActive = true)
            } else {
                areaInfoList.filter(v => v.isActive = false)
            }
            state.areaInfoList = areaInfoData
                /*所有子集push到一个数组里面*/
            state.activeAreaInfoList = temp
                /*如果存在第三级目录，不初始叠加图层*/
            if (!hasThirdLevel) {
                temp.map(v => {
                    getJson(v.datapath).then(res => {
                        mapHelper.addLayerByCodeAndJson(v.id, res)
                    })
                })
            }
        }
        state.areaInfoData = areaInfoData
    },
    [TYPE.SET_ACTIVE_AREA_LIST](state, { activeAreaInfoList, isRemoveAll }) {
        console.log(isRemoveAll)
        if (isRemoveAll) {
            state.activeAreaInfoList.map(v => {
                v.isActive = false
                    /*清空所有图层*/
                mapHelper.removeLayerByCode(v.id)
            })
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
    [TYPE.SET_SELECTED_AREA_LIST](state, { areainfo, isRemoveAll }) {
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
                    /*删除行政区划线*/
                let areaIndex = state.secAreaList.findIndex(v => v.areacode === areainfo.areacode)
                mapHelper.removeLayerById(areaIndex.toString())
            } else {
                temp.push(areainfo)
                    /*画行政区划线*/
                    /*选中区域所在详细信息列表的位置,图层id为当前区域所在列表的下标*/
                let index = state.secAreaList.findIndex(v => v.areacode === areainfo.areacode)
                if (state.areaDetailInfo) {
                    mapHelper.addLayerByIdAndGeojson(index.toString(), state.areaDetailInfo.geojson)
                    mapHelper.flyByPointAndZoom(state.areaDetailInfo.geopoint, 8)
                }
            }
        } else {
            /*删除全部行政区划线*/
            state.areaList.map(v => {
                let index = state.secAreaList.findIndex(i => i.areacode === v.areacode)
                mapHelper.removeLayerById(index.toString())
            })
            state.areaList = []
        }
    },
    [TYPE.SET_LEFT_ACTIVE_AREA_LIST](state, { bol, id }) {
        if (state.areaInfoList.findIndex(v => v.id === id) < 0) {
            state.areaInfoList.filter(v => {
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
                                })
                            } else {
                                /*增加对应图层*/
                                getJson(temp.datapath).then(res => {
                                    mapHelper.addLayerByCodeAndJson(id, res)
                                })
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
                                    }
                                    i.children.splice(index, 1, temp)
                                }
                            }
                        })
                    }
                }
            })
        } else {
            let index = state.areaInfoList.findIndex(v => v.id === id)
            let temp = state.areaInfoList[index]
            if (temp.children.length > 0) {
                temp.children.filter(v => {
                    if (!bol) {
                        v.isActive = false
                            /*删除对应id图层*/
                        mapHelper.removeLayerByCode(id)
                    } else if (bol) {
                        v.isActive = true
                            /*增加对应图层*/
                        getJson(temp.datapath).then(res => {
                            mapHelper.addLayerByCodeAndJson(id, res)
                        })
                    }
                })
            }
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
            }
            state.areaInfoList.splice(index, 1, temp)
        }
    },
    [TYPE.REPORT_FORM_SHOW](state, reportFormShow) {
        state.reportFormShow = reportFormShow
    },
    [TYPE.SET_REPORT_FORM_DATA](state, reportFormData) {
        state.reportFormData = reportFormData
    },
    [TYPE.SET_AREACODE_AND_DATAID](state, areaCodeAndDataId) {
        state.areaCodeAndDataId = areaCodeAndDataId
    },
    [TYPE.CLEAR_REPORT_FORM](state, { key, data }) {
        if (key !== "" && key !== undefined && key !== null) {
            data.splice(key, 1)
        } else {
            data = []
        }
        state.reportFormData = data
    }
}

const actions = {
    searchPaneShow({ commit, state }, isShow) {
        commit(TYPE.SEARCH_PANE_IS_SHOW, isShow)
    },
    tablePaneShow({ commit, state }, isShow) {
        commit(TYPE.TABLE_PANE_SHOW, isShow)
    },
    getSearchParams({ dispatch, commit, state }, { typeParams, params }) {
        console.log({ typeParams, params })
        commit(TYPE.SEARCH_PARAMS, Object.assign({}, state.searchParams, params, typeParams, state.areaInfo))
            // 首先选择type时不做请求
        if (params == {}) {
            return
        }
        dispatch('getSearchResult')
    },
    getAreaDetail({ dispatch, commit, state }, params) {
        getDetailInfo(Object.assign({}, params)).then(res => {
            commit(TYPE.GET_AREA_DATA, res.data)
                // 隐藏目录列表、搜索列表
            commit(TYPE.SEARCH_PANE_IS_SHOW, false)
            commit(TYPE.TABLE_PANE_SHOW, false)
        })
    },
    setAreaInfo({ commit, state }, { areainfo, isRemoveAll }) {
        getNextAreaInfo(areainfo.areacode).then(res => {
            commit(TYPE.SET_AREA_DETAIL_INFO, JSON.parse(res.data))
            commit(TYPE.SET_AREA_INFO, areainfo)
            commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
        })
    },
    deleteAreaInfo({ commit, state }, { areainfo, isRemoveAll }) {
        commit(TYPE.SET_SELECTED_AREA_LIST, { areainfo, isRemoveAll })
    },
    getSearchResult({ commit, state }) {
        getSearch(state.searchParams).then(res => {
            if (res.code == '1') {
                commit(TYPE.GET_SEARCH_RESULT, res.data)
                    /*地点数据标点*/
                res.data.map((v, index) => {
                    if (v.element) {
                        mapHelper.setMarkToMap((state.searchParams.start + index).toString(), v.element.geopoint, (index + 1).toString(), 16, 'TS_定位1', 0.8, '', '')
                    }
                })
            }
        })
    },
    setSecAreaList({ commit, state }, list) {
        commit(TYPE.SET_SEC_AREA_LIST, list)
    },
    setAreaList({ commit, state }, { bol, id }) {
        console.log({ bol, id })
        commit(TYPE.SET_LEFT_ACTIVE_AREA_LIST, { bol, id })
    },
    // 区县区域下一级详细信息
    getNextAreaInfo({ commit, state }) {
        getNextAreaInfo(state.areaInfo.areacode).then(res => {
            console.log(JSON.parse(res.data))
            commit(TYPE.SET_SEC_AREA_LIST, JSON.parse(res.data))
        })
    },
    removeAllAreaList({ commit, state }) {
        commit(TYPE.SET_ACTIVE_AREA_LIST, { list: [], isRemoveAll: true })
    },
    //报表显示隐藏
    setReportFormShow({ commit, state }, isShow) {
        commit(TYPE.REPORT_FORM_SHOW, isShow)
    },
    //获取areaCode 和 dataId
    getAreaCodeAndDataId({ commit, state }, { areaCode, dataId }) {
        var AreaCodeAndDataId = []
        var idList = ""
        var codeList = ""
        for (let i in dataId) {
            if (dataId[i].target.length > 0 && dataId[i].isActive) {
                idList += ',' + dataId[i].id
            }
            if (dataId[i].children.length > 0) {
                for (let j in dataId[i].children) {
                    if (dataId[i].children[j].target.length > 0 && dataId[i].children[j].isActive) {
                        idList += ',' + dataId[i].children[j].id
                    }
                    if (dataId[i].children[j].children.length > 0) {
                        for (let k in dataId[i].children[j].children) {
                            if (dataId[i].children[j].children[k].target.length > 0 && dataId[i].children[j].children[k].isActive) {
                                idList += ',' + dataId[i].children[j].children[k].id
                            }
                        }
                    }
                }
            }
        }
        console.log(areaCode)
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
    },
    //获取报表详情
    getReportData({ commit, state }, { areaCode, dataId }) {
        console.log({ areaCode, dataId })
        var typeNum = 0; //用于保存数据类型数量
        var areaNum = 0; //用于保存不同的地区数量
        var arrayList = []
        getMsMacroData(areaCode, dataId).then(res => {
            for (let i in res.data) {
                typeNum++
                areaNum = 0 //只取一次循环的数量
                for (let j in res.data[i]) {
                    areaNum++
                    var dataByYear = []; //用于保存每条数据
                    for (let k = 0; k < res.data[i][j]['year'].length; k++) {
                        var yearList = res.data[i][j]['year'][k]
                        var filedsData = res.data[i][j][yearList][0].filedsData.split('|ZX|')
                        for (var p = 0; p < filedsData.length; p++) {
                            if (dataByYear.length < filedsData.length) {
                                dataByYear.push({ "type": filedsData[p].split(':')[0], "areaName": res.data[i][j][yearList][0].areaName, "areaCode": j })
                            }
                            dataByYear[p][yearList] = filedsData[p].split(':')[1] || "--"
                        }
                        if (k == res.data[i][j]['year'].length - 1) {
                            arrayList.push({ "name": res.data[i][j][yearList][0].name, "id": res.data[i][j][yearList][0].dataId, "dataByYear": dataByYear })
                        }
                    }
                }
            }
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
            commit(TYPE.SET_REPORT_FORM_DATA, dataList)
        })
    },
    //清空报表
    clearReport({ commit, state }, { key, data }) {
        commit(TYPE.CLEAR_REPORT_FORM, { key, data })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}