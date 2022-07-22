import { reactive } from "vue"
export default {
  data() {
    const rtn = reactive({
      pagination:{
        total: 100,
        pageSize: 10,
        currentPage: 1
      },
      list: []
    })
    return rtn
  },

  methods:{
    /**
     * 为什么设计callback：请求数据前的参数处理，获取数据后的数据处理，页面响应都交互逻辑都相似，内部存在
     * @param {当前页码} val 
     * @param {数据处理回调，同步或异步函数} callback 
     */
    async handleCurrentChange(val,callback){
      const res = [ // 模拟请求后返回的数据
        {
          id: 1, bookName: '茶馆', author: '老舍'
        },
        {
          id: 2, bookName: '朝花夕拾', author: '鲁迅'
        }
      ]
      // 调用数据处理方法callback  
      if(callback){
        if(callback[Symbol.toStringTag]=== "AsyncFunction"){
          await callback(res) // callback为异步函数时的调用方式
        }else{
          callback(res)
        }
      }
      this.list = res
      // 数据请求成功的页面交互逻辑，显示提示信息之类的
    }
  }
}