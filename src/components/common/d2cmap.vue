<template>
	<div id="map" ref="map" :style="style" class="wh100"></div>
</template>
<script>
import dt from './config/dt'
import dem from './config/dem'
import img from './config/img'
import infoTemp from '../page/testPage'
import Vue from 'vue'
import {mapActions} from 'vuex'

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
	mounted() {
		// this.initOption(this.initMap);
		// 后加的
		window.d2cMap = this.$mapHelper.initMap(this.getConfig(dt));
		this.$mapHelper.initImageAndDemMap(this.getLayerAndSourceFromOption(img),this.getLayerAndSourceFromOption(dem));
		window.addEventListener('resize', this.resize);

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
		...mapActions([
			'setUuidInfo'
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
