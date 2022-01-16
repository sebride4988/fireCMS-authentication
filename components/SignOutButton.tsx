import { useCallback } from 'react';

import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAuthDispatch } from '..';
import { signOutAsyncThunk } from '../slice/asyncThunks/signOut';

interface SignOutButtonProps {}

type MergeProps = SignOutButtonProps;

type SignOutHook = () => () => void;

const useSignOut: SignOutHook = () => {
  const dispatch = useAuthDispatch();
  const signOut = useCallback(() => {
    const signOutAction = signOutAsyncThunk();
    dispatch(signOutAction);
  }, [dispatch]);
  return signOut;
};

function SignOutButton(props: MergeProps) {
  const signOut = useSignOut();

  return (
    <Button
      shape="round"
      icon={<LogoutOutlined />}
      size="large"
      onClick={signOut}
    >
      로그아웃
    </Button>
  );
}

SignOutButton.defaultProps = {};

export default SignOutButton;
