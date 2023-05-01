<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-[10000]"
    @click.stop.self.prevent="closePopoutFunc"
  >
    <div
      :class="[
        'bg-white rounded-[8px] h-[90vh] relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
        widthComputed
      ]"
    >
      <div class="text-[2rem] absolute top-[3px] right-[10px]" @click="closePopoutFunc">
        <font-awesome-icon :icon="['fas', 'xmark']" class="cursor-pointer" />
      </div>
      <div class="pt-[2.5rem] h-full overflow-hidden">
        <div class="text-center text-[1.5rem] font-bold mb-[1.5rem] h-[1.5rem]">
          <slot name="title" />
        </div>
        <div class="overflow-scroll h-[calc(100%-3rem)]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
// import { computed } from "vue";
import { storeToRefs } from 'pinia';
import { useModal } from '~~/store/modal';

const modalStore = useModal();
const { toggleModal } = modalStore;
const { width } = storeToRefs(modalStore);
console.log(width.value, 'width.value');

const widthComputed = computed(() => (width.value ? `w-[${width.value}]` : 'w-[90%]'));
// const { childView } = storeToRefs(modalStore);
// const modalType = {
//   longContent: require("@/assets/images/modal/pop_box4.png"),
// };
// const { styleType } = storeToRefs(modalStore);
// const curStyle = computed(() => modalType[styleType.value]);
const closePopoutFunc = () => {
  toggleModal(false);
};
</script>
