import { signOut } from '@firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Authentication } from '../../Authentication';
import { REDUX_NAME } from '../../CONSTANTS';

/**
 * 이메일
 */
export const signOutAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signOut',
  async () => {
    await signOut(Authentication.Auth);
  },
  {},
);
