/**
 * @author wangsy
 * @description map操作
 * 特别说明：
 * id 都是map的图层id
 * source 都是map的source
 * code 指的都是目录中的编码（id）指的areaInfoData对象中的id形如：B01010000
 */

 import Vue from 'vue'
 import infoPopupVm from '../components/common/infoPopup'


// 私有map
var map = null;

// 底图图层id
var layersId_dt = [];

// 影像图层id
var layersId_img = [];

// 晕染图层id
var layersId_dem = [];

// 2d建筑物图层id initmap时赋值
var layersId_2d = [];

// 3d建筑物图层id initmap时赋值
var layersId_3d = [];

// code 与 layerId 的对应关系
var layersId = {};

// code 与 source 的对应关系
var sourcesName = {};

// 中转详情用 callback 详情 用
var mapguidCallback = null;

// 中转详情用 callback 量算用
var measureCallback = null;

// 中转详情用 callback onDbClickCallback 用
var dbClickCallback = null;

// 量算标志位
var isMeasure = false;

// 详情popup
var infoPopup = null;

// 缓存详情窗的 vue实体
var infoPopup_vm = null;

// 传入的 目前叠加了哪些目录编码的数组
var codeArray = [];

// 传入的 目前叠加了哪些areacode的数组
var areacodeArray = [];

/**
* @function 初始化地图
* @param option
* @returns map
*/
const initMap = function (option) {
    // 获取 2D 3D图层 group id
    let groupUUID_2d = "";
    let groupUUID_3d = "";
    for (const key in option.style.metadata["mapbox:groups"]) {
        if (option.style.metadata["mapbox:groups"][key].name == "2D建筑") {
            groupUUID_2d = key;
        }
        if (option.style.metadata["mapbox:groups"][key].name == "3D建筑") {
            groupUUID_3d = key;
        }
    }

    // 获取2d 3d layers id
    option
        .style
        .layers
        .forEach(element => {
            layersId_dt.push(element.id);
            if (element.metadata) {
                if (element.metadata["mapbox:group"] == groupUUID_2d) {
                    layersId_2d.push(element.id);
                }
                if (element.metadata["mapbox:group"] == groupUUID_3d) {
                    layersId_3d.push(element.id);
                }
            }
        })

    // 初始化地图
    map = new window
        .d2c
        .map(option);

    //绑定右键拖动事件 2D 3D 图层显示用
    map.on('pitch', onPitch);

    // 绑定点击事件返回 mapguid
    map.on('click', onClick);

    // 绑定双击事件
    map.on("dblclick", onDbClick);

    // 样式 文件有变动时 进行 过滤
    map.on('styledata',function(){
        codeArray.forEach(element => {
            if (layersId[element]) {
                let filter = ["any"];
    
                areacodeArray.forEach(element => {
                    filter.push(["all",[">=", "xzq_bm", element],["<=", "xzq_bm", element + "z"]]);
                });
    
                // 如果有图层一定是数组
                layersId[element].forEach(element => {
                    map.setFilter(element, filter);
                });
            }
        })
    });

    return map;
};

/**
* @function 拖动时的回调函数 倾斜时2d3d切换(私有)
* @param event
* @returns null
*/
const onPitch = function (e) {
    if (map.getPitch() > 0.00001) {
        set2dLayersVisibility(false);
        set3dLayersVisibility(true);
    } else {
        set2dLayersVisibility(true);
        set3dLayersVisibility(false);
    }
};

/**
* @function 点击地图时的回调函数(私有)
* @param event
* @returns null
*/
const onClick = function (e) {

    if (isMeasure) {
        if (measureCallback) {
            measureCallback(e);
        }

    } else {
        let features = map.queryRenderedFeatures([e.lngLat.lng, e.lngLat.lat]);
        // 要素的mapguid
        if (features.length > 0 && mapguidCallback) {

            mapguidCallback(features[0].properties.mapguid);

        }
    }

};

