import { reactive } from "vue"
export default {
  data() {
    const rtn = reactive({
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
      Descriptions: {
        contents: [ // Descriptions Items data
          {
            label: '描述一',
            content: '这是一段描述内容'
          },
          {
            label: '描述二',
            content: '这是一段描述内容'
          },
          {
            label: '描述三',
            content: '这是一段描述内容'
          },
          {
            label: '描述四',
            content: '这是一段描述内容',
            attrs: {
              span: 2
            }
          },
          {
            label: '描述五',
            content: '这是一段描述内容'
          },
          {
            label: '描述六ByDynamic',
            content: '这是通过dynamic载入',
            dynamic: 'input',
            attrs: { span: 1 }, // span属性需后面还有元素才生效
            dynamicAttrs: { size: 'mini' , maxlength: 15 , 'show-word-limit': true }
          },
          {
            label: '描述七',
            content: '这是一段描述内容'
          },
          {
            slot: 'slot1'
          },
        ],
        border: true
      },
      slotProps: {
        label:'通过slot插入',
        content: '演示通过slot插入DescriptionsItem'
      }
    })
    return rtn
  },

  methods:{
  }
}