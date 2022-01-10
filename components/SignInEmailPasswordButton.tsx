import { useCallback, useState } from 'react';

import { LogoutOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import * as R from 'ramda';
import { useUnmount } from 'react-use';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface SignInEmailPasswordButtonProps {
  renderTermOfUse: () => JSX.Element;
  renderPrivacyPolicy: () => JSX.Element;
}

type MergeProps = SignInEmailPasswordButtonProps;

enum ContentType {
  SignIn,
  SignUp,
}

function SignInEmailPasswordButton(props: MergeProps) {
  const [contentType, setContentType] = useState(ContentType.SignIn);
  const changeToSignUp = useCallback(() => {
    setContentType(ContentType.SignUp);
  }, [setContentType]);
  const changeToSignIn = useCallback(() => {
    setContentType(ContentType.SignIn);
  }, [setContentType]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  useUnmount(() => {
    setContentType(ContentType.SignIn);
  });

  return (
    <>
      <Button
        shape="round"
        icon={<LogoutOutlined />}
        size="large"
        onClick={openModal}
      >
        로그인 / 회원가입
      </Button>
      <Modal
        title={['로그인', '회원가입'][contentType]}
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
      >
        {
          [
            <SignInForm onClickSignUp={changeToSignUp} onFinish={closeModal} />,
            <SignUpForm
              renderTermOfUse={props.renderTermOfUse}
              renderPrivacyPolicy={props.renderPrivacyPolicy}
              onClickSignIn={changeToSignIn}
              onFinish={R.pipe(closeModal, changeToSignIn)}
            />,
          ][contentType]
        }
      </Modal>
    </>
  );
}

SignInEmailPasswordButton.defaultProps = {};

export default SignInEmailPasswordButton;
