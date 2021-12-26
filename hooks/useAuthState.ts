import { useSelector } from 'react-redux';

import { AuthenticationState } from '../types/AuthenticationState';

export function useAuthState(): AuthenticationState;
export function useAuthState<T>(
  fn: (authentication: AuthenticationState) => T,
): T;
export function useAuthState<T>(
  fn?: (authentication: AuthenticationState) => T,
): AuthenticationState | T {
  const authState = useSelector<
    { authentication: AuthenticationState },
    AuthenticationState | T
  >((state) => (fn ? fn(state.authentication) : state.authentication));

  return authState;
}
