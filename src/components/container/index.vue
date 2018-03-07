<template>
    <div>
      <div class="side-box">
        <el-row>
          <el-col :span="6">
              <!-- <v-header/> -->
              <v-search/>
              <v-tab/>
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
    </div>
</template>

<script>
// import vHeader from './header'
  import vSearch from './search/search'
  import vTab from './tab/tab'
  import vTopic from './topic/topic'
  export default {
    name: 'container',
    components: {
      vSearch,
      vTab,
      vTopic
    }
  }
</script>

<style lang="scss" scoped>
  .side-box {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .topic-box {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
</style>

