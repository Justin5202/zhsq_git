<template>
	<div class="tab-pane">
		<div class="tab-pane-content">
			<!-- <ul :class="upOrDown?'slideInDown':'slideOutUp'"> -->
			<ul v-show="upOrDown && tablePaneShow && !searchPaneShow">
				<li class="tab-pane-li" v-for="(item, index) in arrayData">
					<div class="tab-pane-li-title">
						<p class="item-title">【{{item.name}}】</p>
					</div>
					<div class="tab-pane-li-content">
						<span v-for="(i, idx) in item.hot" @click="getAreaData(i.dataCode)">{{i.dataname}}</span>
					</div>
				</li>
			</ul>
			<div class="search-pane-content" v-show="upOrDown && !tablePaneShow && searchPaneShow">
				<div class="search-type-button">
					<button
						class="type-button"
						v-for="(item, index) in ['全部', '数据', '类型']"
						@click="getType(index+1)"
						:class="{clicked: nowIndex === index}"
					>{{item}}</button>
				</div>
				<ul>
					<li class="search-pane-li" v-if="searchList.length === 0">
						<p style="margin: 0;">暂无搜索数据</p>
					</li>
					<li class="search-pane-li" v-else v-for="(item, index) in searchList">
						<div class="area-icon-box">
							<i class="area-icon"></i>
						</div>
						<div class="area-content">
							<h2>{{(page-1)*10+index+1}}.{{item.macro.name}}</h2>
							<p>{{item.macro.areaName}}</p>
							<p>{{item.macro.year}}</p>
						</div>
						<div class="detail" v-if="item.macro.filedsData">
							<i class="detail-icon"></i>
							<span>详情</span>
						</div>
					</li>
				</ul>
				<p v-if="searchList.length > 0">
				  <el-button size="mini" icon="el-icon-arrow-left" @click="prev()">上一页</el-button>
				  <el-button size="mini" @click="next()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</p>
			</div>
			<div class="child-table-content" v-show="upOrDown && !tablePaneShow && !searchPaneShow">
				<child-table></child-table>
			</div>
			<div class="up-control">
				<i class="control-icon" :class="{down: !upOrDown}" @click="toggleSlide()"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import ChildTable from '@/components/container/childTable/childTable'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {
			ChildTable
		},
		name: 'tabPane',
		props: {
			arrayData: {
				type: Array,
				dafault: []
			}
		},
		data() {
			return {
				upOrDown: true,
				type: 1,
				page: 1,
				buttonType: '',
				nowIndex: 0
			}
		},
		computed: {
			...mapGetters([
				'searchPaneShow',
				'tablePaneShow',
				'searchList'
			])
		},
		methods: {
			getType(index) {
				this.type = index || this.type
				const params = {
					type: index || this.type,
					start: (this.page - 1) * 10,
					rows: 10
				}
				this.buttonType = 'info'
				this.nowIndex = index - 1
				this.getSearchParams({'typeParams': params, 'params': {}})
			},
			next() {
				this.page += 1
				this.getType()
			},
			prev() {
				if(this.page === 1) {
					return
				}
				this.page -= 1
				this.getType()
			},
			getAreaData(code) {
				const params = {
					areacode: 500000,
					id: code
				}
				this.getAreaDetail(params)
			},
			toggleSlide() {
				this.upOrDown = !this.upOrDown
			},
			...mapActions([
				'getSearchParams',
				'getAreaDetail',
				'tablePaneShow'
			])
		}
	}
</script>

<style lang="scss" scoped>

	.tab-pane {
		margin-top: 15px;
		.tab-pane-content {
			border-radius: 4px;
			background-color: #fff;
			-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
	    	box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
		}
		ul {
			margin: 0;
			padding: 0;
	    	.tab-pane-li {
	    		list-style: none;
				.tab-pane-li-title {
					padding: 0 15px;
					background-color: #e4e7ed;
					.item-title {
						margin: 0;
						padding: 10px 0;
						font-size: 14px;
						font-weight: bold;
						text-align: left;
					}
				}
				.tab-pane-li-content {
					display: flex;
					flex-wrap: wrap;
					padding: 0 15px;
					span {
						display: inline-block;
						width: 25%;
						padding: 10px 0;
						font-size: 12px;
						color: #888;
						cursor: pointer;
						&:hover {
							text-decoration: underline;
							color: #2c3e50;
						}
					}
				}
	    	}
		}
		.search-pane-content {
			.search-type-button {
				padding: 10px 0;
				.type-button {
					margin: 0 5px;
					font-size: 12px;
					padding: 7px 36px;
					border-radius: 25px;
					border: 0;
					cursor: pointer;
			    background: #fff;
			    border: 1px solid #dcdfe6;
			    border-color: #dcdfe6;
					color: #606266;
				}
				.clicked {
					color: #fff;
			    background-color: #909399;
			    border-color: #909399;
				}
			}
			ul {
				margin: 0;
				padding: 0 0 0 10px;
				max-height: 526px;
				overflow-y: scroll;
				.search-pane-li {
					display: flex;
					justify-content: space-around;
					list-style: none;
					padding: 5px 0 15px 10px;
					border-bottom: 1px solid #dcdfe6;
					.area-icon-box {
						-webkit-box-flex: 0;
				    -ms-flex: 0 0 20px;
				    flex: 0 0 20px;
				    padding-right: 10px;
						.area-icon {
							display: block;
							width: 20px;
							height: 20px;
							background: url('../../../assets/images/catalog/搜索定位.png') no-repeat;
							background-size: 100%;
						}
					}
					.area-content {
						display: flex;
						flex: 2;
						flex-direction: column;
						text-align: left;
						h2 {
							margin: 0;
							font-size: 14px;
						}
						p {
							margin: 0;
							margin-top: 5px;
							font-size: 12px;
							color: #888;
						}
					}
					.detail {
						flex: 1;
						display: flex;
					  flex-direction: column;
					  align-items: center;
						cursor: pointer;
						.detail-icon {
							margin-top: 10px;
							display: block;
							width: 20px;
							height: 20px;
							background: url('../../../assets/images/catalog/数据详情@2x.png') no-repeat;
							background-size: 100%;
						}
						span {
							font-size: 12px;
							color: #20be8c;
						}
					}
				}
			}
		}
		.up-control {
			.control-icon {
				margin: 0 auto;
				display: block;
				width: 60px;
				height: 30px;
				background:transparent url('../../../assets/images/catalog/catalog_close@2x.png') no-repeat;
				background-size: 100%;
			}
			.down {
				background:transparent url('../../../assets/images/catalog/catalog_expand@2x.png') no-repeat;
				background-size: 100%;
			}
		}
	}
</style>
