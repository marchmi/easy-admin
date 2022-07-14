<template>
  <div>
    <component
      :is="renderView"
      v-bind="$attrs"
      :data.sync="val"
    />
  </div>
</template>
<script>
export default {
  name: "AsyncViewLoader",
  props: {
    data: {
      type: [Array, String, Number, Boolean, Object, Date],
      default: () => null,
    },
    path: {
      type: String,
      default: "./async-components/input",
    },
  },
  methods: {},
  computed: {
    val: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit("update:data", value);
      },
    },
    renderView() {
      return () => import(`${this.path}`);
    },
  },
};
</script>