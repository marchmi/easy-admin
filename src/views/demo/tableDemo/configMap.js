export default {

  //
  configMap: {

    fields: {
      // 对于各视图中不同的属性信息，在views中使用配置项分别配置，如在table中【字段A】文本展示为轮播图，在form中为上传轮播图，则可在views视图中额外声明一个对象，对label属性额外声明
      carouselUrl: { type: 'imageUploader', label: '轮播图' },
      redirectUrl: { type: 'input', label: '跳转链接' },
      carouselRank: { type: 'input', label: '商品分类' },
      createTime: { type: 'dateTimePicker', label: '创建时间' }
    },

    tableDemo: {

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

        // 写一个转换方法，结合对应的字段配置项返回一个配置信息数组 [{ field: fieldName, filter: filterName || null, path: path || null , slot: true } ,...]
        tableFields: ['carouselUrl', 'redirectUrl', 'carouselRank', 'createTime'],

        tableFieldsAttr: { // 在要增加或者不使用fields中配置的某些属性时,对一些字段的属性进行声明
          carouselUrl: {
            type: 'image', // 将carouselUrl的type重新定义为image,在需要使用
            dynamic: true // 在表格中时，配置此项表示要使用DynamicViewLoader加载组件展示数据,DynamicViewLoader内部会根据字段的type决定加载哪一个组件
          },
          redirectUrl: {
            slot: true // 在表格中时，配置此项表示需要自己在表格定义展示数据的视图
          },
          createTime: {
            filter: 'dateFilter' // filter表示数据会使用method中的对应方法格式化数据进行展示
          }
        }

      },

    }
  }

}
