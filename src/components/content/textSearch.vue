<template>
<div id="textSearchContainer">
  <el-input v-model="input" @change="handleInput" placeholder="请输入内容"></el-input>
  <div id="textSearch" v-show="this.data!==null">
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
        <el-table-column label="地址" width="200" :show-overflow-tooltip='true'>
          <template slot-scope="scope">{{ scope.row._source.Address && scope.row._source.Address.trim() || '暂无地址' }}</template>
        </el-table-column>
      </el-table>
  </div>
</div>  
</template>

<script>
import {queryConfig, searchConfig, selectionConfig} from '@/settings/textSearch'
import {getPoint} from '@/util/map'
export default {
  name: 'textSearch',
  props: ['map'],
  data () {
    return {
      client: searchConfig.client,
      index: searchConfig.index,
      data: null,
      layer: null,
      input: '',
      queryConfig,
      selectionConfig,
      getPoint
    }
  },
  created () {
    this.initLayer()
    this.initMarker()
  },
  methods: {
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
    handleRowClick (row, event, column) {
      const point = this.getPoint(row._source.geometry.coordinates)
      // this.updateMarker(point)
      this.map.flyTo({
        center: point,
        zoom: 16
      })
    },
    handleInput (val) {
      this.search(val)
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
    search (val) {
      try {
        this.client.searchFullText({
          index: this.index,
          query: this.queryConfig(val)
        }, (error = '> text search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = '暂无数据'
          } else {
            this.data = res.hits.hits
            this.updateLayer()
          }
        })
      } catch (error) {
        console.log('> text search:', error)
      }
    },
    removeLayer () {
      this.map.removeGeoLayer(this.selectionConfig.id)
    },
    removeMarker () {
      this.marker && this.marker.remove()
    },
    destroye () {
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
#textSearch{
  .el-table .cell.el-tooltip{
    cursor: pointer;
  }
  overflow-y: scroll;
  max-height: 500px;
  line-height: 2em;
  .el-table th{
    text-align: center!important
  }
}

#textSearchContainer{
  border-radius: 4px 4px 0px 0px;
}
</style>
