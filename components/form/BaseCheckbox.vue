<template>
  <div class="checkbox-wrap d-flex align-items-center">
    <input
      type="checkbox"
      class="w-[17px] h-[17px]"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked)"
    />
    <label :for="label" class="ms-2">{{ label }}</label>
  </div>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
import { Props } from './types/props';

defineProps<Props<boolean>>();
// const { label, modelValue, error } = toRefs(props);
</script>
