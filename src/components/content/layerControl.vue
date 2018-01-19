<template>
    <div id='layerControl'>
        <span>图层控制</span>
        <el-checkbox-group 
          v-model="activeLayers" 
          @change="handleItemChange">
          <div 
            @dragover='allowDrop'
            ref='draglist'>
            <div
              draggable 
              class="check-item" 
              v-for="(layer,index) in validLayers" 
              :key="layer"
              :ref="`layer${index}`"
              :id="layer"
              @dragstart="(event)=>handleDragStart(event,index)"
              @drop="(event)=>handleDrop(event,index)">
              <el-checkbox :label="layer" />
            </div>
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
          let name = layer.aliasName
          if (name in sum) {
            name = name + (this.getAliasCount(name, sum) + 1)
          }
          sum[name] = layer.id
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
            let name = layer.aliasName
            if (name in sum) {
              name = name + (this.getAliasCount(name, sum) + 1)
            }
            sum[name] = layer.id
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
    allowDrop (event) {
      event.preventDefault()
    },
    handleItemChange (val) {
      this.hideAll()
      this.showLayers(val)
    },
    handleDragStart (event, index) {
      event.dataTransfer.setData('index', index)
    },
    handleDrop (event, index) {
      const dragIndex = event.dataTransfer.getData('index')
      const current = this.$refs[`layer${dragIndex}`][0]
      const target = event.target.parentNode.parentNode
      const parent = current.parentNode
      const currentIndex = this.getDragOrder(dragIndex)
      const targetIndex = this.getDragOrder(index)
      if (parent.firstElementChild === target) {
        parent.insertBefore(current, parent.firstElementChild)
      } else if (parent.lastElementChild === target) {
        parent.appendChild(current)
      } else if (parseInt(currentIndex) < parseInt(targetIndex)) {
        parent.insertBefore(current, this.$refs.draglist.children[targetIndex + 1])
      } else {
        parent.insertBefore(current, target)
      }
      const currentLayer = this.layers[this.$refs[`layer${dragIndex}`][0].id]
      const targetLayer = this.layers[this.$refs[`layer${index}`][0].id]
      if (parseInt(currentIndex) < parseInt(targetIndex)) {
        this.map.moveLayer(currentLayer, targetLayer)
      } else {
        this.map.moveLayer(targetLayer, currentLayer)
      }
    },
    getAliasCount (name, sum) {
      let count = 0
      for (let key in sum) {
        if (key.indexOf(name) !== -1) {
          count++
        }
      }
      return count
    },
    getDragOrder (dragIndex) {
      const currentChild = this.$refs[`layer${dragIndex}`][0]
      let result
      Array.prototype.map.call(this.$refs.draglist.children, (child, index) => {
        if (child === currentChild) {
          result = index
          return index
        }
      })
      return result
      // return result
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
      this.validLayers.reverse()
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
