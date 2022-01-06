import { signInWithEmailAndPassword } from '@firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Authentication } from '../../Authentication';
import { REDUX_NAME } from '../../CONSTANTS';

/**
 * 이메일
 */
export const signInEmailPasswordAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signIn/emailPassword',
  async (formData: { email: string; password: string }) => {
    return await signInWithEmailAndPassword(
      Authentication.Auth,
      formData.email,
      formData.password,
    );
  },
);
