<template>
  <div>
    <label :for="label">{{ label }}</label>
    <select
      :id="label"
      class="input"
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      }"
    >
      <!-- JSON.stringify(option.value) === JSON.stringify(modelValue) -->
      <option value="" disabled :selected="!modelValue" class="text-gray bg-white" v-if="defaultOption">
        {{ defaultOption }}
      </option>
      <option
        :value="option.value ? option.value : option.content"
        v-for="(option, i) in options"
        :key="i"
        :selected="modelValue?.toString() === (option.value ? option.value?.toString() : option.content?.toString())"
      >
        <template v-for="content in option.content" :key="content">{{ content }}</template>
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  modelValue: any;
  error?: string;
  options: any[];
  defaultOption?: string;
}

withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  defaultOption: '請選擇'
});

// const stringifyOptions = ref<any[]>([]);

// 若option 的值為object 需換成string type，避免被轉換成[object, object]
// if (props.options.length > 0) {
//   stringifyOptions.value = props.options.map((option: any) =>
//     typeof option === 'object' ? (JSON.stringify(option.value) as string) : (option.value as string)
//   );
// }
</script>
