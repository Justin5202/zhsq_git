<template>
  <div class="iframe">
      <iframe :src="urlpath ? urlpath : path" frameborder="0"></iframe>
  </div>
</template>

<script>
import {getProvertyInfo} from '@/api/datasheets'
import {mapGetters} from 'vuex'

export default {
    data() {
        return  {
            path: ''
        }
    },
    computed: {
        ...mapGetters([
            'urlpath'
        ])
    },
    created() {
        let areacode = this.$route.params.code
        let dataId = this.$route.params.id
        if(areacode !== dataId) {
            this._getProvertyInfo(areacode, dataId)
        }
    },
    methods: {
        _getProvertyInfo(code, id) {
            getProvertyInfo(code, id).then(res => {
                this.path = res.data.path
            })
        }
    },
    destroyed() {
        this.$store.commit('SET_URL_PATH', '')
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
