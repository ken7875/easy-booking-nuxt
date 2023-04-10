<template>
  <label :for="label">{{ label }}</label>
  <div v-bind="$attrs" class="flex items-center">
    <input
      :value="modelValue"
      :class="['w-full input h-[2.5rem]', { isError: error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      :placeholder="placeholder"
    />
    <Button @click="buttonEvent" v-if="buttonText" class="w-[20%] ml-[15px] h-[2.5rem]" type="button">{{
      buttonText
    }}</Button>
  </div>
  <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>
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
  buttonText?: string;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'buttonEvent']);

const buttonEvent = () => {
  emit('buttonEvent');
};
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
