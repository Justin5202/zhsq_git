<template>
    <div id='layerControl'>
        <span>图层控制</span>
        <el-checkbox-group 
          v-model="activeLayers" 
          @change="handleItemChange">
          <div 
            @dragover='allowDrop'
            ref='draglist'
           >
            <div 
              class="check-item" 
              draggable 
              @dragstart="(event)=>handleDragStart(event,index)"
              v-for="(layer,index) in validLayers" 
              :key="index"
              :ref="`layer${index}`"
              @drop="(event)=>handleDrop(event,index)">
              <el-checkbox :label="layer" />
            </div>
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
        return parent.insertBefore(current, parent.firstElementChild)
      } else if (parent.lastElementChild === target) {
        return parent.appendChild(current)
      }
      if (parseInt(currentIndex) < parseInt(targetIndex)) {
        parent.insertBefore(current, this.$refs.draglist.children[targetIndex + 1])
      } else {
        parent.insertBefore(current, target)
      }
    },
    allowDrop (event) {
      event.preventDefault()
    },
    getDragOrder (dragIndex) {
      const currentChild = this.$refs[`layer${dragIndex}`][0]
      let result
      Array.prototype.map.call(this.$refs.draglist.children, (child, index) => {
        if (child === currentChild) {
          debugger
          result = index
          return index
        }
      })
      return result
      // return result
    },
    updateActiveLayers () {
      for (const key in this.layers) {
        if (this.map.getLayer(this.layers[key])) {
          this.validLayers.push(key)
          if (
            this.map.getLayoutProperty(this.layers[key], 'visibility') ===
            'visible'
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
