import { useCookies } from '@vueuse/integrations/useCookies';

const cookie = useCookies();

// token
export const tokenCookie = {
  getTokenCookie: () => cookie.get('easy-booking-token'),
  setTokenCookie: (token: string) => {
    cookie.set('easy-booking-token', token);
  },
  removeTokenCookie: () => {
    cookie.remove('easy-booking-token');
  }
};
