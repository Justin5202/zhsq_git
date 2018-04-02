import state from '@/store/state'
import {
    getMsMacroData,
    getAreaDetailByAreaCode,
    getEconomicUnitHtmlByAreaCode,
    getDataFileInfo,
    getAreaPovertyAlleviationDetail
} from '@/api/dataSheets'
import JSZip from 'jszip'
//获取areaCode 和 dataId
export const getAreaCodeAndDataIdInJS = function(areaCode, dataId) {
        var AreaCodeAndDataId = []
        var idList = ""
        var type = 0
        var codeList = ""
        var itemList = []
        var idArray = []
        for (let i in dataId[0]) {
            type = parseInt(dataId[0][i].type) % 10
            if ((type == 2 || type == 3) && dataId[0][i].isActive) {
                idList += ',' + dataId[0][i].id
                itemList.push(dataId[0][i])
                idArray.push(dataId[0][i].id)
            }
            if (dataId[0][i].children.length > 0) {
                for (let j in dataId[0][i].children) {
                    type = parseInt(dataId[0][i].children[j].type) % 10
                    if ((type == 2 || type == 3) && dataId[0][i].children[j].isActive) {
                        idList += ',' + dataId[0][i].children[j].id
                        itemList.push(dataId[0][i].children[j])
                        idArray.push(dataId[0][i].children[j].id)
                    }
                    if (dataId[0][i].children[j].children.length > 0) {
                        for (let k in dataId[0][i].children[j].children) {
                            type = parseInt(dataId[0][i].children[j].children[k].type) % 10
                            if ((type == 2 || type == 3) && dataId[0][i].children[j].children[k].isActive) {
                                idList += ',' + dataId[0][i].children[j].children[k].id
                                itemList.push(dataId[0][i].children[j].children[k])
                                idArray.push(dataId[0][i].children[j].children[k].id)
                            }
                        }
                    }
                }
            }
        }
        for (let i in dataId[1]) {
            if (dataId[1][i].macro && dataId[1][i].isActive) {
                if (dataId[1][i].macro.filedsData) {
                    if (idArray.indexOf(dataId[1][i].macro.dataId)) {
                        idList += ',' + dataId[1][i].macro.dataId
                        itemList.push(dataId[1][i])
                    }
                }
            }
        }
        if (areaCode.length > 0) {
            for (let i in areaCode) {
                codeList += ',' + areaCode[i].areacode
            }
        } else {
            codeList = ',500000'
        }
        AreaCodeAndDataId.push(codeList.substring(1))
        AreaCodeAndDataId.push(idList.substring(1))
        AreaCodeAndDataId.push(itemList)
        return AreaCodeAndDataId
    }
    //获取报表详情
export const getReportDataInJS = function(areaCode, dataId) {
        var typeNum = 0; //用于保存数据类型数量
        var areaNum = 0; //用于保存不同的地区数量
        var arrayList = []
        var yearListMax = [] //用于保存最大的年份数组长度
        var dataArray = {}
        var dataList = []
        return new Promise(function(resolve) {
            getMsMacroData(areaCode, dataId).then(res => {
                for (let i in res.data) {
                    if (Object.keys(res.data[i]).length == 0) {
                        dataList.push({ 'name': '', 'id': i, 'dataByYear': { 'type': '暂无统计数据' } })
                    } else {
                        typeNum++
                        areaNum = 0 //只取一次循环的数量
                        for (let j in res.data[i]) {
                            areaNum++
                            var dataByYear = []; //用于保存每条数据
                            for (let k = 0; k < res.data[i][j]['year'].length; k++) {
                                var yearList = res.data[i][j]['year'][k]
                                if (yearListMax.length < res.data[i][j]['year'].length) {
                                    yearListMax = res.data[i][j]['year']
                                }
                                var filedsData = res.data[i][j][yearList][0].filedsData.split('|ZX|')
                                for (var p = 0; p < filedsData.length; p++) {
                                    if (dataByYear.length < filedsData.length) {
                                        dataByYear.push({
                                            "type": filedsData[p].split(':')[0],
                                            "areaName": res.data[i][j][yearList][0].areaName,
                                            "areaCode": j
                                        })
                                    }
                                    dataByYear[p][yearList] = filedsData[p].split(':')[1] || "--"
                                }
                                if (k == res.data[i][j]['year'].length - 1) {
                                    arrayList.push({
                                        "name": res.data[i][j][yearList][0].name,
                                        "id": res.data[i][j][yearList][0].dataId,
                                        "dataByYear": dataByYear
                                    })
                                }
                            }
                        }
                    }
                }
                //将返回数据拆分拼接
                var result = []
                if (arrayList.length > 0) {
                    for (var i = 0; i < Math.ceil(arrayList.length / areaNum); i++) {
                        var start = i * areaNum;
                        var end = start + areaNum;
                        result.push(arrayList.slice(start, end));
                    }
                    for (var m = 0; m < result.length; m++) {
                        for (var n = 0; n < result[m].length; n += areaNum) {
                            var temporary = [];
                            for (var k = 0; k < result[m][n].dataByYear.length; k++) {
                                for (var j = 0; j < areaNum; j++) {
                                    if ((n + j) > 0) {
                                        result[m][n + j].dataByYear[k].type = ""
                                    }
                                    temporary.push(result[m][n + j].dataByYear[k])
                                }
                            }
                            result[m][0].dataByYear = temporary
                        }
                        dataList.push(result[m][0])
                    }
                    dataArray.year = yearListMax.reverse()
                }
                dataArray.data = dataList
                resolve(dataArray)
            })
        })
    }
    //根据areacode获取行政区划详情
