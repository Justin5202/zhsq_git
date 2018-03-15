<template>
  <div class="register">
    <div class="wrap">
      <el-form :model="form">
        <el-form-item>
          <el-input placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" >
            <el-button slot="append">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="请选择部门">
            <el-option label="部门1" value=""></el-option>
            <el-option label="部门2" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="请选择区县">
            <el-option label="区县1" value="0"></el-option>
            <el-option label="区县2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div class="btn-box">
          <router-link to="login" tag="span" class="link">
            <el-button type="primary">取消</el-button>
          </router-link>
          <el-button type="primary">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'register',
    data() {
      return {
        form: {
          
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .register {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(38, 117, 207);
    color: #fff;
    .wrap {
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -30%);
      width: 500px;
      background-color: #fff;
      border: 4px solid rgb(61, 131, 211);
      .el-form {
        padding:50px 10px 10px 10px;
        .el-form-item {
          .el-select {
            width: 100%;
          }
        }
        .btn-box {
          display: flex;
          justify-content: space-between;
          padding-top:15px;
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
  }
</style>
