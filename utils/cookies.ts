// import { useCookies } from '@vueuse/integrations/useCookies';
// console.log(token, 'token');
// // token
export const tokenCookie = () => ({
  token: useCookie<string | null>('easy-booking-token'),
  getTokenCookie() {
    console.log(this, 'this');
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
