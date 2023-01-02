<template>
  <div></div>
  <div v-for="(hotel, i) in allHotels" :key="i">{{ hotel.name }}</div>
</template>

<script setup lang="ts">
import { useHotel } from '@/store/hotel';
import { storeToRefs } from 'pinia';

const hotelStore = useHotel();

const { getAllHotels } = hotelStore;

const { allHotels } = storeToRefs(hotelStore);
await getAllHotels();
console.log(allHotels.value);
</script>
