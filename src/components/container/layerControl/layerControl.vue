<template>
  <div class="layer-table">
    <div class="layer-box">
      <div class="layer-title-box">
        <h2>图层</h2>
        <span class="trash-icon"></span>
      </div>
      <div class="radio-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checked" @change="handleCheckAllChange">全不选</el-checkbox>
        <el-checkbox v-model="checkedTransparency">透明度</el-checkbox>
      </div>
      <div class="layer-tool-arrow"></div>
      <div class="check">
        <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemsChange">
          <div class="check-item" v-for="item in areaInfoData[0].children">
            <el-checkbox :label="item.name" :key="item.name"></el-checkbox>
            <div class="cross-box">
              <i class="cross-icon"></i>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      checked: true,
      checkedItem: [],
      checkedTransparency: false,
      isIndeterminate: false
    }
  },
  computed: {
    ...mapGetters([
      'areaInfoData'
    ])
  },
  methods: {
    handleCheckAllChange(val) {
      this.getCheckedItem()
      this.checkedItem = val ? this.checkedItem : []
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      let checkedCount = value.length
      this.checked = checkedCount === this.checkedItem.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedItem.length
    },
    getCheckedItem() {
      this.checkedItem = this.areaInfoData[0].children.map(item => item.name)
    }
  }
}
</script>

<style lang="scss" scoped>

.layer-table {
  .layer-box {
    background-color: #fff;
    font-size: 12px;
    .layer-title-box {
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      h2 {
        line-height: 40px;
      }
      .trash-icon {
        display: block;
        width: 40px;
        height: 40px;
        background: url(../../../assets/images/legend/allDelLayers@2x.png) no-repeat;
        background-size: 100%;
      }
    }
    .radio-box {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background-color: #e4e7ed;
    }
    .check {
      position: relative;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
        .el-checkbox-group {
          .check-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            .el-checkbox+.el-checkbox {
              margin-left: 0;
              margin-top: 23px;
            }
            .cross-box {
              .cross-icon {
                display: block;
                width: 40px;
                height: 40px;
                background: url('../../../assets/images/catalog/关闭搜索.png') no-repeat;
                background-size: 100%;
              }
            }
          }
        }
    }
  }
}
</style>
