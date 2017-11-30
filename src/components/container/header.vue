<template>
  <div id="header">
      <el-row>
        <el-col :span="12">
          <div id="logo">
            <p>logo</p>
          </div>
        </el-col>
        <el-col :span="8">
            <v-menu/>
        </el-col>
        <el-col :span="4">
          <div id="user">
            <p>user</p>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import vMenu from '../content/menu'
export default {
  name: 'header',
  components: {
    vMenu
  }
}
</script>
<style lang="scss">
#header{
  background-color: rgb(84, 92, 100);
  color: white;
}
</style>
