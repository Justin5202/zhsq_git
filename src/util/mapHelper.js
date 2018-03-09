/**
 * author:wangsy
 * time:20180309
 * des：地图交互操作
 */

// 加图层
export function addJson (_json) {
    // 加source
    for(let k in _json.sources) {
        window.d2cMap.addSource(k,_json.sources[k]);
    }
    // 加layer
    _json.layers.forEach(element => {
        window.d2cMap.addLayer(element);
    });
}