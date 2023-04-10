<template>
  <div>
    <component :is="dyComp"></component>
    <!-- <Declare v-if="curModal === 'Declare'" /> -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useModal } from '~~/store/modal';
import FilterModal from '~~/components/filterTool/FilterModal.vue';
import Leaflet from '~~/components/Leaflet.vue';
import ViewPortsModal from '~~/components/hotelDetailPage/ViewPortsModal.vue';

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
  ViewPortsModal
};
const dyComp = computed(() => componentsList[curModal.value] || null);
</script>