export const getReportDataByAreaCodeInJS = function(data) {
    var title = data[1] + ' ' + '概况'
    if (data[2] == 2) {
        return new Promise(function(resolve) {
            getAreaDetailByAreaCode(data[0]).then(res => {
                var dataArray = { 'title': title, 'name': [], 'data': { dataContex: [], dataType: [] } }
                for (var i in res.data) {
                    dataArray.name.push(res.data[i].name)
                    if (res.data[i].type == 1) {
                        if (res.data[i].data) {
                            dataArray.data.dataContex.push(res.data[i].data)
                            dataArray.data.dataType.push('string')
                        } else {
                            dataArray.data.dataContex.push('数据建设中...')
                            dataArray.data.dataType.push('noData')
                        }
                    } else if (res.data[i].type == 2) {
                        if (res.data[i].data) {
                            var filePath = 'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test/serviceMap/zip/' + res.data[i].data.dataDesc
                            var fileName = res.data[i].data.dataDesc.split('.')[0]
                            var htm = fileName + '.' + 'htm'
                            var html = fileName + '.' + 'html'
                            var pdf = fileName + '.' + 'pdf'
                            var promise = new JSZip.external.Promise(function(resolve, reject) {
                                JSZipUtils.getBinaryContent(filePath, function(err, data) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(data);
                                    }
                                })
                            })
                            promise.then(JSZip.loadAsync)
                                .then(function(zip) {
                                    if (zip.file(htm)) {
                                        dataArray.data.dataType.push('html')
                                        return zip.file(htm).async("base64")
                                    } else if (zip.file(html)) {
                                        dataArray.data.dataType.push('html')
                                        return zip.file(html).async("base64")
                                    } else if (zip.file(pdf)) {
                                        dataArray.data.dataType.push('pdf')
                                        return zip.file(pdf).async("base64")
                                    }
                                })
                                .then(function success(text) {
                                    dataArray.data.dataContex.push(text)
                                    resolve(dataArray)
                                }, function error(e) {
                                    console.log(e)
                                })
                        } else {
                            dataArray.data.dataContex.push('数据建设中...')
                            dataArray.data.dataType.push('noData')
                        }
                    }
                }
                resolve(dataArray)
            })
        })
    } else if (data[2] == 6) {
        return new Promise(function(resolve) {
            getEconomicUnitHtmlByAreaCode(data[0]).then(res => {
                var dataArray = { 'title': title, 'name': [], 'data': { dataContex: [], dataType: [] } }
                for (var i in res.data) {
                    dataArray.name.push(res.data[i].title)
                    if (res.data[i].html) {
                        dataArray.data.dataContex.push(res.data[i].html)
                        dataArray.data.dataType.push('string')
                    } else {
                        dataArray.data.dataContex.push('数据建设中...')
                        dataArray.data.dataType.push('noData')
                    }
                }
                resolve(dataArray)
            })

        })
    }
}

