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
        var Measure = {}
        var measure = new d2c.distanceLayer(d2cMap)
        Measure.measure = measure
        d2cMap.on("click",function (e) {
            return Measure.measure.addLine(e)
        });
        d2cMap.on("dblclick",function (e) {
            console.log(Measure)
            var count = Measure.measures.length
            var measure = Measure.measures[count] = new d2c.distanceLayer(map)
            Measure.measure = measure
            Measure.measures = []
        });
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>

