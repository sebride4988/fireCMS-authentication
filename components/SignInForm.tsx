import { useCallback } from 'react';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Typography, Spin, message } from 'antd';

import { useAuthDispatch, useAuthState } from '..';
import { signInEmailPasswordAsyncThunk } from '../slice/asyncThunks/signIn';

export interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  onClickSignUp?: () => void;
  onFinish?: () => void;
}

type SignInHook = (
  onFinish?: () => void,
) => [(formData: { email: string; password: string }) => void, boolean];

const useSignIn: SignInHook = (onFinish?: () => void) => {
  const dispatch = useAuthDispatch();
  const signInLoading = useAuthState(
    (state) => state.networkStatus.signIn.loading,
  );
  const signIn = useCallback(
    (formData: { email: string; password: string }) => {
      const signInAction = signInEmailPasswordAsyncThunk(formData);
      dispatch(signInAction)
        .unwrap()
        .then(() => {
          message.success('로그인 되었습니다');
          onFinish?.();
        });
    },
    [dispatch, onFinish],
  );
  return [signIn, signInLoading];
};

export function SignInForm(props: SignInFormProps) {
  const [signIn, signInLoading] = useSignIn(props.onFinish);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={signIn}
    >
      <Spin spinning={signInLoading}>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="이메일"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>이메일 저장</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            로그인
          </Button>
        </Form.Item>
        <Form.Item>
          <Typography.Link onClick={props.onClickSignUp}>
            회원 가입
          </Typography.Link>
        </Form.Item>
      </Spin>
    </Form>
  );
}
