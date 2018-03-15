<template>
  <div class="pop">
    <div class="pop-title">
      <h3 class="title">{{uuidInfo._source.address}}</h3>
      <i class="cross-icon"></i>
    </div>
    <ul>
      <li class="pop-li">
        <p>大类名称</p>
        <span>城市建设用地</span>
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
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed: {
      ...mapGetters([
        'uuidInfo'
      ])
    }
}
</script>

<style lang="scss" scoped>
  .pop {
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 4px;
		background-color: #fff;
		-webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
    .pop-title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, .3);
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
        background: url('../../assets/images/catalog/关闭搜索.png') no-repeat;
        background-size: 100%
      }
    }
    .pop-li {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 5px 10px;
      border-bottom: 1px solid rgba(0, 0, 0, .2);
      font-size: 13px;
      span {
        padding-top: 5px;
        color: #888;
        font-size: 12px;
      }
    }
    .button-box {
      display: flex;
      padding: 5px 0;
      background-color: rgba(0, 0, 0, .4);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
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
          background: url('../../assets/images/calloutview/看@2x.png') no-repeat;
          background-size: 100%;
        }
        .icon-checkdetail {
          background: url('../../assets/images/calloutview/详情@2x.png') no-repeat;
          background-size: 100%;
        }
      }
      .left-button-item {
        border-right: 1px solid #fff;
      }
    }
  }
</style>
