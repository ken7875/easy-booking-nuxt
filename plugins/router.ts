export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.$router.options.scrollBehavior = () => {
    return { left: 0, top: 0 };
  };
});
