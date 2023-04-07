<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :class="['w-[25px] h-[25px]', $attrs.class]"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked)"
    />
    <label :for="label" class="ml-2 text-[1.2rem]">{{ label }}</label>
  </div>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: boolean;
  error?: string;
}

defineProps<Props>();
// const { label, modelValue, error } = toRefs(props);
</script>
