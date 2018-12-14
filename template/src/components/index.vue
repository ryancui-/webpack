<template>
  <div class="{{ name }}">
    <span>Matrix Custom Component</span>
  </div>
</template>

<script>

export default {
  name: '{{ name }}',
  methods: {
    // 外面筛选器改变时调用此方法
    /* eslint-disable no-unused-vars */
    initCustomFilterParams(params) {

    },
    // 内部筛选器改变时发射事件
    emitCustomFilterParams(params) {
      this.$emit('emitCustomFilterParams', params)
    }
  }
}
</script>

<style lang="less">
  .{{ name }} {
    height: 100%;
    overflow: auto;
  }
</style>
