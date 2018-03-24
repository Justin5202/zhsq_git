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
				center: data.center,
				bearing: data.bearing,
				zoom: data.zoom,
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
			var dataArray = {'json':[],'img':[],'name':[]}
			var sum = 0
			getNewMapConfig().then(res =>{
				for( var i in res.data){
					dataArray.img.push(res.data[i].mImage)
					dataArray.name.push(res.data[i].mName)
					getNewMapJson(res.data[i].mUrl).then(res =>{
						sum ++ 
						dataArray.json.push(res)
						if(sum == 4){
							this.setNewMapJsonAndImg(dataArray)
							window.d2cMap = this.$mapHelper.initMap(this.getConfig(dataArray.json[0]));
							this.$mapHelper.initImageAndDemMap(this.getLayerAndSourceFromOption(dataArray.json[1]),this.getLayerAndSourceFromOption(dataArray.json[2]),this.getLayerAndSourceFromOption(dataArray.json[3]));
							window.addEventListener('resize', this.resize);
						}
					})
				}
			})
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
