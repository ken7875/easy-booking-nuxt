<template>
  <div :class="['absolute z-50', buttonPosition]">
    <button @click="change(curIdx - 1)" class="float-left swiper-button">
      <client-only>
        <font-awesome-icon
          :icon="['fas', 'circle-chevron-left']"
          class="lg:text-[2.5rem] text-[2rem] swiper-icon text-red-500"
        ></font-awesome-icon>
      </client-only>
    </button>
    <button @click="change(curIdx + 1)" class="float-right swiper-button">
      <client-only>
        <font-awesome-icon
          :icon="['fas', 'circle-chevron-right']"
          class="lg:text-[2.5rem] text-[2rem] swiper-icon text-red-500"
        ></font-awesome-icon>
      </client-only>
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
  },
  buttonPosition: {
    type: String,
    default: '',
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
