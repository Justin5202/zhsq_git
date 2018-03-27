<template>
  <div class="iframe">
      <iframe :src="urlpath ? urlpath : path" frameborder="0"></iframe>
  </div>
</template>

<script>
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
        // let areacode = this.$route.params.code
        // let dataId = this.$route.params.id
        // if(areacode !== dataId) {
        //     this._getProvertyInfo(areacode, dataId)
        // }
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
