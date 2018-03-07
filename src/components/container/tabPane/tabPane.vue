<template>
	<div class="tab-pane">
		<div class="tab-pane-content">
			<!-- <ul :class="upOrDown?'slideInDown':'slideOutUp'"> -->
			<ul v-show="upOrDown">
				<li class="tab-pane-li">
					<div class="tab-pane-li-title">
						<p class="item-title">【城乡建设】</p>
					</div>
					<div class="tab-pane-li-content">
						<span>建设用地</span>
						<span>建设用地</span>
						<span>建设用地</span>
						<span>建设用地</span>
						<span>建设用地</span>
					</div>
				</li>
			</ul>
			<div class="up-control">
				<i class="control-icon" :class="{down: !upOrDown}" @click="toggleSlide()"></i>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'tabPane',
		data() {
			return {
				upOrDown: true
			}
		},
		methods: {
			toggleSlide() {
				this.upOrDown = !this.upOrDown
			}
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
						color: #333;
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