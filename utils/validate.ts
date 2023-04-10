import { string } from 'yup';

// 帳號
export const loginAcValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '帳號格式錯誤')
  .required('帳號為必填欄位');

// 密碼
export const passwordValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '密碼格式錯誤')
  .required('密碼為必填欄位');

export const lastName = string().required('姓氏為必填欄位');

export const firstName = string().required('名字為必填欄位');

export const email = string()
  .matches(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, '信箱格式錯誤')
  .required('信箱為必填欄位');

export const phone = string()
  .matches(/^09\d{8}$/)
  .required('手機為必填欄位');
