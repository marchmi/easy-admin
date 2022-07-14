export default {

  // 
  configMap: {

    fields: {
      // 对于各视图中不同的属性信息，在views中使用配置项分别配置，如在table中【字段A】文本展示为轮播图，在form中为上传轮播图，则可在views视图中额外声明一个对象，对label属性额外声明
      carouselUrl: { type: 'imageUploader' , label: '轮播图' }, 
      redirectUrl: { type: 'link' , label: '跳转链接' },
      carouselRank: { type: 'input' , label: '排序值' },
      createTime: { type: 'dateTimePicker' , label:'创建时间' }
    },

    swiper: {

      attrs: {  // 分为按字段配置和按视图配置
        demoField1: {},
        demoField2: {},
        demoView1:{
          demoField1: {}
        },
        demoView2: {}
      },

      events: { // 分为按字段配置和按视图配置
      },

      views: {

        // 写一个转换方法，结合对应的字段配置项返回一个配置信息数组 [{ field: fieldName, filter: filterName || null, path: path || null , slot: true } ,...]
        tableFields: [ 'carouselUrl' , 'redirectUrl' , 'carouselRank' , 'createTime' ],

        // 需要动态加载视图展示数据的字段在这里配置，没有配置的，直接展示值，有配置的加载对应的视图进行数据展示，使用slot预留值的表示用户自定义
        tableFieldsView: {
          carouselUrl: 'image',
          redirectUrl: 'link',
        },

        headerFilter: [],

        detailForm: [
        ]

      },

      apis: {
        list: '/carousels',
        delete: '/carousels',
        add: '/carousels'
      },

      dynamicElementDataFetches: {
      }

    },

    select: {
    }
  }

}