<template>
  <div>
      <img src="../../../assets/images/map/报表.png"  width="60" height="60" alt="" @click="openReportForm">
      <el-dialog
        title="数据详情"
        :visible.sync="reportFormShow"
        width="60%"
        center @close="colseDialog()">
        <span>
          <div class="table-box">
            <table class="table-form">
              <thead>
                <tr class="table-form-title">
                  <td class="table-form-button"><el-button @click="clearForm()">清空</el-button></td>
                  <td class="table-form-item">区域</td>
                  <td class="table-form-item">2017</td>
                  <td class="table-form-item">2016</td>
                  <td class="table-form-item">2015</td>
                  <td class="table-form-item">2014</td>
                  <td class="table-form-item">2013</td>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in reportFormData" :key="item.id" class="table-form-content">
                <td style="width:100%" colspan="10">
                  <table class="table-form-table">
                    <tr class="table-title">
                      <td style="width:32%">{{item.name}}</td>
                      <td class="table-item">
                        <img src="../../../assets/images/catalog/关闭搜索.png" width="40" height="40" @click="clearForm(index)">
                      </td>
                      <td class="table-item"></td>
                      <td class="table-item"></td>
                      <td class="table-item"></td>
                    </tr>
                    <tr v-for="data in item.dataByYear">
                      <td style="width:32%">{{data.type}}</td>
                      <td class="table-item">{{data["areaName"]}}</td>
                      <td class="table-item num-color">{{data["2017"]||"--"}}</td>
                      <td class="table-item num-color">{{data["2016"]||"--"}}</td>
                      <td class="table-item num-color">{{data["2015"]||"--"}}</td>
                      <td class="table-item num-color">{{data["2014"]||"--"}}</td>
                      <td class="table-item num-color">{{data["2013"]||"--"}}</td>
                    </tr>
                  </table>
                 </td>
              </tr>
              </tbody>
            </table>
          </div>
        </span>
        </el-dialog>
  </div>
</template>
<script>
import {getMsMacroData} from '@/api/datasheets.js'
import {mapGetters,mapActions} from 'Vuex'
export default {
  data(){
      return{
        dataId:'',
        areaCode:'',
        dataList:[]
      }
  },
  computed:{
    ...mapGetters([
      'areaInfoData',
      'areaList',
      'areaCodeAndDataId',
      'reportFormShow',
      'reportFormData'
    ])
  },
  methods:{
      //打开报告模态框
      openReportForm:function(){
        this.setReportFormShow(true)
        this.getAreaCodeAndDataId({"areaCode":this.areaList,"dataId":this.areaInfoData})
        this.getReportData({'areaCode':this.areaCodeAndDataId[0],'dataId':this.areaCodeAndDataId[1]})
      },
      //关闭模态框
      colseDialog:function(){
        this.setReportFormShow(false)
      },
      //将areaInfoData中dataId拼凑返回
      getDataId:function(data){
        for(let i in data){
          if(data[i].target.length>0&&data[i].isActive){
            this.dataId += ','+ data[i].id
          }
          if(data[i].children.length > 0){
            this.getDataId(data[i].children)
          }else{
            continue
          }
        } 
      },
      //将areaList中的areaCode拼凑返回
      getAreaCode:function(data){
        if(data.length > 0){
          for(let i in data){
            this.areaCode += ','+ data[i].areacode
          }
        }else{
          this.areaCode = ',500000'
        }
      },
      
      //清空按钮点击
      clearForm:function(key){
        if(key!==""&&key!==undefined&&key!==null){
          this.setAreaList({'bol': false, 'id': this.reportFormData[key].id})
          this.clearReport({"key":key,"data":this.reportFormData})
        }else{
           for(var i in this.reportFormData){
             this.setAreaList({'bol': false, 'id': this.reportFormData[i].id})
           }
          this.clearReport({"key":"","data":this.reportFormData})
        }
      },
      ...mapActions([
        'setAreaList',
        'setReportFormShow',
        'getReportData',
        'clearReport',
        'getAreaCodeAndDataId'
      ])
  }
}
</script>
<style lang="scss" scoped>
.table-box{
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  .table-form{
    width:95%;
    margin:0 auto;
    .table-form-title{
      font-size: 16px;
      font-weight: bold;
      .table-form-button{
        width: 32%;
      }
      .table-form-item{
        width:12%;
        text-align: center;
      }
    }
    .table-form-table{
      width: 100%;
      .table-title{
        font-size: 16px;
        font-weight: bold;
      }
      .table-item{
        width: 12%;
        text-align: center;
      }
      .num-color{
        color:#409eff
      }
    }
    tr{
      width: 100%;
    }
    th{
      width: 100%;
    }
  }
}
</style>
