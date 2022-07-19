<template>
  <el-card class="page-container is-always-shadow">
  <!-- 直接展示数据 -->
    <el-card>
      <h5 class="demo-title">基础用例：直接展示数据</h5>
      <div class="table-wrap">
        <el-table 
          class="data-table"
          :data="tableData"
          style="margin-bottom: 10px"
        >
          <el-table-column
            show-overflow-tooltip
            v-for="field in tableViewFields"
            :key="field.name"
            :width="field.tbl_width"
            :label="field.label"
            align="left"
          >
            <template  #default="{ row }">
              <template v-if="field.tableViewDefined">
                <dynamic-view-loader
                  :data="row[field.name]"
                  :type="
                    field.type
                  "
                  :options="dynamicElementData[field.name]"
                ></dynamic-view-loader>
              </template>
              <template v-else>
                <span>{{row[field.name]||'-'}}</span
                >
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  <!-- format数据后进行展示 -->
    <el-card>
      <h5 class="demo-title">基础用例：format数据后进行展示</h5>
      <div class="table-wrap">
        <el-table 
          class="data-table"
          :data="tableData"
          style="margin-bottom: 10px"
        >
          <el-table-column
            show-overflow-tooltip
            v-for="field in tableViewFields"
            :key="field.name"
            :width="field.tbl_width"
            :label="field.label"
            align="left"
          >
            <template  #default="{ row }">
            <!-- 配置了dynamic的字段进行展示 -->
              <template v-if="field.dynamic">
                <dynamic-view-loader
                  :data="row[field.name]"
                  :type="field.type"
                ></dynamic-view-loader>
              </template>
              <!-- 配置了slot的字段如何展示 -->
              <template v-else-if="field.name === 'redirectUrl'"> 
                <a :href="row[field.name]" target="_blank" rel="noopener noreferrer">查看</a>
              </template>
              <template v-else>
              <!-- format数据后进行展示 -->
                <span>{{formatValue(row,field)}}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-card>
</template>

<script>

import { onBeforeMount, reactive, toRefs, getCurrentInstance } from 'vue'
import { ViewController , formatValue } from '@/utils/ViewController'
import DynamicViewLoader from '@/components/DynamicViewLoader.vue'
import filter from '@/mixins/filter' // 引入filter方法，在后面使用mixins注入

import configMap from './configMap'

export default {
  name: 'tableDemo',
  components: {
    DynamicViewLoader
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const viewController = new ViewController('configMap', configMap, proxy.$route.name) // 实例化视图控制类

    const state = reactive({
      tableViewFields: [], // 表格的中的字段信息
      viewController, // 控制类
      tableData: [
        {carouselUrl:'https://avatars.githubusercontent.com/u/64741038?s=48&v=4', redirectUrl:'https://avatars.githubusercontent.com/u/64741038?s=48&v=4', carouselRank:1, createTime:'2022-07-16 13:21:01'}
      ]
    })
    viewController.bindAttrToInstance(state) // 项实例中初始化配置信息
    onBeforeMount(() => {
      state.tableViewFields = viewController.getViewFieldsConfig('tableFields', 'tableFieldsAttr')
    })
    return {
      ...toRefs(state)
    }
  },
  methods: {
    formatValue  // 注入格式化数据的基础方法
  },
  mixins: [filter]
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
