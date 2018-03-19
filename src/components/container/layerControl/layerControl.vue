<template>
  <div class="layer-table">
    <div class="layer-box" v-show="(activeAreaInfoList.length + searchItemMacroList.length) !== 0">
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
            v-for="(item, index) in activeAreaInfoList"
            v-if="item.children.length ===0 && item.isActive"
          >
            <div class="check-item">
              <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              <div class="cross-box">
                <i class="cross-icon" @click="removeItem(item.id)"></i>
              </div>
            </div>
            <div class="slider-box" v-if="checkedTransparency">
              <el-slider v-model="transparencyArray[index]" @change="setLayerOpacity(index)"></el-slider>
            </div>
          </div>
          <div
            v-for="item in activeAreaInfoList"
            v-if="item.children.length > 0"
          >
            <div class="check-box"
              v-for="v in item.children"
              v-if="v.isActive"
            >
              <div class="check-item">
                <el-checkbox :label="v.name" :key="v.name"></el-checkbox>
                <div class="cross-box">
                  <i class="cross-icon" @click="removeItem(v.id)"></i>
                </div>
              </div>
              <div class="slider-box" v-if="checkedTransparency">
                <el-slider v-model="value1"></el-slider>
              </div>
            </div>
          </div>
          <div class="check-box"
            v-for="item in searchItemMacroList"
            v-if="item.isActive"
          >
            <div class="check-item">
              <el-checkbox :label="item.macro.data.name" :key="item.macro.data.name"></el-checkbox>
              <div class="cross-box">
                <i class="cross-icon" @click="removeSearchItem(item)"></i>
              </div>
            </div>
            <div class="slider-box" v-if="checkedTransparency">
              <el-slider v-model="value1"></el-slider>
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
      checkedItem: this.checkedList,
      checkedTransparency: false,
      isIndeterminate: false,
      value1: '',
      transparencyArray: []
    }
  },
  watch: {
    checkedItem(newV, oldV) {
      // 获取newV少出的部分
      let lessArray = this.checkedList.filter(item => !newV.includes(item))
      if(lessArray.length > 0) {
        lessArray.map(v => this.$mapHelper.setVisibilityByCode(v, false))
      } else {
        this.checkedList.map(v => this.$mapHelper.setVisibilityByCode(v, true))
      }
    }
  },
  computed: {
    ...mapGetters([
      'activeAreaInfoList',
      'searchItemMacroList'
    ]),
    checkedList() {
      let temp = []
      let list = this.activeAreaInfoList
      list.map(v => temp.push(v.id))
      return temp
    },
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
    setLayerOpacity(index) {
      this.$mapHelper.setOpacityByCode(this.checkedList[index], this.transparencyArray[index]/100)
    },
    handleCheckAllChange(val) {
      this.checkedItem = val ? this.checkedList : []
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      let checkedCount = value.length
      this.checked = checkedCount === this.checkedItem.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedList.length
    },
    removeAll() {
      this.removeAllAreaList()
    },
    removeItem(id) {
      this.setAreaList({'bol': false, 'id': id})
    },
    removeSearchItem(item) {
      this.removeSearchItem(item)
    },
    ...mapActions([
      'setAreaList',
      'removeAllAreaList',
      'removeSearchItem'
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
            .layer-check {
              label {
                margin-left: 5px;
                font-size: 13px;
              }
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
</style>
