<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <client-only>
    <Modal v-if="isModalOpen" />
  </client-only>
  <Message v-if="content" />
</template>

<script setup lang="ts">
import Modal from './components/modal/index.vue';
import Message from './components/Message.vue';
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import { tokenCookie } from '~~/utils/cookies';

useHead({
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
const authStore = useAuth();
authStore.$patch({
  token: tokenCookie.getTokenCookie()
});
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
