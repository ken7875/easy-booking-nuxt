<template>
  <div class="relative">
    <!-- spacing -->
    <div :class="['w-full h-full', spacing]">
      <transition-group name="flip-list" tag="div" class="flex w-full h-full">
        <div
          v-for="(item, index) in mountedData"
          :key="item.id"
          :class="[{ invisible: index === 0 || index === mountedData.length - 1 }, slideItemWidth, gap]"
        >
          <slot name="swiperItem" :slideItem="{ ...item }" :index="index" :totalLen="mountedData.length"></slot>
        </div>
      </transition-group>
      <swiperButton
        :dataLeng="mountedData.length"
        :curIdx="curIdx"
        @changeIdx="change"
        :class="buttonWidth"
        :buttonPosition="buttonPosition"
      ></swiperButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from '~~/model/hotel';
import swiperButton from './SwiperButton.vue';

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
  },
  dataLeng: {
    type: Number,
    default: 0,
    require: true
  },
  slideItemWidth: {
    type: String,
    default: ''
  },
  gap: {
    type: String,
    default: ''
  },
  buttonPosition: {
    type: String,
    default: '',
    require: true
  }
});

// const slots = useSlots();
const { data, spacing, buttonWidth } = toRefs(myprops);

const initData = ref<any[]>([]);
initData.value = data.value as any[];

const loopData = computed(() => {
  const result: any[] = [];
  // 每個slider的id，讓transition-group能運作
  let number = 0;
  if (initData.value.length > 0) {
    while (result.length < 9) {
      initData.value.forEach((item: any) => {
        number++;
        if (typeof item === 'object') {
          result.push({ ...item, id: number });
        } else {
          result.push({ item, id: number });
        }
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
  emit('change');
};

const emit = defineEmits<{
  (e: 'change'): void;
}>();
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
