<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <client-only>
    <Modal />
  </client-only>
</template>

<script setup lang="ts">
import Modal from './components/modal/index.vue';

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
    }
  ]
});
</script>
