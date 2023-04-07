<template>
  <button :class="[bgColor, textColor, 'button']">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  bgColor: { type: String, default: 'button__primary' },
  width: { type: String, default: 'w-[150px]' },
  textColor: { type: String, default: '' }
});

// const { bgColor, width, textColor } = toRefs(props);
</script>
