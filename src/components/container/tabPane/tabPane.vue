<template>
	<div class="tab-pane">
		<div class="tab-pane-content">
			<!-- <ul :class="upOrDown?'slideInDown':'slideOutUp'"> -->
			<ul v-show="upOrDown && !searchPaneShow">
				<li class="tab-pane-li" v-for="(item, index) in arrayData">
					<div class="tab-pane-li-title">
						<p class="item-title">【{{item.name}}】</p>
					</div>
					<div class="tab-pane-li-content">
						<span v-for="(i, idx) in item.hot">{{i.dataname}}</span>
					</div>
				</li>
			</ul>
			<div class="search-pane-content" v-show="upOrDown && searchPaneShow">
				<div class="search-type-button">
					<el-button size="mini" round>全部</el-button>
					<el-button size="mini" round>数据</el-button>
					<el-button size="mini" round>类型</el-button>
				</div>
				<ul>
					<li class="search-pane-li">
						<div class="area-icon-box">
							<i class="area-icon"></i>
						</div>
						<div class="area-content">
							<h2>重庆市开县工业园区</h2>
							<p>开州区</p>
						</div>
						<div class="detail">
							<i class="detail-icon"></i>
							<span>详情</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="up-control">
				<i class="control-icon" :class="{down: !upOrDown}" @click="toggleSlide()"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		name: 'tabPane',
		props: {
			arrayData: {
				type: Array,
				dafault: []
			}
		},
		data() {
			return {
				upOrDown: true
			}
		},
		computed: {
			...mapGetters([
				'searchPaneShow'
			])
		},
		methods: {
			toggleSlide() {
				this.upOrDown = !this.upOrDown
			}
		}
	}
</script>

<style lang="scss" scoped>
		// 自定义button
		.el-button--mini, .el-button--mini.is-round {
    	padding: 7px 36px;
		}
		.el-button.is-round {
    	border-radius: 25px;
		}

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
			}
			ul {
				margin: 0;
				padding: 0 0 0 10px;
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
					  justify-content: space-between;
					  align-items: center;
						.detail-icon {
							display: block;
							width: 20px;
							height: 20px;
							background: url('../../../assets/images/catalog/数据详情@2x.png') no-repeat;
							background-size: 100%;
						}
						span {
							margin-top: 3px;
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
