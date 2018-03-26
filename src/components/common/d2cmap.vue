<template>
	<div id="map" ref="map" :style="style" class="wh100"></div>
</template>
<script>
import dt from './config/dt'
import dem from './config/dem'
import img from './config/img'
import infoTemp from '../page/testPage'
import Vue from 'vue'
import {mapGetters,mapActions} from 'vuex'
import {getNewMapConfig,getNewMapJson} from '@/api/dataSheets'
export default {
	name: 'd2cmap',
	props: [
		'option',
	],
	data() {
		return {
			style: {
				left: 0,
				top: 0,
				position: 'absolute',
				textAlign: 'left'
			}
		}
	},
	created(){
		this.getMapJsonAndImg()
	},
	mounted() {
		// this.initOption(this.initMap);
		// 后加的
	},
	methods: {
		resize() {
			window.d2cMap.resize()
		},
		// 规范底图style数据格式
		getConfig(data) {
			return {
				container: data.container || 'map',
				center: [106.57064820281084,29.55623360001735],
				bearing: data.bearing,
				zoom: 10,
				maxzoom: data.maxzoom || 18,
				minzoom: data.minzoom || 0,
				style: {
					version: data.version || 8,
					glyphs: data.glyphs,
					sprite: data.sprite,
					sources: data.sources,
					layers: data.layers,
					metadata: data.metadata
				}
			}
		},
		// 获取影像option中的 layer 和 source
		getLayerAndSourceFromOption(option){
			let res = {};
			res["layers"] = option.layers;
			res["sources"] = option.sources;
			return res;
		},
		//获取底图Json
		getMapJsonAndImg(){
			var dataArray = {'json':{},'img':[],'name':[]}
			var sum = 0
			getNewMapConfig().then(res =>{
				for( var i in res.data){
					dataArray.img.push(res.data[i].m_image)
					dataArray.name.push(res.data[i].m_name)
					var length = res.data.length
					var name = res.data[i].m_name
					switch(name){
						case'矢量':
						getNewMapJson(res.data[0].m_url).then(res =>{
							sum ++ 
							dataArray.json['dt'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
						case'影像':
						getNewMapJson(res.data[1].m_url).then(res =>{
							sum ++ 
							dataArray.json['img'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
						case'渲染':
						getNewMapJson(res.data[2].m_url).then(res =>{
							sum ++ 
							dataArray.json['dem'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
						case'高清影像':
						getNewMapJson(res.data[3].m_url).then(res =>{
							sum ++ 
							dataArray.json['img_HQ'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
					}
				}
			})
		},
		//加载地图
		loadThisMap(data){
			window.d2cMap = this.$mapHelper.initMap(this.getConfig(data.json['dt']));
			this.$mapHelper.initImageAndDemMap(this.getLayerAndSourceFromOption(data.json['img']),this.getLayerAndSourceFromOption(data.json['dem']),this.getLayerAndSourceFromOption(data.json['img_HQ']));
			window.addEventListener('resize', this.resize);
		},
		...mapActions([
			'setUuidInfo',
			'setNewMapJsonAndImg'
		])
	}
}
</script>

<style>
#map canvas {
  top: 0;
  left: 0;
}
</style>
