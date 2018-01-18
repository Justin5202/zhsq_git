<template>
  <div id="map_test" :style="style">
    <v-map @style-load="handleMapLoad" ref="d2cmap" :option='option'/>
    <v-source-control class="source_control"/>
    <v-tool-bar :map='$store.state.d2cmap.mainMap'/>
  </div>
</template>

<script>
import mWindow from '@/util/window'
import mapOption from '@/settings/map'

import vMap from '@/components/common/d2cmap'
import vSourceControl from '@/components/content/sourceControl'
import vToolBar from '@/components/container/toolbar.vue'
export default {
  name: 'test_map',
  components: {
    vMap,
    vSourceControl,
    vToolBar
  },
  mixins: [mWindow],
  data () {
    return {
      option: mapOption
    }
  },
  computed: {
    style () {
      return {
        height: this.window.height - 61 + 'px',
        width: this.window.width + 'px'
      }
    }
  },
  methods: {
    // 地图加载完成时执行
    handleMapLoad (e) {
      // e.tartet: map
      this.$store.commit(this.$types.SET_MAIN_MAP, e.target)
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

