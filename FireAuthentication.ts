import { FirebaseApp } from '@firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
} from '@firebase/auth';
import { miniSerializeError } from '@reduxjs/toolkit';

import { authenticationSlice } from './slice';

export class FireAuthentication {
  private static _instance: FireAuthentication;
  private static _auth?: ReturnType<typeof getAuth>;

  public static initialize(firebaseApp: FirebaseApp) {
    this._auth = getAuth(firebaseApp);
  }

  public static get Auth() {
    if (!this._auth) {
      throw new Error('FireCMSCore is not initialized');
    }
    return this._auth;
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  // redux용 리듀서
  public static reducer = authenticationSlice.reducer;

  // 내부적으로 사용하는 액션 목록
  async signInWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(
      FireAuthentication.Auth,
      email,
      password,
    );
  }
  async signOut() {
    return await signOut(FireAuthentication.Auth);
  }
  async signUp(email: string, password: string) {
    const methods = await fetchSignInMethodsForEmail(
      FireAuthentication.Auth,
      email,
    );
    if (methods.length > 0) {
      throw miniSerializeError({
        code: '회원가입',
        name: '아이디 중복',
        message: `이미 ${methods.join(',')} 방식으로 가입한 이메일입니다.`,
      });
    }
    return await createUserWithEmailAndPassword(
      FireAuthentication.Auth,
      email,
      password,
    );
  }
}
