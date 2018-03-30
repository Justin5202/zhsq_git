<template>
  <transition name="fade">
    <div class="user-center">
      <el-container>
        <el-header>
          <h2 class="title"><img src="../../../assets/images/head.jpg"/>个人中心</h2>
        </el-header>
        <el-main>
          <ul class="menu">
            <li class="menu-item" v-for="(item, index) in tabs" :key="index" @click="setCurrent(item.name,index)">
              {{item.name}}
            </li>
          </ul>
        </el-main>
        <el-footer>
          <p class="back" @click="closeCenter">返回</p>        
          <p class="out" @click="_logout">退出登录</p>
        </el-footer>
      </el-container>
      <transition name="move">
        <div class="left-side" v-show="showPanel">
          <header>
            <h2 class="title"><span class="close" @click="closePanel">关闭</span>{{currentTab}}</h2>
          </header>
          <div class="container">
            <v-my-message :data="datalist" v-if="currentIndex === 0"/>
            <v-feedback v-else-if="currentIndex === 1"/>
            <v-contact v-else-if="currentIndex === 2"/>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import vMyMessage from '@/components/users/userCenter/children/myMessage'
import vFeedback from '@/components/users/userCenter/children/feedback'
import vContact from '@/components/users/userCenter/children/contact'
import {fetchData} from '../../../api/user'
import { Message,MessageBox } from 'element-ui'
import { logout } from '../../../api/user'
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
    closeCenter() {
      this.closePanel()
      this.$emit('close')
    },
    _fetchData() {
      let time = Math.round(new Date() / 1000)
      fetchData(time).then(res => {
        this.datalist = res.data.infos
      })
    },
    clearCache() {
      this.$alert('缓存清除成功', '清除缓存', {
        confirmButtonText: '确定'}
      )
    },
    _logout() {
      this.$confirm('退出登录，是否继续？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(res => {
           this.$router.push('/login')
        })
      }).catch(() => {
        this.$message({
          message: '已取消退出登录',
          type: 'info'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .user-center {
    height: 398px;
    width: 350px;
    position: fixed;
    right: 10px;
    top: 15px;
    background-color: #fff;
    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    .el-header {
      height: 80px !important;
      background-color: #335fff;
      padding: 0;
      color: #fff;
      border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      .title {
        line-height: 80px;
        font-weight: 400;
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          padding-right: 10px;
        }
      }
    }
    .el-main {
      padding: 0;
      height: 278px;
      .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 14px;
        .menu-item {
          padding-left: 14px;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #e0e0e0;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
    }
    .el-footer {
      height: 40px !important;
      padding: 0;
      display: flex;
      p {
        width: 49%;
        padding-right: 10px;
        line-height: 40px;
        text-align: right;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
      }
      .back {
        text-align: left;
        padding-left: 10px;
      }
    }
    .left-side {
      box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      height: 700px;
      width: 350px;
      position: absolute;
      right: 0;
      top: 0;
      background-color: #fff;
      header {
        height: 80px;
        .title {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          height: 80px;
          line-height: 80px;
          font-weight: 400;
          color: #fff;
          background-color: #335fff;
          position: relative;
          .close {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            position: absolute;
            left: 10px;
            top: 0;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
      .container {
        height: 620px;
      }
    }
  }

  .move-enter-active {
    animation: moveIn 0.3s linear;
  }
  .move-leave-active {
    animation: moveOut 0.3s linear;
  }
  @keyframes moveIn {
     from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }
  @keyframes moveOut {
    from {
      right: 0;
    }
    to {
      right: -100%;
    }
    
  }

  .fade-enter-active {
    animation: fadeIn 0.3s linear;
  }
  .fade-leave-active {
    animation: fadeOut 0.3s linear;
  }
  @keyframes fadeIn {
    from {
      right: -350px;
    }
    to {
      right: 15px;
    }
  }
  @keyframes fadeOut {
    from {
      right: 15px;
    }
    to {
      right: -350px;
    }
  }
</style>
