<template>
  <div id="toolbar">
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">放大</el-menu-item>
    <el-menu-item index="2">放大</el-menu-item>
    <el-menu-item index="3">放大</el-menu-item>
    <el-menu-item index="4">放大</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['map'],
  name: 'toolbar',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
$height_box: 40px;

#toolbar {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
}
.el-menu--horizontal .el-menu-item{
    height: $height_box;
    line-height: $height_box;
}
</style>
