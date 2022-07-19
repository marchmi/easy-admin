/**
 * 代码校验规则
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
 export function snRule (rule, value, callback) {
    if (!value) {
      callback()
    }
    const reg = /^[A-Za-z0-9-_]+$/
    if (!reg.test(value)) {
      callback(new Error('支持英文、数字、下划线、短横线'))
    } else {
      callback()
    }
  }
  
  /**
   * 名称校验规则
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  export function nameRule (rule, value, callback) {
    if (!value) {
      callback()
    }
    const reg = /^[\u4e00-\u9fa5A-Za-z0-9-_]+$/
    if (!reg.test(value)) {
      callback(new Error('支持中文、数字、下划线、短横线'))
    } else {
      callback()
    }
  }