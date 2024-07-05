export const useLockScroll = (htmlDom: HTMLElement | null) => {
  if (htmlDom) {
    htmlDom.style.overflowY = 'hidden';
  }
};

export const useUnlockScroll = (htmlDom: HTMLElement | null) => {
  if (htmlDom) {
    htmlDom.style.overflowY = 'auto';
  }
};
