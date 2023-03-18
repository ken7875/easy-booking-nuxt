<template>
  <button :class="[bgColor, textColor, 'rounded-[8px]']">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  bgColor: { type: String, default: 'bg-primary' },
  width: { type: String, default: 'w-[150px]' },
  textColor: { type: String, default: 'text-white' }
});

// const { bgColor, width, textColor } = toRefs(props);
</script>
