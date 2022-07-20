/**
 * author: zhoushiming
 * createTime: 2022-07-15 15:53:01
 */
 import { optionsDataStore } from '@/store/optionsDataStore'
 const optionsStore = optionsDataStore()

export class VariablesUtil {
  isNumber (num) {
    return typeof num === 'number'
  }

  isString (str) {
    return typeof str === 'string'
  }

  isBoolean (bool) {
    return typeof bool === 'boolean'
  }

  isUndefined (und) {
    return typeof und === 'undefined'
  }

  isBigint (num) {
    return typeof num === 'bigint'
  }

  isSymbol (sym) {
    return typeof sym === 'symbol'
  }

  isFunction (fn) {
    return typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]'
  }

  isNull (n) {
    return Object.prototype.toString.call(n) === '[object Null]'
  }

  isObject (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }

  isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}

const variablesUtil = new VariablesUtil()

export class ViewController {
    moduleName = ''
    pageName = ''
    fields = {}
    config = {}
    views = {}
    attrs = {}
    events = {}
    constructor (moduleName, configMap = {}, pageName = undefined) {
      this.moduleName = moduleName
      this.pageName = variablesUtil.isUndefined(pageName) ? moduleName : pageName
      this.fields = configMap[moduleName].fields
      this.config = variablesUtil.isUndefined(configMap[moduleName][pageName]) ? {} : configMap[moduleName][pageName]
      this.views = this.config.views || {}
      this.attrs = this.config.attrs || {}
      this.events = this.config.events || {}
    }

    /**
     * 用于为vue的data实例初始化属性
     * @param {对象} rtn
     * @returns
     */
    bindAttrToInstance (rtn) {
      rtn.moduleName = this.moduleName
      rtn.pageName = this.pageName
      rtn.fields = this.fields
      rtn.config = this.config
      rtn.views = this.views
      rtn.attrs = this.attrs // 记录配置文件中的attrs信息
      rtn.events = this.events // 记录配置文件中的events信息
      rtn.dynamicElementData = {} // 用于记录动态获取的选项数据，通过接口或者方法获取的动态选项数据和从配置文件中获取的静态选项数据,原始选项数据
      rtn.optionData = {} // 选项数据，从dynamicElementData映射选项数据过来，可以基于dynamicElementData写一些option数据动态变化的逻辑
      return rtn
    }

    /**
     * 从选项配置文件中获取当前页面相关的选项数据 在vue实例中通过call调用
     * @param {*} pageName 
     * @param {选项配置表} optionMap 
     * @param {当前所需选项配置表} mergeConfig {type|options:用来表明一些字段需要从选项配置表中拉取数据，active:可能存在一个属性有多个配置项,只取一部分，或者选项的顺序需要变化}
     */
    getStaticOptionDataToDynamicElementData(pageName,optionMap={},mergeConfig={}){
      const { dynamicElementData , optionData , fields , views } = this
      const currPageOptions = optionMap[pageName]
      const merges = variablesUtil.isObject(mergeConfig)?mergeConfig:(views[mergeConfig]||{})
      console.log(fields)
      // 往dynamicElementData写入数据时也需要向optionData中写入数据
      Object.keys(fields).map(name=>{
        let mergeFieldAttrs = {...Object.assign(fields[name],merges[name]||{})}
        if(mergeFieldAttrs.type==='select'||mergeFieldAttrs.options){
          // 向dynamicElementData写入数据,忽略
          if(mergeConfig._sys){
            dynamicElementData[name] = optionMap[_sys][name]||{}
          }else{
            dynamicElementData[name] = currPageOptions[name]||{}
          }
          // 生成最终的选项数据
          optionData[name] = []
          Object.keys(dynamicElementData[name]).forEach(key=>{
            if(!mergeFieldAttrs.active){
              optionData[name].push({name:dynamicElementData[name][key],code:key})
            }else if(mergeFieldAttrs.active.includes(key)){
              optionData[name].push({name:dynamicElementData[name][key],code:key})
            }
          })
        }
      })
    }

