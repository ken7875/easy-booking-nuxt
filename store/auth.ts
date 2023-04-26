import { defineStore } from 'pinia';
import { UserInfo, LoginForm } from '~~/model/auth';
import { tokenCookie, userIdCookie } from '~~/utils/cookies';
import { loginApi } from '~~/api/auth';

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
    async login({ account, password }: LoginForm) {
      const loginRes = await loginApi({ account, password });
      const userInfo = loginRes.data.user;
      const token = loginRes.token;

      tokenCookie().setItem(token);
      userIdCookie().setItem(userInfo.id);

      this.setUserInfo({ token, userInfo });
    },
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
      tokenCookie().removeItem();
      userIdCookie().removeItem();
    }
  },
  persist: {
    key: 'user-info',
    storage: process.client ? localStorage : undefined,
    paths: ['userInfo']
  }
});
