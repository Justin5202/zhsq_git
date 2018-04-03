<template>
	<div class="tab-pane">
		<div class="tab-pane-content">
			<ul v-show="upOrDown && tableMenuPaneShow && !searchPaneShow">
				<li class="tab-pane-li" v-for="(item, index) in arrayData">
					<div class="tab-pane-li-title">
						<p class="item-title">【{{item.name}}】</p>
					</div>
					<div class="tab-pane-li-content">
						<span v-for="(i, idx) in item.hot" @click="getAreaData(i.dataCode)">{{i.dataname}}</span>
					</div>
				</li>
			</ul>
			<div
				class="search-pane-content"
				v-if="upOrDown && !tableMenuPaneShow && searchPaneShow && !topicListShow">
				<div class="search-type-button">
					<button
						class="type-button"
						v-for="(item, index) in ['全部', '数据', '地名点']"
						:key="index"
						@click="getType(index+1)"
						:class="{clicked: typeIndex === index}"
					>{{item}}</button>
				</div>
				<ul :style="{maxHeight:tabPaneHeight}">
					<li class="search-pane-li" v-if="searchList.length === 0">
						<p style="margin: 0;">暂无搜索数据</p>
					</li>
					<li 
						class="search-pane-li" 
						v-else v-for="(item, index) in searchList"
					>
						<div 
              class="search-pane-box" 
              v-if="item.searchType === 1"
              :class="{active: searchIndex === index}"
            >
							<div class="icon-box">
								<i class="poi-icon"></i>
							</div>
							<div class="area-content" @click="flyToPoi(item, index)">
								<h2>{{(page-1)*10+index+1}}.{{item.poi.name}}</h2>
								<p>{{item.poi.address}}</p>
							</div>
							<div class="detail">
							</div>
						</div>
						<div 
              class="search-pane-box"
              :class="{active: searchIndex === index}"
              v-else-if="item.searchType === 2"
            >
							<div class="icon-box">
								<i class="area-icon"></i>
							</div>
							<div 
                class="area-content" 
                @click="setAreaInfo(item, index)"
              >
								<h2>{{item.area.areaname}}</h2>
								<p>{{item.area.address}}</p>
								<div v-if="item.area.areaTarget.length>0">
									<p v-for="v in item.area.areaTarget[0].cityTarget.split('|ZX|')">
										{{v}}
									</p>
								</div>
							</div>
							<div class="detail"  @click.stop="getDetails(item)">
								<i class="detail-icon"></i>
								<span>详情</span>
							</div>
						</div>
						<div
							class="search-pane-box"
							:class="{active: item.isActive}"
							v-else-if="item.searchType === 4"
						>
							<div class="icon-box">
								<i class="data-icon"></i>
							</div>
							<div class="area-content" @click="isActiveItem(item, index)">
								<h2>{{item.macro.name}}</h2>
								<p>{{item.macro.address}}</p>
								<p>{{item.macro.year}}</p>
							</div>
							<div class="detail" v-if="item.macro.filedsData"  @click.stop="getDetails(item)">
								<i class="detail-icon"></i>
								<span>详情</span>
							</div>
						</div>
						<div 
							class="search-pane-box" 
							v-else-if="item.searchType === 5"
							@click="flyToPoi(item, index)"
							:class="{active: searchIndex === index}"
						>
							<div class="icon-box">
								<i class="macro-icon"></i>
							</div>
							<div class="area-content" >
								<h2>{{(page-1)*10+index+1}}.{{item.element.name}}</h2>
								<p>{{item.element.desc}}</p>
							</div>
						</div>
						<div 
              class="search-pane-box" 
              :class="{active: searchIndex === index}"
              v-else-if="item.searchType === 6"
            >
							<div class="icon-box">
								<i class="unit-icon"></i>
							</div>
							<div class="area-content" @click="setAreaInfo(item, index)">
								<h2>{{item.area.areaname}}</h2>
								<p>{{item.area.address}}</p>
							</div>
							<div class="detail"  @click.stop="getDetails(item)">
								<i class="detail-icon"></i>
								<span>详情</span>
							</div>
						</div>
					</li>
				</ul>
				<p>
				  <el-button size="mini" icon="el-icon-arrow-left" @click="prev()">上一页</el-button>
				  <el-button size="mini" @click="next()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</p>
			</div>
			<div class="search-pane-content"
					v-show="upOrDown && !tableMenuPaneShow && !searchPaneShow && topicListShow">
				<div class="search-type-button">
					<button
						class="type-button topic-type-button"
						v-for="(item, index) in tourismType"
						:key="index"
						@click="getTourismType(index)"
						:class="{clicked: nowIndex === index}"
						v-if="topicList.type=='ly'"
					>{{item}}</button>
				</div>
				<ul :style="{maxHeight:tabPaneHeight}">
					<li
						class="search-pane-li"
						v-for="(item, index) in topicList.list"
						v-if="topicList.type=='ly'&&nowIndex>0&&item.dj == tourismType[nowIndex]"
						:class="{active: topicIndex == index}"
						@click="flyToPoint(item.point, item.id, index)"
					>
						<div class="search-pane-box">
							<div class="icon-box">
								<i class="ly-icon"></i>
							</div>
							<div class="area-content" >
								<h2>{{item.name}}</h2>
								<p>{{item.address}}</p>
							</div>
						</div>
					</li>
					<li
						class="search-pane-li"
						v-for="(item, index) in topicList.list"
						v-if="topicList.type=='ly'&&nowIndex<=0"
						:class="{active: topicIndex == index}"
						@click="flyToPoint(item.point, item.id, index)"
					>
						<div class="search-pane-box">
							<div class="icon-box">
								<i class="ly-icon"></i>
							</div>
							<div class="area-content">
								<h2>{{item.name}}</h2>
								<p>{{item.address}}</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="child-table-content"
					v-show="upOrDown && !tableMenuPaneShow && !searchPaneShow && !topicListShow">
				<child-table></child-table>
			</div>
			<div class="fb-box">
				<v-fb></v-fb>
			</div>
			<div class="up-control">
				<i class="control-icon" :class="{down: !upOrDown}" @click="toggleSlide()"></i>
			</div>
		</div>
	</div>
