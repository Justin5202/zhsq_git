<template>
  <div>
      <img src="../../../assets/images/map/量算.png" width="60" height="60" alt="" @click="createMeasure()">
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
        this.$mapHelper.isMeasure = true
        var Measure = {}
        var measure = new d2c.distanceLayer(d2cMap)
        Measure.measure = measure
        // d2cMap.on("click",function (e) {
        //      Measure.measure.addLine(e)
        // });
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
    
</style>

