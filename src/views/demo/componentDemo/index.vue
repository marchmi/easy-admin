<template>
  <el-card class="page-container is-always-shadow">
    <el-card>
      <h5 class="demo-title">二次封装：分页组件</h5>
      <div class="demo-content">{{`通过callback处理后的第${pagination.currentPage}数据：${JSON.stringify(list)}`}}</div>
      <Pagination :pagination="pagination" @current-change="(val) => { handleCurrentChange(val,updateRes) }" />
    </el-card>
  </el-card>
</template>
<script>

import { defineComponent } from 'vue'

import Pagination from '@/components/Pagination'

import PaginationMix from '@/mixins/Pagination'

export default defineComponent({
  name:'componentDemo',
  
  components:{
    Pagination
  },

  mixins: [ PaginationMix ],

  props: {},

  created(){
    this.handleCurrentChange(1,this.updateRes)
  },

  methods: {
    async updateRes(list) { // 在当前模块真，如果需要针对返回的列表数据做一些同步的处理，也可声明成同步函数
      // 假定在当前页面中获取到书籍列表数据，然后书籍名称没有《》，需要为书籍名称添加《》
      list.forEach( book =>{
        book.bookName = `《${book.bookName}》`
      })
    }
  },

  computed: {}
})
</script>

<style scoped>
  .page-container {
    min-height: 100%;
  }
  .demo-title{
    line-height: 36px;
    padding: 5px;
  }
  .demo-content{
    line-height: 24px;
    padding: 5px;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
  .page-container .el-card {
    margin-bottom: 20px;
  }
</style>