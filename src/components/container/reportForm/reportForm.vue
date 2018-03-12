<template>
  <div>
      <img src="../../../assets/images/map/报表.png"  width="60" height="60" alt="" @click="reportFormVisible = true">
      <el-dialog
        title="数据详情"
        :visible.sync="reportFormVisible"
        width="60%"
        center>
        <span>
            <table class="table-form">
              <tr class="table-form-title">
                <td class="table-form-button"><el-button @click="getAreaInfoData()">清空</el-button></td>
                <td class="table-form-item">区域</td>
                <td class="table-form-item">2017</td>
                <td class="table-form-item">2016</td>
                <td class="table-form-item">2015</td>
              </tr>
              <tr>
                <td style="width:100%" colspan="5">
                  <table class="table-form-table">
                    <tr class="table-title">
                      <td style="width:32%">建设用地</td>
                      <td class="table-item">
                        <img src="../../../assets/images/catalog/关闭搜索.png" width="40" height="40">
                      </td>
                      <td class="table-item"></td>
                      <td class="table-item"></td>
                      <td class="table-item"></td>
                    </tr>
                    <tr>
                      <td style="width:32%">城镇建设</td>
                      <td class="table-item">万州区</td>
                      <td class="table-item num-color">57.92</td>
                      <td class="table-item num-color">56</td>
                      <td class="table-item num-color">54.2</td>
                    </tr>
                  </table>
                 </td>
              </tr>
            </table>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reportFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="reportFormVisible = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'Vuex'
export default {
  data(){
      return{
        reportFormVisible:false
      }
  },
  computed:{
    ...mapGetters([
      'areaInfoData'
    ])
  },
  methods:{
      getAreaInfoData:function(){
        console.log(this.areaInfoData);
      }
  }
}
</script>
<style lang="scss" scoped>
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
        width:17%;
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
        width: 17%;
        text-align: center;
      }
      .num-color{
        color:#409eff
      }
    }
    tr{
      width: 100%;
    }
  }
</style>
