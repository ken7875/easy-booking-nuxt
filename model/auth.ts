export interface LoginForm {
  account: string;
  password: string;
}

export interface UserInfo {
  account: string;
  address: string;
  children: [];
  country: string;
  createAt: string;
  email: string;
  enabled: boolean;
  gender: string;
  id: string;
  identityId: string;
  name: string;
  phone: string;
  role: string;
  unDrawCoupon: number;
}

export interface SignUpInfo {
  account: string;
  password: string;
  confirmPassword: string;
  identityId: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  country: string;
  address: string;
}

export type StepOneSignUpInfo = Pick<SignUpInfo, 'account' | 'password' | 'confirmPassword'>;
export type StepTwoSignUpInfo = Pick<
  SignUpInfo,
  'identityId' | 'name' | 'phone' | 'email' | 'country' | 'address' | 'gender'
>;
