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
          </el-form-item>
        </el-form>
        <div>{{`当前搜索条件：${JSON.stringify(filterViewData)}`}}</div>
      </div>
    </el-card>
  <!-- 根据配置项绑定属性和事件 -->
    <el-card>
      <h5 class="demo-title">拓展用例：根据配置项绑定属性和事件</h5>
      <div class="filter-wrap">
        <el-form
          ref="attrFilter"
          :inline="true"
          :model="attrFilterViewData"
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
              v-model:data="attrFilterViewData[field.name]"
              :type="field.type"
              v-bind="fieldsAttrs[field.name]"
              v-on="fieldsEvents[field.name]"
            ></dynamic-view-loader>
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
        <div>{{`当前搜索条件：${JSON.stringify(attrFilterViewData)}`}}</div>
      </div>
    </el-card>
  <!-- 根据配置项绑定校验规则 -->
    <el-card>
      <h5 class="demo-title">拓展用例：根据配置项绑定校验规则</h5>
      <div class="filter-wrap">
        <el-form
          ref="ruleFilter"
          :inline="true"
          :model="ruleFilterViewData"
          size="small"
          class="searchbar"
          :validate-on-rule-change="false"
          :rules="viewController.getFieldsRules.call(this,'filterFields',{bookSn:'请填写书籍编号再查询'})"
        >
          <el-form-item
            v-for="field in filterViewFields"
            :key="field.name"
            :prop="field.name"
            :label="field.label"
          >
            <dynamic-view-loader
              v-model:data="ruleFilterViewData[field.name]"
              :type="field.type"
              v-bind="fieldsAttrs[field.name]"
              v-on="fieldsEvents[field.name]"
            ></dynamic-view-loader>
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
        <div>{{`当前搜索条件：${JSON.stringify(ruleFilterViewData)}`}}</div>
      </div>
    </el-card>
  <!-- 根据配置信息获取选项数据 -->
    <el-card>
      <h5 class="demo-title">拓展用例：根据配置信息获取选项数据</h5>
      <div class="filter-wrap">
        <el-form
          ref="optionFilter"
          :inline="true"
          :model="optionFilterViewData"
          size="small"
          class="searchbar"
          :validate-on-rule-change="false"
          :rules="viewController.getFieldsRules.call(this,'filterFields',{bookSn:'请填写书籍编号再查询'})"
        >
          <el-form-item
            v-for="field in optionFilterViewFields"
            :key="`optionFilter${field.name}`"
            :prop="field.name"
            :label="field.label"
          >
            <dynamic-view-loader
              v-model:data="optionFilterViewData[field.name]"
              :options="optionData[field.name]||dynamicElementData[field.name]"
              :type="field.type"
              v-bind="fieldsAttrs[field.name]"
              v-on="fieldsEvents[field.name]"
            ></dynamic-view-loader>
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
        <div>{{`当前搜索条件：${JSON.stringify(optionFilterViewData)}`}}</div>
      </div>
    </el-card>
  </el-card>
</template>

<script>

import { onBeforeMount, reactive, toRefs, getCurrentInstance } from 'vue'
import { ViewController } from '@/utils/ViewController'
import DynamicViewLoader from '@/components/DynamicViewLoader.vue'
import rule from './rule'
import mixins from './mixins'

import configMap from './configMap'
import selectMap from '@/const/select'

export default {
  name: 'filterDemo',
  components: {
    DynamicViewLoader
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const viewController = new ViewController('configMap', configMap, proxy.$route.name) // 实例化视图控制类

    const state = reactive({
      filterViewFields: viewController.getViewFieldsConfig('filterFields', 'filterFieldsAttr'), // 搜索表单中的字段信息
      optionFilterViewFields: viewController.getViewFieldsConfig('filterFields', 'optionFilterFieldsAttr'), // 搜索表单中的字段信息
      viewController, // 控制类
      filterViewData: {}, // 记录基础搜索条件的值
      attrFilterViewData: {}, // 记录动态绑定事件和属性的搜索条件的值
      ruleFilterViewData: {}, // 记录动态绑定校验规则的搜索条件的值
      optionFilterViewData: {}, // 记录动态获取选项数据的搜索条件的值
      fieldsAttrs: {}, // 用于记录当前视图中相关字段的attrs
      fieldsEvents: {} // 用于记录当前视图中相关字段的events
    })
    viewController.bindAttrToInstance(state) // 项实例中初始化配置信息
    onBeforeMount(() => {
      
    })
    return {
      ...toRefs(state)
    }
  },
  mixins:[rule,mixins],
  created(){
    this.fieldsAttrs = this.viewController.getFieldsAttrs.call(this,'filterFields') // 获取属性
    this.fieldsEvents = this.viewController.getFieldsEvents.call(this,'filterFields','filter') // 获取事件
    this.viewController.getStaticOptionDataToDynamicElementData.call(this,this.$route.name,selectMap) // 获取所有的选项值
    // this.viewController.getStaticOptionDataToDynamicElementData.call(this,this.$route.name,selectMap,{status:{active:['1','2']}}) // 第三个字段是一个额外配置项，可指定字段只获取部分静态选项值
    this.viewController.fetchDynamicData.call(this, ['categories'])
    console.log(this.dynamicElementData,this.optionData)
  },
  methods: {
    // 测试事件绑定
    consoleValue(val){
      // 处理事件非目标视图的事件穿透
      if(typeof val === 'object' && val.srcElement){
        return
      }
      console.log(`触发动态绑定事件${val}`)
    }
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
  .page-container .el-card {
    margin-bottom: 20px;
  }
</style>
