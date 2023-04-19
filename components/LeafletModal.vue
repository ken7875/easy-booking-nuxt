<template>
  <div>
    <ModalLayout>
      <template #title>地圖</template>
      <template #default>
        <Leaflet></Leaflet>
      </template>
    </ModalLayout>
  </div>
</template>

<script setup lang="ts">
import ModalLayout from './modal/ModalLayout.vue';
import Leaflet from './Leaflet.vue';
</script>
