import { useCallback } from 'react';

import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAuthDispatch } from '..';
import { signOutAsyncThunk } from '../slice';

interface SignOutButtonProps {}

type MergeProps = SignOutButtonProps;

function SignOutButton(props: MergeProps) {
  const dispatch = useAuthDispatch();
  const signOut = useCallback(() => {
    dispatch(signOutAsyncThunk());
  }, [dispatch]);

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
