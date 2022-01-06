import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import {
  createAsyncThunk,
  createSlice,
  miniSerializeError,
} from '@reduxjs/toolkit';
import _ from 'lodash';

import Authentication from '..';
import { REDUX_NAME } from '../CONSTANTS';
import { ProviderType } from '../enum/ProviderType';
import { AuthenticationState } from '../types/AuthenticationState';
import { UserCredential } from '../types/User';

// Define the initial state using that type
const initialState: AuthenticationState = {
  networkStatus: {
    signIn: {
      loading: false,
      error: null,
    },
    signUp: {
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
 * ========== 액션 모음 =============
 */
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
  reducers: {},
  extraReducers: (builder) => {
    /**
     * ========== 이메일 패스워드 로그인 =============
     */
    builder.addCase(signInEmailPasswordAsyncThunk.pending, (state, action) => {
      state.networkStatus.signIn.loading = true;
      state.networkStatus.signIn.error = null;
    });
    builder.addCase(
      signInEmailPasswordAsyncThunk.fulfilled,
      (state, action) => {
        state.networkStatus.signIn.loading = false;
        const userCredential: UserCredential = {
          providerType: ProviderType.EMAIL_PASSWORD,
          displayName: action.payload.user.displayName,
        };
        state.userCredentials.push(userCredential);
      },
    );
    builder.addCase(signInEmailPasswordAsyncThunk.rejected, (state, action) => {
      state.networkStatus.signIn.loading = false;
      state.networkStatus.signIn.error = action.error;
    });
    /**
     * ========== 이메일 패스워드 회원가입 =============
     */
    builder.addCase(signUpEmailPasswordAsyncThunk.pending, (state, action) => {
      state.networkStatus.signUp.loading = true;
      state.networkStatus.signUp.error = null;
    });
    builder.addCase(
      signUpEmailPasswordAsyncThunk.fulfilled,
      (state, action) => {
        state.networkStatus.signUp.loading = false;
        const userCredential: UserCredential = {
          providerType: ProviderType.EMAIL_PASSWORD,
          displayName: action.payload.user.displayName,
        };
        state.userCredentials.push(userCredential);
      },
    );
    builder.addCase(signUpEmailPasswordAsyncThunk.rejected, (state, action) => {
      state.networkStatus.signUp.loading = false;
      state.networkStatus.signUp.error = action.error;
    });
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
