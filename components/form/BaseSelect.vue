<template>
  <label :for="label">{{ label }}</label>
  <select
    :id="label"
    class="input"
    :value="modelValue"
    v-bind="{
        ...$attrs,
        onInput: ($event) => $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      }"
  >
    <option value="" disabled :selected="!modelValue" class="text-gray bg-white" v-if="defaultOption">
      {{ defaultOption }}
    </option>
    <option
      :value="option.value?.toString() ? option.value : option.content"
      v-for="(option, i) in options"
      :key="i"
      :selected="modelValue?.toString() === (option.value ? option.value?.toString() : option.content?.toString())"
    >
      <template v-for="content in option.content" :key="content">{{ content }}</template>
    </option>
  </select>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: any;
  error?: string;
  options: any[];
  defaultOption?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  error: ''
});
</script>
