<template>
  <div class="carousel">
    <div class="carousel-wrap">
      <transition>
        <div class="img-container">
          <transition-group tag="ul" class="slide-ul" name="list">
            <li
            v-for="(item, index) in pic"
            :key="index" v-show="currentIndex === index"
            >
              <img :src="`http://zhsq.digitalcq.com/cqzhsqd2c_v2_test${item.filePath}${item.fileQuality}`" alt="图片">
            </li>
          </transition-group>
        </div>
      </transition>
    </div>
    <div class="img-thumbnail">
      <ul class="img-list">
        <li v-for="(item, index) in pic" :key="index" @click="change(index)">
          <img :src="`http://zhsq.digitalcq.com/cqzhsqd2c_v2_test${item.filePath}${item.thumbnailName}`"/>
        </li>
      </ul>
    </div>
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
        timer: null
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
        this.currentIndex = index
      },
      autoPlay() {
        this.currentIndex++
        if (this.currentIndex > this.images.length - 1) {
          this.currentIndex = 0
        }
      },
      _getMorePic(id) {
        getMorePic(id).then(res => {
          this.pic = res.data
        })
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
  }
  .list-enter-to {
    transition: all 1s ease;
    transform: translateX(0);
  }

  .list-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%)
  }

  .list-enter {
    transform: translateX(100%)
  }

  .list-leave {
    transform: translateX(0)
  }
</style>
