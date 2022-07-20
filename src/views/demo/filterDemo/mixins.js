import { optionsDataStore } from '@/store/optionsDataStore'
const optionsStore = optionsDataStore()
export default {
    methods: {
      handleGetCategoriesOptionsData(_options={}){
        this.dynamicElementData.categories = {
          1:'人文社科',
          2:'建筑施工'
        }
        if (_options.storeState) {
          optionsStore.updateDynamicElementData('categories', this.dynamicElementData.categories)
        }
      }
    }
  }
  