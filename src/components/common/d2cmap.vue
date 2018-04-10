<template>
	<div id="map" ref="map" :style="style" class="wh100"></div>
</template>
<script>

import Vue from 'vue'
import {mapGetters,mapActions} from 'vuex'
import {getNewMapConfig,getNewMapJson} from '@/api/dataSheets'
export default {
	name: 'd2cmap',
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
	mounted(){
		this.getMapJsonAndImg()
	},
	methods: {
		resize() {
			window.d2cMap.resize()
		},
		// 规范底图style数据格式
		getConfig(data) {
			return {
				container: data.container || 'map',
				center: [106.60033668586209,29.65436210813256],
				bearing: data.bearing,
				zoom: 7,
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
					var order = res.data[i].m_order
					switch(order){
						case 1:
						getNewMapJson(res.data[0].m_url).then(res =>{
							sum ++ 
							dataArray.json['dt'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
<<<<<<< HEAD
						case'最新影像':
=======
						case 2:
>>>>>>> 094a8abe991abeadf06c9be27dc792f16b0794f6
						getNewMapJson(res.data[1].m_url).then(res =>{
							sum ++ 
							dataArray.json['img'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
						case 3:
						getNewMapJson(res.data[2].m_url).then(res =>{
							sum ++ 
							dataArray.json['dem'] = res
							if(sum == length){
								this.loadThisMap(dataArray)
								this.setNewMapJsonAndImg(dataArray)
							}
						})
						break
						case 4:
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
