<template>
  <div class="pic-pop">
    <div v-if="mapguid && !areacode">
      <a :href="path" target="_blank">
        <img :src="thumb1" alt="" @click="checkMorePic()">
        <p @click="checkMorePic()">查看图片</p>
      </a>
    </div>
    <div v-if="mapguid && areacode">
      <a :href="result.path" target="_blank">
        <img :src="thumb2" alt="">
      </a>
      <p @click="checkDetail()">查看详情 ></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex"
import { getMorePic, getMsMacroData, getProvertyInfo } from "@/api/datasheets"

export default {
  props: {
    mapguid: {},
    name: {},
    areacode: {},
    path: ''
  },
  data() {
    return {
      result: ''
    }
  },
  computed: {
    ...mapGetters(["topicList"]),
    thumb1() {
      let temp = ""
      this.topicList.list.map(v => {
        if (v.dataId == this.mapguid) {
          temp =
            "http://zhsq.digitalcq.com/cqzhsqd2c_v2_test" +
            v.filePath +
            v.thumbnail
        }
      })
      return temp
    },
    thumb2() {
      if(this.areacode && this.mapguid && this.result) {
        return `http://zhsq.digitalcq.com/cqzhsqd2c_v2_test${this.result.filePath}${this.result.thumbnail}`
      }
    }
  },
  created() {
    if(this.areacode && this.mapguid) {
      this._getProvertyInfo(this.areacode, this.mapguid)
    }
  },
  methods: {
    checkMorePic() {
      console.log(this.path)
      if(!this.path) {
        this.$router.push({
          path: `/carousel/${this.mapguid}`
        })
      }
    },
    checkDetail() {
			this.setReportFormShow(false)
			this.setAreaReportFormShow({isShow:true,areaInfo:{'mc':this.name,'areaCode':this.areacode,'id':this.mapguid},type:3})
    },
    _getProvertyInfo(code, id) {
      getProvertyInfo(code, id).then(res => {
        this.result = res.data
        if(!res.data) {
          this.checkDetail()
        }
      })
    },
    ...mapActions([
			'setReportFormShow',
			'setAreaReportFormShow'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.pic-pop {
  width: 100px;
  padding: 5px;
  text-align: center;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
  img {
    display: block;
    margin: 0 auto;
    width: 100%;
    cursor: pointer;
  }
  p {
    cursor: pointer;
    color: #fff;
  }
}
</style>
