<template>
  <div class="feedback">
    <ul class="nav">
      <li class="item" 
      :class="{active: index===currentIndex}" 
      v-for="(item, index) in tabs"
      @click="setActive(index)">{{item.name}}</li>
    </ul>
    <div class="container">
      <el-form>
        <el-form-item :model="form">
          <el-input v-model="form.text" rows=25  type="textarea" placeholder="请输入您宝贵的意见"></el-input>
        </el-form-item>
        <el-button @click="_feedback(form.text)">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {feedback} from '../../../../api/users/data'
  export default {
    name: 'feedback',
    data() {
      return {
        form: {
          text: ''
        },
        tabs: [
          {name: '意见反馈'},
          {name: '反馈历史'}
        ],
        currentIndex: 0
      }
    },
    methods: {
      setActive(index) {
        this.currentIndex = index
      },
      _feedback(text) {
        if (text === '') {
          this.$message({
            message: '请输入您的反馈',
            type: 'error'
          })
          return
        }
        feedback(text).then(res => {
          console.log(res.data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .feedback {
    width: 100%;
    height: 100%;
    background-color: #fff;
    ul {
      list-style: none;
      width: 100%;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid lightgrey;
      margin-bottom: 30px;
      .item {
        width: 50%;
        height: 50px;
        line-height: 50px;
        color: #000;
        font-size: 18px;
      }
      .active {
        color: #fff;
        background-color: rgb(139, 139, 139);
      }
    }
    .container {
      width: 90%;
      margin: 0 auto;
      .el-form {
        .el-textarea {
          textarea {
            border-radius: 0;
          }
          textarea:focus {
            border: 1px solid rgb(211, 219, 231);
          }
        }
        .el-button {
          background-color: rgb(39, 68, 112);
          color: #fff;
          font-size: 16px;
          padding-left: 30px;
          padding-right: 30px;
        }
      }
    }
  }
</style>

