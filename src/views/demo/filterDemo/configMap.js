export default {

  //
  configMap: {

    fields: {
      // 对于各视图中不同的属性信息，在views中使用配置项分别配置，如在table中【字段A】文本展示为轮播图，在form中为上传轮播图，则可在views视图中额外声明一个对象，对label属性额外声明
      bookSn: { type: 'input', label: '书籍编号' , placeholder: '输入书籍编号搜索' , rules:['required','snRule'] },
      bookName: { type: 'input', label: '书籍名称' , placeholder: '输入书籍名称搜索' , rules:['nameRule'] },
      categories: { type: 'input', label: '书籍分类' , placeholder: '选择书籍分类搜索' },
      createTime: { type: 'datePicker', label: '创建时间' }
    },

    filterDemo: {

      attrs: { // 分为按字段配置和按视图配置
        categories: {
          placeholder: '请输入书籍分类进行搜索'
        },
        createTime: {
          placeholder: '请选择一个日期',
          format:'YYYY/MM/DD',
          'value-format':'YYYY-MM-DD'
        },
      },

      events: { // 分为按字段配置和按视图配置
        createTime: {
          change:'consoleValue'
        },
        filter: {
          categories: {
            change:'consoleValue'
          },
          createTime: {
            change:'consoleValue'
          }
        }
      },

      views: {

        filterFields: [ 'bookSn' , 'bookName' , 'categories' , 'createTime' ],
        filterFieldsAttr:{
        }

      },

      dynamicElementDataFetches: {
      }

    }
  }

}
