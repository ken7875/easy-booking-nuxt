<template>
  <div>
    <h2 class="font-bold lg:text-[2rem] text-[1.8rem] text-center my-[25px]">我的訂單</h2>
    <p v-if="pending">loading...</p>
    <div class="lg:container flex items-top px-[20px] lg:px-0">
      <ul class="mx-auto lg:w-[50%] w-full">
        <li v-for="order in ordersList" :key="order._id" class="mb-[20px]">
          <Card class="px-[20px]">
            <template v-slot:header>
              <ul class="border-b border-darkLight py-[15px]">
                <li class="flex justify-between">
                  <p class="mb-[10px]">訂單編號:</p>
                  <p>{{ order._id.slice(0, 8) }}</p>
                </li>
                <li class="flex justify-between">
                  <p class="mb-[10px]">訂房時間:</p>
                  <p v-timeFormat="order.createdAt"></p>
                </li>
              </ul>
            </template>
            <template v-slot:body>
              <div class="flex flex-nowrap w-full mt-[20px]">
                <ul class="w-full">
                  <li class="flex justify-between mb-[10px]">
                    <p>訂房者</p>
                    <p>{{ order.lastName }} {{ order.firstName }}</p>
                  </li>
                  <li class="flex justify-between mb-[10px]">
                    <p>飯店名稱</p>
                    <p class="text-secondary cursor-pointer" @click="openHotelDetail(order.product.id)">
                      {{ order.product.name }}
                    </p>
                  </li>
                  <li class="flex justify-between mb-[10px]">
                    <p>選擇房型</p>
                    <p>{{ order.roomType }}</p>
                  </li>
                  <li class="flex justify-between mb-[10px]">
                    <p>入住時間</p>
                    <div class="flex flex-wrap w-[50%] lg:w-fit">
                      <span v-timeFormat="order.checkinTime"></span>
                      <span class="lg:inline-block lg:mx-[8px]">-</span>
                      <span v-timeFormat="order.checkoutTime"></span>
                    </div>
                  </li>
                  <li class="flex justify-between mb-[10px]">
                    <p>入住天數</p>
                    <p>{{ order.day }}</p>
                  </li>
                </ul>
                <!-- <img :src="order.product.images[0]" alt="" class="w-[30%]" />
                <div class="border-r border-darkLight pr-[10px] w-[70%] pl-[10px] pt-[10px]">
                  <h3>{{ order.product.name }}</h3>
                  <h4>{{ order.roomType }}</h4>
                  <p>地址: {{ order.product.locations.address }}</p>
                </div>
                <div class="w-[30%] flex flex-col justify-center px-[20px]">
                  <Button bgColor="button__outline-primary">詳細內容</Button>
                  <Button bgColor="button__outline-danger" @click="deleteOrder(order._id)">取消訂房</Button>
                </div> -->
              </div>
            </template>
            <template v-slot:footer>
              <div class="flex items-center justify-end border-t border-darkLight py-[15px]">
                <p class="mr-[8px]">{{ order.day }}晚</p>
                <p class="mr-[8px]">{{ order.quantity }}房</p>
                <p class="text-[1.5rem] text-primary">${{ order.paid }}</p>
              </div>
            </template>
          </Card>
        </li>
      </ul>
      <div
        class="lg:w-[65%] lg:h-full w-full h-[80vh] lg:ml-[15px] pb-[20px] shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)] lg:relative fixed top-[57%] left-[50%] lg:top-0 lg:left-0 translate-x-[-50%] translate-y-[-50%] lg:translate-x-0 lg:translate-y-0 bg-white"
        v-if="isHotelDetailOpen"
      >
        <client-only>
          <font-awesome-icon
            :icon="['fas', 'circle-xmark']"
            class="absolute top-[-4%] right-[-1%] z-[1000] text-[1.5rem]"
            @click="isHotelDetailOpen = false"
          />
        </client-only>
        <div class="w-full h-full overflow-scroll">
          <div v-if="!isHotelDetailPending" class="px-[10px]">
            <ImageGroup :hotelDetailData="hotelDetail || null" :height="'h-[330px]'" />
            <HotelInformation :hotelDetailData="hotelDetail || null" />
            <div class="flex justify-end">
              <NuxtLink :to="`/Hotel-${hotelDetail?.id}`" class="button button__secondary w-[150px] mt-[15px]"
                >查看房間詳情</NuxtLink
              >
            </div>
          </div>
          <Loading class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrdersApi } from '~~/api/booking';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import { OrderDetail } from '~~/model/booking';
import { getProductApi } from '~~/api/hotel';
import { Hotel } from '~~/model/hotel';
import ImageGroup from '~~/components/hotelDetailPage/ImageGroup.vue';
import HotelInformation from '~~/components/hotelDetailPage/HotelInformation.vue';
import Loading from '~~/components/Loading.vue';

const { useAuth } = useStore();
const authStore = useAuth();
const { userInfo } = storeToRefs(authStore);

const { data: ordersData, pending } = await useAsyncData('ordersList', () => getOrdersApi<OrderDetail[]>(), {
  initialCache: false,
  lazy: true
});

console.log(ordersData.value, 'jdaskldjalsdj');
const ordersList = ref(ordersData.value?.data?.data);

const deleteOrder = (id: string) => {
  console.log(id);
};

const hotelDetail = ref<Hotel | null>(null);
const isHotelDetailPending = ref(false);
const isHotelDetailOpen = ref(false);
const openHotelDetail = async (id: string) => {
  isHotelDetailPending.value = true;
  isHotelDetailOpen.value = true;
  const { data, pending } = await useAsyncData('hotelDetail', () => getProductApi<Hotel>(id), {
    initialCache: false
  });
  isHotelDetailPending.value = false;
  console.log(pending.value, 'sadasdasdasdasd');

  hotelDetail.value = data.value?.data?.data || null;
  isHotelDetailPending.value = pending.value;
};

// watch(isHotelDetailPending, (val) => {
//   console.log(val, 'pending');
// });
</script>