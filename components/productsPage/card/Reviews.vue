<template>
  <div>
    <ul v-if="reviewsData && reviewsData.length > 0">
      <li v-for="review in reviewsData" :key="review._id" class="border-b border-darkLight mb-[15px]">
        <p class="mb-[10px]">{{ review.user?.name }}</p>
        <div class="mb-[10px]">
          <div class="flex items-center mb-[8px]">
            <p class="mr-[8px]">評分:</p>
            <div
              class="mr-[5px] h-[18px] bg-contain bg-[url('/img/star.png')]"
              :style="{ width: `${review?.rating ? 18 * review?.rating : 0}px` }"
            ></div>
            <p>({{ review.rating }})</p>
          </div>
          <p>{{ review.review }}</p>
        </div>
        <div class="flex justify-end">
          <p class="mr-[5px]">評論時間:</p>
          <p v-timeFormat="review.createAt"></p>
        </div>
      </li>
    </ul>
    <div class="flex jusitfy-center items-center" v-else>
      <p>暫無評論</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductApi } from '~~/api/hotel';
import { type Hotel } from '~~/model/hotel';

interface Props {
  id: string;
}
const props = defineProps<Props>();

const { data } = await useAsyncData('reviews', () => getProductApi<Hotel>(props.id));

const reviewsData = ref(data.value?.data.data?.reviews);
</script>
