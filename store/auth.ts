import { defineStore } from 'pinia';
// import { tokenCookie } from '~~/utils/cookies';
import { UserInfo } from '~~/model/auth';
import { tokenCookie, userIdCookie } from '~~/utils/cookies';
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
    setUserInfo({ token, userInfo }: { token: string; userInfo: UserInfo }) {
      this.token = token;
      this.userInfo = { ...userInfo };
    },
    logout() {
      this.token = null;
      this.userInfo = null;
      if (process.client) {
        localStorage.removeItem('user-info');
      }
      tokenCookie().removeTokenCookie();
      userIdCookie().removeUserIdCookie();
    }
  },
  persist: {
    key: 'user-info',
    storage: process.client ? localStorage : undefined,
    paths: ['userInfo']
  }
});
