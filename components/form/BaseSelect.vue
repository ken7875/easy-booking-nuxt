<template>
  <div>
    <label :for="label">{{ label }}</label>
    <select
      :id="label"
      class="input"
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', ($event.target as HTMLInputElement)?.value);
        }
      }"
    >
      <option
        :value="option.content ? option.value : option.content"
        v-for="(option, i) in options"
        :key="i"
        :selected="option.value === modelValue"
      >
        <template v-for="(item, i) in option.content" :key="i">{{ item }}</template>
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: string | number;
  error?: string;
  placeholder?: string;
  options: any[];
}

withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  placeholder: ''
});
</script>

<!-- <style lang="scss" scoped>
select {
  @include input;
}
</style> -->
