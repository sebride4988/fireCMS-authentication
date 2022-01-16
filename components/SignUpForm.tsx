import { useCallback, useMemo } from 'react';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Typography, Spin, message } from 'antd';

import { useAuthDispatch, useAuthState } from '..';
import { signUpEmailPasswordAsyncThunk } from '../slice/asyncThunks/signUp';

import { PrivacyPolicyCheckbox } from './PrivacyPolicyCheckbox';
import { TermOfUseCheckbox } from './TermOfUseCheckbox';
import { createRule } from './utils/createRule';

interface SignUpFormProps {
  renderTermOfUse: () => JSX.Element;
  renderPrivacyPolicy: () => JSX.Element;
  onClickSignIn?: () => void;
  onFinish?: () => void;
}

type SignUpHook = (
  onFinish?: () => void,
) => [(formData: { email: string; password: string }) => void, boolean];

const useSignUp: SignUpHook = (onFinish?: () => void) => {
  const dispatch = useAuthDispatch();
  const signUpLoading = useAuthState(
    (state) => state.networkStatus.signUp.loading,
  );
  const signUp = useCallback(
    (formData: { email: string; password: string }) => {
      const signUpEmailPasswordAction = signUpEmailPasswordAsyncThunk(formData);
      dispatch(signUpEmailPasswordAction)
        .unwrap()
        .then(() => {
          message.success('회원가입이 완료되었습니다');
          onFinish?.();
        });
    },
    [onFinish, dispatch],
  );
  return [signUp, signUpLoading];
};

export function SignUpForm(props: SignUpFormProps) {
  const [signUp, signUpLoading] = useSignUp(props.onFinish);
  const emailRules = useMemo(() => {
    const label = '이메일';
    const requiredRule = createRule('required', label);
    const emailRule = createRule('email', label);
    return [requiredRule, emailRule];
  }, []);
  const confirmEmailRules = useMemo(() => {
    const label = '이메일 확인';
    const requiredRule = createRule('required', label);
    return [requiredRule];
  }, []);
  const passwordRules = useMemo(() => {
    const label = '패스워드';
    const requiredRule = createRule('required', label);
    const minRule = createRule('min', label, 6);
    return [requiredRule, minRule];
  }, []);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={signUp}
    >
      <Spin spinning={signUpLoading}>
        <Form.Item name="email" rules={emailRules}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="이메일"
          />
        </Form.Item>
        <Form.Item
          name="confirmEmail"
          dependencies={['email']}
          rules={confirmEmailRules.concat(({ getFieldValue }) => ({
            validator: (_, value) => {
              if (!value || getFieldValue('email') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('입력한 이메일이 일치하지 않습니다'),
              );
            },
          }))}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="이메일 확인"
          />
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item
          name="termOfUse"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('이용약관에 동의해주세요')),
            },
          ]}
        >
          <TermOfUseCheckbox renderTermOfUse={props.renderTermOfUse} />
        </Form.Item>
        <Form.Item
          name="privacyPolicy"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('개인정보 처리방침에 동의해주세요'),
                    ),
            },
          ]}
        >
          <PrivacyPolicyCheckbox
            renderPrivacyPolicy={props.renderPrivacyPolicy}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            회원 가입
          </Button>
        </Form.Item>
        <Form.Item>
          <Typography.Link onClick={props.onClickSignIn}>
            로그인
          </Typography.Link>
        </Form.Item>
      </Spin>
    </Form>
  );
}
