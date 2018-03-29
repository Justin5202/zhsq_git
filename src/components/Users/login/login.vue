<template>
  <div class="login" ref="login">
    <div class="wrap">
      <h1>欢迎登录重庆市综合市情系统</h1>
      <div class="form">
        <form class="el-form">
          <div class="el-form-item">
            <label>用户名:</label>
            <input class="el-input" v-model="form.username"/>
          </div>
          <div class="el-form-item">
            <label>密&nbsp;&nbsp;&nbsp;码:</label>
            <input 
            class="el-input" 
            type="password" 
            v-model="form.password" 
            @keyup.enter="_login(form.username, form.password)">
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="_login(form.username, form.password)">登&nbsp;&nbsp;&nbsp;录</el-button>
            <router-link to="register" tag="span" class="link">
              <el-button type="primary">注&nbsp;&nbsp;&nbsp;册</el-button>
            </router-link>
          </div>
        </form>
      </div>
      <div class="info">
        <p>申请用户名请联系地理信息中心</p>
        <p>联系人:赵翔宇 电话:023-67033881</p>
        <p>邮箱:57012855@qq.com</p>
      </div>
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
    if (this.$route.name == 'zhsq_d2c') {
      window.location.reload()
    }
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
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background: url('../../../assets/images/Login/logbg@2x.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .wrap {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      h1 {
        padding-top: 10%;
        font-size: 45px;
        margin: 0;
        letter-spacing: 3px;
      }
      .form {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: flex-end;
        flex: 2;
        align-items: center;
        .el-form {
          .el-form-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 44px;
            label {
              font-size: 24px;
              width: 86px;
              margin-right: 24px;
            }
            .el-input {
              height: 56px;
              width: 404px;
              border: 1px solid lightgrey;
              border-left: 0;
              outline: none;
              padding: 0 5px;
              box-sizing: border-box;
              font-size: 18px;
            }
          }
          .btn-box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: 24px;
            .el-button {
              width: 232px;
              height: 56px;
              font-size: 24px;
              border: 0;
              border-radius: 0;
              background-color: #002a4f;
            }
          }
        }
      }
      .info {
        margin-bottom: 2%;
        p {
          letter-spacing: 1px;
          padding-bottom: 5px;
        }
      }
    }
  }
</style>
