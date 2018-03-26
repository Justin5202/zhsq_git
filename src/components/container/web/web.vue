<template>
  <div class="iframe">
      <iframe :src="path" frameborder="0"></iframe>
      <p @click="goBack"><span class="el-icon-arrow-left"></span>返回</p>
  </div>
</template>

<script>
import {getProvertyInfo} from '@/api/datasheets'

export default {
    data() {
        return  {
            path: ''
        }
    },
    created() {
        let areacode = this.$route.params.code
        let dataId = this.$route.params.id
        this._getProvertyInfo(areacode, dataId)
    },
    methods: {
        _getProvertyInfo(code, id) {
            getProvertyInfo(code, id).then(res => {
                this.path = res.data.path
            })
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .iframe {
        width: 100%;
        height: 100%;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
    p {
        display: inline-block;
        font-size: 14px;
        position: fixed;
        z-index: 99;
        top: 50%;
        left:10px;
        color: #fff;
        cursor: pointer;
        transform: translateY(-50%);
    }
</style>
