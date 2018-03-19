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
              <li class="list-item" v-for="n in 6">
                <p class="list-item-title" :style="{color: Color()}">交通设施</p>
                <ul class="sublist">
                  <li>机场</li>
                  <li>医院</li>
                  <li>文化</li>
                  <li>教育</li>
                  <li>福利</li>
                  <li>殡葬</li>
                  <li>宗教</li>
                  <li>应急避难</li>
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
  import Mock from 'mockjs'
  const Random = Mock.Random
  export default {
    name: 'search-around',
    data() {
      return {
        searchContent: ''
      }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      Color() {
        return Random.rgb()
      }
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
          margin: 0 auto;
          margin-top: 22px;
          width: 1866px;
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
            width: 90%;
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
                  margin-right: 40px;
                }
                .sublist {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  li {
                    cursor: pointer;
                    width: 20%;
                    text-align: left;
                    margin: 0 10px 30px 0;
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

