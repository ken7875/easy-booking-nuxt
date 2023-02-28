<template>
  <div class="grid grid-cols-4 gap-x-[10px] auto-rows-[150px]">
    <div v-for="(image, i) in singleProducts[0].images" :key="i" class="img-wrap">
      <img :src="image" alt="image" />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'images',
  setup() {
    const singleProducts = inject('singleProducts');

    return { singleProducts };
  }
};
</script>

<!-- <style lang="scss" scoped>
.allImg {
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-auto-rows: 150px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  .img-wrap {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style> -->
