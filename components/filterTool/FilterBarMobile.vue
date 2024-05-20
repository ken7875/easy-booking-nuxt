<template>
  <div class="bg-white w-full">
    <div
      class="flex items-center rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] my-[15px] mx-auto w-[90%] lg:hidden"
      v-if="isMobile || isTablet"
    >
      <div class="flex-[1_1_0] p-[10px]" @click="$emit('openMap')">
        <p class="text-center">地圖</p>
      </div>
      <div class="flex-[1_1_0] p-[10px]" @click="openFilterModal">
        <p class="text-center">篩選</p>
      </div>
    </div>
    <LazyFilterToolFilterModal />
  </div>
</template>

<script setup lang="ts">
const { isMobile, isTablet } = useDevice();

const openFilterModal = () => {
  // toggleModal(true);
  // modalType({ components: 'FilterModal' });
};

defineEmits(['openMap']);
</script>
