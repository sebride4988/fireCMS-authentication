import { useCallback, useState } from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

interface SignUpEmailPasswordButtonProps {}

type MergeProps = SignUpEmailPasswordButtonProps;

function SignUpEmailPasswordButton(props: MergeProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);
  const closeModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);

  return (
    <>
      <Button
        shape="round"
        icon={<UserAddOutlined />}
        size="large"
        onClick={openModal}
      >
        회원가입
      </Button>
      <Modal
        title="회원 가입"
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

SignUpEmailPasswordButton.defaultProps = {};

export default SignUpEmailPasswordButton;
