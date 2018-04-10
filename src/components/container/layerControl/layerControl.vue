<template>
  <div class="layer-table">
    <div class="layer-box" v-show="activeAreaInfoList.length !== 0">
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
            v-if="item.isActive"
          >
            <div class="check-item">
              <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              <div class="cross-box">
                <i class="cross-icon" @click="removeItem(item)"></i>
              </div>
            </div>
            <div class="slider-box" v-if="checkedTransparency">
              <el-slider v-model="transparencyList[index]" @change="setLayerOpacity(index)"></el-slider>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      checked: '',
      checkedItem: this.$store.state.checkedList,
      checkedTransparency: false,
      isIndeterminate: false,
      value1: '',
      transparencyList: this.$store.state.transparencyArray
    }
  },
  watch: {
    checkedItem(newV, oldV) {
      // 获取newV少出的部分
      let lessArray = this.checkedList.filter(item => !newV.includes(item))
      if (lessArray.length > 0) {
        lessArray.map(v => this.$mapHelper.setVisibilityByCode(v, false))
      } else {
        this.checkedList.map(v => this.$mapHelper.setVisibilityByCode(v, true))
      }
    }
  },
  created() {
    // 设置初始透明度100
    let len1 = this.checkedItem.length
    let len2 = this.checkedList.length
    if (len1 === 0) {
      this.checked = false
    } else if (len1 < len2) {
      this.isIndeterminate = false
      this.checked = false
    } else {
      this.checked = true
    }
  },
  computed: {
    ...mapGetters([
      'activeAreaInfoList',
      'transparencyArray',
      'checkedList'
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
        if (!v.isActive) {
          len += 1
        }
      })
      return len
    }
  },
  methods: {
    setLayerOpacity(index) {
      let obj = {
        index: index,
        value: this.transparencyList[index]
      }
      this.setTransparency(obj)
      this.$mapHelper.setOpacityByCode(this.checkedList[index], this.transparencyList[index] / 100)
    },
    handleCheckAllChange(val) {
      if (val) {
        this.setCheckedList(this.checkedList)
      } else {
        this.setCheckedList([])
      }
      this.checkedItem = val ? this.checkedList : []
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      console.log(this.checkedItem)
      let checkedCount = value.length
      this.checked = checkedCount === this.checkedList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedList.length
      this.setCheckedList(value)
    },
    removeAll() {
      this.removeAllAreaList()
      let obj = {
        id: -1,
        isShow: false
      }
      this.$store.commit("SET_TOOL_PANE_SHOW", obj)
    },
    removeItem(item) {
      this.setAreaList({ 'param': item })
    },
    removeSearchItem(item) {
      this.removeSearchItem(item)
    },
    ...mapActions([
      'setAreaList',
      'removeAllAreaList',
      'removeSearchItem'
    ]),
    ...mapMutations({
      setCheckedList: 'SET_CHECKED_LIST',
      setTransparency: 'SET_TRANSPARENCY'
    })
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
        background: url(../../../assets/images/legend/allDelLayers@2x.png)
          no-repeat;
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
      max-height: 328px;
      overflow: auto;
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
            background: url("../../../assets/images/catalog/关闭搜索.png")
              no-repeat;
            background-size: 100%;
            cursor: pointer;
          }
        }
      }
      .slider-box {
        padding: 0 20px;
        padding-left: 10px;
        .el-slider__button {
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
