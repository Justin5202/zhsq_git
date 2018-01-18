<template>
  <div id="map" ref="map" :style="style" class="wh100">
  </div>
</template>
<script>
export default {
  name: 'd2cmap',
  props: ['option'],
  data () {
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
  mounted () {
    this.initOption(this.initMap)
  },
  beforeDestroy () {
    this.map.remove()
    this.map = null
  },
  methods: {
    initOption (next) {
      if (typeof this.option === 'string') {
        this.http.get(this.option).then(res => {
          const mapOption = this.getConfig(res.data)
          next(mapOption)
        })
      } else {
        next(this.option)
      }
    },
    initMap (option) {
      this.$refs.map.id = option.container
      this.map = new window.d2c.map(option)
      this.map.on('style.load', (e) => this.$emit('style-load', e))
      this.map.option = option
      window.addEventListener('resize', this.resize)
    },
    resize () {
      this.map.resize()
    },
    getConfig (data) {
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
          layers: data.layers
        }
      }
    }
  }
}
</script>

<style>
  #map canvas{
    top: 0;
    left: 0;
  }
</style>
