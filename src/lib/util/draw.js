/**
 * Draw Manager
 *
 * @param {any} opt functions of every manager
 */
const Manager = function (opt) {
        // preserve
  this.measures = []

        // init callback
  this.create = opt.create
  this.add = opt.add

        // bind
  this.addPoint = this.addPoint.bind(this)
  this.addMeasure = this.addMeasure.bind(this)
}

Manager.prototype.bindEvent = function () {
  Manager.map.on('click', this.addPoint)
  Manager.map.on('dblclick', this.addMeasure)
}

Manager.prototype.offEvent = function () {
  Manager.map.off('click', this.addPoint)
  Manager.map.off('dblclick', this.addMeasure)
}

Manager.prototype.addPoint = function (e) {
  return this.measure[this.add](e)
}

Manager.prototype.setMeasure = function (measure) {
  this.measure = measure
}

Manager.prototype.addMeasure = function () {
  var count = this.measures.length
  var measure = this.measures[count] = new this.create(Manager.map)
  this.setMeasure(measure)
}

Manager.prototype.clean = function () {
  this.measures.forEach(function (measure) {
    measure.remove()
    measure.removeMarker()
  })
  this.measures = []
}

Manager.setMap = function (map) {
  Manager.map = map
}

export default Manager
