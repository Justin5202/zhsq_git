import * as TYPE from './type'
import state from './state'
import axios from '@/util/http'
import { getQueryElementByPoint } from '@/api/dataSheets'
import { getJson } from '@/api/getJson'
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
                mapHelper.setMarksToMap(id, handleArray(res.data.points).splice(
                            1, handleArray(res.data.points).length - 1), res.data.mapguid,
                        'TS_定位1', 0.8, result.minzoom)
                    /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList,
                    state.areaCodeList)
            }
        })
    })
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
        state.topicList = []
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
    [TYPE.GET_AREA_DATA](state, list) {
        let n = 0
        if (state.areaInfoList.length > 0) {
            state.areaInfoList.map(v => {
                if (v.id !== list.id) {
                    n += 1
                }
            })
            if (n == state.areaInfoList.length) {
                state.areaInfoList.unshift(list)
            } else {
                let index = state.areaInfoList.findIndex(v => v.id === list.id)
                if (index > -1) {
                    let temp = state.areaInfoList[index]
                    state.areaInfoList.splice(index, 1)
                    state.areaInfoList.unshift(temp)
                }
            }
        } else {
            state.areaInfoList.push(list)
        }
    },
    [TYPE.MODIFY_AREA_INFO_LIST](state, item) {
        let temp = []
        temp.push(item)
        if (item.children && item.children.length > 0) {
            item.children.map(v => {
                temp.push(v)
                if (v.children && v.children.length > 0) {
                    v.children.map(i => temp.push(i))
                }
            })
        }
        let list = state.areaInfoList[0]
        temp.map(n => {
            if (list.id === n.id) {
                list.isActive = n.isActive
            }
            if (list.children.length > 0) {
                list.children.map(v => {
                    if (v.id === n.id) {
                        v.isActive = n.isActive
                    } else if (v.children.length > 0) {
                        v.children.map(i => {
                            if (i.id === n.id) {
                                i.isActive = n.isActive
                            }
                        })
                    }
                })
            }
        })
    },
    [TYPE.ADD_LAYER_ID_LIST](state, id) {
        state.layerIdList.push(id)
    },
    [TYPE.SET_ACTIVE_AREA_LIST](state, { item, isRemoveAll }) {
        if (isRemoveAll) {
            state.activeAreaInfoList.map(v => {
                /*清空所有图层*/
                mapHelper.removeLayerByCode(v.id)
            })
            state.activeAreaInfoList.splice(0, state.activeAreaInfoList.length)
            state.areaInfoList.map(v => {
                v.isActive = false
                if (v.children) {
                    v.children.map(i => {
                        i.isActive = false
                        if (i.children) {
                            i.children.map(v => v.isActive = false)
                        }
                    })
                }
            })
        } else {
            let index = state.activeAreaInfoList.findIndex(v => v.id === item.id)
            if (index < 0) {
                state.activeAreaInfoList.push(item)
            } else {
                state.activeAreaInfoList.splice(index, 1)
            }
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
                let codeIndex = state.areaCodeList.findIndex(v => v === areainfo.areacode)
                state.areaCodeList.splice(codeIndex, 1)
                    /*删除行政区划线*/
                let areaIndex = state.secAreaList.findIndex(v => v.areacode ===
                    areainfo.areacode)
                mapHelper.removeLayerById(areainfo.areacode.toString())
                    /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
            } else {
                temp.push(areainfo)
                    /*更新选中区域areacode列表*/
                if (areainfo.areacode !== '501002') {
                    state.areaCodeList.push(areainfo.areacode)
                }
                /*画行政区划线*/
                /*选中区域所在详细信息列表的位置,图层id为当前区域所在列表的下标*/
                if (state.areaDetailInfo) {
                    mapHelper.addLayerByIdAndGeojson(state.areaDetailInfo.areacode.toString(), state.areaDetailInfo
                        .geojson)
                    mapHelper.flyByPointAndZoom(state.areaDetailInfo.geopoint, 8)
                    mapHelper.setPopupToMap(state.areaDetailInfo.geopoint, state.areaDetailInfo.mapguid)
                        /*图层过滤*/
                    console.log(state.layerIdList, state.areaCodeList)
                    mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
                }
            }
        } else {
            /*删除全部行政区划线*/
            state.areaList.map(v => {
                    mapHelper.removeLayerById(v.areacode.toString())
                })
                /*图层过滤*/
            mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList = [])
            state.areaList = []
            state.areaInfo = {
                areacode: 500000,
                areaname: '重庆市'
            }
        }
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
    [TYPE.CLEAR_REPORT_FORM](state, { key, data }) {
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
    },
    [TYPE.SET_SEARCH_AROUND_SHOW](state, flag) {
        state.searchAroundShow = flag
    },
    [TYPE.SET_TOPIC_LIST](state, flag) {
        state.topicList = flag
    },
    [TYPE.SET_TOPIC_LIST_SHOW](state, flag) {
        state.topicListShow = flag
    },
    [TYPE.ADD_TOURSIM_LAYER](state, flag) {
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
    },
    [TYPE.SET_USER_INFO](state, userinfo) {
        state.userinfo = userinfo
    },
    [TYPE.ADD_PROVERTY_AREA_LAYER](state, data) {
        addLayer(data.datapath, data.id)
        data.isActive = true
        data.children = []
        if (state.activeAreaInfoList.findIndex(v => v.id == data.id) < 0) {
            state.activeAreaInfoList.push(data)
        } else {
            state.activeAreaInfoList.splice(state.activeAreaInfoList.findIndex(v =>
                v.id == data.id), 1, data)
        }
    },
    [TYPE.SET_MAP_JSON_AND_IMG](state, data) {
        state.mapJsonAndImg = data
    },
    [TYPE.SET_REPORT_FORM_TYPE](state, data) {
        state.reportFormtype = data
    },
    [TYPE.SET_URL_PATH](state, url) {
        state.urlpath = url
    },
    [TYPE.SET_LAYER_CONTROL_SHOW](state, flag) {
        state.layerControlShow = flag
    },
    [TYPE.SET_DRAW_PANEL_TYPE](state, type) {
        state.drawPanelType = type
    }
}

export default mutations