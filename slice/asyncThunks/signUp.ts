import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from '@firebase/auth';
import { createAsyncThunk, miniSerializeError } from '@reduxjs/toolkit';

import { Authentication } from '../../Authentication';
import { REDUX_NAME } from '../../CONSTANTS';

/**
 * 이메일
 */
export const signUpEmailPasswordAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signUp/emailPassword',
  async (formData: { email: string; password: string }) => {
    const methods = await fetchSignInMethodsForEmail(
      Authentication.Auth,
      formData.email,
    );
    if (methods.length > 0) {
      throw miniSerializeError({
        code: '회원가입',
        name: '아이디 중복',
        message: `이미 ${methods.join(',')} 방식으로 가입한 이메일입니다.`,
      });
    }
    return await createUserWithEmailAndPassword(
      Authentication.Auth,
      formData.email,
      formData.password,
    );
  },
);
