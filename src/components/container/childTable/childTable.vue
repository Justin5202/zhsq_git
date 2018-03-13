<template>
  <div class="child-table-content">
    <ul v-if="areaInfoData.length!==0">
      <li class="child-table-content-li" :class="{active: activeAreaInfoList.length == falseLength}" @click="closeLiBox()">
        <div class="arrow">
          <i class="arrow-icon" :class="{down: isClose}"></i>
        </div>
        <div class="text">
          <h2>{{areaInfoData[0].name}}</h2>
          <p v-if="areaInfoData[0].target.length!==0">{{areaInfoData[0].target[0].areaname}} {{areaInfoData[0].target[0].year}}</p>
          <p v-if="areaInfoData[0].target.length!==0">{{areaInfoData[0].target[0].cityTarget}}</p>
        </div>
        <div class="detail" v-if="areaInfoData[0].target.length!==0">
          <i class="detail-icon" :class="{avtiveDetailIcon: areaInfoList.length === falseLength}"></i>
          <span :class="{activeColor: areaInfoList.length === falseLength}">详情</span>
        </div>
        <div class="collection">
          <i class="collection-icon"></i>
        </div>
      </li>
      <ul v-show="isClose">
        <li class="child-table-content-li"
            v-for="childItem in areaInfoList"
            v-if="childItem.children.length === 0"
            :class="{active: childItem.isActive}"
        >
          <div class="sec-blank"></div>
          <div class="text" @click="isActiveItem(childItem.isActive, childItem.name)">
            <h2>{{childItem.name}}</h2>
            <p v-if="childItem.target.length!==0">{{childItem.target[0].areaname}} {{childItem.target[0].year}}</p>
            <p v-if="childItem.target.length!==0">{{childItem.target[0].cityTarget}}</p>
          </div>
          <div class="detail" v-if="childItem.target.length!==0">
            <i class="detail-icon" :class="{avtiveDetailIcon: !childItem.isActive}"></i>
            <span :class="{activeColor: !childItem.isActive}">详情</span>
          </div>
          <div class="collection">
            <i class="collection-icon"></i>
          </div>
        </li>
        <li class="child-table-content-li sec-child-li"
            v-for="(childItem, index) in areaInfoList"
            v-if="childItem.children.length > 0"
            :class="{active: childItem.isActive}"
        >
          <div class="sec-child-title">
            <div class="third-blank"></div>
            <div class="arrow" @click="thirdChildSlide(index)">
              <i class="arrow-icon" :class="{down: thirdChildIsShow && nowIndex === index}"></i>
            </div>
            <div class="text">
              <h2>{{childItem.name}}</h2>
              <p v-if="childItem.target.length!==0">{{childItem.target[0].areaname}} {{childItem.target[0].year}}</p>
              <p v-if="childItem.target.length!==0">{{childItem.target[0].cityTarget}}</p>
            </div>
            <div class="detail" v-if="childItem.target.length!==0">
              <i class="detail-icon" :class="{avtiveDetailIcon: !childItem.isActive}"></i>
              <span :class="{activeColor: !childItem.isActive}">详情</span>
            </div>
            <div class="collection">
              <i class="collection-icon"></i>
            </div>
          </div>
          <ul v-show="thirdChildIsShow && nowIndex === index">
            <li class="child-table-content-li"
                v-for="thirdChild in childItem.children"
                :class="{active: thirdChild.isActive}"
                @click="isActiveItem(thirdChild.isActive, thirdChild.name)"
            >
              <div class="fourth-blank"></div>
              <div class="text">
                <h2>{{thirdChild.name}}</h2>
                <p v-if="thirdChild.target.length!==0">{{thirdChild.target[0].areaname}} {{thirdChild.target[0].year}}</p>
                <p v-if="thirdChild.target.length!==0">{{thirdChild.target[0].cityTarget}}</p>
              </div>
              <div class="detail" v-if="thirdChild.target.length!==0">
                <i class="detail-icon" :class="{avtiveDetailIcon: !thirdChild.isActive}"></i>
                <span :class="{activeColor: !thirdChild.isActive}">详情</span>
              </div>
              <div class="collection">
                <i class="collection-icon"></i>
              </div>
            </li>
          </ul>
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
          isClose: true,
          thirdChildIsShow: false,
          nowIndex: ''
        }
      },
      computed: {
        ...mapGetters([
          'areaInfoData',
          'areaInfoList',
          'activeAreaInfoList'
        ]),
        falseLength() {
          let len = 0
          this.areaInfoList.map(v => {
            if(v.children.length > 0) {
              v.children.map(i => {
                if(!i.isActive) {
                  len += 1
                }
              })
            } else {
              if(!v.isActive) {
                len += 1
              }
            }
          })
          console.log(len)
          return len
        }
      },
      methods: {
        closeLiBox() {
          this.isClose = !this.isClose
        },
        thirdChildSlide(index) {
          this.thirdChildIsShow = !this.thirdChildIsShow
          this.nowIndex = index
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
    max-height: 635px;
    background-color: #fff;
    overflow-y: scroll;
    .child-table-content-li {
      display: flex;
      padding: 10px 0 5px 0;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .sec-child-title {
        display: flex;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
      }
      .sec-blank {
        width: 50px;
      }
      .third-blank {
        width: 25px;
      }
      .fourth-blank {
        width: 80px;
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
        .avtiveDetailIcon {
          background: url(../../../assets/images/catalog/数据详情@2x.png) no-repeat;
          background-size: 100%;
        }
        span {
          margin-top: 3px;
          font-size: 12px;
          color: #58595c;
        }
        .activeColor{
          color: #20be8c;
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
    .sec-child-li {
      flex-direction: column;
      border-bottom: 0;
    }
  }
</style>
