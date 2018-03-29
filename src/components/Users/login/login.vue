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
    position: relative;
    width: 100%;
    min-height: 768px;
    height: 100%;
    background: url('../../../assets/images/Login/logbg@2x.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .wrap {
      width: 1200px;
      position: absolute;
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
      h1 {
        font-size: 48px;
        margin-bottom: 20px;
        letter-spacing: 3px;
      }
      .form {
        position: absolute;
        width: 512px;
        top: 184px;
        right: 0;
        padding-top: 40px;
        .el-form-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 44px;
          label {
            width: 86px;
            font-size: 24px;
            letter-spacing: 1px;
            margin-right: 24px;
          }
          .el-input {
            height: 56px;
            width: 404px;
            border: 1px solid lightgrey;
            border-left: 0;
            outline: none;
            font-size: 18px;
            padding: 0 5px;
            box-sizing: border-box;
          }
        }
        .btn-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-top: 24px;
          .el-button {
            height: 56px;
            width: 232px;
            font-size: 16px;
            border: 0;
            border-radius: 0;
            background-color: #002a4f;
          }
        }
      }
    }
    .info {
      position: absolute;
      left:50%;
      bottom: 5%;
      transform: translateX(-50%);
      p {
        letter-spacing: 1px;
        padding-bottom: 5px;
      }
    }
  }
</style>
