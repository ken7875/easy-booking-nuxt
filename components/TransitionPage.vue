<template>
  <div class="fixed top-0 left-0 z-[100000] w-full h-screen wrap">
    <div class="w-full h-full bg-white relative">
      <div class="absolute top-[50%] translate-y-[-50%] left-[20%]">
        <p class="lg:text-[7rem] text-[3rem] font-bold lg:ml-[-11px] ml-0">Easy</p>
        <div class="lg:ml-[-11px] ml-0 flex items-baseline">
          <p class="lg:text-[7rem] text-[3rem] mr-[15px] font-bold">Booking</p>
          <div class="bg-black w-[20px] h-[20px] rounded-[50%]"></div>
        </div>
      </div>
      <div class="absolute top-[50%] translate-y-[-50%] left-[20%] text-white w-0 overflow-hidden z-[2] whiteTextWrap">
        <p class="lg:text-[7rem] text-[3rem] font-bold lg:ml-[-11px] ml-0">Easy</p>
        <div class="lg:ml-[-11px] ml-0 flex items-baseline">
          <p class="lg:text-[7rem] text-[3rem] mr-[15px] font-bold">Booking</p>
          <div class="w-[20px] h-[20px] rounded-[50%] bg-white whiteDot"></div>
        </div>
      </div>
      <div class="w-0 h-full bg-black absolute top-0 left-0 z-[1] blackBg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useStore } from '@/store/index';

interface Props {
  showTransitionPage: boolean;
}

defineProps<Props>();

const emit = defineEmits(['update:showTransitionPage']);

const { useSetting } = useStore();
const settingStore = useSetting();

const { toggleTransitionPageMounted } = settingStore;

let htmlDom: HTMLElement | null = null;

let tl: GSAPTimeline | null = gsap.timeline({
  defaults: {
    ease: 'linear'
  }
});

const { isDesktop } = useDevice();

const animation = () => {
  tl?.to('.blackBg', { width: '100%', duration: isDesktop ? 0.8 : 0.3 });
  tl?.to('.whiteTextWrap', { width: '100%' }, '-=80%');
  tl?.fromTo('.whiteDot', { y: 0 }, { y: -30, duration: 0.3, ease: 'easeInOut' });
  tl?.to('.whiteDot', { y: 0, duration: 0.2 });
  tl?.fromTo('.blackBg', { x: 0 }, { x: '100%', duration: isDesktop ? 2.5 : 2, ease: 'easeOut' });
  tl?.to(
    '.wrap',
    {
      x: '100%',
      duration: isDesktop ? 0.6 : 0.3,
      ease: 'easeOut',
      onComplete: () => emit('update:showTransitionPage', false)
    },
    '<'
  );
};

onMounted(() => {
  toggleTransitionPageMounted(true);
  htmlDom = document.querySelector('html');
  useLockScroll(htmlDom);
  animation();
});

onUnmounted(() => {
  useUnlockScroll(htmlDom);
  tl?.restart();
  tl?.kill();
  tl = null;
  toggleTransitionPageMounted(false);
});
// watch(
//   () => route.name,
//   () => {
//     nextTick(() => {
//       showTransitionPage.value = true;
//     });
//   },
//   {
//     immediate: true
//   }
// );

// watch(showTransitionPage, (val) => {
//   console.log(val, 'val');
//   if (val) {
// lockScroll();
// animation();
//   } else {
//     unlockScroll();
//   }
// });
</script>
