<template>
  <div class="w-full overflow-x-hidde" ref="wrapRef">
    <!-- <header class="nav fixed top-0 left-0 opacity-0 z-[110] w-full">
      <Navbar />
    </header> -->
    <template v-if="isDesktop">
      <div ref="earthRef" class="w-full h-screen">
        <div class="w-[35%] h-screen relative">
          <div class="absolute z-20 lg:top-[45%] lg:left-[15%] lg:translate-x-0 lg:translate-y-[-50%]">
            <h1 class="text-[100px] font-bold leading-[1.2] mb-[30px]">
              <p class="text-white text-center lg:text-left">Easy</p>
              <p class="text-white">Booking</p>
            </h1>
            <p class="text-white block mb-[15px] text-[18px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p class="text-white block mb-[15px] text-[18px]">
              Quas, dolorum ipsum alias cumque nam fugiat inventore aspernatur.
            </p>
            <p class="text-white block mb-[15px] text-[18px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.dfsonfdlkng dskfjkldfnvo
            </p>
          </div>
        </div>
        <client-only>
          <Earth />
        </client-only>
        <!-- <div class="w-full h-screen absolute top-0 left-0 bg-black"></div> -->
      </div>
      <div
        @click="togglePageScroll('auto')"
        class="absolute w-full bottom-[10px] z-[200] flex flex-col justify-center items-center cursor-pointer"
      >
        <p class="text-[2rem] text-white leading-[0.8] mb-[5px]">View Website</p>
        <client-only>
          <font-awesome-icon :icon="['fas-solid', 'angles-down']" class="text-[2rem] text-white" />
        </client-only>
        <!-- <font-awesome-icon :icon="['fa-solid', 'angle-left']" class="text-[2rem] text-white" /> -->
      </div>
    </template>
    <template v-else>
      <ScrollAnimate></ScrollAnimate>
    </template>
    <main :class="['overflow-x-hidden']">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import '~~/assets/css/tailwinds.css';
import ScrollAnimate from './components/ScrollAnimate.vue';
import Earth from './components/Earth.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const { useSetting } = useStore();
const settingStore = useSetting();
const { isTransitionPageMounted } = storeToRefs(settingStore);

const { isDesktop } = useDevice();

// ***** auto scroll page *****
let htmlDom: HTMLElement | null = null;

const togglePageScroll = (type: 'hidden' | 'auto') => {
  if (!htmlDom) {
    return;
  }

  htmlDom.scrollTo({
    top: type === 'auto' ? window.innerHeight : 0,
    behavior: 'smooth' // 平滑滾動效果
  });

  // type === 'hidden' ? useLockScroll(htmlDom) : useUnlockScroll(htmlDom);
  if (type === 'hidden') {
    useLockScroll(htmlDom);
  } else {
    useUnlockScroll(htmlDom);
    isScrollTop.value = false;
  }
};

const isScrollTop = ref(false);

watch(isScrollTop, (val) => {
  if (val) {
    togglePageScroll('hidden');
  }
});

const scrollHandler = (e: WheelEvent) => {
  if (e.deltaY < 0 && window.scrollY < window.innerHeight) {
    isScrollTop.value = true;
    console.log(isScrollTop.value, 'isScrollTop.value');
  }
};

// let debounceScrollHandler = useDebounce(scrollHandler, 5);
let debounceScrollHandler = scrollHandler;

const wrapRef = ref<HTMLElement>();

watch(
  isTransitionPageMounted,
  async (val) => {
    if (process.client) {
      htmlDom = document.getElementsByTagName('html')[0];
      if (!val) {
        togglePageScroll('hidden');
        htmlDom?.addEventListener('wheel', debounceScrollHandler);
      }
    }
  },
  {
    immediate: true
  }
);

onUnmounted(() => {
  htmlDom?.removeEventListener('wheel', debounceScrollHandler);
});
// ***** auto scroll page *****
</script>

<style>
/* html {
  scroll-behavior: smooth;
} */
::-webkit-scrollbar {
  display: none;
}
</style>
