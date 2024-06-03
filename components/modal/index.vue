<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-modalShadow"
      @click.stop.self.prevent="closePopoutFunc"
      v-if="isOpen"
      data-test="modal-shadow"
    >
      <div :class="['overflow-scroll bg-white rounded-[8px] h-[90vh] relative z-modal animate-scale']" v-bind="$attrs">
        <div class="text-[2rem] absolute top-[3px] right-[10px]" @click="closePopoutFunc">
          <font-awesome-icon :icon="['fas', 'xmark']" class="cursor-pointer" />
        </div>
        <div class="pt-[2.5rem] h-full overflow-hidden">
          <div class="text-center text-[1.5rem] font-bold mb-[1.5rem] h-[1.5rem]" data-test="modal-title">
            <slot name="title" />
          </div>
          <div class="overflow-x-hidden h-[calc(100%-3rem)]" data-test="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});

const isOpen = defineModel('isOpen', { default: false });
const closePopoutFunc = () => {
  isOpen.value = false;
};
</script>