</template>

<script>
import ChildTable from "@/components/container/childTable/childTable";
import vFb from "@/components/container/fb/fb";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    ChildTable,
    vFb
  },
  name: "tabPane",
  props: {
    arrayData: {
      type: Array,
      dafault: []
    }
  },
  data() {
    return {
      upOrDown: true,
      type: 1,
      page: 1,
      topicPage: 1,
      buttonType: "",
      typeIndex: 0,
      nowIndex: 0,
      topicIndex: -1,
      searchIndex: -1,
      tourismType: ["全部", "5A", "4A", "3A"],
      tabPaneHeight: window.innerHeight * 0.5 + "px"
    }
  },
  watch: {
    arrayData() {
      this.upOrDown = true
    }
  },
  computed: {
    ...mapGetters([
      "searchPaneShow",
      "tableMenuPaneShow",
      "searchList",
      "areaInfoList",
      "activeAreaInfoList",
      "areaCodeAndDataId",
      "reportFormData",
      "areaList",
      "topicList",
      "topicListShow"
    ])
  },
  methods: {
    getType(index) {
      this.type = index || this.type
      const params = {
        type: index || this.type,
        start: (this.page - 1) * 10,
        rows: 10
      }
      this.buttonType = "info"
      this.typeIndex = this.type - 1
      this.topicIndex =  -1
      this.searchIndex =  -1
      this.getSearchParams({ typeParams: params, params: {} })
    },
    getTourismType(index) {
      this.nowIndex = index
      this.addTourismLayer(index)
    },
    flyToPoi(item, index) {
      this.searchIndex = index
      let gp, uuid, geojson
      if(item.element) {
        uuid = item.element.uuid
        if(item.element.geojson) {
          geojson = JSON.parse(item.element.geojson)      
        }
        if(item.element.geopoint) {
          gp = item.element.geopoint
        }
      } else if(item.poi) {
        gp = item.poi.geopoint
        uuid = item.poi.uuid
      }
      this.$mapHelper.flyByPointAndZoom(gp, 16)
      this.$mapHelper.setPopupToMap(gp, uuid)
      if(geojson) {
        this.$mapHelper.removeHighLight()
        this.$mapHelper.setHighLight(geojson)
      }
    },
    flyToPoint(point, id, index) {
      let p;
      if (point instanceof Array) {
        p = point;
      } else {
        p = JSON.parse(point);
      }
      this.topicIndex = index;
      this.$mapHelper.flyByPointAndZoom(p, 8);
      this.$mapHelper.setPicPopupToMap(p, id);
    },
    next() {
      if(this.searchList.length < 10) {
        return 
      }
      this.page += 1
      this.getType()
      this.$mapHelper.closePopup()
      this.$mapHelper.closePicPopup()
    },
    prev() {
      if (this.page === 1) {
        return
      }
      this.page -= 1
      this.getType()
      this.$mapHelper.closePopup()
      this.$mapHelper.closePicPopup()
    },
    getAreaData(code) {
      const params = {
        areacode: 500000,
        id: code
      }
      this.getAreaDetail(params)
      this.setTopicShow(false)
      this.setLayerControlShow(false)
    },
    isActiveItem(item, index) {
      this.searchIndex = index
      let type = item.macro.data.type
      let i = Number(type.substring(0, 1))
      if (i === 1) {
        /*存在第二级目录*/
        this.getAreaDetail(item)
      } else if (i === 2) {
        /*加载空间数据，加入数据table*/
        this.setAreaList({'param': item})
      }
    },
    setAreaInfo(item, index) {
      this.searchIndex = index
      item.isActive = !item.isActive
      this.setAreaList({'param': item})
    },
    toggleSlide() {
      this.upOrDown = !this.upOrDown;
    },
    //点击详情按钮
    getDetails(item) {
      if (item.searchType == 4) {
        this.isActiveItem(item);
        this.getAreaCodeAndDataId({
          areaCode: this.areaList,
          dataId: [this.areaInfoList, this.searchList]
        });
        this.getReportData({
          areaCode: this.areaCodeAndDataId[0],
          dataId: this.areaCodeAndDataId[1]
        });
        this.setReportFormShow(true);
        this.setAreaReportFormShow(false);
      } else if (item.searchType == 2 || item.searchType == 6) {
        this.getReportDataByAreaCode([
          item["area"]["areacode"],
          item["area"]["areaname"],
          item["searchType"]
        ]);
        this.setReportFormShow(false);
        this.setAreaReportFormShow(true);
      }
    },
    ...mapMutations({
      setTopicShow: "SET_TOPIC_LIST_SHOW",
      setLayerControlShow: 'SET_LAYER_CONTROL_SHOW'
    }),
    ...mapActions([
      "setAreaList",
      "getSearchParams",
      "getAreaDetail",
      "tablePaneShow",
      "setReportFormShow",
      "setAreaReportFormShow",
      "getReportData",
      "getAreaCodeAndDataId",
      "addTourismLayer",
      "getReportDataByAreaCode"
    ])
  }
};
</script>

