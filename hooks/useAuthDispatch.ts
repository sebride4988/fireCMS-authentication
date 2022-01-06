import { useDispatch } from 'react-redux';

import { AuthDispatch } from '../types/AuthDispatch';

export function useAuthDispatch() {
  return useDispatch<AuthDispatch>();
}
