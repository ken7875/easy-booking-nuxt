import { useStore } from '~~/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const { useMessage } = useStore();
  const msgStore = useMessage();
  const { openMsg } = msgStore;

  const token = useCookie('easy-booking-token');
  if (!token.value) {
    openMsg({
      content: '請先登入'
    });
    return navigateTo('/');
  }
});
