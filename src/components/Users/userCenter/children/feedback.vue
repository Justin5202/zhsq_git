<template>
  <div class="feedback">
    <ul class="nav">
      <li class="nav-item"
      :class="{active: index===currentIndex}"
      v-for="(item, index) in tabs"
      @click="setActive(index)">{{item.name}}</li>
    </ul>
    <div class="form-container" v-show="currentIndex === 0">
      <el-form>
        <el-form-item :model="form">
          <el-input v-model="form.text" :rows="19"  type="textarea" placeholder="请输入您宝贵的意见"></el-input>
        </el-form-item>
        <el-button @click="_feedback(form.text)">提交</el-button>
      </el-form>
    </div>
    <div class="history-container" v-show="currentIndex === 1">
      <div class="history-box" v-show="!showDialogBox">
        <ul class="list">
          <li 
          v-for="(item, index) in suggestList" 
          class="list-item" :class="{active:index===selectedIndex}" 
          @click="handleSelect(index, item)">
            <p class="text">{{item.suggest}}</p>
            <p class="time">{{item.addtime | formatDate}}</p>
          </li>
          <li class="btn-box">
            <el-button @click="pre()" v-show="showPre">上一页</el-button>
            <el-button @click="next()" v-show="showNext">下一页</el-button>
          </li>
        </ul>
      </div>
      <div class="message-box" v-show="showDialogBox">
        <p class="message-time">{{messageTime | formatDate}}</p>
        <div class="message-me">
          <span class="message-me-content">{{myContent}}</span><i></i>
        </div>
        <div class="message-admin" v-show="adminContent">
          <i></i><span class="message-admin-content">{{adminContent}}</span>
        </div>
        <p class="back_to_list" @click="closeDialog"><span class="el-icon-arrow-left"></span>返回</p>
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
        myContent: '',
        adminContent: '',
        suggestList: [],
        page: 1,
        showDialogBox: false,
        showNext: true,
        showPre: true
      }
    },
    filters: {
      formatDate(date) {
				if (!date) {
					return
				}
				date = date.length === 10 ? date + '000' : date
				function add0(m) {
					return m < 10 ? '0' + m : m
				}
				let time = new Date(parseInt(date) * 1000)
				let y = time.getFullYear()
				let m = time.getMonth() + 1
				let d = time.getDate()
				let h = time.getHours()
				let mu = time.getMinutes()
				return y + '年' + add0(m) + '月' + add0(d) + '日' + ' ' + add0(h) + ':' + add0(mu);
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
          return false
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
        this.messageTime = item.addtime
        this.myContent = item.suggest
        this.adminContent = item.replyDescp
        this.showDialog()
      },
      _getSuggestList() {
        let start = (this.page - 1) * 10
        getSuggestList(start).then(res => {
          this.suggestList = res.data.data.data
          const total = res.data.data.totalRecord
          if (this.page === 1) {
            this.showPre = false;
          } else {
            this.showPre = true
          }
          if (total <= 10) {
            this.showNext = false
          } else if (total > 10 && total <= this.page * 10) {
            this.showPre = true
            this.showNext = false
          } else if (total > 10 && total > this.page * 10) {
            this.showPre = this.showNext = true
            if (this.page === 1) {
              this.showPre = false
            }
          }
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
        if(this.suggestList.length < 10) {
          return
        }
        this.page++
        this._getSuggestList()
      },
      showDialog() {
        this.showDialogBox = true
      },
      closeDialog() {
        this.showDialogBox = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .feedback {
    width: 100%;
    height: 100%;
    .nav {
      list-style: none;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid lightgrey;
      margin-bottom: 30px;
      box-sizing: border-box;
      .nav-item {
        width: 50%;
        height: 100%;
        line-height: 40px;
        color: #000;
        font-size: 16px;
        cursor: pointer;
      }
      .nav-item:hover, .active {
        color: #335fff;
      }
    }
    .form-container {
      width: 94%;
      margin: 0 auto;
      .el-form {
        .el-textarea {
          font-size: 16px;
        }
        .el-button {
          background-color:#335fff;
          color: #fff;
          font-size: 15px;
          padding-left: 30px;
          padding-right: 30px;
        }
      }
    }
    .history-container {
      height: 580px;
      margin-top: -30px;
      display: flex;
      justify-content: flex-start;
      .history-box {
        width: 100%;
        height: 100%;
        border-right: 1px solid lightgray;
        border-bottom: 0;
        box-sizing: border-box;
        .list {
          height: 100%;
          overflow: auto;
          list-style: none;
          .list-item {
            padding: 5px 8px;
            border-bottom:1px solid lightgrey;
            cursor: pointer;
            box-sizing: border-box;
            p {
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .text {
              font-size: 16px;
              margin-bottom: 5px;
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
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
      .message-box {
        height: 100%;
        width: 100%;
        position: relative;
        .message-time {
          width: 100%;
          font-size: 17px;
          padding: 10px 0;
          text-align: center;
        }
        .message-me {
          width: 90%;
          position: absolute;
          right: 10px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .message-me-content {
            display: inline-block;
            max-width: 260px;
            min-height: 40px;
            line-height: 40px;
            background: url('../../../../assets/images/usercenter/me_chat@2x.png') no-repeat;
            background-position: 100%;
            background-size: 50px;
            background-color:#B2E865; 
            padding: 0 10px;
            margin-top: 10px;
            word-break: break-all;
            text-align: left;
          }
          i {
            display: inline-block;
            height: 50px;
            width: 50px;
            border-radius:100%;
            background: url('../../../../assets/images/usercenter/me@2x.png') no-repeat;
            background-size: 100%;
          }
        }
        .message-admin {
          width: 100%;
          position: absolute;
          left: 10px;
          top: 100px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .message-admin-content {
            display: inline-block;
            min-height: 40px;
            line-height: 40px;
            max-width: 260px;
            background: url('../../../../assets/images/usercenter/manager_chat@2x.png') no-repeat;
            background-position: 100%;
            background-size: 50px;
            background-color: #E1E1E1;
            padding: 0 10px;
            margin-top: 10px;
            word-break: break-all;
          }
          i {
            display: inline-block;
            height: 50px;
            width: 50px;
            border-radius:100%;
            background: url('../../../../assets/images/usercenter/manager@2x.png') no-repeat;
            background-size: 100%;
          }
        }
      }
      .back_to_list {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 14px;
        cursor: pointer;
        color: #335fff;
      }
    }
  }
</style>