    /**
     * 获取视图的字段配置项信息
     * @param {视图中需要展示的字段名称  值为String类型时，从views配置中取值生成配置信息 值为Array类型时，直接用该值生成配置信息} _viewFieldsList
     * @param {视图中需要展示的字段的额外配置属性 值为String类型时，从view视图中取值  值为Object类型时，直接使用该值处理视图的额外属性} _viewFieldsAttr
     * @returns
     */
    getViewFieldsConfig (_viewFieldsList = 'tableFields', _viewFieldsAttr = 'tableFieldsAttr') {
      const { views, fields } = this
      const viewFields = variablesUtil.isArray(_viewFieldsList) ? _viewFieldsList : (views[_viewFieldsList] || [])
      const fieldsAttrs = variablesUtil.isObject(_viewFieldsAttr) ? _viewFieldsAttr : (views[_viewFieldsAttr] || {})
      const rtn = viewFields.map(fieldName => {
        // 从fields配置中获取到的字段配置信息 ，如poster: { type: 'imageUploader', label: '上传轮播图' } 这是编写的基础配置信息,表示用该字段在form中的视图是一个图片上传控件
        const fieldConfig = {...(fields[fieldName] || {})}
        // 针对table中有特殊展示需求的字段配置信息，如poster: { label: '轮播图' , slot: 'image' } 一般table中默认展示文本，这里需要使用image控件展示数据，切label变更为轮播图
        const assignConfig = {...(fieldsAttrs[fieldName] || {})}
        return {...Object.assign(fieldConfig, assignConfig, {name:fieldName})} // {type: 'imageUploader', label: '轮播图' , slot: 'image'} // 最终生成一个在table中展示时需要的有效配置信息对象
      })

      return rtn
    }

    /**
     * 获取字段对应视图元素需要的一些属性
     * @param {String|Array} _viewFieldsList 
     * @param {String|undefined|Object} _viewFieldsAttr 
     * @returns 
     */
    getFieldsAttrs(_viewFieldsList = 'filterFields', _viewFieldsAttr = undefined){
      const { views, fields , attrs } = this
      const viewFields = variablesUtil.isArray(_viewFieldsList) ? _viewFieldsList : (views[_viewFieldsList] || [])
      const fieldsAttrs = variablesUtil.isObject(_viewFieldsAttr) ? _viewFieldsAttr : (variablesUtil.isUndefined(_viewFieldsAttr) ? attrs : attrs[_viewFieldsAttr])
      const rtn = {}
      viewFields.forEach(fieldName => {
        const fieldConfig = fields[fieldName] || {}
        const assignConfig = fieldsAttrs[fieldName] || {}
        rtn[fieldName] = {...Object.assign(fieldConfig, assignConfig)}
        delete rtn[fieldName].type
        delete rtn[fieldName].label
      })
      return rtn
    }

     /**
     * 获取字段对应视图元素需要的一些事件信息
     * @param {String|Array} _viewFieldsList 
     * @param {String|undefined|Object} _viewFieldsAttr 
     * @returns 
     */
      getFieldsEvents(_viewFieldsList = 'filterFields', _viewFieldsEvent = undefined){
        const { views , events } = this
        const viewFields = variablesUtil.isArray(_viewFieldsList) ? _viewFieldsList : (views[_viewFieldsList] || [])
        const fieldsEvents = variablesUtil.isObject(_viewFieldsEvent) ? _viewFieldsEvent : (variablesUtil.isUndefined(_viewFieldsEvent) ? events : events[_viewFieldsEvent])
        const rtn = {}
        viewFields.forEach(fieldName => {
          rtn[fieldName] = {}
          const eventConfig = fieldsEvents[fieldName] || {}
          Object.keys(eventConfig).forEach(eventName=>{
            rtn[fieldName][eventName] = this[eventConfig[eventName]]
          })
        })
        return rtn
      }
    
