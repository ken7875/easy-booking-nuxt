import myFetch from '~~/utils/myFetch';
import type { LoginForm, UserInfo, SignUpInfo } from '~~/model/auth';
import type { BaseResponse } from '~~/model/api';

interface loginResponse {
  status: string;
  token: string;
  data: {
    user: UserInfo;
  };
}

export const login = (body: LoginForm): Promise<loginResponse> =>
  myFetch<loginResponse>('/user/login', {
    method: 'POST',
    body
  });

export const signUp = (body: SignUpInfo): Promise<SignUpInfo> =>
  myFetch<SignUpInfo>('/user/signup', {
    method: 'POST',
    body
  });

export const getAvatar = (id: string): Promise<Blob> =>
  myFetch(`/user/avatar/${id}`, {
    method: 'GET',
    responseType: 'blob'
  });

export const getUser = (): Promise<BaseResponse<UserInfo>> =>
  myFetch('/user/me', {
    method: 'GET'
  });

export const updateUser = (
  id: string,
  body: Pick<UserInfo, 'gender' | 'address' | 'country' | 'phone'> | FormData
): Promise<BaseResponse<UserInfo>> => {
  return myFetch(`/user/${id}`, {
    method: 'PATCH',
    body
  });
};
