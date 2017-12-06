<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0 0;
}
.wh100{
  height: 100%;
  width: 100%;
}
html {
    -ms-overflow-style:none;
    overflow:-moz-scrollbars-none;
}
html::-webkit-scrollbar{width:0px}
</style>
