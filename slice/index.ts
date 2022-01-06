import { signOut } from '@firebase/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import Authentication from '..';
import { REDUX_NAME } from '../CONSTANTS';
import { AuthenticationState } from '../types/AuthenticationState';
import { UserCredential } from '../types/User';

// Define the initial state using that type
const initialState: AuthenticationState = {
  networkStatus: {
    signIn: {
      loading: false,
      error: null,
    },
    signOut: {
      loading: false,
      error: null,
    },
  },
  userCredentials: [],
};

/**
 * 공통
 */
export const signOutAsyncThunk = createAsyncThunk(
  REDUX_NAME + '/signOut',
  async () => {
    await signOut(Authentication.Auth);
  },
  {},
);

export const authenticationSlice = createSlice({
  name: REDUX_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestSignIn: (state) => {
      state.networkStatus.signIn.loading = true;
      state.networkStatus.signIn.error = null;
    },
    responseSignIn: (state, action: PayloadAction<UserCredential>) => {
      state.networkStatus.signIn.loading = false;
      state.userCredentials = state.userCredentials.concat(action.payload);
    },
    failureSignIn: (state, action: PayloadAction<Error>) => {
      state.networkStatus.signIn.loading = false;
      state.networkStatus.signIn.error = action.payload;
    },
    clearSignInError: (state) => {
      state.networkStatus.signIn.error = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * ========== 로그아웃 =============
     */
    builder.addCase(signOutAsyncThunk.pending, (state, action) => {
      state.networkStatus.signOut.loading = true;
      state.networkStatus.signOut.error = null;
    });
    builder.addCase(signOutAsyncThunk.fulfilled, (state, action) => {
      state.networkStatus.signOut.loading = false;
      state.userCredentials = [];
    });
    builder.addCase(signOutAsyncThunk.rejected, (state, action) => {
      state.networkStatus.signOut.loading = false;
      state.networkStatus.signOut.error = action.error;
    });
  },
});
