<template>
<div>
  <!-- 普通报表 -->
  <div class="report-form-detail" v-show="reportFormShow">
    <div class="report-form-header">
      <div class="report-form-title">数据详情</div>
      <div class="report-form-close">
        <span @click="colseDialog()">关闭</span>
      </div>
    </div>
    <div class="table-box">
      <div class="table-form">
        <div class="table-form-title">
          <div class="table-form-button">
            <el-button @click="clearForm()">清空</el-button>
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
  <div class="report-form-detail" v-show="areaReportFormShow">
    <div class="report-form-header">
      <div class="report-form-title">{{reportFormData.title}}</div>
      <div class="report-form-close">
        <span @click="colseDialog()">关闭</span>
      </div>
    </div>
    <div class="table-box">
      <table style="width:100%;table-layout:fixed">
          <tr class="table-tab">
              <td class="table-tab-item" v-for="(item,index) in reportFormData.name" @click="showContent(index)" :class="{active:activeTab == index}">{{item}}</td>
          </tr>
      </table>
      <div class="table-tab-context">
          <div v-html="tabContext"></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  getMsMacroData
} from '@/api/datasheets.js'
import {
  mapGetters,
  mapActions
} from 'Vuex'
export default {
  data() {
    return {
      dataId: '',
      areaCode: '',
      dataList: [],
      tabContext:'',
      activeTab:0
    }
  },

  computed: {
    ...mapGetters([
      'reportFormShow',
      'areaReportFormShow',
      'reportFormData',
    ]),
  },
  methods: {
    //关闭模态框
    colseDialog() {
      this.setReportFormShow(false)
      this.setAreaReportFormShow(false)
    },
    clearItem(index) {
      this.setAreaList({
        'bol': false,
        'id': this.reportFormData.data[index].id
      })
      this.clearReport({
        "key": index,
        "data": this.reportFormData.data
      })
    },
    //tab 点击
    showContent(index){
      this.activeTab = index
      this.tabContext = this.reportFormData.data[index]
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
      'clearReport',
      'removeAllAreaList',
      'setAreaReportFormShow'
    ])
  }
}
</script>
<style lang="scss" scoped>
.report-form-detail {
    min-width: 800px;
    background-color: #fff;
    .report-form-header {
        width: 100%;
        height: 60px;
        display: flex;
        background-color: #ccc;
        border-radius: 5px 5px 0 0;
        .report-form-title {
            width: 80%;
            height: 60px;
            text-align: left;
            line-height: 60px;
            font-size: 18px;
            padding-left: 15px;
        }
        .report-form-close {
            width: 20%;
            height: 60px;
            text-align: right;
            line-height: 60px;
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
                    height: 60px;
                    line-height: 60px;
                    text-align: left;
                    padding-left: 15px;
                }
                .table-form-item {
                    width: 90px;
                    height: 60px;
                    line-height: 60px;
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
                            font-size: 16px;
                            display: flex;
                            font-weight: bold;
                        }
                        .table-item {
                            width: 90px;
                            text-align: center;
                            padding: 10px 0;
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
          overflow-y: auto;
        }
    }
}
</style>
