export default {
  'version': 8,
  'glyphs': 'http://192.168.11.205:80/gyjzwmap/glyphs/font3/{fontstack}/{range}.pbf',
  'sprite': 'http://192.168.11.205:80/gyjzwmap/sprite/label',
  'sources': {
    'ALL': {
      'type': 'vector',
      'tiles': ['http://192.168.11.205:80/tileservice/gyjzw_2016/{z}/{x}/{y}.mvt']
    },
    'dt': {
      'type': 'vector',
      'tiles': ['http://192.168.11.205:80/tileservice/gyjzw_dt/{z}/{x}/{y}.mvt']
    }
  },
  'layers': [
    {
      'id': 'XianJieMian',  // 县界面-贵州省
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XianJi',
      'layout': {},
      'paint': {
        'fill-color': 'rgb(252,249,242)',
        'fill-opacity': 0.3
      }
    },
    {
      'id': 'XianJieXian',  // 县界线-贵州省
      'type': 'line',
      'source': 'dt',
      'source-layer': 'XianJi',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': '#9d9d9d',
        'line-dasharray': [
          4,
          2
        ]
      }
    },

    {
      'id': 'XiangZhenCun',  // 乡镇村
      'type': 'line',
      'source': 'dt',
      'source-layer': 'XiangZhenCun',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': '#9d9d9d',
        'line-dasharray': [
          4,
          1
        ]
      }
    },
   /* {
       "id": "WangGeDanYuan",  //网格单元
       "type": "line",
       "source": "dt",
       "source-layer": "wgdy",
       "layout": {},
       "paint": {
           "line-width": 1,
           "line-color": "#9d9d9d",
           "line-dasharray": [
               4,
               1
           ]
       }
   }, */
    {
      'id': 'pcfw-mian',  // 普查范围
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'PuChaFanWei',
      'layout': {'visibility': 'none'},
      'paint': {
        'fill-color': 'rgba(222,0,0,1)'
      }
    },
    {
      'id': 'XingZhengQuHuaXian',  // //行政区划面-贵阳市
      'type': 'line',
      'source': 'dt',
      'source-layer': 'xzqhm',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': '#9d9d9d',
        'line-dasharray': [
          4,
          2
        ]
      }
    },
    {
      'id': 'zygl-k',  // 贵阳省主要公路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'ZhuYaoGongLu',
      'layout': {},
      'paint': {
        'line-width': 3,
        'line-color': 'rgba(254,144,0,0.4)'
      }
    },
    {
      'id': 'zygl-l',  // 贵阳省主要公路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'ZhuYaoGongLu',
      'layout': {},
      'paint': {
        'line-width': 2,
        'line-color': 'rgba(249,249,0,0.4)'
      }
    },
    {
      'id': 'XingZhenQu_ZuiXin',  // 行政区_最新
      'type': 'line',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': 'rgb(146,146,146)',
        'line-dasharray': [
          4,
          1
        ]
      },
      'minzoom': 9
    },
    {
      'id': 'XingZhenQu_huaxiqu',  // 贵阳市行政区域-花溪区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '花溪区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(246,213,230,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_nanmingqu',  // 贵阳市行政区域-南明区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '南明区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(253,192,200,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_yunyangqu',  // 贵阳市行政区域-云岩区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '云岩区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(222,197,228,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_guanshanhuqu',  // 贵阳市行政区域-观山湖区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '观山湖区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(197,244,194,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_baiyunqu',  // 贵阳市行政区域-白云区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '白云区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(206,247,253,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_wudangqu',  // 贵阳市行政区域-乌当区
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '乌当区'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(205,229,243,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_qingzhenshi',  // 贵阳市行政区域-清镇市
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '清镇市'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(249,225,187,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_xiuwenxian',  // 贵阳市行政区域-修文县
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '修文县'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(205,188,242,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_xifengxian',  // 贵阳市行政区域-息烽县
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '息烽县'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(249,194,235,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'XingZhenQu_kaiyangxian',  // 贵阳市行政区域-开阳县
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'XingZhenQuZuiXin',
      'filter': ['==', 'name', '开阳县'],
      'layout': {},
      'paint': {
        'fill-color': 'rgba(224,253,212,1)',
        'fill-outline-color': 'rgba(146,146,146,1)'
      },
      'maxzoom': 9
    },
    {
      'id': 'pcfw',  // 普查范围
      'type': 'line',
      'source': 'dt',
      'source-layer': 'PuChaFanWei',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': 'rgba(222,0,0,1)',
        'line-dasharray': [
          4,
          2
        ]
      }
    },
    {
      'id': 'heliu', // 河道蓝线
      'type': 'line',
      'source': 'dt',
      'source-layer': 'hl',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
        'line-width': 1,
        'line-color': 'rgb(10,147,252)'
      }
    },
    {
      'id': 'HeLiu_1_5', // 五级河流
      'type': 'line',
      'source': 'dt',
      'source-layer': 'HeLiu1',
      'filter': ['in', 'class', 5],
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': 'rgb(10,147,252)'
      },
      'minzoom': 10
    },
    {
      'id': 'HeLiu_1_4', // 四级河流
      'type': 'line',
      'source': 'dt',
      'source-layer': 'HeLiu1',
      'filter': ['in', 'class', 4],
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': 'rgba(10,147,252,0.7)'
      },
      'minzoom': 9
    },
    {
      'id': 'HeLiu_1_3',  // 三级河流及以上
      'type': 'line',
      'source': 'dt',
      'source-layer': 'HeLiu1',
      'filter': ['in', 'class', 3],
      'layout': {},
      'paint': {
        'line-width': 2,
        'line-color': 'rgba(10,147,252,0.8)'
      }
    },
   /* {
       "id": "HeLiu_1",  //河流
       "type": "symbol",
       "source": "dt",
       "source-layer": "xqd",
       "minzoom":12,
       "layout": {
           "symbol-placement": "line",
           "text-field": "{name}",
           "icon-size": 0.5,
           "text-font": [
               "Arial Unicode MS Regular"
           ],
           "text-anchor": "left",
           "text-offset": [
               0.5,
               0
           ],
           "text-size": 14
       },
       "paint": {}
   }, */
    {
      'id': 'ShuiXiMian',  // 水系面
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'ShuiXiMian',
      'layout': {},
      'paint': {
        'fill-color': 'rgba(10,147,252,0.6)'
      }
    },
    {
      'id': 'ShuiXiXian',  // 水系线
      'type': 'line',
      'source': 'dt',
      'source-layer': 'ShuiXiXian',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-color': 'rgba(10,147,252,0.6)'
      },
      'minzoom': 11
    },
    {
      'id': 'LvDi',   // 绿地
      'minzoom': 9,
      'type': 'fill',
      'source': 'dt',
      'source-layer': 'LvDi',
      'layout': {},
      'paint': {
        'fill-color': 'rgb(38,175,34)',
        'fill-opacity': 0.5
      }
    },
    {
      'id': 'zytl_x_line',  // 主要铁路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'ZhuYaoTieLu',
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-gap-width': 2,
        'line-color': 'rgba(155,155,155,0.7)'
      }
    },
    {
      'id': 'zytl_x_dash',  // 主要铁路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'ZhuYaoTieLu',
      'layout': {},
      'paint': {
        'line-width': 2,
        'line-dasharray': [
          4,
          3
        ],
        'line-color': 'gray'
      }
    },
    {
      'id': 'dljt-k',  // 贵阳市道路交通
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuJiaoTong',
      'layout': {},
      'paint': {
        'line-width': 2,
        'line-color': 'rgba(254,144,0,0.4)'
      },
      'minzoom': 9
    },
    {
      'id': 'dljt-l',  // 贵阳市道路交通
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuJiaoTong',
      'layout': {},
      'paint': {
        'line-width': 2,
        'line-color': 'rgba(249,249,0,0.4)'
      },
      'minzoom': 9
    },
    {
      'id': 'dlzxx-yiban',  // 道路中心线-一般道路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 15,
      'filter': ['any', ['==', 'hierarchy', '一般道路'], ['==', 'hierarchy', '一般街道']],
      'layout': {},
      'paint': {
        'line-color': 'rgba(189,189,197,0.4)',
        'line-width': 1
      }
    },
    {
      'id': 'dlzxx-zhuyao',  // 道路中心线-主要街道道路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 12,
      'filter': ['any', ['==', 'hierarchy', '主要街道'], ['==', 'hierarchy', '主要道路']],
      'layout': {},
      'paint': {
        'line-color': 'rgba(189,189,197,0.4)',
        'line-width': 2
      }
    },
    {
      'id': 'dlzxx-xianxiangdao',  // 道路中心线-县乡道
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 15,
      'filter': ['any', ['==', 'hierarchy', '县乡道']],
      'layout': {},
      'paint': {
        'line-color': 'rgba(189,189,197,0.4)',
        'line-width': 1
      }
    },
    {
      'id': 'dlzxx-shengdao',  // 道路中心线-省道
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 14,
      'filter': ['any', ['==', 'hierarchy', '省道']],
      'layout': {},
      'paint': {
        'line-color': 'rgba(189,189,197,0.4)',
        'line-width': 1.5
      }
    },
    {
      'id': 'dlzxx-guodao',  // 道路中心线-国道
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 13,
      'filter': ['any', ['==', 'hierarchy', '国道']],
      'layout': {},
      'paint': {
        'line-color': 'rgb(189,189,197)',
        'line-width': 2
      }
    },

    {
      'id': 'dlzxx-tielu-k',  // 道路中心线-铁路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 14,
      'filter': ['any', ['==', 'hierarchy', '铁路']],
      'layout': {},
      'paint': {
        'line-width': 1,
        'line-gap-width': 2,
        'line-color': 'gray'
      }
    },
    {
      'id': 'dlzxx-tielu-l',  // 道路中心线-铁路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 14,
      'filter': ['any', ['==', 'hierarchy', '铁路']],
      'layout': {},
      'paint': {
        'line-width': 6,
        'line-dasharray': [
          4,
          3
        ],
        'line-color': 'gray'
      }
    },
    {
      'id': 'dlzxx-suidap-k',  // 道路中心线-隧道
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 15,
      'filter': ['any', ['==', 'hierarchy', '隧道']],
      'layout': {},
      'paint': {
           // "line-color": "rgb(254,144,0)",
        'line-color': 'gray',
        'line-width': 2,
        'line-dasharray': [
          4,
          1
        ]
      }
    },
    {
      'id': 'dlzxx-gaojiaqiao',  // 道路中心线-高架桥
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 13,
      'filter': ['any', ['==', 'hierarchy', '高架桥']],
      'layout': {},
      'paint': {
           // "line-color": "rgb(254,249,0)",
        'line-color': 'gray',
        'line-width': 3
      }
    },
    {
      'id': 'dlzxx-gaosugonglu-l',  // 道路中心线-高速公路
      'type': 'line',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 9,
      'filter': ['any', ['==', 'hierarchy', '高速公路']],
      'layout': {},
      'paint': {
        'line-color': 'rgba(249,249,0,0.4)',
        'line-width': 2
      }
    },

   /* {
       "id": "tl_x_line",  //铁路
       "type": "line",
       "source": "dt",
       "source-layer": "tl",
       "layout": {
          // "visibility": "none"
       },
       "paint": {
           "line-width": 1,
           "line-gap-width": 2,
           "line-color": "gray"
       }
   },
   {
       "id": "tl_x_dash",  //铁路
       "type": "line",
       "source": "dt",
       "source-layer": "tl",
       "layout": {
          // "visibility": "none"
       },
       "paint": {
           "line-width": 6,
           "line-dasharray": [
               4,
               3
           ],
           "line-color": "gray"
           //"line-color" : "rgb(255,0,0)"
       }
   },
   {
       "id": "grid", //grid
       "type": "line",
       "source": "ALL",
       "source-layer": "GRID",
       "minzoom" : 14,
       "layout": {
           "visibility":"visible"
       },
       "paint": {
           'line-color': '#9d9d9d',
           'line-width': 1
       }
   }, */
    {
      'id': 'resnt', // 建筑物
      'type': 'fill',
      'source': 'ALL',
      'source-layer': 'RESNT',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
           // "fill-color": "rgb(252,249,244)",
        'fill-color': '#F7C8B4',
           // "fill-outline-color": "rgba(204,204,204,0.3)"
        'fill-outline-color': 'rgba(250,100,180,0.1)'
      },
      'minzoom': 14
    },
    {
      'id': 'yswzjz', // 疑似违法建筑物
      'type': 'fill',
      'source': 'ALL',
      'source-layer': 'YSWZJZ',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
        'fill-color': {
          property: 'zt',
          type: 'categorical',
          stops: [[1, '#ff9800'], [2, 'green'], [3, 'red'], [4, '#13e9d8']]
        }
      },
      'minzoom': 14
    },
    {
      'id': 'wzjz', // 违法建筑物
      'type': 'fill',
      'source': 'ALL',
      'source-layer': 'WZJZ',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
        'fill-color': 'rgb(255,0,0)'
      },
      'minzoom': 14
    },
    {
      'id': 'dlzxx_symbol',  // 道路中间线标注
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'DaoLuZhongXinXian',
      'minzoom': 14,
      'layout': {
        'symbol-placement': 'line',
        'text-field': '{name}',
        'text-font': [
          'Arial Unicode MS Regular'
        ]
      },
      'paint': {}
    },
    {
      'id': 'hl_1_symbol_11',    // 河流标注
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'HeLiu1',
      'minzoom': 11,
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 10,
        'text-letter-spacing': 1,
        'text-field': '{name}',
        'text-font': [
          'Arial Unicode MS Regular'
        ]
      },
      'paint': {}
    },
    {
      'id': 'hl_1_symbol_12',    // 河流标注
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'HeLiu1',
      'minzoom': 11,
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 10,
        'text-letter-spacing': 4,
        'text-field': '{name}',
        'text-font': [
          'Arial Unicode MS Regular'
        ]
      },
      'paint': {}
    },
    {
      'id': 'zytl_symbol',    // 铁路标注
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'ZhuYaoTieLu',
           // "minzoom":13,
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 500,
        'text-field': '{name}',
        'text-font': [
          'Arial Unicode MS Regular'
        ]
      },
      'paint': {}
    },
    {
      'id': 'xqd_xx',  // 兴趣点 学校
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'XingQuDian',
      'filter': ['any', ['==', 'class', '中学'], ['==', 'class', '小学']],
      'minzoom': 15,
      'layout': {
        'symbol-placement': 'point',
        'icon-image': '中小学',
        'text-field': '{textstring}',
        'icon-size': 0.5,
        'text-font': [
          'Arial Unicode MS Regular'
        ],
        'text-anchor': 'left',
        'text-offset': [
          0.5,
          0
        ],
        'text-size': 14
      },
      'paint': {}
    },
    {
      'id': 'xjmc',   // 县界名称
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'XianJi',
      'minzoom': 7,
      'layout': {
        'symbol-placement': 'point',
        'icon-image': '政府部门',
        'text-field': '{last_name9}',
        'icon-size': 0.4,
        'text-font': [
          'Arial Unicode MS Regular'
        ],
        'text-anchor': 'left',
        'text-offset': [
          1,
          0
        ],
        'text-size': 14
      },
      'paint': {}
    },
    /* {
       "id": "gysxzqmc",   //贵阳市行政区名称
       "type": "symbol",
       "source": "dt",
       "source-layer": "XingZhenQuZuiXin",
       "layout": {
           "symbol-placement": "point",
           "text-field": "{name}",
           "icon-image": "县道标注底板",
           "icon-text-fit":'both',
           "icon-text-fit-padding":[4,8,4,8],
           "icon-size":1,
           "symbol-avoid-edges":true,
           "text-font": [
               "Arial Unicode MS Regular"
           ],
           "text-offset": [
               0,
               0
           ],
           "text-size": 14
       },
       "paint": {"text-color":'#000000',"icon-color":'red',"icon-opacity":0.8}
    }, */
    {
      'id': 'xqd_xz',  // 兴趣点-政府单位
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'XingQuDian',
      'minzoom': 9.5,
      'filter': ['any', ['==', 'class', '政府机关'], ['==', 'class', '乡镇']],
      'layout': {
        'symbol-placement': 'point',
        'icon-image': '政府部门',
        'text-field': '{textstring}',
        'icon-size': 0.5,
        'text-font': [
          'Arial Unicode MS Regular'
        ],
        'text-anchor': 'left',
        'text-offset': [
          0.5,
          0
        ],
        'text-size': 14
      },
      'paint': {}
    },
    {
      'id': 'xqd_other',  // 兴趣点-其他
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'XingQuDian',
      'filter': ['all', ['!=', 'class', '中学'], ['!=', 'class', '小学'], ['!=', 'class', '政府机关'], ['!=', 'class', '乡镇']],
      'minzoom': 16,
      'layout': {
        'symbol-placement': 'point',
        'icon-image': '中心',
        'text-field': '{textstring}',
        'icon-size': 0.1,
        'text-font': [
          'Arial Unicode MS Regular'
        ],
        'text-anchor': 'left',
        'text-offset': [
          0.5,
          0
        ],
        'text-size': 12
      },
      'paint': {}
    },

    {
      'id': 'DiMingDian',   // 地名点
      'type': 'symbol',
      'source': 'dt',
      'source-layer': 'DiMingDian',
      'minzoom': 15,
      'layout': {
        'symbol-placement': 'point',
        'icon-image': '一般POI',
        'text-field': '{name}',
        'icon-size': 0.5,
        'text-font': [
          'Arial Unicode MS Regular'
        ],
        'text-anchor': 'left',
        'text-offset': [
          0.5,
          0
        ],
        'text-size': 12
      },
      'paint': {}
    },
    {
      'id': 'resnt_3d',   // 建筑物3d
      'type': 'fill-extrusion',
      'source': 'ALL',
      'source-layer': 'RESNT',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
           // "fill-color": "#fed976",
        'fill-extrusion-color': '#F7C8B4',
           // "fill-color": "rgb(252,249,244)",
        'fill-extrusion-opacity': 0.8,
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'jzgd'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_jzgd'
        }
      },
      'minzoom': 15
    },
    {
      'id': 'yswzjz_3d',   // 违法建筑物3d
      'type': 'fill-extrusion',
      'source': 'ALL',
      'source-layer': 'YSWZJZ',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
       // "fill-color": "#F7C8B4",
        'fill-extrusion-color': {
          property: 'zt',
          type: 'categorical',
          stops: [[1, '#ff9800'], [2, 'green'], [3, 'red'], [4, '#13e9d8']]
        },
       // "fill-color": "rgb(252,249,244)",
        'fill-extrusion-opacity': 0.8,
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'jzgd'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_jzgd'
        }
      },
      'minzoom': 15
    }
  ]
}
