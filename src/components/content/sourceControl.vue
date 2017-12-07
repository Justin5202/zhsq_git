<template>
    <div id="sourceControl">
        <el-table
            ref="sourceTable"
            :data="mapSource"
            tooltip-effect="dark"
            style="width: 300px"
            @expand-change="handleExpand">
            <el-table-column
              type="expand">
              <template slot-scope="scope">
                <el-table 
                  ref="childTable"
                  id="innerTable" 
                  :data="scope.row.data"
                  @selection-change="handleSelectionChange"
                  @select="handleSelect"
                  @select-all="handleSelectALl">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column type="selection" :reserveSelection="true"></el-table-column>
                  <el-table-column label="服务名称" prop="name" :show-overflow-tooltip='true'>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="服务类别"
              >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {deepClone} from '@/util/object.js'
export default {
  computed: {
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
      this.$store.commit('UPDATE_ACTIVE_SOURCE', val)
    },
      /**
       * @description 展开
       * @param {Object} cuurent
       * @param {Array} active
       */
    handleExpand (row, expand) {
      this.expand = true
      if (expand.length !== 0) {
        this.toggleSelection([...this.activeSource], true)
      }
    },
      /**
       * @description 更新style
       */
    updateStyle () {
      const option = deepClone(this.$parent.option)
      this.activeSource.map((source) => {
        const url = source.url
        if (this.mapStyles[url]) {
          // console.log('layers', this.mapStyles[url].layers)
          option.style.sources = {
            ...option.style.sources,
            ...this.mapStyles[url].sources
          }
          option.style.layers = option.style.layers.concat(this.mapStyles[url].layers)
          if (!option.style.glyphs || option.style.glyphs === '') {
            option.style.glyphs = this.mapStyles.glyphs
          }
          if (!option.style.sprite || option.style.sprite === '') {
            option.style.sprite = this.mapStyles.sprite
          }
        }
      })
      // console.log('> APPLY_SOURCE', option.style.sources)
      // console.log('> APPLY_LAYERS', option.style.layers)
      console.log('> APPLY_STYLE', option.style)
      this.$parent.$children[0].map.setStyle(option.style, {diff: true})
    },
    /**
     * @description 全选
     */
    handleSelectALl () {
      this.updateStyle()
    },
    /**
     * @description 单选
     */
    handleSelect () {
      this.updateStyle()
    }
  }
}
</script>
<style lang="scss">
#sourceControl{
  text-align: left;
  max-height: calc(100% - 100px);
  overflow-y: scroll;
}

.el-table__expanded-cell{
  padding: 0px 0px!important;
}

#innerTable td:first-child,th:first-child{
  text-align: center
}

#innerTable{
  max-height: 336px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  display:none;
}
</style>
