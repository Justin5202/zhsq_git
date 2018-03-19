<template>
  <div class="user-center">
    <el-container>
      <el-aside width="400px">
        <el-header>
          <h2 class="title">个人中心<span>({{username}})</span></h2>
          <el-menu 
          mode="verticle" 
          text-color="#000"
          active-text-color="#606266">
            <el-menu-item 
            v-for="(item, index) in tabs" 
            index="index" 
            :key="index"
            @click="setCurrent(item.name, index)">{{item.name}}</el-menu-item>
          </el-menu>
        </el-header>
        <div class="footer">
          <span type="button" @click="logout()">退出登录</span>
        </div>
      </el-aside>
      <el-main v-show="showPanel">
        <el-header>
          <h2 class="currentTab">{{currentTab}}<span @click="closePanel()">关闭</span></h2>
        </el-header>
        <el-main>
          <v-my-message :data="datalist" v-if="currentIndex === 0"></v-my-message>
          <v-feedback v-else-if="currentIndex === 1"></v-feedback>
          <v-contact v-else-if="currentIndex === 2"></v-contact>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import vMyMessage from '@/components/users/userCenter/children/myMessage'
import vFeedback from '@/components/users/userCenter/children/feedback'
import vContact from '@/components/users/userCenter/children/contact'
import {fetchData} from '../../../api/users/data'
export default {
  name: 'user-center',
  data() {
    return {
      tabs: [
        {name: '我的消息'},
        {name: '意见反馈'},
        {name: '联系我们'},
        {name: '清除缓存'}
      ],
      currentTab: '',
      currentIndex: '',
      showPanel: false,
      datalist: [],
      username: ''
    }
  },
  mounted() {
    this.getUsername()
  },
  components: {
    vMyMessage,
    vFeedback,
    vContact
  },
  methods: {
    setCurrent(current, index) {
      if (index === 3) {
        this.clearCache()
        return
      }
      if (index === 0) {
        this._fetchData()
      }
      this.showPanel = true
      this.currentIndex = index
      this.currentTab = current
    },
    closePanel() {
      this.showPanel = false
    },
    _fetchData() {
      let time = Math.round(new Date() / 1000)
      fetchData(time).then(res => {
        console.log(res.message)
        this.datalist.push({text: res.message, time: time})
      })
    },
    clearCache() {
      this.$alert('缓存清除成功', '清除缓存', {
        confirmButtonText: '确定'}
      )
    },
    logout() {
      localStorage.removeItem('userinfo')
      this.$router.push('/login')
    },
    getUsername() {
      this.username = JSON.parse(localStorage.getItem('userinfo')).truename
    }
  }
}
</script>
<style lang="scss" scoped>
  .user-center {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .el-container {
      height:100%;
      .el-aside {
        position: relative;
        height: 100%;
        background-color: rgb(248, 247, 247);
        border-right: 1px solid rgb(48, 46, 46);
        box-sizing: border-box;
        .el-header {
          padding: 0;
          .title {
            height: 100%;
            line-height: 60px;
            color: white;
            font-weight: 500;
            font-size: 20px;
            background-color: rgb(91, 104, 121);
          }
        }
        .el-menu {
          background-color: rgb(248, 247, 247);
          .el-menu-item {
            font-size: 16px;
            border-bottom: 1px solid lightgrey;
            height: 90px;
            line-height:90px;
          }
        }
        .footer {
          width: 100%;
          position: absolute;
          bottom: 0;
          span {
            display: inline-block;
            width: 100%;
            border: none;
            outline: none;
            padding: 15px 0;
            background-color: red;
            color:#fff;
            cursor: pointer;
          }
        }
      }
      .el-main {
        height: 100%;
        margin-bottom: -60px;
        padding: 0;
        box-sizing: border-box;
        .el-header {
          padding: 0;
          .currentTab {
            height: 60px;
            line-height: 60px;
            color: white;
            font-weight: 500;
            font-size: 20px;
            background-color: rgb(91, 104, 121);
            position: relative;
            span {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
        }
        .el-main {
          height: 100%;
          background-color: #fff;
        }
      }
    }
  }
</style>


