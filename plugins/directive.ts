import borderDirective from './directive/border';
import surfaceDirective from './directive/surface';
import timeFormatDirective from './directive/timeFormat';
import textSliceDirective from './directive/textSlice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('border', borderDirective);
  nuxtApp.vueApp.directive('surface', surfaceDirective);
  nuxtApp.vueApp.directive('timeFormat', timeFormatDirective);
  nuxtApp.vueApp.directive('textSlice', textSliceDirective);
});
