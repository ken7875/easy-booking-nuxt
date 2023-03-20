<template>
  <div class="w-screen overflow-x-hidden">
    <hotCountry />
    <LazyHomePageHotProducts :allHotels="allHotels" v-if="allHotels.length" />
    <allService />
    <LazyHomePageWaterfull :allHotels="allHotels" v-if="allHotels.length" />
  </div>
</template>

<script setup lang="ts">
// // import { useStore } from '~~/store/hotel';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import LazyHotProducts from '~~/components/homePage/HotProducts.vue';
// import LazyWarterFull from '~~/components/homePage/Waterfull.vue';
import hotCountry from '~~/components/homePage/HotCountry.vue';
import allService from '~~/components/homePage/AllService.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const { useHotel } = useStore();
const hotelStore = useHotel();
const { allHotels } = storeToRefs(hotelStore);
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
