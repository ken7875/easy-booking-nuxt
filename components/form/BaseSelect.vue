<template>
  <div>
    <label :for="label">{{ label }}</label>
    <select
      :id="label"
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
        <span v-for="(item, i) in option.content" :key="i">{{ item }}</span>
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { Props } from './types/props';

type SelectProps = Props<string | number> & { options: any[] };
defineProps<SelectProps>();
</script>

<style lang="scss" scoped>
select {
  @include input;
}
</style>
