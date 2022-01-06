import { useEffect } from 'react';

import { SerializedError } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { useAuthState } from '..';

function useSerializedErrorNotification(error: SerializedError | null) {
  useEffect(() => {
    if (error) {
      notification.error({
        message: '[' + error.code + ']: ' + error.name,
        description: error.message,
      });
    }
  }, [error]);
}

function AuthErrorNotification(): JSX.Element {
  const signInError = useAuthState((state) => state.networkStatus.signIn.error);
  const signUpError = useAuthState((state) => state.networkStatus.signUp.error);
  const signOutError = useAuthState(
    (state) => state.networkStatus.signOut.error,
  );

  useSerializedErrorNotification(signInError);
  useSerializedErrorNotification(signUpError);
  useSerializedErrorNotification(signOutError);

  return <></>;
}

AuthErrorNotification.defaultProps = {};

export default AuthErrorNotification;
