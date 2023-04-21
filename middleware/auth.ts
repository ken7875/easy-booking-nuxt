// import { useStore } from '~~/store/index';
// import { storeToRefs } from 'pinia';

// const authStore = useAuth();
// const { token } = storeToRefs(authStore);

export default defineNuxtRouteMiddleware((to, from) => {
  // const { useAuth, useMessage } = useStore();
  // const msgStore = useMessage();
  // const { openMsg } = msgStore;
  // console.log(openMsg);

  const token = useCookie('easy-booking-token');
  if (!token.value) {
    return navigateTo('/');
  }
  // {
  //   openMsg({
  //     content: '請先登入'
  //   });
  //   return navigateTo(from.path);
  // }
  // if (token.value) {
  //   return navigateTo('');
  // } else {
  //   console.log(token, 22213121212);
  //   return abortNavigation();
  // }
});
