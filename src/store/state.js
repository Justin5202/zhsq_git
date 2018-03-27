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
    areaInfoList: [],
    activeAreaInfoList: [],
    reportFormShow: false,
    reportFormData: [],
    areaCodeAndDataId: [],
    searchItemMacroList: [],
    /*搜索结果空间数据列表*/
    layerIdList: [],
    /*图层id列表*/
    areaCodeList: [],
    /*区域code列表*/
    uuidClickedInfo: {},
    /*点击地图uuid的详细信息*/
    measureNum: '',
    areaReportFormShow: false,
    /*searchAroundshow*/
    searchAroundShow: false,
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
    reportFormtype: ''
}

export default state