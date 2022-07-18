<template>
  <el-card class="page-container is-always-shadow">
  <!-- 根据配置项渲染搜索条件视图 -->
    <el-card>
      <h5 class="demo-title">基础用例：根据配置项渲染搜索条件视图</h5>
      <div class="filter-wrap">
        <el-form
          ref="headerFilter"
          :inline="true"
          :model="filterViewData"
          size="small"
          class="searchbar"
        >
          <el-form-item
            v-for="field in filterViewFields"
            :key="field.name"
            :prop="field.name"
            :label="field.label"
          >
            <dynamic-view-loader
              v-model:data="filterViewData[field.name]"
              :type="field.type"
            ></dynamic-view-loader>
              <!-- :options="fieldsOptions[field.name]"
              v-on="fieldsEvents[field.name]"
              v-bind="fieldsAttrs[field.name]" -->
          </el-form-item>
          <el-form-item class="btn">
            <el-button
              type="primary"
              size="medium"
            >
              查询</el-button
            >
            <el-button
              size="medium"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <div>{{`当前搜索条件：${JSON.stringify(filterViewData)}`}}</div>
      </div>
    </el-card>
  </el-card>
</template>

<script>

import { onBeforeMount, reactive, toRefs, getCurrentInstance } from 'vue'
import { ViewController } from '@/utils/ViewController'
import DynamicViewLoader from '@/components/DynamicViewLoader'

import configMap from './configMap'

export default {
  name: 'filterDemo',
  components: {
    DynamicViewLoader
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const viewController = new ViewController('configMap', configMap, proxy.$route.name) // 实例化视图控制类

    const state = reactive({
      filterViewFields: [], // 搜索表单中的字段信息
      viewController, // 控制类
      filterViewData: {}
    })
    viewController.bindAttrToInstance(state) // 项实例中初始化配置信息
    onBeforeMount(() => {
      state.filterViewFields = viewController.getViewFieldsConfig('filterFields', 'filterFieldsAttr')
      console.log(state.filterViewFields)
    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
  },
}
</script>

<style scoped>
  .page-container {
    min-height: 100%;
  }
  .demo-title{
    line-height: 36px;
    padding: 5px;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>
