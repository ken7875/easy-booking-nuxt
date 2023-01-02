<template>
  <div>
    <section class="h-screen w-screen bg-white relative z-[100] pt-[6.5rem]">
      <div class="absolute top-0 left-[20%] z-1 h-full">
        <div class="h-full w-[1px] bg-black" v-border></div>
      </div>
      <div class="bg-white relative left-0 z-10 flex items-center flex-col">
        <div class="h-[1px] w-full bg-black" v-border></div>
        <h2 class="text-[3.4rem] py-[1rem] whitespace-nowrap storke-text">
          <strong class="mr-[2rem]">熱門旅遊國家</strong>
          <strong class="mr-[2rem]">熱門旅遊國家</strong>
          <strong class="mr-[2rem]">熱門旅遊國家</strong>
          <strong class="mr-[2rem]">熱門旅遊國家</strong>
          <strong class="mr-[2rem]">熱門旅遊國家</strong>
        </h2>
        <div class="h-[0.5px] w-full bg-black" v-border></div>
      </div>
      <div class="flex h-[calc(100%-6.5rem)] py-[2.5rem]">
        <div class="w-[20%] h-full">
          <ul class="flex flex-col justify-between h-full">
            <li
              class="group hover:scale-[1.2] transition-transform duration-500 text-[2.5rem] px-[3rem] cursor-pointer"
            >
              台灣
              <div
                class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
              ></div>
            </li>
            <li
              class="group hover:scale-[1.2] transition-transform duration-500 text-[2.5rem] px-[3rem] cursor-pointer"
            >
              日本
              <div
                class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
              ></div>
            </li>
            <li
              class="group hover:scale-[1.2] transition-transform duration-500 text-[2.5rem] px-[3rem] cursor-pointer"
            >
              美國
              <div
                class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
              ></div>
            </li>
            <li
              class="group hover:scale-[1.2] transition-transform duration-500 text-[2.5rem] px-[3rem] cursor-pointer"
            >
              韓國
              <div
                class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
              ></div>
            </li>
            <li
              class="group hover:scale-[1.2] transition-transform duration-500 text-[2.5rem] px-[3rem] cursor-pointer"
            >
              法國
              <div
                class="border-t-[1px] border-black scale-[0] group-hover:scale-[1] delay-300 duration-300 origin-left"
              ></div>
            </li>
          </ul>
        </div>
        <div class="w-[80%]"></div>
      </div>
    </section>
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
    <section class="w-screen h-screen bg-homeScrollImg relative" ref="scrollListWrap">
      <div class="flex items-center justify-center w-full h-full" ref="textWrap">
        <div class="text-white text-[2.5rem] w-[40%] translate-y-[50%]">
          <p class="border-b-2 border-white mb-[25px] scrollText">所有飯店</p>
          <p class="border-b-2 border-white mb-[25px] scrollText">私人民宿</p>
          <p class="border-b-2 border-white mb-[25px] scrollText">機票</p>
          <p class="border-b-2 border-white mb-[25px] scrollText">機票 + 酒店</p>
          <p class="border-b-2 border-white mb-[25px] scrollText">月租住宿</p>
        </div>
      </div>
      <div ref="mask" class="absolute top-0 left-0 w-full h-screen"></div>
    </section>
    <section class="h-screen w-screen relative" ref="phoneScroll">
      <div
        class="w-full h-full flex flex-col items-center relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div
          ref="phone"
          class="absolute w-[45%] h-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[3] bg-black rounded-[20px] before:absolute before:top-[50%] before:left-[2%] before:translate-y-[-50%] before:w-[1%] before:h-[15%] before:z-[2] before:bg-[#474E5D] before:rounded-[20px]"
        >
          <div
            class="bg-phoneBg w-[90%] h-[90%] bg-cover absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] flex justify-center items-center"
          >
            <!-- <img src="@/assets/images/taiwan.jpg" alt=""> -->
            <div class="flex flex-col justify-center items-center">
              <h3 class="text-white text-[2.5rem]">
                <strong v-surface>準</strong>
                <strong v-surface>備</strong>
                <strong v-surface>好</strong>
                <strong v-surface>出</strong>
                <strong v-surface>發</strong>
                <strong v-surface>了</strong>
                <strong v-surface>嗎</strong>
              </h3>
              <div ref="routeButton">
                <router-link to="/products" class="">開始旅程</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/img/canada.jpg" alt="" class="bubble left-[5%] sm:left-[9px]" />
      <img src="@/assets/img/taiwan.jpg" alt="" class="bubble top-[65%] left-[12%] md:top-[65%] md:left-[12%]" />
      <img src="@/assets/img/china.jpg" alt="" class="bubble top-[18%] right-[5%] md:top-[37%] md:right-[5%]" />
      <img src="@/assets/img/korea.jpg" alt="" class="bubble bottom-[5%] right-[10%] md:bottom-[8%] md:right-[10%]" />
    </section>
  </div>
