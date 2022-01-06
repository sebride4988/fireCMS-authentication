import { Dispatch, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { REDUX_NAME } from '../CONSTANTS';

import { AuthenticationState } from './AuthenticationState';

export type AuthDispatch = Dispatch<AnyAction> &
  ThunkDispatch<
    {
      [REDUX_NAME]: AuthenticationState;
    },
    null,
    AnyAction
  >;
