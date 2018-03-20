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
  areaCodeAndDataId: [],
  searchItemMacroList: [],
  /*搜索结果空间数据列表*/
  idList: [],
  /*图层id列表*/
  areaCodeList: [],
  /*区域code列表*/
  uuidClickedInfo: {},
  /*点击地图uuid的详细信息*/
  measureNum: '',
  areaReportFormShow: false,
  /*searchAroundshow*/
  searchAroundShow: false
}

export default state
