/**
 * @author wangsy
 * @description map操作
 * 特别说明：
 * 依赖 turf
 * 依赖 config文件中的 vecterClickExceptLayer、imageClickExceptLayer、ZTExceptLayer
 * id 都是map的图层id
 * source 都是map的source
 * code 指的都是目录中的编码（id）指的areaInfoData对象中的id形如：B01010000
 */

import Vue from 'vue'
import store from '../store/index'
import router from '../router'
import infoPopupVm from '../components/common/infoPopup'
import picPopupVm from '../components/common/picPopup'
import cqbounds from '../../static/json/cqbounds'

// 私有map
var map = null;

// 重庆 边界
const cqPolygon = turf.polygon(cqbounds);

// 重庆 边界 线
const cqLine = turf.lineString(cqbounds[0]);

// 标识当前是 矢量地图、影像地图还是 地形图
var mapFlay = "dt";

// 底图图层id
var layersId_dt = [];

// 影像图层id
var layersId_img = [];

// 影像图层id
var layersId_imgHQ = [];

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

// filter 与 layer 的对应关系
var filterMap = {};

// 中转详情用 callback 量算用
var measureCallback = null;

// 中转详情用 callback 指北针用
var rotateCallback = null;

// 中转详情用 callback onDbClickCallback 用
var dbClickCallback = null;

// 地图交互时判断是否要关各种工具栏
var interactiveCallback = null;

// 量算标志位
var isMeasure = false;

// 详情popup
var infoPopup = null;

// 缓存详情窗的 vue实体
var infoPopup_vm = null;

// 图片popup
var picPopup = null;

// 缓存图片窗的 vue实体
var picPopup_vm = null;

// 传入的 目前叠加了哪些目录编码的数组 用来判断 是否开启蒙版
var codeArray = [];

// 传入的 目前叠加了哪些areacode的数组
var areacodeArray = [];

// 点击查询时 矢量地图不参与查询的 图层数组 地图初始化时赋值
var vecterClickExceptLayerArray = null;

// 点击查询时 影像地图不参与查询的 图层数组 地图初始化时赋值
var imageClickExceptLayerArray = null;

// 点击查询时 专题数据名 判断显示信息窗还是 图片窗用 地图初始化时赋值  旅游
var ZTExceptLayerArray_ly = null;

// 点击查询时 专题数据名 判断显示信息窗还是 图片窗用 地图初始化时赋值  扶贫
var ZTExceptLayerArray_fp = null;

/**
 * @function 初始化地图
 * @param option
 * @returns map
 */
const initMap = function (option) {
    // 初始化地图
    map = new window
        .d2c
        .map(option);

    // // 不参与点击查询的layerid
    if (window.vecterClickExceptLayer) {
        vecterClickExceptLayerArray = window
            .vecterClickExceptLayer
            .split(",");
    }
    if (window.imageClickExceptLayer) {
        imageClickExceptLayerArray = window
            .imageClickExceptLayer
            .split(",");
    }

    // // 区分专题数据图层（旅游、扶贫）和 目录数据图层 点击地图回调用
    if (window.ZTExceptLayer_ly) {
        ZTExceptLayerArray_ly = window
            .ZTExceptLayer_ly
            .split(",");
    }

    // // 区分专题数据图层（旅游、扶贫）和 目录数据图层 点击地图回调用
    if (window.ZTExceptLayer_fp) {
        ZTExceptLayerArray_fp = window
            .ZTExceptLayer_fp
            .split(",");
    }

    // // 获取 2D 3D图层 group id
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

    // // 获取2d 3d layers id
    option
        .style
        .layers
        .forEach(element => {
            // 底图中的id
            layersId_dt.push(element.id);

            if (element.metadata) {
                if (element.metadata["mapbox:group"] == groupUUID_2d) {
                    layersId_2d.push(element.id);
                }
                if (element.metadata["mapbox:group"] == groupUUID_3d) {
                    layersId_3d.push(element.id);
                }
            }
        });

    return map;
};

/**
 * @function 拖动时的回调函数 倾斜时2d3d切换(私有)
 * @param event
 * @returns null
 */
const _onPitch = function (e) {
    if (mapFlay == 'dt') {
        if (map.getPitch() > 0.00001) {
            set2dLayersVisibility(false);
            set3dLayersVisibility(true);
        } else {
            set2dLayersVisibility(true);
            set3dLayersVisibility(false);
        }
    }
};

