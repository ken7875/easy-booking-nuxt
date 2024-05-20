<template>
  <div>
    <picture class="w-screen h-screen">
      <source media="(min-width: 800px;)" srcset="/img/canada.jpg 500w, /img/airplane.jpg 600w" />
      <source media="(min-width: 500px;)" srcset="/img/canada.jpg 500w, /img/china.jpg 600w" />
      <img src="/img/cars.jpg" alt="test" />
    </picture>
    <!-- <img src="/img/airplane.jpg" srcset="/img/airplane.jpg 1x /img/china.jpg 2x /img/canada.jpg 3x" /> -->
  </div>
</template>
