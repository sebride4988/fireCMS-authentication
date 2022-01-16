import { createAsyncThunk } from '@reduxjs/toolkit';
import { FireAuthentication } from 'fireCMS/authentication';

import { REDUX_NAME } from '../../CONSTANTS';

/**
 * 이메일
 */
export const signUpEmailPasswordAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signUp/emailPassword',
  async (formData: { email: string; password: string }) => {
    const fireAuthentication = FireAuthentication.Instance;
    return await fireAuthentication.signUp(formData.email, formData.password);
  },
);
