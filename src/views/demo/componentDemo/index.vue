<template>
  <el-card class="page-container is-always-shadow">
    <!-- 分页组件 -->
    <el-card>
      <h5 class="demo-title">二次封装：分页组件</h5>
      <div class="demo-content">{{`通过callback处理后的第${pagination.currentPage}数据：${JSON.stringify(list)}`}}</div>
      <Pagination :pagination="pagination" @current-change="(val) => { handleCurrentChange(val,updateRes) }" />
    </el-card>
    <!-- Descriptions面板 -->
     <el-card>
      <h5 class="demo-title">二次封装：Descriptions面板</h5>
      <div class="demo-content">{{`二次封装的Descriptions面板，可通过default、slot、dynamic三种形式指定展现形式`}}</div>
      <Descriptions v-bind="Descriptions">
        <template #extra>
          <el-button size="mini" type="primary">{{`插槽插入一个操作`}}</el-button>
        </template>
        <template #title>
          <span>{{`插槽插入一个Title`}}</span>
        </template>
        <template v-slot:slot1> 在页面调用时使用
          <el-descriptions-item :label="slotProps.label" v-bind="slotProps.attrs||{}">{{slotProps.content}}</el-descriptions-item>
        </template>
      </Descriptions>
    </el-card>
  </el-card>
</template>
<script>

import { defineComponent } from 'vue'

import Pagination from '@/components/Pagination'
import Descriptions from '@/components/Descriptions'

import PaginationMix from '@/mixins/Pagination'
import DescriptionsMix from '@/mixins/Descriptions'

export default defineComponent({
  name:'componentDemo',
  
  components:{
    Pagination,
    Descriptions
  },

  mixins: [ PaginationMix , DescriptionsMix ],

  props: {},

  created(){
    // 这个方法定义在PaginationMix
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