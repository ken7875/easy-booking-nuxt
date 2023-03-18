<template>
  <div class="radio-wrap">
    <input
      type="radio"
      :id="label"
      :checked="modelValue === value"
      :value="value"
      v-bind="$attrs"
      @change="$emit('update:modelValue', value)"
    />
    <label :for="label" v-if="label">{{ label }}</label>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: string | number | boolean;
  error?: string;
  placeholder?: string;
  options: any[];
  value: string | number | boolean;
}

defineProps<Props>();

// export default {
//   components: {
//     BaseErrorMsg
//   },
//   props: {
//     label: {
//       type: String,
//       required: true,
//       default: ''
//     },
//     modelValue: {
//       type: [Boolean, String, Number],
//       required: true
//     },
//     value: {
//       type: [Boolean, String, Number],
//       required: true
//     },
//     error: {
//       type: String,
//       default: ''
//     }
//   }
// };
</script>

<style scoped>
.radio-wrap {
  display: inline-block;
  margin-right: 15px;
}
</style>
