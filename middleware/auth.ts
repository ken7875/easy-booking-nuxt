export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('easy-booking-token');
  if (!token.value) {
    return navigateTo('/');
  }
});
