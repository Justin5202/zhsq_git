<template>
	<div class="search">
	  	<el-input placeholder="搜地点、查数据" v-model="input5" class="input-with-select">
	    	<el-select v-model="select" slot="prepend" placeholder="重庆市">
	      		<el-option label="重庆市" value="1"></el-option>
	      		<el-option label="主城区" value="2"></el-option>
	      		<el-option label="区县" value="3"></el-option>
	    	</el-select>
	    	<el-button slot="append" icon="el-icon-search"></el-button>
	  	</el-input>
	</div>
</template>

<script>

	export default {
		name: 'searchBar',
		data() {
			return {
				input5: '',
				select: ''
			}
		}
	}
</script>

<style>
	.el-select .el-input {
    	width: 90px;
  	}
</style>