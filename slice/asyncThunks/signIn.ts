import { createAsyncThunk } from '@reduxjs/toolkit';

import { REDUX_NAME } from '../../CONSTANTS';
import { FireAuthentication } from '../../FireAuthentication';

/**
 * 이메일
 */
export const signInEmailPasswordAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signIn/emailPassword',
  async (formData: { email: string; password: string }) => {
    const fireAuthentication = FireAuthentication.Instance;
    return await fireAuthentication.signInWithEmailAndPassword(
      formData.email,
      formData.password,
    );
  },
);
