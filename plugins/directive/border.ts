import gsap from 'gsap';
import Observer from '~~/utils/observer';

export default {
  mounted(el: HTMLElement) {
    const options = {
      rootMargin: '0px 0px 40px 0px',
      threshold: 0
    };
    // text surface animation
    const borderAnimation = () => {
      // const elArr = gsap.utils.toArray('.h2 span')
      const tl = gsap.timeline({
        duration: 1
      });
      tl.fromTo(el, { transform: 'scale(0)' }, { transform: 'scale(1)' });
    };

    const hanldeObserve = new Observer(el, options, borderAnimation);
    hanldeObserve.observer();
  }
};
