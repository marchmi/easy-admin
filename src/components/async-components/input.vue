<template>
  <div>
     <el-input v-model="val" v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
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
