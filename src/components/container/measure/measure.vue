<template>
  <div>
      <img src="../../../assets/images/map/量算.png" width="60" height="60" alt="" @click="createMeasure()">
      <div class="measure-box">
          <div class="measure-num">50000公里</div>
          <div class="measure-type">
              <span class="measure-type-name measure-type-line measure-type-active">线</span>
              <span class="measure-type-name measure-type-point">面</span>
          </div>
          <div class="measure-num-clear">
          </div>
          <div class="measure-quit">
              退出
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{

      }
  },
  methods:{
    createMeasure(){
        this.$mapHelper.setIsMeasure(true)
        d2cMap.getCanvas().style.cursor = 'crosshair';
        var Measure = {}
        var measure = new d2c.distanceLayer(d2cMap)
        Measure.measure = measure
        this.$mapHelper.measureOnClickCallback(function (e) {
             Measure.measure.addLine(e)
        })
        // this.$mapHelper.onDbClickCallback(function (e) {
        //     var count = Measure.measures.length
        //     var measure = Measure.measures[count] = new d2c.distanceLayer(d2cMap)
        //     Measure.measure = measure
        // });

      }
  }
}
</script>
<style lang="scss" scoped>
    .measure-box{
        width: 500px;
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
            .measure-type-active{
                background-color:#fff;
                color:  #8B8878;
            }
        }
        .measure-num-clear{
            width: 50px;
            height: 50px;
            background: url(../../../assets/images/legend/allDelLayers@2x.png) no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
    }
</style>

