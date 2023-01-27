const context = null;
let timer: any = null;
let last = 0;
export default (fn: () => void, delay = 100) => {
  return function (this: any, ...args: []): void {
    let now: number = +new Date();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        now = last;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};
