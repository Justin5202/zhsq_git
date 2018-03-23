<template>
<div>
  <i class="el-icon-loading" v-if="!uuidClickedInfo && !showArray.length > 0"></i>
  <div class="pop" v-if="uuidClickedInfo && showArray.length > 0">
    <div v-if="!notPoi">
      <div class="pop-title">
        <h3 class="title" v-if="uuidClickedInfo._source.mc">{{uuidClickedInfo._source.mc}}</h3>
        <h3 class="title" v-else-if="uuidClickedInfo._source.name">{{uuidClickedInfo._source.name}}</h3>
        <h3 class="title" v-else-if="uuidClickedInfo._source.jc">{{uuidClickedInfo._source.jc}}</h3>
        <h3 class="title" v-else>{{uuidClickedInfo._source[showArray[0]._source.name]}}</h3>
        <i class="cross-icon" @click="isShowPop()"></i>
      </div>
      <ul class="pop-ul">
        <li class="pop-li" v-for="item in showArray">
          <p>{{item._source.name_a}}</p>
          <span>{{uuidClickedInfo._source[item._source.name]}}</span>
        </li>
      </ul>
    </div>
    <div v-if="notPoi">
      <div class="pop-title">
        <h3 class="title">{{areaDetailInfo.areaname}}</h3>
        <i class="cross-icon" @click="isShowPop()"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button-item left-button-item" @click="searchAroundShow()">
        <i class="icon-searcharound"></i>
        <span class="search-around">搜周边</span>
      </div>
      <div class="button-item">
        <i class="icon-checkdetail"></i>
        <span>查详情</span>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import {getQueryOnlineByUuid, getThematicMap} from '@/api/dataSheets'
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      uuidClickedInfo: '',
      showArray: [],
      isShow: false,
      notPoi: false
    }
  },
  props: {
    mapguid: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'areaDetailInfo'
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
      if(!data._source.ztmc) {
        return
      }
      let info = data._source
      let reg1 = RegExp(/市政府驻地\?政府机关/)
      let reg2 = RegExp(/区县驻地\?政府机关/)
      let reg3 = RegExp(/乡镇|街|驻地/)
      let reg4 = RegExp(/社区村驻地/)
      let code = ''
      if(reg1.exec(info.ztmc)) {
        code = info.qxdm
        this.notPoi = true
      } else if(reg2.exec(info.ztmc)) {
        code = info.qxdm
        this.notPoi = true
      } else if(reg3.exec(info.ztmc)) {
        code = info.xzjdm
        this.notPoi = true
      } else if(reg4.exec(info.ztmc)) {
        code = info.sqcdm
        this.notPoi = true
      }
      let areaInfo = {
				areacode: code,
			  areaname: ''
      }
      this.setAreaInfo({'areainfo': areaInfo, 'isRemoveAll': false})
    },
    _getQueryOnlineByUuid(id) {
      getQueryOnlineByUuid(id).then(res => {
        if (res.code == "1") {
          let data = JSON.parse(res.data.data)
          this.uuidClickedInfo = data
          this.checkDataType(data)
          getThematicMap(data._type).then(res => {
            if (res.data !== '[]') {
              this.showArray = JSON.parse(res.data)
            } else {
              this.$mapHelper.closePopup()
            }
          })
        } else {
          this.$mapHelper.closePopup()
        }
      })
    },
    ...mapActions([
      'setAroundSearchShow',
      'setAreaInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
.pop {
    width: 250px;
    .pop-title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        .title {
            font-size: 14px;
            line-height: 40px;
            padding-left: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
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
      overflow-y: scroll;
    }
    .pop-li {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        font-size: 13px;
        span {
            padding-top: 5px;
            color: #888;
            font-size: 12px;
        }
    }
    .button-box {
        display: flex;
        margin-top: 30px;
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
                background: url("../../assets/images/calloutview/看@2x.png") no-repeat;
                background-size: 100%;
            }
            .icon-checkdetail {
                background: url("../../assets/images/calloutview/详情@2x.png") no-repeat;
                background-size: 100%;
            }
        }
        .left-button-item {
            border-right: 1px solid #fff;
        }
    }
}
</style>
