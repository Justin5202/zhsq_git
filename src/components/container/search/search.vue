<template>
	<div class="search">
	  	<el-input placeholder="搜地点、查数据" v-model="searchContent" @focus="showSearchPane()" class="input-with-select">
	    	<!-- <el-select v-model="selectContent" slot="prepend" placeholder="重庆市" @change="select()">
	      		<el-option label="重庆市" value="500000"></el-option>
	      		<el-option label="主城区" value="500002"></el-option>
	      		<el-option label="区县" value="501002"></el-option>
	    	</el-select> -->
				<el-button slot="prepend" @click="showBox()">{{activeName}}</el-button>
	    	<el-button slot="append" icon="el-icon-search" @click="clickSearch()"></el-button>
	  	</el-input>
			<div class="select-box" v-show="showSelectBox">
				<span class="triangle"></span>
				<ul class="tabs clearfix">
					<li v-for="(item, index) in area" :key="index" :class="{active: index===activeIndex}" @click="handleClick(index, item.name, item.code)">{{ item.name }}</li>
					<li class="icon"><i class="el-icon-delete"></i></li>
				</ul>
				<div class="subMenu" v-if="showSubmenu"
				v-loading="loading">
					<ul class="areas">
						<li>万州区</li>
						<li>涪陵区</li>
						<li>渝中区</li>
						<li>大渡口区</li>
						<li>江北区</li>
						<li>沙坪坝区</li>
						<li>九龙坡区</li>
						<li>南岸区</li>
						<li>北碚区</li>
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
				showSubmenu: false
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
				// let start, code
				// if(this.selectContent === '' || this.selectContent === 500000) {
				// 	start = '重庆市',
				// 	code = 500000
				// } else if(this.selectContent === 500002) {
				// 	start = '主城区'
				// 	code = 500002
				// } if(this.selectContent === 501002) {
				// 	start = '区县'
				// 	code = 501002
				// }
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
			},
			_getSelect(areacode) {
				getSelect(areacode).then(res => {
					console.log(res.data)
				})
			},
			_getSearchParams(params) {
				this.getSearchParams({'typeParams': {}, 'params': params})
			},
			...mapActions([
				'searchPaneShow',
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
				this.activeName = start;
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
		border-radius: 4px;
		/* background-color: #fff; */
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	}
	.el-select .el-input {
    	width: 90px;
  	}
	.select-box {
		margin-top: 10px;
		width: 100%;
		position: relative;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	}
	.triangle {
		/* width:0;
    height:0;
    border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #fff;
		position: absolute;
		top: -10px;
		left: 30px; */
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
		height: 30px;
		line-height: 30px;
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
		border-left: 1px solid #2c3e50;
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
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.areas li {
		font-size: 14px;
		width: 33%;
		margin: 10px 0;
		cursor: pointer;
		color:#2c3e50;
	}
	.areas li:nth-of-type(3n-2), .areas li:nth-of-type(3n-1) {
		border-right: 1px solid lightgrey;
	}
</style>
