<template>
  <div class="carousel">
    <div class="carousel-wrap">
      <transition>
        <div class="img-container">
          <transition-group tag="ul" class="slide-ul" :name="direction">
            <li
            v-for="(item, index) in pic"
            :key="index" v-show="currentIndex === index"
            >
              <img :src="`http://zhsq.digitalcq.com/cqzhsqd2c_v2_test${item.filePath}${item.fileQuality}`" alt="图片">
            </li>
          </transition-group>
        </div>
      </transition>
      <span class="left el-icon-arrow-left" @click="pre"></span>
      <span class="right el-icon-arrow-right" @click="next"></span>
    </div>
    <div class="img-thumbnail">
      <ul class="img-list">
        <li v-for="(item, index) in pic" :key="index" @click="change(index)">
          <img :src="`http://zhsq.digitalcq.com/cqzhsqd2c_v2_test${item.filePath}${item.thumbnailName}`"/>
        </li>
      </ul>
    </div>
    <p class="back" @click="back"><span class="el-icon-arrow-left"></span>返回</p>
  </div>
</template>
<script>
  import {getMorePic} from '@/api/dataSheets'
  export default {
    name: 'carousel',
    data() {
      return {
        pic: [],
        currentIndex: 0,
        timer: null,
        direction: 'left'
      }
    },
    created() {
      this._getMorePic(this.$route.params.id)
    },
    methods: {
      go() {
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 3000)
      },
      stop() {
        clearInterval(this.timer)
        this.timer = null
      },
      change(index) {
        this.direction = 'left'
        this.currentIndex = index
      },
      pre() {
        this.direction = 'left'
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.currentIndex = this.pic.length - 1
        }
      },
      next() {
        this.direction = 'right'
        this.currentIndex++
        if (this.currentIndex > this.pic.length - 1) {
          this.currentIndex = 0
        }
      },
      autoPlay() {
        this.currentIndex++
        if (this.currentIndex > this.pic.length - 1) {
          this.currentIndex = 0
        }
      },
      _getMorePic(id) {
        getMorePic(id).then(res => {
          this.pic = res.data
        })
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .carousel {
    height: 100%;
    width: 100%;
    background-color: #000;
    position: relative;
    .carousel-wrap {
      padding-top: 50px;
      margin: 0 auto;
      position: relative;
      width: 50%;
      height: 640px;
      overflow: hidden;
      .slide-ul {
        list-style: none;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        li {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      .left, .right {
        position: absolute;
        color: #fff;
        font-size: 40px;
        cursor: pointer;
      }
      .left {
        top: 50%;
        left: 0;
      }
      .right {
        top: 50%;
        right: 0;
      }
    }
    .img-list {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2%;
      li {
        height: 100%;
        width: 150px;
        margin-right: 20px;
        box-sizing: border-box;
        border: 10px solid #fff;
        list-style: none;
        cursor: pointer;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .back {
      color: #fff;
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  // 左滑动
  .left-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
  }
  .left-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%);
  }
  .left-enter {
    transform: translateX(100%);
  }
   .left-leave {
    transform: translateX(0);
  }

  // 右滑动
  .right-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
  }
  .right-leave-active {
    transition: all 1s ease;
    transform: translateX(100%);
  }
  .right-enter {
    transform: translateX(-100%);
  }
  .right-leave {
    transform: translateX(0);
  }
</style>
