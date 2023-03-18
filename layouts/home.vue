<template>
  <div class="w-full overflow-x-hidde">
    <header class="nav fixed top-0 left-0 opacity-0 z-[110] w-full">
      <Navbar />
    </header>
    <div class="navbar w-full h-screen bg-black mb-[130vh] z-40 overflow-x-hidden">
      <div class="h-full grid grid-cols-8">
        <div class="lg:col-span-3 col-span-full h-full">
          <h1
            class="logo absolute z-20 lg:top-[50%] lg:left-[15%] lg:translate-x-0 lg:translate-y-0 left-[50%] top-[25%] translate-x-[-50%] translate-y-[-50%] text-2xl font-bold"
          >
            <p class="text-white">Easy</p>
            <p class="text-white">Booking</p>
          </h1>
        </div>
        <div class="lg:col-span-5 col-span-full h-full relative">
          <div
            class="content absolute lg:top-[50%] top-[-5%] left-[50%] translate-y-[-50%] translate-x-[-50%] lg:text-[2rem] text-[1rem] z-20 lg:w-[70%] w-[80%]"
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
      <worldMap class="worldMap absolute top-0 left-0 w-full h-full z-10" />
    </div>
    <main class="overflow-x-hidden">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwinds.css';
import worldMap from '~~/components/WorldMap.vue';
import Navbar from './components/Navbar.vue';

let tl: GSAPTimeline | null = null;
let tl2: GSAPTimeline | null = null;
let tl3: GSAPTimeline | null = null;

const gsapAnimation = () => {
  tl = useScrollAnimation({
    trigger: '.navbar',
    start: '0%',
    end: '200%',
    scrub: 1
  });

  tl2 = useScrollAnimation({
    trigger: '.navbar',
    start: '100%',
    end: '180%',
    scrub: 1
  });

  tl3 = useScrollAnimation({
    trigger: '.navbar',
    start: '0%',
    end: '200%',
    scrub: 1,
    pin: true,
    pinSpacing: false
  });

  const { isMobile, isTablet } = useDevice();

  tl?.to('.content p:first-child', { opacity: 1, duration: 2 });
  tl?.to('.content p:first-child', { opacity: 0, duration: 2 });
  tl?.to('.content p:nth-child(2)', { opacity: 1, duration: 2 });
  tl?.to('.content p:nth-child(2)', { opacity: 0, duration: 2 });
  tl?.to('.content p:nth-child(3)', { opacity: 1, duration: 2 });
  tl?.to('.content p:nth-child(3)', { opacity: 0, duration: 2 });
  tl?.fromTo(
    '.logo',
    { scale: isMobile || isTablet ? 2 : 4 },
    { scale: 1, top: isMobile || isTablet ? 0 : '2%', left: isMobile || isTablet ? '50%' : '3%', duration: 3 }
  );
  tl?.fromTo('.nav', { opacity: 0 }, { opacity: 1 });
  tl2?.fromTo('.worldMap', { opacity: 1 }, { opacity: 0 });
  tl2?.fromTo('.worldMap', { opacity: 1 }, { opacity: 0 });
};

// const token = computed(() => store.state.auth.token)

onMounted(() => {
  gsapAnimation();
});

onBeforeUnmount(() => {
  if (tl !== null) {
    tl?.kill();
    tl2?.kill();
    tl3?.kill();
    tl = null;
    tl2 = null;
    tl3 = null;
  }
});
</script>
