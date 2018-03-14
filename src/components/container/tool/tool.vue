<template>
    <div class="tool" :style="{height:toolHeight +'px'}">
        <div class="tool-top">
            <div class="tool-box">
              <span class="tool-item" @click="openLayerTool()">
  				          <img src="../../../assets/images/map/图层.png" alt="">
  			      </span>
              <span class="circle" v-if="areaLayerLength > 0">{{areaLayerLength}}</span>
            </div>
			      <div class="tool-box">
              <span class="tool-item" @click="showAreaBox()">
        				<img src="../../../assets/images/map/区域.png" alt="">
        			</span>
              <span class="circle" v-if="areaList.length > 0">{{areaList.length}}</span>
            </div>
            <div class="tool-box">
                <span class="tool-item ">
                    <report-Form/>
                </span>
                <span class="circle" v-if="reportFormLength > 0">{{reportFormLength}}</span>
            </div>
            <span class="tool-item ">
				<img src="../../../assets/images/map/量算.png" alt="">
			</span>
            <span class="tool-item ">
                <v-statistics/>
			</span>
            <span class="tool-item ">
				<img src="../../../assets/images/map/用户.png" alt="">
			</span>
        </div>
        <div class="tool-bottom">
            <span class="tool-item" >
				<img src="../../../assets/images/map/局部图层.png" alt="">
			</span>
			<span class="tool-item " @click="changeMapStatus()">
				<img src="../../../assets/images/map/2D@2x.png" alt="" v-show="is2Dmap">
                <img src="../../../assets/images/map/3D@2x.png" alt="" v-show="!is2Dmap">
			</span>
			<span class="tool-item ">
				<img src="../../../assets/images/map/定位.png" alt="">
			</span>
        </div>
        <div class="layer-tool-box" v-show="layerToolVisible">
            <div class="layer-tool-content">
              <div class="layer-tool-item">
                  <img src="../../../assets/images/map/矢量3D.png" title="矢量地图" width="90" height="60" alt="">
              </div>
              <div class="layer-tool-item">
                  <img src="../../../assets/images/map/渲染图标.png" title="晕渲地图" width="90" height="60" alt="">
              </div>
              <div class="layer-tool-item">
                  <img src="../../../assets/images/map/影像图标.jpg" title="影像地图" width="90" height="60" alt="">
              </div>
            </div>
            <layer-control></layer-control>
        </div>
        <div class="area-box" v-show="areaBoxIsShow">
          <area-control></area-control>
        </div>
    </div>
</template>
<script>
import vStatistics from '../statistics/statistics.vue'
import reportForm from '../reportForm/reportForm.vue'
import LayerControl from '@/components/container/layerControl/layerControl'
import AreaControl from '@/components/container/areaControl/areaControl'

import {mapGetters} from 'vuex'

export default {
  components: {
    vStatistics,
    reportForm,
    LayerControl,
    AreaControl
  },
  data(){
      return{
          toolHeight:window.innerHeight *0.8,
          is2Dmap:true,
          layerToolVisible:false,
          areaBoxIsShow: false
      }
  },
  computed: {
    ...mapGetters([
      'areaList',
      'activeAreaInfoList',
      'areaInfoData',
      'searchItemMacroList'
    ]),
    areaLayerLength() {
      let len = 0
      this.activeAreaInfoList.map(v => {
        if(v.isActive) {
          len += 1
        }
      })
      this.searchItemMacroList.map(v => {
        if(v.isActive) {
          len += 1
        }
      })
      return len
    },
    reportFormLength(){
       let len = 0
       for(var i in this.areaInfoData){
           if(this.areaInfoData[i].target.length>0 && this.areaInfoData[i].isActive){
            len ++
           }
           if(this.areaInfoData[i].children.length){
               for(var j in this.areaInfoData[i].children){
                   if(this.areaInfoData[i].children[j].target.length>0 && this.areaInfoData[i].children[j].isActive){
                        len ++
                    }
                    if(this.areaInfoData[i].children[j].children.length>0){
                        for(var k in this.areaInfoData[i].children[j].children){
                            if(this.areaInfoData[i].children[j].children[k].target.length>0 && this.areaInfoData[i].children[j].children[k].isActive){
                                len ++
                            }
                        }
                    }
               }
           }
       }
       return len
    }
  },
  methods:{
    //2D 3D切换
    changeMapStatus() {
        this.is2Dmap = !this.is2Dmap;
        if(this.is2Dmap){
            d2cMap.easeTo({pitch: 0});
        }else{
            d2cMap.easeTo({pitch: 60});
        }
    },
    //打开图层切换
    openLayerTool() {
        this.layerToolVisible = !this.layerToolVisible;
    },
    // getReportFormLength(data){
    //     for(let i in data){
    //       this.reportFormLength ++
    //       if(data[i].children.length > 0){
    //         this.getReportFormLength(data[i].children)
    //       }else{
    //         continue
    //       }
    //     }
    // },
    showAreaBox() {
      this.layerToolVisible = false
      this.areaBoxIsShow = !this.areaBoxIsShow
    }
  }
}
</script>
<style lang="scss" scoped>
    .circle {
      position: absolute;
      top: 5px;
      right: 0;
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background-color: red;
      color: #fff;
      font-size: 12px;
      line-height: 16px;
    }
    .tool{
        width: 60px;
        .tool-top{
            position:absolute;
            top: 0;
            left: 0;
        }
        .tool-box {
          position: relative;
        }
        .tool-item{
            display: inline-block;
            width:60px;
            height: 60px;
            cursor: pointer;
            img {
      				margin: 0 auto;
      				display: block;
      				width: 60px;
      				height: 60px;
      			}
        }
        .tool-bottom{
            position:absolute;
            bottom: 0;
            left: 0;
        }
        .layer-tool-box{
          display: flex;
          flex-direction: column;
            width: 310px;
            background-color: #fff;
            position: absolute;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            top: 0;
            right: 70px;
            .layer-tool-content {
              display: flex;
              border-bottom: 1px solid #e4e7ed;
              .layer-tool-item{
                  margin: 10px 0 10px 10px;
                  cursor: pointer;
                  img {
                    display: block;
                  }
              }
            }
        }
        .area-box {
          width: 310px;
          position: absolute;
          top: 65px;
          right: 70px;
        }
    }
</style>
