<template>
  <div>
    <header class="sticky top-0 left-0 z-navbar">
      <Navbar />
    </header>
    <main class="h-fit">
      <slot />
    </main>
  </div>
</template>

<script setup>
import '~~/assets/css/tailwinds.css';
import Navbar from './components/Navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showFooter = computed(() => route.path.includes('auth'));
</script>
