const state = {
    checkedRows: [],
    activeSource: [],
    searchPaneShow: false,
    tableMenuPaneShow: true,
    areaInfo: {
        areacode: 500000,
        areaname: '重庆市',
        parentid: ''
    },
    areaDetailInfo: '',
    areaList: [{
        areacode: '500000',
        areaname: '重庆市'
    }],
    searchParams: {
        type: 1
    },
    searchList: [],
    areaInfoList: [],
    activeAreaInfoList: [],
    reportFormShow: false,
    reportFormData: [],
    areaCodeAndDataId: [],
    /*搜索结果空间数据列表*/
    layerIdList: [],
    /*图层id列表*/
    areaCodeList: [],
    /*区域code列表*/
    measureNum: '',
    areaReportFormShow: false,
    /*searchAroundshow*/
    searchAroundShow: {
        isShow: false,
        point: '',
        mapguid: ''
    },
    /*专题列表*/
    topicList: {
        type: '',
        list: []
    },
    topicListShow: false,
    // 用户登录信息
    userinfo: {},
    mapJsonAndImg: {},
    //报表类型（1.统计数据,2.文本数据）
    reportFormtype: '',
    urlpath: '',
    checkedList: [],
    transparencyArray: [],
    //绘制面板type,1.量算面板,2.统计面板
    drawPanelType: '',
    toolPaneShowIndex: {
        id: -1,
        isShow: false
    }
}

export default state