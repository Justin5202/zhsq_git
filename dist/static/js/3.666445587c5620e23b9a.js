webpackJsonp([3],{"276G":function(e,t,n){"use strict";function r(e){if(i(e))return e;for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];return i(n)?n:n.length&&r(n)}return[]}function i(e){return e.length&&2===e.length&&!e[0].length}t.a=r},"Lo+p":function(e,t,n){"use strict";function r(e){return{Name_CHN:e||""}}function i(e){n("ayQT")}Object.defineProperty(t,"__esModule",{value:!0});var o=n("Dd8w"),a=n.n(o),s=n("f97g"),l={},c={id:"textSearch",type:"circle",paint:{"circle-color":"red"}},u=a()({},s,l),h=n("276G"),d={name:"textSearch",props:["map"],data:function(){return{client:u.client,index:u.index,data:null,layer:null,input:"",queryConfig:r,selectionConfig:c,getPoint:h.a}},created:function(){this.initLayer(),this.initMarker()},methods:{initLayer:function(){delete this.selectionConfig.source,this.layer=this.map.addGeoLayer(this.selectionConfig)},initMarker:function(){this.el=document.createElement("i"),this.el.className="el-icon-location",this.el.style.fontSize="24px",this.el.style.color="#409eff",this.marker=new window.d2c.Marker(this.el)},handleRowClick:function(e,t,n){var r=this.getPoint(e._source.geometry.coordinates);this.map.flyTo({center:r,zoom:16})},handleInput:function(e){this.search(e)},updateLayer:function(){var e=this.data.map(function(e){return{geometry:e._source.geometry,type:"Feature"}});this.map.setGeojson(this.selectionConfig.id,{type:"FeatureCollection",features:e})},updateMarker:function(e){this.marker.setLngLat(e).addTo(this.map)},search:function(e){var t=this;try{this.client.searchFullText({index:this.index,query:this.queryConfig(e)},function(){var e=(arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments[1]);0===e.hits.hits.length?t.data="暂无数据":(t.data=e.hits.hits,t.updateLayer())})}catch(e){console.log("> text search:",e)}},removeLayer:function(){this.map.removeGeoLayer(this.selectionConfig.id)},removeMarker:function(){this.marker&&this.marker.remove()},destroye:function(){this.removeLayer(),this.removeMarker()}},beforeDestroy:function(){this.destroye()}},p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"textSearchContainer"}},[n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.handleInput},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:null!==this.data,expression:"this.data!==null"}],attrs:{id:"textSearch"}},["string"==typeof e.data?n("p",[e._v(e._s(this.data))]):n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.data,stripe:""},on:{"row-click":e.handleRowClick}},[n("el-table-column",{attrs:{type:"index"}}),e._v(" "),n("el-table-column",{attrs:{label:"名称",width:"200","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row._source.Name_CHN&&t.row._source.Name_CHN.trim()||"暂无名称"))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"地址",width:"200","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row._source.Address&&t.row._source.Address.trim()||"暂无地址"))]}}])})],1)],1)],1)},f=[],m={render:p,staticRenderFns:f},x=m,y=n("VU/8"),C=i,v=y(d,x,!1,C,null,null);t.default=v.exports},WmW3:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\n#textSearch {\n  overflow-y: scroll;\n  max-height: 500px;\n  line-height: 2em;\n}\n#textSearch .el-table .cell.el-tooltip {\n    cursor: pointer;\n}\n#textSearch .el-table th {\n    text-align: center !important;\n}\n#textSearchContainer {\n  border-radius: 4px 4px 0px 0px;\n}\n","",{version:3,sources:["C:/Users/Dell/Workplace/d2c_vue/src/components/content/textSearch.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;CAClB;AACD;IACI,gBAAgB;CACnB;AACD;IACI,8BAA8B;CACjC;AACD;EACE,+BAA+B;CAChC",file:"textSearch.vue",sourcesContent:["\n#textSearch {\n  overflow-y: scroll;\n  max-height: 500px;\n  line-height: 2em;\n}\n#textSearch .el-table .cell.el-tooltip {\n    cursor: pointer;\n}\n#textSearch .el-table th {\n    text-align: center !important;\n}\n#textSearchContainer {\n  border-radius: 4px 4px 0px 0px;\n}\n"],sourceRoot:""}])},ayQT:function(e,t,n){var r=n("WmW3");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n("rjj0")("69dae3bd",r,!0)}});
//# sourceMappingURL=3.666445587c5620e23b9a.js.map