/**
* @function 双击地图时的回调函数(私有)
* @param event
* @returns null
*/
const onDbClick = function (e) {
    if (dbClickCallback) {
        dbClickCallback(e);
    }

};

/**
* @function 设置isMeasure
* @param （true:现在是量测，false：现在不是量测）
* @returns null
*/
const setIsMeasure = function (value) {
    isMeasure = value;
};

/**
* @function 设置点击获取mapguid回调函数
* @param callback
* @returns null
*/
const getGuidOnClickCallback = function (_callback) {
    mapguidCallback = _callback;
};

/**
* @function 设置点击量算回调函数
* @param callback
* @returns null
*/
const measureOnClickCallback = function (_callback) {
    measureCallback = _callback;
};

/**
* @function 设置双击事件回调函数
* @param callback
* @returns null
*/
const onDbClickCallback = function (_callback) {
    dbClickCallback = _callback;
};

/**
* @function 绑定影像和晕染服务
* @param 影像的图层和源 , 濡染的图层和源
* @returns null
*/
const initImageAndDemMap = function (img, dem) {
    layersId_img = [];
    layersId_dem = [];
    // 设置 隐藏
    for (let index = 0; index < img.layers.length; index++) {
        layersId_img.push(img.layers[index]["id"]);
        img.layers[index]["layout"]["visibility"] = "none";
    }

    for (let index = 0; index < dem.layers.length; index++) {
        layersId_dem.push(dem.layers[index]["id"]);
        dem.layers[index]["layout"]["visibility"] = "none";
    }
    map
        .on('load', function () {

            // 地图加 source
            for (let k in img.sources) {
                try {
                    map.addSource(k, img.sources[k]);
                } catch (error) {
                    console.log("影像出现重复的source");
                }
            }

            for (let k in dem.sources) {
                try {
                    map.addSource(k, dem.sources[k]);
                } catch (error) {
                    console.log("晕染出现重复的source");
                }
            }

            // 加layers
            img
                .layers
                .forEach(element => {
                    map.addLayer(element);
                })
            dem
                .layers
                .forEach(element => {
                    map.addLayer(element);
                })
        })

};

/**
* @function 设置全部影像服务可见性
* @param （true：可见，false：不可见）
* @returns null
*/
const setAllImageMapVisibility = function (visibility) {
    // 判断层级是否显示 天地图影像
    if (layersId_img.length > 0) {

        if (visibility) {
            layersId_img.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
            layersId_dt.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
        } else {
            layersId_img.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            layersId_dt.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
        }

    } else {
        console.log("获取影像图层id失败")
    }
};

/**
* @function 设置天地图影像服务可见性（私有）
* @param （true：可见，false：不可见）
* @returns null
*/
const setTdtImageMapVisibility = function (value) {};

/**
* @function 设置全部晕染服务可见性
* @param （true：可见，false：不可见）
* @returns null
*/
const setAllDemMapVisibility = function (visibility) {
    // 判断层级是否显示 天地图晕染
    if (layersId_dem.length > 0) {

        if (visibility) {
            layersId_dem.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
            layersId_dt.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
        } else {
            layersId_dem.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            layersId_dt.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
        }

    } else {
        console.log("获取晕染图层id失败")
    }
};

/**
* @function 设置天地图晕染服务可见性（私有）
* @param （true：可见，false：不可见）
* @returns null
*/
const setTdtDemMapVisibility = function (value) {};

/**
* @function 添加geojson到地图(画行政区划线)
* @param 图层id, geojson
* @returns null
*/
const addLayerByIdAndGeojson = function (id, geojson) {
    map.addLayer({
        "id": id,
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": geojson["coordinates"][0][0]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#00f",
            "line-width": 2
        }
    });

}

