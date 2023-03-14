<template>
  <div class="input-wrap">
    <label :for="label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :id="label"
      cols="30"
      rows="10"
      class="input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      v-bind="$attrs"
    ></textarea>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { Props } from './types/props';

defineProps<Props<string | number>>();
</script>

<style scoped lang="scss">
.input {
  @include input;
  width: 100%;
}
</style>
