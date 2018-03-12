<template>
  <div class="child-table-content">
    <ul v-if="areaInfoData.length!==0">
      <li class="child-table-content-li" :class="{active: areaInfoList.length !== falseLength}" @click="closeLiBox()">
        <div class="arrow">
          <i class="arrow-icon" :class="{down: isClose}"></i>
        </div>
        <div class="text">
          <h2>{{areaInfoData[0].name}}</h2>
          <p v-if="areaInfoData[0].target.length!==0">{{areaInfoData[0].target[0].areaname}} {{areaInfoData[0].target[0].year}}</p>
          <p v-if="areaInfoData[0].target.length!==0">{{areaInfoData[0].target[0].cityTarget}}</p>
        </div>
        <div class="detail" v-if="areaInfoData[0].target.length!==0">
          <i class="detail-icon"></i>
          <span>详情</span>
        </div>
        <div class="collection">
          <i class="collection-icon"></i>
        </div>
      </li>
      <ul v-show="isClose">
        <li class="child-table-content-li"
            v-for="childItem in areaInfoList"
            :class="{active: childItem.isActive}"
            @click="isActiveItem(childItem.isActive, childItem.name)"
        >
          <div class="blank"></div>
          <div class="text">
            <h2>{{childItem.name}}</h2>
            <p v-if="childItem.target.length!==0">{{childItem.target[0].areaname}} {{childItem.target[0].year}}</p>
            <p v-if="childItem.target.length!==0">{{childItem.target[0].cityTarget}}</p>
          </div>
          <div class="detail" v-if="childItem.target.length!==0">
            <i class="detail-icon"></i>
            <span>详情</span>
          </div>
          <div class="collection">
            <i class="collection-icon"></i>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
      data() {
        return {
          isClose: true
        }
      },
      computed: {
        ...mapGetters([
          'areaInfoData',
          'areaInfoList'
        ]),
        falseLength() {
          let len = 0
          this.areaInfoList.map(v => {
            if(!v.isActive) {
              len += 1
            }
          })
          return len
        }
      },
      methods: {
        closeLiBox() {
          this.isClose = !this.isClose
        },
        isActiveItem(bol, name) {
          this.setAreaList({'bol': !bol, 'name': name})
        },
        ...mapActions([
          'setAreaList'
        ])
      }
  }
</script>

<style lang="scss" scoped>

  .child-table-content {
    background-color: #fff;
    // background-color: #dcdfe6;
    .child-table-content-li {
      display: flex;
      padding: 10px 0 5px 0;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .blank {
        flex: 1;
      }
      .arrow {
        .arrow-icon {
          margin-top: -14px;
          display: block;
          width: 44px;
          height: 44px;
          background: url('../../../assets/images/catalog/arrow_close@2x.png') no-repeat;
          background-size: 100%;
        }
        .down {
          background: url('../../../assets/images/catalog/arrow_expand@2x.png') no-repeat;
          background-size: 100%;
        }
      }
      .text {
        flex: 2;
        flex-direction: column;
        text-align: left;
        h2 {
          font-size: 14px;
        }
        p {
          margin-top: 5px;
          font-size: 12px;
          color: #888;
        }
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .detail-icon {
          margin-top: 8px;
          display: block;
          width: 20px;
          height: 20px;
          background: url(../../../assets/images/catalog/文档@2x.png) no-repeat;
          background-size: 100%;
        }
        span {
          margin-top: 3px;
          font-size: 12px;
        }
      }
      .collection {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .collection-icon {
          display: block;
          width: 44px;
          height: 44px;
          background: url(../../../assets/images/catalog/不收藏@2x.png) no-repeat;
          background-size: 100%;
        }
      }
    }
    .active {
      background-color: #dcdfe6;
    }
  }
</style>
