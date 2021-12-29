import { useCallback } from 'react';

import { miniSerializeError } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { Authentication } from '../Authentication';
import { authenticationSlice } from '../slice';

export function useSignInAnonymously() {
  const dispatch = useDispatch();
  const doFetch = useCallback(() => {
    dispatch(authenticationSlice.actions.requestSignIn());
    return Authentication.signInAnonymously()
      .then((userCredential) => {
        dispatch(authenticationSlice.actions.responseSignIn(userCredential));
      })
      .catch((_error) => {
        const error = miniSerializeError(_error);
        dispatch(authenticationSlice.actions.failureSignIn(error));
      });
  }, [dispatch]);

  return doFetch;
}
