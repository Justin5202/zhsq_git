export default {
  props: ['map'],
  name: 'area',
  data () {
    return {
      measures: [],
      currentMeasure: null
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.destroye()
  },
  methods: {
    init () {
      this.disableDblclick()
      this.updateMeasure()
      this.bindEvent()
    },
    bindEvent () {
      this.map.on('click', this.handleClick)
      this.map.on('dblclick', this.updateMeasure)
    },
    offEvent () {
      this.map.off('click', this.handleClick)
      this.map.off('dblclick', this.updateMeasure)
    },
    handleClick (e) {
      this.currentMeasure.addPolygon(e)
    },
    updateMeasure () {
      const count = this.measures.length
      this.currentMeasure = this.measures[count] = new window.d2c.areaLayer(this.map)
    },
    disableDblclick () {
      this.map.doubleClickZoom.disable()
    },
    enableDblclick () {
      this.map.doubleClickZoom.enable()
    },
    destroye () {
      this.measures.map(measure => {
        measure.remove()
        measure.removeMarker()
      })
      this.measures = []
      this.offEvent()
    }
  },
  render () {}
}
