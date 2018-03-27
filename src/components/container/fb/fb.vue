<template>
	<div v-if="topicList.type == 'fp'">
    <div class="fp-pane-content">
      <div class="fp-type-button">
        <button
          class="type-button"
          v-for="(item, index) in ['贫困乡镇', '脱贫攻坚']"
          :key="index"
          @click="getProvertyType(index)"
          :class="{clicked: nowIndex === index}"
        >{{item}}</button>
      </div>
      <ul :style="{maxHeight:fbHeight}">
				<li 
					class="search-pane-li" 
					v-if="topicList.list.length===0&&nextList.length==0&&areaList.length==0"
				>
					<div class="search-pane-box">暂无数据</div>
				</li>
        <li
          class="search-pane-li"
          v-for="item in topicList.list"
          @click="getNextData(item.areaCode)"
          v-if="nextList.length==0&&!rightShow"
        >
          <div class="search-pane-box">
            <div class="icon-box">
              <i class="fp-icon"></i>
            </div>
            <div class="area-content">
              <h2>{{item.mc}}</h2>
              <p>{{item.address}}</p>
							<p>
								<span v-if="item.sipkc_pkh">市级贫困陈：{{item.sipkc_pkh}}个</span>
								<span v-if="item.wtprs_pkrs">未脱贫人数：{{item.wtprs_pkrs}}人</span>
							</p>
            </div>
            <div class="detail"  @click.stop="getTopicDetails(item)">
              <i class="detail-icon"></i>
              <span>详情</span>
            </div>
          </div>
        </li>
        <li
          class="search-pane-li"
          v-for="(item, index) in nextList"
          v-if="nextList.length>0&&!rightShow"
					:class="{active: nextListIndex === index}"
        >
          <div class="search-pane-box" @click="flyToPoint(item, index)">
            <div class="icon-box">
              <i class="fp-icon"></i>
            </div>
            <div class="area-content">
              <h2>{{item.mc}}</h2>
              <p>{{item.address}}</p>
							<p>
								<span v-if="item.sipkc_pkh">贫困户：{{item.sipkc_pkh}}个</span>
								<span v-if="item.wtprs_pkrs">脱贫人数：{{item.wtprs_pkrs}}人</span>
							</p>
            </div>
            <div class="detail"  @click.stop="getTopicDetails(item)">
              <i class="detail-icon"></i>
              <span>详情</span>
            </div>
          </div>
        </li>
				<li
          class="search-pane-li"
          v-for="(item, index) in areaList"
          v-if="areaList.length>0&&rightShow"
					@click="showAreaInMap(item, index)"
					:class="{active: areaIndex == index}"
        >
          <div class="search-pane-box area-pane-box">
            <div class="icon-box">
              <i class="fp-icon"></i>
            </div>
            <div class="area-content">
              <h2>{{item.name}}</h2>
            </div>
          </div>
        </li>
      </ul>
      <p>
        <el-button size="mini" icon="el-icon-arrow-left" @click="prev()">上一页</el-button>
        <el-button size="mini" @click="next()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </p>
    </div>
	</div>
</template>

<script>
  import {getNextProvertyData, getRightProvertyData} from '@/api/dataSheets'
	import {mapGetters, mapMutations, mapActions} from 'vuex'

	export default {
		name: 'tabPane',
		data() {
			return {
        nowIndex: 0,
				areaIndex: '',
				nextListIndex: '',
				page: 1,
        nextList: [],
				areaList: [],
				rightShow: false,
				fbHeight:window.innerHeight*0.5 + 'px'
			}
		},
		computed: {
			...mapGetters([
				'topicList',
			])
		},
		methods: {
			getProvertyType(index) {
				this.nowIndex = index
				if(index ==0) {
					this.rightShow = false
					this.nextList = []
					this.areaList= []
					let type = 'fp'
					let start = this.page * 10
					this.getProvertyData({'type': type, 'start': start})
				} else {
					this.rightShow = true
					this._getRightProvertyData()
				}
			},
			flyToPoint(item, index) {
				this.nextListIndex = index
				this.$mapHelper.flyByPointAndZoom(JSON.parse(item.geopoint), 12)
			},
			getNextData(code) {
        getNextProvertyData(code).then(res => {
          this.nextList = res.data.data
        })
			},
			showAreaInMap(item, index) {
				this.areaIndex = index
				this.addAreaLayer(item)
			},
			next() {
				this.page += 1
				this.getProvertyType(0)
			},
			prev() {
				if(this.page === 1) {
					return
				}
				this.page -= 1
				this.getProvertyType(0)
			},
			_getRightProvertyData() {
				getRightProvertyData().then(res => {
					this.areaList = res.data
				})
			},
			//获取详情
			getTopicDetails(item){
				console.log(item)
				this.getAreaPovertyAlleviationDetailByAreaCode(item)
				this.setReportFormShow(false)
				this.setAreaReportFormShow(true)
			},
			...mapMutations({
				addAreaLayer: 'ADD_PROVERTY_AREA_LAYER'
			}),
			...mapActions([
			'getAreaPovertyAlleviationDetailByAreaCode',
			'setReportFormShow',
			'setAreaReportFormShow',
			'getProvertyData'
    ]),
		}
	}
</script>

<style lang="scss" scoped>

		.fp-pane-content {
			margin-top: -10px;
			.fp-type-button {
        display: flex;
				.type-button {
          flex: 1;
          line-height: 30px;
					font-size: 12px;
					cursor: pointer;
			    background: #fff;
			    border: 1px solid #dcdfe6;
			    border-color: #dcdfe6;
					color: #606266;
          box-sizing: border-box;
				}
				.clicked {
					color: #fff;
			    background-color: #909399;
			    border-color: #909399;
				}
			}
			ul {
				margin: 0;
				//max-height: 526px;
				overflow-y: auto;
				.search-pane-li {
					list-style: none;
					border-bottom: 1px solid #dcdfe6;
					.search-pane-box {
						display: flex;
						justify-content: space-around;
						padding: 10px;
						.icon-box {
							-webkit-box-flex: 0;
					    -ms-flex: 0 0 20px;
					    flex: 0 0 20px;
					    padding-right: 10px;
							background: none !important;
							i {
								display: block;
								width: 20px;
								height: 20px;
							}
							.fp-icon {
								background: url('../../../assets/images/catalog/fp@2x.png') no-repeat;
								background-size: 100%;
							}
						}
					}
					.active {
						background-color: #dcdfe6;
					}
					.area-pane-box {
						padding-bottom: 20px;
					}
					.area-content {
						display: flex;
						flex: 3;
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
				.active {
					background-color: #dcdfe6;
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
</style>
