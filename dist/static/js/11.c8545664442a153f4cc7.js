webpackJsonp([11],{Lwsz:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["map"],name:"area",data:function(){return{measures:[],currentMeasure:null}},created:function(){this.init()},beforeDestroy:function(){this.destroye()},methods:{init:function(){this.disableDblclick(),this.updateMeasure(),this.bindEvent()},bindEvent:function(){this.map.on("click",this.handleClick),this.map.on("dblclick",this.updateMeasure)},offEvent:function(){this.map.off("click",this.handleClick),this.map.off("dblclick",this.updateMeasure)},handleClick:function(e){this.currentMeasure.addPolygon(e)},updateMeasure:function(){var e=this.measures.length;this.currentMeasure=this.measures[e]=new window.d2c.areaLayer(this.map)},disableDblclick:function(){this.map.doubleClickZoom.disable()},enableDblclick:function(){this.map.doubleClickZoom.enable()},destroye:function(){this.measures.map(function(e){e.remove(),e.removeMarker()}),this.measures=[],this.offEvent()}},render:function(){}}}});
//# sourceMappingURL=11.c8545664442a153f4cc7.js.map