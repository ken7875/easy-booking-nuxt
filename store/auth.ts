import { defineStore, storeToRefs } from 'pinia';
import { UserInfo, LoginForm } from '~~/model/auth';
import { tokenCookie, userIdCookie } from '~~/utils/cookies';
import { loginApi } from '~~/api/auth';
import { getAvatarApi } from '~~/api/auth';

interface State {
  token: string | null;
  userInfo: UserInfo | null;
  checkImg: string | ArrayBuffer | null | undefined;
  formData: FormData | null;
  avatar: string | ArrayBuffer | null | undefined;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    token: useCookie<string | null>('easy-booking-token').value,
    userInfo: null,
    checkImg: '',
    formData: null,
    avatar: null
  }),
  actions: {
    async login({ account, password }: LoginForm) {
      const loginRes = await loginApi({ account, password });
      const userInfo = loginRes.data.user;
      const token = loginRes.token;

      await tokenCookie().setItem(token);
      await userIdCookie().setItem(userInfo.id);

      this.setUserInfo({ token, userInfo });
      await this.getAvatar();
    },
    setUserInfo({ token, userInfo }: { token: string; userInfo: UserInfo }) {
      this.token = token;
      this.userInfo = { ...userInfo };
    },
    async getAvatar() {
      const id = this.userInfo?.id;
      if (!id) {
        return;
      }

      try {
        const file = await getAvatarApi(id);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve, reject) => {
          reader.onload = () => {
            this.avatar = reader.result;
            if (this.avatar) {
              resolve('成功取得照片!');
            } else {
              reject('取得照片失敗!');
            }
          };
        });
      } catch (error) {
        console.log('圖片加載失敗');

        this.avatar = null;
      }
    },
    logout() {
      this.token = null;
      this.userInfo = null;
      this.avatar = null;
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
