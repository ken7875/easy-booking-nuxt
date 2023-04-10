<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-[10000]"
    @click.stop.self.prevent="closePopoutFunc"
  >
    <div
      class="bg-white rounded-[8px] w-[90%] h-[90vh] relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <div class="text-[2rem] absolute top-[3px] right-[10px]" @click="closePopoutFunc">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
      <div class="pt-[3.5rem]">
        <!-- <TagGroup v-if="tags.length > 1" /> -->
        <!-- <img
          src="@/assets/images/modal/back.png"
          class="backBtn"
          v-show="goHomePage"
          @click="goBack"
        /> -->
        <div class="text-center text-[1.5rem] font-bold mb-[2rem]">
          <slot name="title" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
// import { computed } from "vue";
import { useModal } from '~~/store/modal';

const modalStore = useModal();
const { toggleModal } = modalStore;
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
