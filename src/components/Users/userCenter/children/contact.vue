<template>
  <div class="contact">
    <ul class="list">
      <li class="list-item">
        Tel: {{companyInfo.phone}}
      </li>
      <li class="list-item">
        E-mail: {{companyInfo.email}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'contact',
    props: {
      companyInfo: {
        type: Object,
        default: {}
      }
    }
  }
</script>
<style lang="scss" scoped>
  .contact {
    width: 100%;
    height: 100%;
    .list {
      list-style: none;
      .list-item {
        text-align: left;
        padding: 20px 10px;
        border-bottom:1px solid lightgrey;
        color: #000;
        font-size: 18px;
      }
    }
  }
</style>

