<template>
  <div>
      <img src="../../../assets/images/map/报表.png"  width="60" height="60" alt="" @click="openReportForm">
      <div class="report-form-detail" v-show="reportFormShow">
        <div class="report-form-header">
          <div class="report-form-title">数据详情</div>
          <div class="report-form-close" @click="colseDialog()">关闭</div>
        </div>
        <div class="table-box">
          <div class="table-form">
            <div class="table-form-title">
              <div class="table-form-button"><el-button @click="clearForm()">清空</el-button></div>
              <div class="table-form-item">区域</div>
              <div class="table-form-item">2017</div>
              <div class="table-form-item">2016</div>
              <div class="table-form-item">2015</div>
              <div class="table-form-item">2014</div>
              <div class="table-form-item">2013</div>
            </div>
            <div v-for="(item,index) in reportFormData" :key="item.id" class="table-form-content">
                <div style="width:100%" >
                  <div class="table-form-table">
                    <div class="table-title">
                      <div class="title-item">{{item.name}}</div>
                      <div class="table-item">
                        <img src="../../../assets/images/catalog/关闭搜索.png" width="40" height="40" @click="clearForm(index)">
                      </div>
                      <div class="table-item"></div>
                      <div class="table-item"></div>
                      <div class="table-item"></div>
                    </div>
                    <div v-for="data in item.dataByYear" class="table-item-box">
                      <div class="title-item">{{data.type}}</div>
                      <div class="table-item">{{data["areaName"]}}</div>
                      <div class="table-item num-color">{{data["2017"]||"--"}}</div>
                      <div class="table-item num-color">{{data["2016"]||"--"}}</div>
                      <div class="table-item num-color">{{data["2015"]||"--"}}</div>
                      <div class="table-item num-color">{{data["2014"]||"--"}}</div>
                      <div class="table-item num-color">{{data["2013"]||"--"}}</div>
                    </div>
                  </div>
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
.report-form-detail{
  min-width: 800px;
  position: absolute;
  right:200px;
  top: 20px;
  background-color: #fff; 
  .report-form-header{
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #ccc;
    .report-form-title{
      width: 80%;
      height: 60px;
      text-align: left;
      line-height: 60px;
      font-size: 18px; 
    }
    .report-form-close{
      width: 20%;
      height: 60px;
      text-align: left;
      line-height: 60px;
      font-size: 18px; 
    }
  }
  .table-box{
    width: 100%;
    height: 500px;
    overflow-y: auto;
    .table-form{
      width:95%;
      margin:0 auto;
      .table-form-title{
        font-size: 16px;
        font-weight: bold;
        display: flex;
        .table-form-button{
          width: 210px;
          height: 60px;
          line-height: 60px;
          text-align: left;
        }
        .table-form-item{
          width:90px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
      }
      .table-form-table{
        width: 100%;
        .table-title{
          width: 100%;
          font-size: 16px;
          display: flex;
          font-weight: bold;
        }
        .table-item{
          width: 90px;
          text-align: center;
          padding: 10px 0 ;
          height: 40px;
          line-height: 40px;
        }
        .num-color{
          color:#409eff
        }
         .title-item{
            width: 210px;
            height: 60px;
            line-height: 60px;
            text-align: left;
          }
        .table-item-box{
          display: flex;
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
}
</style>
