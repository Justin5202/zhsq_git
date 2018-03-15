<template>
  <div>
      <img src="../../../assets/images/map/量算.png" width="60" height="60" alt="" @click="createMeasure()">
      <div class="measure-box" v-show="measureBoxShow">
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
          measureBoxShow:false,
          measureType:""
      }
  },
  computed:{
    ...mapGetters([
      'measureNum'
    ])
  },
  methods:{
    createMeasure(){
        this.measureBoxShow = true
        this.$mapHelper.setIsMeasure(true)
        d2cMap.getCanvas().style.cursor = 'crosshair';
        window.Measure = {}
        this.changeMeasureType('line')
    },
    changeMeasureType(type){
        this.measureType = type
        if(Measure.measureLine){
            Measure.measureLine.remove()
            window.Measure = {}
        }else if(Measure.measurePlane){
            Measure.measurePlane.remove()
            window.Measure = {}
        }
        if(type == 'line'){
            this.setMeasurNum("0米") 
            Measure.measureLine = new d2c.distanceLayer(d2cMap)
            this.$mapHelper.measureOnClickCallback(this.drawLine)
        }else if(type == 'plane'){
            this.setMeasurNum("0平方米") 
            Measure.measurePlane = new d2c.areaLayer(d2cMap)
            this.$mapHelper.measureOnClickCallback(this.drawPlane)
        }
    },
    clearMeasureResult(){
        if(Measure.measureLine){
            this.setMeasurNum("0米") 
            Measure.measureLine.remove()
            Measure = {}
            Measure.measureLine = new d2c.distanceLayer(d2cMap)
        }else if(Measure.measurePlane){
            this.setMeasurNum("0平方米") 
            Measure.measurePlane.remove()
            Measure = {}
            Measure.measurePlane = new d2c.areaLayer(d2cMap)
        }
    },
    drawLine(e){
        Measure.measureLine.addLine(e) 
        Measure.measureLine.removeMarker()
        var distanceArray = Measure.measureLine.linestring.geometry.coordinates
        var distance = turf.lineDistance(turf.lineString(distanceArray))
        if(distance > 1){
            distance = distance.toFixed(1) +'公里'
        }else{
            distance = (distance*1000).toFixed(0) +'米'
        }
        this.setMeasurNum(distance)
    },
    drawPlane(e){
        Measure.measurePlane.addPolygon(e)
        Measure.measurePlane.removeMarker()
        var area =turf.area(turf.polygon(Measure.measurePlane.polygon.geometry.coordinates))
        if(area > 1000000){
            area = (area /1000).toFixed(1) +'平方公里'
        }else{
            area = area.toFixed(0) +'平方米'
        }
        console.log(area)
        this.setMeasurNum(area)
    },
    quitMeasure(){
        this.clearMeasureResult()
        this.$mapHelper.setIsMeasure(false)
        this.measureBoxShow = false
    },
    ...mapActions([
        'setMeasurNum'
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
        top: 20px;
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

