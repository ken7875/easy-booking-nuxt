<template>
  <ModalLayout v-model:is-open="isOpen">
    <template #title>地圖</template>
    <template #default>
      <Leaflet></Leaflet>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from './modal/index.vue';
import Leaflet from './Leaflet.vue';

const isOpen = defineModel('isOpen', { default: false });
</script>
