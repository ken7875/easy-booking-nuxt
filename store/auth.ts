import { defineStore } from 'pinia';
// import { tokenCookie } from '~~/utils/cookies';
import { UserInfo } from '~~/model/auth';

interface State {
  token: string | null;
  userInfo: UserInfo | null;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    token: useCookie<string | null>('easy-booking-token').value,
    userInfo: null
  }),
  actions: {
    logout() {
      this.token = null;
    }
  },
  persist: {
    key: 'user-info',
    storage: process.client ? localStorage : undefined,
    paths: ['userInfo']
  }
});
