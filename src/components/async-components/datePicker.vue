<template>
  <div>
    <el-date-picker
      v-model="val"
      type="date"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number, Date],
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
