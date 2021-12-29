import { SerializedError } from '@reduxjs/toolkit';

import { UserCredential } from './User';

type NetworkStatus = {
  loading: boolean;
  error: SerializedError | null;
};

export interface AuthenticationState {
  networkStatus: Record<'signIn' | 'signOut', NetworkStatus>;
  userCredentials: UserCredential[];
}
