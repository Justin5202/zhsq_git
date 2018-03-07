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
		<tab-pane></tab-pane>
	</div>
</template>

<script>
	import TabPane from '../tabPane/tabPane'
	

	export default {
		name: 'tab',
		components: {
			TabPane
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
				nowIndex: 0
			}
		},
		methods: {
			handleTabs(index) {
				this.nowIndex = index
			}
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
</style>