import * as TYPE from './type'
import state from './state'
import axios from '@/util/http'
import { getQueryElementByPoint } from '@/api/dataSheets'
import { getJson } from '@/api/getJson'
import mapHelper from '@/util/mapHelper'

const mutations = {
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
        searchList.map(v => {
            if (v.searchType === 4) {
                state.activeAreaInfoList.map(h => {
                    if (v.macro.data.id === h.id) {
                        v.isActive = true
                    }
                })
            }
        })
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
        let list = state.areaInfoList
        let search = state.searchList
        temp.map(n => {
            list.map((f, index) => {
                if (f.id === n.id) {
                    f.isActive = n.isActive
                    list.splice(index, 1, f)
                }
                if (f.children && f.children.length > 0) {
                    f.children.map((v, index) => {
                        if (v.id === n.id) {
                            v.isActive = n.isActive
                            f.children.splice(index, 1, v)
                        } else if (v.children && v.children.length > 0) {
                            v.children.map((i, index) => {
                                if (i.id === n.id) {
                                    i.isActive = n.isActive
                                    v.children.splice(index, 1, i)
                                }
                            })
                        }
                    })
                }
            })
            search.map(v => {
                if (v.macro) {
                    if (v.macro.dataId === n.id) {
                        v.isActive = n.isActive
                    }
                }
                if (v.element) {
                    if (v.element.dataId === n.id) {
                        v.isActive = n.isActive
                    }
                }
                if (v.macro) {
                    if (v.macro.dataId === n.id) {
                        v.isActive = n.isActive
                    }
                }
            })
        })
    },
    [TYPE.SET_ACTIVE_AREA_LIST](state, { item, isRemoveAll }) {
        if (isRemoveAll) {
            mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
            mapHelper.closePopup()
            mapHelper.closePicPopup()
            state.activeAreaInfoList.map(v => {
                /*清空所有图层*/
                mapHelper.removeLayerByCode(v.id)
                mapHelper.removeLayerById(v.id)
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
            state.searchList.map(v => v.isActive = false)
            state.checkedList = []
            state.transparencyArray = []
        } else {
            let index = state.activeAreaInfoList.findIndex(v => v.id === item.id)
            if (index < 0) {
                state.activeAreaInfoList.push(item)
                state.transparencyArray.push(100)
                state.checkedList.push(item.id)
            } else {
                state.activeAreaInfoList.splice(index, 1)
                state.transparencyArray.splice(index, 1)
                let checkedIndex = state.checkedList.findIndex(v => v == item.id)
                if(checkedIndex >= 0) {
                    state.checkedList.splice(checkedIndex, 1)
                }
            }
        }
        // 更新layerIdList
        let temp = []
        state.activeAreaInfoList.map(v => temp.push(v.id))
        state.layerIdList = temp
        /*图层过滤*/
        mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
    },
    // 设置透明度
    [TYPE.SET_TRANSPARENCY](state, obj) {
        state.transparencyArray.splice(obj.index, 1, obj.value)
    },
    [TYPE.SET_CHECKED_LIST](state, list) {
        // 空数组即为全选，非空删除未选中图层
        if (state.checkedList.length === 0) {
            list.map(v => state.checkedList.push(v))
        } else {
            let lessArray
            if (state.checkedList.length < list.length) {
                lessArray = list.filter(v => !state.checkedList.includes(v))
            } else {
                lessArray = state.checkedList.filter(v => !list.includes(v))
            }
            console.log(lessArray)
            if (lessArray.length === 0) {
                state.checkedList = [].concat(state.layerIdList)
                return
            }
            lessArray.map(v => {
                let index = state.checkedList.findIndex(i => i == v)
                if (index >= 0) {
                    state.checkedList.splice(index, 1)
                } else {
                    state.checkedList.push(v)
                }
            })
        }
    },
    [TYPE.SET_AREA_DETAIL_INFO](state, areaDetailInfo) {
        state.areaDetailInfo = areaDetailInfo
    },
    [TYPE.SET_AREA_INFO](state, areaInfo) {
        state.areaInfo = areaInfo
    },
    [TYPE.SET_SELECTED_AREA_LIST](state, { areainfo, isRemoveAll, type }) {
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
                /* 判断arealist是否为空，空的话，初始化areainfo */
                if (state.areaList.length === 0) {
                    state.areaInfo = {
                        areacode: '500000',
                        areaname: '重庆市',
                        parentid: ''
                    }
                    state.areaList.push(state.areaInfo)
                }
                /*删除行政区划线*/
                mapHelper.removeLayerById(areainfo.areacode.toString())
                mapHelper.closePopup()
            } else {
                if (areainfo.areacode == 500000) {
                    /*删除全部行政区划线*/
                    state.areaList.map(v => {
                        mapHelper.removeLayerById(v.areacode.toString())
                    })
                    state.areaList = [] 
                    state.areaList.push(areainfo)
                } else {
                    state.areaList.map((v, index) => {
                        if(v.areacode == 500000) {
                            state.areaList.splice(index, 1)
                        }
                    })
                    state.areaList.push(areainfo)
                    var i = state.areaList.length
                    while (i--) {
                        if (state.areaList[i].areacode.length !== areainfo.areacode.length) {
                            // 发现父级，清除父级行政区划
                            mapHelper.removeLayerById(state.areaList[i].areacode.toString())
                            // 存在父级区域，删除父级区域
                            state.areaList.splice(i, 1)
                        }
                    }
                }
                /*画行政区划线*/
                /*选中区域所在详细信息列表的位置,图层id为当前区域所在列表的下标*/
                if (state.areaDetailInfo) {
                    // 加载自身
                    mapHelper.addLayerByIdAndGeojson(state.areaDetailInfo.areacode.toString(), state.areaDetailInfo
                        .geojson)
                    if (state.areaDetailInfo.areacode.length > 6) {
                        mapHelper.flyByPointAndZoom(state.areaDetailInfo.geopoint, 12)
                    } else {
                        mapHelper.flyByPointAndZoom(state.areaDetailInfo.geopoint, 10)
                    }
                    if (!type) {
                        mapHelper.setPopupToMap(state.areaDetailInfo.geopoint, state.areaDetailInfo.mapguid, true)
                    }
                }
            }
        } else {
            /*删除全部行政区划线*/
            state.areaList.map(v => {
                mapHelper.removeLayerById(v.areacode.toString())
            })
            mapHelper.closePopup()
            state.areaList = []
            state.areaInfo = {
                areacode: '500000',
                areaname: '重庆市',
                parentid: ''
            }
            state.areaList.push(state.areaInfo)
        }
        // update areaCodeList
        let temp = []
        let array = ["500112", "500109", "500113", "500106", "500105", "500108", "500103", "500107", "500104"]
        let areaTemp = []
        state.areaList.map(v => {
            if (v.areacode == 500002) {
                areaTemp = areaTemp.concat(array)
            } else if (v.areacode != '500000') {
                temp.push(v.areacode)
            }
        })
        state.areaCodeList = temp.concat(areaTemp)
        /*图层过滤*/
        if (isRemoveAll) {
            mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, [])
        } else {
            mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
        }
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
    [TYPE.SET_USER_INFO](state, userinfo) {
        state.userinfo = userinfo
    },
    [TYPE.ADD_PROVERTY_AREA_LAYER](state, data) {
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
    [TYPE.SET_DRAW_PANEL_TYPE](state, type) {
        state.drawPanelType = type
    },
    [TYPE.SET_TOOL_PANE_SHOW](state, obj) {
        state.toolPaneShowIndex = obj
    }
}

export default mutations