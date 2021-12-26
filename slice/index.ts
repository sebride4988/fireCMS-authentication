import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthenticationState } from '../types/AuthenticationState';
import { UserCredential } from '../types/User';

// Define the initial state using that type
const initialState: AuthenticationState = {
  networkStatus: {
    signIn: {
      loading: false,
      error: null,
    },
  },
  userCredentials: [],
};

export const authenticationSlice = createSlice({
  name: 'authentication',
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
});
