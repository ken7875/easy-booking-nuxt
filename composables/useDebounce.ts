export const useDebounce = (fn: (...args: any) => any, timer = 300) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    clearTimeout(timeout!);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, timer);
  };
};
