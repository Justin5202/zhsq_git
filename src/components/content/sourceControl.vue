<template>
    <div id="sourceControl">
      <p>资源目录</p>
      <el-collapse accordion>
        <el-collapse-item v-for="(col,index) in mapSource" :key="index" :title="col.name" :name="index">
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="服务名称" prop="name" :show-overflow-tooltip='true'>
                </el-table-column>
              </el-table>
        </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
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
      if (rows) {
        rows.forEach(row => {
          this.$refs.childTable.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.childTable.clearSelection()
      }
    },
      /**
       * @description 选择
       * @param {Array} checked
       */
    handleSelectionChange (val) {},
    /**
     * @description 全选
     */
    handleSelectALl (selection) {},
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
      this.$store.commit('UPDATE_ACTIVE_SOURCE', compared)
      let add = false
      add = compared.some(newRow => {
        if (row.name === newRow.name) {
          return true
        }
      })
      this.updateStyle(row.url, add)
    },
    handleKey (row) {
      return row.id
    },
    /**
     * @description 定位
     */
    handleCell (row, column, cell, event) {
      if (column.type === 'default') {
        const style = this.mapStyles[row.url]
        this.$parent.$children[0].map.flyTo({
          center: style.center,
          zoom: style.zoom
        })
      }
    },
    /**
     * @description 更新style
     */
    updateStyle (url, add) {
      const map = this.$parent.$children[0].map
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
