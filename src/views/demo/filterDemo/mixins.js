import { optionsDataStore } from '@/store/optionsDataStore'
const optionsStore = optionsDataStore()
export default {
    methods: {
      handleGetCategoriesOptionsData(_options={}){
        const res = [
          { code: 1 , name: '人文社科'},
          { code: 2 , name: '建筑施工'}
        ]
        this.dynamicElementData.categories = res
        this.optionData.categories = res
        if (_options.storeState) {
          optionsStore.updateDynamicElementData('categories', this.dynamicElementData.categories)
        }
      }
    }
  }
  