/**
 * @function 拖动时的回调函数 偏转时是否显示指南针(私有)
 * @param event
 * @returns null
 */
const _onRotate = function (e) {
    if (rotateCallback) {
        rotateCallback(map.getBearing());
    }
};

/**
 * @function 点击地图时的回调函数(私有)
 * @param event
 * @returns null
 */
const _onClick = function (e) {

    if (isMeasure) {
        if (measureCallback) {
            measureCallback(e);
        }

    } else {
        let features = map.queryRenderedFeatures(e.point);
        // 要素的mapguid
        if (features.length > 0) {
            let feature = features[0];
            // 判断是否有蒙版 有取第二个 feature
            if (feature.layer["id"] == "dbsj_xzqhhgldy_qy_py_mb" || feature.layer["id"] == "img_dbsj_xzqhhgldy_qy_py_mb" || feature.layer["id"] == "HQ_img_dbsj_xzqhhgldy_qy_py_mb") {
                feature = features[1];
            }

            // 是否存在 排除的 图层 id
            let exceptFlag = false;

            for (let index = 0; index < vecterClickExceptLayerArray.length; index++) {
                if (vecterClickExceptLayerArray[index] == feature.layer["id"]) {
                    exceptFlag = true;
                    break;
                }
            }

            for (let index = 0; index < imageClickExceptLayerArray.length; index++) {
                if (imageClickExceptLayerArray[index] == feature.layer["id"]) {
                    exceptFlag = true;
                    break;
                }
            }

            if (!exceptFlag) {
                // 不在排除的图层中-start poi类型不标志位，便利旅游数组，扶贫数组 popupFlag
                // 为（'ly'弹旅游窗相关、'fp'弹扶贫窗相关、null信息窗相关）
                let popupFlag = null;
                ZTExceptLayerArray_ly.forEach((element) => {
                    // popupFlag 如果已经被赋值就不继续了
                    if (layersId[element] && (!popupFlag)) {
                        for (let index = 0; index < layersId[element].length; index++) {
                            if (layersId[element][index] == feature.layer["id"]) {
                                popupFlag = "ly";
                                break;
                            }
                        }
                    }
                });

                ZTExceptLayerArray_fp.forEach((element) => {
                    // popupFlag 如果已经被赋值就不继续了
                    if (layersId[element] && (!popupFlag)) {
                        for (let index = 0; index < layersId[element].length; index++) {
                            if (layersId[element][index] == feature.layer["id"]) {
                                popupFlag = "fp";
                                break;
                            }
                        }
                    }
                });

                switch (popupFlag) {
                    case "ly":
                        // 旅游图层的
                        setPicPopupToMap([
                            e.lngLat.lng, e.lngLat.lat
                        ], feature.properties.wyid, feature.properties.mc, null);
                        break;

                    case "fp":
                        // 扶贫图层的
                        switch (feature.properties.mulu_bm) {
                            case "F01010100":
                                setPicPopupToMap([
                                    e.lngLat.lng, e.lngLat.lat
                                ], feature.properties.mulu_bm, feature.properties.xzjmc, feature.properties.xzjdm);
                                break;
                            case "F01010200":
                                setPicPopupToMap([
                                    e.lngLat.lng, e.lngLat.lat
                                ], feature.properties.mulu_bm, feature.properties.sqcmc, feature.properties.sqcdm);
                                break;

                            default:
                                setPopupToMap([
                                    e.lngLat.lng, e.lngLat.lat
                                ], feature.properties.mapguid, null);
                                break;
                        }
                        break;

                    default:
                        // 普通POI
                        setPopupToMap([
                            e.lngLat.lng, e.lngLat.lat
                        ], feature.properties.mapguid, null);
                        break;
                }

                // 判断是否mark 变蓝
                if (feature.layer["layout"]["icon-image"] =="TS_定位1") {
                    for (let i = 0; i < 10; i++) {
                        setMarkIconByLayerID(i.toString(),"TS_定位1");                        
                    }
                    setMarkIconByLayerID(feature.layer["id"],"TS_定位2");   
                }

                // 设置高亮
                removeHighLight();

                setHighLight(feature.geometry);
                // 不在排除的图层中-end
            }

        }
    }

};

/**
 * @function 添加高亮层(加popup的话，一定要在加popup之后加高亮)
 * @param featrue/geojson
 * @returns null
 */
