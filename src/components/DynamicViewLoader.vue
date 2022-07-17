<template>
  <div>
    <component
      :is="renderView"
      v-bind="$attrs"
      v-model:data="val"
    />
  </div>
</template>
<script>
import Input from './async-components/input'
import Textarea from './async-components/textarea'
import Select from './async-components/select'
import Checkbox from './async-components/checkbox'
import UnRegister from './async-components/unregister.vue'
export default {
  name: 'DynamicViewLoader',
  props: {
    data: {
      type: [Array, String, Number, Boolean, Object, Date],
      default: () => null
    },
    type: {
      type: String,
      default: 'input'
    }
  },
  setup () {
    const rtn = {
      components: {
        input: Input,
        textarea: Textarea,
        select: Select,
        checkbox: Checkbox,
        unRegister:UnRegister
      }
    }
    return rtn
  },
  methods: {},
  computed: {
    val: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('update:data', value)
      }
    },
    renderView () {
    //   return () => import(`${this.path}`)
      return this.components[this.type] || this.components['unRegister']
    }
  }
}
</script>
