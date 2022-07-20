import { defineStore } from 'pinia'

export const optionsDataStore = defineStore('optionsDataStore', {
  state () {
    return {
      dynamicElementData: {
      } // 查询条件
    }
  },
  getters: {},
  actions: {
    updateDynamicElementData (key, value) {
      this.dynamicElementData[key] = value
    }
  }
})
