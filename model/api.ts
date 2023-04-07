export interface BaseResponse<T> {
  status: string;
  data: {
    data: T;
  };
}

export interface GetAllResponse<T> extends BaseResponse<T> {
  result: number;
}
