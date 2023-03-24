<template>
  <div class="grid grid-cols-4 gap-x-[10px] auto-rows-[150px]">
    <div v-for="(image, i) in hotelImage" :key="i" class="mb-[15px]">
      <img :src="image" alt="image" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotel } from '~~/store/hotel';
import { storeToRefs } from 'pinia';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const hotelStore = useHotel();
const { allHotelMap } = storeToRefs(hotelStore);
const hotelImage = computed(() => allHotelMap.value[props.id]?.images || []);
</script>

<!-- <style lang="scss" scoped>
.allImg {
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-auto-rows: 150px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  .img-wrap {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style> -->
