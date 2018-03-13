<template>
    <div class="layer-table">
      <div class="layer-box">
        <div class="layer-title-box">
          <h2>区域</h2>
          <span class="trash-icon" @click="removeAll()"></span>
        </div>
        <div class="layer-tool-arrow"></div>
        <div class="check">
          <div class="check-item" v-for="item in areaList">
            <p>{{item.areaname}}</p>
            <div class="cross-box">
              <i class="cross-icon" @click="remove(item)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'areaList'
      ])
    },
    methods: {
      remove(areainfo) {
        this.setSelectedAreaList({'areainfo': areainfo, 'isRemoveAll': false})
      },
      removeAll() {
        this.setSelectedAreaList({'areainfo': '', 'isRemoveAll': true})
      },
      ...mapActions([
        'setSelectedAreaList',
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
      border-radius: 4px;
      .layer-title-box {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        border-bottom: 1px solid #e4e7ed;
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
      .check {
        position: relative;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
            .check-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 10px;
              border-bottom: 1px solid #e4e7ed;
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
      }
    }
  }
</style>
