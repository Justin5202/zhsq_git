<template>
	<div class="table">
		<div class="table-header">
			<h2>重庆市综合市情系统</h2>
			<p class="data-num">数据总量：29,821,105条</p>
			<i class="close-icon" @click="handleClick()"></i>
		</div>
		<ul class="group">
			<li class="list-group" v-for="item in tableData">
				<p class="list-group-title">{{item.name}}</p>
				<ul>
					<li class="list-group-item clearfix" v-for="i in item.children">
						<span class="list-group-item-title">[{{i.name}}]</span>
						<span class="list-group-item-content clearfix">
							<span v-for="childrenItem in i.hot" @click="getAreaData(childrenItem.dataCode)">{{childrenItem.dataname}}</span>
						</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		tableData: {
			type: Array,
			defalut: []
		}
	},
	data() {
		return {
			isShow: false
		}
	},
	methods: {
		handleClick() {
			this.$emit('handleClick')
		},
		getAreaData(code) {
			const params = {
				id: code,
				areacode: 500000
			}
			this.getAreaDetail(params)
		},
		...mapActions([
			'getAreaDetail'
		])
	}
}
</script>

<style lang="scss" scoped>
.table {
  overflow: hidden;
  border-radius: 4px;
  height: 100%;
  .table-header {
    width: 100%;
    height: 120px;
    background: transparent
      url("../../../assets/images/catalog/综合市情系统.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
    h2 {
      width: 100%;
      margin: 0;
      padding-top: 45px;
      color: #fff;
    }
    .data-num {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-right: 15px;
      color: #fff;
    }
    .close-icon {
      position: absolute;
      top: 5px;
      left: 5px;
      display: block;
      width: 30px;
      height: 30px;
      background: transparent url("../../../assets/images/catalog/close.png")
        left top no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
  }
  .group {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-y: scroll;
    .list-group {
      list-style: none;
      .list-group-title {
        margin: 0;
        line-height: 39px;
        padding-left: 65px;
        font-size: 14px;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.2);
        color: #333;
        text-align: left;
      }
      ul {
        padding: 0;
        margin: 0;
      }
      .list-group-item {
        display: flex;
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        .list-group-item-content {
          float: left;
          width: 80%;
          span {
            font-size: 14px;
            width: 22%;
            display: block;
            float: left;
            text-align: left;
            line-height: 39px;
            color: #666;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
              color: #2475e0;
            }
          }
        }
        .list-group-item-title {
          font-size: 15px;
          float: left;
          display: block;
          width: 20%;
          line-height: 39px;
          text-align: center;
          color: #2475e0;
        }
      }
    }
  }
}
</style>
