<template>
  <div>
    <div
      v-if="isDesktop"
      :class="['w-full grid grid-cols-5 auto-rows-auto gap-x-[15px] gap-y-[15px] my-[50px]', height]"
    >
      <div
        class="bg-center bg-cover bg-no-repeat col-[1_/_4] row-[1_/_5]"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[0]})` }"
      ></div>
      <div
        class="bg-center bg-cover bg-no-repeat col-[4_/_6] row-[1_/_3]"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[1]})` }"
      ></div>
      <div
        class="bg-center bg-cover bg-no-repeat col-[4_/_5] row-[3_/_4]"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[2]})` }"
      ></div>
      <div
        class="bg-center bg-cover bg-no-repeat col-[5_/_6] row-[3_/_4]"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[3]})` }"
      ></div>
      <div
        class="bg-center bg-cover bg-no-repeat col-[4_/_5] row-[4_/_5]"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[4]})` }"
      ></div>
      <div
        class="bg-center bg-cover bg-no-repeat col-[5_/_6] row-[4_/_5] relative hover:pointer"
        :style="{ backgroundImage: `url(${hotelDetailData?.images[5]})` }"
      >
        <div
          class="flex items-center justify-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] h-full w-full hover:cursor-pointer"
        >
          <p class="text-[1.25rem] text-white">查看更多</p>
        </div>
      </div>
    </div>
    <div class="overflow-hidden" v-else>
      <Slider
        :data="hotelDetailData?.images"
        :slide-item-width="'flex-[calc(100%)_0_0]'"
        :spacing="'ml-[-200%]'"
        :buttonPosition="'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'"
        :buttonWidth="'w-full'"
        class="h-[250px]"
      >
        <template #swiperItem="{ slideItem, index }">
          <img :src="slideItem.item" :alt="`${hotelDetailData?.name}${index}`" class="w-[100%] h-full" />
          <!-- <p>{{ slideItem }} {{ index }}</p> -->
        </template>
      </Slider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Hotel } from '~~/model/hotel';

defineProps<{
  hotelDetailData: Hotel | null;
  height: string;
}>();

const { isDesktop } = useDevice();
</script>
