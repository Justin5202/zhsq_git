<template>
  <div>
      <img src="../../../assets/images/map/量算.png" width="60" height="60" alt="" @click="createMeasure()">
      <div class="measure-box" v-if="drawPanelType == 'measure'">
          <div class="measure-num">{{measureNum}}</div>
          <div class="measure-type">
              <span class="measure-type-name measure-type-line " :class="{measureTypeActive:measureType == 'line'}" @click="changeMeasureType('line')">线</span>
              <span class="measure-type-name measure-type-point" :class="{measureTypeActive:measureType == 'plane'}" @click="changeMeasureType('plane')">面</span>
          </div>
          <div class="measure-num-clear" @click="clearMeasureResult()">
          </div>
          <div class="measure-quit" @click="quitMeasure()">
              退出
          </div>
      </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'Vuex'
export default {
  data(){
      return{
          measureType:"",
          Measure:{}
      }
  },
  computed:{
    ...mapGetters([
      'measureNum',
      'drawPanelType'
    ])
  },
  watch:{
      drawPanelType:function(val){
        if(val != 'measure'){
            this.clearMeasureResult()
        }
      }
  },
  methods:{
    createMeasure(){
        this.setDrawPanelType('measure')
        this.$mapHelper.setIsMeasure(true)
        d2cMap.getCanvas().style.cursor = 'crosshair';
        this.changeMeasureType('line')
    },
    changeMeasureType(type){
        this.measureType = type
        if(this.Measure.measureLine){
            this.Measure.measureLine.remove()
            this.Measure = {}
        }else if(this.Measure.measurePlane){
            this.Measure.measurePlane.remove()
            this.Measure = {}
        }
        if(type == 'line'){
            this.setMeasurNum("0米") 
            this.Measure.measureLine = new d2c.distanceLayer(d2cMap)
            this.$mapHelper.measureOnClickCallback(this.drawLine)
        }else if(type == 'plane'){
            this.setMeasurNum("0平方米") 
            this.Measure.measurePlane = new d2c.areaLayer(d2cMap)
            this.$mapHelper.measureOnClickCallback(this.drawPlane)
        }
    },
    clearMeasureResult(){
        if(this.Measure.measureLine){
            this.setMeasurNum("0米") 
            this.Measure.measureLine.remove()
            this.Measure = {}
            this.Measure.measureLine = new d2c.distanceLayer(d2cMap)
        }else if(this.Measure.measurePlane){
            this.setMeasurNum("0平方米") 
            this.Measure.measurePlane.remove()
            this.Measure = {}
            this.Measure.measurePlane = new d2c.areaLayer(d2cMap)
        }
    },
    drawLine(e){
        this.Measure.measureLine.addLine(e) 
        this.Measure.measureLine.removeMarker()
        var distanceArray = this.Measure.measureLine.linestring.geometry.coordinates
        var distance = turf.lineDistance(turf.lineString(distanceArray))
        if(distance > 1){
            distance = distance.toFixed(1) +'公里'
        }else{
            distance = (distance*1000).toFixed(0) +'米'
        }
        this.setMeasurNum(distance)
    },
    drawPlane(e){
        this.Measure.measurePlane.addPolygon(e)
        this.Measure.measurePlane.removeMarker()
        var area =turf.area(turf.polygon(this.Measure.measurePlane.polygon.geometry.coordinates))
        if(area > 1000000){
            area = (area /1000000).toFixed(1) +'平方公里'
        }else{
            area = area.toFixed(0) +'平方米'
        }
        this.setMeasurNum(area)
    },
    quitMeasure(){
        this.clearMeasureResult()
        this.$mapHelper.setIsMeasure(false)
        this.setDrawPanelType('unCheck')
        d2cMap.getCanvas().style.cursor = "";
    },
    ...mapActions([
        'setMeasurNum',
        'setDrawPanelType'
    ])
  }
}
</script>
<style lang="scss" scoped>
    .measure-box{
        width: 385px;
        height: 50px;
        background-color: #fff;
        display: flex;
        position: fixed;
        top: 30px;
        right: 120px;
        border-radius: 10px;
        background-color: #8B8878;
        .measure-num{
            width: 160px;
            line-height: 50px;
            text-align: center;
            color: #fff;
        }
        .measure-type{
            display: flex;
            width: 100px;
            border-radius: 10px;
            height: 32px;
            border:2px solid #fff ;
            margin-top: 7px;
            color: #fff;
            .measure-type-name{
                display: inline-block;
                width: 50px;
                height: 32px;
                line-height: 32px;
                text-align: center;
            }
            .measure-type-line{
                border-radius: 5px 0 0 5px;
            }
            .measure-type-point{
                border-radius: 0 5px 5px 0;
            }
            .measureTypeActive{
                background-color:#fff;
                color:  #8B8878;
            }
        }
        .measure-num-clear{
            width: 50px;
            height: 50px;
            background: url(../../../assets/images/cal/allDel.png) no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
        .measure-quit{
            width: 60px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 17px;
            color: #fff;
        }
    }
</style>

