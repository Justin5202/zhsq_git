<template>
<div class="tool" :style="{height:toolHeight +'px'}">
  <div class="tool-top">
    <div class="tool-box">
      <span 
        class="tool-item" 
        @click="openLayerTool()" 
        v-if="isInArray(2, this.userinfo.autuority)"
      >
  			<img src="../../../assets/images/map/图层.png" alt="">
  		</span>
      <span class="circle" v-if="areaLayerLength > 0">{{areaLayerLength}}</span>
    </div>
    <div class="tool-box">
      <span 
        class="tool-item" 
        @click="showAreaBox()" 
        v-show="isInArray(9, this.userinfo.autuority)"
      >
        <img src="../../../assets/images/map/区域.png" alt="">
      </span>
      <span class="circle" v-if="areaList.length > 0">{{areaList.length}}</span>
    </div>
    <div class="tool-box">
      <span class="tool-item"  @click="openReportForm">
        <img src="../../../assets/images/map/报表.png" alt="">
      </span>
      <span class="circle" v-if="reportFormLength > 0">{{reportFormLength}}</span>
    </div>
    <span class="tool-item" v-if="isInArray(3, this.userinfo.autuority)">
				<v-measure/>
			</span>
    <span class="tool-item" v-if="isInArray(3, this.userinfo.autuority)">
      <v-statistics/>
		</span>
    <span class="tool-item ">
			<img src="../../../assets/images/map/用户.png" alt="" @click="showUserCenter">
		</span>
  </div>
  <div class="tool-compass" @click="resetNorth" v-show="toolCompassVisible"></div>
  <div class="tool-bottom">
    <span
      class="tool-item"
      @click="toggleShowData()"
    >
				<img v-if="!IsAll" src="../../../assets/images/map/局部图层.png" alt="">
        <img v-else src="../../../assets/images/map/全景图层.png" alt="">
			</span>
    <span class="tool-item " v-show="isInArray(4, this.userinfo.autuority)" @click="changeMapStatus()">
				<img src="../../../assets/images/map/2D@2x.png" alt="" v-show="!is2Dmap">
                <img src="../../../assets/images/map/3D@2x.png" alt="" v-show="is2Dmap">
			</span>
    <!-- <span class="tool-item " v-show="isInArray(8, this.userinfo.autuority)">
				<img src="../../../assets/images/map/定位.png" alt="">
			</span> -->
  </div>
  <div class="layer-tool-box" v-if="layerControlShow">
    <div class="layer-tool-content">
      <div class="layer-tool-item" v-for="(item,index) in mapJsonAndImg.img">
        <img :src="'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test'+ item"  width="90" height="60" alt="" :title=mapJsonAndImg.name[index] @click="changeBaseMap(mapJsonAndImg.name[index])">
      </div>
    </div>
    <layer-control></layer-control>
  </div>
  <div class="area-box" v-show="areaBoxIsShow">
    <area-control></area-control>
  </div>
  <v-user-center v-show="showCenter" @close="closeUserCenter"></v-user-center>
