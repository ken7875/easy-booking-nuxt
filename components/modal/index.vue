<template>
  <div>
    <component :is="dyComp"></component>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useModal } from '~~/store/modal';
import FilterModal from '~~/components/filterTool/FilterModal.vue';
import Leaflet from '~~/components/LeafletModal.vue';
import ViewPortsModal from '~~/components/hotelDetailPage/ViewPortsModal.vue';
import AirportPickUp from '~~/components/homePage/serviceModal/AirportPickUp.vue';
import Hotels from '~~/components/homePage/serviceModal/Hotels.vue';
import UploadImageModal from '~~/components/UploadImageModal.vue';

import type { Component } from 'vue';

interface Comp {
  [key: string]: Component;
}
const modalStore = useModal();
const { curModal } = storeToRefs(modalStore);

onBeforeUnmount(() => {
  modalStore.$reset();
});

const componentsList: Comp = {
  FilterModal,
  Leaflet,
  ViewPortsModal,
  AirportPickUp,
  Hotels,
  UploadImageModal
};
const dyComp = computed(() => componentsList[curModal.value] || null);
</script>
