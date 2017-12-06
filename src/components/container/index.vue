<template>
    <div>
        <el-row>
          <el-col :span="24">
              <v-header/>
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
</template>

<script>
import vHeader from '../content/header'
export default {
  name: 'container',
  components: {
    vHeader
  }
}
</script>

<style lang="scss" scoped>

</style>

