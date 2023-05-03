<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <client-only>
    <Modal v-if="isModalOpen" />
  </client-only>
  <Message v-if="content" />
  <TransitionPage v-if="showTansitionPage" v-model:showTansitionPage="showTansitionPage" />
</template>

<script setup lang="ts">
import Modal from './components/modal/index.vue';
import Message from './components/Message.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import TransitionPage from './components/TransitionPage.vue';

const route = useRoute();

useHead({
  title: 'Easy Booking',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Welcome to Easy Booking' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
    }
  ]
});

const { useMessage, useAuth, useModal } = useStore();

const messageStore = useMessage();
const { content } = storeToRefs(messageStore);

const modalStore = useModal();
const { isModalOpen } = storeToRefs(modalStore);
const { toggleModal } = modalStore;

const authStore = useAuth();
authStore.$patch({
  token: useCookie('easy-booking-token').value
});

const htmlDom = process.client ? document.querySelector('html') : null;
const showTansitionPage = ref(false);

watch([isModalOpen, showTansitionPage], (val) => {
  console.log(showTansitionPage.value);
  if (htmlDom) {
    if (val[0] || val[1]) {
      htmlDom.style.overflowY = 'hidden';
    } else {
      htmlDom.style.overflowY = 'unset';
    }
  }
});

watch(
  () => route.path,
  () => {
    showTansitionPage.value = true;
    toggleModal(false);
  }
);
</script>
