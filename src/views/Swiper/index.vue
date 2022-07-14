<template>
  <el-card class="swiper-container">
  </el-card>
</template>

<script>

import { onMounted, reactive, ref, toRefs, getCurrentInstance } from 'vue'
import { ViewController } from '@/utils/viewController'
import { ElMessage } from 'element-plus'
import axios from '@/utils/axios'

import configMap from './swiper'

export default {
  name: 'Swiper',
  components: {
  },
  setup() {

    const { proxy } = getCurrentInstance()
    // const importConfig = await import(`./${proxy.$route.name}`)
    // console.log(configMap,importConfig.default)
    const viewController = new ViewController('configMap',configMap, proxy.$route.name)

    const multipleTable = ref(null)
    const addGood = ref(null)
    const state = reactive({
      loading: false,
      tableData: [], // 数据列表
      multipleSelection: [], // 选中项
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 分页大小
      type: 'add', // 操作类型
      viewController, // 控制类
    })
    onMounted(async () => {
      getCarousels()
      console.log(viewController.getTableColumnConfig(),1111)
    })
    // 获取轮播图列表
    const getCarousels = () => {
      state.loading = true
      axios.get('/carousels', {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
    }
    // 添加轮播项
    const handleAdd = () => {
      state.type = 'add'
      addGood.value.open()
    }
    // 修改轮播图
    const handleEdit = (id) => {
      state.type = 'edit'
      addGood.value.open(id)
    }
    // 选择项
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    // 批量删除
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
      }
      axios.delete('/carousels', {
        data: {
          ids: state.multipleSelection.map(i => i.carouselId)
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getCarousels()
      })
    }
    // 单个删除
    const handleDeleteOne = (id) => {
      axios.delete('/carousels', {
        data: {
          ids: [id]
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getCarousels()
      })
    }
    const changePage = (val) => {
      state.currentPage = val
      getCarousels()
    }
    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      addGood,
      handleAdd,
      handleEdit,
      handleDelete,
      handleDeleteOne,
      getCarousels,
      changePage
    }
  }
}
</script>

<style scoped>
  .swiper-container {
    min-height: 100%;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>