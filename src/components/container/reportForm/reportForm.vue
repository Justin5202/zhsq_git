<template>
  <div>
      <img src="../../../assets/images/map/报表.png"  width="60" height="60" alt="" @click="openReportForm">
      <el-dialog
        title="数据详情"
        :visible.sync="reportFormVisible"
        width="60%"
        center>
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
              <tr v-for="(item,index) in dataList" :key="item.id" class="table-form-content">
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
                    <tr v-for="data in item.dataByYear" :key="data.id">
                      <td style="width:32%">{{data.type}}</td>
                      <td class="table-item">{{data["area"]}}</td>
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
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="reportFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="reportFormVisible = false">确 定</el-button>
        </span> -->
        </el-dialog>
  </div>
</template>
<script>
import {getMsMacroData} from '@/api/datasheets.js'
import {mapGetters} from 'Vuex'
export default {
  data(){
      return{
        reportFormVisible:false,
        dataId:'',
        dataList:[]
      }
  },
  computed:{
    ...mapGetters([
      'areaInfoData'
    ])
  },
  methods:{
      //打开报告模态框
      openReportForm:function(){
        this.reportFormVisible = true
        this.dataId = ""
        this.dataList = []
        this.getDataId(this.areaInfoData)
        this.dataId = this.dataId.substring(1)
        var typeNum = 0;//用于保存数据类型数量
        var areaNum = 0;//用于保存不同的地区数量
        //获取详情
        getMsMacroData(this.dataId).then(res =>{
          for(let i in res.data){
            typeNum++
            areaNum = 0 //只取一次循环的数量
            for(let j in res.data[i]){
              areaNum ++ 
              var dataByYear = [];//用于保存每条数据
              for(let k = 0;k<res.data[i][j]['year'].length;k++){
                var yearList = res.data[i][j]['year'][k]
                var filedsData = res.data[i][j][yearList][0].filedsData.split('|ZX|')
                for(var p=0;p< filedsData.length;p++){
                  if(dataByYear.length < filedsData.length){
                    dataByYear.push({"type":filedsData[p].split(':')[0],"areaName":res.data[i][j][yearList][0].areaName,"areaCode":j,"id":p})
                  }
                  dataByYear[p][yearList] = filedsData[p].split(':')[1]||"--"
                }
                if(k == res.data[i][j]['year'].length-1){
                  this.dataList.push({"name":res.data[i][j][yearList][0].name,"id":res.data[i][j][yearList][0].dataId,"dataByYear":dataByYear})
                }
              }
            }
          }
          //将type相同的数组进行合并
          this.connectArray(this.dataList,typeNum,areaNum)
        })
      },
      //将areaInfoData中dataId拼凑返回
      getDataId:function(data){
        for(let i in data){
          this.dataId += ','+ data[i].id
          if(data[i].children.length > 0){
            this.getDataId(data[i].children)
          }else{
            continue
          }
        } 
      },
      //数组合并i
      connectArray:function(array,typeNum,areaNum){
        var result =[];
        for (var i= 0;  i< Math.ceil(array.length / areaNum); i++) {
            var start = i * areaNum;
            var end = start + areaNum;
            result.push(array.slice(start, end));
        }
        for(var m = 0;m<result.length;m++){
          for(var n = 0;n<result[m].length;n++){
            for(var k = 0;k<result[m][n].dataByYear.length;k++){
              console.log(result[m][n].dataByYear);
            }
          }
        }
      },
      //清空按钮点击
      clearForm:function(key){
        if(key!=""||key!=undefined||key!=null){
          this.dataList.splice(key,1)
        }else{
           this.dataList = [];
        }
      }
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
