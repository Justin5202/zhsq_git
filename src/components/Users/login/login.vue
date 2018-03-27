<template>
  <div class="login" ref="login">
    <div class="wrap">
      <h1>重庆市综合市情系统</h1>
      <div class="form">
        <form class="el-form">
          <div class="el-form-item">
            <span class="icon icon-user"></span>
            <input class="el-input" v-model="form.username" placeholder="请输入用户名"/>
          </div>
          <div class="el-form-item">
            <span class="icon icon-password"></span>
            <input 
            class="el-input" 
            type="password" 
            v-model="form.password" 
            placeholder="请输入密码"
            @keyup.enter="_login(form.username, form.password)">
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="_login(form.username, form.password)">登录</el-button>
            <router-link to="register" tag="span" class="link">
              <el-button type="primary">注册</el-button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="info">
      <p>申请用户名请联系地理信息中心</p>
      <p>联系人:赵翔宇 电话:67033391</p>
    </div>
  </div>
</template>
<script>
import {login} from '../../../api/user'
import {mapActions} from 'vuex'
import {Message} from 'element-ui'
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  destroyed() {
    window.location.reload()
  },
  methods: {
    _login(username, password) {
      if (username === '') {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        })
        return false
      }
      if (password === '') {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return false
      }
      login(username, password).then(res => {
        // -3已登录， -2超时
        if(res.code === '1') {
          this.setUserinfo(res.data)
          document.cookie = 'loginSession' + "=" + escape(res.data.sessionId)
          this.$router.replace('/')
        } else if (res.code === '4') {
          this.$message({
            message: '用户名或密码错误',
            type: 'error'
          })
        }
      })
    },
    ...mapActions(['setUserinfo'])
  }
}
</script>
<style lang="scss" scoped>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/Login/logbg@2x.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .wrap {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -30%);
      h1 {
        margin-bottom: 20px;
        letter-spacing: 2px;
      }
      .form {
        width: 360px;
        background-color: #fff;
        padding: 10px;
        padding-top: 40px;
        border: 4px solid rgb(61, 131, 211);
        .el-form-item {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            display: inline-block;
            width: 10%;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid lightgrey;
            border-right: 0;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          .icon-user {
            background: url('../../../assets/images/Login/login_name@2x.png') no-repeat;
            background-size: 30px 30px;
            background-position: right;
          }
          .icon-password {
            background: url('../../../assets/images/Login/login_passsword@2x.png') no-repeat;
            background-size: 30px 30px;
            background-position: right;
          }
          .el-input {
            height: 40px;
            width: 90%;
            border: 1px solid lightgrey;
            border-left: 0;
            outline: none;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 0 5px;
            box-sizing: border-box;
          }
        }
        .btn-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 15px 0 30px 0;
          .el-button {
            width: 45%;
            font-size: 16px;
          }
          .link {
            width: 45%;
            .el-button {
              width: 100%;
            }
          }
        }
      }
    }
    .info {
      position: absolute;
      left:50%;
      bottom: 10%;
      transform: translateX(-50%);
      p {
        letter-spacing: 1px;
        padding-bottom: 5px;
      }
    }
  }
</style>
