export default {

  //
  configMap: {

    fields: {
      // 对于各视图中不同的属性信息，在views中使用配置项分别配置，如在table中【字段A】文本展示为轮播图，在form中为上传轮播图，则可在views视图中额外声明一个对象，对label属性额外声明
      productSn: { type: 'input', label: '商品编号' },
      productName: { type: 'input', label: '商品名' },
      categories: { type: 'input', label: '排序值' },
      createTime: { type: 'datePicker', label: '创建时间' }
    },

    filterDemo: {

      attrs: { // 分为按字段配置和按视图配置
        demoField1: {},
        demoField2: {},
        demoView1: {
          demoField1: {}
        },
        demoView2: {}
      },

      events: { // 分为按字段配置和按视图配置
      },

      views: {

        filterFields: [ 'productSn' , 'productName' , 'categories' , 'createTime' ],
        filterFieldsAttr:{

        }

      },

      dynamicElementDataFetches: {
      }

    }
  }

}
