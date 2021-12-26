import { FirebaseApp } from '@firebase/app';
import {
  getAuth,
  signInAnonymously as _signInAnonymously,
} from '@firebase/auth';

import { ProviderType } from './enum/ProviderType';
import { authenticationSlice } from './slice';
import { UserCredential } from './types/User';

export class Authentication {
  private static _instance: Authentication;
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

  public static reducer = authenticationSlice.reducer;

  public static signInAnonymously() {
    return _signInAnonymously(this.Auth).then((_userCredential) => {
      const userCredential: UserCredential = {
        providerType: ProviderType.ANONYMOUS,
        displayName: _userCredential.user.displayName,
      };
      return userCredential;
    });
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}