<style lang="scss" scoped>
.tab-pane {
  margin-top: 15px;
  .tab-pane-content {
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
  }
  ul {
    margin: 0;
    padding: 0;
    .tab-pane-li {
      list-style: none;
      .tab-pane-li-title {
        padding: 0 15px;
        background-color: #e4e7ed;
        .item-title {
          margin: 0;
          padding: 10px 0;
          font-size: 14px;
          font-weight: bold;
          text-align: left;
        }
      }
      .tab-pane-li-content {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
        span {
          display: inline-block;
          width: 25%;
          padding: 10px 0;
          font-size: 12px;
          color: #888;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: #2c3e50;
          }
        }
      }
    }
  }
  .search-pane-content {
    .search-type-button {
      .type-button {
        margin: 10px 5px;
        font-size: 12px;
        padding: 7px 36px;
        border-radius: 25px;
        border: 0;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        color: #606266;
      }
      .topic-type-button {
        padding: 7px 28px;
      }
      .clicked {
        color: #fff;
        background-color: #909399;
        border-color: #909399;
      }
    }
    ul {
      margin: 0;
      margin-bottom: 10px;
      overflow-y: auto;
      .search-pane-li {
        list-style: none;
        border-bottom: 1px solid #dcdfe6;
        .search-pane-box {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          .icon-box {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 20px;
            flex: 0 0 20px;
            padding-right: 10px;
            background: none !important;
            i {
              display: block;
              width: 20px;
              height: 20px;
            }
            .area-icon {
              background: url("../../../assets/images/catalog/行政区划@2x.png")
                no-repeat;
              background-size: 100%;
            }
            .poi-icon {
              background: url("../../../assets/images/catalog/搜索定位.png")
                no-repeat;
              background-size: 100%;
            }
            .macro-icon {
              background: url("../../../assets/images/catalog/搜索定位.png")
                no-repeat;
              background-size: 100%;
            }
            .data-icon {
              background: url("../../../assets/images/catalog/文档@2x.png")
                no-repeat;
              background-size: 100%;
            }
            .regions-icon {
              background: url("../../../assets/images/catalog/行政区划@2x.png")
                no-repeat;
              background-size: 100%;
            }
            .unit-icon {
              background: url("../../../assets/images/catalog/社会经济@2x.png")
                no-repeat;
              background-size: 100%;
            }
            .ly-icon {
              background: url("../../../assets/images/catalog/ly@2x.png")
                no-repeat;
              background-size: 100%;
            }
            .fp-icon {
              background: url("../../../assets/images/catalog/fp@2x.png")
                no-repeat;
              background-size: 100%;
            }
          }
        }
        .active {
          background-color: #dcdfe6;
        }
        .area-content {
          display: flex;
          flex: 2;
          flex-direction: column;
          text-align: left;
          h2 {
            margin: 0;
            font-size: 14px;
          }
          p {
            margin: 0;
            margin-top: 5px;
            font-size: 12px;
            color: #888;
          }
        }
        .detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          .detail-icon {
            margin-top: 10px;
            display: block;
            width: 20px;
            height: 20px;
            background: url("../../../assets/images/catalog/数据详情@2x.png")
              no-repeat;
            background-size: 100%;
          }
          span {
            font-size: 12px;
            color: #20be8c;
          }
        }
      }
      .active {
        background-color: #dcdfe6;
      }
    }
  }
  .up-control {
    .control-icon {
      margin: 0 auto;
      display: block;
      width: 60px;
      height: 30px;
      background: transparent
        url("../../../assets/images/catalog/catalog_close@2x.png") no-repeat;
      background-size: 100%;
    }
    .down {
      background: transparent
        url("../../../assets/images/catalog/catalog_expand@2x.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
