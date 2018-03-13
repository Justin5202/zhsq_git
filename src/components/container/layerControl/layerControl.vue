<template>
  <div class="layer-table">
    <div class="layer-box" v-show="activeAreaInfoList.length !== falseLength">
      <div class="layer-title-box">
        <h2>图层</h2>
        <span class="trash-icon" @click="removeAll()"></span>
      </div>
      <div class="radio-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checked" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox v-model="checkedTransparency">透明度</el-checkbox>
      </div>
      <div class="layer-tool-arrow"></div>
      <div class="check">
        <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemsChange">
          <div class="check-box"
            v-for="item in areaInfoList"
            v-if="item.children.length ===0 && item.isActive"
          >
            <div class="check-item">
              <el-checkbox :label="item.name" :key="item.name"></el-checkbox>
              <div class="cross-box">
                <i class="cross-icon" @click="removeItem(item.name)"></i>
              </div>
            </div>
            <div class="slider-box" v-if="checkedTransparency">
              <el-slider v-model="value1"></el-slider>
            </div>
          </div>
          <div
            v-for="item in areaInfoList"
            v-if="item.children.length > 0"
          >
            <div class="check-box"
              v-for="v in item.children"
              v-if="v.isActive"
            >
              <div class="check-item">
                <el-checkbox :label="v.name" :key="v.name"></el-checkbox>
                <div class="cross-box">
                  <i class="cross-icon" @click="removeItem(v.name)"></i>
                </div>
              </div>
              <div class="slider-box" v-if="checkedTransparency">
                <el-slider v-model="value1"></el-slider>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      checked: true,
      checkedItem: [],
      checkedTransparency: false,
      isIndeterminate: false,
      value1: ''
    }
  },
  computed: {
    ...mapGetters([
      'activeAreaInfoList',
      'areaInfoList'
    ]),
    falseLength() {
      let len = 0
      this.activeAreaInfoList.map(v => {
        if(!v.isActive) {
          len += 1
        }
      })
      return len
    }
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
    removeAll() {
      this.removeAllAreaList()
    },
    removeItem(name) {
      this.setAreaList({'bol': false, 'name': name})
    },
    getCheckedItem() {
      this.checkedItem = this.activeAreaInfoList.map(item => item.name)
    },
    ...mapActions([
      'setAreaList',
      'removeAllAreaList'
    ])
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
        cursor: pointer;
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
          .check-box {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #e4e7ed;
          }
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
                cursor: pointer;
              }
            }
          }
          .slider-box {
            padding: 0 10px;
            padding-left: 17px;
            .el-slider__button{
              width: 10px;
              height: 10px;
            }
            .el-slider__runway {
              margin: 10px 0;
              padding-bottom: 5px;
            }
          }
        }
    }
  }
}
</style>
