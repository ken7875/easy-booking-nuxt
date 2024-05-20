<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Message v-if="content" />
  <Teleport to="body">
    <TransitionPage v-if="showTransitionPage" v-model:showTransitionPage="showTransitionPage" />
  </Teleport>
</template>

<script setup lang="ts">
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

const { useMessage, useAuth } = useStore();

const messageStore = useMessage();
const { content } = storeToRefs(messageStore);

const authStore = useAuth();
authStore.$patch({
  token: useCookie('easy-booking-token').value
});

const showTransitionPage = ref(false);

watch(
  () => route.path,
  () => {
    showTransitionPage.value = true;
    // toggleModal(false);
  }
);
</script>
