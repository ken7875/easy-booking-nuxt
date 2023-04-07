import { string } from 'yup';
// 帳號
export const loginAcValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '帳號格式錯誤')
  .required('帳號為必填欄位');

// 密碼
export const passwordValidate = string()
  .matches(/^[a-zA-Z0-9]{5,12}$/, '密碼格式錯誤')
  .required('密碼為必填欄位');
