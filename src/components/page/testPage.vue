<template>
  <div id="testPage">
      <h1>
          {{msg}}
      </h1>
  </div>
</template>

<script>
export default {
  name: 'testPage',
  data () {
    return {
      msg: ' TEST PAGE'
    }
  }
}
</script>

<style>
#testPage{
  height: 400px;
  width: 400px;
  background-color: red
}
</style>
