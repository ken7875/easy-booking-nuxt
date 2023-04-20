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
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';

const { isMobile, isTablet } = useDevice();

const { useModal } = useStore();
const { toggleModal, modalType } = useModal();

const openFilterModal = () => {
  toggleModal(true);
  modalType('FilterModal');
};

defineEmits(['openMap']);
</script>
