<template>
  <div>
    <el-select v-model="val" v-bind="$attrs">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item[labelKey]"
        :value="item[valueKey]"
        v-bind="$attrs"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
    },

    labelKey: {
      type: [String, Number],
      default: 'name'
    },

    valueKey: {
      type: [String, Number],
      default: 'code'
    },

    options: {
      type: [Array, String, Object],
      default: () => {
        return []
      }
    }
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
    }
  }
}
</script>
