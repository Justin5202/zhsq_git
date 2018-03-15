<template>
  <div class="my-message">
    <ul class="list">
      <li class="list-item" v-for="item in data" :key="item.time">
        <p class="time">{{item.time}}</p>
        <p class="text">{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'my-message',
    props: {
      data: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style lang="scss" scoped>
  .my-message {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .list {
      .list-item {
        padding: 20px 10px;
        border-bottom:1px solid lightgrey;
        p {
          text-align: left;
        }
        .time {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .text {
          font-size: 18px;
          color: #000;
        }
      }
    }
  }
</style>

