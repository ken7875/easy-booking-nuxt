<template>
  <div class="absolute top-[50%] left-[50%] translate-x-[-53%] translate-y-[-50%] z-50">
    <button @click="change(curIdx - 1)" class="float-left swiper-button">
      <i class="bi bi-dash-circle-fill text-[2.5rem] swiper-icon text-red-500"></i>
    </button>
    <button @click="change(curIdx + 1)" class="float-right swiper-button">
      <i class="bi bi-plus-circle-fill text-[2.5rem] swiper-icon text-red-500"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataLeng: {
    type: Number,
    default: 0,
    require: true
  },
  curIdx: {
    type: Number,
    default: 0,
    require: true
  }
});
const emit = defineEmits<{
  (e: 'changeIdx', idx: number): void;
}>();
const { dataLeng, curIdx } = toRefs(props);

const change = (idx: number) => {
  emit('changeIdx', idx);
};
</script>
