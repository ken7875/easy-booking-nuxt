<template>
  <div class="w-full overflow-x-hidden wrap" ref="wrap">
    <!-- class="h-screen w-full z-[100] pt-[6.5rem] relative" -->
    <!-- <section class="h-screen overflow-hidden">
      <client-only>
        <HotCountry></HotCountry>
      </client-only>
    </section> -->
    <section ref="hotProducts" class="h-screen overflow-hidden">
      <HotProducts />
    </section>
    <section ref="allService" class="h-screen overflow-hidden">
      <AllService />
    </section>
    <section ref="waterfull" class="h-screen overflow-hidden">
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

// ****** full page scroll ******
const wrap = ref();
const pageSection = ref(0);

const scrollHandler = (e: WheelEvent) => {
  const html = document.getElementsByTagName('html')[0];
  e.preventDefault();
  e.stopPropagation();

  if (e.deltaY > 0) {
    pageSection.value++;
  } else if (e.deltaY < 0) {
    pageSection.value--;
  }

  html?.scrollTo({
    top: window.innerHeight * pageSection.value,
    behavior: 'smooth' // 平滑滾動效果
  });
};

onMounted(() => {
  wrap.value.addEventListener('wheel', scrollHandler);
});
// ****** full page scroll ******
</script>

<style scoped>
section {
  scroll-snap-align: start;
}
</style>
