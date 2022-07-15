<template>
  <div>
    <el-checkbox-group  v-model="val" v-bind="$attrs">
      <el-checkbox
        v-for="item in options"
        :key="item[labelKey]"
        :label="item[valueKey]">{{item[labelKey]}}</el-checkbox>
    </el-checkbox-group>
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
      type: [Array, String],
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
