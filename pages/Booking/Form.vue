<template>
  <div>
    <!-- <h1 class="text-[1.5rem] font-bold text-center mb-[20px]">填寫基本資料</h1> -->
    <main class="mb-2 grid grid-cols-5 w-full">
      <div class="lg:mr-[20px] lg:mb-0 lg:col-[1_/_3] col-[1_/_6] mr-0 mb-[30px]">
        <div class="border-2 border-darkLight p-4 mb-5 pb-2">
          <h3 class="text-[1.5rem] font-bold text-center">訂房資訊</h3>
          <client-only>
            <div class="flex py-[20px]">
              <div class="py-2 w-[50%] text-center border-r-2 border-darkLight">
                <h5 class="text-[1.2rem] mb-[10px]">入住時間</h5>
                <p v-timeFormat="reserveHotelInfo?.date?.checkinTime"></p>
              </div>
              <div class="py-2 w-[50%] text-center">
                <h5 class="text-[1.2rem] mb-[10px]">退房時間</h5>
                <p v-timeFormat="reserveHotelInfo?.date?.checkoutTime"></p>
              </div>
            </div>
            <p class="text-center my-2 text-[1.2rem] border-b-2 border-darkLight pb-[12px]">
              {{ reserveHotelInfo.day }}晚
            </p>
            <div>
              <div class="my-4 flex justify-between text-[1.5rem]">
                <h4>{{ reserveHotelInfo?.roomTypeInfo.name }}</h4>
                <h4>x1</h4>
              </div>
              <p class="text-[0.8rem] mb-4">最多可容納 1 成人、2小孩</p>
              <h6 class="mb-3 text-[1.2rem] font-bold">免費設施</h6>
              <div class="flex flex-wrap">
                <p v-for="(service, i) in $route.query.service" :key="i" class="text-[0.8rem] w-[50%] mb-[10px]">
                  <font-awesome-icon :icon="icon(service as string)" class="mr-1" />
                  <span>{{ service }}</span>
                </p>
              </div>
            </div>
          </client-only>
        </div>
        <div class="border-2 border-darkLight p-4 pb-2">
          <h3 class="text-[1.5rem] font-bold mb-[15px] text-center">價格明細</h3>
          <client-only>
            <div class="border-b-2 border-darkLight">
              <div class="flex justify-between mb-[15px]">
                <p>{{ reserveHotelInfo?.roomTypeInfo.name }}x1</p>
                <p>{{ reserveHotelInfo?.roomTypeInfo.price }}</p>
              </div>
              <div class="flex justify-between mb-[15px]">
                <p>20%加值稅</p>
                <p>{{ Number(reserveHotelInfo?.roomTypeInfo.price) * 0.2 }}</p>
              </div>
              <div class="flex justify-between mb-[15px]">
                <p>10% 客房服務</p>
                <p>{{ Number(reserveHotelInfo?.roomTypeInfo.price) * 0.1 }}</p>
              </div>
              <div class="flex justify-between mb-[15px]">
                <p>手續費</p>
                <p class="text-success">免費</p>
              </div>
              <div class="flex justify-between mb-[15px]">
                <p>折扣</p>
                <p>{{ reserveHotelInfo?.discount }}%</p>
              </div>
            </div>
            <div class="flex justify-content-between font-bold text-[1.2rem] items-center mt-3">
              <p>總計</p>
              <p>{{ reserveHotelInfo?.paid }}</p>
            </div>
          </client-only>
        </div>
      </div>
      <div class="border border-darkLight p-4 lg:col-[3_/_6] col-[1_/_6]">
        <h3 class="text-[1.5rem] text-center mb-[20px] font-bold">房客資訊</h3>
        <!-- @submit.prevent="submit" -->
        <form @submit.prevent="submit">
          <div class="flex items-center justify-between mb-[20px]">
            <div class="w-[47%]">
              <BaseInput
                label="姓氏"
                v-model="lastName"
                :error="errors.lastName"
                placeholder="請填入您的姓氏"
                type="text"
                class="w-full"
              />
            </div>
            <div class="w-[47%]">
              <BaseInput
                label="名字"
                v-model="firstName"
                :error="errors.firstName"
                placeholder="請填入您的姓字"
                type="text"
                class="w-full"
              />
            </div>
          </div>
          <div class="mb-[20px]">
            <BaseInput
              label="電子信箱"
              v-model="email"
              :error="errors.email"
              placeholder="請填入您的電子信箱"
              type="text"
              class="w-full"
            />
          </div>
          <div class="mb-[20px]">
            <BaseInput
              label="手機號碼"
              class="w-full"
              v-model="phone"
              placeholder="請填入您的手機號碼"
              type="text"
              :error="errors.phone"
            />
          </div>
          <div class="mb-[20px]">
            <BaseInput
              label="優惠碼"
              v-model="coupon"
              placeholder="請填入您的優惠碼"
              type="text"
              :error="errors.coupon"
              class="w-full"
              :buttonEvent="getCoupon"
              :button-text="'輸入'"
            />
          </div>
          <fieldset class="mb-[20px]">
            <legend>是否為商務旅遊</legend>
            <BaseRadio label="是" :value="true" v-model="isBusiness" name="business" :error="errors.isBusiness" />
            <BaseRadio label="否" :value="false" v-model="isBusiness" name="business" :error="errors.isBusiness" />
          </fieldset>
          <BaseTextarea
            label="特殊需求"
            v-model="asking"
            placeholder="請輸入您的想告知飯店的特殊需求"
            :error="errors.isBusiness"
            class="w-full mb-[20px]"
          />
          <Button class="button__primary float-right w-[20%]" type="submit">送出</Button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~~/components/form/BaseInput.vue';
