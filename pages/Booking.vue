<template>
  <div class="lg:container">
    <ProgressBar :steps="stepAry" :curStep="curStep" :finishBarWidth="finishBarWidth" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import ProgressBar from '~~/components/bookingPage/ProgressBar.vue';
import { useRoute } from 'vue-router';

definePageMeta({
  middleware: [
    function (to) {
      if (to.path === '/Booking') {
        return navigateTo('/Booking/Form');
      }
    },
    'auth'
  ]
});

const route = useRoute();
const stepAry = reactive(['選擇房型', '填寫基本資料', '確認訂單', '完成']);
const finishBarWidth = ref(0);
let timer: ReturnType<typeof setTimeout> | null = null;

const curStep = computed(() => {
  console.log(route.name, 'route.name');
  let step = 0;
  switch (route.name) {
    case 'Booking-Form':
      step = 1;
      break;

    case 'Booking-Confirm':
      step = 2;
      break;

    case 'Booking-Success':
      step = 3;
      break;
  }

  return step;
});

let preStep = 0;

const clearIntervalHandler = (step: number, type: 'plus' | 'minus') => {
  const range =
    type === 'plus'
      ? finishBarWidth.value >= 100 / ((stepAry.length - 1) / step)
      : finishBarWidth.value <= 100 / ((stepAry.length - 1) / step);

  if (range) {
    clearInterval(timer!);
    timer = null;
    preStep = step; // 記錄前一個步驟，方便判斷進度條要前進或倒退。
  }
};

const finishBarAnimation = (step: number) => {
  console.log(step, preStep);
  console.log(100 / ((stepAry.length - 1) / step), 'number number');
  timer = setInterval(() => {
    console.log(step > preStep, 'step > preStep');
    if (step > preStep) {
      clearIntervalHandler(step, 'plus');
      finishBarWidth.value += 1;
    } else {
      console.log('step < preStep');

      clearIntervalHandler(step, 'minus');

      finishBarWidth.value -= 1;
      console.log(finishBarWidth.value);
    }
  }, 30);
};

watch(
  curStep,
  (val) => {
    finishBarAnimation(val);
  },
  {
    immediate: true
  }
);

onBeforeUnmount(() => {
  clearInterval(timer!);
  timer = null;
});
// if (route.name === 'Booking-Form') {
//   curStep.value = 1;

//   const timer = setInterval(() => {
//     finishBarWidth.value += 1;
//     if (finishBarWidth.value >= 100 / totalStep) {
//       clearInterval(timer);
//     }
//   }, 30);
// } else if (route.name === 'Booking-Confirm') {
//   curStep.value = 2;
//   finishBarWidth.value = 25;
//   const timer = setInterval(() => {
//     finishBarWidth.value += 1;
//     if (finishBarWidth.value >= (100 / totalStep) * 2) {
//       clearInterval(timer);
//     }
//   }, 30);
// } else if (route.name === 'Booking-Success') {
//   curStep.value = 3;
//   finishBarWidth.value = 50;
//   const timer = setInterval(() => {
//     finishBarWidth.value += 1;
//     if (finishBarWidth.value >= 75) {
//       clearInterval(timer);
//     }
//   }, 30);
// }
</script>
