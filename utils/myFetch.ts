import { tokenCookie } from './cookies';

const store = () => import('~~/store/index');
// const { useMessage } = useStore();
// const messageStore = useMessage();
// const { openMsg } = messageStore;

interface Options {
  method:
    | 'get'
    | 'post'
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'head'
    | 'patch'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | undefined;
  body?: any;
  responseType?: 'blob' | 'json';
}

export default <T>(url: string, options: Options): Promise<T> => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = (process.server && !process.dev ? runtimeConfig.apiSSR : runtimeConfig.public.apiBase) as string;
  const apiFetch = $fetch.create({ baseURL, responseType: options.responseType || 'json' });
  const authToken = tokenCookie().getItem();

  return apiFetch(url, {
    ...options,
    async onRequest({ request, options }) {
      if (authToken) {
        const headersInit: HeadersInit = {};
        options.headers = headersInit;
        options.headers.Authorization = `Bearer ${authToken}`;
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
        console.log(response._data, 'sadasdasds');
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
