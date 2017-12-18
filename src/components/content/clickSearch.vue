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
import {queryFilter, selectionConfig, searchConfig} from '@/settings/clickSearch'
export default {
  name: 'clickSearch',
  props: ['map'],
  data () {
    return {
      selectionConfig,
      queryFilter,
      client: searchConfig.client,
      index: searchConfig.index,
      query: searchConfig.query,
      data: null,
      selection: null,
      layer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.bindEvent()
      this.initLayer()
    },
    initLayer () {
      delete this.selectionConfig['source']
      delete this.selectionConfig['source-layer']
      this.layer = this.map.addGeoLayer(this.selectionConfig)
    },
    bindEvent () {
      this.map.on('click', this.handleClick)
    },
    handleClick (e) {
      let features = this.map.queryRenderedFeatures(e.point)
      if (!features || features.length === 0) {
        this.data = '暂无数据'
        return
      }
      if (this.queryFilter)features = this.queryFilter(features)
      if (features.length === 0) return
      this.search(features)
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
            this.updateLayer()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    updateLayer () {
      const feature = {
        geometry: this.data.geometry,
        type: 'Feature'
      }
      this.map.setGeojson(this.selectionConfig.id, {
        type: 'FeatureCollection',
        features: [feature]
      })
    },
    offEvent () {
      this.map.off('click', this.handleClick)
    },
    removeLayer () {
      this.map.removeGeoLayer(this.selectionConfig.id)
    },
    destroye () {
      this.offEvent()
      this.removeLayer()
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
