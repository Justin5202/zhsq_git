<template>
  <div id="map_test" :style="style">
    <v-map :option='option'/>
  </div>
</template>

<script>
import vMap from '../common/d2cmap'
import mWindow from '../../util/window'
import mapOption from '../../settings/option'
export default {
  name: 'test_map',
  components: {
    vMap
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

</style>

