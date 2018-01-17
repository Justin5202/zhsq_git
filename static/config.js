/* 搜索 */
var server = 'http://192.168.11.160:8200',
  client = new window.d2c.search({host: server}), searchLayers = {},
  searchTypes = null,
  searchSize = 100,
  searchSource = null,
  index = 'cqdata'
/* 地图地址 不设置默认为空底图 */
var mapUrl = null

/* 资源目录地址 */
var sourceDirUrl = 'http://192.168.11.160/oms/innerdata/maps'