/**
* @function 添加json到地图
* @param 目录中的编码,样式json
* @returns minzoom(当前json中所有layer的最小出现层级)
*/
const addLayerByCodeAndJson = function (code, json) {
    // 当前json的最小层级
    let minzoom = 22;

    // 加source
    if (!sourcesName[code]) {
        sourcesName[code] = [];
        for (let k in json.sources) {
            try {
                map.addSource(k, json.sources[k]);
            } catch (error) {
                console.log("出现重复的source");
            }

            // 记录 source 与 code 对应关系
            sourcesName[code].push(k);
        }
    }
    // 加layer
    if (!layersId[code]) {
        layersId[code] = [];
        json
            .layers
            .forEach(element => {
                map.addLayer(element);
                // 记录 id 与 code 对应关系
                layersId[code].push(element.id);
                // 冒泡找最小值
                if (element.minzoom) {
                    if (element.minzoom < minzoom) {
                        minzoom = element.minzoom;
                    }
                } else {
                    if (6 < minzoom) {
                        minzoom = 6;
                    }
                }
            });
    }

    return minzoom;
};

/**
* @function 通过id删除图层
* @param 图层id
* @returns null
*/
const removeLayerById = function (id) {
    let sourceName = "";
    if (map.getLayer(id)) {
        sourceName = map
            .getLayer(id)
            .source;
        map.removeLayer(id);
        map.removeSource(sourceName);
    }
};

/**
* @function 删除对应目录的所有图层（目前source只加不删）
* @param 目录中的编码
* @returns null
*/
const removeLayerByCode = function (code) {
    // 用code 找到对应的 图层id 逐一删除
    if (layersId[code]) {
        layersId[code].forEach(element => {
            map.removeLayer(element);
        });
        layersId[code] = null;
    } else {
        console.log("没找到对应图层");
    }

};

/**
* @function 设置底图2d图层可见性
* @param （true：可见，false：不可见）
* @returns null
*/
const set2dLayersVisibility = function (visibility) {
    if (layersId_2d.length > 0) {

        if (visibility) {
            layersId_2d.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
        } else {
            layersId_2d.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
        }

    } else {
        console.log("获取2d图层id失败")
    }
}

/**
* @function 设置底图3d图层可见性
* @param （true：可见，false：不可见）
* @returns null
*/
const set3dLayersVisibility = function (visibility) {
    if (layersId_3d.length > 0) {
        if (visibility) {
            layersId_3d.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
        } else {
            layersId_3d.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
        }
    } else {
        console.log("获取3d图层id失败")
    }
}

/**
* @function 通过code设置透明度
* @param 目录中的编码 ,透明度的值
* @returns null
*/
const setOpacityByCode = function (code, value) {
    if (layersId[code]) {
        // 如果有图层一定是数组
        layersId[code].forEach(element => {
            // 判断点线面symbol
            switch (element.type) {
                case "circle":
                    map.setPaintProperty(element.id, 'circle-opacity', value);
                    break;
                case "line":
                    map.setPaintProperty(element.id, 'line-opacity', value);
                    break;
                case "fill":
                    map.setPaintProperty(element.id, 'fill-opacity', value);
                    break;
                case "symbol":
                    map.setPaintProperty(element.id, 'icon-opacity', value);
                    map.setPaintProperty(element.id, 'text-opacity', value);
                    break;
                case "fill-extrusion":
                    map.setPaintProperty(element.id, 'fill-extrusion-opacity', value);
                    break;
                default:
                    console.log("非点、线、面、symbol、3d类型");
                    break;
            }
        });
    }
};

/**
* @function 通过code设置可见性
* @param 编码 ,可见性 （true：可见 ，false：不可见）
* @returns null
*/
const setVisibilityByCode = function (code, visibility) {
    if (layersId[code]) {
        if (visibility) {
            layersId[code].forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
        } else {
            layersId[code].forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
        }

    } else {
        console.log("没找到对应图层");
    }
};

/**
* @function 通过areacode数组设置要素过滤
* @param 目录编码数组，行政区编码数组
* @returns null
*/
const setFilterByCodeArrayAndAreacodeArray = function (_codeArray, _areacodeArray) {
    // 记录 目录和区域 在styledata 事件触发时 过滤
    codeArray = _codeArray;
    areacodeArray = _areacodeArray;

};

