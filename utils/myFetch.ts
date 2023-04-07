import { tokenCookie } from './cookies';

const store = () => import('~~/store/index');
// const { useMessage } = useStore();
// const messageStore = useMessage();
// const { openMsg } = messageStore;

interface Options {
  method: string;
  body?: any;
  responseType?: 'blob' | 'json';
}

export default <T>(url: string, options: Options): Promise<T> => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBase;
  const apiFetch = $fetch.create({ baseURL, responseType: options.responseType || 'json' });
  const authToken = tokenCookie.getTokenCookie();
  return apiFetch(url, {
    ...options,
    async onRequest({ options }) {
      if (authToken) {
        options.headers = new Headers(options.headers);
        options.headers.append('Authorization', authToken.value);
      }
    },
    async onRequestError({ request, options, error }) {
      // console.log(request, options, error);
      // Handle the request errors
    },
    async onResponse({ response }) {
      // Process the response data
      return response._data;
    },
    async onResponseError({ request, response, options }) {
      store().then((res) => {
        const store = res.useStore();
        const { openMsg } = store.useMessage();

        openMsg({
          title: '錯誤',
          content: response._data?.message
        });
      });
      // Handle the response errors
      // console.log(request, response, options);
    }
  });
};
