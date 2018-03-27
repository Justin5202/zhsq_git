<template>
<div>
  <!-- 普通报表 -->
  <div class="report-form-detail" v-show="reportFormShow" :style="reportFormSize">
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
        <div class="form-content-box">
          <div v-for="(item,index) in reportFormData.data" :key="item.id" class="table-form-content">
            <div style="width:100%">
              <div class="table-form-table">
                <div class="title-color">
                  <div class="table-title">
                    <div class="title-item">{{item.name}}</div>
                    <div class="table-item">
                      <img src="../../../assets/images/catalog/关闭搜索.png" width="40" height="40" @click="clearItem(index)">
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
      <div class="table-tab-context" v-if="areaReportFormShow">
          <!-- 展示html字符串 -->
          <div v-html="item" v-show="reportFormData.data.dataType[index] == 'string'&& activeContent == index" class="html-string" v-for="(item,index) in reportFormData.data.dataContex"></div>
          <!-- 展示html页面 -->
          <iframe :src="'data:text/html;base64,' + item" class="html-doc" v-show="reportFormData.data.dataType[index] == 'html'&& activeContent == index" v-for="(item,index) in reportFormData.data.dataContex"></iframe>
          <!-- 展示pdf -->
          <!-- <pdf class="html-pdf" :src="'data:application/pdf;base64,' + item" v-show="reportFormData.data.dataType[index] == 'pdf'&& activeTab == index" v-for="(item,index) in reportFormData.data.dataContex"></pdf> -->
          <div class="table-tab-context-special" v-show="!reportFormData.data.dataType">
             <div v-for="(item,index) in reportFormData.data" class="context-special-item" :class="{itemColor:index%2 != 0}">
                <span style="margin-left:15px;">{{item.name + ':'}}</span>
                <span class="font-blue">{{item.context}}</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {getMsMacroData} from '@/api/datasheets.js'
import {mapGetters,mapActions} from 'Vuex'
export default {
  components: {
  },
  data() {
    return {
      dataId: '',
      areaCode: '',
      dataList: [],
      activeTab:0,
      activeContent:0,
      reportFormSize:{
        maxWidth:window.innerWidth*0.55 +'px',
        minWidth:window.innerWidth*0.5 +'px'
      }
    }
  },
  watch:{
    areaList:function(val){
      this.setFunByReportFormType()
      this.activeTab = 0
    }
  },
  computed: {
    ...mapGetters([
      'reportFormShow',
      'areaReportFormShow',
      'reportFormData',
      'areaInfoList',
      'areaCodeAndDataId',
      'areaList'
    ])
  },
  methods: {
    //关闭模态框
    colseDialog() {
      this.setReportFormShow(false)
      this.setAreaReportFormShow(false)
      this.activeTab = 0
      this.tabContext = this.reportFormData.data[0]
    },
    clearItem(index) {
      this.areaCodeAndDataId[2][index].isActive = false
      this.setAreaList(this.areaCodeAndDataId[2][index])
      this.clearReport({
        "key": index,
        "data": this.reportFormData.data
      })
    },
    //tab 点击
    showContent(index,code){
      if(code){
        this.getDataFileByCodeAndId({
          'areaCode': this.areaList,
          'dataId': this.areaCodeAndDataId.idList,
          'index': index
        })
        this.activeTab = index
        this.activeContent = 0
      }else{
        this.activeTab = index
        this.activeContent = index
      }
    },
    //清空按钮点击
    clearForm() {
      this.removeAllAreaList()
      this.clearReport({
        "key": "",
        "data": this.reportFormData.data
      })
    },
    ...mapActions([
      'setAreaList',
      'setReportFormShow',
      'setAreaReportFormShow',
      'clearReport',
      'removeAllAreaList',
      'setFunByReportFormType',
      'getDataFileByCodeAndId'
    ])
  }
}
</script>
<style lang="scss" scoped>
.report-form-detail {
    // min-width: 800px;
    // max-width: 1100px;
    background-color: #fff;
    .report-form-header {
        width: 100%;
        display: flex;
        background-color: #ccc;
        border-radius: 5px 5px 0 0;
        .report-form-title {
            width: 80%;
            text-align: left;
            line-height: 40px;
            font-size: 16px;
            padding-left: 15px;
        }
        .report-form-close {
            width: 20%;
            text-align: right;
            line-height: 40px;
            padding-right: 20px;
            span {
                display: inline-block;
                font-size: 16px;
                width: 50px;
                height: 35px;
                line-height: 35px;
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
                height: 500px;
                overflow-y: auto;
                .table-form-content {
                    width: 100%;
                    .table-form-table {
                        width: 100%;
                        .table-title {
                            font-size: 14px;
                            display: flex;
                            font-weight: bold;
                        }
                        .table-item {
                            width: 90px;
                            text-align: center;
                            height: 40px;
                            line-height: 40px;
                            img {
                              cursor: pointer;
                            }
                        }
                        .num-color {
                            color: #409eff;
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
                            font-size: 12px;
                        }
                    }
                }
            }
            .title-color {
                width: 100%;
                background-color: #ccc;
            }
            .itemColor {
                width: 100%;
                background-color: #eee;
            }
            tr {
                width: 100%;
            }
            th {
                width: 100%;
            }
        }
        //行政区化详情的样式
        .table-tab{
          width: 100%;
          font-family: '微软雅黑';
          color: #fff;
          cursor: pointer;
          background-color:#a8a6a1;
          .table-tab-item{
            max-width: 33%;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            border: 1px solid #ccc;
          }
          .active{
            background-color: #fff;
            color: #000;
          }
        }
        .table-tab-context{
          width: 100%;
          height: 500px;
          .table-tab-context-special{
            height: 500px;
            overflow-y: auto;
            .context-special-item{
              width: 100%;
              height: 50px;
              display: flex;
              align-items:center;
              text-align: left;
            }
            .itemColor {
                width: 100%;
                background-color: #eee;
            }
          }
        }
        .html-string{
          width: 100%;
          height: 500px;
          overflow-y: auto;
        }
        .html-doc{
          width: 100%;
          height: 500px;
        }
        .html-pdf{
          display:inline-block;
          width: 100%;
          height: 500px;
          overflow-y: auto;
        }
        .font-blue{
          color: #409eff;
        }
    }
}
</style>
