<template>
  <div>
    <div class="h-screen w-screen bg-white relative z-[100] pt-[6.5rem]">
      <div class="absolute top-0 left-[20%] z-1 h-full">
        <div class="h-full w-[1px] bg-black" v-border></div>
      </div>
      <div class="bg-white relative top-[2rem] left-0 z-10 flex items-center flex-col">
        <div class="h-[1px] w-full bg-black" v-border></div>
        <h2 class="text-[3.4rem] py-[1rem] whitespace-nowrap storke-text">
          <strong>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</strong>
        </h2>
        <div class="h-[0.5px] w-full bg-black" v-border></div>
      </div>
    </div>
    <div
      class="h-screen w-screen relative bg-[#666666] before:content-[''] before:bg-[#666666] before:w-screen before:h-[3rem] before:rotate-1 before:z-100 before:absolute before:top-[-2%] before:left-0"
    >
      <h3
        class="absolute top-[5%] lg:left-[15%] left-[50%] translate-x-[-50%] text-white text-[5rem] whitespace-nowrap"
      >
        熱門飯店
      </h3>
      <h3
        class="absolute bottom-[5%] lg:left-[85%] left-[50%] translate-x-[-50%] text-white text-[5rem] whitespace-nowrap"
      >
        Hot Hotel
      </h3>
      <slider
        :spacing="`ml-[calc(-1*25%*2.5)]`"
        :data="allHotelsData"
        :buttonWidth="'w-[26%]'"
        class="h-[67%] absolute top-[60%] translate-y-[-50%]"
      >
        <template #swiperItem="{ mountedData }">
          <transition-group name="flip-list" tag="div" class="flex w-full items-center h-full">
            <div
              v-for="(hotel, i) in mountedData"
              :key="hotel.id"
              :class="[
                'mr-[24px] flex-hotProducts h-full z-10',
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
                  <img :src="hotel.images[0]" alt="hotelImg" class="w-full h-full" />
                </template>
                <template #body>
                  <h3 :class="['text-[2rem]', i === 4 ? 'text-black' : 'text-white']">{{ hotel.name }}</h3>
                  <p :class="i === 4 ? 'text-black' : 'text-white'">{{ hotel.summary }}</p>
                  <p :class="i === 4 ? 'text-black' : 'text-white'">{{ hotel.ratingAverage }}</p>
                  <p :class="i === 4 ? 'text-black' : 'text-white'">{{ hotel.id }}</p>
                </template>
              </card>
            </div>
          </transition-group>
        </template>
      </slider>
    </div>
    <section class="h-screen w-screen relative">
      <div class="row align-items-center h-100 offset-1 offset-md-3">
        <div class="text-wrap col-10 col-md-5">
          <p>所有飯店</p>
          <p>私人民宿</p>
          <p>機票</p>
          <p>機票 + 酒店</p>
          <p>月租住宿</p>
        </div>
      </div>
      <div class="darkWrap"></div>
    </section>
  </div>
</template>

<script setup>
import { useStore } from '@/store/hotel';
import slider from '@/components/slider/slider';
import card from '@/components/cards';

definePageMeta({
  layout: 'home'
});
const hotProductsData = ref([]);
const getHotHotels = async () => {
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const apiUrl = `${baseUrl}/products/hotProducts`;
  const { data: hotProducts } = await useAsyncData('hotProducts', () => $fetch(apiUrl));
  hotProductsData.value = hotProducts.value.data.data;
};

const allHotelsData = ref([]);
const getAllHotels = async () => {
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const apiUrl = `${baseUrl}/products`;
  const { data: allHotels } = await useAsyncData('allHotels', () => $fetch(apiUrl));
  allHotelsData.value = allHotels.value.data.data;
};

getHotHotels();
getAllHotels();

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

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
