<template>
  <div id="map_test" :style="style">
    <v-map ref="d2cmap" :option='option'/>
    <v-source-control class="source_control"/>
  </div>
</template>

<script>
import vMap from '../common/d2cmap'
import mWindow from '@/util/window'
import mapOption from '@/settings/option'
import vSourceControl from '../content/sourceControl'
export default {
  name: 'test_map',
  components: {
    vMap,
    vSourceControl
  },
  mixins: [mWindow],
  data () {
    return {
      option: mapOption()
    }
  },
  computed: {
    style () {
      return {
        height: this.window.height - 61 + 'px',
        width: this.window.width + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.source_control{
  position: absolute;
  top: 50px;
  left: 50px;
  box-shadow: 0px 0px 1px 1px #888888;
}
</style>

