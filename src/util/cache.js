import state from '@/store/state'

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
                mapHelper.setMarksToMap(id, handleArray(res.data.points).splice(1, handleArray(res.data.points).length - 1), res.data.mapguid, 'TS_定位1', 0.8, result.minzoom)
                /*图层过滤*/
                mapHelper.setFilterByCodeArrayAndAreacodeArray(state.layerIdList, state.areaCodeList)
            }
        })
    })
}
/*
*判断当前图层列表是否存在，存在删除，并移除地图图层
*不存在，push进图层列表，并加载地图图层
 */
function checkData(data, commit) {
    let cur
    if(data.length >= 0) {
        cur = data[0]
    } else {
        cur = data
    }
    let temp = state.activeAreaInfoList.slice()
    let layerIdList = state.layerIdList.slice()
    if (cur.children && cur.children.length > 0) {
        cur.children.map(v => {
            let index = temp.findIndex(f => f.id === v.id)
            if (index < 0) {
                addLayer(v.datapath, v.id)
                v.isActive = true
                cur.isActive = true
            } else {
                v.isActive = false
                cur.isActive = false
                mapHelper.removeLayerByCode(v.id)
            }
        })
    } else {
        let index = temp.findIndex(f => f.id === cur.id)
        if (index < 0) {
            addLayer(cur.datapath, cur.id)
            cur.isActive = true
        } else {
            cur.isActive = false
            mapHelper.removeLayerByCode(cur.id)
        }
    }
    return data
}

/*
*判断数据type类型，做相应操作
*/
function checkClickedDataType(data, commit) {
    let cur
    if(data.length && data.length >= 0) {
        cur = data[0]
    } else {
        cur = data
    }
    let type = parseInt(Number(cur.type) / 10)
    let yu = Number(cur.type) % 10
    let temp
    // 加入图层数组前，判断是否存在，存在删除，不存在push，然后设置isActive
    // type为0，仅为目录，直接显示列表
    if (type === 0) {
        console.log('仅为目录')
        data[0].isActive = false
        temp = data
    } else if (type === 1) { // type为1，无下一级目录
        if (yu === 0) { // yu为0，不做任何操作
            console.log('仅为目录')
            data[0].isActive = false
            temp = data
        } else if (yu === 1) { // yu为1，仅有空间数据，即加载空间数据
            temp = checkData(data, commit)
        } else if (yu === 2) { // yu为2，仅有统计数据，加载统计数据
            console.log('仅有统计数据，加载统计数据')
            data[0].isActive = true
            if(data[0].children.length > 0) {
                data[0].isActive = false
                data[0].children.map(v => {
                    v.isActive = false
                })
            } else {
                data[0].isActive = false
            }
            temp = data
        } else if (yu === 3) { // yu为3，有空间数据和统计数据，优先加载空间数据
            temp = checkData(data, commit)
        } else if (yu === 4) { // yu为4，仅有文本数据，即加载文本数据
            console.log('仅有文本数据，即加载文本数据')
            if(data[0].children.length > 0) {
                data[0].isActive = false
                data[0].children.map(v => {
                    v.isActive = false
                })
            } else {
                data[0].isActive = true
            }
            temp = data
        } else if (yu === 5) { // yu为5，有文本数据和空间数据，优先加载空间数据
            temp = checkData(data, commit)
        }
    } else if (type === 2) { // type为2，即为图层，加载图层
        temp = checkData(data, commit)
    } else if (type === 3) { // type为3，即为网页，记载网页

    } else if (type === 4) { // type为4，即为720图片

    }
    return temp
}