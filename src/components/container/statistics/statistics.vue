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
      <div class="statistics-dailog" :style="dailogStyle" v-show="displayStatistics">
          <div class="statistics-dailog-title">
              <div class="title-context">统计结果</div>
              <div class="dailog-close" @click="dailogClose()"></div>
          </div>
          <div class="statistics-dailog-context">
              <ul v-for="item in statisticsList" v-if="item.titleNum > 0">
                  <li class="context-title">{{item.title}}</li>
                  <li v-if="item.contextNum">
                      <ul>
                          <li class="context-text">{{item.context}}</li>
                      </ul>
                  </li>
              </ul>
          </div>
      </div>
      <div class="statistics-mask" :style="maskStyle" v-show="displayStatistics"></div>
  </div>
</template>
<script>
import {getSelectTargetType,getStatisticsDetails} from '@/api/datasheets.js'
export default {
  data(){
      return{
         conditionList:[],
         statisticsConditionShow:false,
         statisticsToolShow:false,
         displayStatistics:false,
         shape:"" ,
         dataId:"",
         draw:{},
         maskStyle:{
             width:window.innerWidth +'px',
             height:window.innerHeight + 'px'
         },
         dailogStyle:{
             top: window.innerHeight/2 - 250 +'px',
             right:window.innerWidth/2 - 190 +'px'
         },
         statisticsList:[]
      }
  },
  methods:{
      openStatisticsCondition(){
          if(this.conditionList.length == 0){
            getSelectTargetType().then(res =>{
                this.conditionList = res.data
                for(var i in this.conditionList){
                    this.conditionList[i].isActive = false
                }
                this.statisticsConditionShow = true
            })
          }else{
              this.statisticsConditionShow = true
          }
      },
      chageImageStatus(index){
          this.conditionList[index].isActive = !this.conditionList[index].isActive
          this.conditionList.splice(index, 1, this.conditionList[index])
      },
      startDrawArea(){
        var sum = 0;
        this.dataId = '';
        d2cMap.getCanvas().style.cursor = 'crosshair';
        for(var i= 0; i < this.conditionList.length;i++){
            if(this.conditionList[i].isActive){
                sum ++
                this.dataId += this.conditionList[i].targetId + ','
            }
        }
        if(sum > 0){
            this.dataId = this.dataId.substring(0,this.dataId.length - 1)
            this.statisticsToolShow = true
            this.statisticsConditionShow = false
        }
        this.$mapHelper.setIsMeasure(true)
        if(this.draw.drawPlane){

        }else{
            this.draw.drawPlane = new d2c.areaLayer(d2cMap)
            this.$mapHelper.measureOnClickCallback(this.getAreaPoint)
        }
      },
      getAreaPoint(e){
          this.draw.drawPlane.addPolygon(e)
          this.draw.drawPlane.removeMarker()
          var coordinates =  this.draw.drawPlane.polygon.geometry.coordinates
          var params = '[['
          for(var i = 0; i < coordinates['0'].length;i++){
              if(i == coordinates[0].length -1){
                params += '[\"' + coordinates['0'][i][0] + '\"' + ',' + '\"' + coordinates['0'][i][1] + '\"]'
              }else{
                params += '[\"' + coordinates['0'][i][0] + '\"' + ',' + '\"' + coordinates['0'][i][1] + '\"]' + ','
              }
          }
          params += ']]'
          this.shape = params
      },
      //获取统计数据
      statisticInfo(){
          getStatisticsDetails(this.shape,this.dataId).then(res =>{
              this.statisticsList = [];
              console.log(res.data)
              for(var m in res.data){
                for(var n = 0 ;n < res.data[m]['listorder'].length;n++){
                   var title = res.data[m]['listorder'][n]+ '（' + '个数' + ':'+  res.data[m][res.data[m]['listorder'][n]]['data']['doc_count'] +'）'
                   var type = res.data[m][res.data[m]['listorder'][n]]['fields']
                   var context = res.data[m][res.data[m]['listorder'][n]]['fieldsName'] + ':' + ' ' + res.data[m][res.data[m]['listorder'][n]]['data'][type]
                   var contextNum = parseInt(res.data[m][res.data[m]['listorder'][n]]['data'][type])
                   var titleNum = parseInt(res.data[m][res.data[m]['listorder'][n]]['data']['doc_count'])
                   this.statisticsList.push({'title':title,'context':context,'contextNum':contextNum,'titleNum':titleNum})
                }
              }
              this.displayStatistics = true;
          })
      },
      //清除画板
      clearDrawResult(){
          if(this.draw.drawPlane){
            this.draw.drawPlane.remove()
            this.draw = {}
            this.draw.drawPlane = new d2c.distanceLayer(d2cMap)
          }
      },
      //退出测量
      quitDraw(){
        this.clearDrawResult()
        this.dataId = ""
        this.statisticsConditionShow = false
        this.statisticsToolShow=false
        d2cMap.getCanvas().style.cursor = '';
      },
      //关闭统计面板
      dailogClose(){
          this.displayStatistics = false
      }
  }
}
</script>
<style lang="scss" scoped>
.statistics-condition{
    width: 222px;
    background-color: #ffffff;
    border: 1px solid #eee;
    position:absolute;
    top:70px;
    right: 80px;
    border-radius: 4px;
    .statistics-arrow{
        width: 0;
        height: 0;
        position: absolute;
        right: -20px;
        top:75px;
        border-top: 10px solid transparent;
        border-left: 20px solid #fff;
        border-bottom: 10px solid transparent;
        border-radius: 4px;
    }
    .statistics-item-box{
        width: 222px;
        height: 250px;
        overflow-y: auto;
        border-radius: 4px 0 0 0;
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
    .statistics-operation{
        display: flex;
        background-color:#dcdfe6;
        border-radius: 0 0 4px 4px;
        .statistics-operation-item{
            display: inline-block;
            width: 110px;
            line-height: 40px;
            font-size: 17px;
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
    border-radius: 4px;
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
.statistics-dailog{
    width: 390px;
    height: 500px;
    position: absolute;
    top: 100px;
    right: 60px;
    background-color: #fff;
    z-index: 1001;
    .statistics-dailog-title{
        width: 390px;
        height: 50px;
        display: flex;
        background-color: #535353;
        .title-context{
            width: 340px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            text-align: left;
            padding-left:15px;
        }
        .dailog-close{
            width: 50px;
            height: 50px;
            background:url(../../../assets/images/catalog/close.png) no-repeat center;
            background-size: 60%;
        }
    }
}
.statistics-dailog-context{
    width: 390px;
    height: 450px;
    overflow-y: auto;
    ul{
        list-style: none;
        font-family: '微软雅黑'
    }
    .context-title{
        width: 370px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        background-color:#eee;
        font-weight: bold;
        font-size: 16px;
        text-align: left;
        padding-left: 20px;
    }
    .context-text{
        width: 360px;
        display: inline-block;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        text-align: left;
        padding-left: 30px;
    }
}
.statistics-mask{
    position: fixed;
    top: 0;
    left:0;
    z-index: 1000;
    background-color:rgba(0,0,0,0.5);
}
</style>
