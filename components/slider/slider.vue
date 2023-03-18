<template>
  <div class="relative">
    <div :class="['flex', 'w-full', 'h-full', 'items-center', spacing, 'swiper-slide']">
      <slot name="swiperItem" :mountedData="mountedData" :curIdx="curIdx"></slot>
      <swiperButton
        :dataLeng="mountedData.length"
        :curIdx="curIdx"
        @changeIdx="change"
        :class="buttonWidth"
      ></swiperButton>
    </div>
  </div>
  <!-- <div>{{ loopData[0] }}</div> -->
</template>

<script setup lang="ts">
import { Hotel } from '@/model/hotel';
import swiperButton from './swiperButton.vue';

const myprops = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  spacing: {
    type: String,
    default: '0'
  },
  buttonWidth: {
    type: String,
    default: '0'
  }
});

// const slots = useSlots();
const { data, spacing, buttonWidth } = toRefs(myprops);
const initData = ref<Hotel[]>([]);
initData.value = data.value as Hotel[];

const loopData = computed(() => {
  const result: Hotel[] = [];
  if (initData.value.length > 0) {
    while (result.length < 9) {
      initData.value.forEach((item: Hotel) => {
        result.push({ ...item });
      });
    }
  }
  return result;
});

const curIdx = ref(0);

const mountedData = computed(() => {
  const prevIdx = curIdx.value - 4;
  const showData = loopData.value.slice(0, prevIdx);
  const result = loopData.value.slice(prevIdx).concat(showData);

  return result;
});

const change = (idx: number) => {
  let limit = mountedData.value.length - 1;
  let newIdx = idx > limit ? 0 : idx < 0 ? mountedData.value.length - 1 : idx;
  curIdx.value = newIdx;
};
</script>
