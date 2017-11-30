/*
 * @Description: 获取浏览器高宽并自适应
 * @Author: xia
 * @Date: 2017-11-29 19:00:52
 * @Last Modified by: xia
 * @Last Modified time: 2017-11-29 19:44:16
 */

export default {
  name: 'window',
  data () {
    return {
      window: {
        height: window.screen.height,
        width: window.screen.width
      }
    }
  },
  created () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.$set(this.window, 'height', document.documentElement.clientHeight)
      this.$set(this.window, 'width', document.documentElement.clientWidth)
    }
  }
}