const setHighLight = function (geojson) {
    let highlightOption = {
        "id": "highlightLayer",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": geojson
                    }
                ]
            }
        },
        "layout": {}
    };

    // 判断点线面symbol
    switch (geojson.type) {
        case "Point":
            highlightOption["type"] = "circle"
            highlightOption["paint"] = {
                "circle-color": "rgba(85,164,241,0.6)"
            }
            map.addLayer(highlightOption);
            break;
        case "MultiPoint":
            highlightOption["type"] = "circle"
            highlightOption["paint"] = {
                "circle-color": "rgba(85,164,241,0.6)"
            }
            map.addLayer(highlightOption);
            break;

        case "LineString":
            highlightOption["type"] = "line"
            highlightOption["paint"] = {
                "line-color": "rgba(85,164,241,0.6)",
                "line-width": 2
            }
            map.addLayer(highlightOption);
            break;
        case "MultiLineString":
            highlightOption["type"] = "line"
            highlightOption["paint"] = {
                "line-color": "rgba(85,164,241,0.6)",
                "line-width": 2
            }
            map.addLayer(highlightOption);
            break;

        case "Polygon":
            highlightOption["type"] = "fill"
            highlightOption["paint"] = {
                "fill-color": "rgba(85,164,241,0.6)"
            }
            map.addLayer(highlightOption);
            break;
        case "MultiPolygon":
            highlightOption["type"] = "fill"
            highlightOption["paint"] = {
                "fill-color": "rgba(85,164,241,0.6)"
            }
            map.addLayer(highlightOption);
            break;

        default:
            console.log("非点、线、面、symbol、3d类型-点击高亮");
            break;
    }
};

/**
 * @function 删除高亮层
 * @param
 * @returns null
 */
const removeHighLight = function () {
    removeLayerById("highlightLayer");
};

/**
 * @function 双击地图时的回调函数(私有)
 * @param event
 * @returns null
 */
const _onDbClick = function (e) {
    if (dbClickCallback) {
        dbClickCallback(e);
    }

};

/**
 * @function 设置当前是矢量还是影像还是地形
 * @param 类型 (dt img dem)
 * @returns null
 */
