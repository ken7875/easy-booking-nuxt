<template>
  <button :class="['button, w-[150px] button__primary']" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script>
