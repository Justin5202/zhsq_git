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
</div>  
</template>

<script>
import {client, index} from '@/settings/search'
import query from '@/settings/textSearch'
export default {
  name: 'textSearch',
  props: ['map'],
  data () {
    return {
      client,
      index,
      data: null,
      layer: null,
      layerId: 'textSearch',
      input: '',
      query
    }
  },
  methods: {
    handleRowClick (row, event, column) {
      this.map.flyTo({
        center: row._source.geopoint,
        zoom: 16
      })
    },
    handleInput (val) {
      this.search(val)
    },
    search (val) {
      try {
        this.client.searchFullText({
          index: this.index,
          query: this.query(val)
        }, (error = '> text search', res) => {
          if (res.hits.hits.length === 0) {
            this.data = '暂无数据'
          } else {
            this.data = res.hits.hits
          }
        })
      } catch (error) {
        console.log('> text search:', error)
      }
    }
  }
}
</script>
<style lang="scss">
#textSearch{
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
