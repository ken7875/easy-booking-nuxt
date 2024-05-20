<template>
  <div>
    <ModalLayout>
      <template #title>
        <p>附近的景點</p>
      </template>
      <template #default>
        <ViewPorts :view-ports="hotelDetailData?.viewPorts || []" />
      </template>
    </ModalLayout>
  </div>
</template>

<script setup lang="ts">
import ModalLayout from '~~/components/modal/index.vue';
import ViewPorts from './ViewPorts.vue';
import { getProductApi } from '~~/api/hotel';
import { type Hotel } from '~~/model/hotel';

const route = useRoute();

const hotelId = ref<string>(route.params.id as string);
const { data: hotelDetail, pending } = await useAsyncData('hotelDetail', () => getProductApi<Hotel>(hotelId.value));

const hotelDetailData = ref(hotelDetail.value?.data?.data);
</script>
