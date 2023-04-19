<template>
  <div>
    <component :is="dyComp"></component>
  </div>
</template>

<script setup lang="ts">
import AirportPickUp from './AirportPickUp.vue';
import { useStore } from '~~/store/index';

const props = defineProps<{
  curModal: string;
}>();

const { curModal } = toRefs(props);

const { useModal } = useStore();
const modalStore = useModal();
const { modalType, toggleModal } = modalStore;

interface Comp {
  [key: string]: Component;
}

const componentsList: Comp = {
  AirportPickUp
};

onMounted(() => {
  toggleModal(true);
  modalType('ServiceModal');
});
const dyComp = computed(() => componentsList[curModal.value] || null);
</script>
