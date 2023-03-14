<template>
  <div class="input-wrap">
    <label :for="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :class="['input', { isError: error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      :placeholder="placeholder"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { Props } from './types/props';

defineProps<Props<boolean>>();
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

<style lang="scss" scoped>
.input {
  @include input;
  height: 40px;
  width: 100%;
}
.isError {
  border: 1px solid red;
}
</style>
