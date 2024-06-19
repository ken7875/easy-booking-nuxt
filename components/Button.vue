<template>
  <button :class="['button w-[150px] button__primary min-h-[40px]']" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script>
