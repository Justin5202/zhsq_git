/* 搜索 */
var server = 'http://192.168.11.160:8200',
    client = new window
    .d2c
    .search({ host: server }),
    searchLayers = {},
    searchTypes = null,
    searchSize = 100,
    searchSource = null,
    index = 'cqdata'
    /* 地图地址 不设置默认为空底图 */
var mapUrl = 'http://zhsq.digitalcq.com/D2CJsonV3/ZHSQDT.json'
var emptyMap = { // 可配置项：center/zoom/style等 未配置则使用默认配置
    center: [106.647217, 29.566210] // 示例
}

/* 资源目录：URL或者数组 */
var sourceDirUrl = 'http://192.168.11.160/oms/innerdata/maps' // url

// 矢量地图中不参加 点击查询的图层
var vecterClickExceptLayer = "dbsj_xzqhhgldy_qy_py_0,qxjcq,zcqjcq,hillshade_highlight_bright,hillshade_highlight_med,hillshade_shadow_faint,hillshade_shadow_med,hillshade_shadow_dark,hillshade_shadow_extreme,qxjdbx_14,zcqdlbx_14,qxjdm_14,zcqdlm_14,dbsj_jcss_jtjss_gljss_cjgl_gsglm_14,dbsj_jcss_jtjss_gljss_cjgl_gsglbx_14,qxjdbx_lj_14,zcqdlbx_lj_14,qxjdbx_sd_14,zcqdlbx_sd_14,sjzh,qxjzh,99_dpm_11,99_dpm_10,99_dpm_9,dbsj_xzqhhgldy_qy_py_mb,dbsj_jcss_jtjss_hkss_jc_py"

// 影像地图中不参加 点击查询的图层
var imageClickExceptLayer = "img_sjzh,img_qxjzh,img_99_dpm_11,img_99_dpm_10,img_99_dpm_9,img_dbsj_xzqhhgldy_qy_py_mb"
