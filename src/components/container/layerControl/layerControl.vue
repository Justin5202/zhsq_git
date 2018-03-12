<template>
  <div class="layer-table">
    <div class="layer-box">
      <div class="layer-title-box">
        <h2>图层</h2>
        <span class="trash-icon"></span>
      </div>
      <div class="radio-box">
        <el-checkbox v-model="checked">全不选</el-checkbox>
        <el-checkbox v-model="checked">透明度</el-checkbox>
      </div>
      <div class="layer-tool-arrow"></div>
      <ul>
        <li class="layer-li">
          <div class="layer-li-content">
            <el-checkbox v-model="checked"></el-checkbox>
            <p>建设用地</p>
            <div class="cross-box">
              <i class="cross-icon"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>

<style lang="scss" scoped>
.layer-table {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  .layer-box {
    background-color: #fff;
    font-size: 12px;
    .layer-title-box {
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      h2 {
        line-height: 40px;
      }
      .trash-icon {
        display: block;
        width: 40px;
        height: 40px;
        background: url(../../../assets/images/legend/allDelLayers@2x.png) no-repeat;
        background-size: 100%;
      }
    }
    .radio-box {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background-color: #e4e7ed;
    }
    ul {
      .layer-li {
        padding-left: 10px;
        list-style: none;
        .layer-li-content {
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          p {
            flex: 1;
            padding-left: 10px;
            text-align: left;
          }
          .cross-box {
            .cross-icon {
              display: block;
              width: 40px;
              height: 40px;
              background: url('../../../assets/images/catalog/关闭搜索.png') no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