const setMapFlay = function (value) {
    mapFlay = value;
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
 * @function 设置转角事件回调函数
 * @param callback
 * @returns null
 */
const onRotateCallback = function (_callback) {
    rotateCallback = _callback;
};

/**
 * @function 设置地图交互时回调函数
 * @param callback
 * @returns null
 */
const onInteractiveCallback = function (_callback) {
    interactiveCallback = _callback;
};

/**
 * @function 绑定影像和晕染服务
 * @param 影像的图层和源 , 濡染的图层和源
 * @returns null
 */
const initImageAndDemMap = function (img, dem, imgHQ) {
    layersId_img = [];
    layersId_imgHQ = [];
    layersId_dem = [];
    // 设置 隐藏
    for (let index = 0; index < img.layers.length; index++) {
        layersId_img.push(img.layers[index]["id"]);
        img.layers[index]["layout"]["visibility"] = "none";
    }

    for (let index = 0; index < imgHQ.layers.length; index++) {
        layersId_imgHQ.push(imgHQ.layers[index]["id"]);
        imgHQ.layers[index]["layout"]["visibility"] = "none";
    }

    for (let index = 0; index < dem.layers.length; index++) {
        layersId_dem.push(dem.layers[index]["id"]);
        dem.layers[index]["layout"]["visibility"] = "none";
    }
    if (map.loaded()) {
        // 地图加 source
        for (let k in img.sources) {
            try {
                map.addSource(k, img.sources[k]);
            } catch (error) {
                console.log("影像出现重复的source");
            }
        }

        for (let k in imgHQ.sources) {
            try {
                map.addSource(k, imgHQ.sources[k]);
            } catch (error) {
                console.log("HQ影像出现重复的source");
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
                map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
            })
        imgHQ
            .layers
            .forEach(element => {
                map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
            })
        dem
            .layers
            .forEach(element => {
                map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
            })
        /* 判断是否要 加载天地图 */

        // 缩放结束 判断当前边界是否在 重庆市域内
        map.on('zoomend', (e) => {
            _containRelationshipCallback();
        });

        // 拖拽结束 判断当前边界是否在 重庆市域内
        map.on('dragend', (e) => {
            _containRelationshipCallback();
        });

        // 倾斜结束 判断当前边界是否在 重庆市域内
        map.on('pitchend', (e) => {
            _containRelationshipCallback();
        });

        // 转角结束 判断当前边界是否在 重庆市域内
        map.on('rotateend', (e) => {
            _containRelationshipCallback();
        });
        // 绑定右键拖动事件 2D 3D 图层显示用
        map.on('pitch', _onPitch);

        //绑定右键拖动事件 是否显示 指北针
        map.on('rotate', _onRotate);

        // 绑定点击事件返回 mapguid
        map.on('click', _onClick);

        // 绑定双击事件
        map.on("dblclick", _onDbClick);

        // 样式 文件有变动时 进行 过滤
        map.on('styledata', () => {
            if (codeArray.length > 0) {
                doFilterByCodeArrayAndAreacodeArray(codeArray, areacodeArray);
            }
        });
        // 有鼠标和地图操作时 关工具栏用的
        map.on('mousedown', () => {
            if (interactiveCallback) {
                interactiveCallback();
            }
        });
        map.on('zoomstart', () => {
            if (interactiveCallback) {
                interactiveCallback();
            }
        });

        // 为了有地图

    } else {
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

                for (let k in imgHQ.sources) {
                    try {
                        map.addSource(k, imgHQ.sources[k]);
                    } catch (error) {
                        console.log("HQ影像出现重复的source");
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
                        map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
                    })
                imgHQ
                    .layers
                    .forEach(element => {
                        map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
                    })
                dem
                    .layers
                    .forEach(element => {
                        map.addLayer(element,"dbsj_xzqhhgldy_qy_py_0");
                    })
                /* 判断是否要 加载天地图 */
                // 缩放结束 判断当前边界是否在 重庆市域内
                map.on('zoomend', (e) => {
                    _containRelationshipCallback();
                });

                // 拖拽结束 判断当前边界是否在 重庆市域内
                map.on('dragend', (e) => {
                    _containRelationshipCallback();
                });

                // 倾斜结束 判断当前边界是否在 重庆市域内
                map.on('pitchend', (e) => {
                    _containRelationshipCallback();
                });

                // 转角结束 判断当前边界是否在 重庆市域内
                map.on('rotateend', (e) => {
                    _containRelationshipCallback();
                });
                // 绑定右键拖动事件 2D 3D 图层显示用
                map.on('pitch', _onPitch);

                //绑定右键拖动事件 是否显示 指北针
                map.on('rotate', _onRotate);

                // 绑定点击事件返回 mapguid
                map.on('click', _onClick);

                // 绑定双击事件
                map.on("dblclick", _onDbClick);

                // 样式 文件有变动时 进行 过滤
                map.on('styledata', () => {
                    if (codeArray.length > 0) {
                        doFilterByCodeArrayAndAreacodeArray(codeArray, areacodeArray);
                    }
                });

                // 有鼠标和地图操作时 关工具栏用的
                map.on('mousedown', () => {
                    if (interactiveCallback) {
                        interactiveCallback();
                    }
                });
                map.on('zoomstart', () => {
                    if (interactiveCallback) {
                        interactiveCallback();
                    }
                });

            })
    }

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
            // 需要传参 mapFlay  = img
            layersId_img.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
            layersId_dt.forEach(element => {

                map.setLayoutProperty(element, 'visibility', 'none');
            });
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        } else {
            layersId_img.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            if (mapFlay == 'dt') {
                layersId_dt.forEach(element => {
                    map.setLayoutProperty(element, 'visibility', 'visible');
                });
            }
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 2D/3D 图层开闭
            _onPitch();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        }

    } else {
        console.log("获取影像图层id失败")
    }
};

/**
 * @function 设置全部HQ影像服务可见性
 * @param （true：可见，false：不可见）
 * @returns null
 */
const setAllHQImageMapVisibility = function (visibility) {
    // 判断层级是否显示 天地图影像
    if (layersId_imgHQ.length > 0) {

        if (visibility) {
            // 需要传参 mapFlay  = img
            layersId_imgHQ.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
            layersId_dt.forEach(element => {

                map.setLayoutProperty(element, 'visibility', 'none');
            });
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        } else {
            layersId_imgHQ.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            if (mapFlay == 'dt') {
                layersId_dt.forEach(element => {
                    map.setLayoutProperty(element, 'visibility', 'visible');
                });
            }
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 2D/3D 图层开闭
            _onPitch();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        }

    } else {
        console.log("获取HQ影像图层id失败")
    }
};

/**
 * @function 设置全部晕染服务可见性
 * @param （true：可见，false：不可见）
 * @returns null
 */
