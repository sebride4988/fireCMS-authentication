import { UserCredential } from './User';

export interface AuthenticationState {
  networkStatus: {
    signIn: {
      loading: boolean;
      error: Error | null;
    };
  };
  userCredentials: UserCredential[];
}
