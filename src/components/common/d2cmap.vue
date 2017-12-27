<template>
  <div id="map" class="wh100"></div>
</template>
<script>
export default {
  name: 'd2cmap',
  props: ['option'],
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.initMap()
  },
  beforeDestroy () {
    this.map.remove()
    this.map = null
  },
  methods: {
    initMap () {
      if (typeof this.option === 'string') {
        this.http.get(this.option).then(res => {
          const mapOption = this.getConfig(res.data)
          this.map = new window.d2c.map(mapOption)
          this.map.option = mapOption
        })
      } else {
        this.map = new window.d2c.map(this.option)
        this.map.option = this.option
      }
      window.addEventListener('resize', this.resize)
      this.$store.commit('SET_MAP', this.map)
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
