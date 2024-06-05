<template>
  <div class="relative">
    <div :class="['w-full h-full', spacing]">
      <template v-if="mountedData.length > 0">
        <transition-group name="flip-list" tag="div" class="flex w-full h-full">
          <div
            v-for="(item, index) in mountedData"
            :key="item.id"
            :class="[{ invisible: index === 0 || index === mountedData.length - 1 }, slideItemWidth, gap]"
            data-test="slider-cards"
          >
            <slot name="swiperItem" :slideItem="{ ...item }" :index="index" :isCenter="index === 4" :totalLen="mountedData.length"></slot>
          </div>
        </transition-group>
      </template>
      <template v-else>
        <p data-test="no-data-text">{{ noDataText }}</p>
      </template>
      <!-- button -->
      <div :class="['absolute z-50 flex justify-between', buttonLayoutStyle]" v-if="mountedData.length > 0">
        <button @click="change(curIdx - 1)" data-test="prev-button">
          <client-only>
            <font-awesome-icon
              :icon="['fas', 'circle-chevron-left']"
              class="lg:text-[2.5rem] text-[2rem] swiper-icon text-red-500"
            ></font-awesome-icon>
          </client-only>
        </button>
        <button @click="change(curIdx + 1)" data-test="next-button">
          <client-only>
            <font-awesome-icon
              :icon="['fas', 'circle-chevron-right']"
              class="lg:text-[2.5rem] text-[2rem] swiper-icon text-red-500"
            ></font-awesome-icon>
          </client-only>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const myprops = defineProps({
  initData: {
    type: Array,
    default: () => []
  },
  spacing: {
    type: String,
    default: '0'
  },
  buttonLayoutStyle: {
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
  noDataText: {
    type: String,
    default: '暫無資料'
  }
});

const emit = defineEmits<{
  (e: 'change'): void;
}>();

// const slots = useSlots();
const { initData, spacing, buttonLayoutStyle } = toRefs(myprops);

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

defineExpose({
  myprops,
  mountedData,
  loopData,
  initData,
  curIdx
})
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
