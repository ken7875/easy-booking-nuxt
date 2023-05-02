<template>
  <div class="mb-[40px]">
    <h2 class="text-center text-[1.5rem] mb-[25px]">填寫帳號密碼</h2>
    <form @submit.prevent="submit">
      <div class="mb-[40px]">
        <BaseInput v-model.trim="account" :error="errors.account" label="帳號" placeholder="請輸入帳號" />
      </div>
      <div class="mb-[40px]">
        <BaseInput
          v-model.trim="password"
          :error="errors.password"
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
        />
      </div>
      <div class="mb-[40px]">
        <BaseInput
          v-model.trim="confirmPassword"
          :error="errors.confirmPassword"
          label="確認密碼"
          placeholder="請再次輸入密碼"
          type="password"
        />
      </div>
      <div class="flex justify-center">
        <Button type="submit">送出</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~~/components/form/BaseInput.vue';
import Button from '~~/components/Button.vue';
import { useField, useForm } from 'vee-validate';
import { loginAcValidate, passwordValidate, passwordConfirmValidate } from '~~/utils/validate';
import { object } from 'yup';
import { signUpSessionStorage } from '~~/utils/storage';
import { StepOneSignUpInfo } from '~~/model/auth';

const router = useRouter();

const initialValues: StepOneSignUpInfo = {
  account: '',
  password: '',
  confirmPassword: ''
};

onMounted(() => {
  const signUpStorage = signUpSessionStorage().getItem();

  if (signUpStorage) {
    account.value = signUpStorage['account'];
    password.value = signUpStorage['password'];
    confirmPassword.value = signUpStorage['confirmPassword'];
  }
});

const validationSchema = object({
  account: loginAcValidate,
  password: passwordValidate,
  confirmPassword: passwordConfirmValidate('password')
});

// 表單驗證
const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues
});

const { value: account } = useField<string>('account');
const { value: password } = useField<string>('password');
const { value: confirmPassword } = useField<string>('confirmPassword');

const submit = handleSubmit(() => {
  const signUpValue = {
    account: account.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  };

  signUpSessionStorage().setItem(signUpValue);

  router.push('/Register/StepTwo');
});
</script>
