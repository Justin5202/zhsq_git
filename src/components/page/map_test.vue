<template>
  <div id="map_test" :style="style">
    <v-map @style-load="handleMapLoad" ref="d2cmap" :option='option'/>
    <!-- <v-source-control class="source_control" :map='mainMap'/>
    <v-tool-bar :map='mainMap'/> -->
  </div>
</template>

<script>
import mWindow from '@/util/window'
import mapOption from '@/settings/map'

import vMap from '@/components/common/d2cmap'
export default {
  name: 'test_map',
  beforeMount() {
    if(this.from) {
      window.location.reload()
    }
  },
  components: {
    vMap
  },
  beforeRouteEnter(to, from, next) {
    if(from.path == '/login') {
      next( vm => {
        vm.from = from.path
      })
    }
  },
  mixins: [mWindow],
  data () {
    return {
      option: mapOption,
      mainMap: null,
      from: ''
    }
  },
  computed: {
    style () {
      return {
        height: this.window.height + 'px',
        width: this.window.width + 'px'
      }
    }
  },
  created() {
  },
  methods: {
    // 地图加载完成时执行
    handleMapLoad (e) {
      // e.tartet: map
      this.$store.commit(this.$types.SET_MAIN_MAP, e.target)
      this.mainMap = e.target
    }
  }
}
</script>

<style lang="scss" scoped>
.source_control{
  position: absolute;
  top: 50px;
  left: 0px;
  box-shadow: 0px 0px 1px 1px #888888;
}
</style>
