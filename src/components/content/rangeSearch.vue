<template>
  <div id="rangeSearch" v-show="this.data!==null">
    <p v-if="typeof data === 'string'">{{this.data}}</p>
      <el-table
        v-else
        :data="data"
        stripe
        style="width: 100%"
        @row-click="handleRowClick">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="_id"
          label="图层名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_index"
          label="mapguid"
          width="180">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {searchTypes, client, index, searchSize, searchSource} from '@/settings/search'
import selection from '@/settings/selection'
export default {
  name: 'rangeSearch',
  props: ['map'],
  data () {
    return {
      draw: null,
      searchTypes,
      client,
      index,
      searchSize,
      searchSource,
      selection,
      data: null,
      layer: null,
      layerId: 'rangeSearch'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initDraw()
      this.initLayer()
    },
    initDraw () {
      if (this.map.draw) {
        this.draw = this.map.draw
      } else {
        this.draw = new window.d2c.draw({
          displayControlsDefault: false
        })
        this.map.draw = this.draw
        this.map.addControl(this.draw)
      }
      this.draw.changeMode('draw_polygon')
      this.bindEvent()
    },
    initLayer () {
      this.selection = Object.assign({}, this.selection, {id: this.layerId})
      console.log(selection)
      this.layer = this.map.addGeoLayer(this.selection)
    },
    bindEvent () {
      this.map.on('draw.create', this.handleDraw)
      this.map.on('draw.modechange', this.handleMode)
    },
    handleDraw (e) {
      this.draw.deleteAll()
      this.search(e.features[0])
    },
    handleRowClick (row, event, column) {
      this.map.flyTo({
        center: row._source.geopoint,
        zoom: 16
      })
    },
    handleMode (e) {
      if (e.mode !== 'draw_polygon') this.draw.changeMode('draw_polygon')
    },
    search (feature) {
      try {
        this.client.searchSpace({
          index: this.index,
          type: this.type,
          coordinates: feature.geometry.coordinates,
          size: this.size,
          _source: this._source
        }, (error = '> click search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = '暂无数据'
          } else {
            this.data = res.hits.hits
          }
        })
      } catch (error) {
        console.log('> range search:', error)
      }
    },
    offEvent () {
      this.map.off('draw.create', this.handleDraw)
      this.map.off('draw.modechange', this.handleMode)
    },
    destroye () {
      this.offEvent()
      this.draw.changeMode('simple_select')
    }
  },
  beforeDestroy () {
    this.destroye()
  }
}
</script>
<style lang="scss">
#rangeSearch{
  overflow-y: scroll;
  max-height: 500px;
  line-height: 2em;
  .el-table th{
    text-align: center!important
  }
}
</style>
