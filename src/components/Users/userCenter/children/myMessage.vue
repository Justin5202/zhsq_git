<template>
  <div class="my-message">
    <ul class="list">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <p class="time">{{item.time | formatDate}}</p>
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
    },
    filters: {
      formatDate(date) {
				if (!date) {
					return;
				}
				date = date.length === 10 ? date + '000' : date;
				function add0(m) {
					return m < 10 ? '0' + m : m;
				}
				let time = new Date(parseInt(date) * 1000);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				let h = time.getHours();
				let mu = time.getMinutes();
				let s = time.getSeconds();
				return y + '年' + add0(m) + '月' + add0(d) + '日' + ' ' + add0(h) + ':' + add0(mu) + ':' + add0(s); 
			}
    }
  }
</script>
<style lang="scss" scoped>
  .my-message {
    width: 100%;
    height: 100%;
    .list {
      list-style: none;
      .list-item {
        padding: 15px 10px;
        border-bottom:1px solid lightgrey;
        p {
          text-align: left;
        }
        .time {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .text {
          font-size: 18px;
          font-weight: 500;
          color: #000;
        }
      }
    }
  }
</style>

