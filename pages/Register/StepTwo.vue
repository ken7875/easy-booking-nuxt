<template>
  <div>
    <form @submit.prevent="submit">
      <div class="mb-[40px]">
        <BaseInput v-model.trim="name" :error="errors.name" label="用戶名稱" placeholder="請輸入密碼" />
      </div>
      <div class="mb-[40px]">
        <BaseInput v-model.trim="identityId" :error="errors.identityId" label="身分證" placeholder="請輸入帳號" />
      </div>
      <div class="mb-[40px]">
        <BaseInput v-model.trim="phone" :error="errors.phone" label="電話" placeholder="請輸入電話號碼" />
      </div>
      <div class="mb-[40px]">
        <BaseInput v-model.trim="country" :error="errors.country" label="居住城市" placeholder="請輸入居住城市" />
      </div>
      <div class="mb-[40px]">
        <BaseInput v-model.trim="address" :error="errors.address" label="居住地址" placeholder="請輸入居住地址" />
      </div>
      <div class="mb-[40px]">
        <BaseInput v-model.trim="email" :error="errors.email" label="電子信箱" placeholder="請輸入電子信箱" />
      </div>
      <div class="mb-[40px]">
        <BaseSelect
          v-model.trim="gender"
          :error="errors.gender"
          :options="genderOptions"
          label="性別"
          placeholder="請選擇性別"
        />
      </div>
      <div class="flex justify-between">
        <NuxtLink to="/Register/StepOne">上一步</NuxtLink>
        <Button type="submit">送出</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as validate from '~~/utils/validate';
import { object } from 'yup';
import { signUpSessionStorage } from '~~/utils/storage';
import { StepTwoSignUpInfo } from '~~/model/auth';
import BaseInput from '~~/components/form/BaseInput.vue';
import BaseSelect from '~~/components/form/BaseSelect.vue';
import { signUpApi } from '~~/api/auth';
import { useStore } from '~~/store/index';

const { useMessage, useAuth } = useStore();

const router = useRouter();

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

const initialValues = {
  gender: 'male',
  phone: '',
  country: '',
  address: '',
  identityId: '',
  email: '',
  name: ''
};

const validationSchema = object({
  gender: validate.gender,
  phone: validate.phone,
  country: validate.country,
  address: validate.address,
  identityId: validate.identityIdValidate,
  name: validate.userName,
  email: validate.email
});

// 表單驗證
const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues
});

const { value: gender } = useField<string>('gender');
const { value: phone } = useField<string>('phone');
const { value: country } = useField<string>('country');
const { value: address } = useField<string>('address');
const { value: identityId } = useField<string>('identityId');
const { value: name } = useField<string>('name');
const { value: email } = useField<string>('email');

const msgStore = useMessage();
const { openMsg } = msgStore;

const authStore = useAuth();
const { login } = authStore;

const submit = handleSubmit(async (values) => {
  const signUpStorage = signUpSessionStorage().getItem();

  if (!signUpStorage) {
    openMsg({
      content: '請確認欄位是否正確'
    });
    return;
  }
  const { account, password, confirmPassword } = signUpStorage;
  await signUpApi({
    account,
    password,
    confirmPassword,
    ...values
  });

  signUpSessionStorage().removeItem();

  await login({ account, password });

  router.push('/');
});
</script>
