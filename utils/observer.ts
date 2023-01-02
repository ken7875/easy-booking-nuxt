interface Observer {
  target: HTMLElement;
  options: Option;
  targetCb: () => void;
  callback: (entries: IntersectionObserverEntry[], observer: any) => void;
  observer: () => void;
}

interface Option {
  rootMargin?: string;
  threshold?: number;
}

export default class ObserverHandler implements Observer {
  target: HTMLElement;
  options: Option;
  targetCb: () => void;
  constructor(target: HTMLElement, options: Option, targetCb: () => void) {
    this.target = target;
    this.options = options;
    this.targetCb = targetCb;
  }

  callback(entries: IntersectionObserverEntry[], observer: any) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry) {
        this.targetCb();
        observer.unobserve(this.target);
      }
    });
  }

  observer() {
    const Observer = new IntersectionObserver(this.callback.bind(this), this.options);
    Array.isArray(this.target) ? this.target.forEach((item) => Observer.observe(item)) : Observer.observe(this.target);
  }
}
