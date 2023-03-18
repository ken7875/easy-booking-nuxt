import moment from 'moment';

export default {
  mounted(el: HTMLElement, bind: any) {
    const format = moment(bind.value).format('YYYY-MM-DD hh:mm');
    el.innerHTML = format;
  },
  updated(el: HTMLElement, bind: any) {
    const format = moment(bind.value).format('YYYY-MM-DD hh:mm');
    el.innerHTML = format;
  }
};
