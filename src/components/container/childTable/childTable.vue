<template>
<div class="child-table-content" :style="{maxHeight:childTableHeight}">
  <ul>
    <li class="child-table-content-li child-li" v-if="areaInfoList.length>0">
      <!-- 第一级 -->
      <div
        class="child-title"
        :class="{active: areaInfoList[0].isActive}"
      >
        <div class="arrow" v-if="areaInfoList[0].children.length > 0">
          <i class="arrow-icon" :class="{down: isClose}" @click="closeLiBox()"></i>
        </div>
        <div class="blank" v-else></div>
        <div class="text" @click="isActiveItem(areaInfoList[0])">
          <h2>{{areaInfoList[0].name}}</h2>
          <p v-if="areaInfoList[0].target.length!==0">{{areaInfoList[0].target[0].areaname}} {{areaInfoList[0].target[0].year}}</p>
          <p v-if="areaInfoList[0].target.length!==0">{{areaInfoList[0].target[0].cityTarget}}</p>
        </div>
        <div class="detail" v-if="areaInfoList[0].target.length!==0 || parseInt(areaInfoList[0].type)%10 == 4" @click.stop="getDetails(areaInfoList[0])">
          <i class="detail-icon" :class="{avtiveDetailIcon: !areaInfoList[0].isActive}"></i>
          <span :class="{activeColor: !areaInfoList[0].isActive}">详情</span>
        </div>
        <div class="collection">
          <i class="collection-icon"></i>
        </div>
      </div>
      <ul v-show="isClose">
        <li 
          class="child-table-content-li child-li" 
          v-for="(childItem, index) in areaInfoList[0].children"
        >
          <div 
            class="child-title" 
            :class="{active: childItem.isActive}">
            <div class="sec-blank" v-if="childItem.children.length <= 0"></div>
            <div class="third-blank" v-else></div>
            <div 
              class="arrow" 
              v-if="childItem.children.length > 0" 
              @click="thirdChildSlide(index)"
            >
              <i class="arrow-icon" :class="{down: thirdChildIsShow && nowIndex === index}"></i>
            </div>
            <div class="text" @click="isActiveItem(childItem)">
              <h2>{{childItem.name}}</h2>
              <p v-if="childItem.target.length!==0">{{childItem.target[0].areaname}} {{childItem.target[0].year}}</p>
              <p v-if="childItem.target.length!==0">{{childItem.target[0].cityTarget}}</p>
            </div>
            <div class="detail" v-if="childItem.target.length!==0" @click.stop="getDetails(childItem)">
              <i class="detail-icon" :class="{avtiveDetailIcon: !childItem.isActive}"></i>
              <span :class="{activeColor: !childItem.isActive}">详情</span>
            </div>
            <div class="collection">
              <i class="collection-icon"></i>
            </div>
          </div>
          <ul v-show="thirdChildIsShow && nowIndex === index">
            <li 
              class="child-table-content-li" 
              v-for="thirdChild in childItem.children" 
              :class="{active: thirdChild.isActive}" 
              @click="isActiveItem(thirdChild)"
            >
              <div class="blank"></div>
              <div class="text">
                <h2>{{thirdChild.name}}</h2>
                <p v-if="thirdChild.target.length!==0">{{thirdChild.target[0].areaname}} {{thirdChild.target[0].year}}</p>
                <p v-if="thirdChild.target.length!==0">{{thirdChild.target[0].cityTarget}}</p>
              </div>
              <div class="detail" v-if="thirdChild.target.length!==0" @click.stop="getDetails(thirdChild)">
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
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isClose: true,
      thirdChildIsShow: false,
      nowIndex: "",
      childTableHeight: window.innerHeight * 0.6 + "px"
    };
  },
  computed: {
    ...mapGetters([
      "areaInfoList",
      "activeAreaInfoList",
      "areaCodeAndDataId",
      "reportFormData",
      "areaList",
      "searchItemMacroList"
    ])
  },
  methods: {
    closeLiBox() {
      this.isClose = !this.isClose;
    },
    thirdChildSlide(index) {
      this.thirdChildIsShow = !this.thirdChildIsShow;
      this.nowIndex = index;
    },
    isActiveItem(item) {
      this.setAreaList({'param': item})
    },
    //点击详情按钮
    getDetails(item) {
      let obj = Object.assign({}, item)
      obj.isActive = true
      this.isActiveItem(item)
      var dataType = parseInt(item.type) % 10;
      if (dataType == 2 || dataType == 3) {
        this.getAreaCodeAndDataId({
          areaCode: this.areaList,
          dataId: [this.areaInfoList, this.searchItemMacroList]
        });
        this.getReportData({
          areaCode: this.areaCodeAndDataId[0],
          dataId: this.areaCodeAndDataId[1]
        });
        this.setReportFormShow(true);
        this.setAreaReportFormShow(false);
      } else if (dataType == 4 || dataType == 5) {
        this.getDataFileByCodeAndId({
          areaCode: this.areaList,
          dataId: item.id
        });
        this.setReportFormShow(false);
        this.setAreaReportFormShow(true);
      }
    },
    ...mapActions([
      "setAreaList",
      "setReportFormShow",
      "getReportData",
      "getAreaCodeAndDataId",
      "getDataFileByCodeAndId",
      "setAreaReportFormShow"
    ])
  }
};
</script>

<style lang="scss" scoped>
.child-table-content {
  //max-height: 635px;
  background-color: #fff;
  overflow-y: auto;
  .child-table-content-li {
    display: flex;
    padding: 10px 0 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .blank {
      flex: 1;
    }
    .child-title {
      display: flex;
      padding-top: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .sec-blank {
      width: 60px;
    }
    .third-blank {
      width: 16px;
    }
    .arrow {
      .arrow-icon {
        margin-top: -14px;
        display: block;
        width: 44px;
        height: 44px;
        background: url("../../../assets/images/catalog/arrow_close@2x.png")
          no-repeat;
        background-size: 100%;
      }
      .down {
        background: url("../../../assets/images/catalog/arrow_expand@2x.png")
          no-repeat;
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
        background: url("../../../assets/images/catalog/文档@2x.png") no-repeat;
        background-size: 100%;
      }
      .avtiveDetailIcon {
        background: url("../../../assets/images/catalog/数据详情@2x.png")
          no-repeat;
        background-size: 100%;
      }
      span {
        margin-top: 3px;
        font-size: 12px;
        color: #58595c;
      }
      .activeColor {
        color: #20be8c;
      }
    }
    .collection {
      display: flex;
      flex-direction: column;
      align-items: center;
      .collection-icon {
        display: block;
        width: 44px;
        height: 44px;
        // background: url("../../../assets/images/catalog/不收藏@2x.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  .active {
    background-color: #dcdfe6;
  }
  .child-li {
    padding: 0;
    flex-direction: column;
    border-bottom: 0;
  }
}
</style>
