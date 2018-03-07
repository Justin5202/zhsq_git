<template>
	<div class="topic">
		<div class="topic-box">
			<span class="topic-item" @click="showItem()">
				<img src="../../../assets/images/catalog/add (1).png" :class="isShow?'rotate':null" alt="">
				<span class="item-title">专题</span>
			</span>
			<span class="topic-item init-state" :class="isShow?'slideInLeft':null">
				<img src="../../../assets/images/catalog/ly.png" alt="">
				<span class="item-title">旅游</span>
			</span>
			<span class="topic-item init-state" :class="isShow?'slideInLeft':null">
				<img src="../../../assets/images/catalog/fp.png" alt="">
				<span class="item-title">扶贫</span>
			</span>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			showItem() {
				this.isShow = !this.isShow
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@keyframes rotate {
	  from {
	    -webkit-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }

	  to {
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	  }
	}

	.topic-box {
		.topic-item {
			display: inline-block;
			margin: 0 8px;
			width: 40px;
			height: 40px;
			padding: 7.5px;
			background-color: rgba(0, 0, 0, .6);
			border-radius: 100%;
			cursor: pointer;
			img {
				margin: 0 auto;
				display: block;
				width: 25px;
				height: 25px;
			}
			.rotate {
				animation: rotate .3s forwards;
			}
		  	.item-title {
		  		font-size: 8px;
		  		color: #fff;
		  	}
		}
		.init-state {
			background-color: #2475e0;
			-webkit-transform: translate3d(-100%, 0, 0);
		    transform: translate3d(-100%, 0, 0);
		    visibility: hidden;
		}
	}
</style>