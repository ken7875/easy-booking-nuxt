import { defineStore } from 'pinia';

export const useSetting = defineStore('booking', () => {
  const isTransitionPageMounted = ref(false);

  const toggleTransitionPageMounted = (bool: boolean) => {
    isTransitionPageMounted.value = bool;
  };

  return {
    isTransitionPageMounted,
    toggleTransitionPageMounted
  };
});
