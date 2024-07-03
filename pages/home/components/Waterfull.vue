<template>
  <div
    class="flex justify-between overflow-hidden lg:w-[110%] w-[170%] lg:ml-[-5%] ml-[-35%] h-[100vh] bg-black relative"
  >
    <div
      v-for="(row, rowIdx) in waterfullData"
      :key="rowIdx"
      class="w-full h-full"
      :ref="
        (el) => {
          waterfullAnimation(el as HTMLElement, rowIdx);
        }
      "
      data-test="waterfull-row"
    >
      <div v-for="(col, colIdx) in row" :key="colIdx" class="w-full opacity-50" data-test="waterfull-item">
        <div :class="['w-full relative p-[20px]', { 'h-[400px]': rowIdx % 2 === 0, 'h-[350px]': rowIdx % 2 !== 0 }]">
          <client-only>
            <img :src="col.images[0]" alt="" class="h-full w-full object-cover object-center rounded-[16px]" />
          </client-only>
        </div>
      </div>
    </div>
    <!-- 文字與按鈕 -->
    <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <p class="text-[2.5rem] text-white text-center leading-[2] mb-[80px]">
        在 Easy Booking 有上百間優質飯店等您入住，<br />點選下方按鈕即可開始挑選飯店
      </p>
      <div class="flex justify-center">
        <Button class="w-[180px] p-[15px] text-[1.5rem] button" @click="goProductsPage" data-test="route-button">
          <template #default>開始選房</template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import Button from '~~/components/Button.vue';
import { storeToRefs } from 'pinia';
import { useHotel } from '~~/store/hotel';

const hotelStore = useHotel();

const { allHotels } = storeToRefs(hotelStore);
// getAllHotels();
const device = useDevice();
// 瀑布流資料結構
const waterfullData = computed(() => {
  let res = [];
  //   let waterfullTotal = 36; // 瀑布需要的資料總數
  let rowNum = device.isMobile ? 3 : 5; // 瀑布排數
  let startIdx = 0;
  let endIdx = 6;

  for (let i = 0; i <= rowNum; i++) {
    // 如果 sliceidx 大於陣列總長度就把slice idx 初始
    if (startIdx >= allHotels.value.length) {
      startIdx = 0;
      endIdx = 6;
    }
    let waterfullCol = allHotels.value.slice(startIdx, endIdx);
    // 如果最後結果不滿6個，就把不足的補上
    if (waterfullCol.length < 6) {
      const diff = 6 - waterfullCol.length;
      waterfullCol.push(...allHotels.value.slice(0, diff));
    }

    res.push(waterfullCol);
    startIdx += 6;
    endIdx += 6;
  }

  return res;
});

let tl: GSAPTimeline | null = null;
const waterfullAnimation = (el: HTMLElement, rowIdx: number) => {
  tl = gsap.timeline({ repeat: -1, yoyo: true });
  if (el) {
    if (rowIdx % 2 === 0) {
      tl.fromTo(el, { y: 0 }, { y: -1200, duration: 8, ease: 'none' });
    } else {
      tl.fromTo(el, { y: -1200 }, { y: 0, duration: 8, ease: 'none' });
    }
  }
};

const router = useRouter();

const goProductsPage = useThrottle(() => {
  router.push('/Hotels');
});

onBeforeUnmount(() => {
  tl?.kill();
  tl = null;
});
</script>
