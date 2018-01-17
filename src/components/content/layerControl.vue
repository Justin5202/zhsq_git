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
export default {
  props: ['map'],
  name: 'layerControl',
  data () {
    return {
      activeLayers: [],
      validLayers: [],
      basemapLayers: this.map.option.style.layers.reduce((sum, layer) => {
        if (layer.aliasName) {
          sum[layer.aliasName] = layer.id
        } else {
          sum[layer.id] = layer.id
        }
        return sum
      }, {})
    }
  },
  computed: {
    mapStyles () {
      return this.$store.state.d2cmap.mapStyles
    },
    activeSource () {
      return this.$store.state.d2cmap.activeSource.map(source => source.url)
    },
    layers () {
      const result = {...this.basemapLayers}
      // key:aliasName value:id
      this.activeSource.reduce((sum, value) => {
        this.mapStyles[value].layers.map(layer => {
          if (layer.aliasName) {
            sum[layer.aliasName] = layer.id
          } else {
            sum[layer.id] = layer.id
          }
        })
        return sum
      }, result)
      return result
    }
  },
  watch: {
    layers () {
      this.updateActiveLayers()
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
      this.validLayers = []
      this.activeLayers = []
      for (const key in this.layers) {
        if (this.map.getLayer(this.layers[key])) {
          this.validLayers.push(key)
          if (
            this.map.getLayoutProperty(this.layers[key], 'visibility') !==
            'none'
          ) {
            this.activeLayers.push(key)
          }
        }
      }
    },
    // 隐藏所有layer
    hideAll () {
      this.validLayers.map(item => {
        this.map.setLayoutProperty(this.layers[item], 'visibility', 'none')
      })
    },
    showLayers (arr) {
      arr.map(item => {
        this.map.setLayoutProperty(this.layers[item], 'visibility', 'visible')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#layerControl {
  span {
    border-bottom: 1px solid rgb(204, 204, 204);
    display: block;
    padding: 5px 0px;
    text-align: center;
  }
  max-height: 500px;
  overflow-y: scroll;
  font-size: 14px;
  padding: 10px 20px 5px;
  .check-item {
    text-align: left;
    font-size: 24px;
  }
}

.check-item {
  line-height: 25px;
}

.el-checkbox-group {
  margin-top: 10px;
}
</style>
