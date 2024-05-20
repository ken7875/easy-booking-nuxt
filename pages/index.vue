<template>
  <div class="w-full overflow-x-hidden">
    <section>
      <HotCountry />
    </section>
    <section ref="hotProducts">
      <LazyHotProducts v-if="allHotels.length > 0" />
    </section>
    <section ref="allService">
      <LazyAllService v-if="allServiceTargetIsVisible" />
    </section>
    <section>
      <WaterfullViews />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';
import { useIntersectionObserver } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { type Hotel } from '~~/model/hotel';

const { useHotel } = useStore();
const hotelStore = useHotel();
const { getAllHotels } = hotelStore;
const { allHotels } = storeToRefs(hotelStore);

useHead({
  title: 'Easy Booking home page',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Welcome to Easy Booking home page' }
  ]
});

definePageMeta({
  layout: 'home'
});

// await useAsyncData('hotHotel', () => getAllHotels());

await getAllHotels();
const WaterfullViews = defineAsyncComponent(() => import('./home/components/Waterfull.vue'));
const allService = ref(null);
const allServiceTargetIsVisible = ref(false);

const { stop: stopAllServiceListen, resume: resumeAllServiceListen } = useIntersectionObserver(
  allService,
  ([{ isIntersecting }], observerElement) => {
    allServiceTargetIsVisible.value = isIntersecting;
    console.log(allServiceTargetIsVisible.value, 'asasdsda');
    console.log(allService.value, 'observerElement');
  }
  // {
  //   rootMargin: '500px'
  // }
);

watch(allServiceTargetIsVisible, (val) => {
  if (val) {
    stopAllServiceListen();
  } else {
    resumeAllServiceListen();
  }
});
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
