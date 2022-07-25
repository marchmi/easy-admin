<template>
  <el-descriptions v-bind="$attrs">
    <template #title>
      <slot name="title" />
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
    <template v-for="item in $attrs.contents||[]" :key="item.label">
      <!-- 载入视图展示描述信息 ，推荐将使用slot形式展示描述信息的 -->
      <el-descriptions-item v-if="item.dynamic" :label="item.label" v-bind="item.attrs||{}">
        <dynamic-view-loader
          v-model:data="item.content"
          :options="item.options||[]"
          :type="item.dynamic"
          v-bind="item.dynamicAttrs||{}"
          v-on="item.dynamicEvents||{}"
        >
        </dynamic-view-loader>
      </el-descriptions-item>
      <!-- 使用插槽展示描述信息 , 根据配置信息的slot字段在组件中生成一个对应的插槽 , 在调用时按下面的形式使用 -->
      <!-- <template v-slot:about="props"> 在页面调用时使用
        <el-descriptions-item :label="props.label" v-bind="props.attrs||{}">{{props.content}}</el-descriptions-item>
      </template> -->
      <slot v-else-if="item.slot" :name="item.slot" />
      <el-descriptions-item v-else :label="item.label" v-bind="item.attrs||{}">{{item.content}}</el-descriptions-item>
    </template>
  </el-descriptions>
</template>
<script>
import { defineComponent } from 'vue'
import DynamicViewLoader from '@/components/DynamicViewLoader.vue'
export default defineComponent({
  name:'Descriptions',
  
  components: {
    DynamicViewLoader
  },

  props: {
    /**
     * $attr:{
     *   contents:[ // 针对 el-descriptions-item 的数据集合项
     *    {
     *      label: String,
     *      content: String,
     *      attrs:{}, 支持所有官方支持的属性
     *      slot: true, 使用对应的插槽展示描述信息
     *      dynamic: String, 载入对应的视图展示描述信息
     *    },
     *   ],
     *   ... 针对el-descriptions的属性配置信息
     * }
     */
  },

  methods: {},

  computed: {
    
  }
})
</script>
