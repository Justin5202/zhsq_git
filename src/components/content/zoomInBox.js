export default {
  name: 'zoomInBox',
  props: ['map'],
  created () {
    this.init()
    this.map.dragPan.disable()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    init () {
      this.listen()
    },
    destroy () {
      this.offListen()
      this.map.dragPan.enable()
    },
    listen (e) {
      this.el = this.map.boxZoom._el
      this.el.addEventListener('mousedown', this.handleMouseDown)
    },
    offListen () {
      this.el.removeEventListener('mousedown', this.handleMouseDown)
    },
    handleMouseDown (e) {
      const temp = {}
      for (var i in e) {
        temp[i] = e[i]
      }
      temp.shiftKey = true
      temp.button = 0
      this.map.boxZoom._onMouseDown(temp)
    }
  },
  render () {}
}
