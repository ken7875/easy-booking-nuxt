import textSliceHandler from '~~/utils/textSliceHandler';

export default {
  mounted(el: HTMLElement, bind: any) {
    el.innerHTML = textSliceHandler(bind.value, bind.arg);
  },
  updated(el: HTMLElement, bind: any) {
    el.innerHTML = textSliceHandler(bind.value, bind.arg);
  }
};
