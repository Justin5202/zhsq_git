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
