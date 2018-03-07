<template>
	<div class="topic">
		<div class="topic-box">
			<span class="topic-item">
				<span class="topic-icon expand"></span>
				<span class="item-title">专题</span>
			</span>
			<span class="topic-item">
				<span class="topic-icon tourism"></span>
				<span class="item-title">旅游</span>
			</span>
			<span class="topic-item">
				<span class="topic-icon poverty-alleviation"></span>
				<span class="item-title">扶贫</span>
			</span>
		</div>
	</div>
</template>

<script>
	
	export default {

	}
</script>

<style lang="scss" scoped>
	
	.topic-box {
		.topic-item {
			display: inline-block;
			width: 55px;
			height: 55px;
			background-color: rgba(0, 0, 0, .6);
			border-radius: 100%;
		  	.topic-icon {
		  		display: block;
		  		width: 23px;
		  		height: 23px;
		  		margin: 0 auto;
		  		margin-top: 5px;
		  	}
		  	.item-title {
		  		font-size: 8px;
		  		color: #fff;
		  	}
		  	.expand {
		  		background:transparent url('../../../assets/images/catalog/add (1).png') no-repeat;
		  		background-size: 100%;
		  	}
		  	.tourism {
				background:transparent url('../../../assets/images/catalog/ly@2x.png') no-repeat;
		  		background-size: 100%;
		  	}
		  	.poverty-alleviation {
				background:transparent url('../../../assets/images/catalog/fp@2x.png') no-repeat;
		  		background-size: 100%;
		  	}
		}
	}
</style>