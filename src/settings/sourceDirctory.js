const baseUrl = 'http://zhsq.digitalcq.com/D2CJsonV2/'
export default [
  {
    name: '城市建筑',
    data: [
      {
        name: '居住建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/JZJZ.json'
      },
      {
        name: '配套公建',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/PTGJ.json'
      },
      {
        name: '公共管理和公共服务建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/GGGLHGGFWJZ.json'
      },
      {
        name: '商业服务业建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/SYFWYJZ.json'
      },
      {
        name: '工业建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/GYJZ.json'
      },
      {
        name: '物流仓储建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/WLJZ.json'
      },
      {
        name: '道路交通建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/DLJTJZ.json'
      },
      {
        name: '公用设施建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/GYSSJZ.json'
      },
      {
        name: '采矿建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/CKJZ.json'
      },
      {
        name: '绿地与广场建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/LDYGCJZ.json'
      },
      {
        name: '其它建筑',
        url: baseUrl + '/ZT_DBSJ_CXJS_JZ/QTJZ.json'
      }
    ]
  },
  {
    name: '水利设施',
    data: [
      {
        name: '水库',
        url: baseUrl + '/ZT_DBSJ_CXJS_SLSS/SK.json'
      }
    ]
  },
  {
    name: '地质灾害',
    data: [
      {
        name: '地质灾害隐患点',
        url: baseUrl + '/ZT_DBSJ_ZYHJ_DZZH/DZZH_DZZHYHD.json'
      },
      {
        name: '地质灾害易发分区',
        url: baseUrl + '/ZT_DBSJ_ZYHJ_DZZH/DZZH_DZZHYFQ.json'
      }
    ]
  },
  {
    name: '森林公园',
    data: [
      {
        name: '国家级森林公园',
        url: baseUrl + '/ZT_DBSJ_CXJS_KJGZ/SLGY_GJJ.json'
      },
      {
        name: '市级森林公园',
        url: baseUrl + '/ZT_DBSJ_CXJS_KJGZ/SLGY_SJ.json'
      },
      {
        name: '其他森林公园',
        url: baseUrl + '/ZT_DBSJ_CXJS_KJGZ/SLGY_QT.json'
      }
    ]
  },
  {
    name: '危险',
    data: [
      {
        name: '危险源',
        url: baseUrl + '/ZT_DBSJ_ZYHJ_WXY/WXY.json'
      }
    ]
  },
  {
    name: '污染',
    data: [
      {
        name: '污染源',
        url: baseUrl + '/ZT_DBSJ_ZYHJ_WRY/WRY.json'
      }
    ]
  },
  {
    name: '水源保护',
    data: [
      {
        name: '水源保护区',
        url: baseUrl + '/ZT_DBSJ_ZYHJ_SYBH/SYBHQ.json'
      }
    ]
  }
]