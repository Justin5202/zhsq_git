<template>
  <div id="map_test" :style="style">
    <v-map ref="d2cmap" />
  </div>
</template>

<script>
import mWindow from '@/util/window'
import vMap from '@/components/common/d2cmap'
export default {
  name: 'test_map',
  components: {
    vMap
  },
  mixins: [mWindow],
  data() {
    return {
    }
  },
  computed: {
    style() {
      return {
        height: this.window.height + 'px',
        width: this.window.width + 'px'
      }
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style >

</style>
