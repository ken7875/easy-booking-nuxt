<template>
  <ServiceLayout>
    <template #title>
      <h2>所有飯店</h2>
    </template>
    <template #left>
      <ul class="px-[25px] h-full overflow-x-hidden pb-[10px]">
        <li class="border-b border-darkLight mb-[10px] pb-[10px]">
          <h2 class="text-[1.5rem] font-bold">{{ currentHotel.name }}</h2>
          <div>
            <span v-textSlice:[sliceNum]="currentHotel.description"></span>
            <!-- v-if="hasSeeMoreBtn" -->
            <div v-if="hasSeeMoreBtn">
              <span v-show="!isTextShow">...</span>
              <span @click="seeMore" class="text-secondary ml-[5px] cursor-pointer">{{
                !isTextShow ? '閱讀更多' : '隱藏內容'
              }}</span>
            </div>
          </div>
        </li>
        <li class="border-b border-darkLight mb-[10px] pb-[10px]">
          <p>每晚平均價格: {{ averagePrice }}</p>
          <p>飯店評分: {{ currentHotel.ratingAverage }}</p>
        </li>
        <li>
          <ul class="flex flex-wrap border-b border-darkLight mb-[10px] pb-[10px]">
            <li
              v-for="hotel in sliceHotels"
              :key="hotel.id"
              class="w-[calc(33%-10px)] m-[5px]"
              @click="changeShowHotel(hotel.id)"
            >
              <img :src="hotel.images[0]" alt="" class="w-full h-full object-cover object-center" />
            </li>
          </ul>
        </li>
        <li class="flex justify-between">
          <NuxtLink to="/Hotels" class="button button__secondary">所有飯店</NuxtLink>
          <NuxtLink :to="`/Hotel-${currentHotel.id}`" class="button button__primary">查看詳情</NuxtLink>
        </li>
      </ul>
    </template>
    <template #right>
      <img :src="currentHotel.images[0]" alt="" class="w-full h-full object-cover" />
    </template>
  </ServiceLayout>
</template>

<script setup lang="ts">
import ServiceLayout from './ServiceModalLayout.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';

const { useHotel } = useStore();

const hotelStore = useHotel();
const { allHotels, allHotelMap } = storeToRefs(hotelStore);

const sliceHotels = computed(() => allHotels.value.slice(0, 6));

const currentHotel = ref(sliceHotels.value[0]);

const changeShowHotel = (id: string) => {
  isTextShow.value = false;
  currentHotel.value = allHotelMap.value[id];
};

const averagePrice = computed(() => {
  const roomTypeNum = currentHotel.value.roomType.length;
  const total = currentHotel.value.roomType.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);

  return total / roomTypeNum;
});

const sliceNum = ref(150);
const isTextShow = ref(false);
const seeMore = () => {
  isTextShow.value = !isTextShow.value;
  if (isTextShow.value) {
    sliceNum.value = currentHotel.value.description?.toString()?.length as number;
  } else {
    sliceNum.value = 150;
  }
};

const hasSeeMoreBtn = currentHotel.value.description.toString().length > sliceNum.value;
</script>