    /**
     * 在vue的实例中通过call调用
     * 处理动态获取的选项数据
     * @param {需要动态获取选项数据的字段集合} _optionNameArr
     * @param {参数集合对象，传递给实例中定义的方法} _options
     */
     fetchDynamicData (_optionNameArr = [], _options = {}) {
      const { config } = this
      const { dynamicElementDataFetches } = config
      // eslint-disable-next-line array-callback-return
      _optionNameArr.map(option => {
        if (dynamicElementDataFetches[option]) {
          const { interPath, dataHandler, storeState } = dynamicElementDataFetches[option]
          const optionsData = optionsStore.dynamicElementData[option]
          if (storeState && optionsData) { // 处理在vuex中存值的选项数据,已经有值了就
            this.dynamicElementData[option] = optionsData
            return null
          }
          if (interPath) {
            // handleFetchData(option, interPath)
          } else if (dataHandler) {
            this[dataHandler]?this[dataHandler]({ ..._options, storeState }):console.log(`未定义获取选项数据的方法${dataHandler}`)
          }
        } else {
          console.log(`没有字段${option}的选项数据获取配置`)
        }
      })
    }

    /**
     * 在vue实例中通过call调用 根据配置信息生成校验规则
     * @param {String：用于指定字段集合在配置中的配置项名称 || Array：为字段集合列表} _fieldsName
     * @param {Object：指定不使用默认规则时，字段值为空时的提示语句 {fieldName：提示语句}} _fieldRequiredNotice
     * @param {String：使用哪一个配置项赋值校验规则,默认用于从fields配置项的对应字段中读取校验规则，rulesInField为false时则用config中的对应配置获取校验规则} _rules
     * @param {Boolean：是否从fields对应字段配置中获取校验规则，默认为true} rulesInField
     * @returns
     */
    getFieldsRules (_fieldsName, _fieldRequiredNotice = {}, _rules = 'rules', rulesInField = true) {
      const { fields, views } = this // 字段配置项 视图配置项
      const rules = {}
      // 需要添加校验规则的字段列表，直接传入或者
      const addRuleFields = variablesUtil.isArray(_fieldsName) ? _fieldsName : views[_fieldsName]
      if (rulesInField) { // 用字段配置项中配置的校验规则列表初始化字段的校验规则
        addRuleFields.forEach(fieldName => {
          const fieldRules = []
          rules[fieldName] = fieldRules
          const fieldRulesName = fields[fieldName][_rules] || []
          fieldRulesName.forEach(r => {
            if (r === 'required') {
              fieldRules.push({
                required: true,
                message: _fieldRequiredNotice[fieldName] ? _fieldRequiredNotice[fieldName] : `${fields[fieldName].type === 'input' ? '请填写' : '请选择'}${fields[fieldName].label}`,
                trigger: `${fields[fieldName].type === 'input' ? 'blur' : 'change'}`
              })
            } else {
              fieldRules.push(this.mixinRules[r])
            }
          })
        })
      } else { // 用config配置项中的配置信息初始化校验规则
        const fieldsRules = this.config[_rules] || {}
        addRuleFields.forEach(fieldName => {
          const fieldRules = []
          rules[fieldName] = fieldRules
          const fieldRulesName = fieldsRules[fieldName] || []
          fieldRulesName.forEach(r => {
            if (r === 'required') {
              fieldRules.push({
                required: true,
                message: _fieldRequiredNotice[fieldName] ? _fieldRequiredNotice[fieldName] : `${fields[fieldName].type === 'input' ? '请填写' : '请选择'}${fields[fieldName].label}`,
                trigger: `${fields[fieldName].type === 'input' ? 'blur' : 'change'}`
              })
            } else {
              fieldRules.push(this.mixinRules[r])
            }
          })
        })
      }
      return rules
    }
}

/**
 * 格式化数据
 * @param {数据集合，在table中时为scope.row,在表单中时为详情信息} row 
 * @param {字段信息} field 
 * @returns 
 */
export function formatValue(row,field){
  if(!field.filter){
    return row[field.name]
  }
  return this[field.filter] ? this[field.filter](row[field.name],row) : '-'
}