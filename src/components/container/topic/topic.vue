<template>
	<div class="topic">
		<div class="topic-box">
			<span class="topic-item" @click="showItem()" v-show="isInArray(10, this.userinfo.autuority)||isInArray(11, this.userinfo.autuority)">
				<img v-if="!isShow" src="../../../assets/images/catalog/专题.png" alt="">
				<img v-else src="../../../assets/images/catalog/专题1.png" alt="">
			</span>
			<span class="topic-item init-state" :class="isShow?'slideInLeft':null" @click="getTourism()" v-show="isInArray(10, this.userinfo.autuority)">
				<img v-if="type1" src="../../../assets/images/map/旅游1.png" alt="">
				<img v-else src="../../../assets/images/map/旅游.png" alt="">
			</span>
			<span class="topic-item init-state" :class="isShow?'slideInLeft':null" @click="getProverty()" v-show="isInArray(11, this.userinfo.autuority)">
				<img v-if="type2" src="../../../assets/images/map/扶贫1.png" alt="">
				<img v-else src="../../../assets/images/map/扶贫.png" alt="">
			</span>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapMutations, mapGetters} from 'vuex'

	export default {
		data() {
			return {
				isShow: false,
				type1: false,
				type2: false
			}
		},
		computed: {
			...mapGetters(['userinfo'])
		},
		methods: {
			showItem() {
				this.isShow = !this.isShow
			},
			getTourism() {
				if(this.type1) {
					this.$mapHelper.removeLayerByCode('Z10000')
		      this.$mapHelper.removeLayerByCode('Z10001')
		      this.$mapHelper.removeLayerByCode('Z10002')
					this.setTopicShow(false)
					this.searchPaneShow(false)
					this.tablePaneShow(true)
					this.type1 = !this.type1
				} else {
					let type = 'ly'
					this.getTopicData(type)
					this.addTourismLayer(0)
					this.setTopicShow(true)
					this.searchPaneShow(false)
					this.tablePaneShow(false)
					this.type1 = !this.type1
				}
			},
			getProverty() {
				if(this.type2) {
					this.$mapHelper.removeLayerByCode('Z10003')
					this.setTopicShow(false)
					this.searchPaneShow(false)
					this.tablePaneShow(true)
					this.type2 = !this.type2
				} else {
					let type = 'fp'
					this.getProvertyData(type)
					this.addTourismLayer(4)
					this.setTopicShow(true)
					this.searchPaneShow(false)
					this.tablePaneShow(false)
					this.type2 = !this.type2
				}
			},
			...mapActions([
				'getTopicData',
				'getProvertyData',
				'searchPaneShow',
				'tablePaneShow',
				'addTourismLayer'
			]),
			...mapMutations({
				setTopicShow: 'SET_TOPIC_LIST_SHOW'
			}),
			isInArray(element, array) {
				if (!array) {
					return false
				}
				return array.indexOf(element) != -1
			}
		}
	}
</script>

<style lang="scss" scoped>

	.topic-box {
		.topic-item {
			display: inline-block;
			margin: 0 8px;
			width: 60px;
			height: 60px;
			cursor: pointer;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		  .item-title {
		  	font-size: 8px;
		  	color: #fff;
		  }
		}
		.init-state {
			-webkit-transform: translate3d(-100%, 0, 0);
		    transform: translate3d(-100%, 0, 0);
		    visibility: hidden;
		}
	}
</style>
