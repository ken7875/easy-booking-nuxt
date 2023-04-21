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
const curStep = ref(0);
const finishBarWidth = ref(0);
if (route.path === '/form') {
  curStep.value = 1;
  const timer = setInterval(() => {
    finishBarWidth.value += 1;
    if (finishBarWidth.value >= 100 / stepAry.length) {
      clearInterval(timer);
    }
  }, 30);
} else if (route.path === '/confirm') {
  curStep.value = 2;
  finishBarWidth.value = 25;
  const timer = setInterval(() => {
    finishBarWidth.value += 1;
    if (finishBarWidth.value >= (100 / stepAry.length) * 2) {
      clearInterval(timer);
    }
  }, 30);
} else if (route.path === '/success') {
  curStep.value = 3;
  finishBarWidth.value = 50;
  const timer = setInterval(() => {
    finishBarWidth.value += 1;
    if (finishBarWidth.value >= 75) {
      clearInterval(timer);
    }
  }, 30);
}
</script>
