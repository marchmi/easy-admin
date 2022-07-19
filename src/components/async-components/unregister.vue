<template>
  <div>
    <span class="warning">视图未实现</span>
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
}
</script>
<style>
  .warning{
    color: coral;
  }
</style>
