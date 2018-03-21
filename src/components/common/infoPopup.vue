<template>
<div>
  <i class="el-icon-loading" v-if="!uuidClickedInfo && !showArray.length > 0"></i>
  <div class="pop" v-if="uuidClickedInfo && showArray.length > 0">
    <div class="pop-title">
      <h3 class="title">{{uuidClickedInfo._source.address}}</h3>
      <i class="cross-icon" @click="isShowPop()"></i>
    </div>
    <ul class="pop-ul">
      <li class="pop-li" v-for="item in showArray">
        <p>{{item._source.name_a}}</p>
        <span>{{uuidClickedInfo._source[item._source.name]}}</span>
      </li>
    </ul>
    <div class="button-box">
      <div class="button-item left-button-item">
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
</template>

<script>
import {getQueryOnlineByUuid, getThematicMap} from '@/api/dataSheets'
export default {
  data() {
    return {
      uuidClickedInfo: '',
      showArray: [],
      isShow: false
    }
  },
  props: {
    mapguid: {
      type: String,
      default: ''
    }
  },
  beforeMount() {
    this._getQueryOnlineByUuid(this.mapguid)
  },
  methods: {
    isShowPop() {
      this.$mapHelper.closePopup()
    },
    _getQueryOnlineByUuid(id) {
      getQueryOnlineByUuid(id).then(res => {
        if (res.code == "1") {
          let data = JSON.parse(res.data.data)
          this.uuidClickedInfo = data
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
    toSearch() {
      window.location.hash = '/searchAround'
    }
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
