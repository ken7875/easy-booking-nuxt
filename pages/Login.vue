<template>
  <div class="flex items-center h-[calc(100vh-6.5rem)] bg-[url('/img/usa.jpg')] bg-center lg:bg-none">
    <div class="lg:w-[60%] w-full h-full relative">
      <div
        v-for="item in carouselItem"
        :key="item.id"
        class="w-full h-full absolute top-0 left-0"
        :ref="getCarouselRef"
      >
        <div
          class="relative bg-center bg-cover bg-no-repeat w-full h-full"
          :style="{ backgroundImage: `url(/img/${item.image}.jpg)` }"
        >
          <span class="absolute bottom-[15px] right-[15px] text-white bg-gray px-4 py-2 bg-black rounded-[30px]">
            <client-only>
              <font-awesome-icon icon="location-dot" />
            </client-only>
            <p class="inline ml-2 mb-0">{{ item.location }}</p>
          </span>
        </div>
      </div>
    </div>
    <div class="lg:w-[40%] w-[100%] py-0 px-[50px] absolute lg:static">
      <h1 class="font-bold text-[2rem] mb-[20px] text-center">登入</h1>
      <form class="w-full" @submit.prevent="login">
        <div class="mb-[30px]">
          <BaseInput
            label="帳號"
            v-model="account"
            placeholder="請填入您的帳號"
            class="w-full h-[50px]"
            :error="errors.account || ''"
          />
        </div>
        <client-only>
          <BaseInput
            label="密碼"
            v-model="password"
            placeholder="請填入您的密碼"
            type="password"
            class="w-full mb-[30px] h-[50px]"
            :error="errors.password || ''"
          />
        </client-only>
        <!-- <p>
          By signing in or creating an account, you agree with our
          <a href="javascript:;" class="text-[#007bff]">Terms & Conditions</a> and
          <a href="javascript:;" class="text-[#007bff]">Privacy Statement</a>
        </p> -->
        <!-- <BaseCheckbox label="記住我" v-model="remember" placeholder="請填入您的密碼" type="password" /> -->
        <Button class="button button__primary w-full mt-5" type="submit">登入</Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~~/components/form/BaseInput.vue';
import Button from '~~/components/Button.vue';
// import BaseCheckbox from '~~/components/form/BaseCheckbox.vue';
import { loginApi } from '~~/api/auth';
import { LoginForm, UserInfo } from '~~/model/auth';
import { useRouter } from 'vue-router';
import { useStore } from '~~/store/index';
import { tokenCookie } from '~~/utils/cookies';
import gsap from 'gsap';
import type { ComponentPublicInstance } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object } from 'yup';
import { loginAcValidate, passwordValidate } from '~~/utils/validate';

const router = useRouter();

const carouselItem = [
  {
    image: 'canada',
    location: 'Ottawa, Canada',
    id: 0
  },
  {
    image: 'taiwan',
    location: 'Taipei, Taiwan',
    id: 1
  },
  {
    image: 'japan',
    location: 'Kyoto, Japan',
    id: 2
  },
  {
    image: 'korea',
    location: 'Soeul, Korea',
    id: 3
  },
  {
    image: 'usa',
    location: 'New York, Usa',
    id: 4
  },
  {
    image: 'china',
    location: 'Beijin, China',
    id: 5
  }
];

// const loginForm = reactive<LoginForm>({
//   account: '',
//   password: ''
// });

const remember = ref(false);

const { useAuth } = useStore();
const authStore = useAuth();

const validationSchema = object({
  account: loginAcValidate,
  password: passwordValidate
});

const { handleSubmit, errors } = useForm({
  validationSchema
});

const { value: account } = useField<string>('account', undefined, { initialValue: '' });
const { value: password } = useField<string>('password', undefined, { initialValue: '' });

const login = async () => {
  handleSubmit(async (values) => {
    console.log(values);
    try {
      const loginRes = await loginApi({ account: account.value, password: password.value });
      const userInfo = loginRes.data.user;
      const token = loginRes.token;

      tokenCookie.setTokenCookie(token);

      authStore.$patch({
        token,
        userInfo
      });

      router.push('/Booking');
    } catch (error) {
      console.log(error);
    }
  })();
};

const carouselAryRef = ref<(ComponentPublicInstance<any> | Element)[]>([]);
const getCarouselRef = (el: ComponentPublicInstance<any> | Element) => {
  carouselAryRef.value.push(el);
};
let tl: GSAPTimeline | null = gsap.timeline({ repeat: -1 });

const fadeAnimation = () => {
  tl?.fromTo(carouselAryRef.value[0], { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 });
  tl?.fromTo(carouselAryRef.value[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, '<');
  tl?.fromTo(carouselAryRef.value[1], { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 });
  tl?.fromTo(carouselAryRef.value[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, '<');
  tl?.fromTo(carouselAryRef.value[2], { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 });
  tl?.fromTo(carouselAryRef.value[3], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, '<');
  tl?.fromTo(carouselAryRef.value[3], { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 });
  tl?.fromTo(carouselAryRef.value[4], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, '<');
  tl?.fromTo(carouselAryRef.value[4], { autoAlpha: 1 }, { autoAlpha: 0, duration: 4 });
  tl?.fromTo(carouselAryRef.value[5], { autoAlpha: 0 }, { autoAlpha: 1, duration: 4 }, '<');
};

const { isDesktop } = useDevice();

onMounted(() => {
  carouselAryRef.value.forEach((item) => {
    tl?.set(item, { opacity: 0 });
  });
  if (isDesktop) {
    fadeAnimation();
  }
});

onBeforeUnmount(() => {
  carouselAryRef.value = [];
  tl?.kill();
  tl = null;
});
</script>
