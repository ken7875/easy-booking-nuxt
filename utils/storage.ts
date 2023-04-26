import { StepOneSignUpInfo, StepTwoSignUpInfo } from '~~/model/auth';

class SessionStorageFactory<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  getItem() {
    const value = sessionStorage.getItem(this.key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  setItem(value: T) {
    return sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  removeItem() {
    return sessionStorage.removeItem(this.key);
  }
}

export const signUpSessionStorage = () => new SessionStorageFactory<StepOneSignUpInfo>('signUpAccount');

// export const signUpUserInfoSessionStorage = () => new SessionStorageFactory<StepTwoSignUpInfo>('signUpUserInfo');
