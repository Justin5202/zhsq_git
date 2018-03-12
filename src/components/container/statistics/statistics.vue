<template>
  <div>
      <img src="../../../assets/images/map/统计.png"  width="60" height="60" alt="" @click="statisticsVisible = true">
      <el-dialog
        title="提示"
        :visible.sync="statisticsVisible"
        width="60%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="statisticsVisible = false">取 消</el-button>
            <el-button type="primary" @click="statisticsVisible = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
      return{
          statisticsVisible:false
      }
  },
  methods:{

  }
}
</script>
<style>
</style>
