<template>
  <div class="lg:flex lg:items-center">
    <h2 class="mr-3 text-[2rem]">{{ hotelDetailData?.name }}</h2>
    <div class="flex items-center">
      <div
        class="mr-[8px] h-[18px] bg-contain bg-[url('/img/star.png')]"
        :style="{ width: `${hotelDetailData?.stars ? 18 * hotelDetailData?.stars : 0}px` }"
      ></div>
      <span>({{ hotelDetailData?.ratingAverage }})</span>
    </div>
  </div>
  <span v-textSlice:[sliceNum]="hotelDetailData?.description"></span>
  <template v-if="hotelDetailData?.description && hotelDetailData?.description.length > 315">
    <span v-show="!isTextShow">...</span>
    <span class="text-secondary ml-[5px] cursor-pointer" @click="seeMore">{{
      !isTextShow ? '閱讀更多' : '隱藏內容'
    }}</span>
  </template>
  <div class="border border-darkLight px-[15px] mt-[20px]">
    <h3 class="text-[1.3rem] mb-[8px]">免費設施</h3>
    <div class="flex flex-wrap">
      <p v-for="(service, i) in hotelDetailData?.service" :key="i" class="mb-0 mr-[20px]">
        <client-only>
          <font-awesome-icon :icon="icon(service)" class="mr-2" />
        </client-only>
        <span>{{ service }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Hotel } from '~~/model/hotel';
import icon from '~~/utils/icon';

const props = defineProps<{
  hotelDetailData: Hotel | null;
}>();

const sliceNum = ref(315);
const isTextShow = ref(false);

const seeMore = () => {
  isTextShow.value = !isTextShow.value;
  if (isTextShow.value) {
    sliceNum.value = props.hotelDetailData?.description?.toString()?.length as number;
  } else {
    sliceNum.value = 315;
  }
};
</script>
