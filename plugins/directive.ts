import borderDirective from './directive/border'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('border',borderDirective)
})