import borderDirective from './directive/border';
import surfaceDirective from './directive/surface';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('border', borderDirective);
  nuxtApp.vueApp.directive('surface', surfaceDirective);
});