</template>

<script setup lang="ts">
// import { useStore } from '@/store/hotel';
import slider from '@/components/slider/slider.vue';
import card from '@/components/cards.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hotel } from '@/store/hotel.js';

definePageMeta({
  layout: 'home'
});
const hotProductsData = ref<Hotel[]>([]);
const getHotHotels = async () => {
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const apiUrl = `${baseUrl}/products/hotProducts`;
  const { data: hotProducts } = (await useAsyncData('hotProducts', () => $fetch(apiUrl))) as any;
  hotProductsData.value = hotProducts.value.data.data;
};

const allHotelsData = ref([]);
const getAllHotels = async () => {
  const runtimeConfig = useRuntimeConfig();
  const { baseUrl } = runtimeConfig.public;
  const apiUrl = `${baseUrl}/products`;
  const { data: allHotels } = (await useAsyncData('allHotels', () => $fetch(apiUrl))) as any;
  allHotelsData.value = allHotels.value.data.data;
};

getHotHotels();
getAllHotels();

gsap.registerPlugin(ScrollTrigger);
let tl: any = null;
let tl2: any = null;
let tl3: any = null;
const nav = ref(null);
const innerWidth = ref(0);

if (process.client) {
  innerWidth.value = window.innerWidth;
}

const scrollListWrap = ref<HTMLElement | null>(null);
const textWrap = ref<HTMLElement | null>(null);
const mask = ref<HTMLElement | null>(null);
const scrollTextAnimation = () => {
  const end = innerWidth.value <= 640 ? '100%' : '200%';
  console.log(innerWidth, end, 'asdasdasdasd');

  tl = gsap.timeline({
    scrollTrigger: {
      start: '0',
      end: end,
      trigger: scrollListWrap.value,
      scrub: 1
    }
  });
  tl2 = gsap.timeline({
    scrollTrigger: {
      start: '0',
      end: end,
      trigger: scrollListWrap.value,
      scrub: 1
    }
  });
  tl3 = gsap.timeline({
    scrollTrigger: {
      start: '0',
      end: end,
      trigger: scrollListWrap.value,
      scrub: 1,
      pin: true
    }
  });

  const textArr = gsap.utils.toArray('.scrollText');
  // console.log(scrollListWrap.value);
  tl.to(mask.value, { backgroundColor: 'rgba(0, 0, 0, 0.3)' }, '<');
  tl.to(textWrap.value, { y: -130, duration: 5 });
  tl.to(mask.value, { opacity: 0 }, '+=100%');

  textArr.forEach((text) => {
    tl2.fromTo(text, { fontSize: '2.5rem', duration: 2 }, { fontSize: '3.125rem', duration: 2 });
    tl2.to(text, { fontSize: '2.5rem', duration: 2 }, '+=50');
  });
};

let tl4: any = null;
let phoneScroll = ref<HTMLElement | null>(null);
let phone = ref<HTMLElement | null>(null);
let routeButton = ref<HTMLElement | null>(null);
const phoneScrollAnimation = () => {
  tl4 = gsap.timeline({
    scrollTrigger: {
      start: '0',
      end: '100%',
      trigger: phoneScroll.value,
      scrub: 1,
      pin: true
    }
  });
  tl4.to(phone.value, { scaleX: 3, scaleY: 3 });
  tl4.to(phone.value, { scaleX: 1, scaleY: 1 });
  tl4.fromTo(routeButton.value, { opacity: 0 }, { opacity: 1 });
};

onMounted(() => {
  scrollTextAnimation();
  phoneScrollAnimation();
});

onBeforeUnmount(() => {
  tl.scrollTrigger.kill();
  tl2.scrollTrigger.kill();
  tl3.scrollTrigger.kill();
  tl4.scrollTrigger.kill();
  tl = null;
  tl2 = null;
  tl3 = null;
  tl4 = null;
});
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
