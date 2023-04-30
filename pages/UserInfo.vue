<template>
  <div class="mb-[30px]">
    <h2
      class="font-bold lg:text-[2rem] text-[1.8rem] h-[5rem] sticky top-[6.5rem] bg-white left-0 flex items-center justify-center mb-[40px]"
    >
      個人資訊
    </h2>
    <div class="mb-[30px]">
      <div class="relative lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] overflow-hidden rounded-[50%] mx-auto">
        <form class="w-full h-full">
          <label for="customFile" class="w-full h-full text-white text-[1rem] block cursor-pointer relative">
            <img :src="(avatar as string)" alt="avatar" v-if="avatar" />
            <div class="w-full h-full bg-darkLight flex justify-center items-center" v-else>
              <client-only>
                <font-awesome-icon icon="user-large" class="text-[#ccccccc7] lg:text-[5rem] text-[3.5rem]" />
              </client-only>
            </div>
            <div
              class="absolute left-0 bottom-0 w-full lg:h-[40px] h-[30px] bg-[rgba(0,0,0,0.7)] flex justify-center items-center"
            >
              <p class="text-[1rem] text-white font-bold">更換頭貼</p>
            </div>
          </label>
          <input class="hidden" id="customFile" ref="fileDom" type="file" accept="image/*" @change="choosePhoto" />
        </form>
      </div>
    </div>
    <form class="mx-auto lg:w-[40%] w-full px-[30px]" @submit.prevent="submit">
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
import { object } from 'yup';
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: 'auth'
});

const { useMessage, useAuth, useModal } = useStore();

const msgStore = useMessage();
const { openMsg } = msgStore;

const { data: userInfoData } = await useAsyncData('getUserInfo', () => getUserApi());

if (!userInfoData.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Something going wrong QQ!'
  });
}

const tempUserInfo = ref({ ...userInfoData.value?.data.data });

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

const validationSchema = object({
  gender: validate.gender,
  address: validate.address,
  country: validate.country,
  phone: validate.phone
});

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

    isUpdate.value = false;
  } catch (error) {
    openUpdate();
  }
});

// 上傳頭貼功能
const tempPhoto = ref<string | ArrayBuffer | null | undefined>('');

const authStore = useAuth();
const { avatar } = storeToRefs(authStore);

const modalStore = useModal();
const { toggleModal, modalType } = modalStore;

const choosePhoto = (e: any) => {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(file);
  transToFormData(file);

  reader.onload = (e) => {
    tempPhoto.value = e.target?.result;
    if (tempPhoto.value) {
      authStore.$patch({
        checkImg: tempPhoto.value
      });
      toggleModal(true);
      modalType({ components: 'UploadImageModal', width: '30%' });
    } else {
      openMsg({
        title: '錯誤',
        content: '照片上傳失敗'
      });
    }
  };
};

const transToFormData = async (file: Blob) => {
  const createFile = new FormData();
  createFile.append('photo', file);

  authStore.$patch({
    formData: createFile
  });
};
</script>
