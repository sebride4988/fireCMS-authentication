import { createAsyncThunk } from '@reduxjs/toolkit';

import { REDUX_NAME } from '../../CONSTANTS';
import { FireAuthentication } from '../../FireAuthentication';

/**
 * 이메일
 */
export const signOutAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signOut',
  async () => {
    const fireAuthentication = FireAuthentication.Instance;
    await fireAuthentication.signOut();
  },
  {},
);
