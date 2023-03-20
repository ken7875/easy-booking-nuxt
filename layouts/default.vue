<template>
  <div>
    <header class="sticky top-0 left-0 z-navbar">
      <Navbar />
    </header>
    <main class="h-fit">
      <slot />
    </main>
    <footer>456</footer>
  </div>
</template>

<script setup>
import '~~/assets/css/tailwinds.css';
import Navbar from './components/Navbar.vue';
</script>
