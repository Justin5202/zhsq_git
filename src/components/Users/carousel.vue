<template>
  <div class="carousel">
    <div class="carousel-wrap">
      <transition>
        <div class="img-container">
          <transition-group tag="ul" class="slide-ul" name="list">
            <li 
            v-for="(item, index) in images" 
            :key="index" v-show="currentIndex === index"
            >
              <img :src="item.path" alt="图片">
            </li>
          </transition-group>
        </div>
      </transition>
    </div>
    <div class="img-thumbnail">
      <ul class="img-list">
        <li v-for="(item, index) in images" :key="index" @click="change(index)">
          <img :src="item.path"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'carousel',
    data() {
      return {
        images: [
          {path: 'http://pic.sc.chinaz.com/files/pic/pic9/201803/zzpic10964.jpg'},
          {path: 'http://pic.sc.chinaz.com/files/pic/pic9/201711/zzpic8416.jpg'},
          {path: 'http://pic.sc.chinaz.com/files/pic/pic9/201704/zzpic3210.jpg'},
          {path: 'http://pic.sc.chinaz.com/files/pic/pic9/201608/apic22556.jpg'},
          {path: 'http://pic.sc.chinaz.com/files/pic/pic9/201711/zzpic8500.jpg'}
        ],
        currentIndex: 0,
        timer: null
      }
    },
    created() {
      // this.$nextTick(() => {
      //   setInterval(() => {
      //     this.autoPlay()
      //   }, 3000)
      // })
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .carousel {
    height: 100%;
    width: 100%;
    background-color: #000;
    .carousel-wrap {
      padding-top: 100px;
      position: relative;
      height: 500px;
      width: 100%;
      margin: 0 auto;
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
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .img-list {
      width: 100%;
      height: 200px;
      list-style: none;
      margin-top: 10px;
      margin-left: 20px;
      li {
        height: 100%;
        width: 200px;
        float: left;
        cursor: pointer;
        margin-right: 20px;
        box-sizing: border-box;
        border: 10px solid #fff;
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