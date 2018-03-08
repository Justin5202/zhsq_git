<template>
	<div class="search">
	  	<el-input placeholder="搜地点、查数据" v-model="searchContent" @focus="showSearchPane()" class="input-with-select">
	    	<el-select v-model="selectContent" slot="prepend" placeholder="重庆市" @change="select()">
	      		<el-option label="重庆市" value="500000"></el-option>
	      		<el-option label="主城区" value="500002"></el-option>
	      		<el-option label="区县" value="501002"></el-option>
	    	</el-select>
	    	<el-button slot="append" icon="el-icon-search" @click="clickSearch()"></el-button>
	  	</el-input>
	</div>
</template>

<script>
	import {getSelect, getSearch} from '@/api/dataSheets'
  import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'searchBar',
		data() {
			return {
				searchContent: '',
				selectContent: ''
			}
		},
		methods: {
			select() {
				this._getSelect(this.selectContent)
			},
			clickSearch() {
				if(this.searchContent === '') {
					return
				}
				let start, code
				if(this.selectContent === '' || this.selectContent === 500000) {
					start = '重庆市',
					code = 500000
				} else if(this.selectContent === 500002) {
					start = '主城区'
					code = 500002
				} if(this.selectContent === 501002) {
					start = '区县'
					code = 501002
				}
				this._getSearch(start, this.searchContent, code)
			},
			showSearchPane() {
				this.searchPaneShow(true)
			},
			_getSelect(areacode) {
				getSelect(areacode).then(res => {
					console.log(res.data)
				})
			},
			_getSearch(s, n, code) {
				getSearch(s, n, code).then(res => {
					console.log(res.data)
				})
			},
			...mapActions([
				'searchPaneShow'
			])
		}
	}
</script>

<style>

	.search {
		border-radius: 4px;
		background-color: #fff;
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	}
	.el-select .el-input {
    	width: 90px;
  	}
</style>
