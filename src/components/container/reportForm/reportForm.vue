<template>
<div>
  <!-- 普通报表 -->
  <div class="report-form-detail" v-if="reportFormShow" :style="reportFormSize">
    <div class="report-form-header">
      <div class="report-form-title">数据详情</div>
      <div class="report-form-close">
        <el-button size="mini" @click="colseDialog()">关闭</el-button>
      </div>
    </div>
    <div class="table-box">
      <div class="table-form">
        <div class="table-form-title">
          <div class="table-form-button">
            <el-button size="mini" @click="clearForm()">清空</el-button>
          </div>
          <div class="table-form-item">区域</div>
          <div class="table-form-item" v-for="year in reportFormData.year">{{year}}</div>
        </div>
        <div class="form-content-box" :style="{height:contentHeight}">
          <div v-for="(item,index) in reportFormData.data"  class="table-form-content">
            <div style="width:100%">
              <div class="table-form-table">
                <div class="title-color">
                  <div class="table-title">
                    <div class="title-item">{{item.name}}</div>
                    <div class="table-item">
                      <img src="../../../assets/images/catalog/关闭搜索.png" width="40" height="40" @click="clearItem(index,item)">
                    </div>
                  </div>
                </div>
                <div v-for="(data,index) in item.dataByYear" class="table-item-box" :class="{itemColor:index%2 != 0}">
                  <div class="title-item">{{data.type}}</div>
                  <div class="table-item">{{data["areaName"]}}</div>
                  <div class="table-item num-color" v-for="year in reportFormData.year">{{data[year]||"--"}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 行政区划的报表 -->
  <div class="report-form-detail" v-show="areaReportFormShow" :style="reportFormSize">
    <div class="report-form-header">
      <div class="report-form-title">{{reportFormData.title}}</div>
      <div class="report-form-close">
        <el-button size="mini" @click="colseDialog()">关闭</el-button>
      </div>
    </div>
    <div class="table-box">
      <table style="width:100%;table-layout:fixed">
          <tr class="table-tab" v-if="!reportFormData.code">
              <td class="table-tab-item" v-for="(item,index) in reportFormData.name" @click="showContent(index)" :class="{active:activeTab == index}">{{item}}</td>
          </tr>
          <tr class="table-tab" v-if="reportFormData.code">
              <td class="table-tab-item" v-for="(item,index) in reportFormData.name" @click="showContent(index,'exist')" :class="{active:activeTab == index}">{{item}}</td>
          </tr>
      </table>
      <div class="table-tab-context" v-if="areaReportFormShow && reportFormData.data" :style="{height:contentHeight}">
          <!-- 展示html字符串 -->
          <div 
            v-html="item" 
            v-show="reportFormData.data.dataType[index] == 'string'&& activeContent == index" 
            class="html-string" 
            v-for="(item,index) in reportFormData.data.dataContex"  
            :style="{height:contentHeight}">
          </div>
          <!-- 展示html页面 -->
          <iframe 
            :src="'data:text/html;base64,' + item" class="html-doc" 
            v-show="reportFormData.data.dataType[index] == 'html'&& activeContent == index" 
            v-for="(item,index) in reportFormData.data.dataContex"  
            :style="{height:contentHeight}">
          </iframe>
          <!-- 展示pdf -->
          <embed  
            class="html-pdf" 
            :src="'data'+':application/pdf;base64,' + item" type="application/pdf" 
            v-show="reportFormData.data.dataType[index] == 'pdf'&& activeTab == index" 
            v-for="(item,index) in reportFormData.data.dataContex"  
            :style="{height:contentHeight}"
          >
          <!-- 无数据提示 -->
          <div class="html-nodata" 
            v-show="reportFormData.data.dataType[index] == 'noData'&& activeContent == index" 
            v-for="(item,index) in reportFormData.data.dataContex"  
            :style="{height:contentHeight}">{{item}}</div>
          <div class="table-tab-context-special" v-show="!reportFormData.data.dataType" :style="{height:contentHeight}">
             <div v-for="(item,index) in reportFormData.data" class="context-special-item" :class="{itemColor:index%2 != 0}">
                <span style="margin-left:15px;">{{item.name + ':'}}</span>
                <span class="font-blue">{{item.context}}</span>
              </div>
          </div>
          <div class="mask" v-if="reportFormData.data.dataType[index] == 'pdf'&& activeTab == index" v-for="(item,index) in reportFormData.data.dataContex" @click="setFullScreenShow">
            <img src="../../../assets/images/catalog/zoombigpc@2x.png" width="45" height="45" v-show="!isfull">
            <img src="../../../assets/images/catalog/zoomsmallpc@2x.png" width="45" height="45" v-show="isfull">
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getMsMacroData } from "@/api/datasheets.js";
import { mapGetters, mapActions } from "Vuex";
export default {
  components: {},
  data() {
    return {
      dataId: "",
      areaCode: "",
      dataList: [],
      activeTab: 0,
      activeContent: 0,
      reportFormSize: {
        width: window.innerWidth - 350 - 60 + "px",
        height: window.innerHeight - 50 + "px"
      },
      contentHeight: window.innerHeight - 50 - 90 - 20 + "px",
      isfull: false
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        (this.reportFormSize.width = window.innerWidth - 350 - 60 + "px"),
          (this.reportFormSize.height = window.innerHeight - 50 + "px"),
          (this.contentHeight = window.innerHeight - 50 - 90 - 5 + "px");
      })();
    };
  },
  watch: {
    areaList: function (val) {
      this.setFunByReportFormType();
      this.activeTab = 0;
    }
  },
  computed: {
    ...mapGetters([
      "reportFormShow",
      "areaReportFormShow",
      "reportFormData",
      "areaInfoList",
      "areaCodeAndDataId",
      "areaList"
    ])
  },
  methods: {
    //关闭模态框
    colseDialog() {
      this.setReportFormShow(false);
      this.setAreaReportFormShow({ isShow: false });
      this.activeTab = 0;
      this.activeContent = 0;
      this.tabContext = this.reportFormData.data[0];
      //关闭时清空全屏
      this.reportFormSize.width = window.innerWidth - 350 - 60 + "px"
      document.getElementById("report-box").style.left = 380 + 'px'
      this.isfull = false
    },
    clearItem(index, item) {
      for (var i in this.areaCodeAndDataId[2]) {
        if (!this.areaCodeAndDataId[2][i].id) {
        } else {
          if (item.id == this.areaCodeAndDataId[2][i].id) {
            this.areaCodeAndDataId[2][i].clickType = ''
            this.setAreaList({ 'param': this.areaCodeAndDataId[2][i], 'type': 'report' })
          }
        }
        if (!this.areaCodeAndDataId[2][i].macro) {
        } else {
          if (item.id == this.areaCodeAndDataId[2][i].macro.dataId) {
            this.areaCodeAndDataId[2][i].clickType = ''
            this.setAreaList({ 'param': this.areaCodeAndDataId[2][i], 'type': 'report' })
          }
        }
      }
      this.clearReport({
        key: index,
        data: this.reportFormData.data
      });
    },
    //tab 点击
    showContent(index, code) {
      if (code) {
        this.getDataFileByCodeAndId({
          areaCode: this.areaList,
          dataId: this.areaCodeAndDataId.idList,
          index: index
        });
        this.activeTab = index;
        this.activeContent = 0;
      } else {
        this.activeTab = index;
        this.activeContent = index;
      }
    },
    //清空按钮点击
    clearForm() {
      this.removeAllAreaList();
      this.clearReport({
        key: "",
        data: this.reportFormData.data
      });
    },
    //设置全屏展示
    setFullScreenShow() {
      this.isfull = !this.isfull
      if (this.isfull) {
        this.reportFormSize.width = window.innerWidth - 30 + "px"
        document.getElementById("report-box").style.left = 0 + 'px'
      } else {
        this.reportFormSize.width = window.innerWidth - 350 - 60 + "px"
        document.getElementById("report-box").style.left = 380 + 'px'
      }
    },
    ...mapActions([
      "setAreaList",
      "setReportFormShow",
      "setAreaReportFormShow",
      "clearReport",
      "removeAllAreaList",
      "setFunByReportFormType",
      "getDataFileByCodeAndId"
    ])
  }
};
</script>
<style lang="scss" scoped>
.report-form-detail {
  min-width: 600px;
  transition: width 0.1s;
  .report-form-header {
    width: 100%;
    display: flex;
    background-color: #aeaeae;
    .report-form-title {
      width: 80%;
      text-align: left;
      line-height: 50px;
      font-size: 18px;
      padding-left: 15px;
    }
    .report-form-close {
      width: 20%;
      text-align: right;
      line-height: 50px;
      padding-right: 20px;
      span {
        display: inline-block;
        font-size: 16px;
        width: 50px;
        height: 35px;
        display: flex;
        align-items: center;
        text-align: center;
        border: 1px solid #fff;
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
  .table-box {
    width: 100%;
    .table-form {
      width: 100%;
      margin: 0 auto;
      .table-form-title {
        font-size: 16px;
        font-weight: bold;
        display: flex;
        width: 98%;
        .table-form-button {
          width: 210px;
          line-height: 40px;
          text-align: left;
          padding-left: 15px;
        }
        .table-form-item {
          width: 90px;
          line-height: 40px;
          text-align: center;
        }
      }
      .form-content-box {
        width: 100%;
        // height: 500px;
        overflow-y: auto;
        .table-form-content {
          width: 100%;
          .table-form-table {
            width: 100%;
            .table-title {
              font-size: 16px;
              display: flex;
              font-weight: bold;
            }
            .table-item {
              width: 90px;
              text-align: center;
              height: 40px;
              // display: flex;
              // align-items: center;
              // justify-content: center;
              // text-align: center;
              line-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              img {
                cursor: pointer;
              }
            }
            .num-color {
              color: #65a1f6;
            }
            .title-item {
              display: flex;
              align-items: center;
              width: 210px;
              text-align: left;
              padding-left: 15px;
            }
            .table-item-box {
              display: flex;
              font-size: 14px;
            }
          }
        }
      }
      .title-color {
        width: 100%;
        background-color: #f7f7f7;
      }
      .itemColor {
        width: 100%;
        background-color: #f2f2f2;
      }
      tr {
        width: 100%;
      }
      th {
        width: 100%;
      }
    }
    //行政区化详情的样式
    .table-tab {
      width: 100%;
      font-family: "微软雅黑";
      color: #fff;
      cursor: pointer;
      background-color: #a8a6a1;
      .table-tab-item {
        max-width: 33%;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        border: 1px solid #ccc;
      }
      .active {
        background-color: #fff;
        color: #000;
      }
    }
    .table-tab-context {
      width: 100%;
      // height: 500px;
      .table-tab-context-special {
        // height: 500px;
        overflow-y: auto;
        .context-special-item {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          text-align: left;
        }
        .itemColor {
          width: 100%;
          background-color: #f0f0f0;
        }
      }
    }
    .html-string {
      width: 100%;
      // height: 500px;
      overflow-y: auto;
    }
    .html-doc {
      width: 100%;
      border: 0;
      // height: 500px;
    }
    .html-pdf {
      display: inline-block;
      width: 100%;
      // height: 500px;
      overflow-y: auto;
    }
    .html-nodata {
      width: 100%;
      // height: 500px;
      text-align: left;
      padding: 10px 10px;
    }
    .font-blue {
      color: #409eff;
    }
  }
  .mask {
    width: 55px;
    height: 45px;
    position: absolute;
    top: 97px;
    left: 5px;
    z-index: 10000;
    background-color: #515558;
    cursor: pointer;
  }
}
</style>
