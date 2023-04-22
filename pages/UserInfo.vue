<template>
  <div>
    <h2
      class="font-bold lg:text-[2rem] text-[1.8rem] h-[5rem] sticky top-[6.5rem] bg-white left-0 flex items-center justify-center mb-[40px]"
    >
      個人資訊
    </h2>
    <form class="mx-auto w-[40%]" @submit.prevent="submit">
      <div class="flex justify-between mb-[40px]">
        <p>帳號</p>
        <p>{{ tempUserInfo?.account }}</p>
      </div>
      <div class="flex justify-between mb-[40px]">
        <p>用戶名稱</p>
        <p>{{ tempUserInfo?.name }}</p>
      </div>
      <div class="flex justify-between mb-[40px]">
        <p>身分證</p>
        <p>{{ tempUserInfo.identityId }}</p>
      </div>
      <div class="mb-[40px] flex justify-between flex-wrap" v-if="isUpdate">
        <BaseSelect label="性別" v-model="gender" :options="genderOptions"></BaseSelect>
        <p class="text-red-500 font-bold mt-[20px] w-full text-end">{{ errors.gender }}</p>
      </div>
      <div class="flex justify-between mb-[40px]" v-else>
        <p>性別</p>
        <p>{{ tempUserInfo.gender === 'male' ? '男' : '女' }}</p>
      </div>
      <div class="mb-[40px] flex justify-between flex-wrap" v-if="isUpdate">
        <BaseInput label="電話" v-model="phone" class="text-end w-auto"></BaseInput>
        <p class="text-red-500 font-bold mt-[20px] w-full text-end">{{ errors.phone }}</p>
      </div>
      <div class="flex justify-between mb-[40px]" v-else>
        <p>電話</p>
        <p>{{ tempUserInfo.phone }}</p>
      </div>
      <div class="flex justify-between mb-[40px]">
        <p>電子郵件</p>
        <p>{{ tempUserInfo?.email }}</p>
      </div>
      <div class="mb-[40px] flex justify-between flex-wrap" v-if="isUpdate">
        <BaseInput label="居住國家" v-model="country" class="text-end w-auto"></BaseInput>
        <p class="text-red-500 font-bold mt-[20px] w-full text-end">{{ errors.country }}</p>
      </div>
      <div class="flex justify-between mb-[40px]" v-else>
        <p>居住國家</p>
        <p>{{ tempUserInfo?.country }}</p>
      </div>
      <div class="mb-[40px] flex justify-between flex-wrap" v-if="isUpdate">
        <BaseInput label="地址" v-model="address" class="text-end w-auto"></BaseInput>
        <p class="text-red-500 font-bold mt-[20px] w-full text-end">{{ errors.address }}</p>
      </div>
      <div class="flex justify-between mb-[40px]" v-else>
        <p>地址</p>
        <p>{{ tempUserInfo?.address }}</p>
      </div>
      <div class="flex justify-between border-t-2 border-darkLight pt-[15px]">
        <Button type="button" @click="openUpdate" bg-color="button__secondary" class="w-[100px]">{{
          isUpdate ? '取消' : '修改'
        }}</Button>
        <Button type="submit" class="w-[100px]">送出</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';
import BaseInput from '~~/components/form/BaseInput.vue';
import BaseSelect from '~~/components/form/BaseSelect.vue';
import { getUserApi, updateUserApi } from '~~/api/auth';
import { useField, useForm } from 'vee-validate';
import * as validate from '~~/utils/validate';

const { useMessage } = useStore();
const msgStore = useMessage();
const { openMsg } = msgStore;

const { data: userInfoData } = await useAsyncData('getUserInfo', () => getUserApi());

if (!userInfoData.value?.data) {
  throw createError({
    statusCode: 500,
    statusMessage: '系統錯誤'
  });
}

const tempUserInfo = ref({ ...userInfoData.value.data.data });

const genderOptions = ref([
  {
    value: 'male',
    content: '男'
  },
  {
    value: 'female',
    content: '女'
  }
]);

const isUpdate = ref(false);

const openUpdate = () => {
  isUpdate.value = !isUpdate.value;

  if (!isUpdate.value) {
    gender.value = tempUserInfo.value.gender;
    address.value = tempUserInfo.value.address;
    country.value = tempUserInfo.value.country;
    phone.value = tempUserInfo.value.phone;
  }
};

const validationSchema = {
  gender: validate.gender,
  address: validate.address,
  country: validate.country,
  phone: validate.phone
};

const initialValues = {
  gender: tempUserInfo.value.gender,
  address: tempUserInfo.value.address,
  country: tempUserInfo.value.country,
  phone: tempUserInfo.value.phone
};

const formValidate = useForm({
  validationSchema,
  initialValues
});

const { handleSubmit, errors } = formValidate;

const { value: gender } = useField<string>('gender');
const { value: address } = useField<string>('address');
const { value: country } = useField<string>('country');
const { value: phone } = useField<string>('phone');

const submit = handleSubmit(async (values) => {
  const { id } = tempUserInfo.value;

  try {
    const updateData = await updateUserApi(id, {
      gender: gender.value,
      address: address.value,
      country: country.value,
      phone: phone.value
    });

    console.log(updateData);

    tempUserInfo.value = { ...updateData.data?.data };
    console.log(tempUserInfo.value, updateData.data?.data);
    openUpdate();

    // gender.value = updateData.data?.data?.gender;
    // address.value = updateData.data?.data?.address;
    // country.value = updateData.data?.data?.country;
    // phone.value = updateData.data?.data?.phone;

    isUpdate.value = false;
  } catch (error) {
    openUpdate();
  }
});
</script>
