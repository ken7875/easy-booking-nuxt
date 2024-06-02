<template>
  <div>
    <h3 class="text-center my-[20px] mx-0 text-[25px] font-bold">訂單確認</h3>
    <client-only>
      <ul class="mx-auto w-[45%] border-t border-darkLight p-[20px]">
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">房客名稱</p>
          <p>{{ bookingInfo.lastName }} {{ bookingInfo.firstName }}</p>
        </li>
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">email</p>
          <p>{{ bookingInfo.email }}</p>
        </li>
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">手機</p>
          <p>{{ bookingInfo.phone }}</p>
        </li>
      </ul>
      <ul class="mx-auto w-[45%] border-t border-darkLight p-[20px]">
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">旅館名稱</p>
          <p>{{ bookingInfo.roomType }}</p>
        </li>
      </ul>
      <ul class="mx-auto w-[45%] border-t border-darkLight p-[20px]">
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">入住時間</p>
          <p v-timeFormat="bookingInfo.checkinTime"></p>
        </li>
        <li class="flex justify-between mb-[10px]">
          <p class="font-bold">退房時間</p>
          <p v-timeFormat="bookingInfo.checkoutTime"></p>
        </li>
      </ul>
      <ul class="mx-auto w-[45%] border-y border-darkLight p-[20px]">
        <li>
          <p class="font-bold">特殊需求</p>
          <p>{{ bookingForm.asking }}</p>
        </li>
      </ul>
    </client-only>
    <div class="w-[45%] p-[20px] m-auto mt-[15px] flex justify-between">
      <Button type="submit" class="button__outline-primary submit" @click.prevent="confirmOrEdit('/Booking/Form')">
        修改訂單
      </Button>
      <Button type="submit" class="button__primary submit" @click.prevent="confirmOrEdit('/Booking/Success')">
        確認訂單
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { apiMethods } from '~~/api/index';
import type { OrderDetailParams } from '~~/model/booking';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import Button from '~~/components/Button.vue';

const router = useRouter();

const { useBooking, useAuth } = useStore();
const bookingStore = useBooking();
const authStore = useAuth();
const { reserveHotelInfo, bookingForm } = storeToRefs(bookingStore);
const { userInfo } = storeToRefs(authStore);

const bookingInfo = reactive<OrderDetailParams>({
  product: reserveHotelInfo.value.productId,
  roomType: reserveHotelInfo.value.roomTypeInfo.name,
  paid: reserveHotelInfo.value.paid,
  checkinTime: reserveHotelInfo.value.date.checkinTime,
  checkoutTime: reserveHotelInfo.value.date.checkoutTime,
  day: reserveHotelInfo.value.day,
  quantity: reserveHotelInfo.value.bookingNum,
  roomTypeId: reserveHotelInfo.value.roomTypeInfo._id,
  userName: userInfo.value?.name || '',
  ...bookingForm.value
});

const createBooking = async () => {
  const res = await apiMethods.booking.createBooking<OrderDetailParams>(bookingInfo);

  return res.status;
};

const confirmOrEdit = async (routeName: string) => {
  try {
    if (routeName === '/Booking/Success') {
      const status = await createBooking();
      console.log(status);
      if (status === 'success') {
        router.push(routeName);
        bookingStore.$reset(); // reset 表單、選房資訊
      }
    } else {
      router.push(routeName);
    }
  } catch (error) {
    console.log(error, 'error');
  }
};
</script>
