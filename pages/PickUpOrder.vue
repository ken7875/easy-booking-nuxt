<template>
  <div>
    <h2
      class="font-bold lg:text-[2rem] text-[1.8rem] h-[5rem] sticky top-[6.5rem] text-center bg-white flex justify-center items-center"
    >
      乘車訂單
    </h2>
    <div class="lg:container flex items-top px-[20px] lg:px-0">
      <ul class="mx-auto lg:w-[50%] h-full w-full">
        <Suspense>
          <li v-for="pickUp in pickUpList" :key="pickUp._id" class="mb-[20px]">
            <Card class="px-[20px]">
              <template v-slot:header>
                <ul class="border-b border-darkLight py-[15px]">
                  <li class="flex justify-between">
                    <p class="mb-[10px]">訂單編號:</p>
                    <p>{{ pickUp._id.slice(0, 8) }}</p>
                  </li>
                </ul>
              </template>
              <template v-slot:body>
                <div class="flex flex-nowrap w-full mt-[20px]">
                  <ul class="w-full">
                    <li class="flex justify-between mb-[10px]">
                      <p>乘客名稱</p>
                      <p>{{ userInfo?.name }}</p>
                    </li>
                    <li class="flex justify-between mb-[10px]">
                      <p>機場</p>
                      <p>{{ pickUp.airport.name }}</p>
                    </li>
                    <li class="flex justify-between mb-[10px]">
                      <p>飯店</p>
                      <p>{{ pickUp.hotel.name }}</p>
                    </li>
                    <li class="flex justify-between mb-[10px]">
                      <p>距離</p>
                      <p
                        class="text-secondary cursor-pointer"
                        @click="checkMap([pickUp.airport.coordinates, pickUp.hotel.coordinates])"
                      >
                        {{ pickUp.distance }}
                      </p>
                    </li>
                    <li class="flex justify-between mb-[10px]">
                      <p>價格</p>
                      <p>{{ pickUp.price }}</p>
                    </li>
                  </ul>
                </div>
              </template>
            </Card>
          </li>
          <template #fallback> loading... </template>
        </Suspense>
      </ul>
      <div
        class="lg:w-[65%] w-full lg:h-[calc(100vh-12rem)] h-full lg:ml-[15px] pb-[20px] shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)] fixed top-[57%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:sticky lg:top-[11.5rem] lg:left-0 lg:translate-x-0 lg:translate-y-0 bg-white"
        v-if="isMapOpen"
      >
        <client-only>
          <font-awesome-icon
            :icon="['fas', 'circle-xmark']"
            class="absolute top-[-4%] right-[-1%] z-[1000] text-[1.5rem]"
            @click="isMapOpen = false"
          />
          <LazyLeaflet v-if="markers.length > 0" class="z-[100]" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllPickUpOrderApi } from '~~/api/pickUp';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import { PickUpOrder } from '~~/model/pickUp';
import Card from '~~/components/card/index.vue';

definePageMeta({
  middleware: 'auth'
});

const { useAuth, useLeaflet } = useStore();

const authStore = useAuth();
const { userInfo } = storeToRefs(authStore);

const isMapOpen = ref(false);

const { data: pickUpListData } = await useAsyncData('pickUpOrder', () =>
  getAllPickUpOrderApi<PickUpOrder[]>('642fee78168d50a44cc3e0b9')
);
console.log(pickUpListData, 'pickListData');

const pickUpList = ref(pickUpListData.value?.data.data);

const markers = ref<number[][]>([]);

const leafletStore = useLeaflet();
const { setCenterMarker, setMarkers } = leafletStore;

const checkMap = (targetMarkers: number[][]) => {
  isMapOpen.value = true;

  const [hotelLng, hotelLat] = targetMarkers[1];
  const [airportLng, airportLat] = targetMarkers[0];

  markers.value = targetMarkers;

  setCenterMarker([airportLat, airportLng]);
  setMarkers([
    [airportLat, airportLng],
    [hotelLat, hotelLng]
  ]);
};
</script>
