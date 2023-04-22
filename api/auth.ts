import myFetch from '~~/utils/myFetch';
import { LoginForm, UserInfo } from '~~/model/auth';
import { BaseResponse } from '~~/model/api';

interface loginResponse {
  status: string;
  token: string;
  data: {
    user: UserInfo;
  };
}

export const loginApi = (body: LoginForm): Promise<loginResponse> =>
  myFetch<loginResponse>('/user/login', {
    method: 'POST',
    body
  });

export const getAvatarApi = (id: string): Promise<Blob> =>
  myFetch(`/user/avatar/${id}`, {
    method: 'GET',
    responseType: 'blob'
  });

export const getUserApi = (): Promise<BaseResponse<UserInfo>> =>
  myFetch('/user/me', {
    method: 'GET'
  });

export const updateUserApi = (
  id: string,
  body: Pick<UserInfo, 'gender' | 'address' | 'country' | 'phone'>
): Promise<BaseResponse<UserInfo>> =>
  myFetch(`/user/${id}`, {
    method: 'PATCH',
    body
  });
