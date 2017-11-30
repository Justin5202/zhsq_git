<template>
    <div>
        <el-row>
          <el-col :span="24">
              <v-header/>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <v-map/>
              <router-view class="router"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import vHeader from './header'
import vMap from '../content/map_test'
export default {
  name: 'container',
  components: {
    vHeader,
    vMap
  }
}
</script>

<style lang="scss" scoped>

</style>

