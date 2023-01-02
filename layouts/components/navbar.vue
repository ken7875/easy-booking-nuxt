<template>
  <nav
    class="nav fixed top-0 left-0 w-full bg-black flex justify-between items-center opacity-0 z-[110] h-[6.5rem] px-5"
  >
    <h2 class="text-[1.5rem] text-white font-[900]">
      <NuxtLink>
        <span class="block text-white">Easy</span>
        <span class="block text-white">Booking</span>
      </NuxtLink>
    </h2>
    <ul class="nav-list hidden md:flex">
      <li>
        <NuxtLink class="text-white font-bold mr-5">註冊</NuxtLink>
      </li>
      <li>
        <NuxtLink class="text-white font-bold mr-5">所有產品</NuxtLink>
      </li>
      <li>
        <NuxtLink class="text-white font-bold mr-5">關於我們</NuxtLink>
      </li>
      <!-- <li v-if="token" @click="menu.toggleMenu = true">
          <img :src="avatar" alt="avatar">
        </li>
        <li v-else>
          <NuxtLink to="/login">會員登入</NuxtLink>
        </li> -->
    </ul>
  </nav>
</template>
