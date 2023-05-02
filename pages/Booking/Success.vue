<template>
  <div class="w-[30%] mx-auto">
    <h2 class="text-[25px] text-center mb-[25px]">預約成功</h2>
    <p class="text-[20px] mb-[30px] leading-[0.8rem] text-center">
      您的訂單編號為 <NuxtLink to="/OrderList" class="text-primary">123232342</NuxtLink>
    </p>
    <p class="text-[20px] text-center">恭喜您，獲得了一張優惠券</p>
    <Lottery class="mx-auto mb-[100px]" />
    <div class="flex justify-between">
      <NuxtLink to="/OrderList" class="button button__primary">查看訂單</NuxtLink>
      <NuxtLink to="/" class="button button__primary">回首頁</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO 完成成功訂房頁面
// TODO 成功訂房後刪除 localStorage 數值
import Lottery from '~~/components/Lottory.vue';
</script>