const setAllDemMapVisibility = function (visibility) {
    // 判断层级是否显示 天地图晕染
    if (layersId_dem.length > 0) {

        if (visibility) {
            // 需要传参 mapFlay  = dem
            layersId_dem.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'visible');
            });
            layersId_dt.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        } else {
            layersId_dem.forEach(element => {
                map.setLayoutProperty(element, 'visibility', 'none');
            });
            if (mapFlay == 'dt') {
                layersId_dt.forEach(element => {
                    map.setLayoutProperty(element, 'visibility', 'visible');
                });
            }
            // 判断当前视野是否需要显示 天地图
            _containRelationshipCallback();
            // 2D/3D 图层开闭
            _onPitch();
            // 判断 当前是否有数据叠加 开关蒙版
            _setMBVisibility();
        }

    } else {
        console.log("获取晕染图层id失败")
    }
};

/**
 * @function 缩放、拖拽、转角、倾斜时，判断是否在重庆市域设置天地图服务可见性(私有)
 * @param 当前区域边界的四个电脑
 * @returns boolean
 */
const _containRelationshipCallback = function () {
    let lngLatBounds = map.getBounds();
    let lngLatArray = [
        [
            [
                lngLatBounds._ne.lng, lngLatBounds._sw.lat
            ],
            [
                lngLatBounds._ne.lng, lngLatBounds._ne.lat
            ],
            [
                lngLatBounds._sw.lng, lngLatBounds._ne.lat
            ],
            [
                lngLatBounds._sw.lng, lngLatBounds._sw.lat
            ],
            [lngLatBounds._ne.lng, lngLatBounds._sw.lat]
        ]
    ]

    let nowLine = turf.lineString(lngLatArray[0]);

    let visibleFlay = false;
    // 判断是否显示天地图 服务
    if (!turf.booleanDisjoint(cqLine, nowLine)) {
        // 交叉
        visibleFlay = true;
    } else {
        let nowPolygon = turf.polygon(lngLatArray);
        if (turf.booleanContains(cqPolygon, nowPolygon)) {
            // 没有 交叉 的时候 判断 包含 （因为包含的精度不太够）
            visibleFlay = false;
        } else {
            visibleFlay = true;
        }
    }

    if (visibleFlay) {
        switch (mapFlay) {
            case "dt":
                _setVecterDemMapVisibility(visibleFlay);
                break;

            case "img":
                _setTdtImageMapVisibility(visibleFlay);
                break;

            case "imgHQ":
                _setTdtHQImageMapVisibility(visibleFlay);
                break;

            case "dem":
                _setTdtDemMapVisibility(visibleFlay);
                break;

            default:
                break;
        }
    } else {
        _setVecterDemMapVisibility(visibleFlay);
        _setTdtImageMapVisibility(visibleFlay);
        _setTdtDemMapVisibility(visibleFlay);
        _setTdtHQImageMapVisibility(visibleFlay);
    }

};

/**
 * @function 设置蒙版可见性（私有）
 * @param （true：可见，false：不可见）
 * @returns null
 */
