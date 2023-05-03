<template>
  <div class="w-screen overflow-x-hidden">
    <hotCountry />
    <HotProducts />
    <allService />
    <LazyHomePageWaterfull />
  </div>
</template>

<script setup lang="ts">
// // import { useStore } from '~~/store/hotel';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HotProducts from '~~/components/homePage/HotProducts.vue';
// import LazyWarterFull from '~~/components/homePage/Waterfull.vue';
import hotCountry from '~~/components/homePage/HotCountry.vue';
import allService from '~~/components/homePage/AllService.vue';
// const { getAllHotels } = hotelStore;

// const getAsyncComp = async () => {
//   await getAllHotels();
//   hotProducts.value = defineAsyncComponent(() => {
//     return import('~~/components/homePage/HotProducts.vue');
//   });
//   warterFull.value = defineAsyncComponent(async () => {
//     return import('~~/components/homePage/Waterfull.vue');
//   });
// };

definePageMeta({
  layout: 'home'
});

useHead({
  title: 'Easy Booking home page',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Welcome to Easy Booking home page' }
  ]
});
// getAsyncComp();
</script>
