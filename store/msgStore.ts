import { defineStore } from 'pinia';

interface MsgParams {
  title?: string;
  content: string;
  hasBtn?: boolean;
  type?: 'normal' | 'error' | 'warning';
  hasCancel?: boolean;
  contentVal?: string;
}

interface State extends MsgParams {
  resolve: ((value: string) => void) | null;
  reject: ((value: string) => void) | null;
}

export const useMessage = defineStore('msgStore', {
  state: (): State => ({
    title: '訊息',
    content: '',
    hasBtn: true,
    type: 'normal',
    resolve: null,
    reject: null,
    hasCancel: false,
    contentVal: ''
  }),
  actions: {
    /**
     * 開啟彈跳訊息函式
     * @param {Object} message - 訊息需要的內容
     * @param {string} message.title - 標題
     * @param {string} message.content - 內容
     * @param {boolean} message.hasBtn - 有無確定按鈕
     * @param {"normal" | "error" | "warning"} message.type - 彈跳訊息種類
     */
    openMsg({
      title = '訊息',
      content = '',
      hasBtn = true,
      type = 'normal',
      hasCancel = false,
      contentVal = ''
    }: MsgParams) {
      this.title = title;
      this.content = content;
      this.hasBtn = hasBtn;
      this.type = type;
      this.hasCancel = hasCancel;
      this.contentVal = contentVal;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    beforeClose(action: 'confirm' | 'cancel') {
      if (action === 'confirm' && typeof this.resolve === 'function') {
        this.resolve('confirm');
      } else if (action === 'cancel' && typeof this.reject === 'function') {
        this.reject('cancel');
      }
    }
  }
});
