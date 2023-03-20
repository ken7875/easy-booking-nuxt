<template>
  <div class="h-screen w-screen relative" ref="hotProductsWrapRef">
    <h3 class="absolute top-[5%] lg:left-[15%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap text-white">
      熱門飯店
    </h3>
    <h3
      class="absolute bottom-[5%] lg:left-[85%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap w-full text-black"
    >
      Hot Hotel
    </h3>
    <slider
      :spacing="`ml-[calc(-1*25%*2.5)]`"
      :data="allHotels"
      :buttonWidth="'w-[26%]'"
      class="h-[67%] absolute top-[60%] translate-y-[-50%]"
    >
      <template #swiperItem="{ mountedData }">
        <transition-group name="flip-list" tag="div" class="flex w-full items-center h-full">
          <div
            v-for="(hotel, i) in mountedData"
            :key="hotel.id"
            :class="[
              'mr-[24px] h-full z-10 flex-hotProducts',
              { 'invisible z-[-1]': i === 0 || i === mountedData.length - 1 }
            ]"
            ref="cardWraps"
          >
            <card
              :class="[
                { 'animate-cardFadeInAnimate': i === 4 },
                { 'shadow-xl shadow-black': i === 4 },
                { 'opacity-50': i !== 4 },
                i === 4 ? 'bg-white' : 'bg-[#212121]',
                'ease-linear',
                'duration-300'
              ]"
            >
              <template #header>
                <img :src="hotel.images[0]" alt="hotelImg" class="w-full h-full object-cover object-center" />
              </template>
              <template #body>
                <h3 :class="['text-[2rem]', i === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">{{ hotel.name }}</h3>
                <p :class="[i === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">{{ hotel.summary }}</p>
                <p :class="[i === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">評分: {{ hotel.ratingAverage }}</p>
                <p :class="[i === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">最低價格: {{ hotel.price }}</p>
                <div class="">
                  <button></button>
                </div>
              </template>
            </card>
          </div>
        </transition-group>
      </template>
    </slider>
  </div>
</template>

<script setup lang="ts">
import slider from '../slider/slider.vue';
import card from '../card/index.vue';
import { Hotel } from '~~/model/hotel';
// import { hotel } from '~~/store/index';
// import { storeToRefs } from 'pinia';

// const hotelStore = hotel();
// const { getAllHotels } = hotelStore;
// await getAllHotels();

interface Props {
  allHotels: Hotel[];
}

const props = defineProps<Props>();
const { allHotels } = toRefs(props);

let hotProductsWrapRef = ref<HTMLElement | null>(null);

let tl: GSAPTimeline | null = null;
const changeBgMode = () => {
  tl = useScrollAnimation({
    trigger: hotProductsWrapRef.value,
    start: '-=20%',
    end: '+=5%',
    scrub: 1
  });
  // tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: hotProductsWrapRef.value,
  //     start: '-=20%',
  //     end: '+=5%',
  //     scrub: 1
  //   }
  // });

  tl?.fromTo(hotProductsWrapRef.value, { backgroundColor: '#FFFFFF' }, { backgroundColor: '#000000', duration: 0.5 });
};

onMounted(() => {
  changeBgMode();
});

onBeforeUnmount(() => {
  tl?.kill();
  tl = null;
});
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
