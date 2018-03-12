<template>
    <div class="tool" :style="{height:toolHeight +'px'}">
        <div class="tool-top">
            <span class="tool-item" @click="openLayerTool()">
				<img src="../../../assets/images/map/图层.png" alt="">
			</span>
			<span class="tool-item ">
				<img src="../../../assets/images/map/区域.png" alt="">
			</span>
			<span class="tool-item ">
                <report-Form/>
			</span>
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
            <div class="layer-tool-item">
                <img src="../../../assets/images/map/矢量3D.png" title="矢量地图" width="90" height="50" alt="">
                <div class="layer-tool-font">矢量</div>
            </div>
            <div class="layer-tool-item">
                <img src="../../../assets/images/map/渲染图标.png" title="晕染地图" width="90" height="50" alt="">
                <div  class="layer-tool-font">晕染</div>
            </div>
            <div class="layer-tool-item">
                <img src="../../../assets/images/map/影像图标.jpg" title="影像地图" width="90" height="50" alt="">
                <div  class="layer-tool-font">影像</div>
            </div>
            <div class="layer-tool-arrow"></div>
        </div>
    </div>
</template>
<script>
import vStatistics from '../statistics/statistics.vue'
import reportForm from '../reportForm/reportForm.vue'
export default {
    components: {
        vStatistics,
        reportForm
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
            width: 310px;
            height: 80px;
            background-color:#fff;
            position: absolute;
            border:1px solid #eee;
            border-radius: 5px;
            top:-10px;
            right: 75px;
            .layer-tool-item{
                float: left;
                margin: 10px 0 0 10px ;
                cursor: pointer;
                .layer-tool-font{
                    font-size: 12px;
                }
            }
            .layer-tool-arrow{
                width: 0; 
                height: 0; 
                position: absolute;
                right: -20px;
                top:30px;
                border-top: 10px solid transparent; 
                border-left: 20px solid#fff; 
                border-bottom: 10px solid transparent; 
            }
        }
    }
</style>


