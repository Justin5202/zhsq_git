<template>
	<div class="search">
	  	<el-input placeholder="搜地点、查数据" v-model="searchContent" @focus="showSearchPane()" class="input-with-select">
				<el-button slot="prepend" @click="showBox()">{{activeName}}<i class="el-icon-arrow-down"></i></el-button>
	    	<el-button slot="append" icon="el-icon-search" @click="clickSearch(selectStart, selectCode)"></el-button>
	  	</el-input>
			<div class="select-box" v-show="showSelectBox">
				<span class="triangle"></span>
				<ul class="tabs clearfix">
					<li v-for="(item, index) in area" :class="{active: index===activeIndex}" @click="handleClick(index, item.name, item.code)">{{ item.name }}</li>
					<li class="icon"><i class="el-icon-delete"></i></li>
				</ul>
				<div class="subMenu" v-if="showSubmenu">
					<ul class="areas">
						<li v-for="item in areaData1" @click="handleArea(item.areacode, item.areaname)">{{item.areaname}}</li>
						<li v-if="!showSubmenuMore" @click="showSubMore()">更多...</li>
						<li v-else v-for="item in areaData2" @click="handleArea(item.areacode, item.areaname)">{{item.areaname}}</li>
					</ul>
				</div>
				<div class="three-level-menu" v-if="showThreeLevelMenu">
					<p>镇乡街</p>
					<ul class="areas">
						<li v-for="item in subAreaData" @click="handleSubArea(item.areacode, item.areaname)">{{item.areaname}}</li>
					</ul>
				</div>
			</div>
	</div>
</template>

<script>
	import {getSelect} from '@/api/dataSheets'
  import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'searchBar',
		data() {
			return {
				searchContent: '',
				selectCode: '',
				selectStart: '',
				area: [
					{name: '重庆市', code: '500000'},
					{name: '主城区', code: '500002'},
					{name: '区县', code: '501002'}
				],
				activeIndex: 0,
				activeName: '重庆市',
				showSelectBox: false,
				showSubmenu: false,
				showSubmenuMore: false,
				areaData1: [],
				areaData2: [],
				subAreaData: [],
				showThreeLevelMenu: false
			}
		},
		methods: {
			select() {
				this._getSelect(this.selectContent)
			},
			clickSearch(start, code) {
				if(this.searchContent === '') {
					return
				}
				start = start || '重庆市'
				code = code || '500000'
				const params = {
					name: this.searchContent,
					start: 0,
					rows: 10,
					type: 1
				}
				this._getSearchParams(params)
			},
			showSearchPane() {
				this.searchPaneShow(true)
				this.tablePaneShow(false)
			},
			_getSearchParams(params) {
				this.getSearchParams({'typeParams': {}, 'params': params})
			},
			...mapActions([
				'searchPaneShow',
				'tablePaneShow',
				'getSearchParams',
				'getSearchResult',
				'setAreaInfo',
				'getNextAreaInfo',
				'setSelectedAreaList'
			]),
			setActive(index) {
				this.activeIndex = index
				this.showSubmenu = index === 2 ? true : false;
			},
			showBox() {
				this.showSelectBox = this.showSelectBox === true ? false : true;
			},
			handleClick(index, areaname, areacode) { // 一级菜单点击时触发的事件
				this.setActive(index)
				this.activeName = this.selectStart = areaname
				this.selectCode = areacode
				let areaInfo = {
					areacode: areacode,
			    areaname: areaname
				}
				this.setAreaInfo(areaInfo)
				if(index === 2) {
					getSelect(areacode).then(res => {
						this.areaData1 = res.data.slice(0, 8)
						this.areaData2 = res.data.slice(8)
					})
				} else {
					this.showSubmenuMore = false
					this.showThreeLevelMenu = false
				}
			},
			handleArea(id, name) { // 二级点击时触发的事件
				this.activeName = this.selectStart = name
				let areaInfo = {
					areacode: id,
			    areaname: name
				}
				this.setAreaInfo(areaInfo)
				// this.setSelectedAreaList(areaInfo)
				this.setSelectedAreaList({'areainfo': areaInfo, 'isRemoveAll': false})
				this.getNextAreaInfo()
				getSelect(id).then(res => {
					this.subAreaData = res.data
				})
				this.showThreeLevelMenu = true
				this.showSubmenuMore = false
			},
			handleSubArea(id, name) { // 三级菜单点击时触发的事件
				this.activeName = this.selectStart = name
				let areaInfo = {
					areacode: id,
			    areaname: name
				}
				this.setAreaInfo(areaInfo)
				this.setSelectedAreaList({'areainfo': areaInfo, 'isRemoveAll': false})
				this.getNextAreaInfo()
				// this.showSubmenu = false
			},
			showSubMore() { // 显示二级菜单，隐藏三级菜单
				this.showSubmenuMore = true
				this.showThreeLevelMenu = false
			}
		},
	}
</script>

<style>
	.clearfix:after {
		content: '';
		clear: both;
		visibility: hidden;
	}
	.search {
		position: relative;
		border-radius: 4px;
		/* background-color: #fff; */
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	}
	.el-select .el-input {
    	width: 90px;
  	}
	.select-box {
		position: absolute;
		top: 50px;
		width: 100%;
		background-color: #fff;
		/* border-top-left-radius: 4px;
		border-top-right-radius: 4px; */
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
	}
	.triangle {
		width: 15px;
		height: 15px;
		background-color: #fff;
		border-left: none;
		border-bottom: none;
		box-shadow: 1px -1px 0px rgba(0, 0, 0, 0.2);
		position: absolute;
		top: -6px;
		left: 35px;
		transform: rotateZ(-45deg);
		box-sizing: border-box;
	}
	.tabs {
		list-style: none;
		width: 100%;
		padding: 5px 0 5px 0;
		margin: 0;
		height: 40px;
		line-height: 40px;
	}
	.tabs li {
		width: 84px;
		float: left;
		cursor: pointer;
		font-size: 13px;
		box-sizing: border-box;
		margin-right: 10px;
	}
	.tabs li.icon {
		float: right;
		width: 10%;
		border-left: 1px solid rgba(0, 0, 0, .1);
	}
	.active {
		color: #409EFF;
	}
	.subMenu p {
		color: red;
		font-size: 14px;
		margin: 0;
	}
	.areas {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding-bottom: 5px;
	}
	.areas li {
		font-size: 14px;
		width: 33%;
		margin: 10px 0;
		cursor: pointer;
		color:#888;
	}
	.areas li:hover {
		color: #2c3e50;
		text-decoration: underline;
	}
	.areas li:nth-of-type(3n-2), .areas li:nth-of-type(3n-1) {
		border-right: 1px solid lightgrey;
	}
	.three-level-menu p {
		color:#888;
		font-size: 14px;
		padding: 5px;
		background-color: rgb(247, 244, 244);
	}
</style>
