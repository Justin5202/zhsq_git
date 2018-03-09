<template>
	<div class="search">
	  	<el-input placeholder="搜地点、查数据" v-model="searchContent" @focus="showSearchPane()" class="input-with-select">
				<el-button slot="prepend" @click="showBox()">{{activeName}}<i class="el-icon-arrow-down"></i></el-button>
	    	<el-button slot="append" icon="el-icon-search" @click="clickSearch()"></el-button>
	  	</el-input>
			<div class="select-box" v-show="showSelectBox">
				<span class="triangle"></span>
				<ul class="tabs clearfix">
					<li v-for="(item, index) in area" :class="{active: index===activeIndex}" @click="handleClick(index, item.name, item.code)">{{ item.name }}</li>
					<li class="icon"><i class="el-icon-delete"></i></li>
				</ul>
				<div class="subMenu" v-if="showSubmenu">
					<ul class="areas">
						<li v-for="item in areaData" @click="handleArea(item.areaname, item.areacode)">{{item.areaname}}</li>
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
				selectContent: '',
				area: [
					{name: '重庆市', code: '500000'},
					{name: '主城区', code: '500002'},
					{name: '区县', code: '501002'}
				],
				activeIndex: 0,
				activeName: '重庆市',
				showSelectBox: false,
				showSubmenu: false,
				areaData: []
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
				const params = {
					name: this.searchContent,
					start: 0,
					rows: 10,
					areacode: code,
					areaname: start,
					type: 1,
					point: "106.627441893, 29.7208926650001"
				}
				this._getSearchParams(params)
			},
			showSearchPane() {
				this.searchPaneShow(true)
				this.tablePaneShow(false)
			},
			_getSelect(areacode) {
				getSelect(areacode).then(res => {
					this.areaData = res.data;
				})
			},
			_getSearchParams(params) {
				this.getSearchParams({'typeParams': {}, 'params': params})
			},
			...mapActions([
				'searchPaneShow',
				'tablePaneShow',
				'getSearchParams',
				'getSearchResult'
			]),
			setActive(index) {
				this.activeIndex = index
				this.showSubmenu = index === 2 ? true : false;
			},
			showBox() {
				this.showSelectBox = this.showSelectBox === true ? false : true;
			},
			handleClick(index, start, code) {
				this.setActive(index)
				this.activeName = start
				this.clickSearch(start, code)
				if (index === 2) {
					this._getSelect(code)
				}
			},
			handleArea(start, code) {
				this.activeName = start
				this.clickSearch(start, code)
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
</style>
