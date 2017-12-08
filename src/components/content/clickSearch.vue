<template>
  <div id="clickSearch" v-show="this.data!==null">
    <p v-if="typeof data === 'string'">{{this.data}}</p>
    <el-row v-else v-for="(item,index) in data" :key="index">
      <el-col :span="12">
        <span>{{index}}</span>
      </el-col>
      <el-col :span="12">
        <span>{{item}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {searchLayers, client, index} from '@/settings/search'
export default {
  name: 'clickSearch',
  props: ['map'],
  data () {
    return {
      searchLayers,
      client,
      index,
      data: null,
      selection: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.setConfig()
      this.initSelection()
      this.bindEvent()
    },
    setConfig () {
      window.d2c.selectionLayer.LAYER.paint['fill-extrusion-base'] = {type: 'identity', property: '1'}
      window.d2c.selectionLayer.LAYER.paint['fill-extrusion-height'] = {type: 'identity', property: 'gd'}
    },
    initSelection () {
      this.selection = new window.d2c.selectionLayer(this.map, {
        cb: (features) => {
          const result = features.filter(feature => feature.layer.type === 'fill-extrusion')
          this.handleClick(result)
          return result
        },
        all: true
      })
    },
    bindEvent () {
      this.map.on('click', this.selection.add)
    },
    handleClick (feature) {
      if (!feature || feature.length === 0) {
        this.data = '暂无数据'
        return
      }
      try {
        this.client.searchProperty({
          index: this.index,
          mapguid: feature[0].properties.mapguid
        }, (error = '> click search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = null
          } else {
            this.data = res.hits.hits[0]._source
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    offEvent () {
      this.map.off('click', this.selection.add)
    },
    destroye () {
      this.offEvent()
      this.selection.clean()
    }
  },
  beforeDestroy () {
    this.destroye()
  }
}
</script>
<style lang="scss">
#clickSearch{
  overflow-y: scroll;
  max-height: 500px;
  line-height: 2em;
}
</style>
