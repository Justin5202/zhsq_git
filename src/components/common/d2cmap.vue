<template>
	<div id="map" ref="map" :style="style" class="wh100">
	</div>
</template>
<script>
export default {
	name: 'd2cmap',
	props: [
		'option',
	],
	data() {
		return {
			map: null,
			style: {
				left: 0,
				top: 0,
				position: 'absolute',
				textAlign: 'left'
			}
		}
	},
	mounted() {
		this.initOption(this.initMap);
		console.log(this.imgOption);
		console.log(this.demOption);
	},
	beforeDestroy() {
		this.map.remove()
		this.map = null
	},
	methods: {
		initOption(next) {
			if (typeof this.option === 'string') {
				this.http.get(this.option).then(res => {
					const mapOption = this.getConfig(res.data)
					next(mapOption)
				})
			} else {
				next(this.option)
			}
		},
		initMap(option) {
			option.container += new Date().getTime()
			this.$refs.map.id = option.container

			this.map = this.$mapHelper.initMap(option);
			this.$mapHelper.getGuidOnClickCallback(function (mapguid) { console.log(mapguid); });
			window.d2cMap = this.map

			this.map.option = option
			window.addEventListener('resize', this.resize)
		},
		resize() {
			this.map.resize()
		},
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
		}
	}
}
</script>

<style>
#map canvas {
  top: 0;
  left: 0;
}
</style>
