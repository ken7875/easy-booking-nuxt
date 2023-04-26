<template>
  <div class="lg:w-[30%] w-[95%] mx-auto mt-[30px]">
    <h1 class="text-center lg:text-[2rem] text-[1.8rem] font-bold mb-[10px]">註冊</h1>
    <ProgressBar :steps="stepAry" :cur-step="curStep" />
    <Nuxt-Page></Nuxt-Page>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from '~~/components/bookingPage/ProgressBar.vue';

const route = useRoute();

const stepAry = reactive(['帳號密碼', '基本資料']);

const curStep = computed(() => {
  console.log(route.name, 'route.name');
  let step = 0;
  switch (route.name) {
    case 'Register-StepOne':
      step = 0;
      break;

    case 'Register-StepTwo':
      step = 1;
      break;
  }

  return step;
});
</script>
