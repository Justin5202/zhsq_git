<template>
	<div class="tab">
		<ul>
			<li class="tab-li" v-for="(item, index) in tabs" :class="{active: nowIndex === index}" @click="handleTabs(index)">
				<div class="tab-box">
					<img class="tab-item-img" :src="item.icon" alt="">
					<p class="tab-title">{{item.title}}</p>
				</div>
			</li>
		</ul>
		<tab-pane :arrayData="arrayData"></tab-pane>
		<div class="table-box" v-show="nowIndex === 4">
			<v-table :tableData="allData" @handleClick="handleClick"></v-table>
		</div>
		<div class="report-box">
			<report-form></report-form>
		</div>
		<div class="search-around-box" v-if="searchAroundShow">
			<search-around></search-around>
		</div>
	</div>
</template>

<script>
	import TabPane from '../tabPane/tabPane'
	import vTable from '../table/table'
	import ReportForm from '../reportForm/reportForm'
	import SearchAround from '@/components/Users/searchAround/searchAround'
	import {getDataSheets} from '@/api/datasheets.js'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'tab',
		components: {
			TabPane,
			vTable,
			ReportForm,
			SearchAround
		},
		data() {
			return {
				tabs: [
					{
						title: '地表数据',
						icon: require('../../../assets/images/catalog/yongdi@2x.png')
					},
					{
						title: '各类规划',
						icon: require('../../../assets/images/catalog/人口@2x.png')
					},
					{
						title: '经济社会',
						icon: require('../../../assets/images/catalog/经济@2x.png')
					},
					{
						title: '城市运行',
						icon: require('../../../assets/images/catalog/建筑@2x.png')
					},
					{
						title: '更多',
						icon: require('../../../assets/images/catalog/更多@2x.png')
					}
				],
				nowIndex: 0,
				allData: [],
				arrayData: []
			}
		},
		computed: {
			...mapGetters([
				'searchAroundShow'
			])
		},
		mounted() {
			this._getDataSheets()
		},
		methods: {
			handleTabs(index) {
				this.nowIndex = index
				if(index === 4) {
					return
				}
				this.arrayData = this.allData[index].children
				this.searchPaneShow(false)
				this.tablePaneShow(true)
			},
			handleClick() {
				this.nowIndex = -1
			},
			_getDataSheets() {
				getDataSheets().then(res => {
					this.allData = res.data
					this.arrayData = this.allData[0].children
				})
			},
			...mapActions([
				'searchPaneShow',
				'tablePaneShow'
			])
		}
	}
</script>

<style lang="scss" scoped>

	.tab {
		margin-top: 15px;
	}
	.tab ul {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		border-radius: 4px;
		background-color: #fff;
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
		li {
			list-style: none;
			flex: 1;
			padding: 8px 0;
			cursor: pointer;
			.tab-box {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				.tab-item-img {
					display: block;
					width: 30px;
					height: 30px;
				}
				.tab-title {
					margin: 0;
					padding-top: 5px;
					font-size: 12px;
					text-align: center;
				}
			}
		}
		.active {
			background-color: #e4e7ed;
		}
	}
	.table-box, .report-box, .search-around-box {
		position: absolute;
		top: 0;
		left: 400px;
		background-color: #fff;
		border-radius: 4px;
		z-index: 1000000;
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    	box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	}
</style>
