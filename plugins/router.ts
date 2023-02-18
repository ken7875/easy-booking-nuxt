export default defineNuxtPlugin((nuxtApp) => {
  console.log(nuxtApp);
  nuxtApp.$router.options.scrollBehavior = () => {
    return { left: 0, top: 0 };
  };
});
