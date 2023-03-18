<template>
  <div>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useHotel } from '@/store/hotel';
import { storeToRefs } from 'pinia';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const hotelStore = useHotel();
const { allHotelMap } = storeToRefs(hotelStore);

const description = computed(() => allHotelMap.value[props.id].description || []);
</script>
