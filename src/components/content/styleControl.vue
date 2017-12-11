<template>
    <div id='styleControl'>
        <span>样式定制</span>
        <el-row>
          <el-col :span="12"><p>图层</p></el-col>
          <el-col :span="12">
            <el-select v-model="activeLayer" placeholder="请选择图层" @change="handleChange">
              <el-option
                v-for="(item,index) in layers"
                :key="index"
                :label="index"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><p>颜色</p></el-col>
          <el-col :span="12">
            <el-color-picker v-model="color" @change="handleColor"></el-color-picker></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><p>透明度</p></el-col>
          <el-col :span="12">
              <el-slider v-model="opacity" :step='0.1' :max='1' @change="handleOpacity"></el-slider>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import layers from '@/settings/styleControl'
export default {
  props: ['map'],
  name: 'styleControl',
  data () {
    return {
      layers: layers,
      validLayers: [],
      activeLayer: null,
      color: '',
      opacity: 0
    }
  },
  created () {
    this.getValideLayers()
  },
  methods: {
    getColor (layer) {
      const paint = this.map.getLayer(layer).paint
      for (const key in paint) {
        if (paint.hasOwnProperty(key)) {
          if (key.indexOf('color') === -1) continue
          this.color = this.map.getPaintProperty(layer, key)
          break
        }
      }
    },
    getValideLayers () {
      for (const key in this.layers) {
        if (!this.map.getLayer(this.layers[key])) {
          delete this.layers[key]
        }
      }
    },
    getOpacity (layer) {
      const paint = this.map.getLayer(layer).paint
      for (const key in paint) {
        if (paint.hasOwnProperty(key)) {
          if (key.indexOf('opacity') === -1) continue
          this.opacity = this.map.getPaintProperty(layer, key)
          break
        }
      }
    },
    setColor (color) {
      const paint = this.map.getLayer(this.activeLayer).paint
      for (const key in paint) {
        if (paint.hasOwnProperty(key)) {
          if (key.indexOf('color') === -1) continue
          this.map.setPaintProperty(this.activeLayer, key, color)
          break
        }
      }
    },
    setOpacity (opacity) {
      const paint = this.map.getLayer(this.activeLayer).paint
      for (const key in paint) {
        if (paint.hasOwnProperty(key)) {
          if (key.indexOf('opacity') === -1) continue
          this.map.setPaintProperty(this.activeLayer, key, opacity)
          break
        }
      }
    },
    handleOpacity (val) {
      if (!this.activeLayer) return
      this.setOpacity(val)
    },
    handleColor (val) {
      if (!this.activeLayer) return
      this.setColor(val)
    },
    handleChange (val) {
      this.activeLayer = val
      this.getColor(val)
      this.getOpacity(val)
    }
  }
}
</script>
<style lang="scss" scoped>
#styleControl {
  span{
    border-bottom: 1px solid rgb(204, 204, 204);
    display: block;
    padding: 5px 0px;
    margin-bottom: 5px
  }
  width: 240px;
}

.check-item{
  line-height: 25px;
}

.el-checkbox-group{
  margin-top: 10px;
}

.el-select{
  width: 120px;
}

</style>
