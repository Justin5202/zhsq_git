<template>
  <div id="map" class="wh100">
    <v-toolbar :map='map'/>
  </div>
</template>
<script>
import vToolbar from '../container/toolbar'
export default {
  name: 'd2cmap',
  props: ['option'],
  components: {
    vToolbar
  },
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.initMap()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    this.map.remove()
    this.map = null
  },
  methods: {
    initMap () {
      this.map = new window.d2c.map(this.option)
      this.map.option = this.option
    },
    resize () {
      this.map.resize()
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
