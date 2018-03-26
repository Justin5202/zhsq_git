<template>
  <div class="iframe">
      <iframe :src="path" frameborder="0"></iframe>
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
</style>
