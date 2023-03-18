<template>
  <div class="w-full flex justify-between items-center h-[6.5rem] px-5 bg-black">
    <h2 class="text-[1.5rem] text-white font-[900] mx-auto lg:mx-0">
      <NuxtLink to="/">
        <span class="block text-white">Easy</span>
        <span class="block text-white">Booking</span>
      </NuxtLink>
    </h2>
    <ul class="hidden md:flex">
      <li>
        <NuxtLink class="text-white font-bold mr-5" to="/">註冊</NuxtLink>
      </li>
      <li>
        <NuxtLink class="text-white font-bold mr-5" to="/hotel/Hotels">所有產品</NuxtLink>
      </li>
      <li>
        <NuxtLink class="text-white font-bold mr-5" to="/">關於我們</NuxtLink>
      </li>
      <!-- <li v-if="token" @click="menu.toggleMenu = true">
          <img :src="avatar" alt="avatar">
        </li>
        <li v-else>
          <NuxtLink to="/login">會員登入</NuxtLink>
        </li> -->
    </ul>
  </div>
</template>
