<template>
  <div class="pic-pop">
    <img :src="thumb" alt="">
    <p @click="checkMorePic()">查看图片</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getMorePic} from '@/api/datasheets'

export default {
    props: {
        mapguid: {},
        name: {},
        areacode: {}
    },
    computed: {
      ...mapGetters([
        'topicList'
      ]),
      thumb() {
        let temp = ''
        this.topicList.list.map(v => {
          if(v.id == this.mapguid) {
            temp = 'http://zhsq.digitalcq.com/cqzhsqd2c_v2_test' + v.filePath + v.thumbnail
          }
        })
        return temp
      }
    },
    created() {
      console.log(this.areacode)
    },
    methods: {
      checkMorePic() {
        this.$router.push({
          path: `/carousel/${this.mapguid}`
        })
      }
    }
}
</script>

<style lang="scss" scoped>
  .pic-pop {
    width: 100px;
    margin: -10px -10px -15px;
    padding: 5px;
    text-align: center;
    border-radius: 4px;
    img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    p {
      cursor: pointer;
    }
  }
</style>