import BaseRadio from '~~/components/form/BaseRadio.vue';
import BaseTextarea from '~~/components/form/BaseTextarea.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import icon from '~~/utils/icon';
import { useField, useForm } from 'vee-validate';
import * as validate from '~~/utils/validate';
import Button from '~~/components/Button.vue';

const router = useRouter();

const { useBooking } = useStore();

const bookingStore = useBooking();
const { bookingForm, reserveHotelInfo } = storeToRefs(bookingStore);
const { setBookingForm } = bookingStore;

const initialValues = {
  lastName: bookingForm.value?.lastName ?? '',
  firstName: bookingForm.value?.firstName ?? '',
  email: bookingForm.value?.email ?? '',
  coupon: bookingForm.value?.coupon ?? '',
  phone: bookingForm.value?.phone ?? '',
  isBusiness: bookingForm.value?.isBusiness ?? false,
  asking: bookingForm.value?.asking ?? ''
};

const validationSchema = {
  lastName: validate.lastName,
  firstName: validate.firstName,
  email: validate.email,
  phone: validate.phone
};

// 表單驗證
const formValidate = useForm({
  validationSchema,
  initialValues
});

const { handleSubmit, errors } = formValidate;

const { value: lastName } = useField('lastName', undefined, { initialValue: '' });
const { value: firstName } = useField('firstName', undefined, { initialValue: '' });
const { value: email } = useField('email', undefined, { initialValue: '' });
const { value: coupon } = useField('coupon', undefined, { initialValue: '' });
const { value: phone } = useField('phone', undefined, { initialValue: '' });
const { value: isBusiness } = useField('isBusiness', undefined, { initialValue: false });
const { value: asking } = useField('asking', undefined, { initialValue: '' });

const submit = handleSubmit(() => {
  const form = {
    lastName: lastName.value,
    firstName: firstName.value,
    email: email.value,
    coupon: coupon.value,
    phone: phone.value,
    isBusiness: isBusiness.value,
    asking: asking.value
  };

  setBookingForm(form);
  router.push('/booking/confirm');
});

const getCoupon = () => {
  console.log('getCoupon');
};
</script>
