<template>
  <label :for="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :class="['input', { isError: error }]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    :placeholder="placeholder"
  />
  <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: string | number;
  error?: string;
  placeholder?: string;
}

defineProps<Props>();
// import BaseErrorMsg from './BaseErrorMsg';
// export default {
//   inheritAttrs: false,
//   components: {
//     BaseErrorMsg
//   },
//   props: {
//     label: {
//       type: String
//     },
//     modelValue: {
//       type: [String, Number]
//     },
//     placeholder: String,
//     error: {
//       type: String,
//       default: ''
//     }
//   }
// };
</script>
