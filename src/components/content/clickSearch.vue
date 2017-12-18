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
import {selectionConfig, selectionFilter, searchConfig} from '@/settings/clickSearch'
export default {
  name: 'clickSearch',
  props: ['map'],
  data () {
    return {
      selectionConfig,
      selectionFilter,
      client: searchConfig.client,
      index: searchConfig.index,
      query: searchConfig.query,
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
      window.d2c.selectionLayer.LAYER = this.selectionConfig
      // window.d2c.selectionLayer.LAYER.paint['fill-extrusion-base'] = {type: 'identity', property: '1'}
      // window.d2c.selectionLayer.LAYER.paint['fill-extrusion-height'] = {type: 'identity', property: 'gd'}
    },
    initSelection () {
      this.selection = new window.d2c.selectionLayer(this.map, {
        cb: (features) => {
          const result = this.selectionFilter(features)
          this.handleClick(result)
          return result
        }
      }, this.selectionConfig)
    },
    bindEvent () {
      this.map.on('click', this.selection.add)
    },
    handleClick (feature) {
      if (!feature || feature.length === 0) {
        this.data = '暂无数据'
        return
      }
      this.search(feature)
    },
    search (feature) {
      try {
        this.client.searchProperty({
          index: this.index,
          query: this.query(feature)
        }, (error = '> click search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = '暂无数据'
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
  padding: 5px 10px 0px;
}
</style>
