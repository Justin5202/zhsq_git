<template>
  <div>
      <img src="../../../assets/images/map/统计.png"  width="60" height="60" alt="" @click="openStatisticsCondition()">
      <div class="statistics-condition" v-show="statisticsConditionShow">
          <div class="statistics-arrow">
          </div>
          <div class="statistics-item-box scrollStyle">
              <div class="statistics-item" v-for="(item,index) in conditionList">
                  <div class="statistics-item-name">{{item.target}}</div>
                  <div class="statistics-item-img unchecked" v-if="item.isActive == false" @click="chageImageStatus(index)"></div>
                  <div class="statistics-item-img checked" v-if="item.isActive == true" @click="chageImageStatus(index)"></div>
              </div>
          </div>
          <div class="statistics-operation">
              <span class="statistics-operation-item" @click="statisticsConditionShow = false">取消</span>
              <span class="statistics-operation-item operation-item-border" @click="startDrawArea()">确定</span>
          </div>
      </div>
      <div class="statistics-draw" v-show="statisticsToolShow">
          <div class="statistics-draw-clear" @click="clearDrawResult()">
          </div>
          <div class="statistics-font statistics-draw-confirm" @click="statisticInfo()">
              统计
          </div>
          <div class="statistics-font statistics-draw-quit" @click="quitDraw()">
              退出
          </div>
      </div>
  </div>
</template>
<script>
import {getSelectTargetType} from '@/api/datasheets.js'
export default {
  data(){
      return{
         conditionList:[],
         statisticsConditionShow:false,
         statisticsToolShow:false
      }
  },
  methods:{
      openStatisticsCondition(){
          getSelectTargetType().then(res =>{
              this.conditionList = res.data
              for(var i in this.conditionList){
                  this.conditionList[i].isActive = false
              }
              this.statisticsConditionShow = true
          })
      },
      chageImageStatus(index){
          this.conditionList[index].isActive = !this.conditionList[index].isActive
          this.conditionList.splice(index, 1, this.conditionList[index])
      },
      startDrawArea(){
          var sum = 0;
          for(var i in this.conditionList){
              if(this.conditionList[i].isActive){
                sum ++
              }
          }
          if(sum > 0){
               this.statisticsToolShow = true
               this.statisticsConditionShow = false
          }
          var draw = new d2c.draw({displayControlsDefault: false})
          d2cMap.addControl(draw)
          draw.changeMode('draw_polygon');
          d2cMap.on('draw.create', function (e) {
            console.log(e.features);
            // draw.trash();
            // draw.changeMode('simple_select');
          });
      }
  }
}
</script>
<style lang="scss" <style lang="scss" scoped>
.statistics-condition{
    width: 222px;
    height: 300px;
    background-color: #ffffff;
    border: 1px solid #eee;
    position:absolute;
    top:10px;
    right: 80px;
    border-radius: 15px 0 15px 15px;
    .statistics-arrow{
        width: 0;
        height: 0;
        position: absolute;
        right: -20px;
        top:135px;
        border-top: 10px solid transparent;
        border-left: 20px solid #fff;
        border-bottom: 10px solid transparent;
        border-radius: 4px;
    }
    .statistics-item-box{
        width: 222px;
        height: 250px;
        overflow-y: auto;
        border-radius: 15px 0 0 0;
        padding-top: 5px;
        .statistics-item{
            width: 210;
            height: 50px;
            margin-left: 10px; 
            display: flex;
            .statistics-item-name{
             width: 160px;
             height: 50px;
             line-height: 50px;
             text-align: left;
             border-bottom: 1px solid #ccc;
            }
            .statistics-item-img{
                width: 50px;
                height: 50px;
                border-bottom: 1px solid #ccc;
            }
            .unchecked{
                background:url(../../../assets/images/legend/未勾选.png) no-repeat center;
                background-size: 90%;
            }
            .checked{
                background:url(../../../assets/images/legend/勾选.png) no-repeat center;
                background-size: 90%;
            }
        }
    }
    // 改变滚动条样式
    .scrollStyle::-webkit-scrollbar {/*滚动条整体样式*/
        width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .scrollStyle::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
         background: #535353;
    }
    .scrollStyle::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 2px;
        background: #EDEDED;
    }
    .statistics-operation{
        height: 50px;
        display: flex;
        background-color:#dcdfe6;
        border-radius: 0 0 15px 15px;
        .statistics-operation-item{
            display: inline-block;
            width: 110px;
            height: 32px;
            line-height: 32px;
            font-size: 17px; 
            margin-top: 8px;
        }
    }
    .operation-item-border{
        border-left: 1px solid #fff;
    }
}
.statistics-draw{
    width: 180px;
    height: 50px;
    background-color: #fff;
    display: flex;
    position: fixed;
    top: 20px;
    right: 120px;
    border-radius: 10px;
    background-color: #8B8878;
    .statistics-draw-clear{
        width: 50px;
        height: 50px;
        background: url(../../../assets/images/cal/allDel.png) no-repeat;
        background-size: 100%;
        cursor: pointer;
    }
    .statistics-draw-confirm{
        color: rgb(240, 245, 245);
    }
    .statistics-draw-quit{
        color: rgba(245, 245, 245,0.8);
    }
    .statistics-font{
        width: 60px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 17px;
    }
}
</style>
