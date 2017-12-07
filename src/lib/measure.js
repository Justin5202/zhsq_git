/*
 * @Description: draw handler
 * @Author: xia
 * @Date: 2017-12-07 11:55:41
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-07 14:20:30
 */

import Manager from './util/draw'

export default function (map) {
  Manager.setMap(map)

  var mpoint = new Manager({
    add: 'addPoint',
    create: window.d2c.pointLayer
  })
  var mline = new Manager({
    add: 'addLine',
    create: window.d2c.distanceLayer
  })
  var mpolygon = new Manager({
    add: 'addPolygon',
    create: window.d2c.areaLayer
  })

  // bind events
  function drawPoint () {
    mpoint.addMeasure()
    offevent()
    mpoint.bindEvent()
  }

  function drawLine () {
    mline.addMeasure()
    offevent()
    mline.bindEvent()
  }

  function drawPolygon () {
    mpolygon.addMeasure()
    offevent()
    mpolygon.bindEvent()
  }

  function removeAll () {
    mpoint.clean()
    mline.clean()
    mpolygon.clean()
    offevent()
  }

  var offevent = function () {
    mpoint.offEvent()
    mline.offEvent()
    mpolygon.offEvent()
  }
  return {
    drawPoint,
    drawLine,
    drawPolygon,
    removeAll
  }
}
