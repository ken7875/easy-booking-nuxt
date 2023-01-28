<template>
  <div class="w-screen overflow-x-hidden">
    <hotCountry />
    <hotProducts v-if="hotProducts" />
    <allService />
    <warterFull v-if="warterFull" />
  </div>
</template>

<script setup lang="ts">
// // import { useStore } from '@/store/hotel';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import hotProducts from '@/components/homePage/hotProducts.vue';
import hotCountry from '~~/components/homePage/hotCountry.vue';
import allService from '~~/components/homePage/allService.vue';
import { hotel } from '@/store/index';

const hotelStore = hotel();
const { getAllHotels } = hotelStore;
const hotProducts = shallowRef();
const warterFull = shallowRef();
const getAsyncComp = async () => {
  await getAllHotels();
  hotProducts.value = defineAsyncComponent(() => {
    return import('@/components/homePage/hotProducts.vue');
  });
  warterFull.value = defineAsyncComponent(async () => {
    return import('@/components/homePage/waterfull.vue');
  });
};

definePageMeta({
  layout: 'home'
});
getAsyncComp();
// gsap.registerPlugin(ScrollTrigger);
// let tl: any = null;
// let tl2: any = null;
// let tl3: any = null;
// const nav = ref(null);
// const innerWidth = ref(0);

// if (process.client) {
//   innerWidth.value = window.innerWidth;
// }

// const scrollListWrap = ref<HTMLElement | null>(null);
// const textWrap = ref<HTMLElement | null>(null);
// const mask = ref<HTMLElement | null>(null);

// let tl4: any = null;
// let phoneScroll = ref<HTMLElement | null>(null);
// let phone = ref<HTMLElement | null>(null);
// let routeButton = ref<HTMLElement | null>(null);
// const phoneScrollAnimation = () => {
//   tl4 = gsap.timeline({
//     scrollTrigger: {
//       start: '0',
//       end: '100%',
//       trigger: phoneScroll.value,
//       scrub: 1,
//       pin: true
//     }
//   });
//   tl4.to(phone.value, { scaleX: 3, scaleY: 3 });
//   tl4.to(phone.value, { scaleX: 1, scaleY: 1 });
//   tl4.fromTo(routeButton.value, { opacity: 0 }, { opacity: 1 });
// };

// onMounted(() => {
//   phoneScrollAnimation();
// });

// onBeforeUnmount(() => {
//   tl.scrollTrigger.kill();
//   tl2.scrollTrigger.kill();
//   tl3.scrollTrigger.kill();
//   tl4.scrollTrigger.kill();
//   tl = null;
//   tl2 = null;
//   tl3 = null;
//   tl4 = null;
// });
// const cardWraps = ref([]);
// watch(allHotelsData, (val) => {
//   nextTick(() => {
//     cardWraps.value.forEach((item) => {
//       cardWraps.value[0].style.visibility = 'hidden';
//       cardWraps.value[cardWraps.value.length - 1].style.visibility = 'hidden';
//     });
//   });
// });
</script>
