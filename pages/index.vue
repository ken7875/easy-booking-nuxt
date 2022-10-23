<template>
  <div>
    <div class="h-screen w-screen bg-white relative z-[100] pt-[6.5rem]">
      <div class="absolute top-0 left-[20%] z-1 h-full">
        <div class="h-full w-[1px] bg-black" v-border></div>
      </div>
      <div class="bg-white relative top-[2rem] left-0 z-10 flex items-center flex-col">
        <div class="h-[1px] w-full bg-black" v-border></div>
        <h2 class="text-[3.4rem] py-[1rem] whitespace-nowrap">
          <strong>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</strong>
        </h2>
        <div class="h-[0.5px] w-full bg-black" v-border></div>
      </div>
    </div>
    <div class="h-screen w-screen">section2</div>
  </div>
</template>

<script setup>
import { useStore } from '@/store/hotel'

definePageMeta({
  layout: "home",
});

const hotelStore = useStore()
const { getAllHotels } = hotelStore
getAllHotels()
</script>
