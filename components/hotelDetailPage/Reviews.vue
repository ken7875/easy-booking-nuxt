<template>
  <Slider
    :data="reviews"
    :noDataText="'暫無評論'"
    :slide-item-width="'flex-[50%_0_0]'"
    :spacing="'ml-[calc(-50%*1.5)]'"
    :buttonWidth="'w-[55%]'"
    :buttonPosition="'top-[45%] left-[50%] translate-x-[calc(-50%-8px)]'"
  >
    <template #swiperItem="{ slideItem }">
      <Card class="w-[calc(100%-16px)]">
        <template #header>
          <div class="bg-darkLight h-[50px] p-[15px]">
            <p>{{ slideItem.rating }}</p>
          </div>
        </template>
        <template #body>
          <div class="h-[100px] p-[15px]">
            <p>{{ slideItem.review }}</p>
          </div>
        </template>
      </Card>
    </template>
  </Slider>
</template>

<script setup lang="ts">
import Slider from '~~/components/slider/slider.vue';
import { Review } from '~~/model/hotel';

interface Props {
  reviews: Review[];
}
defineProps<Props>();
</script>
