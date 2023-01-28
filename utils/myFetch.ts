interface Options {
  method: string;
  body?: any;
}

export default (url: string, options: Options): Promise<any> => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBase;
  console.log(baseURL);
  const apiFetch = $fetch.create({ baseURL });
  const authToken = useCookie('HKToken', { default: undefined });
  return apiFetch(url, {
    ...options,
    async onRequest({ options }) {
      if (authToken.value) {
        options.headers = new Headers(options.headers);
        options.headers.append('Authorization', authToken.value);
      }
      // 👈️ ! non-null assertion
    },
    async onRequestError({ request, options, error }) {
      console.log(request, options, error);
      // Handle the request errors
    },
    async onResponse({ response }) {
      // Process the response data
      return response._data;
    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log(request, response, options);
    }
  });
};