//获取文件数据
export const getDataFileByCodeAndIdInJS = function(areaCode, dataId, index) {
        var codeList = ''
        var dataArray = { 'title': '数据详情', 'name': [], 'code': [], 'data': { dataContex: [], dataType: [] } }
        if (areaCode.length > 0) {
            for (let i in areaCode) {
                if (areaCode[i].areacode != 501002) {
                    if (index) {
                        codeList = ',' + areaCode[index].areacode
                    } else {
                        codeList = ',' + areaCode[0].areacode
                    }
                    dataArray.name.push(areaCode[i].areaname)
                    dataArray.code.push(areaCode[i].areacode)
                }
            }
        } else {
            codeList = ',500000'
            dataArray.name.push('重庆市')
        }
        return new Promise(function(resolve) {
            getDataFileInfo(codeList.substring(1), dataId).then(res => {
                var filePath = ''
                var htm = ''
                var html = ''
                var pdf = ''
                var context = ''
                var fileName = ''
                if (res.data.length > 0) {
                    for (var i in res.data) {
                        filePath = 'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test/serviceMap/zip/' + res.data[i].filePath
                        fileName = res.data[i].filePath.split('.')[0]
                        htm = fileName + '.' + 'htm'
                        html = fileName + '.' + 'html'
                        pdf = fileName + '.' + 'pdf'
                        var promise = new JSZip.external.Promise(function(resolve, reject) {
                            JSZipUtils.getBinaryContent(filePath, function(err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            })
                        })
                        promise.then(JSZip.loadAsync)
                            .then(function(zip) {
                                if (zip.file(htm)) {
                                    dataArray.data.dataType.push('html')
                                    return zip.file(htm).async("base64")
                                } else if (zip.file(html)) {
                                    dataArray.data.dataType.push('html')
                                    return zip.file(html).async("base64")
                                } else if (zip.file(pdf)) {
                                    dataArray.data.dataType.push('pdf')
                                    return zip.file(pdf).async("base64")
                                }
                            })
                            .then(function success(text) {
                                dataArray.data.dataContex.push(text)
                                resolve(dataArray)
                            }, function error(e) {
                                console.log(e)
                            })
                    }
                } else {
                    dataArray.data.dataType.push('noData')
                    dataArray.data.dataContex.push('数据建设中...')
                    resolve(dataArray)
                }
            })
        })
    }
    // 获取贫困乡镇数据详情
export const getAreaPovertyAlleviationDetailByAreaCodeInJS = function(data) {
    var dataArray = { 'title': data.mc, 'name': [], 'data': { dataContex: [], dataType: [] } }
    return new Promise(function(resolve) {
        getAreaPovertyAlleviationDetail(data.areaCode).then(res => {
            var filePath = ''
            var htm = ''
            var html = ''
            var fileName = ''
            if (res.data[0].data.dataDesc) {
                dataArray.name.push(res.data[0].name)
                filePath = 'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test/serviceMap/zip/' + res.data[0].data.dataDesc
                fileName = res.data[0].data.dataDesc.split('.')[0]
                htm = fileName + '.' + 'htm'
                html = fileName + '.' + 'html'
                var promise = new JSZip.external.Promise(function(resolve, reject) {
                    JSZipUtils.getBinaryContent(filePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    })
                })
                promise.then(JSZip.loadAsync)
                    .then(function(zip) {
                        if (zip.file(htm)) {
                            return zip.file(htm).async("base64")
                        } else if (zip.file(html)) {
                            return zip.file(html).async("base64")
                        }
                    })
                    .then(function success(text) {
                        dataArray.data.dataContex.push(text)
                        dataArray.data.dataType.push('html')
                        for (var i = 1; i < res.data.length; i++) {
                            dataArray.name.push(res.data[i].name)
                            dataArray.data.dataContex.push(res.data[i].data)
                            dataArray.data.dataType.push('string')
                        }
                        resolve(dataArray)
                    }, function error(e) {})
            } else {
                for (var i = 0; i < res.data.length; i++) {
                    dataArray.name.push(res.data[i].name)
                    dataArray.data.dataContex.push(res.data[i].data)
                    dataArray.data.dataType.push('string')
                }
                resolve(dataArray)
            }
        })
    })
}