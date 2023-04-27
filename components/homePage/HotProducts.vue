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
      :spacing="`lg:ml-[calc(-25%*2.5)] ml-[calc(-400%+12px)]`"
      :data="hotHotelData?.data?.data"
      :buttonWidth="'lg:w-[calc(26%)] w-full'"
      :buttonPosition="'top-[50%] left-[50%] lg:translate-x-[calc(-50%-12px)] translate-x-[-50%] translate-y-[-50%]'"
      :slide-item-width="'lg:flex-[25%_0_0] flex-[100%_0_0]'"
      class="h-[67%] absolute top-[60%] translate-y-[-50%]"
      @change="sliderChange"
    >
      <template v-slot:swiperItem="{ slideItem, index, totalLen }">
        <div
          :class="[
            'h-full z-10 w-[calc(100%-24px)] relative',
            { 'invisible z-[-1]': index === 0 || index === totalLen - 1 }
          ]"
          ref="cardWraps"
        >
          <card
            :key="isSliderChange"
            :class="[
              { 'animate-cardFadeInAnimate': index === 4 },
              { 'shadow-xl shadow-black': index === 4 },
              { 'opacity-50': index !== 4 },
              index === 4 ? 'bg-white' : 'bg-[#212121]',
              'duration-300 ease-linear'
            ]"
          >
            <template #header>
              <img :src="slideItem.images[0]" alt="hotelImg" class="w-full h-[220px] object-cover object-center" />
            </template>
            <template #body>
              <h3 :class="['text-[2rem]', index === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">
                {{ slideItem.name }}
              </h3>
              <p :class="[index === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">{{ slideItem.summary }}</p>
              <p :class="[index === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">
                評分: {{ slideItem.ratingAverage }}
              </p>
              <p :class="[index === 4 ? 'text-black' : 'text-white', 'mb-[16px]']">最低價格: {{ slideItem.price }}</p>
            </template>
            <template #footer>
              <div class="border-t border-darkLight w-full absolute bottom-0 p-[10px] flex justify-end">
                <NuxtLink :to="`/Hotel-${slideItem._id}`" class="button button__outline-primary w-[30%]"
                  >查看房間</NuxtLink
                >
              </div>
            </template>
          </card>
        </div>
      </template>
    </slider>
  </div>
</template>

<script setup lang="ts">
import slider from '../slider/Slider.vue';
import card from '../card/index.vue';
import { getHotHotels } from '~~/api/hotel';
import { Hotel } from '~~/model/hotel';

const {
  data: hotHotelData,
  pending,
  error
} = await useAsyncData('hotHotel', () => getHotHotels<Hotel[]>(), {
  lazy: true
});

// console.log(hotHotelData.value?.data.data);

const isSliderChange = ref(0);
const sliderChange = () => {
  isSliderChange.value++;
};

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

<style>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
