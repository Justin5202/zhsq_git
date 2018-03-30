<template>
<div>
  <div class="pop" v-if="uuidClickedInfo">
    <div>
      <div class="pop-title" v-if="!type">
        <h3 class="title" v-if="uuidClickedInfo._source.mc">{{uuidClickedInfo._source.mc}}</h3>
        <h3 class="title" v-else-if="uuidClickedInfo._source.name">{{uuidClickedInfo._source.name}}</h3>
        <h3 class="title" v-else-if="uuidClickedInfo._source.jc">{{uuidClickedInfo._source.jc}}</h3>
        <h3 class="title" v-else>{{uuidClickedInfo._source[showArray[0]._source.name]}}</h3>
        <i class="cross-icon" @click="isShowPop()"></i>
      </div>
      <ul class="pop-ul" v-if="!notPoi && !type">
        <li class="pop-li" v-if="showArray.length > 0" v-for="item in showArray">
          <p>{{item._source.name_a}}</p>
          <span>{{uuidClickedInfo._source[item._source.name]}}</span>
        </li>
      </ul>
    </div>
    <div class="pop-title" v-if="type">
      <h3 class="title">{{areaDetailInfo.areaname}}</h3>
      <i class="cross-icon" @click="isShowPop()"></i>
    </div>
    <div class="button-box">
      <div class="button-item left-button-item" @click="searchAroundShow()">
        <i class="icon-searcharound"></i>
        <span class="search-around">搜周边</span>
      </div>
      <div class="button-item" @click="getDetails()">
        <i class="icon-checkdetail"></i>
        <span>查详情</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getQueryOnlineByUuid, getThematicMap } from "@/api/dataSheets";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      uuidClickedInfo: "",
      showArray: [],
      isShow: false,
      notPoi: false,
      dataType:0
    };
  },
  props: {
    mapguid: {
      type: String,
      default: ""
    },
    geoPoint: {

    },
    type: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    geoPoint(newV) {
      let data = {
        point: JSON.stringify(geoPoint)
      }
      this.$store.commit(TYPE.SEARCH_PARAMS, data)
    }
  },
  computed: {
    ...mapGetters([
      'areaDetailInfo',
      'areaInfo'
    ])
  },
  beforeMount() {
    this._getQueryOnlineByUuid(this.mapguid)
  },
  methods: {
    isShowPop() {
      this.$mapHelper.closePopup()
    },
    searchAroundShow() {
      this.setAroundSearchShow(true)
    },
    checkDataType(data) {
      this.notPoi = false
      this.uuidClickedInfo = data
      if (!data._source.ztmc || data._source.ztmc=='社区村驻地(未移动版)') {
        getThematicMap(data._type).then(res => {
          if (res.data !== "[]") {
            this.showArray = JSON.parse(res.data)
          } else {
            this.$mapHelper.closePopup()
          }
        })
      } else {
        let info = data._source
        let reg1 = RegExp(/市政府驻地\?政府机关/)
        let reg2 = RegExp(/区县驻地\?政府机关/)
        let reg3 = RegExp(/乡镇|街|驻地/)
        let reg4 = RegExp(/社区村驻地/)
        let code = ""
        if (reg1.exec(info.ztmc)) {
          code = info.qxdm
          this.notPoi = true
        } else if (reg2.exec(info.ztmc)) {
          code = info.qxdm
          this.notPoi = true
        } else if (reg3.exec(info.ztmc)) {
          code = info.xzjdm
          this.notPoi = true
        } else if (reg4.exec(info.ztmc)) {
          code = info.sqcdm
          this.notPoi = true
        }
        if (!this.notPoi) {
          getThematicMap(data._type).then(res => {
            if (res.data !== "[]") {
              this.showArray = JSON.parse(res.data)
            } else {
              this.$mapHelper.closePopup()
            }
          })
        }
        let areaInfo = {
          areacode: code,
          areaname: ""
        }
        this.setAreaInfo({ areainfo: areaInfo, isRemoveAll: false, type: 'clickedMap' })
      }
    },
    _getQueryOnlineByUuid(id) {
      getQueryOnlineByUuid(id).then(res => {
        if (res.code == "1") {
          if(res.data.data) {
            let data = JSON.parse(res.data.data)
            this.checkDataType(data)
          } else {
            this.$mapHelper.closePopup()
          }
        } else {
          this.$mapHelper.closePopup()
        }
      })
    },
    getDetails(){
      var dataArray = []
      if(this.uuidClickedInfo._source.areacode == this.areaInfo.areacode){
        this.getReportDataByAreaCode([this.uuidClickedInfo._source.areacode,this.uuidClickedInfo._source.areaname,2])
				this.setReportFormShow(false)
				this.setAreaReportFormShow(true)
      }else{
        var title = this.uuidClickedInfo._source.name || this.uuidClickedInfo._source.mc || this.uuidClickedInfo._source.jc
        var dataArray = { 'title': title, 'name': [], 'data': [] }
        for(var i in this.showArray){
          dataArray.data.push({'name':this.showArray[i]._source.name_a,'context':this.uuidClickedInfo._source[this.showArray[i]._source.name]})
        }
        this.setReportFormDetails(dataArray)
        this.setReportFormShow(false)
				this.setAreaReportFormShow(true)
      }
    },
    ...mapActions([
      'setAroundSearchShow',
      'setAreaInfo',
      'setReportFormShow',
      'setAreaReportFormShow',
      'getReportDataByAreaCode',
      'setReportFormDetails'
    ])
  }
}
</script>

<style lang="scss" scoped>

.pop {
  background-color: rgba(255, 255,255,0.6);
  width: 250px;
  .pop-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .title {
      font-size: 15px;
      line-height: 40px;
      padding-left: 10px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .cross-icon {
      display: block;
      width: 40px;
      height: 40px;
      background: url("../../assets/images/catalog/关闭搜索.png") no-repeat;
      background-size: 100%;
    }
  }
  .pop-ul {
    max-height: 200px;
    overflow-y: auto;
  }
  .pop-li {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 13px;
    font-weight: 400;
    span {
      padding-top: 5px;
      color: #888;
      font-size: 12px;
    }
  }
  .button-box {
    display: flex;
    padding: 5px 0;
    background-color: rgba(0, 0, 0, 0.4);
    .button-item {
      display: flex;
      flex: 1;
      justify-content: center;
      cursor: pointer;
      span {
        line-height: 30px;
        color: #fff;
      }
      i {
        display: block;
        width: 30px;
        height: 30px;
      }
      .icon-searcharound {
        background: url("../../assets/images/calloutview/POI看@2x.png") no-repeat;
        background-size: 100%;
      }
      .icon-checkdetail {
        background: url("../../assets/images/calloutview/POI详情@2x.png") no-repeat;
        background-size: 100%;
      }
    }
    .left-button-item {
      border-right: 1px solid #fff;
    }
  }
}
</style>
