// import { useCookies } from '@vueuse/integrations/useCookies';
// console.log(token, 'token');
// // token
export const tokenCookie = () => ({
  token: useCookie<string | null>('easy-booking-token'),
  getTokenCookie() {
    return useCookie('easy-booking-token');
  },
  // return process.client ? cookie.get('easy-booking-token') : parseCookies();
  setTokenCookie(payload: string) {
    this.token.value = payload;
  },
  // process.client ? cookie.set('easy-booking-token', token) : setCookie();
  removeTokenCookie() {
    // cookie.remove('easy-booking-token');
    this.token.value = null;
  }
});

export const userIdCookie = () => ({
  userId: useCookie<string | null>('easy-booking-userId'),
  getUserIdCookie() {
    return useCookie('easy-booking-userId');
  },
  // return process.client ? cookie.get('easy-booking-token') : parseCookies();
  setUserIdCookie(payload: string) {
    this.userId.value = payload;
  },
  // process.client ? cookie.set('easy-booking-token', token) : setCookie();
  removeUserIdCookie() {
    // cookie.remove('easy-booking-token');
    this.userId.value = null;
  }
});
