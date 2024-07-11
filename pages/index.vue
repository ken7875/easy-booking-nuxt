<template>
  <div class="w-full overflow-x-hidden wrap" ref="wrap">
    <!-- class="h-screen w-full z-[100] pt-[6.5rem] relative" -->
    <section ref="AirplaneTick" class="h-screen overflow-x-hidden">
      <AirplaneTick />
    </section>
    <section ref="hotProducts" class="h-screen overflow-x-hidden">
      <HotProducts />
    </section>
    <section ref="allService" class="h-screen overflow-x-hidden">
      <AllService />
    </section>
    <section ref="waterfull" class="h-screen overflow-x-hidden">
      <Waterfull />
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Easy Booking home page',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Welcome to Easy Booking home page' }
  ]
});

definePageMeta({
  layout: 'home'
});
</script>

<style scoped>
section {
  scroll-snap-align: start;
}
</style>
