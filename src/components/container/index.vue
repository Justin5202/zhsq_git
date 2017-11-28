<template>
    <div>
        <el-row>
          <el-col :span="24">
              <v-header/>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import vHeader from './header'
export default {
  name: 'container',
  components: {
    vHeader
  }
}
</script>

<style>

</style>
