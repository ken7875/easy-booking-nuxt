<template>
  <div class="h-screen w-screen relative" ref="hotProductsWrapRef">
    <h3
      class="absolute top-[5%] lg:left-[15%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap text-white"
      data-test="hot-product-title-chinese"
    >
      熱門飯店
    </h3>
    <h3
      class="w-fit absolute bottom-[5%] lg:left-[85%] left-[50%] translate-x-[-50%] text-[5rem] whitespace-nowrap text-white"
      data-test="hot-product-title-english"
    >
      Hot Hotel
    </h3>
    <client-only>
      <Slider
        :spacing="`lg:ml-[calc(-25%*2.5)] ml-[calc(-400%+12px)]`"
        :init-data="hotHotelData?.data?.data"
        :button-layout-style="'lg:w-[calc(26%)] w-full top-[50%] left-[50%] lg:translate-x-[calc(-50%-12px)] translate-x-[-50%] translate-y-[-50%]'"
        :slide-item-width="'lg:flex-[25%_0_0] flex-[100%_0_0]'"
        class="h-[67%] absolute top-[55%] translate-y-[-50%]"
        data-test="slider"
      >
        <template v-slot:swiperItem="{ slideItem, index, totalLen, isCenter }">
          <div
            :class="[
              'h-full z-10 w-[calc(100%-24px)] relative',
              { 'invisible z-[-1]': index === 0 || index === totalLen - 1 }
            ]"
            ref="cardWraps"
          >
            <Card
              :class="[
                { 'animate-cardFadeInAnimate': isCenter },
                { 'shadow-xl shadow-black': isCenter },
                { 'opacity-50': !isCenter },
                isCenter
                  ? 'bg-white'
                  : 'before:absolute before:top-0 before:left-0 before:block before:w-full before:h-full before:bg-[#000] before:opacity-[0.4] text-white',
                'duration-300 ease-linear'
              ]"
              data-test="card"
            >
              <template #header>
                <img
                  :src="slideItem.images[0]"
                  alt="hotelImg"
                  :class="['w-full h-[220px] object-cover object-center', { 'text-white': index !== 4 }]"
                />
              </template>
              <template #body>
                <div :class="[index === 4 ? 'text-black' : 'bg-black text-white', 'h-full']">
                  <h3 :class="['text-[2rem]', 'mb-[16px]']">
                    {{ slideItem.name }}
                  </h3>
                  <div class="mb-[16px]" v-if="slideItem.description">
                    <span v-textSlice:[200]="slideItem.description"></span>
                    <span v-if="slideItem.description?.length > 200">...</span>
                  </div>
                  <p :class="[, 'mb-[16px]']">評分: {{ slideItem.ratingAverage }}</p>
                  <p :class="[, 'mb-[16px]']">最低價格: {{ slideItem.price }}</p>
                </div>
              </template>
              <template #footer>
                <div
                  :class="[
                    'border-t border-darkLight w-full absolute bottom-0 p-[10px] flex justify-end',
                    index === 4 ? 'text-black' : 'text-white bg-black'
                  ]"
                >
                  <NuxtLink :to="`/Hotel-${slideItem._id}`" class="button button__outline-primary w-[30%] h-[40px]"
                    >查看房間</NuxtLink
                  >
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Slider>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import Slider from '~~/components/slider/Slider.vue';
import Card from '~~/components/card/index.vue';
import { apiMethods } from '~~/api/index';

const { data: hotHotelData } = await useAsyncData('hotHotel', () => apiMethods.hotel.getHotHotels(), {
  lazy: true
});
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

// defineExpose({
//   hotHotelData
// });
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
