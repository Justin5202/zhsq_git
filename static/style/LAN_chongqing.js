/*
 * @Description: 内网重庆底图
 * @Author: xia
 * @Date: 2017-11-30 09:42:46
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-06 20:35:04
 */

export default {
  'version': 8,
  'glyphs': 'http://192.168.11.149:8088/glyphs/font3/{fontstack}/{range}.pbf',
  'sprite': 'http://192.168.11.149:8088/sprite/label',
  'sources': {
    'ALL': {
      'type': 'vector',
      'tiles': [
        'http://192.168.11.149:8088/new_gs_data/{z}/{x}/{y}.mvt'
      ]
    },
    'sc': {
      'type': 'vector',
      'tiles': ['http://192.168.11.149:8088/sc_data/{z}/{x}/{y}.mvt']
    },
    'bd': {
      'type': 'vector',
      'tiles': ['http://192.168.11.149:8088/build_data/{z}/{x}/{y}.mvt']
    }
  },
  'layers': [{
    'id': 'dm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'dm',
    'layout': {},
    'paint': {
      'fill-color': '#FCF9F2'
    }
  }, {
    'id': 'jcbx',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'jcbx',
    'layout': {},
    'paint': {
      'line-color': 'gray',
      'line-width': 1
    }
  }, {
    'id': 'jcm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'jcm',
    'layout': {},
    'paint': {
      'fill-color': '#dcdcdc'
    }
  }, {
    'id': 'gsgl_line_gap',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gsgl',
    'layout': {},
    'paint': {
      'line-color': '#ffb35b',
      'line-gap-width': 3,
      'line-width': 1
    }
  }, {
    'id': 'gsgl_line',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gsgl',
    'layout': {},
    'paint': {
      'line-color': '#ffff00',
      'line-width': 3
    }
  }, {
    'id': 'gsgl_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'gsgl',
    'layout': {
      'symbol-placement': 'line',
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ]
    },
    'paint': {}
  }, {
    'id': 'glzh_line_gd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gdzh',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '国道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 2,
      'line-color': '#ff6347'
    }
  }, {
    'id': 'glzh_gap_gd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gdzh',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '国道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#ffbd9d'
    }
  }, {
    'id': 'glzh_line_sd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gdzh',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '省道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#ffaf60'
    }
  }, {
    'id': 'glzh_line_other',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gdzh',
    'filter': [
      'all', [
        '!=',
        'xzdj',
        '省道'
      ],
      [
        '!=',
        'xzdj',
        '国道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': '#ff00ff'
    }
  }, {
    'id': 'jwfjcq',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'jwfjcq',
    'layout': {},
    'paint': {
      'fill-color': '#F7EED6'
    }
  }, {
    'id': 'jwjcq',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'jwjcq',
    'layout': {},
    'paint': {
      'fill-color': '#F7EED6'
    }
  }, {
    'id': 'zjfjcq',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'zjfjcq',
    'layout': {},
    'paint': {
      'fill-color': '#F7EED6'
    }
  }, {
    'id': 'jq',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'jq',
    'layout': {},
    'paint': {
      'fill-color': '#f8efe2'
    }
  }, {
    'id': 'sm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'sm',
    'layout': {},
    'paint': {
      'fill-color': '#CFE784'
    }
  }, {
    'id': 'csldm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'csldm',
    'layout': {},
    'paint': {
      'fill-color': '#CFE784'
    }
  }, {
    'id': 'ld',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'ld',
    'layout': {},
    'paint': {
      'fill-color': '#CFE784'
    }
  }, {
    'id': 'zjjcq',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'zjjcq',
    'layout': {},
    'paint': {
      'fill-color': '#fcf9f4'
    }
  }, {
    'id': 'zjjcqline',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zjjcq',
    'layout': {},
    'paint': {
      'line-width': 0.8,
      'line-color': '#c8d4cb',
      'line-opacity': 0.8
    }
  }, {
    'id': 'hl_dbx',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'hl_dbx',
    'layout': {},
    'paint': {
      'fill-color': '#b5d6ea'
    }
  }, {
    'id': 'hl_x',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'hl_x',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#b5d6ea'
    }
  }, {
    'id': 'hl_dbx_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'hl_x',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 1000,
      'text-field': '{hlmc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-size': 14,
      'text-pitch-alignment': 'map'
    },
    'paint': {}
  }, {
    'id': 'sk_m',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'sk_m',
    'layout': {},
    'paint': {
      'fill-color': '#b5d6ea'
    }
  }, {
    'id': 'gsdlm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'gsdlm',
    'layout': {},
    'paint': {
      'fill-color': '#f9f900'
    }
  }, {
    'id': 'gsdlbx',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gsdlbx',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#ff8000'
    }
  }, {
    'id': 'tl_line',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'tl',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 3,
      'line-color': 'gray'
    }
  }, {
    'id': 'tl_dash',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'tl',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-dasharray': [
        4,
        3
      ],
      'line-color': 'gray'
    }
  }, {
    'id': 'tl_x_line',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'tl_x',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 2,
      'line-color': 'gray'
    }
  }, {
    'id': 'tl_x_dash',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'tl_x',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-dasharray': [
        4,
        3
      ],
      'line-color': 'gray'
    }
  }, {
    'id': 'tl_x_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'tl_x',
    'layout': {
      'symbol-placement': 'line',
      'text-field': '{mc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'symbol-spacing': 10
    },
    'paint': {
      'text-color': 'blue'
    }
  }, {
    'id': 'zcqcsdl_cs_a00_line',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_cs',
    'filter': [
      'all', [
        '==',
        'xzdj',
        'A00'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#ffff6f'
    }
  }, {
    'id': 'zcqcsdl_cs_a00_gap',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_cs',
    'filter': [
      'all', [
        '==',
        'xzdj',
        'A00'
      ]
    ],
    'layout': {},
    'paint': {
      'line-gap-width': 2,
      'line-color': '#F7E8D5'
    }
  }, {
    'id': 'zcqcsdl_cs_a10_gap',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_cs',
    'filter': [
      'all', [
        '==',
        'xzdj',
        'A10'
      ]
    ],
    'layout': {},
    'paint': {
      'line-gap-width': 1,
      'line-color': '#F7E8D5'
    }
  }, {
    'id': 'zcqcsdl_cs_gs_line',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_cs',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '高速公路'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 4,
      'line-color': '#f9f900'
    }
  }, {
    'id': 'zcqcsdl_cs_gs_gap',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_cs',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '高速公路'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 3,
      'line-color': '#F7E8D5'
    }
  }, {
    'id': 'zcqql',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqql',
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#F7E8D5'
    }
  }, {
    'id': 'qxcsdl',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'qxcsdl',
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#F7E8D5'
    }
  }, {
    'id': 'qxql',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'qxql',
    'layout': {},
    'paint': {
      'line-width': 4,
      'line-color': 'gray'
    }
  }, {
    'id': 'sdbx',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'sdbx',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': 'gray',
      'line-dasharray': [
        1,
        4
      ]
    }
  }, {
    'id': 'zcqdlm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'zcqdlm',
    'layout': {},
    'paint': {
      'fill-color': '#ffffff'
    }
  }, {
    'id': 'zcqdlbx_s',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqdlbx_s',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': 'gray'
    }
  }, {
    'id': 'zcqdlbx_x',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'zcqdlbx_x',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': 'gray'
    }
  }, {
    'id': 'zcqcsdl_zj',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zcqcsdl_zj',
    'layout': {
      'symbol-placement': 'line',
      'text-field': '{lxjc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-letter-spacing': 2
    },
    'paint': {}
  }, {
    'id': 'gl_zb_line_zc_gd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '国道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 2,
      'line-color': '#fcf5df'
    }
  }, {
    'id': 'gl_zb_gap_zc_gd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '国道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#fcf5df'
    }
  }, {
    'id': 'gl_zb_line_zc_sd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '省道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 2,
      'line-color': '#fcf5df'
    }
  }, {
    'id': 'gl_zb_gap_zc_sd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '省道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#ffff00'
    }
  }, {
    'id': 'gl_zb_line_zc_xnd',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '县道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 0,
      'line-color': '#696969'
    }
  }, {
    'id': 'gl_zb_line_zc_xid',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '==',
        'xzdj',
        '乡道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-gap-width': 0,
      'line-color': '#c0c0c0'
    }
  }, {
    'id': 'gl_zb_line_other_zc',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'gl',
    'filter': [
      'all', [
        '!=',
        'xzdj',
        '省道'
      ],
      [
        '!=',
        'xzdj',
        '国道'
      ],
      [
        '!=',
        'xzdj',
        '乡道'
      ],
      [
        '!=',
        'xzdj',
        '县道'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': '#baffd3'
    }
  }, {
    'id': 'qxdlm',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'qxdlm',
    'layout': {},
    'paint': {
      'fill-color': '#ffffff'
    }
  }, {
    'id': 'qxdlbx',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'qxdlbx',
    'layout': {},
    'paint': {
      'line-width': 1,
      'line-color': 'gray'
    }
  }, {
    'id': 'dtz_m',
    'type': 'fill',
    'source': 'ALL',
    'source-layer': 'dtz_m',
    'layout': {},
    'paint': {
      'fill-color': '#bebebe'
    }
  }, {
    'id': 'dt_x_1',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'dt_x',
    'filter': [
      'all', [
        '==',
        'xlmc',
        '轨道交通一号线'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#ff0000'
    }
  }, {
    'id': 'dt_x_2',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'dt_x',
    'filter': [
      'all', [
        '==',
        'xlmc',
        '轨道交通二号线'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#00bb00'
    }
  }, {
    'id': 'dt_x_3',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'dt_x',
    'filter': [
      'all', [
        '==',
        'xlmc',
        '轨道交通三号线'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#d1e9e9'
    }
  }, {
    'id': 'dt_x_6',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'dt_x',
    'filter': [
      'all', [
        '==',
        'xlmc',
        '轨道交通六号线'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#ff7575'
    }
  }, {
    'id': 'dt_x_6_gb',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'dt_x',
    'filter': [
      'all', [
        '==',
        'xlmc',
        '轨道交通六号线支线(国博线)'
      ]
    ],
    'layout': {},
    'paint': {
      'line-width': 3,
      'line-color': '#ff7575'
    }
  }, {
    'id': 'sjzh',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'sjzh',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#9d9d9d',
      'line-dasharray': [
        4,
        2
      ]
    }
  }, {
    'id': 'cqsj',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'cqsj',
    'layout': {},
    'paint': {
      'line-width': 2,
      'line-color': '#9d9d9d',
      'line-dasharray': [
        4,
        2
      ]
    }
  }, {
    'id': 'qxjchina2000',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'qxjchina2000',
    'layout': {},
    'paint': {
      'line-width': 1.5,
      'line-color': '#adadad',
      'line-dasharray': [
        4,
        2
      ]
    }
  }, {
    'id': 'qxjzh',
    'type': 'line',
    'source': 'ALL',
    'source-layer': 'qxjzh',
    'layout': {},
    'paint': {
      'line-width': 1.5,
      'line-color': '#adadad',
      'line-dasharray': [
        4,
        2
      ]
    }
  }, {
    'id': 'zfjg_zc_zq',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfjg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '070202'
      ],
      [
        '==',
        'dmfl',
        '070102'
      ],
      [
        '==',
        'dmfl',
        '070100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-size': 0.5,
      'icon-image': '政府部门_影像',
      'text-field': '{jc}',
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
  }, {
    'id': 'dtcrk_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dtcrk',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{crkmc}',
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
  }, {
    'id': 'gdjtzd_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'gdjtzd',
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '地铁站',
      'icon-size': 0.5,
      'text-field': '{mc}',
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
  }, {
    'id': 'ncjmd_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'ncjmd',
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '小区',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'shan_symbol',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'shan_symbol',
    'layout': {},
    'paint': {
      'circle-radius': 8,
      'circle-color': '#f7f000'
    }
  }, {
    'id': 'shan_no_symbol',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'shan_no_symbol',
    'layout': {},
    'paint': {
      'circle-radius': 8,
      'circle-color': '#f7f000'
    }
  }, {
    'id': 'shan_symbol_s',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'shan_symbol',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'shan_no_symbol_s',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'shan_no_symbol',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{mc}',
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
  }, {
    'id': 'zfjg_zc_js',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfjg_zc',
    'filter': [
      'all', [
        '!=',
        'dmfl',
        '070202'
      ],
      [
        '!=',
        'dmfl',
        '070102'
      ],
      [
        '!=',
        'dmfl',
        '070100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-size': 0.5,
      'icon-image': '政府驻地_灰',
      'text-field': '{jc}',
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'zfbm_zc',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'zfbm_zc',
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'red'
    }
  }, {
    'id': 'zfbm_zc_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfbm_zc',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_zc_mt',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170101'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '港务码头',
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_zc_hcz',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170301'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_zc_jcz',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170201'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '货运站',
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_zc_jc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170401'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '机场',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_zc_fjq',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060300'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '风景名胜',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_zc_gy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060201'
      ],
      [
        '==',
        'dmfl',
        '060202'
      ],
      [
        '==',
        'dmfl',
        '060203'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '公园',
      'text-field': '{jc}',
      'icon-size': 0.5,
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-size': 14,
      'text-max-width': 6
    },
    'paint': {}
  }, {
    'id': 'lygg_zc_lsly',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '烈士陵园',
      'icon-size': 0.5,
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-size': 14,
      'text-max-width': 6
    },
    'paint': {}
  }, {
    'id': 'lygg_zc_jtsm',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030303'
      ],
      [
        '==',
        'dmfl',
        '030304'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '寺庙',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_zc_gc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030302'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '广场',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'jzq_zc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jzq_zc',
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '小区',
      'text-field': '{jc}',
      'icon-size': 0.5,
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-size': 14,
      'text-offset': [
        0.5,
        0
      ]
    },
    'paint': {}
  }, {
    'id': 'dskyjy_zc_ds',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'dskyjy_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030301'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 6,
      'circle-color': '#0080ff'
    }
  }, {
    'id': 'dskyjy_zc_ds_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030301'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'dskyjy_zc_zjjy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '080101'
      ],
      [
        '==',
        'dmfl',
        '080102'
      ],
      [
        '==',
        'dmfl',
        '080103'
      ],
      [
        '==',
        'dmfl',
        '080109'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '中小学',
      'text-field': '{jc}',
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
  }, {
    'id': 'dskyjy_zc_gjjy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '080104'
      ],
      [
        '==',
        'dmfl',
        '080105'
      ],
      [
        '==',
        'dmfl',
        '080106'
      ],
      [
        '==',
        'dmfl',
        '080107'
      ],
      [
        '==',
        'dmfl',
        '080108'
      ],
      [
        '==',
        'dmfl',
        '080200'
      ],
      [
        '==',
        'dmfl',
        '080300'
      ],
      [
        '==',
        'dmfl',
        '130201'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '大专院校',
      'text-field': '{jc}',
      'icon-size': 0.5,
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-size': 14,
      'text-max-width': 7
    },
    'paint': {}
  }, {
    'id': 'yywhss_zc_gef',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '110303'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '高尔夫',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_zc_tyc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '110100'
      ],
      [
        '==',
        'dmfl',
        '110200'
      ],
      [
        '==',
        'dmfl',
        '110313'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '体育场馆中心',
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_zc_ylc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100406'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '游乐园',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_zc_jy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100309'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '剧院',
      'text-offset': [
        0.5,
        0
      ],
      'icon-size': 0.5,
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'yywhss_zc_bwg',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100302'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 6,
      'circle-color': '#e800e8'
    }
  }, {
    'id': 'yywhss_zc_bwg_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100302'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_zc_whss',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100101'
      ],
      [
        '==',
        'dmfl',
        '100102'
      ],
      [
        '==',
        'dmfl',
        '100104'
      ],
      [
        '==',
        'dmfl',
        '100201'
      ],
      [
        '==',
        'dmfl',
        '100202'
      ],
      [
        '==',
        'dmfl',
        '100301'
      ],
      [
        '==',
        'dmfl',
        '100303'
      ],
      [
        '==',
        'dmfl',
        '100304'
      ],
      [
        '==',
        'dmfl',
        '100310'
      ],
      [
        '==',
        'dmfl',
        '100319'
      ],
      [
        '==',
        'dmfl',
        '100403'
      ],
      [
        '==',
        'dmfl',
        '100404'
      ],
      [
        '==',
        'dmfl',
        '100419'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_zc_yy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '090103'
      ],
      [
        '==',
        'dmfl',
        '090110'
      ],
      [
        '==',
        'dmfl',
        '090111'
      ],
      [
        '==',
        'dmfl',
        '090400'
      ],
      [
        '==',
        'dmfl',
        '090600'
      ],
      [
        '==',
        'dmfl',
        '090700'
      ],
      [
        '==',
        'dmfl',
        '090800'
      ],
      [
        '==',
        'dmfl',
        '091000'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': 'ҽԺ2',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_zc_jd',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '140101'
      ],
      [
        '==',
        'dmfl',
        '140102'
      ],
      [
        '==',
        'dmfl',
        '140103'
      ],
      [
        '==',
        'dmfl',
        '140109'
      ],
      [
        '==',
        'dmfl',
        '140200'
      ],
      [
        '==',
        'dmfl',
        '140300'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '酒店',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_zc_cs',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '150300'
      ],
      [
        '==',
        'dmfl',
        '150400'
      ],
      [
        '==',
        'dmfl',
        '150503'
      ],
      [
        '==',
        'dmfl',
        '150504'
      ],
      [
        '==',
        'dmfl',
        '150505'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '超市',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_zc_gw',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '150100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_zc_shfl',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160101'
      ],
      [
        '==',
        'dmfl',
        '160102'
      ],
      [
        '==',
        'dmfl',
        '160103'
      ],
      [
        '==',
        'dmfl',
        '160104'
      ],
      [
        '==',
        'dmfl',
        '160105'
      ],
      [
        '==',
        'dmfl',
        '160106'
      ],
      [
        '==',
        'dmfl',
        '160107'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'gray'
    }
  }, {
    'id': 'wtgf_zc_shfl_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160101'
      ],
      [
        '==',
        'dmfl',
        '160102'
      ],
      [
        '==',
        'dmfl',
        '160103'
      ],
      [
        '==',
        'dmfl',
        '160104'
      ],
      [
        '==',
        'dmfl',
        '160105'
      ],
      [
        '==',
        'dmfl',
        '160106'
      ],
      [
        '==',
        'dmfl',
        '160107'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_zc_qtfw',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160301'
      ],
      [
        '==',
        'dmfl',
        '160401'
      ],
      [
        '==',
        'dmfl',
        '160403'
      ],
      [
        '==',
        'dmfl',
        '160404'
      ],
      [
        '==',
        'dmfl',
        '160405'
      ],
      [
        '==',
        'dmfl',
        '160406'
      ],
      [
        '==',
        'dmfl',
        '160407'
      ],
      [
        '==',
        'dmfl',
        '160502'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160506'
      ],
      [
        '==',
        'dmfl',
        '160508'
      ],
      [
        '==',
        'dmfl',
        '160509'
      ],
      [
        '==',
        'dmfl',
        '160510'
      ],
      [
        '==',
        'dmfl',
        '160519'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'blue'
    }
  }, {
    'id': 'wtgf_zc_qtfw_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160301'
      ],
      [
        '==',
        'dmfl',
        '160401'
      ],
      [
        '==',
        'dmfl',
        '160403'
      ],
      [
        '==',
        'dmfl',
        '160404'
      ],
      [
        '==',
        'dmfl',
        '160405'
      ],
      [
        '==',
        'dmfl',
        '160406'
      ],
      [
        '==',
        'dmfl',
        '160407'
      ],
      [
        '==',
        'dmfl',
        '160502'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160506'
      ],
      [
        '==',
        'dmfl',
        '160508'
      ],
      [
        '==',
        'dmfl',
        '160509'
      ],
      [
        '==',
        'dmfl',
        '160510'
      ],
      [
        '==',
        'dmfl',
        '160519'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'qsydw_zc_qc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'qsydw_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160302'
      ],
      [
        '==',
        'dmfl',
        '160304'
      ],
      [
        '==',
        'dmfl',
        '160305'
      ],
      [
        '==',
        'dmfl',
        '160306'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '汽修',
      'text-field': '{jc}',
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
  }, {
    'id': 'qsydw_zc_qssdw',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'qsydw_zc',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160510'
      ],
      [
        '==',
        'dmfl',
        '180101'
      ],
      [
        '==',
        'dmfl',
        '180102'
      ],
      [
        '==',
        'dmfl',
        '180200'
      ],
      [
        '==',
        'dmfl',
        '180300'
      ],
      [
        '==',
        'dmfl',
        '200000'
      ],
      [
        '==',
        'dmfl',
        '080201'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'red'
    }
  }, {
    'id': 'qsydw_zc_qssdw_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'qsydw_zc',
    'filter': [
      'all', [
        '!=',
        'dmfl',
        '160302'
      ],
      [
        '!=',
        'dmfl',
        '160304'
      ],
      [
        '!=',
        'dmfl',
        '160305'
      ],
      [
        '!=',
        'dmfl',
        '160306'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'zfjg_qx_zq',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfjg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '070202'
      ],
      [
        '==',
        'dmfl',
        '070102'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '政府驻地',
      'icon-size': 0.5,
      'text-field': '{jc}',
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'zfjg_qx_js',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfjg_qx',
    'filter': [
      'all', [
        '!=',
        'dmfl',
        '070202'
      ],
      [
        '!=',
        'dmfl',
        '070102'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '政府驻地_灰',
      'icon-size': 0.5,
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'zfbm_qx',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'zfbm_qx',
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'red'
    }
  }, {
    'id': 'zfbm_qx_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'zfbm_qx',
    'layout': {
      'symbol-placement': 'point',
      'text-anchor': 'left',
      'text-offset': [
        0.5,
        0
      ],
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'jtys_qx_mt',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170101'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '港务码头',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_qx_hcz',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170301'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_qx_jcz',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170201'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '货运站',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'jtys_qx_jc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jtys_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '170401'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '机场',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_qx_fjq',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060300'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '风景名胜',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_qx_gy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060201'
      ],
      [
        '==',
        'dmfl',
        '060202'
      ],
      [
        '==',
        'dmfl',
        '060203'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '公园',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_qx_lsly',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '060100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '烈士陵园',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_qx_jtsm',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030303'
      ],
      [
        '==',
        'dmfl',
        '030304'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '寺庙',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'lygg_qx_gc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'lygg_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030302'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '广场',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'jzq_qx',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'jzq_qx',
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '小区',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'dskyjy_qx_ds',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'dskyjy_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030301'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 6,
      'circle-color': '#0080ff'
    }
  }, {
    'id': 'dskyjy_qx_ds_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '030301'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'dskyjy_qx_zjjy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '080101'
      ],
      [
        '==',
        'dmfl',
        '080102'
      ],
      [
        '==',
        'dmfl',
        '080103'
      ],
      [
        '==',
        'dmfl',
        '080109'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '中小学',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'dskyjy_qx_gjjy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'dskyjy_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '080104'
      ],
      [
        '==',
        'dmfl',
        '080105'
      ],
      [
        '==',
        'dmfl',
        '080106'
      ],
      [
        '==',
        'dmfl',
        '080107'
      ],
      [
        '==',
        'dmfl',
        '080108'
      ],
      [
        '==',
        'dmfl',
        '080200'
      ],
      [
        '==',
        'dmfl',
        '080300'
      ],
      [
        '==',
        'dmfl',
        '130201'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '大专院校',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_qx_gef',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '110303'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '高尔夫',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_qx_tyc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '110100'
      ],
      [
        '==',
        'dmfl',
        '110200'
      ],
      [
        '==',
        'dmfl',
        '110313'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '体育场馆中心',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_qx_ylc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100406'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '游乐园',
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_qx_jy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100309'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '剧院',
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'yywhss_qx_bwg',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100302'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 6,
      'circle-color': '#e800e8'
    }
  }, {
    'id': 'yywhss_qx_bwg_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100302'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'yywhss_qx_whss',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '100101'
      ],
      [
        '==',
        'dmfl',
        '100102'
      ],
      [
        '==',
        'dmfl',
        '100104'
      ],
      [
        '==',
        'dmfl',
        '100201'
      ],
      [
        '==',
        'dmfl',
        '100202'
      ],
      [
        '==',
        'dmfl',
        '100301'
      ],
      [
        '==',
        'dmfl',
        '100303'
      ],
      [
        '==',
        'dmfl',
        '100304'
      ],
      [
        '==',
        'dmfl',
        '100310'
      ],
      [
        '==',
        'dmfl',
        '100319'
      ],
      [
        '==',
        'dmfl',
        '100403'
      ],
      [
        '==',
        'dmfl',
        '100404'
      ],
      [
        '==',
        'dmfl',
        '100419'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'yywhss_qx_yy',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'yywhss_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '090103'
      ],
      [
        '==',
        'dmfl',
        '090110'
      ],
      [
        '==',
        'dmfl',
        '090111'
      ],
      [
        '==',
        'dmfl',
        '090400'
      ],
      [
        '==',
        'dmfl',
        '090600'
      ],
      [
        '==',
        'dmfl',
        '090700'
      ],
      [
        '==',
        'dmfl',
        '090800'
      ],
      [
        '==',
        'dmfl',
        '091000'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '医院_黑白',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_qx_jd',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '140101'
      ],
      [
        '==',
        'dmfl',
        '140102'
      ],
      [
        '==',
        'dmfl',
        '140103'
      ],
      [
        '==',
        'dmfl',
        '140109'
      ],
      [
        '==',
        'dmfl',
        '140200'
      ],
      [
        '==',
        'dmfl',
        '140300'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '酒店',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_qx_cs',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '150300'
      ],
      [
        '==',
        'dmfl',
        '150400'
      ],
      [
        '==',
        'dmfl',
        '150503'
      ],
      [
        '==',
        'dmfl',
        '150504'
      ],
      [
        '==',
        'dmfl',
        '150505'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '超市',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_qx_gw',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '150100'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '一般POI',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'wtgf_qx_shfl',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160101'
      ],
      [
        '==',
        'dmfl',
        '160102'
      ],
      [
        '==',
        'dmfl',
        '160103'
      ],
      [
        '==',
        'dmfl',
        '160104'
      ],
      [
        '==',
        'dmfl',
        '160105'
      ],
      [
        '==',
        'dmfl',
        '160106'
      ],
      [
        '==',
        'dmfl',
        '160107'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'gray'
    }
  }, {
    'id': 'wtgf_qx_qtfw',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160301'
      ],
      [
        '==',
        'dmfl',
        '160401'
      ],
      [
        '==',
        'dmfl',
        '160403'
      ],
      [
        '==',
        'dmfl',
        '160404'
      ],
      [
        '==',
        'dmfl',
        '160405'
      ],
      [
        '==',
        'dmfl',
        '160406'
      ],
      [
        '==',
        'dmfl',
        '160407'
      ],
      [
        '==',
        'dmfl',
        '160502'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160506'
      ],
      [
        '==',
        'dmfl',
        '160508'
      ],
      [
        '==',
        'dmfl',
        '160509'
      ],
      [
        '==',
        'dmfl',
        '160510'
      ],
      [
        '==',
        'dmfl',
        '160519'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'blue'
    }
  }, {
    'id': 'wtgf_qx_shfl_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160101'
      ],
      [
        '==',
        'dmfl',
        '160102'
      ],
      [
        '==',
        'dmfl',
        '160103'
      ],
      [
        '==',
        'dmfl',
        '160104'
      ],
      [
        '==',
        'dmfl',
        '160105'
      ],
      [
        '==',
        'dmfl',
        '160106'
      ],
      [
        '==',
        'dmfl',
        '160107'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
      'text-font': [
        'Arial Unicode MS Regular'
      ],
      'text-anchor': 'left',
      'text-size': 14
    },
    'paint': {}
  }, {
    'id': 'wtgf_qx_qtfw_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'wtgf_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160301'
      ],
      [
        '==',
        'dmfl',
        '160401'
      ],
      [
        '==',
        'dmfl',
        '160403'
      ],
      [
        '==',
        'dmfl',
        '160404'
      ],
      [
        '==',
        'dmfl',
        '160405'
      ],
      [
        '==',
        'dmfl',
        '160406'
      ],
      [
        '==',
        'dmfl',
        '160407'
      ],
      [
        '==',
        'dmfl',
        '160502'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160504'
      ],
      [
        '==',
        'dmfl',
        '160506'
      ],
      [
        '==',
        'dmfl',
        '160508'
      ],
      [
        '==',
        'dmfl',
        '160509'
      ],
      [
        '==',
        'dmfl',
        '160510'
      ],
      [
        '==',
        'dmfl',
        '160519'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'qsydw_qx_qc',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'qsydw_qx',
    'filter': [
      'any', [
        '==',
        'dmfl',
        '160302'
      ],
      [
        '==',
        'dmfl',
        '160304'
      ],
      [
        '==',
        'dmfl',
        '160305'
      ],
      [
        '==',
        'dmfl',
        '160306'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'icon-image': '汽修',
      'icon-size': 0.5,
      'text-field': '{jc}',
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
  }, {
    'id': 'qsydw_qx_qssdw',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'qsydw_qx',
    'filter': [
      'all', [
        '!=',
        'dmfl',
        '160302'
      ],
      [
        '!=',
        'dmfl',
        '160304'
      ],
      [
        '!=',
        'dmfl',
        '160305'
      ],
      [
        '!=',
        'dmfl',
        '160306'
      ]
    ],
    'layout': {},
    'paint': {
      'circle-radius': 4,
      'circle-color': 'red'
    }
  }, {
    'id': 'qsydw_qx_qssdw_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'qsydw_qx',
    'filter': [
      'all', [
        '!=',
        'dmfl',
        '160302'
      ],
      [
        '!=',
        'dmfl',
        '160304'
      ],
      [
        '!=',
        'dmfl',
        '160305'
      ],
      [
        '!=',
        'dmfl',
        '160306'
      ]
    ],
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
  }, {
    'id': 'cshd',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'cshd',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{hlmc}',
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
  }, {
    'id': 'ljmc',
    'type': 'circle',
    'source': 'ALL',
    'source-layer': 'ljmc',
    'layout': {},
    'paint': {
      'circle-radius': 3,
      'circle-color': 'red'
    }
  }, {
    'id': 'ljmc_symbol',
    'type': 'symbol',
    'source': 'ALL',
    'source-layer': 'ljmc',
    'layout': {
      'symbol-placement': 'point',
      'text-field': '{jc}',
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
    'id': '3d_building_layer_one',
    'type': 'fill-extrusion',
    'source': 'bd',
    'source-layer': 'building',
    'filter': ['all', ['<=', 'nd', 1900]],
    'minzoom': 13,
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-extrusion-color': '#fcf9f4',
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      }
    }
  },
  {
    'id': '3d_building_layer_two',
    'type': 'fill-extrusion',
    'source': 'bd',
    'source-layer': 'building',
    'filter': ['all', ['<=', 'nd', 2000]],
    'minzoom': 13,
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-extrusion-color': '#fcf9f4',
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      }
    }
  },
  {
    'id': '3d_building_layer_th',
    'type': 'fill-extrusion',
    'source': 'bd',
    'source-layer': 'building',
    'filter': ['all', ['<=', 'nd', 2010]],
    'minzoom': 13,
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-extrusion-color': '#fcf9f4',
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      }
    }
  },
  {
    'id': '3d_building_layer_fou',
    'type': 'fill-extrusion',
    'source': 'bd',
    'source-layer': 'building',
    'filter': ['all', ['<=', 'nd', 2014]],
    'minzoom': 13,
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-extrusion-color': '#fcf9f4',
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      }
    }
  },
  {
    'id': '3d_building_layer_fiv',
    'type': 'fill-extrusion',
    'source': 'bd',
    'source-layer': 'building',
    'filter': ['all', ['<=', 'nd', 2016]],
    'minzoom': 13,
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'fill-extrusion-color': '#fcf9f4',
      'fill-extrusion-opacity': 0.6,
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
      },
      'fill-extrusion-base': {
        'type': 'identity',
        'property': 'min_height'
      }
    }
  }]
}
