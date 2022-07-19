<template>
  <div>
      <el-input
          maxlength="100"
          show-word-limit
          resize="none"
          type="textarea"
          v-model="val"
          v-bind="$attrs"
        />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
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
