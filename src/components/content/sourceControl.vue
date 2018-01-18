<template>
    <div id="sourceControl">
      <p>资源目录 <span><img :src="loadingImg" class="loading" v-show="isLoading"/></span></p>
      <el-collapse accordion>
        <el-collapse-item v-for="(col,index) in data" :key="index" :title="col.name" :name="index">
              <el-table 
                ref="childTable"
                id="innerTable" 
                :data="col.data"
                @selection-change="handleSelectionChange"
                @select="handleSelect"
                @select-all="handleSelectALl"
                @cell-click="handleCell"
                :show-header="false"
                :row-key="handleKey">
                <el-table-column type="index"></el-table-column>
                <el-table-column type="selection" :selectable="handleSelectable"></el-table-column>
                <el-table-column label="服务名称" prop="name" :show-overflow-tooltip='true'>
                </el-table-column>
              </el-table>
        </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import {deepClone} from '@/util/object.js'
export default {
  props: ['map'],
  data () {
    return {
      loadingImg: require('@/assets/images/loading.gif')
    }
  },
  computed: {
    data () {
      return this.mapSource && this.mapSource.map((child, index) => {
        return {
          ...child,
          data: child.data.map((item, index) => {
            return {
              ...item,
              id: item.name + index
            }
          })
        }
      })
    },
    mapSource () {
      return this.$store.state.d2cmap.mapSource
    },
    activeSource () {
      return this.$store.state.d2cmap.activeSource
    },
    mapStyles () {
      return this.$store.state.d2cmap.mapStyles
    },
    isLoading () {
      return this.$store.state.d2cmap.styleLoading || this.$store.state.d2cmap.sourceLoading
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_SOURCE')
  },
  watch: {
    mapSource (to, from) {
      this.$store.dispatch('LOAD_STYLE', to)
    }
  },
  methods: {
      /**
       * @description init checkbox
       * @param {Array} active
       */
    toggleSelection (rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.childTable.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.childTable.clearSelection()
        }
      })
    },
      /**
       * @description 选择
       * @param {Array} checked
       */
    handleSelectionChange (val) {
      // console.log(' ')
      // val.map(item => {
      //   console.log(item.name)
      // })
      // console.log(' ')
      // this.$store.commit('UPDATE_ACTIVE_SOURCE', val)
    },
    /**
     * @description 全选
     */
    handleSelectALl (selection) {
      // console.log(selection)
      // this.updateStyle()
    },
    /**
     * @description 单选
     */
    handleSelect (selection, row) {
      const length = this.activeSource.length
      const compared = this.activeSource.filter(source => {
        return row.name !== source.name
      })
      if (compared.length === length) {
        compared.push(row)
      }
      this.$store.commit(this.$types.UPDATE_ACTIVE_SOURCE, compared)
      let add = false
      add = compared.some(newRow => {
        if (row.name === newRow.name) {
          return true
        }
      })
      this.updateStyle2(row.url, add)
    },
    handleSelectable (row, index) {
      return row.url in this.mapStyles
    },
    handleKey (row) {
      return row.id
    },
    /**
     * @description 展开
     * @param {Object} cuurent
     * @param {Array} active
     */
    handleExpand (row, expand) {
      if (expand.length !== 0) {
        this.toggleSelection([...this.activeSource], true)
      }
    },
    /**
     * @description 定位
     */
    handleCell (row, column, cell, event) {
      if (column.type === 'default') {
        const style = this.mapStyles[row.url]
        this.map.flyTo({
          center: style.center,
          zoom: style.zoom
        })
      }
    },
    /**
     * @description 更新style
     */
    updateStyle () {
      const option = deepClone(this.$parent.option)
      const map = this.mapx
      Object.assign(option.style.sources, this.updateSources())
      this.updateSpriteAndGlyphs(option)
      map.setStyle(option.style, {diff: true})
      if (map.isStyleLoaded()) {
        this.updateLayers(map)
      } else {
        this.updateLayers(map)
      }
    },
    /**
     * @description 更新style
     */
    updateStyle2 (url, add) {
      const map = this.map
      let update = false
      const otherSource = {}
      if (add) {
        if (!map.style.stylesheet.glyphs || map.style.stylesheet.glyphs === '') {
          otherSource.glyphs = this.mapStyles[url].glyphs
          update = true
        }
        if (!map.style.stylesheet.sprite || map.style.stylesheet.sprite === '') {
          otherSource.sprite = this.mapStyles[url].sprite
          update = true
        }
      }
      if (this.mapStyles[url]) {
        const sources = this.mapStyles[url].sources
        const layers = this.mapStyles[url].layers
        if (update) {
          map.setStyle({
            ...map.style.stylesheet,
            ...otherSource,
            sources,
            layers
          })
          update = false
        } else {
          for (const index in sources) {
            if (map.style.stylesheet.sources[index]) {

            } else if (map.getSource(index)) {

            } else {
              map.addSource(index, sources[index])
            }
          }
          layers.map(layer => {
            if (map.getLayer(layer.id)) {
              if (add) {} else {
                map.removeLayer(layer.id)
              }
            } else {
              if (add) {
                map.addLayer(layer)
              } else {}
            }
          })
        }
      }
    },
    /**
     * @description 更新sources
     */
    updateSources () {
      const sources = {}
      this.activeSource.map((source) => {
        const url = source.url
        if (this.mapStyles[url]) {
          Object.assign(sources, this.mapStyles[url].sources)
        }
      })
      return sources
    },
    /**
     * @description 更新sprite glyphs
     */
    updateSpriteAndGlyphs (option) {
      this.activeSource.map((source) => {
        const url = source.url
        if (this.mapStyles[url]) {
          if (!option.style.glyphs || option.style.glyphs === '') {
            option.style.glyphs = this.mapStyles[url].glyphs
          }
          if (!option.style.sprite || option.style.sprite === '') {
            option.style.sprite = this.mapStyles[url].sprite
          }
        }
      })
    },
    /**
     * @description 更新图层
     */
    updateLayers (map) {
      console.log('render layers')
      this.activeSource.map((source) => {
        const url = source.url
        if (this.mapStyles[url]) {
          this.mapStyles[url].layers.map(layer => {
            if (map.getLayer(layer.id)) {

            } else {
              map.addLayer(layer)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
#sourceControl{
  background-color: white;
  text-align: left;
  max-height: calc(100% - 104px);
  width: 270px;
  overflow-y: scroll;
  .el-table .cell.el-tooltip{
    cursor: pointer;
  }
  .el-collapse-item__content{
    border-top: 1px solid #e6ebf5;
    padding-bottom: 0px;
  }
  .el-collapse{
    border-bottom: 0px;
  }
  .el-collapse-item:last-child{
    margin-bottom: -2px
  }
  p,.el-collapse-item__header{
    padding-left: 20px;
  }
  .loading{
    font-size: 14px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}

.el-table__expanded-cell{
  padding: 0px 0px!important;
}

#innerTable td:first-child,th:first-child{
  text-align: right;
}

#innerTable{
  max-height: 342px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  display:none;
}
</style>
