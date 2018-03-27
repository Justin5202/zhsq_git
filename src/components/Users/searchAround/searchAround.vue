<template>
  <div class="search-around">
    <el-container>
      <el-header>
        <div class="wrap">
          <p class="back" @click="goback"><i class="el-icon-arrow-left"></i><span>周边搜索</span></p>
          <div class="search">
            <div class="el-input">
              <span class="icon"></span><input type="text" v-model="searchContent" placeholder="搜地点、查数据"/>
            </div>
            <span class="count">数据总量:29,821,105条</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="wrap">
          <p class="title">
            <span class="icon-search-around"></span><span class="text">周边快查</span>
          </p>
          <div class="list-box">
            <ul class="list">
              <li class="list-item" v-for="(item, index) in list" >
                <p class="list-item-title" :style="{color: colors[index]}">{{item.name}}</p>
                <ul class="sublist">
                  <li v-for="i in item.children" @click="getSearch(i)">{{i.name}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {getHotAround} from '@/api/datasheets'

  export default {
    name: 'search-around',
    data() {
      return {
        list: [],
        searchContent: '',
        colors: ['#FF9999','#FF6666','#993333','#999933','#99CC00','#FF9900','#336699']
      }
    },
    mounted() {
      this._getHotAround()
    },
    methods: {
      goback() {
        this.setAroundSearchShow(false)
      },
      search() {
        if(this.searchContent === '') {
					return
				}
				const params = {
					name: this.searchContent,
					start: 0,
					rows: 10,
					type: 1,
					point: `${d2cMap.getCenter().lng},${d2cMap.getCenter().lat}`
				}
				this.getSearchParams({'typeParams': {}, 'params': params})
      },
      getSearch(item) {
        if(this.searchContent === '') {
					return
				}
				const params = {
					name: item.name,
					start: 0,
					rows: 10,
					type: 1,
					point: `${d2cMap.getCenter().lng},${d2cMap.getCenter().lat}`
				}
				this.getSearchParams({'typeParams': {}, 'params': params})
      },
      _getHotAround() {
        getHotAround().then(res => {
          this.list = res.data
        })
      },
      ...mapActions([
        'setAroundSearchShow',
        'getSearchParams'
      ])
    }
  }
</script>
<style lang="scss" scoped>
  ::-webkit-input-placeholder {
    color: #fff;
  }
  :-moz-placeholder {
    color: #fff;
  }
  ::-moz-placeholder {
    color: #fff;
  }
  :-ms-input-placeholder {
    color: #fff;
  }
  .search-around {
    height: 100%;
    text-align: left;
    .el-container {
      height: 100%;
      .el-header {
        height: 15% !important;
        padding: 0;
        .wrap {
          width: 1024px;
          height: 100%;
          background: url('../../../assets/images/catalog/综合市情系统.jpg') no-repeat;
          background-size: 100% 100%;
          .back {
            color: white;
            font-size: 24px;
            padding: 20px 30px;
            cursor: pointer;
            span {
              display: inline-block;
              padding-left: 15px;
            }
          }
          .search {
            display: flex;
            justify-content: space-between;
            .el-input {
              height: 40px;
              width: 240px;
              margin: 20px 0 0 40px;
              border-bottom: 1px solid rgb(168, 167, 167);
              display: flex;
              justify-content: flex-start;
              .icon {
                display: inline-block;
                width: 20px;
                height: 100%;
                background: url('../../../assets/images/catalog/search_white@2x.png') no-repeat;
                background-size: 20px 20px;
                background-position: center;
                cursor: pointer;
              }
              input {
                color:#fff;
                font-size: 16px;
                height: 100%;
                line-height: 40px;
                background: inherit;
                outline: none;
                border: none;
                padding: 0 10px;
              }
            }
            .count {
              color: #fff;
              padding: 0 40px;
              align-self: flex-end;
            }
          }
        }
      }
      .el-main {
        padding: 0;
        height:85%;
        background-color: rgb(233, 229, 229);
        .wrap {
          width: 1024px;
          height: 95%;
          box-sizing: border-box;
          background: #fff;
          .title {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            color: #000;
            font-weight: bold;
            letter-spacing: 1px;
            padding: 10px 20px;
            display: flex;
            justify-content: flex-start;
            .icon-search-around {
              display: inline-block;
              height: 100%;
              width: 40px;
              background: url('../../../assets/images/catalog/around_quick@2x.png') no-repeat;
              background-size: 40px 40px;
              background-position: center;
            }
            .text {
              display: inline-block;
              height: 100%;
              line-height: 50px;
              padding-left: 10px;
            }
          }
          .list-box {
            width: 94%;
            margin: 0 auto;
            margin-top: 20px;
            ul {
              list-style: none;
              padding: 0;
            }
            .list {
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              justify-content: space-between;
              .list-item {
                width: 50%;
                margin-bottom: 40px;
                display: flex;
                p {
                  width: 77px;
                  margin-right: 30px;
                }
                .sublist {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  li {
                    cursor: pointer;
                    width: 20%;
                    text-align: left;
                    margin: 0 5px 10px 0;
                  }
                }
              }
              .list-item:nth-of-type(even) {
                justify-content: flex-end;
              }
            }
          }
        }
      }
    }
  }
</style>
