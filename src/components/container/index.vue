<template>
    <div>
      <div class="side-box">
        <el-row>
          <el-col :span="24">
              <!-- <v-header/> -->
              <div class="side-top-box" :class="!isShow?'slideOutLeft':'slideInLeft'">
                <v-search/>
                <v-tab/>
                <info-popup></info-popup>
                <i class="switch-icon" :class="{'show-icon': isShow}" @click="toggle()"></i>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="router"/>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive" class="router"/>
            </el-col>
        </el-row>
      </div>
      <div class="topic-box">
        <v-topic/>
      </div>
      <div class="right-tool">
        <v-tool/>
      </div>
    </div>
</template>

<script>
// import vHeader from './header'
  import vSearch from './search/search'
  import vTab from './tab/tab'
  import vTopic from './topic/topic'
  import vTool from './tool/tool'
  import InfoPopup from '@/components/common/infoPopup'
  export default {
    name: 'container',
    components: {
      vSearch,
      vTab,
      vTopic,
      vTool,
      InfoPopup
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      toggle() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style lang="scss" scoped>
  .side-box {
    position: absolute;
    top: 0;
    left: 0;
  }
  .side-top-box {
    width: 350px;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 99;
    .switch-icon {
      position: absolute;
      top: 70px;
      right: -44px;
      display: block;
      width: 44px;
      height: 40px;
      background:transparent url('../../assets/images/catalog/hidden@2x.png') no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
    .show-icon {
      background:transparent url('../../assets/images/catalog/show@2x.png') no-repeat;
      background-size: 100%;
    }
  }
  .topic-box {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
  .right-tool{
    position: absolute;
    right: 15px;
    top:30px;
  }
</style>
