<template>
    <div id='layerControl'>
        <span>图层控制</span>
        <el-checkbox-group v-model="activeLayers" @change="handleItemChange">
          <div class="check-item" v-for="layer in validLayers" :key="layer">
            <el-checkbox :label="layer" />
          </div>
        </el-checkbox-group>
    </div>
</template>
<script>
import layers from '@/settings/layerControl'
export default {
  props: ['map'],
  name: 'layerControl',
  data () {
    return {
      layers: layers,
      validLayers: [],
      activeLayers: []
    }
  },
  created () {
    this.updateActiveLayers()
  },
  methods: {
    handleItemChange (val) {
      this.hideAll()
      this.showLayers(val)
    },
    updateActiveLayers () {
      for (const key in this.layers) {
        if (this.map.getLayer(this.layers[key])) {
          this.validLayers.push(key)
          if (this.map.getLayoutProperty(this.layers[key], 'visibility') === 'visible') {
            this.activeLayers.push(key)
          }
        }
      }
    },
    // 隐藏所有layer
    hideAll () {
      this.validLayers.map((item) => {
        this.map.setLayoutProperty(this.layers[item], 'visibility', 'none')
      })
    },
    showLayers (arr) {
      arr.map((item) => {
        this.map.setLayoutProperty(this.layers[item], 'visibility', 'visible')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#layerControl {
  span{
    border-bottom: 1px solid rgb(204, 204, 204);
    display: block;
    padding: 5px 0px;
  }
}

.check-item{
  line-height: 25px;
}

.el-checkbox-group{
  margin-top: 10px;
}
</style>
