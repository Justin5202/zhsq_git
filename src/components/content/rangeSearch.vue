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
        <el-table-column label="名称" width="200" :show-overflow-tooltip='true'>
          <template slot-scope="scope">{{ scope.row._source.Name_CHN && scope.row._source.Name_CHN.trim() || '暂无名称' }}</template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {searchConfig, selectionConfig} from '@/settings/rangeSearch'
import {getPoint} from '@/util/map'
export default {
  name: 'rangeSearch',
  props: ['map'],
  data () {
    return {
      searchTypes: searchConfig.searchTypes,
      client: searchConfig.client,
      index: searchConfig.index,
      searchSize: searchConfig.searchSize,
      searchSource: searchConfig.searchSource,
      selectionConfig,
      getPoint,
      draw: null,
      data: null,
      layer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initDraw()
      this.initLayer()
      this.initMarker()
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
      delete this.selectionConfig.source
      this.layer = this.map.addGeoLayer(this.selectionConfig)
    },
    initMarker () {
      this.el = document.createElement('i')
      this.el.className = 'el-icon-location'
      this.el.style.fontSize = '24px'
      this.el.style.color = '#409eff'
      this.marker = new window.d2c.Marker(this.el)
    },
    updateLayer () {
      const geojsons = this.data.map(item => ({
        geometry: item._source.geometry,
        type: 'Feature'
      }))
      this.map.setGeojson(this.selectionConfig.id, {
        type: 'FeatureCollection',
        features: geojsons
      })
    },
    updateMarker (point) {
      this.marker
        .setLngLat(point)
        .addTo(this.map)
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
      const point = this.getPoint(row._source.geometry.coordinates)
      this.updateMarker(point)
      this.map.flyTo({
        center: point,
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
          type: this.searchTypes,
          coordinates: feature.geometry.coordinates,
          size: this.searchSize,
          _source: this.searchSource
        }, (error = '> click search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = '暂无数据'
          } else {
            this.data = res.hits.hits
            this.updateLayer()
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
    removeLayer () {
      this.map.removeGeoLayer(this.selectionConfig.id)
    },
    removeMarker () {
      this.marker && this.marker.remove()
    },
    destroye () {
      this.offEvent()
      this.draw.changeMode('simple_select')
      this.removeLayer()
      this.removeMarker()
    }
  },
  beforeDestroy () {
    this.destroye()
  }
}
</script>
<style lang="scss">
#rangeSearch{
  .el-table .cell.el-tooltip{
    cursor: pointer;
  }
  overflow-y: scroll;
  max-height: 500px;
  line-height: 2em;
  .el-table th{
    text-align: center!important
  }
  padding: 5px 10px 0px;
}
</style>
