// import { useCookies } from '@vueuse/integrations/useCookies';
// console.log(token, 'token');
// // token

class CookieFactory<T> {
  key: string;
  value: any;

  constructor(key: string) {
    this.key = key;
    this.value = useCookie<string | null>(key);
  }

  getItem() {
    const value = useCookie(this.key).value;

    if (!value) {
      return null;
    }

    return value as T;
  }

  setItem(value: T) {
    this.value.value = value;
  }

  removeItem() {
    this.value.value = null;
  }
}

export const tokenCookie = () => new CookieFactory<string>('easy-booking-token');

export const userIdCookie = () => new CookieFactory<string>('easy-booking-userId');