/**
* @function 飞到某个层级的某个点
* @param geoPoint (Array),层级
* @returns null
*/
const flyByPointAndZoom = function (center, zoom) {
    map.flyTo({center: center, zoom: zoom});
}

/**
* @function 设置小标注点
* @param layerId,geoPoint,text,textSize,icon,iconSize,minzoom,maxzoom
* @returns null
*/
const setMarkToMap = function (layerId, geoPoint, text, textSize, icon, iconSize, minzoom, maxzoom) {
    let option = {
        id: layerId,
        type: "symbol",
        layout: {},
        paint: {},
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: geoPoint
                        }
                    }
                ]
            }
        }
    }
    if (icon) {
        option.layout["icon-image"] = icon;
        option.layout["icon-size"] = iconSize;
    }

    if (text) {
        option.layout["text-field"] = text;
        option.layout["text-size"] = textSize;
        option.layout["text-justify"] = "center";
        option.layout["text-font"] = ["Arial Unicode MS Regular"];

        option.paint["text-color"] = "white";
    }

    if (maxzoom) {
        option["maxzoom"] = maxzoom;
    }

    if (minzoom) {
        option["minzoom"] = minzoom;
    }

    map.addLayer(option);
};

/**
* @function 设置弹窗popup
* @param 坐标 （数组）， dom
* @returns null
*/
const setPopupToMap = function(geoPoint){
    closePopup();
    infoPopup = new window
    .d2c
    .Popup({closeButton: false})
    .setLngLat(geoPoint)
    .setHTML("<div id = 'infoPopup'></div>")
    .addTo(map);
    infoPopup_vm = new Vue({
        el: '#infoPopup',
        template: '<v-infoPopup/>',
        components: {'v-infoPopup':infoPopupVm}
      })
};

/**
* @function 关闭弹窗popup
* @param
* @returns null
*/
const closePopup = function(){
    if (infoPopup) {
        infoPopup.remove();
        infoPopup = null;
    }
    if (infoPopup_vm) {
        infoPopup_vm.$destroy();
    }
};

/**
* @function 设置倾角
* @param 倾角值
* @returns null
*/
const setBearing = function (value) {
    map.setBearing(value);
}

/**
* @function 设置偏角
* @param 偏角值
* @returns  null
*/
const setPitch = function (value) {
    map.setPitch(value);
}

/**
* @function 设置中心点
* @param 中心点值（array）
* @returns  null
*/
const setCenter = function (center) {
    map.setCenter(center);
}

/**
* @function 获取zoom
* @param 无
* @returns zoom
*/
const getZoom = function () {
    return map.getZoom();
};

/**
* @function 获取中心点坐标
* @param 无
* @returns LngLat
*/
const getCenter = function () {
    return map.getCenter();
};

/**
* @function 设置边界坐标来飞
* @param 点构成的2维数组 [[106.29035996418713,29.46329059299842], [106.29362592578252,29.463419456600406]]
* @returns 无
*/
const flyByBounds = function (lngLatBounds) {
    map.fitBounds(lngLatBounds);
};

/**
* @function 获取边界坐标
* @param 无
* @returns LngLatBounds
*/
const getBounds = function () {
    return map.getBounds();
};

export default {
    initMap,
    initImageAndDemMap,
    addLayerByIdAndGeojson,
    addLayerByCodeAndJson,
    removeLayerById,
    removeLayerByCode,

    set2dLayersVisibility,
    set3dLayersVisibility,
    setAllDemMapVisibility,
    setAllImageMapVisibility,

    setVisibilityByCode,
    setOpacityByCode,

    setFilterByCodeArrayAndAreacodeArray,

    setMarkToMap,
    setPopupToMap,
    closePopup,
    flyByPointAndZoom,
    flyByBounds,

    setBearing,
    setPitch,
    setCenter,

    getZoom,
    getCenter,
    getBounds,

    setIsMeasure,
    getGuidOnClickCallback,
    measureOnClickCallback,
    onDbClickCallback

}
