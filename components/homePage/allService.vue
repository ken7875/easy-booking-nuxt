<template>
  <section class="w-[calc(4000px)] h-[180vh] bg-homeScrollImg relative bg-black" ref="scrollListWrapRef">
    <div
      class="bg-[#E033FF] rounded-[50%] w-[50vw] h-[50vw] blur-[2px] bgBlur absolute translate-x-[50%] translate-y-[25%]"
    ></div>
    <div
      class="flex justify-center w-full lg:h-[350px] absolute top-[30%] left-[-25%] rotate-[15deg] perspective-20 ml-[-24%]"
      ref="cardWrapRef"
    >
      <div
        v-for="(service, idx) in serviceAryLoop"
        :key="idx"
        :class="[
          'lg:w-[400px] lg:h-[350px] p-[16px] transform-3d translate-z-[500px]',
          { '!w-[29rem]': idx === 7 || idx === 5 },
          { '!w-[32rem]': idx === 6 }
        ]"
        :style="{
          transform: `rotateY(${service.rotateY}) translate3d(${service.transform3d})`
        }"
      >
        <Cards :body-height="'h-full'">
          <template #body>
            <div
              :class="[
                service.img,
                'bg-cover bg-center h-full w-full flex items-center px-[20px] relative before:bg-black before:opacity-[0.3] before:absolute before:w-full before:h-full before:top-0 before:left-0'
              ]"
            >
              <div class="static z-10">
                <p class="text-white text-[40px]">{{ service.title }}</p>
                <p class="text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel obcaecati error distinctio labore
                  quibusdam nihil nulla placeat culpa deserunt ad?
                </p>
              </div>
            </div>
          </template>
        </Cards>
      </div>
      <!-- <div class="text-white text-[2.5rem] w-[40%] translate-y-[50%]">
        <p class="border-b-2 border-white mb-[25px] scrollText">所有飯店</p>
        <p class="border-b-2 border-white mb-[25px] scrollText">私人民宿</p>
        <p class="border-b-2 border-white mb-[25px] scrollText">機票</p>
        <p class="border-b-2 border-white mb-[25px] scrollText">機票 + 酒店</p>
        <p class="border-b-2 border-white mb-[25px] scrollText">月租住宿</p>
      </div> -->
    </div>
    <div ref="mask" class="absolute top-0 left-0 w-full h-screen"></div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cards from '@/components/cards.vue';
import { HtmlAttributes } from '@zhead/schema';

const allServiceAry = ref([
  {
    title: '所有飯店',
    img: 'bg-[url("/img/cars.jpg")]',
    rotateY: '20deg',
    transform3d: '0, 0, 300px'
  },
  {
    title: '私人民宿',
    img: 'bg-[url("/img/villa.jpg")]',
    rotateY: '17deg',
    // translateZ: '300px',
    transform3d: '50px, 0, 274px' // 213123123
  },
  {
    title: '機票',
    img: 'bg-[url("/img/airplane.jpg")]',
    rotateY: '6deg',
    // translateZ: '300px',
    transform3d: '105px, 0, 180px'
  },
  {
    title: '機票 + 酒店',
    img: 'bg-[url("/img/airplaneAndHotel.jpg")]',
    rotateY: '-75deg',
    // translateZ: '300px',
    transform3d: '305px, 0, 56px'
  },
  {
    title: '月租住宿',
    img: 'bg-[url("/img/monthlyRend.jpg")]',
    rotateY: '5deg',
    // translateZ: '300px',
    transform3d: '40px, 0, 300px'
  }
]);

const serviceAryLoop = computed(() => allServiceAry.value.concat(allServiceAry.value));

// gsap animation
gsap.registerPlugin(ScrollTrigger);

let tl: GSAPTimeline | null = null;
let tl2: GSAPTimeline | null = null;

const scrollListWrapRef = ref<HTMLElement | null>(null);
const cardWrapRef = ref<HTMLElement | null>(null);

// 卡片水平移動
const cardMoveAnimation = () => {
  tl = gsap.timeline({
    scrollTrigger: {
      // snap: 1 / countryListAry.length,
      start: '-=15%',
      end: '+=150%',
      trigger: scrollListWrapRef.value,
      scrub: 1
    }
  });

  tl.fromTo(cardWrapRef.value, { x: 0 }, { x: -500 });
};

// 卡片3d效果
// let cardListAry = ref<HTMLElement[] | null>(null);

// rotateY(12deg) translateZ(27px) 3
// rotateY(7deg) translateZ(-35px) 4
// rotateY(0deg) translateZ(-55px) 5

// const card3dMove = () => {
//   tl2 = gsap.timeline({
//     scrollTrigger: {
//       start: '-=15%',
//       end: '+=150%',
//       trigger: '',
//       scrub: 1
//     }
//   });

//   // cardListAry.forEach((el) => {
//   //   tl2?.fromTo(el);
//   // });
// };

onMounted(() => {
  cardMoveAnimation();
});

onBeforeUnmount(() => {
  tl?.scrollTrigger?.kill();
  tl = null;
});
</script>
