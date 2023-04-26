<template>
  <div class="lg:container">
    <ProgressBar :steps="stepAry" :curStep="curStep" />
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
// let timer: ReturnType<typeof setTimeout> | null = null;

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
</script>
