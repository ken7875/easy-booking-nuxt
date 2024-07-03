import { defineStore } from 'pinia';

export const useSetting = defineStore('booking', () => {
  const canPageScroll = ref(true);

  const togglePageScroll = (bool: boolean) => {
    canPageScroll.value = bool;
  };

  return {
    canPageScroll,
    togglePageScroll
  };
});
