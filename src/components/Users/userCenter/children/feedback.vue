<template>
  <div class="feedback">
    <ul class="nav">
      <li class="item"
      :class="{active: index===currentIndex}"
      v-for="(item, index) in tabs"
      @click="setActive(index)">{{item.name}}</li>
    </ul>
    <div class="form-container" v-show="currentIndex === 0">
      <el-form>
        <el-form-item :model="form">
          <el-input v-model="form.text" :rows="25"  type="textarea" placeholder="请输入您宝贵的意见"></el-input>
        </el-form-item>
        <el-button @click="_feedback(form.text)">提交</el-button>
      </el-form>
    </div>
    <div class="history-container" v-show="currentIndex === 1">
      <div class="history-box">
        <ul class="list">
          <li v-for="n in 10" class="list-item" :class="{active:n===selectedIndex}" @click="handleSelect(n)">
            <p class="text">分离萨菲罗斯接待来访</p>
            <p class="time">2018年03月16日 09:39</p>
          </li>
          <li class="btn-box">
            <el-button @click="pre()">上一页</el-button>
            <el-button @click="next()">下一页</el-button>
          </li>
        </ul>
      </div>
      <div class="message-box">
        <p class="message-time">{{messageTime}}</p>
        <div class="message">
          <span class="message-content">{{messageContent}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {feedback, getSuggestList} from '../../../../api/user'
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
        currentIndex: 0,
        selectedIndex: '',
        messageTime: '',
        messageContent: '',
        suggestList: '',
        page: 1
      }
    },
    methods: {
      setActive(index) {
        this.currentIndex = index
        if (index === 1) {
          this._getSuggestList()
        }
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
          if (res.message === 'success') {
            this.$alert('感谢您的反馈！', '意见反馈', {confirmButtonText: '确定'})
            let that = this
            setTimeout(function() {
              that.form.text = ''
            }, 1000)
          }
        })
      },
      handleSelect(index, item) {
        this.selectedIndex = index
      },
      _getSuggestList() {
        let start = (this.page - 1) * 10
        getSuggestList(start).then(res => {
          console.log(res)
        })
      },
      pre() {
        if (this.page === 1) {
          return
        }
        this.page--
        this._getSuggestList()
      },
      next() {
        this.page++
        this._getSuggestList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .feedback {
    width: 100%;
    height: 100%;
    background-color: rgb(248, 247, 247);
    .nav {
      list-style: none;
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid lightgrey;
      margin-bottom: 30px;
      box-sizing: border-box;
      .item {
        width: 50%;
        height: 100%;
        line-height: 50px;
        color: #000;
        font-size: 18px;
        cursor: pointer;
      }
      .active {
        color: #fff;
        background-color: rgb(139, 139, 139);
      }
    }
    .form-container {
      width: 94%;
      margin: 0 auto;
      .el-form {
        .el-textarea {
          font-size: 16px;
          textarea {
            background-color: rgb(248, 247, 247) !important;
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
    .history-container {
      height: 95%;
      margin-top: -30px;
      display: flex;
      justify-content: flex-start;
      .history-box {
        width: 400px;
        height: 100%;
        background-color: #fff;
        .list {
          height: 100%;
          overflow: auto;
          .list-item {
            padding: 10px 10px;
            border-bottom:1px solid lightgrey;
            cursor: pointer;
            box-sizing: border-box;
            p {
              text-align: left;
            }
            .text {
              font-size: 16px;
              margin-bottom: 15px;
              color: #000;
            }
            .time {
              font-size: 16px;
            }
          }
          .btn-box {
            margin-top: 10px;
          }
          .active {
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
      .message-box {
        height: 100%;
      }
    }
  }
</style>
