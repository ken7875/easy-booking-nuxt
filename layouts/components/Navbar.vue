<template>
  <div class="w-full flex justify-between items-center h-[6.5rem] px-5 bg-black relative">
    <h2 class="text-[1.5rem] text-white font-[900] mx-auto lg:mx-0">
      <NuxtLink to="/">
        <span class="block text-white text-center lg:text-left">Easy</span>
        <span class="block text-white">Booking</span>
      </NuxtLink>
    </h2>
    <div class="flex items-center lg:hidden absolute top-[50%] right-[5%] translate-y-[-50%]">
      <div
        class="relative w-[50px] h-[50px] overflow-hidden rounded-[50%] mr-[8px]"
        v-if="token"
        @click="toggleMenuHandler(true)"
      >
        <img :src="(avatar as string)" alt="avatar" />
        <div class="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.7)]">
          <p class="text-white text-[0.8rem] text-center">點我</p>
        </div>
      </div>
      <p class="text-white">{{ userInfo?.name }}</p>
    </div>
    <ul class="flex items-center absolute right-[2%] lg:static">
      <li v-if="token" @click="toggleMenuHandler(true)" class="flex items-center">
        <div class="relative w-[50px] h-[50px] overflow-hidden rounded-[50%] cursor-pointer mr-[10px]">
          <img :src="(avatar as string)" alt="avatar" v-if="avatar" />
          <div class="w-full h-full" v-else>
            <div class="w-full h-full bg-darkLight flex justify-center items-center">
              <client-only>
                <font-awesome-icon icon="user-large" class="text-[#ccccccc7] text-[2rem]" />
              </client-only>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)]">
            <p class="text-white text-[0.8rem] text-center">點我</p>
          </div>
        </div>
        <p class="text-white mr-[10px]">{{ userInfo?.name }}</p>
      </li>
      <li v-else>
        <NuxtLink to="/login" class="text-white font-bold mr-5">登入</NuxtLink>
        <NuxtLink class="text-white font-bold mr-5" to="/Register/StepOne">註冊</NuxtLink>
      </li>
    </ul>
    <ToggleMenu @closeMenu="toggleMenuHandler" v-if="toggleMenu"></ToggleMenu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import { getAvatarApi } from '~~/api/auth';
import ToggleMenu from './ToggleMenu.vue';
import { userIdCookie } from '~~/utils/cookies';

const { useAuth } = useStore();
const authStore = useAuth();

const { token, userInfo } = storeToRefs(authStore);

const avatar = ref<string | ArrayBuffer | null>('');

const id = userIdCookie().getItem();

const getAvatar = async () => {
  if (!id) {
    return;
  }

  try {
    const file = await getAvatarApi(id);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      avatar.value = reader.result;
      console.log(avatar.value, 'avatar.value');
    };
  } catch (error) {
    avatar.value = '';
  }
};
const toggleMenu = ref(false);

const toggleMenuHandler = (bool: boolean) => {
  toggleMenu.value = bool;
};
watch(
  token,
  (val) => {
    if (val) {
      getAvatar();
    }
  },
  {
    immediate: true
  }
);
</script>
