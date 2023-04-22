<template>
  <label :for="label" :class="{ block: blockLabel }">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :class="['w-full input h-[2.5rem]', { isError: error }]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    :placeholder="placeholder"
  />
  <p v-if="error" class="text-red-500 font-bold mt-[20px]">{{ error }}</p>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import Button from '../Button.vue';

interface Props {
  label?: string;
  modelValue: string | number;
  error?: string;
  placeholder?: string;
  blockLabel?: boolean;
}

withDefaults(defineProps<Props>(), {
  blockLabel: false
});

// const emit = defineEmits(['update:modelValue', 'buttonEvent']);

// const buttonEvent = () => {
//   emit('buttonEvent');
// };
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
