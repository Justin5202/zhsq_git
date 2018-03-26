<template>
  <div class="pic-pop">
    <div v-if="mapguid && !areacode">
      <img :src="thumb1" alt="">
      <p @click="checkMorePic()">查看图片</p>
    </div>
    <div v-if="mapguid && areacode">
      <img :src="thumb2" alt="" @click="goToPage()">
      <p @click="checkDetail()">查看详情 ></p>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions} from "vuex"
import { getMorePic, getMsMacroData, getProvertyInfo } from "@/api/datasheets"

export default {
  props: {
    mapguid: {},
    name: {},
    areacode: {}
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
        if (v.id == this.mapguid) {
          temp =
            "http://zhsq.digitalcq.com/cqzhsqd2c_v2_test" +
            v.filePath +
            v.thumbnail
        }
      })
      return temp
    },
    thumb2() {
      if(this.areacode && this.mapguid) {
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
      this.$router.push({
        path: `/carousel/${this.mapguid}`
      })
    },
    goToPage() {
      this.$router.push({
        path: `/web/${this.areacode}/${this.mapguid}`
        // path: `/720picture/${this.result.path}/${this.areacode}`
      })
    },
    checkDetail() {
      this.getAreaPovertyAlleviationDetailByAreaCode({'mc':this.name,'areaCode':this.areacode,'id':this.mapguid})
			this.setReportFormShow(false)
			this.setAreaReportFormShow(true)
    },
    _getProvertyInfo(code, id) {
      getProvertyInfo(code, id).then(res => {
        this.result = res.data
      })
    },
    ...mapActions([
			'getAreaPovertyAlleviationDetailByAreaCode',
			'setReportFormShow',
			'setAreaReportFormShow'
    ]),
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
    cursor: pointer;
  }
  p {
    cursor: pointer;
  }
}
</style>
