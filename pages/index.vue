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
// getAsyncComp();
</script>
