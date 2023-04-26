import { string, ref as yupRef } from 'yup';

// 帳號
export const loginAcValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '帳號格式錯誤')
  .required('帳號為必填欄位');

// 密碼
export const passwordValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '密碼格式錯誤')
  .required('密碼為必填欄位');

// 確認密碼
export const passwordConfirmValidate = (yup: string) =>
  string()
    .matches(/^[a-zA-Z0-9]{6,12}$/, '密碼格式錯誤')
    .required('此為必填欄位')
    .oneOf([yupRef(yup)], '請確認是否與密碼一致');

export const lastName = string().required('姓氏為必填欄位');

export const firstName = string().required('名字為必填欄位');

export const email = string()
  .matches(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, '信箱格式錯誤')
  .required('信箱為必填欄位');

// \+?886\-?|0)?9\d{8}$/
export const phone = string()
  .matches(/^09\d{8}$/, '手機格式錯誤')
  .required('手機為必填欄位');

export const userName = string()
  .min(5, '用戶名稱必須多於5個字')
  .max(10, '用戶名稱不可多於10個字')
  .required('用戶名稱為必填欄位');

export const gender = string()
  .matches(/male|female/, '資料錯誤')
  .required('性別為必填欄位');

export const country = string().required('居住城市為必填欄位');

export const address = string().required('居住城市為必填欄位');

export const identityIdValidate = string()
  .matches(/^[A-Za-z][12]\d{8}$/, '身分證格式錯誤')
  .required('身分證為必填欄位');
