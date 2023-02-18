import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type ScrollType = ScrollTrigger.Vars;

export const useScrollAnimation: (scrollTrigger: ScrollType) => GSAPTimeline | null = (scrollTrigger) => {
  let tl: GSAPTimeline | null = null;
  tl = gsap.timeline({
    scrollTrigger
  });

  return tl;
};
