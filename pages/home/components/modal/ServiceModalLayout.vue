<template>
  <ModalLayout v-model:is-open="isOpen">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #default>
      <div class="grid grid-cols-12 lg:grid-rows-1 grid-rows-2 border-t border-black h-full">
        <div class="lg:col-[1_/_span_4] col-[1_/_span_12] row-[2_/_span_1] lg:row-auto border-r border-black">
          <slot name="left"></slot>
        </div>
        <div class="lg:col-[5_/_span_8] col-[1_/_span_12] row-[1_/_span_1] lg:row-auto overflow-hidden">
          <slot name="right"></slot>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/modal/index.vue';

const isOpen = defineModel('isOpen', { default: false });
watch(isOpen, (val) => {
  console.log(val, 'isOpen');
});
// const props = defineProps<{
//   title: string;
// }>();
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}
</style>