</div>
</template>
<script>
import vStatistics from '../statistics/statistics'
import LayerControl from '@/components/container/layerControl/layerControl'
import AreaControl from '@/components/container/areaControl/areaControl'
import vMeasure from '@/components/container/measure/measure'
import vUserCenter from '@/components/Users/userCenter/userCenter'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    vStatistics,
    LayerControl,
    AreaControl,
    vMeasure,
    vUserCenter
  },
  data() {
    return {
      toolHeight: window.innerHeight * 0.8,
      is2Dmap: true,
      areaBoxIsShow: false,
      angle: "",
      toolCompassVisible: false,
      showCenter: false,
      IsAll: false
    }
  },
  created: function() {
    this.listenMapRotate()
    this.listenMapChange()
  },
  computed: {
    ...mapGetters([
      'areaList',
      'activeAreaInfoList',
      'areaInfoList',
      'searchItemMacroList',
      'userinfo',
      'mapJsonAndImg',
      'layerControlShow',
      'searchList'
    ]),
    areaLayerLength() {
      let len = 0
      this.activeAreaInfoList.map(v => {
        if (v.isActive) {
          len += 1
        }
      })
      this.searchItemMacroList.map(v => {
        if (v.isActive) {
          len += 1
        }
      })
      return len
    },
    reportFormLength() {
      let len = 0
      let type = 0
      let idArray = []
      for (var i in this.areaInfoList) {
        type = parseInt(this.areaInfoList[i].type)%10
        if ((type == 2 || type == 3)&& this.areaInfoList[i].isActive) {
          idArray.push(this.areaInfoList[i].id)
          len++
        }
        if (this.areaInfoList[i].children.length > 0) {
          for (var j in this.areaInfoList[i].children) {
            type = parseInt(this.areaInfoList[i].children[j].type)%10
            if ((type == 2 || type == 3) && this.areaInfoList[i].children[j].isActive) {
              idArray.push(this.areaInfoList[i].children[j].id)
              len++
            }
            if (this.areaInfoList[i].children[j].children.length > 0) {
              for (var k in this.areaInfoList[i].children[j].children) {
                type = parseInt(this.areaInfoList[i].children[j].children[k].type)%10
                if ((type == 2 || type == 3) && this.areaInfoList[i].children[j].children[k].isActive) {
                  idArray.push(this.areaInfoList[i].children[j].children[k].id)
                  len++
                }
              }
            }
          }
        }
      }
      this.searchList.map(v => {
        if(v.macro) {
          type = parseInt(v.macro.data.type)%10
          if (v.isActive && (type == 2 || type == 3)) {
            if(idArray.indexOf(v.macro.dataId) == -1){
              len += 1
            }
          }
        }
      })
      return len
    }
  },
  methods: {
    // 全局和局部切换
    toggleShowData() {
      this.IsAll = !this.IsAll
      if(this.IsAll) {
        this.$mapHelper.doFilterByCodeArrayAndAreacodeArray(this.$store.state.layerIdList, [])
      } else {
        this.$mapHelper.doFilterByCodeArrayAndAreacodeArray(this.$store.state.layerIdList, this.$store.state.areaCodeList)
      }
    },
    //2D 3D切换
    changeMapStatus() {
      this.is2Dmap = !this.is2Dmap
      if (this.is2Dmap) {
        d2cMap.easeTo({
          pitch: 0
        })
      } else {
        d2cMap.easeTo({
          pitch: 60
        })
      }
    },
    //地图切换
    changeBaseMap(type){
      if(type == '矢量'){
        this.$mapHelper.setMapFlay('dt')
        this.$mapHelper.setAllImageMapVisibility(false)
        this.$mapHelper.setAllDemMapVisibility(false)
        this.$mapHelper.setAllHQImageMapVisibility(false)
      }else if(type == '影像'){
        this.$mapHelper.setMapFlay('img')
        this.$mapHelper.setAllImageMapVisibility(true)
        this.$mapHelper.setAllDemMapVisibility(false)
        this.$mapHelper.setAllHQImageMapVisibility(false)
      }else if(type == '渲染'){
        this.$mapHelper.setMapFlay('dem')
        this.$mapHelper.setAllImageMapVisibility(false)
        this.$mapHelper.setAllDemMapVisibility(true)
        this.$mapHelper.setAllHQImageMapVisibility(false)
      }else if(type == '高清影像'){
        this.$mapHelper.setMapFlay('imgHQ')
        this.$mapHelper.setAllImageMapVisibility(false)
        this.$mapHelper.setAllDemMapVisibility(false)
        this.$mapHelper.setAllHQImageMapVisibility(true)
      }
    },
    //打开图层切换
    openLayerTool() {
      this.$store.commit('SET_LAYER_CONTROL_SHOW', !this.layerControlShow)
    },
    openReportForm() {
      if(this.reportFormLength>0){
        this.setReportFormShow(true)
        this.setAreaReportFormShow(false)
      }else{
        const h = this.$createElement;
        this.$msgbox({
          title:'',
            message: 
            h('span', {style:'font-size:16px'}, '暂未叠加指标数据...')
            ,
            showConfirmButton:false,
            center:true,
            showClose:true
          });
      }
    },
    showAreaBox() {
      this.layerToolVisible = false
      this.areaBoxIsShow = !this.areaBoxIsShow
    },
    listenMapRotate() {
      this.$mapHelper.onRotateCallback(this.changeAngle)
    },
    listenMapChange(){
      this.$mapHelper.onInteractiveCallback(this.mapChange)  
    },
    //获取旋转角度值
    changeAngle(angle) {
      document.getElementsByClassName("tool-compass")[0].style.transform = "rotate(" + -angle + "deg)"
      if (angle != 0) {
        this.toolCompassVisible = true
      } else if (angle == 0) {
        this.toolCompassVisible = false
      }
    },
    //监听地图改变
    mapChange(){
      if(this.layerControlShow){
        this.$store.commit('SET_LAYER_CONTROL_SHOW', false)
      }
      this.layerToolVisible = false
      this.areaBoxIsShow = false
    },
    resetNorth() {
      d2cMap.resetNorth()
    },
    ...mapActions([
      'setReportFormShow',
      'setAreaReportFormShow',
    ]),
    showUserCenter() {
      this.showCenter = true
    },
    closeUserCenter() {
      this.showCenter = false
    },
    isInArray(element, array) { // 根据用户权限控制工具的显示
      if (!array) {
        return false
      }
      return array.indexOf(element) != -1 
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
.tool {
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    .tool-box {
      position: relative;
    }
    .tool-item {
        display: inline-block;
        width: 60px;
        height: 60px;
        cursor: pointer;
        img {
            margin: 0 auto;
            display: block;
            width: 60px;
            height: 60px;
        }
    }
    .tool-compass {
        width: 100px;
        height: 100px;
        background: url("../../../assets/images/map/Compass@2x.png") no-repeat center;
        background-size: 100%;
        position: absolute;
        top: 10px;
        right: 60px;
    }

    .layer-tool-box {
        display: flex;
        flex-direction: column;
        min-width: 310px;
        background-color: #fff;
        position: absolute;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        top: 0;
        right: 70px;
        .layer-tool-content {
            display: flex;
            border-bottom: 1px solid #e4e7ed;
            .layer-tool-item {
                margin: 10px;
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