const _setMBVisibility = function () {

    try {
        let visibility = map.getLayoutProperty("dbsj_xzqhhgldy_qy_py_mb", "visibility");
        let img_visibility = map.getLayoutProperty("img_dbsj_xzqhhgldy_qy_py_mb", "visibility");
        let imgHQ_visibility = map.getLayoutProperty("HQ_img_dbsj_xzqhhgldy_qy_py_mb", "visibility");
        if (codeArray.length > 0) {
            switch (mapFlay) {
                case "dt":
                    if (visibility != "visible") {
                        map.setLayoutProperty("dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'visible');
                    }
                    break;
                case "img":
                    if (img_visibility != "visible") {
                        map.setLayoutProperty("img_dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'visible');
                    }
                    break;
                case "imgHQ":
                    if (imgHQ_visibility != "visible") {
                        map.setLayoutProperty("HQ_img_dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'visible');
                    }
                    break;

                default:
                    break;
            }

        } else {
            if (visibility != "none") {
                map.setLayoutProperty("dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'none');
            }
            if (img_visibility != "none") {
                map.setLayoutProperty("img_dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'none');
            }
            if (imgHQ_visibility != "none") {
                map.setLayoutProperty("HQ_img_dbsj_xzqhhgldy_qy_py_mb", 'visibility', 'none');
            }
        }
    } catch (error) {
        console.log("地图尚未加载完成，导致蒙版无法控制");
    }

}

/**
 * @function 设置天地图矢量服务可见性（私有）
 * @param （true：可见，false：不可见）
 * @returns null
 */
const _setVecterDemMapVisibility = function (value) {
    try {
        let visibility = map.getLayoutProperty("gjtdt_global-vecter-layer", "visibility");
        if (value) {
            if (visibility != "visible") {
                map.setLayoutProperty("gjtdt_global-vecter-layer", 'visibility', 'visible');
                map.setLayoutProperty("gjtdt_global-vecter-layer-symbol", 'visibility', 'visible');
            }
        } else {
            if (visibility != "none") {
                map.setLayoutProperty("gjtdt_global-vecter-layer", 'visibility', 'none');
                map.setLayoutProperty("gjtdt_global-vecter-layer-symbol", 'visibility', 'none');
            }
        }
    } catch (error) {
        console.log('gjtdt_global-vecter-layer 图层不存在');
    }

};

/**
 * @function 设置天地图影像服务可见性（私有）
 * @param （true：可见，false：不可见）
 * @returns null
 */
const _setTdtImageMapVisibility = function (value) {
    try {
        let visibility = map.getLayoutProperty("gjtdt_remote-scense-layer", "visibility");
        if (value) {
            if (visibility != "visible") {
                map.setLayoutProperty("gjtdt_remote-scense-layer", 'visibility', 'visible');
                map.setLayoutProperty("gjtdt_remote-scense-layer-symbol", 'visibility', 'visible');
            }
        } else {
            if (visibility != "none") {
                map.setLayoutProperty("gjtdt_remote-scense-layer", 'visibility', 'none');
                map.setLayoutProperty("gjtdt_remote-scense-layer-symbol", 'visibility', 'none');
            }
        }
    } catch (error) {
        console.log('gjtdt_remote-scense-layer 图层不存在');
    }

};

/**
 * @function 设置天地图HQ影像服务可见性（私有）
 * @param （true：可见，false：不可见）
 * @returns null
 */
const _setTdtHQImageMapVisibility = function (value) {
    try {
        let visibility = map.getLayoutProperty("gjtdt_HQ_remote-scense-layer", "visibility");
        if (value) {
            if (visibility != "visible") {
                map.setLayoutProperty("gjtdt_HQ_remote-scense-layer", 'visibility', 'visible');
                map.setLayoutProperty("gjtdt_HQ_remote-scense-layer-symbol", 'visibility', 'visible');
            }
        } else {
            if (visibility != "none") {
                map.setLayoutProperty("gjtdt_HQ_remote-scense-layer", 'visibility', 'none');
                map.setLayoutProperty("gjtdt_HQ_remote-scense-layer-symbol", 'visibility', 'none');
            }
        }
    } catch (error) {
        console.log('gjtdt_HQ_remote-scense-layer 图层不存在');
    }

};

/**
 * @function 设置天地图晕染服务可见性（私有）
 * @param （true：可见，false：不可见）
 * @returns null
 */
const _setTdtDemMapVisibility = function (value) {
    try {
        let visibility = map.getLayoutProperty("gjtdt_dem-layer", "visibility");
        if (value) {
            if (visibility != "visible") {
                map.setLayoutProperty("gjtdt_dem-layer", 'visibility', 'visible');
                map.setLayoutProperty("gjtdt_dem-layer-symbol", 'visibility', 'visible');
            }
        } else {
            if (visibility != "none") {
                map.setLayoutProperty("gjtdt_dem-layer", 'visibility', 'none');
                map.setLayoutProperty("gjtdt_dem-layer-symbol", 'visibility', 'none');
            }
        }
    } catch (error) {
        console.log('gjtdt_dem-layer 图层不存在');
    }

};

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
 * @returns minzoom(当前json中所有layer的最小出现层级),
 *          去重的source-layer逗号隔开的字符串,filter由|ZX|隔开的字符串
 */
const addLayerByCodeAndJson = function (code, json) {
    // 当前json的最小层级
    let minzoom = 22;

    // 装sourceLayer的数组
    let sourceLayer = [];

    // 装filter的数组
    let filterRes = {
        "layers": []
    };

    // 加source
    if (!sourcesName[code]) {
        sourcesName[code] = [];
        for (let k in json.sources) {
            try {
                map.addSource(k, json.sources[k]);
            } catch (error) {
                console.log("出现重复source");
            }

            // 记录 source 与 code 对应关系
            sourcesName[code].push(k);
        }
    }
    // 加layer 按code 删除时 会使layersId[code] = null
    if (!layersId[code]) {
        layersId[code] = [];
        json
            .layers
            .forEach(element => {
                let flay = true;
                if (element["layout"]) {
                    if (element["layout"]["visibility"]) {
                        if (element["layout"]["visibility"] == "none") {
                            flay = false;
                        }
                    }
                }
                // 不可见的图层不要
                if (flay) {
                    // 防止图层全中文
                    element.id += "_zt";
                    // 记录 添加图层 的 fitler
                    filterMap[element.id] = element.filter;

                    sourceLayer.push(element["source-layer"]);

                    if (element["filter"]) {
                        filterRes["layers"].push({"filter": element["filter"]});
                    }

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
                }

            });

        /* 闪烁*/

        setTimeout(() => {
            for (let i = 1; i < 5; i++) {
                setTimeout(function () {
                    if (i % 2 == 0) {
                        setVisibilityByCode(code, true);
                    } else {
                        setVisibilityByCode(code, false);
                    }
                }, i * 500)
            }
        }, 1000);

    }
    return {
        "minzoom": minzoom,
        "filter": filterRes,
        "sourceLayer": Array
            .from(new Set(sourceLayer))
            .join(",")
    };
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
            switch (map.getLayer(element).type) {
                case "circle":
                    map.setPaintProperty(element, 'circle-opacity', value);
                    break;
                case "line":
                    map.setPaintProperty(element, 'line-opacity', value);
                    break;
                case "fill":
                    map.setPaintProperty(element, 'fill-opacity', value);
                    break;
                case "symbol":
                    map.setPaintProperty(element, 'icon-opacity', value);
                    map.setPaintProperty(element, 'text-opacity', value);
                    break;
                case "fill-extrusion":
                    map.setPaintProperty(element, 'fill-extrusion-opacity', value);
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
    _setMBVisibility();
};

/**
 * @function 执行filter更改
 * @param 目录编码数组，行政区编码数组
 * @returns null
 */
const doFilterByCodeArrayAndAreacodeArray = function (_codeArray, _areacodeArray) {
    // 由于切换切换 全球视角功能 不一定会 触发 styleData 事件 所以重复给codeArray,areacodeArray复制
    if (_areacodeArray != areacodeArray) {
        areacodeArray = _areacodeArray
    }
    _codeArray.forEach(element => {
        if (layersId[element]) {

            let filter = ["any"];

            _areacodeArray.forEach(element => {
                filter.push([
                    "all",
                    [
                        ">=", "xzq_bm", element
                    ],
                    [
                        "<=", "xzq_bm", element + "z"
                    ]
                ]);
            });

            // 有区域编码时
            if (filter.length > 1) {
                // 如果有图层一定是数组
                layersId[element].forEach(element => {
                    if (!filterMap[element]) {
                        map.setFilter(element, filter);
                    } else {
                        map.setFilter(element, ["all", filterMap[element], filter]);
                    }
                });
            } else {
                layersId[element].forEach(element => {
                    if (!filterMap[element]) {
                        map.setFilter(element, null);
                    } else {
                        map.setFilter(element, filterMap[element]);
                    }
                });

            }

        }
    });
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
 * @function 设置小标注点(单点)的图标通过layerid
 * @param layerId,icon
 * @returns null
 */
const setMarkIconByLayerID = function(layerId,icon){
    if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'icon-image', icon);
    }

};

/**
 * @function 设置小标注点(单点)
 * @param layerId,geoPoint,_mapguid,text,textSize,icon,iconSize,minzoom,maxzoom
 * @returns null
 */
const setMarkToMap = function (layerId, geoPoint, _mapguid, text, textSize, icon, iconSize, minzoom, maxzoom) {
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
                        },
                        properties: {
                            mapguid: _mapguid
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
    try {
        map.addLayer(option);
    } catch (error) {
        console.log("添加Mark时,出现重复source");
    }

};

/**
 * @function 设置小标注点(多点)
 * @param layerId,geoPointArray, _mapguidArray,icon,iconSize,maxzoom
 * @returns null
 */
const setMarksToMap = function (layerId, geoPointArray, _mapguidArray, icon, iconSize, maxzoom) {
    let _features = [];
    for (let index = 0; index < _mapguidArray.length; index++) {
        _features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: geoPointArray[index]
            },
            properties: {
                mapguid: _mapguidArray[index]
            }
        });
    }

    let option = {
        id: layerId,
        type: "symbol",
        layout: {},
        paint: {},
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: _features
            }
        }
    }
    if (icon) {
        option.layout["icon-image"] = icon;
        option.layout["icon-size"] = iconSize;
    }

    if (maxzoom) {
        option["maxzoom"] = maxzoom;
    }

    try {
        map.addLayer(option);
    } catch (error) {
        console.log("添加Mark时,出现重复source");
    }
};

