<template>
  <div>
     <img :src="data" :style="{width:width,height:height}" v-bind="$attrs">
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: [String,Number],
      default: '50px'
    },
    height: {
      type: [String,Number],
      default: '50px'
    }
  },

  methods: {},

  computed: {}
}
</script>
