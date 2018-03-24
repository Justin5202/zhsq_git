import JSZip from 'jszip'
import {
    getMsMacroData,
    getAreaDetailByAreaCode,
    getEconomicUnitHtmlByAreaCode,
    getDataFileInfo,
    getAreaPovertyAlleviationDetail
} from '@/api/dataSheets'
import state from '@/store/state'
//获取areaCode 和 dataId
function getAreaCodeAndDataId(areaCode, dataId) {
    var AreaCodeAndDataId = []
    var idList = ""
    var codeList = ""
    for (let i in dataId[0]) {
        if (dataId[0].target.length > 0 && dataId[0].isActive) {
            idList += ',' + dataId[0].id
        }
        if (dataId[0].children.length > 0) {
            for (let j in dataId[0].children) {
                if (dataId[0].children[j].target.length > 0 && dataId[0].children[j].isActive) {
                    idList += ',' + dataId[0].children[j].id
                }
                if (dataId[0].children[j].children.length > 0) {
                    for (let k in dataId[0].children[j].children) {
                        if (dataId[0].children[j].children[k].target.length > 0 && dataId[0].children[j].children[k].isActive) {
                            idList += ',' + dataId[0].children[j].children[k].id
                        }
                    }
                }
            }
        }
    }
    for (let i in dataId[1]) {
        if (dataId[1][i].macro.filedsData && dataId[1][i].isActive) {
            idList += ',' + dataId[1][i].macro.dataId
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
        // commit(TYPE.SET_AREACODE_AND_DATAID, AreaCodeAndDataId)
}
//获取报表详情
function getReportData(areaCode, dataId) {
    var typeNum = 0; //用于保存数据类型数量
    var areaNum = 0; //用于保存不同的地区数量
    var arrayList = []
    var yearListMax = [] //用于保存最大的年份数组长度
    var dataArray = {}
    getMsMacroData(areaCode, dataId).then(res => {
        for (let i in res.data) {
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
        //将返回数据拆分拼接
        var result = []
        var dataList = []
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
        dataArray.data = dataList
        dataArray.year = yearListMax.reverse()
            // commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
    })
}
//根据areacode获取行政区划详情
function getReportDataByAreaCode(data) {
    var title = data[1] + ' ' + '概况'
    if (data[2] == 2) {
        getAreaDetailByAreaCode(data[0]).then(res => {
            var dataArray = { 'title': title, 'name': [], 'data': { dataContex: [], dataType: [] } }
            for (var i in res.data) {
                dataArray.name.push(res.data[i].name)
                dataArray.data.dataContex.push(res.data[i].data)
                dataArray.data.dataType.push('string')
            }
            // commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
        })
    } else if (data[2] == 6) {
        getEconomicUnitHtmlByAreaCode(data[0]).then(res => {
            var dataArray = { 'title': title, 'name': [], 'data': { dataContex: [], dataType: [] } }
            for (var i in res.data) {
                dataArray.name.push(res.data[i].title)
                dataArray.data.dataContex.push(res.data[i].html)
                dataArray.data.dataType.push('string')
            }
            // commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
        })
    }
}
//获取文件数据
function getDataFileByCodeAndId({ commit, state }, { areaCode, dataId }) {
    var codeList = ''
    var dataArray = { 'title': '数据详情', 'name': [], 'data': { dataContex: [], dataType: ['file'] } }
    if (areaCode.length > 0) {
        for (let i in areaCode) {
            if (areaCode[i].areacode != 501002) {
                codeList += ',' + areaCode[i].areacode
                dataArray.name.push(areaCode[i].areaname)
            }
        }
    } else {
        codeList = ',500000'
        dataArray.name.push('重庆市')
    }
    getDataFileInfo(codeList.substring(1), dataId).then(res => {
        var filePath = ''
        var htm = ''
        var html = ''
        var context = ''
        var fileName = ''
        if (res.data.length > 0) {
            for (var i in res.data) {
                filePath = 'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test/serviceMap/zip/' + res.data[i].filePath
                fileName = res.data[i].filePath.split('.')[0]
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
                        commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
                    }, function error(e) {
                        console.log(e)
                    })
            }
        } else {
            commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
        }

    })
}
// 获取贫困乡镇数据详情
function getAreaPovertyAlleviationDetailByAreaCode({ commit, state }, data) {
    var dataArray = { 'title': data.mc, 'name': [], 'data': { dataContex: [], dataType: [] } }
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
                    dataArray.data.dataType.push('file')
                    for (var i = 1; i < res.data.length; i++) {
                        dataArray.name.push(res.data[i].name)
                        dataArray.data.dataContex.push(res.data[i].data)
                        dataArray.data.dataType.push('string')
                    }
                    commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
                }, function error(e) {})
        } else {
            for (var i = 0; i < res.data.length; i++) {
                dataArray.name.push(res.data[i].name)
                dataArray.data.dataContex.push(res.data[i].data)
                dataArray.data.dataType.push('string')
            }
            commit(TYPE.SET_REPORT_FORM_DATA, dataArray)
        }
    })
}