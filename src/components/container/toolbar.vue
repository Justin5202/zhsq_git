<template>
  <div id="toolbar">
    <el-menu
      class="el-menu-toolbar"
      mode="horizontal"
      ref="toolbar"
      :default-active="activeIndex"
      @select="handleSelect"
      background-color="#fff"
      text-color="#fff" 
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item ref='tool' v-for='(item, index) in menu' 
        :index="item.route"  
        :key="index" 
        :title="item.title"
        @click="handleClick(item.action)">
        <span><img :src="item.icon"/></span>
      </el-menu-item>
      <router-view class="toolbar-router" :style="routerStyle" :map='d2cmap'/>
    </el-menu>
  </div>
</template>

<script>
import menuSetting from '@/settings/toolbar'
export default {
  props: ['map'],
  name: 'toolbar',
  data () {
    return {
      activeIndex: this.$route.path,
      lastIndex: this.$route.path,
      menu: menuSetting,
      routerStyle: {
        right: '0px'
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.lastIndex = to.path
      this.updateRouterView()
    }
  },
  computed: {
    d2cmap () {
      return this.map
    },
    currentTool () {
      return this.menu.filter((item, index) => item.route === this.activeIndex)
    }
  },
  created () {
    this.$router.push({
      path: '/'
    })
  },
  mounted () {
    this.updateRouterView()
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
    },
    updateRouterView () {
      let order = 0
      if (this.currentTool.length !== 0)order = this.currentTool[0].id
      const width = this.$refs.tool[0].$el.clientWidth
      return this.$set(
        this.routerStyle,
        'right',
        (this.menu.length - order) * width + 'px'
      )
    },
    handleClick (action) {
      action && action(this.map, this.$refs.toolbar, this.activeIndex, this.lastIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
$height_box: 35px;

#toolbar {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
  box-shadow: 0px 0px 3px 1px #888888;
}
.el-menu--horizontal .el-menu-item {
  height: $height_box;
  line-height: $height_box;
  user-select: none;
  border-bottom: 0px;
  padding: 0 0px;
  span{
    border-left: 1px #dbdee2 dashed;
      padding: 0 10px;
    }
}
.el-menu-item:first-child{
  span {
    border-left: 0px;
  }
}

.toolbar-router {
  box-shadow: 0px 0px 1px 1px #888888;
  background-color: white;
  position: absolute;
  top: 60px;
}
</style>
