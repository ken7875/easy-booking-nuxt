import { defineStore } from 'pinia';

interface State {
  curModal: string;
  childView: string;
  isModalOpen: boolean;
}

export const useModal = defineStore('modalStore', {
  state: (): State => ({
    curModal: '',
    childView: '',
    isModalOpen: false
  }),
  actions: {
    modalType(components: string, childName = '') {
      // components: 開啟組件名稱，childName: 子元件切換
      this.curModal = components;
      this.childView = childName;
    },
    toggleModal(boolean: boolean) {
      this.isModalOpen = boolean;
      if (!boolean) {
        this.curModal = '';
        this.childView = '';
      }
    }
  }
});
