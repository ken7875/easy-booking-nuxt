<template>
  <div class="relative">
    <div>
      <label :for="label" :class="{ block: blockLabel }">{{ label }}</label>
      <input
        v-bind="$attrs"
        :value="modelValue"
        :class="['w-full input h-[2.5rem]', { 'border border-red-500': error }]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="error" class="text-red-500 text-[12px] font-bold absolute bottom-[-20px] right-0">{{ error }}</p>
  </div>
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