/**
 * @function 设置弹窗popup
 * @param 坐标 （数组）， _mapguid
 * @returns null
 */
const setPopupToMap = function (_geoPoint, _mapguid, _type) {
    closePopup();
    infoPopup = new window
        .d2c
        .Popup({closeButton: false})
        .setLngLat(_geoPoint)
        .setHTML("<div id = 'infoPopup'></div>")
        .addTo(map);
    infoPopup_vm = new Vue({
        el: '#infoPopup',
        store,
        router,
        template: '<v-infoPopup :mapguid="mapguid" :geoPoint="geoPoint" :type="type"/>',
        data: function () {
            return {mapguid: _mapguid, geoPoint: _geoPoint, type: _type}
        },
        components: {
            'v-infoPopup': infoPopupVm
        }
    })
};

/**
 * @function 关闭详情弹窗popup
 * @param
 * @returns null
 */
const closePopup = function () {
    if (infoPopup) {
        infoPopup.remove();
        infoPopup = null;
    }
    if (infoPopup_vm) {
        infoPopup_vm.$destroy();
        infoPopup_vm = null;
    }
    removeLayerById("highlightLayer");
};

/**
 * @function 设置图片弹窗popup
 * @param 坐标 （数组）， _mapguid
 * @returns null
 */
const setPicPopupToMap = function (geoPoint, _mapguid, _name, _areacode, _path) {
    closePicPopup();
    picPopup = new window
        .d2c
        .Popup({closeButton: false})
        .setLngLat(geoPoint)
        .setHTML("<div id = 'picPopup'></div>")
        .addTo(map);
    picPopup_vm = new Vue({
        el: '#picPopup',
        store,
        router,
        template: '<v-picPopup :mapguid="mapguid" :name="name" :areacode="areacode" :path="path"/>',
        data: function () {
            return {mapguid: _mapguid, name: _name, areacode: _areacode, path: _path}
        },
        components: {
            'v-picPopup': picPopupVm
        }
    })
};

