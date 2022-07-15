<template>
  <el-card class="page-container">
    {{`通过配置获取出的表格配置${JSON.stringify(tableViewFields)}`}}
  </el-card>
</template>

<script>

import { onBeforeMount, reactive, toRefs, getCurrentInstance } from 'vue'
import { ViewController } from '@/utils/ViewController'

import configMap from './configMap'

export default {
  name: 'tableDemo',
  components: {
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const viewController = new ViewController('configMap', configMap, proxy.$route.name)

    const state = reactive({
      tableViewFields: [], // 表格的中的字段信息
      viewController // 控制类
    })
    viewController.bindAttrToInstance(state)
    onBeforeMount(() => {
      state.tableViewFields = viewController.getViewFieldsConfig('tableFields', 'tableFieldsAttr')
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
  .page-container {
    min-height: 100%;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>
