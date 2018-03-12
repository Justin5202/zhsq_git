<template>
    <div class="tool" :style="{height:toolHeight +'px'}">
        <div class="tool-top">
            <div class="layer">
              <span class="tool-item" @click="openLayerTool()">
  				          <img src="../../../assets/images/map/图层.png" alt="">
  			      </span>
            </div>
			<span class="tool-item ">
				<img src="../../../assets/images/map/区域.png" alt="">
			</span>
			<span class="tool-item ">
				<img src="../../../assets/images/map/报表.png" alt="">
			</span>
            <span class="tool-item ">
				<img src="../../../assets/images/map/量算.png" alt="">
			</span>
            <span class="tool-item ">
				<img src="../../../assets/images/map/统计.png" alt="">
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
    </div>
</template>
<script>
import LayerControl from '@/components/container/layerControl/layerControl'

export default {
  components: {
    LayerControl
  },
  data(){
      return{
          toolHeight:window.innerHeight *0.8,
          is2Dmap:true,
          layerToolVisible:false
      }
  },
  methods:{
    //2D 3D切换
    changeMapStatus:function(){
        this.is2Dmap = !this.is2Dmap;
        if(this.is2Dmap){
            d2cMap.easeTo({pitch: 0});
        }else{
            d2cMap.easeTo({pitch: 60});
        }
    },
    //打开图层切换
    openLayerTool:function(){
        this.layerToolVisible = !this.layerToolVisible;
    }
  }
}
</script>
<style lang="scss" scoped>
    .tool{
        width: 60px;
        .tool-top{
            position:absolute;
            top: 0;
            left: 0;
        }
        .tool-item{
            display: inline-block;
            width:60px;
            height: 60px;
            img {
				margin: 0 auto;
				display: block;
				width: 60px;
				height: 60px;
			}
            cursor: pointer;
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
    }
</style>
