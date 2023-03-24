<template>
  <div class="w-full">
    <div class="w-full relative">
      <!-- progress bar -->
      <div class="relative h-[6px] bg-[#ddd] w-full">
        <div
          class="absolute top-0 h-full z-[2] rounded-[8px] pointer-events-none bg-secondary"
          :style="{ left: leftLength, right: rightLength }"
        ></div>
      </div>
      <input
        type="range"
        class="absolute top-[50%] translate-y-[-50%] h-full w-full z-[1] bg-transparent pointer-event-none appearance-none min range-slider-thumb pointer-events-none"
        v-model="rangeValue.min"
        min="0"
        max="20000"
        @input="change($event, 'min')"
      />
      <!-- $emit('update:min', Number(($event.target as HTMLInputElement)?.value)); -->
      <!-- v-bind="{
          ...$attrs,
          onInput: ($event) => change($event, 'min')
        }" -->
      <input
        type="range"
        class="absolute top-[50%] translate-y-[-50%] h-full w-full z-[1] bg-transparent pointer-event-none appearance-none max range-slider-thumb pointer-events-none"
        v-model="rangeValue.max"
        min="0"
        max="20000"
        @input="change($event, 'max')"
      />
      <!-- $emit('update:max', Number(($event.target as HTMLInputElement)?.value)); -->
    </div>
    <div class="w-full flex justify-between">
      <input class="mt-[5px] w-[35%] text-center input price" v-model="rangeValue.min" />
      <input class="mt-[5px] w-[35%] text-center input price" v-model="rangeValue.max" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  max: number;
  min: number;
}

const props = defineProps<Props>();

const rangeValue = reactive({
  min: props.min,
  max: props.max
});

const leftLength = ref('0%');
const rightLength = ref('0%');

const lengthCalc = (e: Event, option: 'max' | 'min') => {
  // slider 長度計算
  if (option === 'min') {
    leftLength.value = `${(rangeValue.min / Number((e.target as HTMLInputElement)?.max)) * 100}%`;
  } else {
    rightLength.value = `${100 - (rangeValue.max / Number((e.target as HTMLInputElement)?.max)) * 100}%`;
  }
};

const emit = defineEmits(['updateProducts']);

const gapCalc = (e: Event, option: 'max' | 'min') => {
  // 界線計算
  const gap = 1000; // 範圍的界線
  if (rangeValue.max - rangeValue.min < gap) {
    if (option === 'min') {
      rangeValue.min = rangeValue.max - gap;
    } else {
      rangeValue.max = rangeValue.min + gap;
    }
  }
};

const change = (e: Event, option: 'max' | 'min') => {
  lengthCalc(e, option);
  gapCalc(e, option);
  emit('updateProducts', { min: rangeValue.min * 1, max: rangeValue.max * 1 });
};
</script>

<style scoped>
.range-slider-thumb::-webkit-slider-thumb {
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #007bff;
  pointer-events: auto;
}
</style>
