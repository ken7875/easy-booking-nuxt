<template>
  <div class="w-full overflow-x-hidde">
    <nav
      class="nav fixed top-0 left-0 w-full bg-black flex justify-between items-center opacity-0 z-[110] h-[6.5rem] px-5"
    >
      <h2 class="text-[1.5rem] text-white font-[900]">
        <NuxtLink>
          <span class="block text-white">Easy</span>
          <span class="block text-white">Booking</span>
        </NuxtLink>
      </h2>
      <ul class="nav-list hidden md:flex">
        <li>
          <NuxtLink class="text-white font-bold mr-5">註冊</NuxtLink>
        </li>
        <li>
          <NuxtLink class="text-white font-bold mr-5">所有產品</NuxtLink>
        </li>
        <li>
          <NuxtLink class="text-white font-bold mr-5">關於我們</NuxtLink>
        </li>
        <!-- <li v-if="token" @click="menu.toggleMenu = true">
          <img :src="avatar" alt="avatar">
        </li>
        <li v-else>
          <NuxtLink to="/login">會員登入</NuxtLink>
        </li> -->
      </ul>
    </nav>
    <div class="navbar w-full h-screen bg-black mb-[130vh] z-40 overflow-x-hidden">
      <div class="h-full grid grid-cols-8">
        <div class="col-span-3 h-full">
          <h1 class="logo absolute z-20 top-[50%] left-[15%] lg:text-2xl font-bold">
            <p class="text-white">Easy</p>
            <p class="text-white">Booking</p>
          </h1>
        </div>
        <div class="col-span-5 h-full relative">
          <div
            class="content absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[2rem] z-20 w-[70%]"
          >
            <p class="text-white absolute block">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p class="text-white absolute opacity-0 block">
              Quas, dolorum ipsum alias cumque nam fugiat inventore aspernatur.
            </p>
            <p class="text-white absolute opacity-0 block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.dfsonfdlkng dskfjkldfnvo
            </p>
          </div>
        </div>
      </div>
      <World-map class="worldMap absolute top-0 left-0 w-full h-full z-10" />
    </div>
    <main class="overflow-x-hidden">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import worldMap from '@/components/worldMap.vue';

gsap.registerPlugin(ScrollTrigger);
let tl: any = null;
let tl2: any = null;
let tl3: any = null;
const nav = ref(null);
const innerWidth = ref(0);

if (process.client) {
  innerWidth.value = window.innerWidth;
}

const gsapAnimation = () => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.navbar',
      start: '0%',
      end: '200%',
      scrub: 1
    }
  });
  tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.navbar',
      start: '100%',
      end: '180%',
      scrub: 1
    }
  });
  tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: '.navbar',
      start: '0%',
      end: '200%',
      scrub: 1,
      pin: true,
      pinSpacing: false
    }
  });

  tl.to('.content p:first-child', { opacity: 1, duration: 2 });
  tl.to('.content p:first-child', { opacity: 0, duration: 2 });
  tl.to('.content p:nth-child(2)', { opacity: 1, duration: 2 });
  tl.to('.content p:nth-child(2)', { opacity: 0, duration: 2 });
  tl.to('.content p:nth-child(3)', { opacity: 1, duration: 2 });
  tl.to('.content p:nth-child(3)', { opacity: 0, duration: 2 });
  tl.fromTo(
    '.logo',
    { scale: innerWidth.value <= 640 ? 2 : 4 },
    { scale: 1, top: innerWidth.value <= 640 ? 0 : '2%', left: innerWidth.value <= 640 ? 0 : '3%', duration: 3 }
  );
  tl.fromTo('.nav', { opacity: 0 }, { opacity: 1 });
  tl2.fromTo('.worldMap', { opacity: 1 }, { opacity: 0 });
};

// const token = computed(() => store.state.auth.token)

onMounted(() => {
  gsapAnimation();
});

onBeforeUnmount(() => {
  if (tl !== null) {
    tl.scrollTrigger.kill();
    tl2.scrollTrigger.kill();
    tl3.scrollTrigger.kill();
    tl = null;
    tl2 = null;
    tl3 = null;
  }
});
</script>
