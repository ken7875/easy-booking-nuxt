<template>
  <ul class="fixed top-[6.5rem] left-0 w-full h-[calc(100%-6.5rem)] bg-[rgba(0,0,0,0.8)] lg:flex block">
    <client-only>
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        class="text-[2.5rem] text-white absolute top-[2%] right-[2%] cursor-pointer"
        @click="$emit('closeMenu', false)"
      />
    </client-only>
    <li class="lg:w-[50%] w-full h-[30%] lg:h-full flex justify-center items-center mb-[40px]">
      <div>
        <div class="flex justify-center lg:block">
          <p
            class="text-white lg:text-[5rem] text-[3.5rem] inline-block title"
            v-for="(text, i) in title.split(' ')[0]"
            :key="i"
          >
            {{ text }}
          </p>
        </div>
        <div>
          <p
            class="text-white lg:text-[5rem] text-[3.5rem] inline-block title"
            v-for="(text, i) in title.split(' ')[1]"
            :key="i"
          >
            {{ text }}
          </p>
        </div>
      </div>
    </li>
    <li class="lg:w-[50%] w-full flex justify-center items-center">
      <ul class="lg:block">
        <li class="group text-white text-[2.5rem] lg:mb-[40px] mb-[30px] overflow-hidden">
          <div v-surface>
            <NuxtLink
              to="/OrderList"
              :class="{ 'cursor-default': $route.path === '/OrderList' }"
              @click="$emit('closeMenu', false)"
              >房間訂單</NuxtLink
            >
          </div>
          <div
            :class="[
              'border-b-2 border-white w-0 duration-300 origin-left',
              { 'group-hover:w-full': $route.path !== '/OrderList' }
            ]"
          ></div>
        </li>
        <li class="group text-white text-[2.5rem] lg:mb-[40px] mb-[30px] overflow-hidden">
          <div v-surface>
            <NuxtLink
              to="/PickUpOrder"
              :class="{ 'cursor-default': $route.path === '/PickUpOrder' }"
              @click="$emit('closeMenu', false)"
              >乘車訂單</NuxtLink
            >
          </div>
          <div
            :class="[
              'border-b-2 border-white w-0 duration-300 origin-left',
              { 'group-hover:w-full': $route.path !== '/PickUpOrder' }
            ]"
          ></div>
        </li>
        <li class="group text-white text-[2.5rem] lg:mb-[40px] mb-[30px] overflow-hidden">
          <div v-surface>
            <NuxtLink
              to="/UserInfo"
              :class="{ 'cursor-default': $route.path === '/UserInfo' }"
              @click="$emit('closeMenu', false)"
              >個人資訊</NuxtLink
            >
          </div>
          <div
            :class="[
              'border-b-2 border-white w-0 duration-300 origin-left',
              { 'group-hover:w-full': $route.path !== '/UserInfo' }
            ]"
          ></div>
        </li>
        <li class="group text-white text-[2.5rem] lg:mb-[40px] mb-[30px] overflow-hidden">
          <div v-surface>
            <NuxtLink
              to="/Hotels"
              :class="['text-white font-bold mr-5', { 'cursor-default': $route.path === '/Hotels' }]"
              @click="$emit('closeMenu', false)"
              >所有產品</NuxtLink
            >
          </div>
          <div
            :class="[
              'border-b-2 border-white w-0 duration-300 origin-left',
              { 'group-hover:w-full': $route.path !== '/Hotels' }
            ]"
          ></div>
        </li>
        <li class="group text-white text-[2.5rem] lg:mb-[40px] mb-[30px] overflow-hidden">
          <div v-surface>
            <p
              class="text-white font-bold mr-5 cursor-pointer"
              @click="
                logout();
                $emit('closeMenu', false);
              "
            >
              登出
            </p>
          </div>
          <div class="border-b-2 border-white w-0 duration-300 origin-left group-hover:w-full"></div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useStore } from '~~/store/index';

const { useAuth } = useStore();
const { logout } = useAuth();

const title = ref('Easy Booking');

let tl: GSAPTimeline | null = gsap.timeline();
const titleAnimation = () => {
  let targets = gsap.utils.toArray('.title');

  if (targets.length > 0) {
    tl?.fromTo('.title', { alpha: 0, scale: 1.3 }, { alpha: 1, scale: 1, duration: 1, stagger: 0.1 });
  }
};

onMounted(() => {
  titleAnimation();
});

onBeforeUnmount(() => {
  tl?.kill();
  tl = null;
});
</script>
