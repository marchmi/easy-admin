<template>
  <el-pagination
    :total="pagination.total"
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    v-bind="$attrs" 
  />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Pagination',
  
  props: {
    pagination: {
      type: [ Object ],
      required: true // 引用组件的页面必定会使用到相关的参数信息，所以必传
    }
  },

  methods: {},

  computed: {
    
  }
})
</script>
