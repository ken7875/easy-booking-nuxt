export default (cb: any, timeout = 250) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let last = 0;

  return (...args: any) => {
    // const context: any = this;
    const now = +new Date();

    if (last && now < last + timeout) {
      clearTimeout(timer!);

      timer = setTimeout(() => {
        last = now;
        cb(...args);
      }, timeout);
    } else {
      last = now;
      cb(...args);
    }
  };
};
