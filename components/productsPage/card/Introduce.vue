<template>
  <div>
    <p>{{ singleProducts[0].description }}</p>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'Introduce',
  setup() {
    const singleProducts = inject('singleProducts');

    return { singleProducts };
  }
};
</script>

<style></style>
