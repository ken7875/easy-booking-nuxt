import gsap from 'gsap';
import Observer from '@/utils/observer';

export default {
  mounted(el: HTMLElement) {
    const options = {
      rootMargin: '-10px 0px 10px 0px',
      threshold: 0
    };
    // text surface animation
    const textSurface = () => {
      // const elArr = gsap.utils.toArray('.h2 span')
      gsap.fromTo(el, { y: 55 }, { y: 0, duration: 2 });
    };

    const hanldeObserve = new Observer(el, options, textSurface);
    hanldeObserve.observer();
  }
};
