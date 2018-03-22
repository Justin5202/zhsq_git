<template>
  <div class="">
    {{mapguid, name, areacode}}
  </div>
</template>

<script>
export default {
    props: {
        mapguid: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        areacode: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>
