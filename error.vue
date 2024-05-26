<template>
  <div class="lg:container flex justify-between h-screen">
    <div class="w-[50%] hidden lg:flex items-center justify-center">
      <h1 class="text-[4.5rem] font-[600]">
        <span class="block text-center lg:text-left">Easy</span>
        <span class="block">Booking</span>
      </h1>
    </div>
    <div class="lg:w-[50%] w-full flex items-center justify-center">
      <div class="w-[70%] relative">
        <h2 class="text-[4.5rem]">{{ error?.statusCode }}</h2>
        <div v-if="error?.statusCode.toString().includes('404')">
          <h3 class="text-[2rem] mb-[15px]">找不到頁面</h3>
          <p class="text-[1.2rem] mb-[25px]">您所尋找的頁面並不存在，請點擊下面按鈕回到首頁。</p>
        </div>
        <p v-else class="text-[2rem] mb-[25px]">{{ error?.message }}</p>
        <Button @click="handleError" class="float-right button__outline-primary">回首頁</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './components/Button.vue';

const props = defineProps({
  error: Object
});

const handleError = () => clearError({ redirect: '/' });
</script>
