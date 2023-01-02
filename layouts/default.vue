<template>
  <div>
    <header>
      <Navbar />
    </header>
    <slot />
    <footer>456</footer>
  </div>
</template>

<script setup>
import '@/assets/css/tailwinds.css';
import Navbar from './components/navbar.vue';
</script>
