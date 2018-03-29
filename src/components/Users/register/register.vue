<template>
  <div class="register">
    <div class="wrap">
      <el-form :model="form">
        <el-form-item>
          <el-input 
          placeholder="请输入手机号" 
          v-model="form.phoneNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
          placeholder="请输入验证码" 
          v-model="form.checkNum">
            <el-button @click="_getCheckCode(form.phoneNum)" slot="append">{{codeTime}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input 
          placeholder="请输入密码"
          v-model="form.password"
          type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.truename" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select 
          placeholder="请选择部门" 
          v-model="form.branchId">
            <el-option 
            v-for="(item, index) in branchList" 
            :label="item.text" 
            :value="item.id"
            :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select 
          placeholder="请选择区县" 
          v-model="form.areacode">
            <el-option 
            v-for="(item, index) in areaList" 
            :label="item.areaname" 
            :value="item.areacode"
            :key="index"></el-option>
          </el-select>
        </el-form-item>
        <div class="btn-box">
          <router-link to="login" tag="span" class="link">
            <el-button type="primary">取消</el-button>
          </router-link>
          <el-button type="primary" @click="_register(form)">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { register, getRegisterInfo, getCheckCode } from '../../../api/user'
  import {Message} from 'element-ui'
  export default {
    name: 'register',
    data() {
      return {
        codeTime: '获取验证码',
        count: '',
        timer: null,
        branchList: '',
        areaList: '',
        code: '',
        form: {
          phoneNum: '',
          truename: '',
          password: '',
          branchId: '',
          areacode: '',
          checkNum: ''
        }
      }
    },
    mounted() {
      this._getRegisterInfo()
    },
    methods: {
      setRevserseTime() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT
          this.codeTime = this.count + 's'
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.codeTime = this.count + 's'
            } else {
              this.codeTime = '获取验证码'
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      _register(option) {
        if (option.phoneNum === '') {
          this.$message({
            message: '请输入电话号码',
            type: 'error'
          })
          return false
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(option.phoneNum)) {
          this.$message({
            message: '请输入正确的手机号码',
            type: 'error'
          })
          return false
        }

        if (option.checkNum === '') {
          this.$message({
            message: '请输入验证码',
            type: 'error'
          })
          return false
        } else if (option.checkNum !== this.code) {
          this.$message({
            message: '请输入正确的验证码',
            type: 'error'
          })
          return false
        }

        if (option.password === '') {
          this.$message({
            message: '请输入密码',
            type: 'error'
          })
          return false
        } else if (!/^(\w){6,20}$/.test(option.password)) {
          this.$message({
            message: '密码只能输入6-20个字母、数字、下划线',
            type: 'error'
          })
          return false
        }
        if (option.branchId === '') {
          this.$message({
            message: '请选择部门',
            type: 'error'           
          })
          return false
        }
        if (option.areacode === '') {
          this.$message({
            message: '请选择区县',
            type: 'error'           
          })
          return false
        }

        register(option).then(res => {
          if (res.code == '1') {
            this.$router.push('/login')
          } else if(res.code == '4') {
            this.$message({
              message: '手机号已被注册',
              type: 'error'
            })
          }
        })
      },
      _getRegisterInfo() {
        getRegisterInfo().then(res => {
          this.branchList = res.data.branch
          this.areaList = res.data.qx
        })
      },
      _getCheckCode(phone) {
        if (phone === '') {
          this.$message({
            message: '请输入您的手机号码',
            type: 'error'
          })
          return false
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
          this.$message({
            message: '请输入正确的手机号码',
            type: 'error'
          })
          return false
        }
        this.setRevserseTime()
        getCheckCode(phone).then(res => {
          if (res.code === '1') {
            this.$message({
              message: '验证码已发送，请注意短信查收',
              type: 'success'
            })
            this.code = res.data.checkCode
          }
        })
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  .register {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/Login/PCzc.jpg') no-repeat;
    background-size: 100% 100%;
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
