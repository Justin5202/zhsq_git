<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item index="/map_test">地图</el-menu-item>
      <el-menu-item index="/test_page">其它页面</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: this.$route.path
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
.el-menu--horizontal{
  border-bottom: 0px
}
</style>