/**
 * @function 关闭图片弹窗popup
 * @param
 * @returns null
 */
const closePicPopup = function () {
    if (picPopup) {
        picPopup.remove();
        picPopup = null;
    }
    if (picPopup_vm) {
        picPopup_vm.$destroy();
        picPopup_vm = null;
    }
    removeLayerById("highlightLayer");
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
    // 冒泡找到最大最小
    let xMax,
        xMin,
        yMax,
        yMin = null;

    lngLatBounds.forEach((element) => {
        // 0是x,1是y
        if (!xMax) {
            xMax = element[0];
        } else {
            if (xMax < element[0]) {
                xMax = element[0];
            }
        }
        if (!xMin) {
            xMin = element[0];
        } else {
            if (xMin > element[0]) {
                xMin = element[0];
            }
        }
        if (!yMax) {
            yMax = element[1];
        } else {
            if (yMax < element[1]) {
                yMax = element[1];
            }
        }
        if (!yMin) {
            yMin = element[1];
        } else {
            if (yMin > element[1]) {
                yMin = element[1];
            }
        }

    });

    map.fitBounds([
        [
            xMin, yMin
        ],
        [xMax, yMax]
    ]);
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
    setAllHQImageMapVisibility,

    setVisibilityByCode,
    setOpacityByCode,

    setFilterByCodeArrayAndAreacodeArray,
    doFilterByCodeArrayAndAreacodeArray,

    setMarkToMap,
    setMarksToMap,
    setMarkIconByLayerID,
    setPopupToMap,
    closePopup,
    setPicPopupToMap,
    closePicPopup,
    flyByPointAndZoom,
    flyByBounds,

    setBearing,
    setPitch,
    setCenter,

    getZoom,
    getCenter,
    getBounds,

    setMapFlay,
    setIsMeasure,
    measureOnClickCallback,
    onDbClickCallback,
    onRotateCallback,
    onInteractiveCallback,
    setHighLight,
    removeHighLight

}
